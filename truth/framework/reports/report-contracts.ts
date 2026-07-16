export type TruthReportKind =
  | "truth-summary"
  | "developer"
  | "enterprise"
  | "premium"
  | "audit"
  | "research"
  | "explainability"
  | "json-export"
  | "api-response"
  | "dashboard-summary"
  | string;

export interface TruthReportContract<TInput = unknown, TOutput = unknown> {
  readonly id: string;
  readonly kind: TruthReportKind;
  readonly version: string;
  readonly providerIndependent: true;
  readonly implemented: false;
  render(input: TInput): TruthReportResult<TOutput>;
}

export type TruthReportResult<TOutput = unknown> = Readonly<{
  reportId: string;
  implemented: false;
  output: TOutput | null;
}>;
