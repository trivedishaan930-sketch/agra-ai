export function normalizePromptText(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

export function uniqueStrings(values: readonly string[]) {
  const seen = new Set<string>();
  return values
    .map(normalizePromptText)
    .filter(Boolean)
    .filter((value) => {
      const key = value.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

export function formatList(title: string, values: readonly string[]) {
  if (!values.length) return "";
  return [`${title}:`, ...values.map((value) => `- ${value}`)].join("\n");
}
