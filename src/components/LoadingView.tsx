import { RefreshCw } from 'lucide-react';

export function LoadingView() {
  return (
    <div className="w-full bg-white rounded-xl p-10 md:p-14 shadow-[0_4px_16px_rgba(44,62,80,0.06)] flex flex-col items-center justify-center text-center animate-in fade-in duration-300">
      <div className="relative w-20 h-20 mb-4 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-[#7cf6ec]/30 animate-ping"></div>
        <div className="w-16 h-16 rounded-full bg-[#d5e6e7] flex items-center justify-center text-[#006a65]">
          <RefreshCw className="w-8 h-8 animate-spin" />
        </div>
      </div>
      <h3 className="text-[20px] font-semibold text-[#0f1e1f]">
        Corroborating 14 Registry Feeds...
      </h3>
      <p className="text-[13px] text-[#7F8C8D] mt-1.5 max-w-sm leading-relaxed">
        Cross-referencing domain certificates, Reuters fact-checking networks, and government health databases.
      </p>
      <div className="w-64 h-1.5 bg-[#dbebec] rounded-full overflow-hidden mt-6">
        <div className="w-3/4 h-full bg-[#ab3500] animate-pulse"></div>
      </div>
    </div>
  );
}
