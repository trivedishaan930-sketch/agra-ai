import { promptConfig } from "@/config/prompt.config";
import { type PromptInput, type NormalizedPromptInput } from "@/prompt/types";
import { normalizePromptText, uniqueStrings } from "@/prompt/utils";

export class PromptInputNormalizer {
  normalize(input: PromptInput): NormalizedPromptInput {
    const intentContext = input.intentAnalysis.context;
    const allConstraints = uniqueStrings([
      ...intentContext.constraints,
      ...(input.constraints ?? []),
    ]).slice(0, promptConfig.limits.maxConstraints);
    const allTasks = uniqueStrings([
      ...input.intentAnalysis.tasks.map((task) => task.type),
      ...(input.tasks ?? []),
    ]);

    return {
      ...input,
      userInput: normalizePromptText(input.userInput),
      normalizedUserInput: normalizePromptText(input.userInput),
      allConstraints,
      allTasks,
      resolvedGoal: normalizePromptText(
        input.goal ?? input.intentAnalysis.goal.description,
      ),
      examples: (input.examples ?? []).slice(
        0,
        promptConfig.limits.maxExamples,
      ),
      context: input.context ?? {
        summary: input.intentAnalysis.context.conversationContext,
        sections: [
          ...intentContext.keywords.map((keyword) => `Keyword: ${keyword}`),
          ...intentContext.references.map(
            (reference) => `Reference: ${reference}`,
          ),
          ...intentContext.files.map((file) => `File: ${file}`),
        ].slice(0, promptConfig.limits.maxContextSections),
      },
    };
  }
}
