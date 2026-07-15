import { BaseProviderAdapter } from "@/ai/core/base-provider";
import type {
  AIProviderCapabilities,
  AIProviderConfig,
} from "@/ai/types/provider";
import { ProviderType } from "@/ai/types/provider";

const capabilities: AIProviderCapabilities = {
  streaming: true,
  jsonOutput: true,
  functionCalling: true,
  tokenCounting: false,
  parallelInference: true,
};

export class GroqAdapter extends BaseProviderAdapter {
  constructor(config: AIProviderConfig) {
    super({ ...config, type: ProviderType.Groq }, capabilities);
  }
}
