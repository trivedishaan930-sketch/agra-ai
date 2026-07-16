import type { TruthExtensionContract } from "@/truth/framework/extensions";

export type TruthPluginCapability =
  | "analyzer"
  | "score"
  | "index"
  | "validator"
  | "output-field"
  | "report"
  | "research-module";

export interface TruthPluginManifest {
  readonly id: string;
  readonly name: string;
  readonly version: string;
  readonly capabilities: readonly TruthPluginCapability[];
  readonly providerIndependent: true;
  readonly dynamicLoading: false;
}

export interface TruthPluginContract {
  readonly manifest: TruthPluginManifest;
  readonly extensions: readonly TruthExtensionContract[];
}
