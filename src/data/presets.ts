import { DiagnosticReport } from '../types';

export const HIGH_RISK_REPORT: DiagnosticReport = {
  id: 'TL-8849-29X',
  latency: '420ms',
  node: 'US-EAST-DG4',
  claimTarget:
    'Breaking: Health ministry officially confirms new airborne virus strain detected in tap water distribution systems nationwide.',
  claimCategory: 'Bio-Safety Disinformation',
  detectedChannels: 'Flagged across 14 social channels',
  firstDetected: 'First detected 42m ago',
  viralityIndex: '~12,400 virality index',
  score: 34,
  scoreLabel: 'HIGH RISK',
  confidence: '98.4%',
  evidenceList: [
    {
      id: 'ev-1',
      category: 'Fact-Check Registry',
      sourceName: 'HealthFact Global / Reuters Fact Check',
      domainTrust: 'Domain Trust 99/100',
      snippet:
        '“No evidence of airborne transmission via municipal water supplies; official health bulletin confirmed fabricated via counterfeit letterhead template.”',
      url: 'reuters.com/fact-check/water-virus-hoax',
      archiveMeta: 'Archived 18m ago',
      verdictType: 'REFUTES',
      status: 'verified',
    },
    {
      id: 'ev-2',
      category: 'Supporting Source (Unverified)',
      sourceName: "Telegram Channel 'HealthLeaks24'",
      domainTrust: 'Domain Trust 12/100',
      snippet:
        'Anonymous broadcast asserting emergency tap water isolation without providing peer-reviewed microbiological citations, metadata records, or authorized press release links.',
      archiveMeta: 'Telegram Origin #88219 • 12,000 algorithmic forwards',
      verdictType: 'PROPAGATES',
      status: 'caution',
    },
    {
      id: 'ev-3',
      category: 'Official Conflicting Directive',
      sourceName: 'National Dept. of Water & Sanitation Official Advisory',
      domainTrust: 'Gov Domain .gov.za',
      snippet:
        '“Water treatment infrastructure remains strictly sealed, continuously chlorinated, and operational at ISO 24510 standards. Circulating claims are malicious hoaxes.”',
      url: 'water.gov.za/bulletin/press-release-801',
      archiveMeta: 'Verified Press Wire',
      verdictType: 'DENIES',
      status: 'danger',
    },
  ],
  sourceCredibility: {
    statusTitle: 'Root Origin Non-Attributable',
    isAtRisk: true,
    description:
      'The primary seed publication lacks cryptographic signature, author attribution, and certified institutional registration. WHO and regional CDC records contain zero coincident bulletins.',
    authorTrackRecord: 'Anonymous / Unclaimed',
    authorRisk: 'danger',
    domainAge: '32 Days Old (Obfuscated)',
    factCheckingConsensus: 'Unanimous Rejection',
    consensusRisk: 'danger',
  },
  synthesis: {
    engineVersion: 'TruthLens Engine v1.0',
    paragraphs: [
      'The claim could not be corroborated using certified clinical evidence. Key physiological assertions conflict directly with peer-reviewed virology literature and municipal water safety parameters.',
      'Narrative vector topology exhibits typical viral panic characteristics: sensational lexicon, synthetic urgency (“Breaking nationwide”), and omission of verifiably stamped jurisdiction codes.',
    ],
    sensationalism: 94,
    corroboration: 0,
    domainTrust: '12/100',
  },
  recommendation: {
    title: 'Verify through an official state health source before sharing.',
    body: 'Do not amplify this statement on social media networks. Consult your municipal health portal or certified international bodies directly.',
  },
  rawInputClaim:
    'Breaking: Health ministry officially confirms new airborne virus strain detected in tap water distribution systems nationwide.',
  rawInputUrl: 'https://t.me/HealthLeaks24/archive/88219',
};

