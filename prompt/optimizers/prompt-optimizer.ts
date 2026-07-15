import { promptConfig } from "@/config/prompt.config";
import { PromptOptimizationError } from "@/prompt/errors";
import type { PromptPackage } from "@/prompt/types";
import { normalizePromptText, uniqueStrings } from "@/prompt/utils";

export class PromptOptimizer {
  optimize(
    promptPackage: Omit<PromptPackage, "qualityScore">,
  ): Omit<PromptPackage, "qualityScore"> {
    try {
      const constraints = promptConfig.optimization.removeDuplicateInstructions
        ? uniqueStrings(promptPackage.constraints)
        : promptPackage.constraints;
      const optimizedPrompt = promptConfig.optimization.normalizeWhitespace
        ? promptPackage.optimizedPrompt
            .split("\n")
            .map((line) => normalizePromptText(line))
            .join("\n")
            .replace(/\n{3,}/g, "\n\n")
            .trim()
        : promptPackage.optimizedPrompt;

      return {
        ...promptPackage,
        optimizedPrompt,
        constraints,
        warnings: uniqueStrings(promptPackage.warnings),
      };
    } catch (error) {
      throw new PromptOptimizationError("Prompt optimization failed.", {
        cause: error,
      });
    }
  }
}
