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
