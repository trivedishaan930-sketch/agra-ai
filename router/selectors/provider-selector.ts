import { routerConfig } from "@/router/config";
import { CapabilityMismatchError } from "@/router/errors";
import { providerCapabilityProfiles } from "@/router/models";
import {
  RoutingStrategy,
  RoutingTier,
  type NormalizedRouterInput,
  type ProviderCapabilityProfile,
} from "@/router/types";

function matchesRequiredCapabilities(
  profile: ProviderCapabilityProfile,
  input: NormalizedRouterInput,
) {
  if (
    input.promptPackage.providerHints.supportsJsonOutput &&
    !profile.supportsJson
  )
    return false;
  if (
    input.promptPackage.providerHints.requiresLongContext &&
    profile.contextWindowTokens < 32_000
  )
    return false;
  if (
    input.promptPackage.providerHints.requiresCodeContext &&
    !profile.strengths.includes("coding") &&
    !profile.supportsReasoning
  )
    return false;
  return true;
}

const tierRank: Record<RoutingTier, number> = {
  [RoutingTier.Low]: 1,
  [RoutingTier.Medium]: 2,
  [RoutingTier.High]: 3,
};

function strategySort(strategy: RoutingStrategy) {
  return (
    first: ProviderCapabilityProfile,
    second: ProviderCapabilityProfile,
  ) => {
    if (strategy === RoutingStrategy.Fastest)
      return tierRank[first.latencyTier] - tierRank[second.latencyTier];
    if (strategy === RoutingStrategy.LowestCost)
      return tierRank[first.costTier] - tierRank[second.costTier];
    if (strategy === RoutingStrategy.HighestQuality)
      return tierRank[second.qualityTier] - tierRank[first.qualityTier];
    return (
      routerConfig.providerPriority.indexOf(first.provider) -
      routerConfig.providerPriority.indexOf(second.provider)
    );
  };
}

export class ProviderSelector {
  selectCandidates(input: NormalizedRouterInput) {
    const allowed = new Set(
      input.allowedProviders ?? routerConfig.providerPriority,
    );
    const excluded = new Set(input.excludedProviders ?? []);
    const candidates = providerCapabilityProfiles
      .filter((profile) => allowed.has(profile.provider))
      .filter((profile) => !excluded.has(profile.provider))
      .filter((profile) => matchesRequiredCapabilities(profile, input))
      .sort(strategySort(input.strategy));

    if (!candidates.length) {
      throw new CapabilityMismatchError(
        "No compatible providers match the routing request.",
      );
    }

    return candidates;
  }
}
