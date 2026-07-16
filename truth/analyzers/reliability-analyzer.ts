import type { ConfidenceAnalysis, EvidenceAnalysis, ReliabilityAnalysis, RiskAnalysis, TruthStageResult } from "@/truth/types";
import { averageScores, resolveReliabilityGrade } from "@/truth/utils";

export class ReliabilityAnalyzer {
  analyze(truth: TruthStageResult, evidence: EvidenceAnalysis, confidence: ConfidenceAnalysis, risk: RiskAnalysis): ReliabilityAnalysis {
    const reliabilityScore = averageScores([truth.score, evidence.evidenceIndex, confidence.confidenceIndex, 1 - risk.riskIndex]);
    return {
      reliabilityGrade: resolveReliabilityGrade(reliabilityScore),
      score: reliabilityScore,
      signals: ["reliability_grade_assigned"],
      warnings: [],
      metadata: { stage: "reliability_analysis", sourceReliabilityChecked: false },
    };
  }
}