export const VERIFIED_SAFE_REPORT: DiagnosticReport = {
  id: 'TL-4190-88B',
  latency: '310ms',
  node: 'EU-WEST-DG2',
  claimTarget:
    'National renewable energy grid completed 100 consecutive hours running entirely on offshore wind and geothermal reservoirs.',
  claimCategory: 'Infrastructure & Energy Transition',
  detectedChannels: 'Validated across 26 institutional wires',
  firstDetected: 'First detected 3h ago',
  viralityIndex: '~48,200 broadcast index',
  score: 92,
  scoreLabel: 'VERIFIED SAFE',
  confidence: '99.1%',
  evidenceList: [
    {
      id: 'ev-v1',
      category: 'Fact-Check Registry',
      sourceName: 'International Energy Agency / Reuters Energy Monitor',
      domainTrust: 'Domain Trust 98/100',
      snippet:
        '“Grid telemetric audit logs confirm sustained 100-hour milestone zero-carbon delivery matching operational load profiles across interconnected regional nodes.”',
      url: 'reuters.com/business/energy/grid-renewable-milestone-100h',
      archiveMeta: 'Archived 1h ago',
      verdictType: 'SUPPORTS',
      status: 'verified',
    },
    {
      id: 'ev-v2',
      category: 'Official Agency Directive',
      sourceName: 'Dept. of Energy & Environmental Safety Annual Bulletin',
      domainTrust: 'Gov Domain .gov',
      snippet:
        '“Official gazette filing validates transmission balancing data and real-time generation metrics from deep offshore turbine clusters.”',
      url: 'energy.gov/news/press-archive-2025/100-hours-clean',
      archiveMeta: 'Official Government Press Wire',
      verdictType: 'SUPPORTS',
      status: 'verified',
    },
    {
      id: 'ev-v3',
      category: 'Peer Review Verification',
      sourceName: 'Journal of Applied Power Systems telemetry stream',
      domainTrust: 'Domain Trust 96/100',
      snippet:
        '“Independent sensor feeds from SCADA logging substations corroborated peak output stability without frequency oscillations.”',
      url: 'japs.org/telemetry/scada-audit-log',
      archiveMeta: 'Peer-Reviewed Telemetry',
      verdictType: 'SUPPORTS',
      status: 'verified',
    },
  ],
  sourceCredibility: {
    statusTitle: 'Cryptographically Verified Official Origin',
    isAtRisk: false,
    description:
      'Originating from authenticated energy agency telecommunications with cryptographic signing keys matching public state infrastructure registries.',
    authorTrackRecord: 'Accredited Energy Press Bureau',
    authorRisk: 'verified',
    domainAge: '24 Years (Official Gov DNS)',
    factCheckingConsensus: 'Consensus Corroboration',
    consensusRisk: 'verified',
  },
  synthesis: {
    engineVersion: 'TruthLens Engine v1.0',
    paragraphs: [
      'Comprehensive telemetry matching confirms zero discrepancies across government load dispatch logs and independent academic SCADA monitors.',
      'Information dissemination patterns reflect standard regulatory compliance briefings with transparent methodology datasets and verified data tables.',
    ],
    sensationalism: 8,
    corroboration: 98,
    domainTrust: '98/100',
  },
  recommendation: {
    title: 'Content is verified and safe for citation and public syndication.',
    body: 'Telemetry indices and institutional releases are fully aligned. Primary datasets may be cited directly from authorized state power registers.',
  },
  rawInputClaim:
    'National renewable energy grid completed 100 consecutive hours running entirely on offshore wind and geothermal reservoirs.',
  rawInputUrl: 'https://energy.gov/news/press-archive-2025/100-hours-clean',
};

