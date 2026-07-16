import type { ImprovementAnalysis, WeaknessAnalysis } from "@/truth/types";
import { clampScore } from "@/truth/utils";

export class ImprovementAnalyzer {
  analyze(weakness: WeaknessAnalysis): ImprovementAnalysis {
    const improvementSuggestions = weakness.weaknessSummary.length > 0
      ? weakness.weaknessSummary.map((summary) => `Provide structured ${summary.toLowerCase().replace(" is unavailable.", " data.")}`)
      : ["Input structure is sufficient for the current foundation-level truth package."];

    return {
      improvementSuggestions,
      score: clampScore(1 - weakness.score),
      signals: ["improvement_suggestions_prepared"],
      warnings: [],
      metadata: { stage: "improvement_analysis" },
    };
  }
}
