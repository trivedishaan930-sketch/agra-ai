import { aiConfig } from "@/config/ai.config";
import { ProviderFactory } from "@/ai/core/provider-factory";
import type { AIProvider, HealthCheckResult } from "@/ai/types/provider";
import { ProviderType } from "@/ai/types/provider";
import { UnknownProviderError } from "@/ai/errors/provider-errors";

export class ProviderRegistry {
  private readonly providers = new Map<ProviderType, AIProvider>();

  constructor(
    providerTypes: readonly ProviderType[] = aiConfig.routing.fallbackOrder,
  ) {
    providerTypes.forEach((providerType) =>
      this.register(ProviderFactory.create(providerType)),
    );
  }

  register(provider: AIProvider) {
    this.providers.set(provider.type, provider);
  }

  get(providerType: ProviderType = aiConfig.defaultProvider) {
    const provider = this.providers.get(providerType);
    if (!provider) throw new UnknownProviderError(providerType);
    return provider;
  }

  list() {
    return Array.from(this.providers.values());
  }

  listEnabled() {
    return this.list().filter(
      (provider) => aiConfig.providers[provider.type].enabled,
    );
  }

  async healthCheckAll(): Promise<HealthCheckResult[]> {
    return Promise.all(this.list().map((provider) => provider.healthCheck()));
  }
}

export const providerRegistry = new ProviderRegistry();
