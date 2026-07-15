import {
  TaskType,
  type DetectedTask,
  type NormalizedIntentInput,
} from "@/intent/types";
import { weightedConfidence } from "@/intent/utils";

type TaskRule = {
  type: TaskType;
  signals: readonly string[];
};

const taskRules: readonly TaskRule[] = [
  { type: TaskType.Write, signals: ["write", "draft", "compose"] },
  { type: TaskType.Explain, signals: ["explain", "teach", "clarify"] },
  { type: TaskType.Generate, signals: ["generate", "create", "make"] },
  { type: TaskType.Translate, signals: ["translate", "translation"] },
  { type: TaskType.Research, signals: ["research", "sources", "investigate"] },
  { type: TaskType.Summarize, signals: ["summarize", "summary", "recap"] },
  { type: TaskType.Debug, signals: ["debug", "fix", "error", "bug"] },
  {
    type: TaskType.Compare,
    signals: ["compare", "versus", "vs", "difference"],
  },
  { type: TaskType.Analyze, signals: ["analyze", "evaluate", "assess"] },
  { type: TaskType.Brainstorm, signals: ["brainstorm", "ideas", "ideate"] },
  { type: TaskType.Plan, signals: ["plan", "roadmap", "schedule"] },
  { type: TaskType.Design, signals: ["design", "architect", "blueprint"] },
  { type: TaskType.Improve, signals: ["improve", "optimize", "enhance"] },
  { type: TaskType.Review, signals: ["review", "audit", "critique"] },
  { type: TaskType.Convert, signals: ["convert", "transform", "change into"] },
  { type: TaskType.Extract, signals: ["extract", "pull out", "identify"] },
  { type: TaskType.Calculate, signals: ["calculate", "compute", "math"] },
  { type: TaskType.Rewrite, signals: ["rewrite", "rephrase", "polish"] },
];

export class RuleBasedTaskDetector {
  detect(input: NormalizedIntentInput): DetectedTask[] {
    return taskRules
      .map((rule) => {
        const evidence = rule.signals.filter((signal) =>
          input.normalizedText.includes(signal),
        );
        return {
          type: rule.type,
          confidence: evidence.length
            ? weightedConfidence(0.45, evidence.length)
            : 0,
          evidence,
        };
      })
      .filter((task) => task.evidence.length > 0)
      .sort((first, second) => second.confidence - first.confidence);
  }
}
