import { RoutingStrategyResolver } from "@/router/strategies";
import type { NormalizedRouterInput, RouterInput } from "@/router/types";
import { normalizeRouterText, uniqueRouterStrings } from "@/router/utils";

export class RouterInputNormalizer {
  private readonly strategyResolver = new RoutingStrategyResolver();

  normalize(input: RouterInput): NormalizedRouterInput {
    return {
      ...input,
      normalizedUserInput: normalizeRouterText(input.userInput),
      resolvedGoal: normalizeRouterText(
        input.goal ?? input.intentAnalysis.goal.description,
      ),
      resolvedTasks: uniqueRouterStrings([
        ...input.intentAnalysis.tasks.map((task) => task.type),
        ...(input.tasks ?? []),
      ]),
      resolvedConstraints: uniqueRouterStrings([
        ...input.intentAnalysis.context.constraints,
        ...input.promptPackage.constraints,
        ...(input.constraints ?? []),
      ]),
      strategy: this.strategyResolver.resolve(
        input.intentAnalysis,
        input.strategy,
      ),
    };
  }
}
