import type { ConfidenceAnalysis, ConfidenceModel, EvidenceAnalysis, TruthStageResult } from "@/truth/types";
import { TruthCategory } from "@/truth/types";
import { averageScores, resolveTruthLevel } from "@/truth/utils";

export interface ConfidenceAnalyzer {
  analyze(truth: TruthStageResult, evidence: EvidenceAnalysis): ConfidenceAnalysis;
}

export class DefaultConfidenceAnalyzer implements ConfidenceAnalyzer {
  analyze(truth: TruthStageResult, evidence: EvidenceAnalysis): ConfidenceAnalysis {
    const overallConfidence = averageScores([truth.score, evidence.evidence.evidenceCoverage]);
    const confidence: ConfidenceModel = {
      overallConfidence,
      confidenceLevel: resolveTruthLevel(overallConfidence),
      confidenceCategory: TruthCategory.FoundationOnly,
      confidenceBreakdown: {
        inputStructure: truth.score,
        engineReadiness: truth.score,
        evidenceReadiness: evidence.evidence.evidenceCoverage,
        routingReadiness: evidence.evidence.evidenceCoverage,
      },
      futureConfidenceFactors: ["claim_confidence", "source_confidence", "consensus_confidence"],
      confidenceExplanation: "Confidence represents engine readiness only, not AI certainty or factual certainty.",
    };

    return {
      confidence,
      score: confidence.overallConfidence,
      signals: ["confidence_model_prepared"],
import type { ConfidenceAnalysis, EvidenceAnalysis, TruthStageResult } from "@/truth/types";
import { averageScores } from "@/truth/utils";

export class ConfidenceAnalyzer {
  analyze(truth: TruthStageResult, evidence: EvidenceAnalysis): ConfidenceAnalysis {
    const confidenceIndex = averageScores([truth.score, evidence.evidenceIndex]);
    return {
      confidenceIndex,
      score: confidenceIndex,
      signals: ["confidence_baseline_computed"],
      warnings: [],
      metadata: { stage: "confidence_analysis", probabilisticModelUsed: false },
    };
  }
}
