import { z } from "zod";
import { ProviderType } from "@/ai/types";
import { intentAnalysisSchema } from "@/intent/models";
import { PromptReasoningMode } from "@/prompt";
import { promptPackageSchema } from "@/prompt/validators";
import {
  ExecutionStrategy,
  RoutingPriority,
  RoutingStrategy,
  RoutingTier,
} from "@/router/types";

export const routerMetadataValueSchema = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.array(z.string()),
]);

export const routerContextSchema = z.object({
  summary: z.string().trim().optional(),
  signals: z.array(z.string().trim().min(1)),
});

export const routerInputSchema = z.object({
  userInput: z.string().trim().min(1, "Routing requires non-empty user input."),
  intentAnalysis: intentAnalysisSchema,
  promptPackage: promptPackageSchema,
  context: routerContextSchema.optional(),
  goal: z.string().trim().optional(),
  tasks: z.array(z.string().trim().min(1)).optional(),
  constraints: z.array(z.string().trim().min(1)).optional(),
  metadata: z.record(routerMetadataValueSchema).optional(),
  strategy: z.nativeEnum(RoutingStrategy).optional(),
  allowedProviders: z.array(z.nativeEnum(ProviderType)).optional(),
  excludedProviders: z.array(z.nativeEnum(ProviderType)).optional(),
});

export const routingScoreSchema = z.object({
  capabilityScore: z.number().min(0).max(1),
  intentAlignment: z.number().min(0).max(1),
  promptCompatibility: z.number().min(0).max(1),
  estimatedQuality: z.number().min(0).max(1),
  estimatedLatency: z.number().min(0).max(1),
  estimatedCost: z.number().min(0).max(1),
  reliabilityScore: z.number().min(0).max(1),
  confidenceScore: z.number().min(0).max(1),
  futureScalabilityScore: z.number().min(0).max(1),
  overall: z.number().min(0).max(1),
});

export const fallbackPlanSchema = z.object({
  primaryProvider: z.nativeEnum(ProviderType),
  secondaryProviders: z.array(z.nativeEnum(ProviderType)),
  emergencyProvider: z.nativeEnum(ProviderType).optional(),
  retryPolicy: z.object({
    maxRetries: z.number().int().min(0),
    retryableFailures: z.array(z.string()),
  }),
  recoveryStrategy: z.string().min(1),
});

export const routingDecisionSchema = z.object({
  selectedProvider: z.nativeEnum(ProviderType),
  candidateProviders: z.array(z.nativeEnum(ProviderType)).min(1),
  recommendedModel: z.string().min(1),
  executionStrategy: z.nativeEnum(ExecutionStrategy),
  fallbackChain: z.array(z.nativeEnum(ProviderType)),
  fallbackPlan: fallbackPlanSchema,
  reasoningMode: z.nativeEnum(PromptReasoningMode),
  temperatureHint: z.number().min(0).max(2),
  priority: z.nativeEnum(RoutingPriority),
  estimatedCostTier: z.nativeEnum(RoutingTier),
  estimatedLatencyTier: z.nativeEnum(RoutingTier),
  estimatedQualityTier: z.nativeEnum(RoutingTier),
  confidence: z.number().min(0).max(1),
  routingScore: routingScoreSchema,
  warnings: z.array(z.string()),
  metadata: z.record(routerMetadataValueSchema),
});
