export enum IntentType {
  Chat = "CHAT",
  Search = "SEARCH",
  Research = "RESEARCH",
  Writing = "WRITING",
  Coding = "CODING",
  Debugging = "DEBUGGING",
  Explanation = "EXPLANATION",
  Summarization = "SUMMARIZATION",
  Translation = "TRANSLATION",
  Analysis = "ANALYSIS",
  Agent = "AGENT",
  Workflow = "WORKFLOW",
  Automation = "AUTOMATION",
  Image = "IMAGE",
  Document = "DOCUMENT",
  Email = "EMAIL",
  Marketing = "MARKETING",
  Business = "BUSINESS",
  Unknown = "UNKNOWN",
}

export enum TaskType {
  Write = "write",
  Explain = "explain",
  Generate = "generate",
  Translate = "translate",
  Research = "research",
  Summarize = "summarize",
  Debug = "debug",
  Compare = "compare",
  Analyze = "analyze",
  Brainstorm = "brainstorm",
  Plan = "plan",
  Design = "design",
  Improve = "improve",
  Review = "review",
  Convert = "convert",
  Extract = "extract",
  Calculate = "calculate",
  Rewrite = "rewrite",
}

export enum GoalType {
  Learn = "learn_something",
  Create = "create_something",
  SolveProblem = "solve_problem",
  AutomateWork = "automate_work",
  CompareOptions = "compare_options",
  GenerateContent = "generate_content",
  BuildSoftware = "build_software",
  Research = "research",
  Planning = "planning",
  DecisionSupport = "decision_support",
  Unknown = "unknown",
}

export enum IntentPriority {
  Low = "low",
  Normal = "normal",
  High = "high",
  Critical = "critical",
}

export type IntentEntity = {
  value: string;
  type:
    | "person"
    | "organization"
    | "product"
    | "technology"
    | "file"
    | "url"
    | "date"
    | "number"
    | "unknown";
  confidence: number;
};

export type IntentContext = {
  conversationContext?: string;
  entities: IntentEntity[];
  keywords: string[];
  language: string;
  tone?: string;
  constraints: string[];
  files: string[];
  images: string[];
  references: string[];
  historyReferences: string[];
};

export type DetectedTask = {
  type: TaskType;
  confidence: number;
  evidence: string[];
};

export type DetectedGoal = {
  type: GoalType;
  confidence: number;
  description: string;
};

export type RoutingHint = {
  requiresFreshData: boolean;
  requiresCodeContext: boolean;
  requiresLongContext: boolean;
  supportsParallelization: boolean;
  suggestedCapabilities: string[];
};

export type IntentAnalysis = {
  intent: IntentType;
  confidence: number;
  tasks: DetectedTask[];
  goal: DetectedGoal;
  context: IntentContext;
  entities: IntentEntity[];
  language: string;
  priority: IntentPriority;
  metadata: Record<string, string | number | boolean | string[]>;
  warnings: string[];
  routingHints: RoutingHint;
};

export type IntentInput = {
  text: string;
  conversationContext?: string;
  metadata?: Record<string, string | number | boolean | string[]>;
};

export type NormalizedIntentInput = IntentInput & {
  normalizedText: string;
  tokens: string[];
};
