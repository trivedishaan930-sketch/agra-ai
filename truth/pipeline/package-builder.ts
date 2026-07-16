import { truthConfig } from "@/truth/config";
import type { TruthAnalysisState, TruthMetadata, TruthPackage, TruthSummary } from "@/truth/types";
import { TruthCategory } from "@/truth/types";
import { averageScores, resolveTruthLevel, uniqueStrings } from "@/truth/utils";

export class TruthPackageBuilder {
  build(state: TruthAnalysisState): TruthPackage {
    const trustIndex = averageScores([
      state.truth.score,
      state.evidence.evidence.evidenceCoverage,
      state.confidence.confidence.overallConfidence,
      state.reliability.reliability.reliabilityScore,
      1 - state.risk.risk.riskScore,
    ]);
    const metadata: TruthMetadata = {
      calculationVersion: truthConfig.calculationVersion,
      providerIndependent: true,
      generatedAt: new Date().toISOString(),
      tags: ["truth-intelligence", "foundation", "provider-independent"],
      properties: {
        externalApisUsed: false,
        aiInferenceUsed: false,
        packageVersion: truthConfig.packageVersion,
      },
      futureExtensions: state.input.futureExtensions ?? {},
    };
    const strengthSummaries = state.strength.strengths.strengthList.map((strength) => strength.summary);
    const weaknessSummaries = state.weakness.weaknesses.weaknessList.map((weakness) => weakness.summary);
    const summary: TruthSummary = {
      summary: state.explanation.explanation.explanationSummary,
      strengths: uniqueStrings(strengthSummaries),
      weaknesses: uniqueStrings(weaknessSummaries),
      warnings: uniqueStrings([
        ...state.truth.warnings.map((warning) => warning.code),
        ...state.evidence.warnings.map((warning) => warning.code),
        ...state.confidence.warnings.map((warning) => warning.code),
        ...state.risk.warnings.map((warning) => warning.code),
        ...state.reliability.warnings.map((warning) => warning.code),
        ...state.weakness.warnings.map((warning) => warning.code),
        ...state.strength.warnings.map((warning) => warning.code),
        ...state.explanation.warnings.map((warning) => warning.code),
        ...state.improvement.warnings.map((warning) => warning.code),
      ]).map((code) => ({ code, message: code, severity: state.risk.risk.riskLevel, metadata: {} })),
    };

    return {
      packageVersion: truthConfig.packageVersion,
      metrics: {
        truthScore: {
          overallScore: state.truth.score,
          normalizedScore: state.truth.score,
          confidenceWeightedScore: averageScores([state.truth.score, state.confidence.confidence.overallConfidence]),
          explanation: "Foundation score reflects structured-input readiness only; no truth scoring formula was executed.",
          calculationVersion: truthConfig.calculationVersion,
          metadata,
        },
        trustIndex: {
          trustIndex,
          trustLevel: resolveTruthLevel(trustIndex),
          trustCategory: TruthCategory.FoundationOnly,
          trustSummary: "Trust index is architecture-only and does not represent factual verification.",
        },
        confidence: state.confidence.confidence,
        evidence: state.evidence.evidence,
        risk: state.risk.risk,
        reliability: state.reliability.reliability,
      },
      summary,
      weaknesses: state.weakness.weaknesses,
      strengths: state.strength.strengths,
      explanation: state.explanation.explanation,
      recommendations: state.improvement.recommendations,
      metadata,
      futureAnalysis: {
        hallucinationDetection: null,
        crossModelConsensus: null,
        citationValidation: null,
        knowledgeFreshness: null,
        sourceReliability: null,
        evidenceWeighting: null,
        factGraph: null,
        reasoningVerification: null,
        claimVerification: null,
        dynamicTrustIndex: null,
        selfConsistency: null,
        explainableAi: null,
        researchAlgorithms: null,
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
