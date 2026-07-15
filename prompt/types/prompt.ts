import type { IntentAnalysis } from "@/intent";

export type PromptMetadataValue = string | number | boolean | string[];

export enum PromptReasoningMode {
  Direct = "direct",
  Analytical = "analytical",
  Creative = "creative",
  Stepwise = "stepwise",
}

export enum PromptOutputFormat {
  PlainText = "plain_text",
  Markdown = "markdown",
  Json = "json",
  Bullets = "bullets",
  Code = "code",
  Table = "table",
}

export type PromptProviderHints = {
  requiresFreshData: boolean;
  requiresCodeContext: boolean;
  requiresLongContext: boolean;
  supportsJsonOutput: boolean;
  suggestedCapabilities: string[];
};

export type PromptQualityScore = {
  completeness: number;
  clarity: number;
  contextQuality: number;
  goalAlignment: number;
  taskAlignment: number;
  constraintQuality: number;
  structureQuality: number;
  futureProviderCompatibility: number;
  overall: number;
};

export type PromptExample = {
  title: string;
  input: string;
  output: string;
};

export type PromptContext = {
  summary?: string;
  sections: string[];
};

export type PromptInput = {
  userInput: string;
  intentAnalysis: IntentAnalysis;
  context?: PromptContext;
  goal?: string;
  tasks?: string[];
  constraints?: string[];
  metadata?: Record<string, PromptMetadataValue>;
  outputFormat?: PromptOutputFormat;
  examples?: PromptExample[];
};

export type NormalizedPromptInput = PromptInput & {
  normalizedUserInput: string;
  allConstraints: string[];
  allTasks: string[];
  resolvedGoal: string;
};

export type PromptPackage = {
  optimizedPrompt: string;
  systemInstruction: string;
  userInstruction: string;
  contextSection: string;
  constraints: string[];
  examples: PromptExample[];
  outputFormat: PromptOutputFormat;
  temperatureHint: number;
  reasoningMode: PromptReasoningMode;
  providerHints: PromptProviderHints;
  qualityScore: PromptQualityScore;
  metadata: Record<string, PromptMetadataValue>;
  warnings: string[];
};

export type PromptTemplate = {
  key: string;
  intent: string;
  systemInstruction: string;
  instructionPrefix: string;
  defaultOutputFormat: PromptOutputFormat;
  reasoningMode: PromptReasoningMode;
  temperatureHint: number;
};
