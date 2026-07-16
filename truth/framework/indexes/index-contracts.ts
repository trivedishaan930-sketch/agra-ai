export type TruthIndexKind =
  | "truth"
  | "trust"
  | "evidence"
  | "confidence"
  | "risk"
  | "reliability"
  | "knowledge"
  | "reasoning"
  | "citation"
  | "freshness"
  | "consistency"
  | string;

export interface TruthIndexContract<TInput = unknown, TOutput = unknown> {
  readonly id: string;
  readonly kind: TruthIndexKind;
  readonly version: string;
  readonly providerIndependent: true;
  readonly implemented: false;
  calculate(input: TInput): TruthIndexResult<TOutput>;
}

export type TruthIndexResult<TOutput = unknown> = Readonly<{
  indexId: string;
  implemented: false;
  value: TOutput | null;
}>;
