import { z } from "zod";
import { GoalType, IntentPriority, IntentType, TaskType } from "@/intent/types";

export const intentInputSchema = z.object({
  text: z.string().trim().min(1, "Intent analysis requires non-empty text."),
  conversationContext: z.string().trim().optional(),
  metadata: z
    .record(z.union([z.string(), z.number(), z.boolean(), z.array(z.string())]))
    .optional(),
});

export const intentEntitySchema = z.object({
  value: z.string().min(1),
  type: z.enum([
    "person",
    "organization",
    "product",
    "technology",
    "file",
    "url",
    "date",
    "number",
    "unknown",
  ]),
  confidence: z.number().min(0).max(1),
});

export const detectedTaskSchema = z.object({
  type: z.nativeEnum(TaskType),
  confidence: z.number().min(0).max(1),
  evidence: z.array(z.string()),
});

export const detectedGoalSchema = z.object({
  type: z.nativeEnum(GoalType),
  confidence: z.number().min(0).max(1),
  description: z.string().min(1),
});

export const intentContextSchema = z.object({
  conversationContext: z.string().optional(),
  entities: z.array(intentEntitySchema),
  keywords: z.array(z.string()),
  language: z.string().min(1),
  tone: z.string().optional(),
  constraints: z.array(z.string()),
  files: z.array(z.string()),
  images: z.array(z.string()),
  references: z.array(z.string()),
  historyReferences: z.array(z.string()),
});

export const routingHintSchema = z.object({
  requiresFreshData: z.boolean(),
  requiresCodeContext: z.boolean(),
  requiresLongContext: z.boolean(),
  supportsParallelization: z.boolean(),
  suggestedCapabilities: z.array(z.string()),
});

export const intentAnalysisSchema = z.object({
  intent: z.nativeEnum(IntentType),
  confidence: z.number().min(0).max(1),
  tasks: z.array(detectedTaskSchema),
  goal: detectedGoalSchema,
  context: intentContextSchema,
  entities: z.array(intentEntitySchema),
  language: z.string().min(1),
  priority: z.nativeEnum(IntentPriority),
  metadata: z.record(
    z.union([z.string(), z.number(), z.boolean(), z.array(z.string())]),
  ),
  warnings: z.array(z.string()),
  routingHints: routingHintSchema,
});
