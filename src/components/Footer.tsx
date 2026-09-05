interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onOpenProtocol: () => void;
}

export function Footer({
  onOpenPrivacy,
  onOpenTerms,
  onOpenProtocol,
}: FooterProps) {
  return (
    <footer className="w-full bg-white border-t border-[#E0E6ED] py-6 mt-12">
      <div className="max-w-[56.25rem] mx-auto px-4 md:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-[13px] text-[#7F8C8D]">
          © 2025 TruthLens AI. Real-time truth verification system.
        </div>
        <div className="flex items-center gap-6">
          <button
            onClick={onOpenPrivacy}
            className="text-[13px] text-[#7F8C8D] hover:text-[#0f1e1f] transition-colors cursor-pointer"
            type="button"
          >
            Privacy Policy
          </button>
          <button
            onClick={onOpenTerms}
            className="text-[13px] text-[#7F8C8D] hover:text-[#0f1e1f] transition-colors cursor-pointer"
            type="button"
          >
            Terms of Service
          </button>
          <button
            onClick={onOpenProtocol}
            className="text-[13px] text-[#7F8C8D] hover:text-[#0f1e1f] transition-colors cursor-pointer"
            type="button"
          >
            Diagnostic Protocol
          </button>
        </div>
      </div>
    </footer>
  );
}
