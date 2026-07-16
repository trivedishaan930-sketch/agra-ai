import { z } from "zod";
import { intentAnalysisSchema } from "@/intent/models";
import { promptPackageSchema } from "@/prompt/validators";
import { routingDecisionSchema } from "@/router/validators";
import {
  EvidenceStatus,
  RecommendationPriority,
  ReliabilityGrade,
  TruthCategory,
  TruthLevel,
  TruthRiskLevel,
} from "@/truth/types";
import { ReliabilityGrade, TruthRiskLevel } from "@/truth/types";

export const truthMetadataValueSchema = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.array(z.string()),
]);

export const truthMetadataSchema = z.object({
  analysisId: z.string().trim().optional(),
  requestId: z.string().trim().optional(),
  calculationVersion: z.string().min(1),
  providerIndependent: z.literal(true),
  generatedAt: z.string().min(1),
  tags: z.array(z.string()),
  properties: z.record(truthMetadataValueSchema),
  futureExtensions: z.record(z.unknown()),
});

export const truthContextSchema = z.object({
  summary: z.string().trim().optional(),
  signals: z.array(z.string().trim().min(1)),
});

export const conversationContextSchema = z.object({
  conversationId: z.string().trim().optional(),
  messageCount: z.number().int().min(0).optional(),
  summary: z.string().trim().optional(),
  signals: z.array(z.string().trim().min(1)).optional(),
});

export const truthInputSchema = z.object({
  userRequest: z.string().trim().min(1, "Truth analysis requires a user request."),
  intentAnalysis: intentAnalysisSchema.optional(),
  promptPackage: promptPackageSchema.optional(),
  routingDecision: routingDecisionSchema.optional(),
  context: truthContextSchema.optional(),
  goal: z.string().trim().optional(),
  tasks: z.array(z.string().trim().min(1)).optional(),
  metadata: z.record(truthMetadataValueSchema).optional(),
  conversationContext: conversationContextSchema.optional(),
  futureExtensions: z.record(z.unknown()).optional(),
});

const scoreSchema = z.number().min(0).max(1);

export const truthWarningSchema = z.object({
  code: z.string().min(1),
  message: z.string().min(1),
  severity: z.nativeEnum(TruthRiskLevel),
  metadata: z.record(truthMetadataValueSchema),
});

export const truthScoreSchema = z.object({
  overallScore: scoreSchema,
  normalizedScore: scoreSchema,
  confidenceWeightedScore: scoreSchema,
  explanation: z.string().min(1),
  calculationVersion: z.string().min(1),
  metadata: truthMetadataSchema,
});

export const trustIndexSchema = z.object({
  trustIndex: scoreSchema,
  trustLevel: z.nativeEnum(TruthLevel),
  trustCategory: z.nativeEnum(TruthCategory),
  trustSummary: z.string().min(1),
});

export const confidenceModelSchema = z.object({
  overallConfidence: scoreSchema,
  confidenceLevel: z.nativeEnum(TruthLevel),
  confidenceCategory: z.nativeEnum(TruthCategory),
  confidenceBreakdown: z.object({
    inputStructure: scoreSchema,
    engineReadiness: scoreSchema,
    evidenceReadiness: scoreSchema,
    routingReadiness: scoreSchema,
  }),
  futureConfidenceFactors: z.array(z.string()),
  confidenceExplanation: z.string().min(1),
});

export const evidenceReferenceSchema = z.object({
  referenceId: z.string().min(1),
  label: z.string().min(1),
  status: z.nativeEnum(EvidenceStatus),
  metadata: z.record(truthMetadataValueSchema),
});

export const evidenceGroupSchema = z.object({
  groupId: z.string().min(1),
  summary: z.string().min(1),
  status: z.nativeEnum(EvidenceStatus),
  references: z.array(evidenceReferenceSchema),
});

export const evidenceModelSchema = z.object({
  evidenceSummary: z.string().min(1),
  evidenceQuality: z.nativeEnum(TruthLevel),
  evidenceCoverage: scoreSchema,
  evidenceStatus: z.nativeEnum(EvidenceStatus),
  missingEvidence: z.array(z.string()),
  futureEvidenceSources: z.array(z.string()),
  evidenceReferences: z.array(evidenceReferenceSchema),
  evidenceGroups: z.array(evidenceGroupSchema),
});

export const riskAssessmentSchema = z.object({
  riskScore: scoreSchema,
  riskLevel: z.nativeEnum(TruthRiskLevel),
  riskCategory: z.nativeEnum(TruthCategory),
  riskSummary: z.string().min(1),
  riskFactors: z.array(z.string()),
  futureRiskSignals: z.array(z.string()),
});

export const reliabilityModelSchema = z.object({
  reliabilityGrade: z.nativeEnum(ReliabilityGrade),
  reliabilityScore: scoreSchema,
  reliabilitySummary: z.string().min(1),
  reliabilityFactors: z.array(z.string()),
  futureReliabilitySignals: z.array(z.string()),
});

