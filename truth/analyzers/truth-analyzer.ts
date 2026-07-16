import { truthConfig } from "@/truth/config";
import type {
  NormalizedTruthInput,
  TruthMetadata,
  TruthStageResult,
  TruthWarning,
} from "@/truth/types";
import { TruthRiskLevel } from "@/truth/types";
import { clampScore } from "@/truth/utils";

export interface TruthAnalyzer {
  analyze(input: NormalizedTruthInput): TruthStageResult;
}

function metadata(input: NormalizedTruthInput): TruthMetadata {
  return {
    analysisId: input.metadata?.analysisId as string | undefined,
    requestId: input.metadata?.requestId as string | undefined,
    calculationVersion: truthConfig.versioning.scoreVersion,
    providerIndependent: true,
    generatedAt: new Date().toISOString(),
    tags: ["truth-foundation", "provider-independent"],
    properties: { algorithmicVerification: false },
    futureExtensions: input.futureExtensions ?? {},
  };
}

export class DefaultTruthAnalyzer implements TruthAnalyzer {
  analyze(input: NormalizedTruthInput): TruthStageResult {
    const weights = truthConfig.scoring.completenessWeights;
    const score = clampScore(
      weights.userRequest +
        (input.intentAnalysis ? weights.intentAnalysis : 0) +
        (input.promptPackage ? weights.promptPackage : 0) +
        (input.routingDecision ? weights.routingDecision : 0) +
        (input.contextSignals.length > 0 ? weights.context : 0) +
        (input.resolvedGoal ? weights.goal : 0) +
        (input.resolvedTasks.length > 0 ? weights.tasks : 0),
    );
    const warnings: TruthWarning[] =
      input.normalizedUserRequest.length <
      truthConfig.validation.minimumUserRequestLength
        ? [
            {
              code: "SHORT_INPUT",
              message: "User request is too short for future truth analysis.",
              severity: TruthRiskLevel.Medium,
              metadata: {},
            },
          ]
        : [];
    return {
      score,
      signals: ["truth_architecture_ready", "provider_independent_analysis"],
      warnings,
      metadata: {
        stage: "truth_analysis",
        outputVersion: truthConfig.versioning.outputVersion,
        generatedAt: metadata(input).generatedAt,
      },
    };
  }
}
