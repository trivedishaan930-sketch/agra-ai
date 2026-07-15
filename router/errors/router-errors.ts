export class RouterEngineError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = new.target.name;
  }
}

export class RoutingValidationError extends RouterEngineError {}
export class ProviderNotEligibleError extends RouterEngineError {}
export class RoutingStrategyError extends RouterEngineError {}
export class CapabilityMismatchError extends RouterEngineError {}
export class FallbackPlanningError extends RouterEngineError {}
export class RoutingConfigurationError extends RouterEngineError {}
