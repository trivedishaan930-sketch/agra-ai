export type TruthExtensionKind =
  | "analyzer"
  | "scoring"
  | "evidence"
  | "reasoning"
  | "risk"
  | "confidence"
  | "output"
  | "plugin"
  | "research"
  | string;

export interface TruthExtensionContract<TConfig = unknown> {
  readonly id: string;
  readonly kind: TruthExtensionKind;
  readonly version: string;
  readonly providerIndependent: true;
  readonly enabled: boolean;
  readonly config: TConfig;
  attach(): TruthExtensionAttachment;
}

export type TruthExtensionAttachment = Readonly<{
  attached: false;
  requiresEngineModification: false;
  architectureOnly: true;
}>;

export type AnalyzerExtension = TruthExtensionContract;
export type ScoringExtension = TruthExtensionContract;
export type EvidenceExtension = TruthExtensionContract;
export type ReasoningExtension = TruthExtensionContract;
export type RiskExtension = TruthExtensionContract;
export type ConfidenceExtension = TruthExtensionContract;
export type OutputExtension = TruthExtensionContract;
export type PluginExtension = TruthExtensionContract;
export type ResearchExtension = TruthExtensionContract;
