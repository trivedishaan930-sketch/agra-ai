import type { PromptPackage, PromptQualityScore } from "@/prompt/types";

function clampScore(value: number) {
  return Math.max(0, Math.min(1, Number(value.toFixed(2))));
}

function average(values: readonly number[]) {
  return clampScore(
    values.reduce((sum, value) => sum + value, 0) / values.length,
  );
}

export function scorePromptPackage(
  promptPackage: Omit<PromptPackage, "qualityScore">,
): PromptQualityScore {
  const hasContext = promptPackage.contextSection.length > 0;
  const hasGoal = Boolean(promptPackage.metadata.goal);
  const hasTasks =
    Array.isArray(promptPackage.metadata.tasks) &&
    promptPackage.metadata.tasks.length > 0;
  const hasStructure = [
    promptPackage.systemInstruction,
    promptPackage.userInstruction,
    promptPackage.outputFormat,
  ].every(Boolean);

  const scores = {
    completeness: clampScore(
      [
        promptPackage.optimizedPrompt,
        promptPackage.systemInstruction,
        promptPackage.userInstruction,
      ].filter(Boolean).length / 3,
    ),
    clarity: clampScore(promptPackage.userInstruction.length > 24 ? 0.85 : 0.5),
    contextQuality: hasContext ? 0.85 : 0.55,
    goalAlignment: hasGoal ? 0.9 : 0.45,
    taskAlignment: hasTasks ? 0.9 : 0.5,
    constraintQuality: promptPackage.constraints.length ? 0.85 : 0.65,
    structureQuality: hasStructure ? 0.9 : 0.4,
    futureProviderCompatibility:
      promptPackage.providerHints.suggestedCapabilities.some((hint) =>
        hint.includes("provider"),
      )
        ? 0.7
        : 0.95,
  };

  return {
    ...scores,
    overall: average(Object.values(scores)),
  };
}
