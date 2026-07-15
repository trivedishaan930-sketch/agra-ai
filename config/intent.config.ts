import { GoalType, IntentType, TaskType } from "@/intent/types";

export const intentConfig = {
  confidence: {
    minimum: 0.35,
    high: 0.75,
    unknown: 0.2,
  },
  supportedIntents: Object.values(IntentType),
  supportedTasks: Object.values(TaskType),
  supportedGoals: Object.values(GoalType),
  language: {
    default: "en",
    supported: ["en", "es", "fr", "de", "hi", "ar", "zh", "ja", "unknown"],
  },
  normalization: {
    lowercase: true,
    collapseWhitespace: true,
    trim: true,
  },
  extraction: {
    maxKeywords: 12,
    minKeywordLength: 3,
  },
  futureMl: {
    enabled: false,
    classifierModel: null,
  },
  futureAiClassifier: {
    enabled: false,
    provider: null,
  },
} as const;

export type IntentConfig = typeof intentConfig;
