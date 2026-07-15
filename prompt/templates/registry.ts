import { promptConfig } from "@/config/prompt.config";
import { IntentType, type IntentAnalysis } from "@/intent";
import { TemplateNotFoundError } from "@/prompt/errors";
import { promptTemplates } from "@/prompt/templates/templates";
import type { PromptTemplate } from "@/prompt/types";

function templateKeyForIntent(intentAnalysis: IntentAnalysis) {
  if (intentAnalysis.intent === IntentType.Debugging) return "coding";
  if (intentAnalysis.intent === IntentType.Explanation) return "chat";
  if (intentAnalysis.intent === IntentType.Business) return "analysis";
  if (intentAnalysis.intent === IntentType.Marketing) return "writing";
  if (intentAnalysis.intent === IntentType.Workflow) return "workflow";
  if (intentAnalysis.intent === IntentType.Agent) return "agent";
  if (intentAnalysis.goal.type === "planning") return "planning";
  return intentAnalysis.intent.toLowerCase();
}

export class PromptTemplateRegistry {
  private readonly templates = new Map(
    promptTemplates.map((template) => [template.key, template]),
  );

  resolve(intentAnalysis: IntentAnalysis): PromptTemplate {
    const key = templateKeyForIntent(intentAnalysis);
    const template = this.templates.get(key);
    if (template) return template;

    const fallback = this.templates.get(promptConfig.templates.defaultKey);
    if (promptConfig.templates.allowFallback && fallback) return fallback;

    throw new TemplateNotFoundError(key);
  }
}
