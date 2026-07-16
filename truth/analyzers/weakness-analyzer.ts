import type { NormalizedTruthInput, RiskAnalysis, WeaknessAnalysis, WeaknessItem, WeaknessModel } from "@/truth/types";
import { RecommendationPriority, TruthCategory, TruthRiskLevel } from "@/truth/types";
import { clampScore } from "@/truth/utils";

export interface WeaknessAnalyzer {
  analyze(input: NormalizedTruthInput, risk: RiskAnalysis): WeaknessAnalysis;
}

function createWeakness(id: string, summary: string): WeaknessItem {
  return {
    weaknessId: id,
    summary,
    category: TruthCategory.NeedsEvidence,
    severity: TruthRiskLevel.Medium,
    improvementPriority: RecommendationPriority.Medium,
    futureAnalyzerOutput: {},
  };
}

export class DefaultWeaknessAnalyzer implements WeaknessAnalyzer {
  analyze(input: NormalizedTruthInput, risk: RiskAnalysis): WeaknessAnalysis {
    const weaknessList = [
      !input.intentAnalysis ? createWeakness("missing-intent", "Intent analysis is unavailable.") : undefined,
      !input.promptPackage ? createWeakness("missing-prompt", "Prompt package is unavailable.") : undefined,
      !input.routingDecision ? createWeakness("missing-routing", "Routing decision is unavailable.") : undefined,
      input.contextSignals.length === 0 ? createWeakness("missing-context", "Context signals are unavailable.") : undefined,
    ].filter((weakness): weakness is WeaknessItem => Boolean(weakness));
    const weaknesses: WeaknessModel = {
      weaknessSummary: weaknessList.length > 0 ? "Structural weaknesses are present for future truth analysis." : "No structural weaknesses identified at foundation level.",
      weaknessList,
      weaknessCategories: weaknessList.length > 0 ? [TruthCategory.NeedsEvidence] : [],
      futureAnalyzerOutput: {},
    };

    return {
      weaknesses,
      score: clampScore(weaknessList.length / 4),
      signals: ["weakness_model_prepared"],
      warnings: risk.warnings,
      metadata: { stage: "weakness_analysis" },
    };
  }
}
