export type TruthInnovationHookKind =
  | "hallucination-detection"
  | "claim-verification"
  | "evidence-weighting"
  | "source-reliability"
  | "knowledge-freshness"
  | "reasoning-verification"
  | "contradiction-detection"
  | "consensus-analysis"
  | "fact-graph"
  | "trust-ranking"
  | "dynamic-truth-intelligence"
  | "adaptive-confidence"
  | "patentable-algorithm"
  | string;

export type TruthInnovationHook = Readonly<{
  id: string;
  kind: TruthInnovationHookKind;
  providerIndependent: true;
  implemented: false;
  externalAccess: false;
}>;

export const truthInnovationHooks: readonly TruthInnovationHook[] =
  Object.freeze(
    [
      "hallucination-detection",
      "claim-verification",
      "evidence-weighting",
      "source-reliability",
      "knowledge-freshness",
      "reasoning-verification",
      "contradiction-detection",
      "consensus-analysis",
      "fact-graph",
      "trust-ranking",
      "dynamic-truth-intelligence",
      "adaptive-confidence",
      "patentable-algorithm",
    ].map((kind) => ({
      id: `truth.hook.${kind}`,
      kind,
      providerIndependent: true as const,
      implemented: false as const,
      externalAccess: false as const,
    })),
  );
