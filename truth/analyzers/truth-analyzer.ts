import { truthConfig } from "@/truth/config";
import type { NormalizedTruthInput, TruthMetadata, TruthScore, TruthStageResult, TruthWarning } from "@/truth/types";
import { TruthRiskLevel } from "@/truth/types";
import { clampScore } from "@/truth/utils";

export interface TruthAnalyzer {
  analyze(input: NormalizedTruthInput): TruthStageResult;
}

function createMetadata(): TruthMetadata {
  return {
    calculationVersion: truthConfig.calculationVersion,
    providerIndependent: true,
    generatedAt: new Date().toISOString(),
    tags: ["truth-foundation"],
    properties: { algorithmicVerification: false },
    futureExtensions: {},
  };
}

export class DefaultTruthAnalyzer implements TruthAnalyzer {
  analyze(input: NormalizedTruthInput): TruthStageResult {
    const weights = truthConfig.completenessWeights;
    const score = clampScore(
      weights.userRequest +
        (input.intentAnalysis ? weights.intentAnalysis : 0) +
        (input.promptPackage ? weights.promptPackage : 0) +
        (input.routingDecision ? weights.routingDecision : 0) +
        (input.contextSignals.length > 0 ? weights.context : 0) +
        (input.resolvedGoal ? weights.goal : 0) +
        (input.resolvedTasks.length > 0 ? weights.tasks : 0),
    );
    const metadata = createMetadata();
    const truthScore: TruthScore = {
      overallScore: score,
      normalizedScore: score,
      confidenceWeightedScore: score,
      explanation: "Foundation score reflects structured-input readiness only; no truth scoring formula or verification algorithm was executed.",
      calculationVersion: truthConfig.calculationVersion,
      metadata,
    };
    const warnings: TruthWarning[] = input.normalizedUserRequest.length < truthConfig.minimumUserRequestLength
      ? [{ code: "SHORT_INPUT", message: "User request is too short for future truth analysis.", severity: TruthRiskLevel.Medium, metadata: {} }]
      : [];

    return {
      score: truthScore.overallScore,
      signals: ["truth_architecture_ready", "provider_independent_analysis"],
      warnings,
      metadata: { stage: "truth_analysis", calculationVersion: truthScore.calculationVersion },
    };
  }
}
