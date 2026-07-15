import { IntentType } from "@/intent";
import {
  PromptOutputFormat,
  PromptReasoningMode,
  type PromptTemplate,
} from "@/prompt/types";

const baseSystemInstruction =
  "You are helping the user complete the requested task with clear, accurate, safe, and useful output.";

export const promptTemplates: readonly PromptTemplate[] = [
  {
    key: "chat",
    intent: IntentType.Chat,
    systemInstruction: baseSystemInstruction,
    instructionPrefix: "Respond conversationally and helpfully.",
    defaultOutputFormat: PromptOutputFormat.Markdown,
    reasoningMode: PromptReasoningMode.Direct,
    temperatureHint: 0.7,
  },
  {
    key: "research",
    intent: IntentType.Research,
    systemInstruction:
      "Support careful research with transparent assumptions and source-aware structure when sources are available.",
    instructionPrefix: "Research the request and organize findings clearly.",
    defaultOutputFormat: PromptOutputFormat.Markdown,
    reasoningMode: PromptReasoningMode.Analytical,
    temperatureHint: 0.35,
  },
  {
    key: "coding",
    intent: IntentType.Coding,
    systemInstruction:
      "Support software engineering tasks with precise, maintainable, production-quality guidance.",
    instructionPrefix:
      "Solve the coding task while preserving existing architecture and constraints.",
    defaultOutputFormat: PromptOutputFormat.Code,
    reasoningMode: PromptReasoningMode.Stepwise,
    temperatureHint: 0.25,
  },
  {
    key: "writing",
    intent: IntentType.Writing,
    systemInstruction:
      "Support writing tasks with strong structure, audience fit, and concise language.",
    instructionPrefix: "Create or improve the requested written content.",
    defaultOutputFormat: PromptOutputFormat.Markdown,
    reasoningMode: PromptReasoningMode.Creative,
    temperatureHint: 0.75,
  },
  {
    key: "analysis",
    intent: IntentType.Analysis,
    systemInstruction:
      "Support analytical work with evidence-based reasoning, tradeoffs, and clear conclusions.",
    instructionPrefix:
      "Analyze the request and present actionable conclusions.",
    defaultOutputFormat: PromptOutputFormat.Markdown,
    reasoningMode: PromptReasoningMode.Analytical,
    temperatureHint: 0.35,
  },
  {
    key: "translation",
    intent: IntentType.Translation,
    systemInstruction:
      "Support translation tasks while preserving meaning, tone, and formatting constraints.",
    instructionPrefix:
      "Translate the provided content according to the requested language and style.",
    defaultOutputFormat: PromptOutputFormat.PlainText,
    reasoningMode: PromptReasoningMode.Direct,
    temperatureHint: 0.25,
  },
  {
    key: "summarization",
    intent: IntentType.Summarization,
    systemInstruction:
      "Support summarization tasks with concise, faithful, and well-structured output.",
    instructionPrefix:
      "Summarize the content without adding unsupported claims.",
    defaultOutputFormat: PromptOutputFormat.Bullets,
    reasoningMode: PromptReasoningMode.Direct,
    temperatureHint: 0.3,
  },
  {
    key: "planning",
    intent: "PLANNING",
    systemInstruction:
      "Support planning tasks with sequenced steps, dependencies, risks, and success criteria.",
    instructionPrefix: "Create a clear plan for the requested outcome.",
    defaultOutputFormat: PromptOutputFormat.Markdown,
    reasoningMode: PromptReasoningMode.Stepwise,
    temperatureHint: 0.45,
  },
  {
    key: "agent",
    intent: IntentType.Agent,
    systemInstruction:
      "Structure agent-oriented requests without executing agent behavior.",
    instructionPrefix:
      "Define the agent-oriented objective, boundaries, and expected output without invoking tools or runtime behavior.",
    defaultOutputFormat: PromptOutputFormat.Markdown,
    reasoningMode: PromptReasoningMode.Stepwise,
    temperatureHint: 0.4,
  },
  {
    key: "workflow",
    intent: IntentType.Workflow,
    systemInstruction:
      "Structure workflow-oriented requests without executing workflow behavior.",
    instructionPrefix:
      "Describe the workflow objective, inputs, steps, and outputs without executing automation.",
    defaultOutputFormat: PromptOutputFormat.Markdown,
    reasoningMode: PromptReasoningMode.Stepwise,
    temperatureHint: 0.4,
  },
];
