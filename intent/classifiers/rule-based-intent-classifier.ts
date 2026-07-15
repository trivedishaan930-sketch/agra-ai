import { intentConfig } from "@/config/intent.config";
import { IntentType, type NormalizedIntentInput } from "@/intent/types";
import { weightedConfidence } from "@/intent/utils";

export type IntentClassification = {
  intent: IntentType;
  confidence: number;
  evidence: string[];
};

type IntentRule = {
  intent: IntentType;
  signals: readonly string[];
  baseConfidence: number;
};

const intentRules: readonly IntentRule[] = [
  {
    intent: IntentType.Debugging,
    signals: ["debug", "fix", "error", "bug", "failing", "stack trace"],
    baseConfidence: 0.48,
  },
  {
    intent: IntentType.Coding,
    signals: [
      "code",
      "function",
      "typescript",
      "javascript",
      "api",
      "component",
      "schema",
    ],
    baseConfidence: 0.42,
  },
  {
    intent: IntentType.Research,
    signals: ["research", "sources", "latest", "evidence", "study", "report"],
    baseConfidence: 0.44,
  },
  {
    intent: IntentType.Search,
    signals: ["search", "find", "look up", "where can", "latest"],
    baseConfidence: 0.4,
  },
  {
    intent: IntentType.Writing,
    signals: ["write", "draft", "compose", "rewrite", "copy", "article"],
    baseConfidence: 0.4,
  },
  {
    intent: IntentType.Explanation,
    signals: ["explain", "teach", "why", "how does", "what is"],
    baseConfidence: 0.4,
  },
  {
    intent: IntentType.Summarization,
    signals: ["summarize", "summary", "tl;dr", "recap"],
    baseConfidence: 0.5,
  },
  {
    intent: IntentType.Translation,
    signals: [
      "translate",
      "translation",
      "in spanish",
      "in french",
      "in german",
    ],
    baseConfidence: 0.5,
  },
  {
    intent: IntentType.Analysis,
    signals: ["analyze", "analysis", "evaluate", "assess", "inspect"],
    baseConfidence: 0.42,
  },
  {
    intent: IntentType.Agent,
    signals: ["agent", "autonomous", "delegate", "assistant that"],
    baseConfidence: 0.38,
  },
  {
    intent: IntentType.Workflow,
    signals: ["workflow", "process", "pipeline", "approval flow"],
    baseConfidence: 0.42,
  },
  {
    intent: IntentType.Automation,
    signals: ["automate", "automation", "schedule", "trigger", "repeat"],
    baseConfidence: 0.44,
  },
  {
    intent: IntentType.Image,
    signals: ["image", "picture", "photo", "logo", "illustration"],
    baseConfidence: 0.44,
  },
  {
    intent: IntentType.Document,
    signals: ["document", "pdf", "docx", "file", "contract"],
    baseConfidence: 0.42,
  },
  {
    intent: IntentType.Email,
    signals: ["email", "subject line", "reply", "inbox"],
    baseConfidence: 0.5,
  },
  {
    intent: IntentType.Marketing,
    signals: ["marketing", "campaign", "landing page", "ad copy", "seo"],
    baseConfidence: 0.42,
  },
  {
    intent: IntentType.Business,
    signals: ["business", "strategy", "pricing", "revenue", "customer"],
    baseConfidence: 0.38,
  },
  {
    intent: IntentType.Chat,
    signals: ["hello", "hi", "thanks", "chat"],
    baseConfidence: 0.35,
  },
];

function countRuleMatches(input: string, signals: readonly string[]) {
  return signals.filter((signal) => input.includes(signal));
}

export class RuleBasedIntentClassifier {
  classify(input: NormalizedIntentInput): IntentClassification {
    const matches = intentRules
      .map((rule) => {
        const evidence = countRuleMatches(input.normalizedText, rule.signals);
        return {
          intent: rule.intent,
          confidence: evidence.length
            ? weightedConfidence(rule.baseConfidence, evidence.length)
            : 0,
          evidence,
        };
      })
      .sort((first, second) => second.confidence - first.confidence);

    const bestMatch = matches[0];
    if (!bestMatch || bestMatch.confidence < intentConfig.confidence.unknown) {
      return {
        intent: IntentType.Unknown,
        confidence: intentConfig.confidence.unknown,
        evidence: [],
      };
    }

    return bestMatch;
  }
}
