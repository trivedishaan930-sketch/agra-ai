export enum ProviderType {
  Groq = "groq",
  OpenAI = "openai",
  Claude = "claude",
  Gemini = "gemini",
  Mistral = "mistral",
}

export type AIMessageRole = "system" | "user" | "assistant" | "tool";

export type AIMessage = {
  role: AIMessageRole;
  content: string;
  name?: string;
};

export type AIProviderRequestOptions = {
  model?: string;
  maxTokens?: number;
  temperature?: number;
  timeoutMs?: number;
  signal?: AbortSignal;
  metadata?: Record<string, string | number | boolean>;
};

export type GenerateTextRequest = {
  prompt?: string;
  messages?: AIMessage[];
  options?: AIProviderRequestOptions;
};

export type GenerateTextResponse = {
  provider: ProviderType;
  model: string;
  text: string;
  usage?: TokenUsage;
  metadata?: Record<string, unknown>;
};

export type GenerateJSONRequest = GenerateTextRequest & {
  schemaName?: string;
};

export type GenerateJSONResponse<TOutput = unknown> = {
  provider: ProviderType;
  model: string;
  data: TOutput;
  usage?: TokenUsage;
  metadata?: Record<string, unknown>;
};

export type StreamTextRequest = GenerateTextRequest;

export type StreamTextChunk = {
  provider: ProviderType;
  model: string;
  delta: string;
  done: boolean;
  usage?: TokenUsage;
  metadata?: Record<string, unknown>;
};

export type TokenUsage = {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
};

export type TokenCountRequest = {
  text?: string;
  messages?: AIMessage[];
  model?: string;
};

export type HealthCheckResult = {
  provider: ProviderType;
  healthy: boolean;
  configured: boolean;
  latencyMs?: number;
  message?: string;
};

export type AIProviderCapabilities = {
  streaming: boolean;
  jsonOutput: boolean;
  functionCalling: boolean;
  tokenCounting: boolean;
  parallelInference: boolean;
};

export type AIProviderConfig = {
  type: ProviderType;
  displayName: string;
  apiKey?: string;
  baseUrl: string;
  model: string;
  timeoutMs: number;
  retryCount: number;
  maxTokens: number;
  temperature: number;
  enabled: boolean;
};

export interface AIProvider {
  readonly type: ProviderType;
  readonly displayName: string;
  readonly capabilities: AIProviderCapabilities;
  generateText(request: GenerateTextRequest): Promise<GenerateTextResponse>;
  streamText(request: StreamTextRequest): AsyncIterable<StreamTextChunk>;
  generateJSON<TOutput = unknown>(
    request: GenerateJSONRequest,
  ): Promise<GenerateJSONResponse<TOutput>>;
  healthCheck(): Promise<HealthCheckResult>;
  countTokens(request: TokenCountRequest): Promise<number>;
}
