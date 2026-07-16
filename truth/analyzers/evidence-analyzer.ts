import type { EvidenceAnalysis, TruthStageResult, NormalizedTruthInput } from "@/truth/types";
import { clampScore } from "@/truth/utils";

export class EvidenceAnalyzer {
  analyze(input: NormalizedTruthInput, truth: TruthStageResult): EvidenceAnalysis {
    const structuredSignals = [input.intentAnalysis, input.promptPackage, input.routingDecision, input.context].filter(Boolean).length;
    const evidenceIndex = clampScore((structuredSignals / 4) * 0.7 + truth.score * 0.3);

    return {
      evidenceIndex,
      score: evidenceIndex,
      signals: ["structured_input_available"],
      warnings: structuredSignals === 0 ? ["No supporting engine outputs were provided for future evidence analysis."] : [],
      metadata: { stage: "evidence_analysis", externalEvidenceChecked: false },
    };
  }
}
