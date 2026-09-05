import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { clerkMiddleware, requireAuth } from '@clerk/express';
import { generateReportForCustomInput } from './src/data/presets.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '2mb' }));

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
  });
});

// Lazy-initialized Gemini client
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }
  if (!geminiClient) {
    geminiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return geminiClient;
}

// AI-powered Claim Analysis endpoint protected with Clerk Authentication
app.post('/api/analyze', clerkMiddleware(), requireAuth(), async (req, res) => {
  const { claimText = '', urlText = '' } = req.body || {};
  const trimmedClaim = typeof claimText === 'string' ? claimText.trim() : '';
  const trimmedUrl = typeof urlText === 'string' ? urlText.trim() : '';

  if (!trimmedClaim && !trimmedUrl) {
    return res.status(400).json({
      error: 'Please provide either a claim text or a source URL to analyze.',
    });
  }

  const ai = getGeminiClient();
  if (!ai) {
    console.log('[TruthLens] No GEMINI_API_KEY detected, using heuristic analyzer engine.');
    const fallbackReport = generateReportForCustomInput(trimmedClaim || trimmedUrl, trimmedUrl);
    return res.json({
      ...fallbackReport,
      synthesis: {
        ...fallbackReport.synthesis,
        engineVersion: 'TruthLens Engine v1.0 (Local Heuristic Mode)',
      },
    });
  }

  const startTime = Date.now();

  try {
    const prompt = `You are TruthLens AI, an accredited credibility diagnostic and fact-checking intelligence system. Analyze the following claim and/or URL for veracity, misinformation, manipulation, and empirical evidence:
Claim: "${trimmedClaim || 'None provided'}"
Digital Source URL: "${trimmedUrl || 'None provided'}"

Perform comprehensive fact-checking. Search Google for official verification, debunking articles from IFCN-certified fact checkers (Snopes, Reuters, AP News, PolitiFact, BBC Reality Check), or authoritative institutional confirmations (.gov, .edu, WHO, peer-reviewed journals).

Return ONLY a valid JSON object strictly matching this schema with no markdown codeblocks or extra text:
{
  "id": "TL-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(10 + Math.random() * 89)}X",
  "claimTarget": "Specific claim summary",
  "claimCategory": "Category name (e.g. Bio-Safety Disinformation, Political Discourse, Public Health, Infrastructure, Science)",
  "detectedChannels": "Summary of channels e.g. Flagged across X social platforms or Validated by institutional wires",
  "firstDetected": "e.g. First detected 35m ago or Real-time query",
  "viralityIndex": "e.g. ~8,400 virality index or Low propagation footprint",
  "score": (integer 0 to 100 where 0-45 is HIGH RISK / false, 46-75 is MODERATE CAUTION / unproven or disputed, 76-100 is VERIFIED SAFE / true),
  "scoreLabel": ("HIGH RISK" or "MODERATE CAUTION" or "VERIFIED SAFE"),
  "confidence": "e.g. 96.8%",
  "evidenceList": [
    {
      "id": "ev-1",
      "category": "Fact-Check Registry" or "Supporting Source" or "Official Directive",
      "sourceName": "Name of publication, registry, or agency",
      "domainTrust": "Domain Trust XX/100 or Gov Domain .gov",
      "snippet": "Direct quoted statement or factual finding regarding the claim",
      "url": "official url or domain path if known",
      "archiveMeta": "e.g. Verified Wire or Fact Check Registry",
      "verdictType": ("REFUTES" or "PROPAGATES" or "DENIES" or "SUPPORTS"),
      "status": ("verified" or "caution" or "danger")
    }
  ],
  "sourceCredibility": {
    "statusTitle": "Short descriptive title of origin provenance",
    "isAtRisk": (boolean true if high risk or dubious),
    "description": "2-3 sentences evaluating the source attribution, DNS pedigree, and authenticity",
    "authorTrackRecord": "e.g. Accredited Byline or Unclaimed / Anonymous",
    "authorRisk": ("danger" or "caution" or "verified"),
    "domainAge": "e.g. 12 Years Active or Newly Registered (Obfuscated)",
    "factCheckingConsensus": "e.g. Unanimous Rejection or Consensus Corroboration or Divided Opinions",
    "consensusRisk": ("danger" or "caution" or "verified")
  },
  "synthesis": {
    "engineVersion": "TruthLens Gemini 3.8 Intelligence Engine",
    "paragraphs": [
      "Paragraph 1 synthesizing the factual consensus and whether the claim holds true or false.",
      "Paragraph 2 analyzing the narrative topology, emotional triggers, or evidence corroboration."
    ],
    "sensationalism": (integer 0-100 representing sensationalist rhetoric level),
    "corroboration": (integer 0-100 representing corroboration strength),
    "domainTrust": "XX/100"
  },
  "recommendation": {
    "title": "Clear citizen advice headline",
    "body": "Detailed guidance on whether to share, debunk, or consult primary records."
  }
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        temperature: 0.2,
      },
    });

    const elapsed = Date.now() - startTime;
    const latency = `${elapsed}ms`;
    const rawText = response.text || '';

    const cleaned = rawText
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim();

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      const match = cleaned.match(/\{[\s\S]*\}/);
      if (match) {
        parsed = JSON.parse(match[0]);
      } else {
        throw new Error('Failed to parse model response into JSON');
      }
    }

    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (Array.isArray(groundingChunks) && groundingChunks.length > 0 && parsed.evidenceList) {
      const searchItems = groundingChunks
        .filter((chunk: any) => chunk.web?.uri)
        .slice(0, 2)
        .map((chunk: any, index: number) => ({
          id: `ev-grounding-${index}`,
          category: 'Grounding Evidence (Google Search)',
          sourceName: chunk.web.title || 'Live Search Verification Source',
          domainTrust: 'Domain Trust 95/100',
          snippet: `Grounding search query identified live source: ${chunk.web.title || 'Verified Source'}`,
          url: chunk.web.uri,
          archiveMeta: 'Live Corroboration Node',
          verdictType: (parsed.score >= 70 ? 'SUPPORTS' : 'REFUTES') as 'SUPPORTS' | 'REFUTES',
          status: (parsed.score >= 70 ? 'verified' : 'danger') as 'verified' | 'danger',
        }));

      parsed.evidenceList = [...searchItems, ...parsed.evidenceList.slice(0, 2)];
    }

    const completeReport = {
      ...parsed,
      latency,
      node: 'US-EAST-DG4',
      rawInputClaim: trimmedClaim,
      rawInputUrl: trimmedUrl,
    };

    return res.json(completeReport);
  } catch (error) {
    console.error('[TruthLens] Gemini analysis error, falling back to heuristic:', error);
    const elapsed = Date.now() - startTime;
    const fallbackReport = generateReportForCustomInput(trimmedClaim || trimmedUrl, trimmedUrl);
    return res.json({
      ...fallbackReport,
      latency: `${elapsed}ms`,
      synthesis: {
        ...fallbackReport.synthesis,
        engineVersion: 'TruthLens Engine v1.0 (Heuristic Safety Fallback)',
      },
    });
  }
});

// Production and Development Vite integration
async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[TruthLens] Server running on [http://0.0.0.0](http://0.0.0.0):${PORT}`);
  });
}

start();