import { useState } from 'react';
import {
  Clock,
  Server,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Megaphone,
  Share2,
  ShieldCheck,
  ShieldAlert,
  ExternalLink,
  Shield,
  Copy,
  Check,
  Download,
  Flag,
  Terminal,
} from 'lucide-react';
import { DiagnosticReport } from '../types';

interface DiagnosticResultsProps {
  report: DiagnosticReport;
  onOpenRawJson: () => void;
  onOpenReportDiscrepancy: () => void;
  onOpenFactCard: () => void;
}

export function DiagnosticResults({
  report,
  onOpenRawJson,
  onOpenReportDiscrepancy,
  onOpenFactCard,
}: DiagnosticResultsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isHighRisk = report.score < 50;
  const isSafe = report.score >= 80;

  // Meter styles
  const meterBgClass = isHighRisk
    ? 'bg-gradient-to-br from-[#FF6B35] to-[#FF8555]'
    : isSafe
    ? 'bg-gradient-to-br from-[#2ECC71] to-[#27AE60]'
    : 'bg-gradient-to-br from-[#F39C12] to-[#E67E22]';

  const pillBgClass = isHighRisk
    ? 'bg-[#FADBD8]/60 text-[#E74C3C]'
    : isSafe
    ? 'bg-[#e1f1f2] text-[#2ECC71]'
    : 'bg-[#FEF5E7] text-[#F39C12]';

  return (
    <div
      id="results-view"
      className="w-full bg-white rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-4 sm:p-6 md:p-8 flex flex-col gap-6 transition-all duration-300 border border-[#E0E6ED]"
    >
      {/* Top Diagnostic Ledger Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-[#f4f8f9] px-4 py-2.5 rounded-lg border border-[#E0E6ED]">
        <div className="flex items-center gap-2">
          <span className="text-[12px] font-semibold text-[#4e6073] uppercase tracking-wider">
            Diagnostic ID
          </span>
          <span className="text-[12px] font-bold text-[#0f1e1f]">
            {report.id}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[11px] text-[#7F8C8D] flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>Latency: {report.latency}</span>
          </span>
          <span className="text-[11px] text-[#7F8C8D] flex items-center gap-1">
            <Server className="w-3.5 h-3.5" />
            <span>Node: {report.node}</span>
          </span>
        </div>
      </div>

      {/* SECTION 1: TRUST SCORE DISPLAY */}
      <section className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
        {/* LEFT SIDE: Score Visualizer */}
        <div className="flex flex-col items-center justify-center shrink-0 w-full md:w-48 text-center">
          <div
            id="score-meter"
            className={`relative w-28 h-28 md:w-32 md:h-32 rounded-full ${meterBgClass} flex flex-col items-center justify-center shadow-lg text-white`}
          >
            <span
              id="score-val"
              className="font-display text-[44px] md:text-[48px] font-bold leading-none tracking-tighter"
            >
              {report.score}
            </span>
            <span className="text-[11px] uppercase tracking-widest text-white/90 mt-1 font-semibold">
              / 100
            </span>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center">
              {isHighRisk ? (
                <AlertTriangle className="w-4 h-4 text-[#E74C3C]" />
              ) : isSafe ? (
                <CheckCircle2 className="w-4 h-4 text-[#2ECC71]" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-[#F39C12]" />
              )}
            </div>
          </div>

          <div
            id="score-pill"
            className={`mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${pillBgClass}`}
          >
            {isHighRisk ? (
              <AlertTriangle className="w-4 h-4" />
            ) : isSafe ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <AlertTriangle className="w-4 h-4" />
            )}
            <span
              id="score-label"
              className="text-[14px] uppercase tracking-wider font-bold"
            >
              {report.scoreLabel}
            </span>
          </div>
          <span className="text-[11px] text-[#7F8C8D] mt-1">
            Confidence {report.confidence}
          </span>
        </div>

        {/* RIGHT SIDE: Claim Subject Details */}
        <div className="flex-1 flex flex-col justify-center w-full">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[12px] font-semibold text-[#7F8C8D] tracking-wider uppercase">
              Extracted Claim Target
            </span>
            <span className="px-2.5 py-0.5 rounded bg-[#e1f1f2] text-[11px] text-[#4e6073] font-medium border border-[#d5e6e7]">
              {report.claimCategory}
            </span>
          </div>

          <p
            id="result-claim-text"
            className="text-[16px] md:text-[18px] text-[#0f1e1f] font-medium leading-relaxed"
          >
            “{report.claimTarget}”
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-4 pt-1 text-[#7F8C8D] text-[13px]">
            <span className="flex items-center gap-1.5 text-[#E74C3C] font-medium">
              <Megaphone className="w-4 h-4" />
              <span>{report.detectedChannels}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{report.firstDetected}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Share2 className="w-4 h-4" />
              <span>{report.viralityIndex}</span>
            </span>
          </div>
        </div>
      </section>

      {/* Soft structural divider */}
      <div className="w-full h-px bg-[#dbebec]"></div>

      {/* SECTION 2: CORROBORATING EVIDENCE */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-semibold text-[#7F8C8D] tracking-wider uppercase">
              Corroborating Evidence
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#e1f1f2] text-[#4e6073] font-semibold">
              {report.evidenceList.length} Sources Evaluated
            </span>
          </div>
          <span className="text-[11px] text-[#006a65] font-medium flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Multi-source Verified</span>
          </span>
        </div>

        <div className="flex flex-col gap-2.5 mt-1">
          {report.evidenceList.map((item) => {
            const isRefutes = item.verdictType === 'REFUTES';
            const isPropagates = item.verdictType === 'PROPAGATES';
            const isDenies = item.verdictType === 'DENIES';
            const isSupports = item.verdictType === 'SUPPORTS';

            return (
              <div
                key={item.id}
                className="p-3.5 sm:p-4 rounded-lg bg-[#f4f8f9] hover:bg-[#eaf4f5] transition-colors flex flex-col sm:flex-row items-start justify-between gap-3 border border-[#E0E6ED]"
              >
                <div className="flex items-start gap-3">
                  {/* Icon indicator */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      item.status === 'verified'
                        ? 'bg-[#2ECC71]/15 text-[#2ECC71]'
                        : item.status === 'caution'
                        ? 'bg-[#F39C12]/15 text-[#F39C12]'
                        : 'bg-[#E74C3C]/15 text-[#E74C3C]'
                    }`}
                  >
                    {item.status === 'verified' ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : item.status === 'caution' ? (
                      <AlertTriangle className="w-4 h-4" />
                    ) : (
                      <XCircle className="w-4 h-4" />
                    )}
                  </div>

                  {/* Content details */}
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span
                        className={`text-[12px] font-semibold ${
                          item.status === 'verified'
                            ? 'text-[#2ECC71]'
                            : item.status === 'caution'
                            ? 'text-[#F39C12]'
                            : 'text-[#E74C3C]'
                        }`}
                      >
                        {item.category}
                      </span>
                      <span className="text-[#7F8C8D] text-[13px]">•</span>
                      <span className="text-[13px] font-semibold text-[#0f1e1f]">
                        {item.sourceName}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#dbebec] text-[11px] text-[#006a65] font-medium">
                        {item.domainTrust}
                      </span>
                    </div>

                    <p className="text-[14px] text-[#34495E] mt-1 leading-relaxed">
                      {item.snippet}
                    </p>

                    <div className="flex items-center gap-4 mt-2 text-[11px] text-[#7F8C8D]">
                      {item.url && (
                        <a
                          className="hover:text-[#ab3500] flex items-center gap-1 transition-colors"
                          href={`https://${item.url.replace(/^https?:\/\//, '')}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <span>{item.url}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      <span>{item.archiveMeta}</span>
                    </div>
                  </div>
                </div>

                {/* Verdict Badge */}
                <span
                  className={`shrink-0 text-[11px] px-2.5 py-1 rounded font-bold self-end sm:self-auto ${
                    isRefutes || isSupports
                      ? 'bg-[#2ECC71]/10 text-[#2ECC71]'
                      : isPropagates
                      ? 'bg-[#F39C12]/10 text-[#F39C12]'
                      : 'bg-[#E74C3C]/10 text-[#E74C3C]'
                  }`}
                >
                  {item.verdictType}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Soft structural divider */}
      <div className="w-full h-px bg-[#dbebec]"></div>

      {/* SECTION 3 & SECTION 4 (Side-by-side Bento modules) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* SECTION 3: SOURCE CREDIBILITY (5 cols) */}
        <section className="md:col-span-5 bg-[#f4f8f9]/70 rounded-lg p-4 flex flex-col justify-between border border-[#E0E6ED]">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[12px] font-semibold text-[#7F8C8D] tracking-wider uppercase">
                Source Credibility Index
              </span>
              <ShieldAlert
                className={`w-4 h-4 ${
                  report.sourceCredibility.isAtRisk
                    ? 'text-[#E74C3C]'
                    : 'text-[#2ECC71]'
                }`}
              />
            </div>
            <div
              className={`mt-2 flex items-start gap-1.5 text-[16px] font-semibold ${
                report.sourceCredibility.isAtRisk
                  ? 'text-[#E74C3C]'
                  : 'text-[#2ECC71]'
              }`}
            >
              <AlertTriangle className="w-4 h-4 shrink-0 mt-1" />
              <span>{report.sourceCredibility.statusTitle}</span>
            </div>
            <p className="text-[13px] text-[#34495E] mt-2 leading-relaxed">
              {report.sourceCredibility.description}
            </p>
          </div>

          <div className="mt-4 pt-2 flex flex-col gap-2 text-[11px] text-[#7F8C8D] border-t border-[#E0E6ED]/60">
            <div className="flex justify-between">
              <span>Author Track Record:</span>
              <span
                className={`font-semibold ${
                  report.sourceCredibility.authorRisk === 'danger'
                    ? 'text-[#E74C3C]'
                    : report.sourceCredibility.authorRisk === 'caution'
                    ? 'text-[#F39C12]'
                    : 'text-[#2ECC71]'
                }`}
              >
                {report.sourceCredibility.authorTrackRecord}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Domain Age / Registration:</span>
              <span className="font-semibold text-[#0f1e1f]">
                {report.sourceCredibility.domainAge}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Fact-Checking Consensus:</span>
              <span
                className={`font-semibold ${
                  report.sourceCredibility.consensusRisk === 'danger'
                    ? 'text-[#E74C3C]'
                    : report.sourceCredibility.consensusRisk === 'caution'
                    ? 'text-[#F39C12]'
                    : 'text-[#2ECC71]'
                }`}
              >
                {report.sourceCredibility.factCheckingConsensus}
              </span>
            </div>
          </div>
        </section>

        {/* SECTION 4: AI EXPLANATION (7 cols) */}
        <section className="md:col-span-7 bg-[#f4f8f9]/50 rounded-lg p-4 flex flex-col justify-between border border-[#E0E6ED]">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[12px] font-semibold text-[#7F8C8D] tracking-wider uppercase">
                Algorithmic Synthesis
              </span>
              <span className="px-2 py-0.5 rounded bg-[#e1f1f2] text-[#4e6073] text-[11px] font-medium">
                {report.synthesis.engineVersion}
              </span>
            </div>
            {report.synthesis.paragraphs.map((p, idx) => (
              <p
                key={idx}
                className={`text-[13px] text-[#34495E] leading-relaxed ${
                  idx > 0 ? 'mt-2' : 'mt-2'
                }`}
              >
                {p}
              </p>
            ))}
          </div>

          {/* Synthetic Risk Indicators */}
          <div className="grid grid-cols-3 gap-2 mt-4 pt-2 text-center">
            <div className="bg-white p-2.5 rounded shadow-sm border border-[#E0E6ED]">
              <span className="block text-[11px] text-[#7F8C8D]">
                Sensationalism
              </span>
              <span
                className={`block text-[16px] font-bold ${
                  report.synthesis.sensationalism > 50
                    ? 'text-[#E74C3C]'
                    : 'text-[#2ECC71]'
                }`}
              >
                {report.synthesis.sensationalism}%
              </span>
            </div>
            <div className="bg-white p-2.5 rounded shadow-sm border border-[#E0E6ED]">
              <span className="block text-[11px] text-[#7F8C8D]">
                Corroboration
              </span>
              <span
                className={`block text-[16px] font-bold ${
                  report.synthesis.corroboration > 50
                    ? 'text-[#2ECC71]'
                    : 'text-[#E74C3C]'
                }`}
              >
                {report.synthesis.corroboration}%
              </span>
            </div>
            <div className="bg-white p-2.5 rounded shadow-sm border border-[#E0E6ED]">
              <span className="block text-[11px] text-[#7F8C8D]">
                Domain Trust
              </span>
              <span
                className={`block text-[16px] font-bold ${
                  parseInt(report.synthesis.domainTrust) > 50
                    ? 'text-[#2ECC71]'
                    : 'text-[#E74C3C]'
                }`}
              >
                {report.synthesis.domainTrust}
              </span>
            </div>
          </div>
        </section>
      </div>

      {/* Soft structural divider */}
      <div className="w-full h-px bg-[#dbebec]"></div>

      {/* SECTION 5: RECOMMENDATION & CITIZEN ACTION */}
      <section className="flex flex-col gap-1.5">
        <span className="text-[12px] font-semibold text-[#7F8C8D] tracking-wider uppercase">
          Diagnostic Recommendation
        </span>
        <div className="w-full bg-[#FFF5F0] p-4 rounded-lg shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 border-l-4 border-[#FF6B35]">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-[#FF6B35]/15 text-[#FF6B35] flex items-center justify-center shrink-0 mt-0.5">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-[15px] text-[#0f1e1f] font-semibold">
                {report.recommendation.title}
              </h4>
              <p className="text-[13px] text-[#34495E] mt-0.5">
                {report.recommendation.body}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
            <button
              className="px-3 py-2 rounded-lg bg-white text-[#0f1e1f] hover:bg-[#f4f8f9] text-[12px] font-semibold transition-all shadow-sm border border-[#E0E6ED] flex items-center gap-1.5 cursor-pointer"
              onClick={handleCopyLink}
              type="button"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#2ECC71]" />
                  <span className="text-[#2ECC71]">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#4e6073]" />
                  <span>Copy Link</span>
                </>
              )}
            </button>
            <button
              className="px-3 py-2 rounded-lg bg-[#0f1e1f] text-white hover:bg-[#243334] text-[12px] font-semibold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
              onClick={onOpenFactCard}
              type="button"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Fact Card</span>
            </button>
          </div>
        </div>
      </section>

      {/* Feedback / Registry Audit Strip */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-1 text-[#7F8C8D] text-[12px]">
        <span>
          TruthLens algorithmic assessments follow the IFCN Fact-Checking Code of Principles.
        </span>
        <div className="flex items-center gap-4">
          <button
            className="hover:text-[#ab3500] transition-colors flex items-center gap-1 text-[11px] font-medium cursor-pointer"
            onClick={onOpenReportDiscrepancy}
            type="button"
          >
            <Flag className="w-3 h-3" />
            <span>Report Discrepancy</span>
          </button>
          <button
            className="hover:text-[#ab3500] transition-colors flex items-center gap-1 text-[11px] font-medium cursor-pointer"
            onClick={onOpenRawJson}
            type="button"
          >
            <Terminal className="w-3 h-3" />
            <span>Raw JSON Payload</span>
          </button>
        </div>
      </div>
    </div>
  );
}
