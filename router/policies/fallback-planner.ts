import { routerConfig } from "@/router/config";
import { FallbackPlanningError } from "@/router/errors";
import type { FallbackPlan, ProviderCapabilityProfile } from "@/router/types";

export class FallbackPlanner {
  plan(candidates: readonly ProviderCapabilityProfile[]): FallbackPlan {
    const primary = candidates[0];
    if (!primary)
      throw new FallbackPlanningError(
        "Fallback planning requires at least one candidate provider.",
      );
    const secondaryProviders = candidates
      .slice(1, 3)
      .map((candidate) => candidate.provider);
    const emergencyProvider = candidates.some(
      (candidate) =>
        candidate.provider === routerConfig.fallback.emergencyProvider,
    )
      ? routerConfig.fallback.emergencyProvider
      : candidates.at(-1)?.provider;

    return {
      primaryProvider: primary.provider,
      secondaryProviders,
      emergencyProvider,
      retryPolicy: {
        maxRetries: routerConfig.defaults.fallbackRetryCount,
        retryableFailures: [...routerConfig.fallback.retryableFailures],
      },
      recoveryStrategy: routerConfig.fallback.recoveryStrategy,
    };
  }
}
