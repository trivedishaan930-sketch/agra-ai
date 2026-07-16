import type { NormalizedTruthInput, TruthInput } from "@/truth/types";
import { normalizeTruthText, uniqueStrings } from "@/truth/utils";

export class TruthInputNormalizer {
  normalize(input: TruthInput): NormalizedTruthInput {
    const contextSignals = uniqueStrings([
      ...(input.context?.signals ?? []),
      ...(input.conversationContext?.signals ?? []),
    ]);

    return {
      ...input,
      normalizedUserRequest: normalizeTruthText(input.userRequest),
      resolvedGoal: normalizeTruthText(
        input.goal ??
          input.intentAnalysis?.goal.description ??
          "Understand truth readiness",
      ),
      resolvedTasks: uniqueStrings(
        input.tasks ??
          input.intentAnalysis?.tasks.map((task) => task.type) ??
          [],
      ),
      contextSignals,
    };
  }
}
