import { ProviderType } from "@/ai/types/provider";

export type ProviderErrorCode =
  | "AUTHENTICATION_ERROR"
  | "RATE_LIMIT_ERROR"
  | "PROVIDER_UNAVAILABLE"
  | "TIMEOUT_ERROR"
  | "VALIDATION_ERROR"
  | "UNKNOWN_PROVIDER_ERROR";

export class ProviderError extends Error {
  constructor(
    message: string,
    public readonly code: ProviderErrorCode,
    public readonly provider?: ProviderType,
    public readonly cause?: unknown,
  ) {
    super(message);
    this.name = new.target.name;
  }
}

export class AuthenticationError extends ProviderError {
  constructor(provider: ProviderType, cause?: unknown) {
    super(
      `Authentication failed for AI provider: ${provider}`,
      "AUTHENTICATION_ERROR",
      provider,
      cause,
    );
  }
}

export class RateLimitError extends ProviderError {
  constructor(provider: ProviderType, cause?: unknown) {
    super(
      `Rate limit exceeded for AI provider: ${provider}`,
      "RATE_LIMIT_ERROR",
      provider,
      cause,
    );
  }
}

export class ProviderUnavailableError extends ProviderError {
  constructor(
    provider: ProviderType,
    message = `AI provider is unavailable: ${provider}`,
    cause?: unknown,
  ) {
    super(message, "PROVIDER_UNAVAILABLE", provider, cause);
  }
}

export class TimeoutError extends ProviderError {
  constructor(provider: ProviderType, timeoutMs: number, cause?: unknown) {
    super(
      `AI provider timed out after ${timeoutMs}ms: ${provider}`,
      "TIMEOUT_ERROR",
      provider,
      cause,
    );
  }
}

export class ValidationError extends ProviderError {
  constructor(message: string, provider?: ProviderType, cause?: unknown) {
    super(message, "VALIDATION_ERROR", provider, cause);
  }
}

export class UnknownProviderError extends ProviderError {
  constructor(provider: string, cause?: unknown) {
    super(
      `Unknown AI provider requested: ${provider}`,
      "UNKNOWN_PROVIDER_ERROR",
      undefined,
      cause,
    );
  }
}
