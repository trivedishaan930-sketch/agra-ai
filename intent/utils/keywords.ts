import { intentConfig } from "@/config/intent.config";

const stopWords = new Set([
  "the",
  "and",
  "for",
  "with",
  "that",
  "this",
  "from",
  "into",
  "about",
  "please",
  "can",
  "you",
  "are",
  "was",
  "were",
  "what",
  "when",
  "where",
  "why",
  "how",
]);

export function extractKeywords(tokens: string[]) {
  const frequencies = new Map<string, number>();
  tokens
    .filter((token) => token.length >= intentConfig.extraction.minKeywordLength)
    .filter((token) => !stopWords.has(token))
    .forEach((token) =>
      frequencies.set(token, (frequencies.get(token) ?? 0) + 1),
    );

  return Array.from(frequencies.entries())
    .sort(
      (first, second) =>
        second[1] - first[1] || first[0].localeCompare(second[0]),
    )
    .slice(0, intentConfig.extraction.maxKeywords)
    .map(([keyword]) => keyword);
}
