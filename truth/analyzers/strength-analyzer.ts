import type { EvidenceAnalysis, NormalizedTruthInput, StrengthAnalysis, StrengthItem, StrengthModel, TruthStageResult } from "@/truth/types";
import { TruthCategory } from "@/truth/types";
import { clampScore } from "@/truth/utils";

export interface StrengthAnalyzer {
  analyze(input: NormalizedTruthInput, truth: TruthStageResult, evidence: EvidenceAnalysis): StrengthAnalysis;
}

export class DefaultStrengthAnalyzer implements StrengthAnalyzer {
  analyze(input: NormalizedTruthInput, truth: TruthStageResult, evidence: EvidenceAnalysis): StrengthAnalysis {
    const possibleStrengths: Array<StrengthItem | undefined> = [
      { strengthId: "stable-contract", summary: "Truth Intelligence contract is stable and provider-independent.", category: TruthCategory.FoundationOnly, positiveSignals: ["stable_analyze_contract"] },
      input.intentAnalysis ? { strengthId: "intent-context", summary: "Intent analysis is available for future truth analysis.", category: TruthCategory.StructuredInput, positiveSignals: ["intent_analysis_available"] } : undefined,
      input.promptPackage ? { strengthId: "prompt-context", summary: "Prompt package is available for future truth analysis.", category: TruthCategory.StructuredInput, positiveSignals: ["prompt_package_available"] } : undefined,
      input.routingDecision ? { strengthId: "routing-context", summary: "Routing decision is available for future truth analysis.", category: TruthCategory.StructuredInput, positiveSignals: ["routing_decision_available"] } : undefined,
    ];
    const strengthList = possibleStrengths.filter((strength): strength is StrengthItem => Boolean(strength));
    const positiveSignals = strengthList.flatMap((strength) => [...strength.positiveSignals]);
    const strengths: StrengthModel = {
      strengthSummary: "Foundation-level strengths prepared without executing truth algorithms.",
      strengthList,
      strengthCategories: [TruthCategory.FoundationOnly, TruthCategory.StructuredInput],
      positiveSignals,
      futureStrengthAnalysis: {},
    };

    return {
      strengths,
      score: clampScore((truth.score + evidence.evidence.evidenceCoverage) / 2),
      signals: ["strength_model_prepared", ...positiveSignals],
      warnings: [],
      metadata: { stage: "strength_analysis" },
    };
  }
}
