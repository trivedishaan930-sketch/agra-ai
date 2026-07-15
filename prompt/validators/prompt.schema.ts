import { z } from "zod";
import { intentAnalysisSchema } from "@/intent/models";
import { PromptOutputFormat, PromptReasoningMode } from "@/prompt/types";

export const promptMetadataValueSchema = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.array(z.string()),
]);

export const promptExampleSchema = z.object({
  title: z.string().trim().min(1),
  input: z.string().trim().min(1),
  output: z.string().trim().min(1),
});

export const promptContextSchema = z.object({
  summary: z.string().trim().optional(),
  sections: z.array(z.string().trim().min(1)),
});

export const promptInputSchema = z.object({
  userInput: z
    .string()
    .trim()
    .min(1, "Prompt optimization requires non-empty user input."),
  intentAnalysis: intentAnalysisSchema,
  context: promptContextSchema.optional(),
  goal: z.string().trim().optional(),
  tasks: z.array(z.string().trim().min(1)).optional(),
  constraints: z.array(z.string().trim().min(1)).optional(),
  metadata: z.record(promptMetadataValueSchema).optional(),
  outputFormat: z.nativeEnum(PromptOutputFormat).optional(),
  examples: z.array(promptExampleSchema).optional(),
});

export const promptProviderHintsSchema = z.object({
  requiresFreshData: z.boolean(),
  requiresCodeContext: z.boolean(),
  requiresLongContext: z.boolean(),
  supportsJsonOutput: z.boolean(),
  suggestedCapabilities: z.array(z.string()),
});

export const promptQualityScoreSchema = z.object({
  completeness: z.number().min(0).max(1),
  clarity: z.number().min(0).max(1),
  contextQuality: z.number().min(0).max(1),
  goalAlignment: z.number().min(0).max(1),
  taskAlignment: z.number().min(0).max(1),
  constraintQuality: z.number().min(0).max(1),
  structureQuality: z.number().min(0).max(1),
  futureProviderCompatibility: z.number().min(0).max(1),
  overall: z.number().min(0).max(1),
});

export const promptPackageSchema = z.object({
  optimizedPrompt: z.string().trim().min(1),
  systemInstruction: z.string().trim().min(1),
  userInstruction: z.string().trim().min(1),
  contextSection: z.string(),
  constraints: z.array(z.string()),
  examples: z.array(promptExampleSchema),
  outputFormat: z.nativeEnum(PromptOutputFormat),
  temperatureHint: z.number().min(0).max(2),
  reasoningMode: z.nativeEnum(PromptReasoningMode),
  providerHints: promptProviderHintsSchema,
  qualityScore: promptQualityScoreSchema,
  metadata: z.record(promptMetadataValueSchema),
  warnings: z.array(z.string()),
});
