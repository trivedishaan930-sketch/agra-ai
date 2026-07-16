import { z, type ZodSchema } from "zod";
import { AppError } from "@/lib/errors";

export function validateInput<T>(schema: ZodSchema<T>, input: unknown): T {
  const result = schema.safeParse(input);
  if (!result.success)
    throw new AppError(
      "VALIDATION_ERROR",
      "Input validation failed.",
      result.error.flatten(),
    );
  return result.data;
}

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(20),
});
