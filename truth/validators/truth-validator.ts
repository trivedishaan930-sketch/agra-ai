import type { TruthAnalysisInput, TruthPackage } from "@/truth/types";
import { PackageValidationError, TruthValidationError } from "@/truth/errors";
import { truthInputSchema, truthPackageSchema } from "./truth.schema";

export class TruthValidator {
  validateInput(input: TruthAnalysisInput): TruthAnalysisInput {
import type { TruthInput, TruthIntelligencePackage } from "@/truth/types";
import { TruthValidationError } from "@/truth/errors";
import { truthInputSchema, truthPackageSchema } from "./truth.schema";

export class TruthValidator {
  validateInput(input: TruthInput): TruthInput {
    const parsed = truthInputSchema.safeParse(input);
    if (!parsed.success) throw new TruthValidationError("Invalid Truth Intelligence input.", parsed.error);
    return parsed.data;
  }

  validatePackage(output: TruthPackage): TruthPackage {
    const parsed = truthPackageSchema.safeParse(output);
    if (!parsed.success) throw new PackageValidationError("Invalid Truth Intelligence package.", parsed.error);
    return parsed.data as TruthPackage;
  validatePackage(output: TruthIntelligencePackage): TruthIntelligencePackage {
    const parsed = truthPackageSchema.safeParse(output);
    if (!parsed.success) throw new TruthValidationError("Invalid Truth Intelligence package.", parsed.error);
    return parsed.data;
  }
}
