export function maskSecret(value: string | undefined, visiblePrefix = 4) {
  if (!value) return "<unset>";
  if (value.length <= visiblePrefix) return "****";
  return `${value.slice(0, visiblePrefix)}****`;
}

export function assertServerOnlySecret(
  name: string,
  value: string | undefined,
) {
  if (!value) throw new Error(`Missing required server secret: ${name}`);
  return value;
}