export const weaknessItemSchema = z.object({
  weaknessId: z.string().min(1),
  summary: z.string().min(1),
  category: z.nativeEnum(TruthCategory),
  severity: z.nativeEnum(TruthRiskLevel),
  improvementPriority: z.nativeEnum(RecommendationPriority),
  futureAnalyzerOutput: z.record(z.unknown()),
});

export const weaknessModelSchema = z.object({
  weaknessSummary: z.string().min(1),
  weaknessList: z.array(weaknessItemSchema),
  weaknessCategories: z.array(z.nativeEnum(TruthCategory)),
  futureAnalyzerOutput: z.record(z.unknown()),
});

export const strengthItemSchema = z.object({
  strengthId: z.string().min(1),
  summary: z.string().min(1),
  category: z.nativeEnum(TruthCategory),
  positiveSignals: z.array(z.string()),
});

export const strengthModelSchema = z.object({
  strengthSummary: z.string().min(1),
  strengthList: z.array(strengthItemSchema),
  strengthCategories: z.array(z.nativeEnum(TruthCategory)),
  positiveSignals: z.array(z.string()),
  futureStrengthAnalysis: z.record(z.unknown()),
});

export const explanationModelSchema = z.object({
  explanationSummary: z.string().min(1),
  detailedExplanation: z.string().min(1),
  evidenceExplanation: z.string().min(1),
  confidenceExplanation: z.string().min(1),
  riskExplanation: z.string().min(1),
  weaknessExplanation: z.string().min(1),
  improvementExplanation: z.string().min(1),
});

export const truthRecommendationSchema = z.object({
  recommendationId: z.string().min(1),
  improvementSuggestion: z.string().min(1),
  priority: z.nativeEnum(RecommendationPriority),
  expectedImprovement: z.string().min(1),
  affectedMetrics: z.array(z.string()),
  estimatedScoreImprovement: scoreSchema.optional(),
  futureAutoSuggestions: z.record(z.unknown()),
});

export const truthMetricsSchema = z.object({
  truthScore: truthScoreSchema,
  trustIndex: trustIndexSchema,
  confidence: confidenceModelSchema,
  evidence: evidenceModelSchema,
  risk: riskAssessmentSchema,
  reliability: reliabilityModelSchema,
});

export const truthSummarySchema = z.object({
  summary: z.string().min(1),
  strengths: z.array(z.string()),
  weaknesses: z.array(z.string()),
  warnings: z.array(truthWarningSchema),
});

export const truthPackageSchema = z.object({
  packageVersion: z.string().min(1),
  metrics: truthMetricsSchema,
  summary: truthSummarySchema,
  weaknesses: weaknessModelSchema,
  strengths: strengthModelSchema,
  explanation: explanationModelSchema,
  recommendations: z.array(truthRecommendationSchema),
  metadata: truthMetadataSchema,
  futureAnalysis: z.object({
    hallucinationDetection: z.unknown(),
    crossModelConsensus: z.unknown(),
    citationValidation: z.unknown(),
    knowledgeFreshness: z.unknown(),
    sourceReliability: z.unknown(),
    evidenceWeighting: z.unknown(),
    factGraph: z.unknown(),
    reasoningVerification: z.unknown(),
    claimVerification: z.unknown(),
    dynamicTrustIndex: z.unknown(),
    selfConsistency: z.unknown(),
    explainableAi: z.unknown(),
    researchAlgorithms: z.unknown(),
  }),
});
const stageResultSchema = z.object({
  score: z.number().min(0).max(1),
  signals: z.array(z.string()),
  warnings: z.array(z.string()),
  metadata: z.record(truthMetadataValueSchema),
});

export const truthPackageSchema = z.object({
  truthScore: z.number().min(0).max(1),
  trustIndex: z.number().min(0).max(1),
  evidenceIndex: z.number().min(0).max(1),
  confidenceIndex: z.number().min(0).max(1),
  riskIndex: z.number().min(0).max(1),
  reliabilityGrade: z.nativeEnum(ReliabilityGrade),
  weaknessSummary: z.array(z.string()),
  strengthSummary: z.array(z.string()),
  explanationSummary: z.string(),
  improvementSuggestions: z.array(z.string()),
  warnings: z.array(z.string()),
  metadata: z.record(truthMetadataValueSchema),
  futureAnalysis: z.record(z.unknown()),
});

export const evidenceAnalysisSchema = stageResultSchema.extend({ evidenceIndex: z.number().min(0).max(1) });
export const confidenceAnalysisSchema = stageResultSchema.extend({ confidenceIndex: z.number().min(0).max(1) });
export const riskAnalysisSchema = stageResultSchema.extend({ riskIndex: z.number().min(0).max(1), riskLevel: z.nativeEnum(TruthRiskLevel) });
export const reliabilityAnalysisSchema = stageResultSchema.extend({ reliabilityGrade: z.nativeEnum(ReliabilityGrade) });
