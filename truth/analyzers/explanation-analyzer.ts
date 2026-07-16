import type { ConfidenceAnalysis, EvidenceAnalysis, ExplanationAnalysis, ExplanationModel, ImprovementAnalysis, RiskAnalysis, WeaknessAnalysis } from "@/truth/types";

export interface ExplanationAnalyzer {
  analyze(evidence: EvidenceAnalysis, confidence: ConfidenceAnalysis, risk: RiskAnalysis, weakness: WeaknessAnalysis, improvement: ImprovementAnalysis): ExplanationAnalysis;
}

export class DefaultExplanationAnalyzer implements ExplanationAnalyzer {
  analyze(evidence: EvidenceAnalysis, confidence: ConfidenceAnalysis, risk: RiskAnalysis, weakness: WeaknessAnalysis, improvement: ImprovementAnalysis): ExplanationAnalysis {
    const explanation: ExplanationModel = {
      explanationSummary: "Truth Intelligence foundation package is explainable and provider-independent.",
      detailedExplanation: "This build prepares architecture, contracts, validation, and immutable output models only. No truth scoring formulas, reasoning algorithms, web search, citations, or provider calls were executed.",
      evidenceExplanation: evidence.evidence.evidenceSummary,
      confidenceExplanation: confidence.confidence.confidenceExplanation,
      riskExplanation: risk.risk.riskSummary,
      weaknessExplanation: weakness.weaknesses.weaknessSummary,
      improvementExplanation: improvement.recommendations.map((recommendation) => recommendation.improvementSuggestion).join(" "),
    };

    return {
      explanation,
      score: confidence.confidence.overallConfidence,
      signals: ["explanation_model_prepared"],
      warnings: [],
      metadata: { stage: "explanation_analysis" },
    };
  }
}
