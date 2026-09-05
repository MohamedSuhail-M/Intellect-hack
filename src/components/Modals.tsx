import { useState, FormEvent, ReactNode } from 'react';
import { X, Copy, Check, Download, Shield, Terminal, Flag, BookOpen, Code2 } from 'lucide-react';
import { DiagnosticReport } from '../types';

interface RawJsonModalProps {
  report: DiagnosticReport;
  onClose: () => void;
}

export function RawJsonModal({ report, onClose }: RawJsonModalProps) {
  const [copied, setCopied] = useState(false);
  const jsonString = JSON.stringify(report, null, 2);

  const handleCopy = () => {
    navigator.clipboard?.writeText?.(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl border border-[#E0E6ED] overflow-hidden flex flex-col max-h-[85vh]">
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#f4f8f9] border-b border-[#E0E6ED]">
          <div className="flex items-center gap-2 text-[#0f1e1f] font-semibold text-[14px]">
            <Terminal className="w-4 h-4 text-[#ab3500]" />
            <span>Raw Diagnostic Payload ({report.id})</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-2.5 py-1 text-[11px] font-medium rounded bg-white hover:bg-slate-100 text-[#0f1e1f] border border-[#E0E6ED] flex items-center gap-1 cursor-pointer transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#2ECC71]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy JSON'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 text-[#7F8C8D] hover:text-[#0f1e1f] rounded cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="p-4 overflow-y-auto bg-[#0f1e1f] text-[#7cf6ec] font-mono text-[12px] leading-relaxed select-all">
          <pre>{jsonString}</pre>
        </div>
        <div className="px-5 py-2.5 bg-[#f8fafb] border-t border-[#E0E6ED] flex items-center justify-between text-[11px] text-[#7F8C8D]">
          <span>Schema: IFCN-v2.1 Diagnostic Standard</span>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-white hover:bg-slate-50 border border-[#E0E6ED] rounded text-[#0f1e1f] font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

interface ReportDiscrepancyModalProps {
  reportId: string;
  onClose: () => void;
}

export function ReportDiscrepancyModal({ reportId, onClose }: ReportDiscrepancyModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [discrepancyType, setDiscrepancyType] = useState('false_positive');
  const [evidenceUrl, setEvidenceUrl] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl border border-[#E0E6ED] overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#f4f8f9] border-b border-[#E0E6ED]">
          <div className="flex items-center gap-2 text-[#0f1e1f] font-semibold text-[14px]">
            <Flag className="w-4 h-4 text-[#ab3500]" />
            <span>Report Diagnostic Discrepancy</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#7F8C8D] hover:text-[#0f1e1f] rounded cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#2ECC71]/15 text-[#2ECC71] flex items-center justify-center mb-3">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="text-[16px] font-semibold text-[#0f1e1f]">Discrepancy Audit Lodged</h4>
            <p className="text-[13px] text-[#7F8C8D] mt-1 max-w-sm">
              Your submission has been queued for human analyst review under Case #{reportId}-REV. Thank you for safeguarding the verification registry.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
            <div>
              <label className="block text-[12px] font-semibold text-[#4e6073] mb-1 uppercase tracking-wider">
                Case Reference
              </label>
              <input
                type="text"
                readOnly
                value={reportId}
                className="w-full px-3 py-2 rounded-lg bg-[#f4f8f9] text-[13px] text-[#0f1e1f] font-mono border border-[#E0E6ED]"
              />
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-[#4e6073] mb-1 uppercase tracking-wider">
                Nature of Discrepancy
              </label>
              <select
                value={discrepancyType}
                onChange={(e) => setDiscrepancyType(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white text-[13px] text-[#0f1e1f] border border-[#E0E6ED] focus:outline-none focus:ring-2 focus:ring-[#7cf6ec]"
              >
                <option value="false_positive">False Positive - Legitimate News Misclassified</option>
                <option value="false_negative">False Negative - Unchecked Misinformation</option>
                <option value="stale_cache">Outdated Evidence / Superseded Directive</option>
                <option value="missing_source">Critical Primary Source Omitted</option>
              </select>
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-[#4e6073] mb-1 uppercase tracking-wider">
                Counter-Evidence URL (Optional)
              </label>
              <input
                type="url"
                placeholder="https://official-government-gazette.org/..."
                value={evidenceUrl}
                onChange={(e) => setEvidenceUrl(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white text-[13px] text-[#0f1e1f] border border-[#E0E6ED] focus:outline-none focus:ring-2 focus:ring-[#7cf6ec]"
              />
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-[#4e6073] mb-1 uppercase tracking-wider">
                Analyst Notes
              </label>
              <textarea
                rows={3}
                placeholder="Provide factual rationale or citations..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-3 rounded-lg bg-white text-[13px] text-[#0f1e1f] border border-[#E0E6ED] focus:outline-none focus:ring-2 focus:ring-[#7cf6ec] resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E0E6ED]">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-[12px] font-medium text-[#7F8C8D] hover:text-[#0f1e1f]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-[12px] font-semibold text-white bg-[#ab3500] hover:bg-[#832600] rounded-lg shadow-sm"
              >
                Submit Discrepancy
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

interface MethodologyModalProps {
  onClose: () => void;
}

export function MethodologyModal({ onClose }: MethodologyModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl border border-[#E0E6ED] overflow-hidden flex flex-col max-h-[85vh]">
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#f4f8f9] border-b border-[#E0E6ED]">
          <div className="flex items-center gap-2 text-[#0f1e1f] font-semibold text-[14px]">
            <BookOpen className="w-4 h-4 text-[#ab3500]" />
            <span>TruthLens Verification Methodology & Standards</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#7F8C8D] hover:text-[#0f1e1f] rounded cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto text-[14px] text-[#34495E] space-y-4 leading-relaxed">
          <div>
            <h4 className="text-[15px] font-bold text-[#0f1e1f]">1. Multi-Registry Corroboration Engine</h4>
            <p className="text-[13px] text-[#7F8C8D] mt-1">
              TruthLens queries 14 international fact-checking repositories certified by the International Fact-Checking Network (IFCN), including Reuters Fact Check, AP Fact Check, PolitiFact, and accredited regional health agency gazettes.
            </p>
          </div>

          <div>
            <h4 className="text-[15px] font-bold text-[#0f1e1f]">2. Cryptographic & DNS Provenance Tracking</h4>
            <p className="text-[13px] text-[#7F8C8D] mt-1">
              Source URLs are evaluated against WHOIS DNS history, DNSSEC validity, SSL cert issuer reputation, and known astroturf domain fingerprints to determine authoritativeness (0-100 Trust Score).
            </p>
          </div>

          <div>
            <h4 className="text-[15px] font-bold text-[#0f1e1f]">3. Narrative Vector Topology</h4>
            <p className="text-[13px] text-[#7F8C8D] mt-1">
              Claims are analyzed for hyperbolic lexicon, synthetic panic amplification words, unverified emergency directives, and lack of jurisdictional attribution.
            </p>
          </div>

          <div>
            <h4 className="text-[15px] font-bold text-[#0f1e1f]">4. Scoring Rubric</h4>
            <ul className="list-disc pl-5 text-[13px] text-[#7F8C8D] mt-1 space-y-1">
              <li><strong className="text-[#2ECC71]">80 - 100 (Verified Safe):</strong> Confirmed by multiple accredited primary publishers or official government registries.</li>
              <li><strong className="text-[#F39C12]">50 - 79 (Moderate Caution):</strong> Developing story with partial attribution or conflicting non-authoritative accounts.</li>
              <li><strong className="text-[#E74C3C]">0 - 49 (High Risk):</strong> Demonstrably fabricated, debunked by registries, or circulating via unverified broadcast vectors.</li>
            </ul>
          </div>
        </div>

        <div className="px-5 py-3 bg-[#f8fafb] border-t border-[#E0E6ED] flex items-center justify-between">
          <span className="text-[11px] text-[#7F8C8D]">Compliant with IFCN Code of Principles</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#0f1e1f] hover:bg-[#243334] text-white rounded text-[12px] font-semibold"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
}

interface ApiDocsModalProps {
  onClose: () => void;
}

export function ApiDocsModal({ onClose }: ApiDocsModalProps) {
  const [copied, setCopied] = useState(false);
  const curlSample = `curl -X POST https://api.truthlens.ai/v1/diagnostics/verify \\
  -H "Authorization: Bearer tl_live_sk_992140" \\
  -H "Content-Type: application/json" \\
  -d '{
    "claim": "Breaking: Health ministry officially confirms new airborne virus strain detected in tap water distribution systems nationwide.",
    "source_url": "https://t.me/HealthLeaks24/archive/88219"
  }'`;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl border border-[#E0E6ED] overflow-hidden flex flex-col max-h-[85vh]">
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#f4f8f9] border-b border-[#E0E6ED]">
          <div className="flex items-center gap-2 text-[#0f1e1f] font-semibold text-[14px]">
            <Code2 className="w-4 h-4 text-[#ab3500]" />
            <span>TruthLens Diagnostic API Reference</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#7F8C8D] hover:text-[#0f1e1f] rounded cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4 text-[13px] text-[#34495E]">
          <div>
            <span className="inline-block px-2 py-0.5 rounded bg-[#e1f1f2] text-[#006a65] font-mono text-[11px] font-semibold">
              POST /v1/diagnostics/verify
            </span>
            <p className="mt-1 text-[13px] text-[#7F8C8D]">
              Synchronous verification of textual claims and digital URLs against 14 corroboration feeds.
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[12px] font-semibold text-[#4e6073] uppercase tracking-wider">Example cURL Request</span>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText?.(curlSample);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="text-[11px] text-[#ab3500] hover:underline flex items-center gap-1"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy cURL'}</span>
              </button>
            </div>
            <pre className="p-3 bg-[#0f1e1f] text-[#7cf6ec] rounded-lg font-mono text-[11px] overflow-x-auto leading-relaxed">
              {curlSample}
            </pre>
          </div>

          <div>
            <h5 className="text-[12px] font-semibold text-[#4e6073] uppercase tracking-wider mb-1">Response JSON Shape</h5>
            <pre className="p-3 bg-[#f4f8f9] border border-[#E0E6ED] text-[#0f1e1f] rounded-lg font-mono text-[11px] overflow-x-auto leading-relaxed">
{`{
  "diagnostic_id": "TL-8849-29X",
  "score": 34,
  "verdict": "HIGH RISK",
  "confidence": 0.984,
  "sources_evaluated": 3,
  "sensationalism_index": 0.94,
  "corroboration_index": 0.00,
  "recommendation": "Verify through an official state health source before sharing."
}`}
            </pre>
          </div>
        </div>

        <div className="px-5 py-3 bg-[#f8fafb] border-t border-[#E0E6ED] flex items-center justify-between">
          <span className="text-[11px] text-[#7F8C8D]">Rate Limit: 10,000 req/min (Enterprise Tier)</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#0f1e1f] hover:bg-[#243334] text-white rounded text-[12px] font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

interface FactCardModalProps {
  report: DiagnosticReport;
  onClose: () => void;
}

export function FactCardModal({ report, onClose }: FactCardModalProps) {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    // Generate a printable/downloadable text or card snapshot
    const content = `========================================================
TRUTHLENS AI - VERIFICATION FACT CARD
Diagnostic ID: ${report.id} | Latency: ${report.latency}
========================================================
CLAIM:
"${report.claimTarget}"

SCORE: ${report.score} / 100 (${report.scoreLabel})
CONFIDENCE: ${report.confidence}
CATEGORY: ${report.claimCategory}

SENSATIONALISM: ${report.synthesis.sensationalism}%
CORROBORATION: ${report.synthesis.corroboration}%
DOMAIN TRUST: ${report.synthesis.domainTrust}

RECOMMENDATION:
${report.recommendation.title}
${report.recommendation.body}

AUDIT TRAIL:
IFCN Fact-Checking Code of Principles Compliant.
========================================================`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `truthlens-factcard-${report.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  const isHighRisk = report.score < 50;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-[#E0E6ED] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 bg-[#f4f8f9] border-b border-[#E0E6ED]">
          <span className="text-[13px] font-bold text-[#0f1e1f]">Export Fact Card</span>
          <button
            onClick={onClose}
            className="p-1 text-[#7F8C8D] hover:text-[#0f1e1f] rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Card Preview */}
        <div className="p-6 bg-[#f0f5f6]">
          <div className="bg-white rounded-xl shadow-md p-5 border border-[#E0E6ED] flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-[#E0E6ED] pb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#FF6B35] flex items-center justify-center text-white font-bold text-xs">
                  TL
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-[#0f1e1f] leading-none">TRUTHLENS AI</h4>
                  <span className="text-[10px] text-[#7F8C8D]">Verified Diagnostic Report</span>
                </div>
              </div>
              <span className="text-[11px] font-mono text-[#4e6073] font-semibold">{report.id}</span>
            </div>

            <div className="flex items-center gap-4">
              <div
                className={`w-16 h-16 rounded-full flex flex-col items-center justify-center text-white shrink-0 font-bold ${
                  isHighRisk
                    ? 'bg-gradient-to-br from-[#FF6B35] to-[#FF8555]'
                    : 'bg-gradient-to-br from-[#2ECC71] to-[#27AE60]'
                }`}
              >
                <span className="text-xl leading-none">{report.score}</span>
                <span className="text-[9px] uppercase tracking-widest text-white/90">/ 100</span>
              </div>
              <div>
                <span
                  className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-bold ${
                    isHighRisk
                      ? 'bg-[#FADBD8] text-[#E74C3C]'
                      : 'bg-[#e1f1f2] text-[#2ECC71]'
                  }`}
                >
                  {report.scoreLabel}
                </span>
                <p className="text-[12px] font-medium text-[#0f1e1f] mt-1 line-clamp-2">
                  “{report.claimTarget}”
                </p>
              </div>
            </div>

            <div className="bg-[#FFF5F0] p-3 rounded-lg border-l-3 border-[#FF6B35] text-[11px]">
              <span className="font-bold text-[#0f1e1f] block">{report.recommendation.title}</span>
              <span className="text-[#34495E]">{report.recommendation.body}</span>
            </div>

            <div className="flex justify-between items-center text-[10px] text-[#7F8C8D] pt-2 border-t border-[#E0E6ED]">
              <span>IFCN Code of Principles Certified</span>
              <span>Node: {report.node}</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-5 py-3.5 bg-white border-t border-[#E0E6ED] flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-[12px] font-medium text-[#7F8C8D] hover:text-[#0f1e1f]"
          >
            Cancel
          </button>
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-[#FF6B35] hover:bg-[#E55A2B] text-white rounded-lg text-[12px] font-semibold flex items-center gap-1.5 shadow-sm transition-all"
          >
            {downloaded ? <Check className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
            <span>{downloaded ? 'Downloaded' : 'Download Snapshot'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

interface InfoModalProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
}

export function InfoModal({ title, children, onClose }: InfoModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-xl rounded-xl shadow-2xl border border-[#E0E6ED] overflow-hidden flex flex-col max-h-[85vh]">
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#f4f8f9] border-b border-[#E0E6ED]">
          <span className="text-[#0f1e1f] font-semibold text-[14px]">{title}</span>
          <button
            onClick={onClose}
            className="p-1 text-[#7F8C8D] hover:text-[#0f1e1f] rounded cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto text-[13px] text-[#34495E] leading-relaxed space-y-3">
          {children}
        </div>
        <div className="px-5 py-2.5 bg-[#f8fafb] border-t border-[#E0E6ED] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#0f1e1f] text-white rounded text-[12px] font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
