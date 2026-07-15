import { ProviderType } from "@/ai/types";
import { RoutingValidationError, RoutingStrategyError } from "@/router/errors";
import {
  routerInputSchema,
  routingDecisionSchema,
} from "@/router/validators/router.schema";
import type {
  RouterInput,
  RoutingDecision,
  RoutingStrategy,
} from "@/router/types";

function hasProviderConflict(
  allowed?: ProviderType[],
  excluded?: ProviderType[],
) {
  if (!allowed?.length || !excluded?.length) return false;
  const excludedSet = new Set(excluded);
  return allowed.every((provider) => excludedSet.has(provider));
}

export class RouterValidator {
  validateInput(input: RouterInput) {
    const parsed = routerInputSchema.safeParse(input);
    if (!parsed.success) {
      throw new RoutingValidationError(
        parsed.error.issues.map((issue) => issue.message).join("; "),
        { cause: parsed.error },
      );
    }

    if (
      hasProviderConflict(
        parsed.data.allowedProviders,
        parsed.data.excludedProviders,
      )
    ) {
      throw new RoutingValidationError(
        "Allowed providers are fully excluded from routing.",
      );
    }

    return parsed.data;
  }

  validateStrategy(
    strategy: RoutingStrategy,
    supported: readonly RoutingStrategy[],
  ) {
    if (!supported.includes(strategy)) {
      throw new RoutingStrategyError(
        `Unsupported routing strategy: ${strategy}`,
      );
    }
  }

  validateDecision(decision: RoutingDecision) {
    if (!decision.candidateProviders.includes(decision.selectedProvider)) {
      throw new RoutingValidationError(
        "Selected provider is not present in candidate providers.",
      );
    }

    const parsed = routingDecisionSchema.safeParse(decision);
    if (!parsed.success) {
      throw new RoutingValidationError(
        parsed.error.issues.map((issue) => issue.message).join("; "),
        { cause: parsed.error },
      );
    }

    return parsed.data;
  }
}
