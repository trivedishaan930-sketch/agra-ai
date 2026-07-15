import type {
  AIProvider,
  AIProviderCapabilities,
  AIProviderConfig,
  GenerateJSONRequest,
  GenerateJSONResponse,
  GenerateTextRequest,
  GenerateTextResponse,
  HealthCheckResult,
  StreamTextChunk,
  StreamTextRequest,
  TokenCountRequest,
} from "@/ai/types/provider";
import { ProviderUnavailableError } from "@/ai/errors/provider-errors";
import {
  assertPromptOrMessages,
  assertTokenCountInput,
  estimateTokenCount,
} from "@/ai/utils";

export abstract class BaseProviderAdapter implements AIProvider {
  readonly type;
  readonly displayName;
  readonly capabilities: AIProviderCapabilities;

  protected constructor(
    protected readonly config: AIProviderConfig,
    capabilities: AIProviderCapabilities,
  ) {
    this.type = config.type;
    this.displayName = config.displayName;
    this.capabilities = capabilities;
  }

  async generateText(
    request: GenerateTextRequest,
  ): Promise<GenerateTextResponse> {
    assertPromptOrMessages(request, this.type);
    this.assertConfigured();
    // TODO: Wire provider-specific text generation API call in the adapter implementation.
    throw new ProviderUnavailableError(
      this.type,
      `${this.displayName} text generation is not integrated yet.`,
    );
  }

  async *streamText(
    request: StreamTextRequest,
  ): AsyncIterable<StreamTextChunk> {
    assertPromptOrMessages(request, this.type);
    this.assertConfigured();
    // TODO: Wire provider-specific streaming API call in the adapter implementation.
    throw new ProviderUnavailableError(
      this.type,
      `${this.displayName} streaming is not integrated yet.`,
    );
  }

  async generateJSON<TOutput = unknown>(
    request: GenerateJSONRequest,
  ): Promise<GenerateJSONResponse<TOutput>> {
    assertPromptOrMessages(request, this.type);
    this.assertConfigured();
    // TODO: Wire provider-specific structured JSON API call in the adapter implementation.
    throw new ProviderUnavailableError(
      this.type,
      `${this.displayName} structured JSON generation is not integrated yet.`,
    );
  }

  async healthCheck(): Promise<HealthCheckResult> {
    const startedAt = Date.now();
    return {
      provider: this.type,
      healthy: this.config.enabled && Boolean(this.config.apiKey),
      configured: Boolean(this.config.apiKey),
      latencyMs: Date.now() - startedAt,
      message: this.config.apiKey
        ? "Provider configuration is present."
        : "Provider API key is not configured.",
    };
  }

  async countTokens(request: TokenCountRequest): Promise<number> {
    assertTokenCountInput(request, this.type);
    return estimateTokenCount(request);
  }

  protected assertConfigured() {
    if (!this.config.enabled || !this.config.apiKey) {
      throw new ProviderUnavailableError(
        this.type,
        `${this.displayName} is not configured. Add the provider API key before use.`,
      );
    }
  }
}
