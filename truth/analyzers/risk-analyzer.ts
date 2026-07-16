import type { ConfidenceAnalysis, RiskAnalysis, RiskAssessment, TruthWarning } from "@/truth/types";
import { TruthCategory, TruthRiskLevel } from "@/truth/types";
import { clampScore, resolveRiskLevel } from "@/truth/utils";

export interface RiskAnalyzer {
  analyze(confidence: ConfidenceAnalysis): RiskAnalysis;
}

export class DefaultRiskAnalyzer implements RiskAnalyzer {
  analyze(confidence: ConfidenceAnalysis): RiskAnalysis {
    const riskScore = clampScore(1 - confidence.confidence.overallConfidence);
    const riskLevel = resolveRiskLevel(riskScore);
    const risk: RiskAssessment = {
      riskScore,
      riskLevel,
      riskCategory: TruthCategory.FutureVerificationRequired,
      riskSummary: "Risk assessment is structural only; no hallucination or factual risk algorithm was executed.",
      riskFactors: riskLevel === TruthRiskLevel.High ? ["low_engine_readiness"] : [],
      futureRiskSignals: ["hallucination_risk", "freshness_risk", "source_quality_risk"],
    };
    const warnings: TruthWarning[] = riskLevel === TruthRiskLevel.High
      ? [{ code: "HIGH_STRUCTURAL_RISK", message: "Input structure is weak for future truth analysis.", severity: TruthRiskLevel.High, metadata: {} }]
      : [];

    return {
      risk,
      score: risk.riskScore,
      signals: ["risk_model_prepared"],
      warnings,
import type { ConfidenceAnalysis, RiskAnalysis } from "@/truth/types";
import { clampScore, resolveRiskLevel } from "@/truth/utils";

export class RiskAnalyzer {
  analyze(confidence: ConfidenceAnalysis): RiskAnalysis {
    const riskIndex = clampScore(1 - confidence.confidenceIndex);
    return {
      riskIndex,
      riskLevel: resolveRiskLevel(riskIndex),
      score: riskIndex,
      signals: ["risk_baseline_computed"],
      warnings: riskIndex > 0.66 ? ["Input structure is weak for future truth analysis."] : [],
      metadata: { stage: "risk_analysis", hallucinationDetectionUsed: false },
    };
  }
}
