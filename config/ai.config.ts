import { env } from "@/lib/env";
import type { AIProviderConfig } from "@/ai/types/provider";
import { ProviderType } from "@/ai/types/provider";

const DEFAULT_TIMEOUT_MS = 30_000;
const DEFAULT_RETRY_COUNT = 2;
const DEFAULT_MAX_TOKENS = 2_048;
const DEFAULT_TEMPERATURE = 0.7;

function providerConfig(
  config: Omit<AIProviderConfig, "enabled">,
): AIProviderConfig {
  return {
    ...config,
    enabled: Boolean(config.apiKey),
  };
}

export const aiConfig = {
  defaultProvider: ProviderType.Groq,
  routing: {
    fallbackOrder: [
      ProviderType.Groq,
      ProviderType.Mistral,
      ProviderType.Gemini,
      ProviderType.OpenAI,
      ProviderType.Claude,
    ],
    enableFallback: true,
    enableParallelInference: false,
  },
  providers: {
    [ProviderType.Groq]: providerConfig({
      type: ProviderType.Groq,
      displayName: "Groq",
      apiKey: env.GROQ_API_KEY,
      baseUrl: env.GROQ_BASE_URL,
      model: env.GROQ_MODEL,
      timeoutMs: env.GROQ_TIMEOUT_MS,
      retryCount: env.GROQ_RETRY_COUNT,
      maxTokens: env.GROQ_MAX_TOKENS,
      temperature: env.GROQ_TEMPERATURE,
    }),
    [ProviderType.OpenAI]: providerConfig({
      type: ProviderType.OpenAI,
      displayName: "OpenAI",
      apiKey: env.OPENAI_API_KEY,
      baseUrl: env.OPENAI_BASE_URL,
      model: env.OPENAI_MODEL,
      timeoutMs: env.OPENAI_TIMEOUT_MS,
      retryCount: env.OPENAI_RETRY_COUNT,
      maxTokens: env.OPENAI_MAX_TOKENS,
      temperature: env.OPENAI_TEMPERATURE,
    }),
    [ProviderType.Claude]: providerConfig({
      type: ProviderType.Claude,
      displayName: "Anthropic Claude",
      apiKey: env.ANTHROPIC_API_KEY,
      baseUrl: env.ANTHROPIC_BASE_URL,
      model: env.ANTHROPIC_MODEL,
      timeoutMs: env.ANTHROPIC_TIMEOUT_MS,
      retryCount: env.ANTHROPIC_RETRY_COUNT,
      maxTokens: env.ANTHROPIC_MAX_TOKENS,
      temperature: env.ANTHROPIC_TEMPERATURE,
    }),
    [ProviderType.Gemini]: providerConfig({
      type: ProviderType.Gemini,
      displayName: "Google Gemini",
      apiKey: env.GOOGLE_AI_API_KEY,
      baseUrl: env.GOOGLE_AI_BASE_URL,
      model: env.GOOGLE_AI_MODEL,
      timeoutMs: env.GOOGLE_AI_TIMEOUT_MS,
      retryCount: env.GOOGLE_AI_RETRY_COUNT,
      maxTokens: env.GOOGLE_AI_MAX_TOKENS,
      temperature: env.GOOGLE_AI_TEMPERATURE,
    }),
    [ProviderType.Mistral]: providerConfig({
      type: ProviderType.Mistral,
      displayName: "Mistral",
      apiKey: env.MISTRAL_API_KEY,
      baseUrl: env.MISTRAL_BASE_URL,
      model: env.MISTRAL_MODEL,
      timeoutMs: env.MISTRAL_TIMEOUT_MS,
      retryCount: env.MISTRAL_RETRY_COUNT,
      maxTokens: env.MISTRAL_MAX_TOKENS,
      temperature: env.MISTRAL_TEMPERATURE,
    }),
  },
  defaults: {
    timeoutMs: DEFAULT_TIMEOUT_MS,
    retryCount: DEFAULT_RETRY_COUNT,
    maxTokens: DEFAULT_MAX_TOKENS,
    temperature: DEFAULT_TEMPERATURE,
  },
} as const;

export type AIConfig = typeof aiConfig;
