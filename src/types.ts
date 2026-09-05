export interface EvidenceItem {
  id: string;
  category: string;
  sourceName: string;
  domainTrust: string;
  snippet: string;
  url?: string;
  archiveMeta: string;
  verdictType: 'REFUTES' | 'PROPAGATES' | 'DENIES' | 'SUPPORTS';
  status: 'verified' | 'caution' | 'danger';
}

export interface SourceCredibility {
  statusTitle: string;
  isAtRisk: boolean;
  description: string;
  authorTrackRecord: string;
  authorRisk: 'danger' | 'caution' | 'verified';
  domainAge: string;
  factCheckingConsensus: string;
  consensusRisk: 'danger' | 'caution' | 'verified';
}

export interface AlgorithmicSynthesis {
  engineVersion: string;
  paragraphs: string[];
  sensationalism: number;
  corroboration: number;
  domainTrust: string;
}

export interface Recommendation {
  title: string;
  body: string;
}

export interface DiagnosticReport {
  id: string;
  latency: string;
  node: string;
  claimTarget: string;
  claimCategory: string;
  detectedChannels: string;
  firstDetected: string;
  viralityIndex: string;
  score: number;
  scoreLabel: 'HIGH RISK' | 'VERIFIED SAFE' | 'MODERATE CAUTION';
  confidence: string;
  evidenceList: EvidenceItem[];
  sourceCredibility: SourceCredibility;
  synthesis: AlgorithmicSynthesis;
  recommendation: Recommendation;
  rawInputClaim: string;
  rawInputUrl: string;
}
