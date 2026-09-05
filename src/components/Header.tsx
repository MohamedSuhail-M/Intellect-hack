import { Shield, User } from 'lucide-react';

interface HeaderProps {
  onOpenMethodology: () => void;
  onOpenApiDocs: () => void;
}

export function Header({ onOpenMethodology, onOpenApiDocs }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-white border-t-2 border-[#FF6B35] shadow-[0_1px_8px_rgba(44,62,80,0.06)]">
      <div className="h-16 max-w-[56.25rem] mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Logo & Identity */}
        <div className="flex items-center gap-3">
          <img
            alt="TruthLens AI Logo"
            className="h-8 w-auto object-contain"
            src="https://lh3.googleusercontent.com/aida/AEtjO1Wc_utlWnQlDhj4u63uPDaGVcnUaLNLCFmd2fKJg5_CS6XSDw60k4UvHjgfY4qbTL1Vj_UCn22aU6XxcP06J_DLyy890_uJeDTIn1Ld6UbCJ-2P881UIVmaOtgB4BrJh__IDU-DmggDaVd781Kw01dw45N1c3tMP9pJ0YeRqLiWTn2tuA1k80-1YloTOoj-Q3mEXHANo9rdMMIij47krgfb9lhjzT9rGYMbxReGrBWCyZ7FpI8jcLGDId0"
            onError={(e) => {
              // Graceful fallback if hotlink is unavailable in certain sandboxes
              e.currentTarget.style.display = 'none';
              const fallback = document.getElementById('logo-icon-fallback');
              if (fallback) fallback.style.display = 'flex';
            }}
          />
          <div
            id="logo-icon-fallback"
            className="hidden h-8 w-8 rounded-lg bg-[#FF6B35] items-center justify-center text-white"
          >
            <Shield className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-[16px] tracking-tight text-[#0f1e1f] leading-none">
              TRUTHLENS AI
            </span>
            <span className="text-[11px] font-medium text-[#7F8C8D] mt-0.5">
              Credibility Diagnostic Engine
            </span>
          </div>
        </div>

        {/* Status & Navigation */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-[#f4f8f9] border border-[#E0E6ED]">
            <span className="w-2 h-2 rounded-full bg-[#2ECC71] animate-pulse"></span>
            <span className="text-[11px] text-[#006a65] font-medium">
              Live Engine v1.0
            </span>
          </div>

          <nav className="flex items-center gap-1">
            <button
              onClick={onOpenMethodology}
              className="text-[12px] font-medium text-[#594139] hover:text-[#0f1e1f] px-3 py-1.5 rounded-lg transition-colors"
              type="button"
            >
              Methodology
            </button>
            <button
              onClick={onOpenApiDocs}
              className="text-[12px] font-medium text-[#594139] hover:text-[#0f1e1f] px-3 py-1.5 rounded-lg transition-colors"
              type="button"
            >
              API Docs
            </button>
          </nav>

          <div
            className="w-8 h-8 rounded-full bg-[#ab3500] flex items-center justify-center text-white shadow-sm"
            title="Analyst Workspace"
          >
            <User className="w-4 h-4" />
          </div>
        </div>
      </div>
    </header>
  );
}
