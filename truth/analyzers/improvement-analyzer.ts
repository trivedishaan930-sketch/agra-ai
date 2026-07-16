import type { ImprovementAnalysis, TruthRecommendation, WeaknessAnalysis } from "@/truth/types";
import { RecommendationPriority } from "@/truth/types";
import { clampScore } from "@/truth/utils";

export interface ImprovementAnalyzer {
  analyze(weakness: WeaknessAnalysis): ImprovementAnalysis;
}

export class DefaultImprovementAnalyzer implements ImprovementAnalyzer {
  analyze(weakness: WeaknessAnalysis): ImprovementAnalysis {
    const recommendations: TruthRecommendation[] = weakness.weaknesses.weaknessList.length > 0
      ? weakness.weaknesses.weaknessList.map((item) => ({
          recommendationId: `improve-${item.weaknessId}`,
          improvementSuggestion: `Provide structured data for: ${item.summary}`,
          priority: item.improvementPriority,
          expectedImprovement: "Improves future truth-analysis readiness.",
          affectedMetrics: ["evidence", "confidence", "reliability"],
          futureAutoSuggestions: {},
        }))
      : [{
          recommendationId: "maintain-structure",
          improvementSuggestion: "Maintain structured engine inputs for future truth analysis.",
          priority: RecommendationPriority.Low,
          expectedImprovement: "Preserves current architecture readiness.",
          affectedMetrics: ["truth", "confidence"],
          futureAutoSuggestions: {},
        }];

    return {
      recommendations,
      score: clampScore(1 - weakness.score),
      signals: ["recommendation_model_prepared"],
      warnings: [],
      metadata: { stage: "improvement_analysis" },
    };
  }
}
