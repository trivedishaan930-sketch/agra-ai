import type { NormalizedTruthInput, RiskAnalysis, WeaknessAnalysis } from "@/truth/types";
import { clampScore } from "@/truth/utils";

export class WeaknessAnalyzer {
  analyze(input: NormalizedTruthInput, risk: RiskAnalysis): WeaknessAnalysis {
    const weaknessSummary = [
      !input.intentAnalysis ? "Intent analysis is unavailable." : "",
      !input.promptPackage ? "Prompt package is unavailable." : "",
      !input.routingDecision ? "Routing decision is unavailable." : "",
      input.contextSignals.length === 0 ? "Context signals are unavailable." : "",
    ].filter(Boolean);

    return {
      weaknessSummary,
      score: clampScore(weaknessSummary.length / 4),
      signals: ["weakness_summary_prepared"],
      warnings: risk.warnings,
      metadata: { stage: "weakness_analysis" },
    };
  }
}
