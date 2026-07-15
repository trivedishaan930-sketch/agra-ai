import type {
  IntentContext,
  IntentEntity,
  NormalizedIntentInput,
} from "@/intent/types";
import { extractKeywords } from "@/intent/utils";

const urlPattern = /https?:\/\/[^\s)]+/gi;
const filePattern =
  /[\w.-]+\.(?:ts|tsx|js|jsx|json|md|pdf|docx|csv|png|jpg|jpeg|webp|svg)/gi;
const imagePattern = /[\w.-]+\.(?:png|jpg|jpeg|webp|svg)/gi;
const numberPattern = /\b\d+(?:\.\d+)?%?\b/g;
const datePattern =
  /\b(?:today|tomorrow|yesterday|\d{4}-\d{2}-\d{2}|jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\b/gi;
const constraintPattern =
  /\b(?:must|should|only|never|do not|don't|without|avoid|required|constraint|limit|deadline)\b[^.?!]*/gi;
const historyPattern =
  /\b(?:previous|earlier|above|last time|as mentioned|that response|this conversation)\b[^.?!]*/gi;

function uniqueMatches(text: string, pattern: RegExp) {
  return Array.from(new Set(text.match(pattern) ?? []));
}

function entitiesFromMatches(
  values: string[],
  type: IntentEntity["type"],
  confidence: number,
): IntentEntity[] {
  return values.map((value) => ({ value, type, confidence }));
}

function detectLanguage(text: string) {
  if (/[^\u0000-\u007F]/.test(text)) return "unknown";
  if (/\b(?:translate|translation)\b/.test(text)) return "en";
  return "en";
}

function detectTone(text: string) {
  if (/\b(?:formal|professional|executive)\b/.test(text)) return "formal";
  if (/\b(?:casual|friendly|simple)\b/.test(text)) return "casual";
  if (/\b(?:urgent|asap|immediately)\b/.test(text)) return "urgent";
  return undefined;
}

export class RuleBasedContextExtractor {
  extract(input: NormalizedIntentInput): IntentContext {
    const text = input.normalizedText;
    const references = uniqueMatches(input.text, urlPattern);
    const files = uniqueMatches(input.text, filePattern);
    const images = uniqueMatches(input.text, imagePattern);
    const constraints = uniqueMatches(input.text, constraintPattern).map(
      (constraint) => constraint.trim(),
    );
    const historyReferences = uniqueMatches(input.text, historyPattern).map(
      (reference) => reference.trim(),
    );
    const dates = uniqueMatches(input.text, datePattern);
    const numbers = uniqueMatches(input.text, numberPattern);
    const entities = [
      ...entitiesFromMatches(files, "file", 0.9),
      ...entitiesFromMatches(references, "url", 0.9),
      ...entitiesFromMatches(dates, "date", 0.72),
      ...entitiesFromMatches(numbers, "number", 0.68),
    ];

    return {
      conversationContext: input.conversationContext,
      entities,
      keywords: extractKeywords(input.tokens),
      language: detectLanguage(text),
      tone: detectTone(text),
      constraints,
      files,
      images,
      references,
      historyReferences,
    };
  }
}
