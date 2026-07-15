import { intentConfig } from "@/config/intent.config";
import type { IntentInput, NormalizedIntentInput } from "@/intent/types";

const tokenPattern = /[\p{L}\p{N}_'-]+/gu;

export function normalizeIntentText(text: string) {
  let normalized = text;
  if (intentConfig.normalization.trim) normalized = normalized.trim();
  if (intentConfig.normalization.collapseWhitespace)
    normalized = normalized.replace(/\s+/g, " ");
  if (intentConfig.normalization.lowercase)
    normalized = normalized.toLowerCase();
  return normalized;
}

export function tokenizeIntentText(text: string) {
  return normalizeIntentText(text).match(tokenPattern) ?? [];
}

export function normalizeIntentInput(
  input: IntentInput,
): NormalizedIntentInput {
  const normalizedText = normalizeIntentText(input.text);
  return {
    ...input,
    normalizedText,
    tokens: tokenizeIntentText(normalizedText),
  };
}
