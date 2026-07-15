import {
  ExecutionStrategy,
  RoutingPriority,
  RoutingTier,
  type FallbackPlan,
  type NormalizedRouterInput,
  type ProviderCapabilityProfile,
  type RoutingDecision,
  type RoutingScore,
} from "@/router/types";

function resolvePriority(input: NormalizedRouterInput) {
  if (input.intentAnalysis.priority === "critical")
    return RoutingPriority.Critical;
  if (input.intentAnalysis.priority === "high") return RoutingPriority.High;
  if (input.intentAnalysis.priority === "low") return RoutingPriority.Low;
  return RoutingPriority.Normal;
}

function buildWarnings(input: NormalizedRouterInput, score: RoutingScore) {
  const warnings = [
    ...input.intentAnalysis.warnings,
    ...input.promptPackage.warnings,
  ];
  if (score.confidenceScore < 0.5)
    warnings.push("Routing confidence is below the recommended threshold.");
  if (input.promptPackage.providerHints.requiresFreshData)
    warnings.push(
      "Route may require future fresh-data capability before execution.",
    );
  return [...new Set(warnings)];
}

export class RoutingDecisionBuilder {
  build(
    input: NormalizedRouterInput,
    selected: ProviderCapabilityProfile,
    candidates: readonly ProviderCapabilityProfile[],
    score: RoutingScore,
    fallbackPlan: FallbackPlan,
  ): RoutingDecision {
    return {
      selectedProvider: selected.provider,
      candidateProviders: candidates.map((candidate) => candidate.provider),
      recommendedModel: selected.defaultModel,
      executionStrategy:
        candidates.length > 1
          ? ExecutionStrategy.FallbackReady
          : ExecutionStrategy.SingleProvider,
      fallbackChain: [
        selected.provider,
        ...fallbackPlan.secondaryProviders,
      ].filter(
        (provider, index, providers) => providers.indexOf(provider) === index,
      ),
      fallbackPlan,
      reasoningMode: input.promptPackage.reasoningMode,
      temperatureHint: input.promptPackage.temperatureHint,
      priority: resolvePriority(input),
      estimatedCostTier: selected.costTier,
      estimatedLatencyTier: selected.latencyTier,
      estimatedQualityTier: selected.qualityTier ?? RoutingTier.Medium,
      confidence: score.confidenceScore,
      routingScore: score,
      warnings: buildWarnings(input, score),
      metadata: {
        ...(input.metadata ?? {}),
        strategy: input.strategy,
        intent: input.intentAnalysis.intent,
        promptQuality: input.promptPackage.qualityScore.overall,
        selectedProvider: selected.provider,
        candidateCount: candidates.length,
      },
    };
  }
}
