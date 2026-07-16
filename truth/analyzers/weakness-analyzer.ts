import type { NormalizedTruthInput, RiskAnalysis, WeaknessAnalysis, WeaknessItem, WeaknessModel } from "@/truth/types";
import { RecommendationPriority, TruthCategory, TruthRiskLevel } from "@/truth/types";
import { clampScore } from "@/truth/utils";
export interface WeaknessAnalyzer { analyze(input: NormalizedTruthInput, risk: RiskAnalysis): WeaknessAnalysis }
function weakness(id: string, summary: string): WeaknessItem { return { weaknessId: id, summary, category: TruthCategory.NeedsEvidence, severity: TruthRiskLevel.Medium, improvementPriority: RecommendationPriority.Medium, futureAnalyzerOutput: {} }; }
export class DefaultWeaknessAnalyzer implements WeaknessAnalyzer {
  analyze(input: NormalizedTruthInput, risk: RiskAnalysis): WeaknessAnalysis {
    const weaknessList = [!input.intentAnalysis ? weakness("missing-intent", "Intent analysis is unavailable.") : undefined, !input.promptPackage ? weakness("missing-prompt", "Prompt package is unavailable.") : undefined, !input.routingDecision ? weakness("missing-routing", "Routing decision is unavailable.") : undefined].filter((item): item is WeaknessItem => Boolean(item));
    const weaknesses: WeaknessModel = { weaknessSummary: weaknessList.length > 0 ? "Foundation package identified missing structured inputs for future truth analysis." : "No structural weakness detected for the foundation package.", weaknessList, weaknessCategories: weaknessList.length > 0 ? [TruthCategory.NeedsEvidence] : [], futureAnalyzerOutput: {} };
    return { weaknesses, score: clampScore((weaknessList.length / 3 + risk.risk.riskScore) / 2), signals: ["weakness_model_prepared"], warnings: [], metadata: { stage: "weakness_analysis" } };
  }
}
