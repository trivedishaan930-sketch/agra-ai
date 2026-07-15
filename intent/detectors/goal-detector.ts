import {
  GoalType,
  IntentType,
  TaskType,
  type DetectedGoal,
  type DetectedTask,
  type NormalizedIntentInput,
} from "@/intent/types";

const goalDescriptions: Record<GoalType, string> = {
  [GoalType.Learn]: "Learn something or understand a concept.",
  [GoalType.Create]: "Create a new artifact or content output.",
  [GoalType.SolveProblem]: "Solve a specific problem or remove a blocker.",
  [GoalType.AutomateWork]: "Automate repetitive or operational work.",
  [GoalType.CompareOptions]: "Compare options to understand tradeoffs.",
  [GoalType.GenerateContent]: "Generate useful content for a target purpose.",
  [GoalType.BuildSoftware]: "Build, modify, or reason about software.",
  [GoalType.Research]: "Research a topic using structured inquiry.",
  [GoalType.Planning]: "Create a plan, roadmap, or sequence of actions.",
  [GoalType.DecisionSupport]:
    "Support a decision with analysis or recommendations.",
  [GoalType.Unknown]: "Goal is not clear enough to classify.",
};

export class RuleBasedGoalDetector {
  detect(
    input: NormalizedIntentInput,
    intent: IntentType,
    tasks: DetectedTask[],
  ): DetectedGoal {
    const taskTypes = new Set(tasks.map((task) => task.type));
    const text = input.normalizedText;
    const goalType = this.resolveGoalType(text, intent, taskTypes);
    return {
      type: goalType,
      confidence: goalType === GoalType.Unknown ? 0.2 : 0.68,
      description: goalDescriptions[goalType],
    };
  }

  private resolveGoalType(
    text: string,
    intent: IntentType,
    taskTypes: Set<TaskType>,
  ) {
    if (intent === IntentType.Coding || intent === IntentType.Debugging)
      return GoalType.BuildSoftware;
    if (intent === IntentType.Automation || intent === IntentType.Workflow)
      return GoalType.AutomateWork;
    if (intent === IntentType.Research || taskTypes.has(TaskType.Research))
      return GoalType.Research;
    if (taskTypes.has(TaskType.Compare)) return GoalType.CompareOptions;
    if (taskTypes.has(TaskType.Plan) || text.includes("roadmap"))
      return GoalType.Planning;
    if (
      taskTypes.has(TaskType.Write) ||
      taskTypes.has(TaskType.Generate) ||
      intent === IntentType.Writing
    )
      return GoalType.GenerateContent;
    if (taskTypes.has(TaskType.Explain) || intent === IntentType.Explanation)
      return GoalType.Learn;
    if (text.includes("decide") || text.includes("recommend"))
      return GoalType.DecisionSupport;
    if (text.includes("fix") || text.includes("solve"))
      return GoalType.SolveProblem;
    if (text.includes("create") || text.includes("make"))
      return GoalType.Create;
    return GoalType.Unknown;
  }
}
