import { z } from "zod";
import { intentAnalysisSchema } from "@/intent/models";
import { promptPackageSchema } from "@/prompt/validators";
import { routingDecisionSchema } from "@/router/validators";
import { ReliabilityGrade, TruthRiskLevel } from "@/truth/types";

export const truthMetadataValueSchema = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.array(z.string()),
]);

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