export const QUICK_PRESETS: Record<string, DiagnosticReport> = {
  'Municipal Water Alert': HIGH_RISK_REPORT,
  'Solar Grid Freeze': {
    id: 'TL-6712-40K',
    latency: '380ms',
    node: 'US-CENTRAL-DG1',
    claimTarget:
      'Solar Grid Freeze: Emergency blackouts imminent across 12 states due to geomagnetic plasma storm disrupting inverter frequencies.',
    claimCategory: 'Critical Infrastructure Disinformation',
    detectedChannels: 'Flagged across 8 alternative media networks',
    firstDetected: 'First detected 1h 15m ago',
    viralityIndex: '~8,900 virality index',
    score: 41,
    scoreLabel: 'HIGH RISK',
    confidence: '96.8%',
    evidenceList: [
      {
        id: 'sg-1',
        category: 'Fact-Check Registry',
        sourceName: 'Space Weather Prediction Center (NOAA) Alert Log',
        domainTrust: 'Gov Domain .gov',
        snippet:
          '“Current geomagnetic planetary K-index sits at moderate G1 quiet levels. No extreme coronal mass ejections directed towards North American grid latitude bands.”',
        url: 'swpc.noaa.gov/alerts/k-index-stability',
        archiveMeta: 'Archived 22m ago',
        verdictType: 'REFUTES',
        status: 'verified',
      },
      {
        id: 'sg-2',
        category: 'Supporting Source (Unverified)',
        sourceName: "X Account '@SolarEmergencyDesk'",
        domainTrust: 'Domain Trust 18/100',
        snippet:
          'Unverified claims claiming utility operators preparing rotating blackouts, accompanied by uncaptioned photos from a 2021 Texas snowstorm.',
        archiveMeta: 'X Post #99214 • 14,200 retweets',
        verdictType: 'PROPAGATES',
        status: 'caution',
      },
      {
        id: 'sg-3',
        category: 'Official Conflicting Directive',
        sourceName: 'North American Electric Reliability Corp (NERC)',
        domainTrust: 'Domain Trust 94/100',
        snippet:
          '“Bulk power systems across all regional interconnections operating normally with standard spinning reserves.”',
        url: 'nerc.com/system-status/live-reliability',
        archiveMeta: 'Official Interconnection Wire',
        verdictType: 'DENIES',
        status: 'danger',
      },
    ],
    sourceCredibility: {
      statusTitle: 'Sensationalist Astroturf Account',
      isAtRisk: true,
      description:
        'Account was created 14 days ago and frequently re-posts historical power outage imagery during minor atmospheric anomalies.',
      authorTrackRecord: 'Anonymous Speculative Content',
      authorRisk: 'danger',
      domainAge: '14 Days Old',
      factCheckingConsensus: 'Fabricated Panic Vector',
      consensusRisk: 'danger',
    },
    synthesis: {
      engineVersion: 'TruthLens Engine v1.0',
      paragraphs: [
        'Geomagnetic data from NOAA and ESA magnetometers show nominal conditions, directly contradicting claims of grid resonance failures.',
        'Visual forensic analysis indicates the circulation of recycled winter storm imagery with stripped EXIF geolocation data.',
      ],
      sensationalism: 88,
      corroboration: 4,
      domainTrust: '18/100',
    },
    recommendation: {
      title: 'Consult NOAA Space Weather & NERC status pages before reposting.',
      body: 'Do not spread unsubstantiated blackout warnings. Check regional utility transmission maps for official status updates.',
    },
    rawInputClaim:
      'Solar Grid Freeze: Emergency blackouts imminent across 12 states due to geomagnetic plasma storm disrupting inverter frequencies.',
    rawInputUrl: 'https://twitter.com/SolarEmergencyDesk/status/189201948',
  },
  'Vaccine Batch C-12': {
    id: 'TL-9023-11V',
    latency: '450ms',
    node: 'US-EAST-DG4',
    claimTarget:
      'Vaccine Batch C-12: Leaked hospital memorandum claims batch C-12 contains unauthorized heavy metal suspension compounds.',
    claimCategory: 'Pharmaceutical Misinformation',
    detectedChannels: 'Circulating across private encrypted chat apps',
    firstDetected: 'First detected 2h ago',
    viralityIndex: '~19,600 virality index',
    score: 28,
    scoreLabel: 'HIGH RISK',
    confidence: '99.2%',
    evidenceList: [
      {
        id: 'vb-1',
        category: 'Fact-Check Registry',
        sourceName: 'AP News Fact Check / WHO Global Safety Network',
        domainTrust: 'Domain Trust 99/100',
        snippet:
          '“The document referenced is a digital forgery imitating European Medicines Agency formatting with non-standard typeface and invalid batch numbering conventions.”',
        url: 'apnews.com/article/fact-check-batch-c12-hoax',
        archiveMeta: 'Archived 30m ago',
        verdictType: 'REFUTES',
        status: 'verified',
      },
      {
        id: 'vb-2',
        category: 'Official Agency Directive',
        sourceName: 'FDA Center for Biologics Evaluation and Research',
        domainTrust: 'Gov Domain .fda.gov',
        snippet:
          '“Lot tracking database confirms no active release under lot number C-12 exists in state or federal distribution manifests.”',
        url: 'fda.gov/cber/safety-bulletins/lot-audit',
        archiveMeta: 'Official Regulatory Release',
        verdictType: 'DENIES',
        status: 'danger',
      },
    ],
    sourceCredibility: {
      statusTitle: 'Fabricated Document Leak',
      isAtRisk: true,
      description:
        'PDF metadata inspection reveals composition in an uncertified open-source desktop publishing tool on a personal workstation, not regulatory systems.',
      authorTrackRecord: 'Unidentified Document Leaker',
      authorRisk: 'danger',
      domainAge: 'Unknown Origin (P2P Mesh)',
      factCheckingConsensus: 'Unanimous Rejection',
      consensusRisk: 'danger',
    },
    synthesis: {
      engineVersion: 'TruthLens Engine v1.0',
      paragraphs: [
        'National and global pharmacovigilance registries confirm no adverse lot holds or composition irregularities corresponding to the designated identifiers.',
        'Disinformation anatomy reflects synthetic whistleblower archetypes designed to exploit institutional trust voids.',
      ],
      sensationalism: 92,
      corroboration: 0,
      domainTrust: '8/100',
    },
    recommendation: {
      title: 'Flag as counterfeit medical advice and report spreading instances.',
      body: 'Always cross-reference drug and pharmaceutical lot inquiries directly through official regulatory FDA or EMA lookup portals.',
    },
    rawInputClaim:
      'Vaccine Batch C-12: Leaked hospital memorandum claims batch C-12 contains unauthorized heavy metal suspension compounds.',
    rawInputUrl: 'https://whistleblower-vault-mirror.net/files/lot_c12.pdf',
  },
};

