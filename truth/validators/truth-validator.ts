import type { TruthConfig } from "@/config/truth.config";
import { truthConfig } from "@/truth/config";
import { PackageValidationError, TruthValidationError } from "@/truth/errors";
import type { TruthInput, TruthIntelligencePackage, TruthValidationScope } from "@/truth/types";
import { truthInputSchema, truthPackageSchema } from "./truth.schema";

export class TruthValidator {
  validateInput(input: TruthInput): TruthInput {
    const parsed = truthInputSchema.safeParse(input);
    if (!parsed.success) throw new TruthValidationError("Invalid Truth Intelligence input.", parsed.error);
    return parsed.data as TruthInput;
  }

  validatePackage(output: TruthIntelligencePackage): TruthIntelligencePackage {
    const parsed = truthPackageSchema.safeParse(output);
    if (!parsed.success) throw new PackageValidationError("Invalid Truth Intelligence package.", parsed.error);
    return parsed.data as TruthIntelligencePackage;
  }

  validateConfiguration(config: TruthConfig = truthConfig): TruthConfig {
    if (!config.engine.providerIndependent || config.security.storeSecrets || config.security.storeProviderCredentials) throw new TruthValidationError("Invalid Truth Intelligence configuration.");
    return config;
  }

  validateCompatibility(scope: TruthValidationScope): TruthValidationScope {
    return scope;
  }
}
