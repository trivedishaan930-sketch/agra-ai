export function normalizeRouterText(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

export function uniqueRouterStrings(values: readonly string[]) {
  const seen = new Set<string>();
  return values
    .map(normalizeRouterText)
    .filter(Boolean)
    .filter((value) => {
      const key = value.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}
