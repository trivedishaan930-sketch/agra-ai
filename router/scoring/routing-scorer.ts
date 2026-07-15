import {
  RoutingStrategy,
  RoutingTier,
  type NormalizedRouterInput,
  type ProviderCapabilityProfile,
  type RoutingScore,
} from "@/router/types";
import { tierToScore } from "@/router/utils";

function clamp(value: number) {
  return Math.max(0, Math.min(1, Number(value.toFixed(2))));
}

function average(values: readonly number[]) {
  return clamp(values.reduce((sum, value) => sum + value, 0) / values.length);
}

function strategyBoost(
  strategy: RoutingStrategy,
  profile: ProviderCapabilityProfile,
) {
  if (
    strategy === RoutingStrategy.CodingOptimized &&
    profile.strengths.includes("coding")
  )
    return 0.15;
  if (
    strategy === RoutingStrategy.ResearchOptimized &&
    profile.strengths.includes("research")
  )
    return 0.15;
  if (
    strategy === RoutingStrategy.WritingOptimized &&
    profile.strengths.includes("writing")
  )
    return 0.15;
  if (
    strategy === RoutingStrategy.TranslationOptimized &&
    profile.strengths.includes("translation")
  )
    return 0.15;
  if (
    strategy === RoutingStrategy.AnalysisOptimized &&
    profile.strengths.includes("analysis")
  )
    return 0.15;
  if (
    strategy === RoutingStrategy.Fastest &&
    profile.latencyTier === RoutingTier.Low
  )
    return 0.15;
  if (
    strategy === RoutingStrategy.LowestCost &&
    profile.costTier === RoutingTier.Low
  )
    return 0.15;
  if (
    strategy === RoutingStrategy.HighestQuality &&
    profile.qualityTier === RoutingTier.High
  )
    return 0.15;
  return 0;
}

export class RoutingScorer {
  score(
    input: NormalizedRouterInput,
    profile: ProviderCapabilityProfile,
  ): RoutingScore {
    const capabilityScore = average([
      input.promptPackage.providerHints.supportsJsonOutput
        ? Number(profile.supportsJson)
        : 1,
      input.promptPackage.providerHints.requiresLongContext
        ? Number(profile.contextWindowTokens >= 32_000)
        : 1,
      input.promptPackage.providerHints.requiresCodeContext
        ? Number(
            profile.supportsReasoning || profile.strengths.includes("coding"),
          )
        : 1,
    ]);
    const intentAlignment = clamp(
      0.65 + strategyBoost(input.strategy, profile),
    );
    const promptCompatibility = clamp(
      (input.promptPackage.qualityScore.overall + capabilityScore) / 2,
    );
    const estimatedQuality = tierToScore(profile.qualityTier);
    const estimatedLatency = tierToScore(profile.latencyTier, true);
    const estimatedCost = tierToScore(profile.costTier, true);
    const reliabilityScore = clamp(profile.reliabilityScore);
    const confidenceScore = average([
      input.intentAnalysis.confidence,
      promptCompatibility,
      reliabilityScore,
    ]);
    const futureScalabilityScore = clamp(
      profile.supportsStructuredOutput || profile.supportsMultimodal
        ? 0.85
        : 0.7,
    );

    const scores = {
      capabilityScore,
      intentAlignment,
      promptCompatibility,
      estimatedQuality,
      estimatedLatency,
      estimatedCost,
      reliabilityScore,
      confidenceScore,
      futureScalabilityScore,
    };

    return {
      ...scores,
      overall: average(Object.values(scores)),
    };
  }
}
