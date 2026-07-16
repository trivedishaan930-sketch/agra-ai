export function normalizeTruthText(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}

export function uniqueStrings(values: string[]): string[] {
  return [...new Set(values.map((value) => value.trim()).filter(Boolean))];
}
