import { truthConfig } from "@/truth/config";
import type { NormalizedTruthInput, TruthStageResult } from "@/truth/types";
import { clampScore } from "@/truth/utils";

export class TruthAnalyzer {
  analyze(input: NormalizedTruthInput): TruthStageResult {
    const weights = truthConfig.completenessWeights;
    const score =
      weights.userRequest +
      (input.intentAnalysis ? weights.intentAnalysis : 0) +
      (input.promptPackage ? weights.promptPackage : 0) +
      (input.routingDecision ? weights.routingDecision : 0) +
      (input.contextSignals.length > 0 ? weights.context : 0) +
      (input.resolvedGoal ? weights.goal : 0) +
      (input.resolvedTasks.length > 0 ? weights.tasks : 0);

    return {
      score: clampScore(score),
      signals: ["truth_architecture_ready", "provider_independent_analysis"],
      warnings: [],
      metadata: { stage: "truth_analysis", algorithmicVerification: false },
    };
  }
}
