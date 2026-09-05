import { Link2, History, FlaskConical, X, RotateCw, Wand2 } from 'lucide-react';

interface InputWorkbenchProps {
  claimText: string;
  setClaimText: (val: string) => void;
  urlText: string;
  setUrlText: (val: string) => void;
  activePreset: 'risk' | 'safe' | 'custom';
  onSelectPresetRisk: () => void;
  onSelectPresetSafe: () => void;
  onSimulateRun: () => void;
  onAnalyze: () => void;
  onClear: () => void;
  onReload: () => void;
  onSelectChip: (label: string) => void;
  isLoading: boolean;
}

export function InputWorkbench({
  claimText,
  setClaimText,
  urlText,
  setUrlText,
  activePreset,
  onSelectPresetRisk,
  onSelectPresetSafe,
  onSimulateRun,
  onAnalyze,
  onClear,
  onReload,
  onSelectChip,
  isLoading,
}: InputWorkbenchProps) {
  return (
    <section className="w-full bg-white rounded-xl shadow-[0_4px_16px_rgba(44,62,80,0.06)] p-6 md:p-8">
      {/* Header and Preset Switcher */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-6">
        <div>
          <span className="text-[12px] font-semibold text-[#ab3500] tracking-widest uppercase">
            Diagnostic Assessment
          </span>
          <h1 className="text-[24px] md:text-[28px] font-bold text-[#0f1e1f] tracking-tight mt-1 leading-tight">
            Analyze Claims & Digital Content with AI
          </h1>
          <p className="text-[14px] text-[#7F8C8D] mt-1 max-w-2xl leading-relaxed">
            Real-time verification against fact-check registries, source credibility metrics, and corroboration engines.
          </p>
        </div>

        {/* Preset Scenario Switcher */}
        <div className="flex items-center gap-1 bg-[#f4f8f9] p-1 rounded-lg self-start md:self-auto border border-[#E0E6ED]">
          <button
            className={`px-3 py-1.5 rounded text-[11px] font-semibold transition-all ${
              activePreset === 'risk'
                ? 'bg-white text-[#ab3500] shadow-sm font-bold'
                : 'text-[#7F8C8D] hover:text-[#0f1e1f]'
            }`}
            onClick={onSelectPresetRisk}
            type="button"
          >
            High Risk (34)
          </button>
          <button
            className={`px-3 py-1.5 rounded text-[11px] font-semibold transition-all ${
              activePreset === 'safe'
                ? 'bg-white text-[#ab3500] shadow-sm font-bold'
                : 'text-[#7F8C8D] hover:text-[#0f1e1f]'
            }`}
            onClick={onSelectPresetSafe}
            type="button"
          >
            Verified (92)
          </button>
          <button
            className="px-3 py-1.5 rounded text-[11px] font-semibold text-[#7F8C8D] hover:text-[#0f1e1f] transition-all"
            onClick={onSimulateRun}
            type="button"
          >
            Simulate Run
          </button>
        </div>
      </div>

      {/* Asymmetric Dual Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
        {/* Text Claim Input Area (7 cols) */}
        <div className="md:col-span-7 flex flex-col">
          <div className="flex items-center justify-between mb-1.5">
            <label
              className="text-[12px] font-semibold text-[#4e6073] uppercase tracking-wider"
              htmlFor="claim-input"
            >
              Text or Headline Claim
            </label>
            <span className="text-[11px] text-[#7F8C8D]">
              {claimText.length} chars
            </span>
          </div>
          <div className="relative flex-1">
            <textarea
              className="w-full h-full min-h-[120px] p-3.5 rounded-lg bg-[#f4f8f9] text-[#0f1e1f] text-[14px] placeholder-[#7F8C8D] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#7cf6ec] transition-all resize-none border border-transparent focus:border-[#79f3ea]"
              id="claim-input"
              placeholder="Paste suspicious claim or article excerpt here..."
              rows={4}
              value={claimText}
              onChange={(e) => setClaimText(e.target.value)}
            />
          </div>
        </div>

        {/* URL Input Area & Quick Chips (5 cols) */}
        <div className="md:col-span-5 flex flex-col justify-between">
          <div className="flex flex-col">
            <label
              className="text-[12px] font-semibold text-[#4e6073] uppercase tracking-wider mb-1.5"
              htmlFor="url-input"
            >
              Or Verify Digital Source URL
            </label>
            <div className="relative flex items-center">
              <Link2 className="absolute left-3.5 text-[#4e6073] w-4 h-4" />
              <input
                className="w-full h-11 pl-10 pr-3 rounded-lg bg-[#f4f8f9] text-[#0f1e1f] text-[13px] placeholder-[#7F8C8D] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#7cf6ec] transition-all border border-transparent focus:border-[#79f3ea]"
                id="url-input"
                placeholder="https://news-outlet.org/report/..."
                type="url"
                value={urlText}
                onChange={(e) => setUrlText(e.target.value)}
              />
            </div>
          </div>

          {/* Quick Selector Chips */}
          <div className="mt-4">
            <span className="text-[11px] text-[#7F8C8D] block mb-1.5 font-medium">
              Quick Inspect:
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                className="chip-item px-3 py-1 rounded-full bg-[#e1f1f2] text-[#594139] hover:bg-[#dbebec] text-[11px] font-medium transition-colors flex items-center gap-1.5 border border-[#d5e6e7]"
                type="button"
                onClick={() => onSelectChip('Municipal Water Alert')}
              >
                <History className="w-3.5 h-3.5 text-[#006a65]" />
                <span>Municipal Water Alert</span>
              </button>
              <button
                className="chip-item px-3 py-1 rounded-full bg-[#e1f1f2] text-[#594139] hover:bg-[#dbebec] text-[11px] font-medium transition-colors flex items-center gap-1.5 border border-[#d5e6e7]"
                type="button"
                onClick={() => onSelectChip('Solar Grid Freeze')}
              >
                <History className="w-3.5 h-3.5 text-[#006a65]" />
                <span>Solar Grid Freeze</span>
              </button>
              <button
                className="chip-item px-3 py-1 rounded-full bg-[#e1f1f2] text-[#594139] hover:bg-[#dbebec] text-[11px] font-medium transition-colors flex items-center gap-1.5 border border-[#d5e6e7]"
                type="button"
                onClick={() => onSelectChip('Vaccine Batch C-12')}
              >
                <FlaskConical className="w-3.5 h-3.5 text-[#006a65]" />
                <span>Vaccine Batch C-12</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-6 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#f8fafb] p-3 rounded-lg border border-[#E0E6ED]">
        <div className="flex items-center gap-3">
          <button
            className="text-[12px] font-medium text-[#7F8C8D] hover:text-[#0f1e1f] transition-colors flex items-center gap-1 px-2.5 py-1 rounded"
            onClick={onClear}
            type="button"
          >
            <X className="w-3.5 h-3.5" />
            <span>Clear Inputs</span>
          </button>
          <span className="w-1 h-1 rounded-full bg-[#7F8C8D]/40"></span>
          <button
            className="text-[12px] font-semibold text-[#006a65] hover:text-[#ab3500] transition-colors flex items-center gap-1 px-2.5 py-1 rounded"
            onClick={onReload}
            type="button"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>Reload Case</span>
          </button>
        </div>

        <button
          className="w-full sm:w-auto px-10 py-3 rounded-xl bg-[#FF6B35] text-white text-[15px] font-semibold tracking-wide hover:brightness-105 active:scale-[0.98] transition-all shadow-[0_4px_14px_rgba(255,107,53,0.35)] flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
          onClick={onAnalyze}
          type="button"
          disabled={isLoading}
        >
          <Wand2 className="w-4 h-4" />
          <span>ANALYZE CLAIM</span>
        </button>
      </div>
    </section>
  );
}
