export type TruthResearchDomain =
  | "logical-consistency"
  | "reasoning"
  | "claim"
  | "evidence"
  | "trust"
  | "confidence"
  | "risk"
  | "citation"
  | "consensus"
  | "knowledge"
  | "hallucination";

export interface TruthResearchModule<TInput = unknown, TOutput = unknown> {
  readonly domain: TruthResearchDomain;
  readonly providerIndependent: true;
  readonly implemented: false;
  prepare(input: TInput): TruthResearchPlaceholder<TOutput>;
}

export type TruthResearchPlaceholder<TOutput = unknown> = Readonly<{
  domain: TruthResearchDomain;
  implemented: false;
  output: TOutput | null;
}>;

export type LogicalConsistencyResearch = TruthResearchModule;
export type ReasoningResearch = TruthResearchModule;
export type ClaimResearch = TruthResearchModule;
export type EvidenceResearch = TruthResearchModule;
export type TrustResearch = TruthResearchModule;
export type ConfidenceResearch = TruthResearchModule;
export type RiskResearch = TruthResearchModule;
export type CitationResearch = TruthResearchModule;
export type ConsensusResearch = TruthResearchModule;
export type KnowledgeResearch = TruthResearchModule;
export type HallucinationResearch = TruthResearchModule;
