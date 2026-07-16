import type {
  TruthInput,
  TruthIntelligencePackage,
  TruthMetricKey,
  TruthResearchHook,
  TruthValidationScope,
} from "@/truth/types";

export type TruthPublicContract = Readonly<{
  analyze(input: TruthInput): TruthIntelligencePackage;
}>;

export type TruthScoringMetricContract = Readonly<{
  key: TruthMetricKey;
  version: string;
  implemented: false;
}>;

export type TruthValidationContract = Readonly<{
  scope: TruthValidationScope;
  reusable: true;
}>;

export type TruthResearchHookContract = TruthResearchHook;
