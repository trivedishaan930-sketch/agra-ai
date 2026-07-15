import { IntentType, TaskType, type IntentAnalysis } from "@/intent";
import { RoutingStrategy } from "@/router/types";

export class RoutingStrategyResolver {
  resolve(intentAnalysis: IntentAnalysis, requested?: RoutingStrategy) {
    if (requested && requested !== RoutingStrategy.Custom) return requested;
    if (
      intentAnalysis.intent === IntentType.Coding ||
      intentAnalysis.intent === IntentType.Debugging
    )
      return RoutingStrategy.CodingOptimized;
    if (
      intentAnalysis.intent === IntentType.Research ||
      intentAnalysis.routingHints.requiresFreshData
    )
      return RoutingStrategy.ResearchOptimized;
    if (
      intentAnalysis.intent === IntentType.Writing ||
      intentAnalysis.intent === IntentType.Marketing
    )
      return RoutingStrategy.WritingOptimized;
    if (intentAnalysis.intent === IntentType.Translation)
      return RoutingStrategy.TranslationOptimized;
    if (
      intentAnalysis.intent === IntentType.Analysis ||
      intentAnalysis.tasks.some((task) => task.type === TaskType.Analyze)
    )
      return RoutingStrategy.AnalysisOptimized;
    return RoutingStrategy.Balanced;
  }
}
