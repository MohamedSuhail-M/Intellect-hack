import { useState } from 'react';
import { Header } from './components/Header';
import { InputWorkbench } from './components/InputWorkbench';
import { LoadingView } from './components/LoadingView';
import { DiagnosticResults } from './components/DiagnosticResults';
import { Footer } from './components/Footer';
import {
  RawJsonModal,
  ReportDiscrepancyModal,
  MethodologyModal,
  ApiDocsModal,
  FactCardModal,
  InfoModal,
} from './components/Modals';
import {
  HIGH_RISK_REPORT,
  VERIFIED_SAFE_REPORT,
  QUICK_PRESETS,
  generateReportForCustomInput,
} from './data/presets';
import { DiagnosticReport } from './types';

export default function App() {
  const [activePreset, setActivePreset] = useState<'risk' | 'safe' | 'custom'>('risk');
  const [claimText, setClaimText] = useState(HIGH_RISK_REPORT.rawInputClaim);
  const [urlText, setUrlText] = useState(HIGH_RISK_REPORT.rawInputUrl);
  const [report, setReport] = useState<DiagnosticReport>(HIGH_RISK_REPORT);
  const [isLoading, setIsLoading] = useState(false);

  // Modals state
  const [isRawJsonOpen, setIsRawJsonOpen] = useState(false);
  const [isDiscrepancyOpen, setIsDiscrepancyOpen] = useState(false);
  const [isMethodologyOpen, setIsMethodologyOpen] = useState(false);
  const [isApiDocsOpen, setIsApiDocsOpen] = useState(false);
  const [isFactCardOpen, setIsFactCardOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isProtocolOpen, setIsProtocolOpen] = useState(false);

  const runAnalysis = (customReport?: DiagnosticReport) => {
    setIsLoading(true);
    setTimeout(() => {
      if (customReport) {
        setReport(customReport);
      } else {
        const generated = generateReportForCustomInput(claimText, urlText);
        setReport(generated);
      }
      setIsLoading(false);
    }, 1100);
  };

  const handleSelectPresetRisk = () => {
    setActivePreset('risk');
    setClaimText(HIGH_RISK_REPORT.rawInputClaim);
    setUrlText(HIGH_RISK_REPORT.rawInputUrl);
    setReport(HIGH_RISK_REPORT);
  };

  const handleSelectPresetSafe = () => {
    setActivePreset('safe');
    setClaimText(VERIFIED_SAFE_REPORT.rawInputClaim);
    setUrlText(VERIFIED_SAFE_REPORT.rawInputUrl);
    setReport(VERIFIED_SAFE_REPORT);
  };

  const handleSimulateRun = () => {
    runAnalysis();
  };

  const handleAnalyze = () => {
    runAnalysis();
  };

  const handleClear = () => {
    setClaimText('');
    setUrlText('');
  };

  const handleReload = () => {
    if (activePreset === 'risk') {
      handleSelectPresetRisk();
    } else if (activePreset === 'safe') {
      handleSelectPresetSafe();
    } else {
      runAnalysis();
    }
  };

  const handleSelectChip = (label: string) => {
    setActivePreset('custom');
    const preset = QUICK_PRESETS[label];
    if (preset) {
      setClaimText(preset.rawInputClaim);
      setUrlText(preset.rawInputUrl);
      runAnalysis(preset);
    } else {
      setClaimText(label);
      runAnalysis();
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#ECF0F1]">
      {/* Top Fixed Header */}
      <Header
        onOpenMethodology={() => setIsMethodologyOpen(true)}
        onOpenApiDocs={() => setIsApiDocsOpen(true)}
      />

      {/* Main Workspace */}
      <main className="w-full pt-16 flex-1">
        <div className="max-w-[56.25rem] mx-auto px-4 md:px-6 lg:px-8 py-8 flex flex-col gap-8">
          {/* Top Workbench Inputs */}
          <InputWorkbench
            claimText={claimText}
            setClaimText={(val) => {
              setClaimText(val);
              setActivePreset('custom');
            }}
            urlText={urlText}
            setUrlText={(val) => {
              setUrlText(val);
              setActivePreset('custom');
            }}
            activePreset={activePreset}
            onSelectPresetRisk={handleSelectPresetRisk}
            onSelectPresetSafe={handleSelectPresetSafe}
            onSimulateRun={handleSimulateRun}
            onAnalyze={handleAnalyze}
            onClear={handleClear}
            onReload={handleReload}
            onSelectChip={handleSelectChip}
            isLoading={isLoading}
          />

          {/* Loading or Results Section */}
          {isLoading ? (
            <LoadingView />
          ) : (
            <DiagnosticResults
              report={report}
              onOpenRawJson={() => setIsRawJsonOpen(true)}
              onOpenReportDiscrepancy={() => setIsDiscrepancyOpen(true)}
              onOpenFactCard={() => setIsFactCardOpen(true)}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onOpenTerms={() => setIsTermsOpen(true)}
        onOpenProtocol={() => setIsProtocolOpen(true)}
      />

      {/* Modals & Dialogs */}
      {isRawJsonOpen && (
        <RawJsonModal
          report={report}
          onClose={() => setIsRawJsonOpen(false)}
        />
      )}

      {isDiscrepancyOpen && (
        <ReportDiscrepancyModal
          reportId={report.id}
          onClose={() => setIsDiscrepancyOpen(false)}
        />
      )}

      {isMethodologyOpen && (
        <MethodologyModal onClose={() => setIsMethodologyOpen(false)} />
      )}

      {isApiDocsOpen && (
        <ApiDocsModal onClose={() => setIsApiDocsOpen(false)} />
      )}

      {isFactCardOpen && (
        <FactCardModal
          report={report}
          onClose={() => setIsFactCardOpen(false)}
        />
      )}

      {isPrivacyOpen && (
        <InfoModal
          title="Privacy Policy"
          onClose={() => setIsPrivacyOpen(false)}
        >
          <p>
            TruthLens AI is dedicated to privacy preservation in digital claim verification.
            Queries submitted through this interface are processed in-memory against certified fact-check indices.
          </p>
          <p>
            No personal identifying data (IP, browser fingerprint, or geographic telemetry) is tied to query payloads
            unless explicitly submitted via discrepancy reports.
          </p>
        </InfoModal>
      )}

      {isTermsOpen && (
        <InfoModal
          title="Terms of Service"
          onClose={() => setIsTermsOpen(false)}
        >
          <p>
            Diagnostic outputs provided by TruthLens AI represent algorithmic syntheses of publicly accessible,
            accredited fact-checking registries and domain security telemetry.
          </p>
          <p>
            These assessments are intended to assist public discourse, media research, and institutional oversight,
            and do not constitute formal legal or emergency advisories.
          </p>
        </InfoModal>
      )}

      {isProtocolOpen && (
        <InfoModal
          title="Diagnostic Protocol & Verification Flow"
          onClose={() => setIsProtocolOpen(false)}
        >
          <p>
            <strong>Phase 1: Claim Extraction & Normalization</strong><br />
            Input text and URLs are parsed for atomic assertions, target entities, and geographical qualifiers.
          </p>
          <p>
            <strong>Phase 2: Registry Corroboration</strong><br />
            Queried concurrently against 14 IFCN-certified repositories and official regulatory agency gazettes.
          </p>
          <p>
            <strong>Phase 3: Narrative Vector Topology & Domain Reputation</strong><br />
            Evaluates sensationalism indices, propagation vectors, and DNS/DNSSEC authenticity scores.
          </p>
        </InfoModal>
      )}
    </div>
  );
}
