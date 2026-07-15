import { ProviderType } from "@/ai/types";
import { RoutingStrategy, RoutingTier } from "@/router/types";

export const routerConfig = {
  defaults: {
    strategy: RoutingStrategy.Balanced,
    fallbackRetryCount: 2,
  },
  confidence: {
    minimum: 0.35,
    strong: 0.75,
  },
  thresholds: {
    cost: RoutingTier.Medium,
    latency: RoutingTier.Medium,
    quality: RoutingTier.Medium,
  },
  providerPriority: [
    ProviderType.Groq,
    ProviderType.Mistral,
    ProviderType.Gemini,
    ProviderType.OpenAI,
    ProviderType.Claude,
  ],
  fallback: {
    enabled: true,
    emergencyProvider: ProviderType.Mistral,
    retryableFailures: ["timeout", "rate_limit", "temporary_unavailable"],
    recoveryStrategy: "retry-secondary-provider-before-emergency-provider",
  },
  futureRouting: {
    abRouting: false,
    experimentation: false,
    dynamicLearning: false,
    liveProviderHealth: false,
    adaptiveRouting: false,
    parallelExecution: false,
    consensusVoting: false,
    regionalRouting: false,
    loadBalancing: false,
    trafficShaping: false,
    canaryRouting: false,
    shadowRouting: false,
    automaticFailover: false,
  },
} as const;

export type RouterConfig = typeof routerConfig;
