import type { ProviderType } from "@/ai/types";
import type { IntentAnalysis } from "@/intent";
import type { PromptPackage, PromptReasoningMode } from "@/prompt";

export type RouterMetadataValue = string | number | boolean | string[];

export enum RoutingStrategy {
  Fastest = "fastest",
  LowestCost = "lowest_cost",
  HighestQuality = "highest_quality",
  Balanced = "balanced",
  CodingOptimized = "coding_optimized",
  ResearchOptimized = "research_optimized",
  WritingOptimized = "writing_optimized",
  TranslationOptimized = "translation_optimized",
  AnalysisOptimized = "analysis_optimized",
  EnterprisePolicy = "enterprise_policy",
  Custom = "custom",
}

export enum ExecutionStrategy {
  SingleProvider = "single_provider",
  FallbackReady = "fallback_ready",
  ParallelReady = "parallel_ready",
  ConsensusReady = "consensus_ready",
}

export enum RoutingTier {
  Low = "low",
  Medium = "medium",
  High = "high",
}

export enum RoutingPriority {
  Low = "low",
  Normal = "normal",
  High = "high",
  Critical = "critical",
}

export type ProviderCapabilityProfile = {
  provider: ProviderType;
  displayName: string;
  defaultModel: string;
  supportsStreaming: boolean;
  supportsJson: boolean;
  supportsTools: boolean;
  supportsReasoning: boolean;
  supportsVision: boolean;
  supportsStructuredOutput: boolean;
  supportsMultimodal: boolean;
  contextWindowTokens: number;
  maxOutputTokens: number;
  costTier: RoutingTier;
  latencyTier: RoutingTier;
  qualityTier: RoutingTier;
  reliabilityScore: number;
  strengths: string[];
};

export type RouterContext = {
  summary?: string;
  signals: string[];
};

export type RouterInput = {
  userInput: string;
  intentAnalysis: IntentAnalysis;
  promptPackage: PromptPackage;
  context?: RouterContext;
  goal?: string;
  tasks?: string[];
  constraints?: string[];
  metadata?: Record<string, RouterMetadataValue>;
  strategy?: RoutingStrategy;
  allowedProviders?: ProviderType[];
  excludedProviders?: ProviderType[];
};

export type NormalizedRouterInput = RouterInput & {
  normalizedUserInput: string;
  resolvedGoal: string;
  resolvedTasks: string[];
  resolvedConstraints: string[];
  strategy: RoutingStrategy;
};

export type RoutingScore = {
  capabilityScore: number;
  intentAlignment: number;
  promptCompatibility: number;
  estimatedQuality: number;
  estimatedLatency: number;
  estimatedCost: number;
  reliabilityScore: number;
  confidenceScore: number;
  futureScalabilityScore: number;
  overall: number;
};

export type FallbackPlan = {
  primaryProvider: ProviderType;
  secondaryProviders: ProviderType[];
  emergencyProvider?: ProviderType;
  retryPolicy: {
    maxRetries: number;
    retryableFailures: string[];
  };
  recoveryStrategy: string;
};

export type RoutingDecision = {
  selectedProvider: ProviderType;
  candidateProviders: ProviderType[];
  recommendedModel: string;
  executionStrategy: ExecutionStrategy;
  fallbackChain: ProviderType[];
  fallbackPlan: FallbackPlan;
  reasoningMode: PromptReasoningMode;
  temperatureHint: number;
  priority: RoutingPriority;
  estimatedCostTier: RoutingTier;
  estimatedLatencyTier: RoutingTier;
  estimatedQualityTier: RoutingTier;
  confidence: number;
  routingScore: RoutingScore;
  warnings: string[];
  metadata: Record<string, RouterMetadataValue>;
};
