import { PromptTemplateRegistry } from "@/prompt/templates";
import {
  PromptOutputFormat,
  type NormalizedPromptInput,
  type PromptPackage,
} from "@/prompt/types";
import { formatList } from "@/prompt/utils";

function buildContextSection(input: NormalizedPromptInput) {
  const sections = [
    input.context?.summary,
    ...(input.context?.sections ?? []),
  ].filter(Boolean);
  return sections.length
    ? ["Context:", ...sections.map((section) => `- ${section}`)].join("\n")
    : "";
}

function buildUserInstruction(input: NormalizedPromptInput, prefix: string) {
  return [
    prefix,
    `User request: ${input.normalizedUserInput}`,
    input.resolvedGoal ? `Goal: ${input.resolvedGoal}` : "",
    formatList("Tasks", input.allTasks),
    formatList("Constraints", input.allConstraints),
  ]
    .filter(Boolean)
    .join("\n\n");
}

export class PromptBuilder {
  private readonly registry = new PromptTemplateRegistry();

  build(input: NormalizedPromptInput): Omit<PromptPackage, "qualityScore"> {
    const template = this.registry.resolve(input.intentAnalysis);
    const outputFormat =
      input.outputFormat ??
      template.defaultOutputFormat ??
      PromptOutputFormat.Markdown;
    const contextSection = buildContextSection(input);
    const userInstruction = buildUserInstruction(
      input,
      template.instructionPrefix,
    );
    const optimizedPrompt = [
      template.systemInstruction,
      userInstruction,
      contextSection,
      `Output format: ${outputFormat}`,
    ]
      .filter(Boolean)
      .join("\n\n");

    return {
      optimizedPrompt,
      systemInstruction: template.systemInstruction,
      userInstruction,
      contextSection,
      constraints: input.allConstraints,
      examples: input.examples ?? [],
      outputFormat,
      temperatureHint: template.temperatureHint,
      reasoningMode: template.reasoningMode,
      providerHints: {
        requiresFreshData: input.intentAnalysis.routingHints.requiresFreshData,
        requiresCodeContext:
          input.intentAnalysis.routingHints.requiresCodeContext,
        requiresLongContext:
          input.intentAnalysis.routingHints.requiresLongContext,
        supportsJsonOutput: outputFormat === PromptOutputFormat.Json,
        suggestedCapabilities:
          input.intentAnalysis.routingHints.suggestedCapabilities,
      },
      metadata: {
        ...(input.metadata ?? {}),
        intent: input.intentAnalysis.intent,
        intentConfidence: input.intentAnalysis.confidence,
        goal: input.resolvedGoal,
        tasks: input.allTasks,
        templateKey: template.key,
      },
      warnings: [...input.intentAnalysis.warnings],
    };
  }
}