export function generateReportForCustomInput(
  claimText: string,
  urlText: string
): DiagnosticReport {
  // Check if matches known presets
  for (const [key, report] of Object.entries(QUICK_PRESETS)) {
    if (claimText.toLowerCase().includes(key.toLowerCase())) {
      return {
        ...report,
        rawInputClaim: claimText || report.rawInputClaim,
        rawInputUrl: urlText || report.rawInputUrl,
      };
    }
  }

  const isPositive =
    claimText.toLowerCase().includes('clean') ||
    claimText.toLowerCase().includes('solar') ||
    claimText.toLowerCase().includes('renewable') ||
    claimText.toLowerCase().includes('certified') ||
    claimText.toLowerCase().includes('verified') ||
    claimText.toLowerCase().includes('milestone') ||
    claimText.toLowerCase().includes('official') ||
    claimText.toLowerCase().includes('study finds') ||
    claimText.toLowerCase().includes('reuters');

  const randomId = `TL-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(10 + Math.random() * 90)}X`;
  const latency = `${Math.floor(320 + Math.random() * 180)}ms`;

  if (isPositive) {
    return {
      id: randomId,
      latency,
      node: 'US-EAST-DG4',
      claimTarget: claimText || 'General Verified Claim Assessment',
      claimCategory: 'Verified Public Discourse',
      detectedChannels: 'Validated across accredited wire services',
      firstDetected: 'First detected 2h ago',
      viralityIndex: '~24,000 reference count',
      score: 89,
      scoreLabel: 'VERIFIED SAFE',
      confidence: '97.6%',
      evidenceList: [
        {
          id: 'cust-v1',
          category: 'Fact-Check Registry',
          sourceName: 'International Press Association Fact Ledger',
          domainTrust: 'Domain Trust 96/100',
          snippet:
            'Cross-indexed reporting aligns with primary documentation and verifiable regulatory disclosures without contradictions.',
          url: urlText || 'factcheck.org/verified/report',
          archiveMeta: 'Archived 45m ago',
          verdictType: 'SUPPORTS',
          status: 'verified',
        },
        {
          id: 'cust-v2',
          category: 'Official Agency Directive',
          sourceName: 'National Regulatory Repository',
          domainTrust: 'Gov Domain .gov',
          snippet:
            'Public records index corroborates the statistical claims and timeline outlined in the referenced announcement.',
          archiveMeta: 'Government Gazette Archive',
          verdictType: 'SUPPORTS',
          status: 'verified',
        },
      ],
      sourceCredibility: {
        statusTitle: 'Accredited Source Attribution',
        isAtRisk: false,
        description:
          'Originating publication maintains verifiable editorial leadership, active press association membership, and transparent corrections policies.',
        authorTrackRecord: 'Accredited Journalistic Byline',
        authorRisk: 'verified',
        domainAge: '18 Years Active',
        factCheckingConsensus: 'Consensus Corroboration',
        consensusRisk: 'verified',
      },
      synthesis: {
        engineVersion: 'TruthLens Engine v1.0',
        paragraphs: [
          'Multiple independent institutional registries validate the factual accuracy of the extracted assertion.',
          'Textual analysis shows objective sentiment calibration with low sensationalism scores and standard attribution transparency.',
        ],
        sensationalism: 12,
        corroboration: 94,
        domainTrust: '95/100',
      },
      recommendation: {
        title: 'Information is substantiated by primary registries.',
        body: 'Source attribution is clear and claims conform to verified public data streams.',
      },
      rawInputClaim: claimText,
      rawInputUrl: urlText,
    };
  }

  // Default to caution / high risk evaluation
  const hasSensationalWords =
    claimText.toLowerCase().includes('breaking') ||
    claimText.toLowerCase().includes('secret') ||
    claimText.toLowerCase().includes('shocking') ||
    claimText.toLowerCase().includes('leaked') ||
    claimText.toLowerCase().includes('urgent') ||
    claimText.toLowerCase().includes('crisis') ||
    claimText.toLowerCase().includes('miracle');

  const score = hasSensationalWords ? 34 : 46;
  const scoreLabel = score <= 35 ? 'HIGH RISK' : 'MODERATE CAUTION';

  return {
    id: randomId,
    latency,
    node: 'US-EAST-DG4',
    claimTarget: claimText || 'Unattributed Digital Claim',
    claimCategory: 'Digital Misinformation & Narrative Analysis',
    detectedChannels: 'Flagged across multi-platform feeds',
    firstDetected: 'First detected 54m ago',
    viralityIndex: '~11,800 virality index',
    score,
    scoreLabel,
    confidence: '95.8%',
    evidenceList: [
      {
        id: 'cust-d1',
        category: 'Fact-Check Registry',
        sourceName: 'Global Fact-Check Consortium (IFCN)',
        domainTrust: 'Domain Trust 97/100',
        snippet:
          '“Primary assertion lacks verifiable citations from accredited bodies. Key claims diverge from corroborated registry records.”',
        url: 'factcheck.org/search/diagnostic-query',
        archiveMeta: 'Archived 32m ago',
        verdictType: 'REFUTES',
        status: 'verified',
      },
      {
        id: 'cust-d2',
        category: 'Supporting Source (Unverified)',
        sourceName: urlText ? new URL(urlText.startsWith('http') ? urlText : `https://${urlText}`).hostname : 'Social Distribution Vector',
        domainTrust: 'Domain Trust 24/100',
        snippet:
          'Source publishes sensational claims without corroboration, timestamp verification, or author identification.',
        archiveMeta: 'Algorithmic Broadcast Node',
        verdictType: 'PROPAGATES',
        status: 'caution',
      },
      {
        id: 'cust-d3',
        category: 'Official Conflicting Directive',
        sourceName: 'Institutional Oversight Repository',
        domainTrust: 'Domain Trust 92/100',
        snippet:
          '“No corresponding emergency declarations, regulatory alerts, or validated notices have been issued by governing authorizers.”',
        archiveMeta: 'Official Archive Bulletin',
        verdictType: 'DENIES',
        status: 'danger',
      },
    ],
    sourceCredibility: {
      statusTitle: 'Origin Incompletely Documented',
      isAtRisk: true,
      description:
        'The submitted content does not reference authenticated institutional databases or verified authors. Narrative dissemination reflects viral emotional targeting patterns.',
      authorTrackRecord: 'Unclaimed / Pseudonymous Distribution',
      authorRisk: 'danger',
      domainAge: 'Recent or Obfuscated Domain',
      factCheckingConsensus: 'Unsubstantiated',
      consensusRisk: 'danger',
    },
    synthesis: {
      engineVersion: 'TruthLens Engine v1.0',
      paragraphs: [
        'Algorithmic cross-referencing against 14 global fact-checking registries yielded zero confirming press releases or certified documentation.',
        'Linguistic analysis reveals synthetic emotional triggers designed to maximize social media propagation without corroboration.',
      ],
      sensationalism: hasSensationalWords ? 92 : 74,
      corroboration: 8,
      domainTrust: '22/100',
    },
    recommendation: {
      title: 'Exercise caution and verify before sharing.',
      body: 'Do not amplify this statement on social media networks. Cross-reference with primary institutional portals directly.',
    },
    rawInputClaim: claimText,
    rawInputUrl: urlText,
  };
}
