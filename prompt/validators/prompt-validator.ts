import { promptConfig } from "@/config/prompt.config";
import {
  ConstraintConflictError,
  PromptTooLargeError,
  PromptValidationError,
} from "@/prompt/errors";
import {
  promptInputSchema,
  promptPackageSchema,
} from "@/prompt/validators/prompt.schema";
import type { PromptInput, PromptPackage } from "@/prompt/types";

const conflictPairs: readonly [string, string][] = [
  ["brief", "detailed"],
  ["concise", "comprehensive"],
  ["formal", "casual"],
  ["json", "plain text"],
];

function containsDuplicateInstructions(values: readonly string[]) {
  const normalized = values
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
  return new Set(normalized).size !== normalized.length;
}

function findConstraintConflict(constraints: readonly string[]) {
  const normalized = constraints.map((constraint) => constraint.toLowerCase());
  return conflictPairs.find(
    ([first, second]) =>
      normalized.some((constraint) => constraint.includes(first)) &&
      normalized.some((constraint) => constraint.includes(second)),
  );
}

export class PromptValidator {
  validateInput(input: PromptInput) {
    const parsed = promptInputSchema.safeParse(input);
    if (!parsed.success) {
      throw new PromptValidationError(
        parsed.error.issues.map((issue) => issue.message).join("; "),
        { cause: parsed.error },
      );
    }
    return parsed.data;
  }

  validatePackage(promptPackage: PromptPackage) {
    if (containsDuplicateInstructions(promptPackage.constraints)) {
      throw new PromptValidationError(
        "Prompt package contains duplicate instructions.",
      );
    }

    const conflict = findConstraintConflict(promptPackage.constraints);
    if (conflict) {
      throw new ConstraintConflictError(
        `Prompt constraints conflict: ${conflict[0]} vs ${conflict[1]}.`,
      );
    }

    if (!promptPackage.metadata.goal) {
      throw new PromptValidationError("Prompt package is missing a goal.");
    }

    if (
      !promptPackage.contextSection &&
      promptPackage.providerHints.requiresLongContext
    ) {
      throw new PromptValidationError(
        "Prompt package requires context but context is missing.",
      );
    }

    if (
      promptPackage.optimizedPrompt.length >
      promptConfig.limits.maxPromptCharacters
    ) {
      throw new PromptTooLargeError(promptConfig.limits.maxPromptCharacters);
    }

    const parsed = promptPackageSchema.safeParse(promptPackage);
    if (!parsed.success) {
      throw new PromptValidationError(
        parsed.error.issues.map((issue) => issue.message).join("; "),
        { cause: parsed.error },
      );
    }

    return parsed.data;
  }
}
