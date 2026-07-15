import { aiConfig } from "@/config/ai.config";
import {
  ClaudeAdapter,
  GeminiAdapter,
  GroqAdapter,
  MistralAdapter,
  OpenAIAdapter,
} from "@/ai/providers";
import type { AIProvider, AIProviderConfig } from "@/ai/types/provider";
import { ProviderType } from "@/ai/types/provider";
import { UnknownProviderError } from "@/ai/errors/provider-errors";

export class ProviderFactory {
  static create(
    providerType: ProviderType,
    config: AIProviderConfig = aiConfig.providers[providerType],
  ): AIProvider {
    switch (providerType) {
      case ProviderType.Groq:
        return new GroqAdapter(config);
      case ProviderType.OpenAI:
        return new OpenAIAdapter(config);
      case ProviderType.Claude:
        return new ClaudeAdapter(config);
      case ProviderType.Gemini:
        return new GeminiAdapter(config);
      case ProviderType.Mistral:
        return new MistralAdapter(config);
      default:
        throw new UnknownProviderError(providerType);
    }
  }
}
