import type { ConfidenceAnalysis, EvidenceAnalysis, ReliabilityAnalysis, ReliabilityModel, RiskAnalysis, TruthStageResult } from "@/truth/types";
import { averageScores, resolveReliabilityGrade } from "@/truth/utils";

export interface ReliabilityAnalyzer {
  analyze(truth: TruthStageResult, evidence: EvidenceAnalysis, confidence: ConfidenceAnalysis, risk: RiskAnalysis): ReliabilityAnalysis;
}

export class DefaultReliabilityAnalyzer implements ReliabilityAnalyzer {
  analyze(truth: TruthStageResult, evidence: EvidenceAnalysis, confidence: ConfidenceAnalysis, risk: RiskAnalysis): ReliabilityAnalysis {
    const reliabilityScore = averageScores([truth.score, evidence.evidence.evidenceCoverage, confidence.confidence.overallConfidence, 1 - risk.risk.riskScore]);
    const reliability: ReliabilityModel = {
      reliabilityGrade: resolveReliabilityGrade(reliabilityScore),
      reliabilityScore,
      reliabilitySummary: "Reliability model is prepared from structural readiness signals only.",
      reliabilityFactors: ["input_structure", "engine_contracts", "future_extension_readiness"],
      futureReliabilitySignals: ["source_reliability", "claim_reliability", "consensus_reliability"],
    };

    return {
      reliability,
      score: reliability.reliabilityScore,
      signals: ["reliability_model_prepared"],
      warnings: [],
      metadata: { stage: "reliability_analysis", sourceReliabilityChecked: false },
    };
  }
}
