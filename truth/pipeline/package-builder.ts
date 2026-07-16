import type { TruthAnalysisState, TruthIntelligencePackage, TruthMetadataValue } from "@/truth/types";
import { averageScores, uniqueStrings } from "@/truth/utils";

export class TruthPackageBuilder {
  build(state: TruthAnalysisState): TruthIntelligencePackage {
    const trustIndex = averageScores([
      state.truth.score,
      state.evidence.evidenceIndex,
      state.confidence.confidenceIndex,
      state.reliability.score,
      1 - state.risk.riskIndex,
    ]);

    const metadata: Record<string, TruthMetadataValue> = {
      architectureVersion: "tie-foundation-v1",
      providerIndependent: true,
      externalApisUsed: false,
      aiInferenceUsed: false,
      ...state.truth.metadata,
    };

    return {
      truthScore: state.truth.score,
      trustIndex,
      evidenceIndex: state.evidence.evidenceIndex,
      confidenceIndex: state.confidence.confidenceIndex,
      riskIndex: state.risk.riskIndex,
      reliabilityGrade: state.reliability.reliabilityGrade,
      weaknessSummary: state.weakness.weaknessSummary,
      strengthSummary: uniqueStrings([
        ...state.truth.signals,
        ...state.evidence.signals,
        ...state.confidence.signals,
        ...state.reliability.signals,
      ]),
      explanationSummary: "Truth Intelligence foundation package generated from structured, provider-independent inputs. No external verification or AI inference was performed.",
      improvementSuggestions: state.improvement.improvementSuggestions,
      warnings: uniqueStrings([
        ...state.truth.warnings,
        ...state.evidence.warnings,
        ...state.confidence.warnings,
        ...state.risk.warnings,
        ...state.reliability.warnings,
        ...state.weakness.warnings,
        ...state.improvement.warnings,
      ]),
      metadata,
      futureAnalysis: {
        evidenceVerification: null,
        citationValidation: null,
        hallucinationDetection: null,
        crossModelConsensus: null,
        knowledgeFreshness: null,
        sourceReliability: null,
      },
    };
  }
}
