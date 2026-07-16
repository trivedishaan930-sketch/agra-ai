import type { TruthConfig } from "@/config/truth.config";
import { truthConfig } from "@/truth/config";
import { PackageValidationError, TruthValidationError } from "@/truth/errors";
import type {
  TruthInput,
  TruthIntelligencePackage,
  TruthValidationScope,
} from "@/truth/types";
import { truthInputSchema, truthPackageSchema } from "./truth.schema";

export class TruthValidator {
  validateInput(input: TruthInput): TruthInput {
    const parsed = truthInputSchema.safeParse(input);
    if (!parsed.success)
      throw new TruthValidationError(
        "Invalid Truth Intelligence input.",
        parsed.error,
      );
    return parsed.data as TruthInput;
  }

  validatePackage(output: TruthIntelligencePackage): TruthIntelligencePackage {
    const parsed = truthPackageSchema.safeParse(output);
    if (!parsed.success)
      throw new PackageValidationError(
        "Invalid Truth Intelligence package.",
        parsed.error,
      );
    return parsed.data as TruthIntelligencePackage;
  }

  validateConfiguration(config: TruthConfig = truthConfig): TruthConfig {
    const invalidSecurity =
      config.security.storeSecrets ||
      config.security.storeProviderCredentials ||
      config.security.exposeInternalAnalyzers ||
      config.security.exposeInternalPipelineState ||
      config.security.exposeDebugInformation ||
      config.security.exposeResearchAlgorithms;
    const invalidFrameworkExposure =
      config.internalFramework.exposeFrameworkFromPublicBarrel ||
      config.internalFramework.exposeAnalyzerInternals ||
      config.internalFramework.exposePipelineState ||
      config.internalFramework.exposeDebugData ||
      config.internalFramework.exposeResearchInternals;
    const invalidExecutionFeatures =
      config.research.algorithmsImplemented ||
      config.research.externalAccessEnabled ||
      config.performance.enableDistributedExecution;

    if (
      !config.engine.providerIndependent ||
      invalidSecurity ||
      invalidFrameworkExposure ||
      invalidExecutionFeatures ||
      config.output.compatibilityStrategy !== "extend-only" ||
      !config.output.immutable ||
      !config.output.uiReady ||
      !config.output.apiReady
    ) {
      throw new TruthValidationError(
        "Invalid Truth Intelligence configuration.",
      );
    }

    return config;
  }

  validateCompatibility(scope: TruthValidationScope): TruthValidationScope {
    return scope;
  }
}
