import { z } from "zod";

const runtimeEnvironmentSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  NEXT_PUBLIC_APP_URL: z.string().url(),
  NEXT_PUBLIC_APP_NAME: z.string().min(1).default("AgraAI"),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  DATABASE_URL: z.string().url(),
  DIRECT_URL: z.string().url().optional(),
  GROQ_API_KEY: z.string().min(1).optional(),
  GROQ_BASE_URL: z.string().url().default("https://api.groq.com/openai/v1"),
  GROQ_MODEL: z.string().min(1).default("llama-3.1-8b-instant"),
  GROQ_TIMEOUT_MS: z.coerce.number().int().positive().default(30_000),
  GROQ_RETRY_COUNT: z.coerce.number().int().min(0).default(2),
  GROQ_MAX_TOKENS: z.coerce.number().int().positive().default(2_048),
  GROQ_TEMPERATURE: z.coerce.number().min(0).max(2).default(0.7),
  OPENAI_API_KEY: z.string().min(1).optional(),
  OPENAI_BASE_URL: z.string().url().default("https://api.openai.com/v1"),
  OPENAI_MODEL: z.string().min(1).default("gpt-4o-mini"),
  OPENAI_TIMEOUT_MS: z.coerce.number().int().positive().default(30_000),
  OPENAI_RETRY_COUNT: z.coerce.number().int().min(0).default(2),
  OPENAI_MAX_TOKENS: z.coerce.number().int().positive().default(2_048),
  OPENAI_TEMPERATURE: z.coerce.number().min(0).max(2).default(0.7),
  ANTHROPIC_API_KEY: z.string().min(1).optional(),
  ANTHROPIC_BASE_URL: z.string().url().default("https://api.anthropic.com/v1"),
  ANTHROPIC_MODEL: z.string().min(1).default("claude-3-5-sonnet-latest"),
  ANTHROPIC_TIMEOUT_MS: z.coerce.number().int().positive().default(30_000),
  ANTHROPIC_RETRY_COUNT: z.coerce.number().int().min(0).default(2),
  ANTHROPIC_MAX_TOKENS: z.coerce.number().int().positive().default(2_048),
  ANTHROPIC_TEMPERATURE: z.coerce.number().min(0).max(1).default(0.7),
  GOOGLE_AI_API_KEY: z.string().min(1).optional(),
  GOOGLE_AI_BASE_URL: z
    .string()
    .url()
    .default("https://generativelanguage.googleapis.com/v1beta"),
  GOOGLE_AI_MODEL: z.string().min(1).default("gemini-1.5-flash"),
  GOOGLE_AI_TIMEOUT_MS: z.coerce.number().int().positive().default(30_000),
  GOOGLE_AI_RETRY_COUNT: z.coerce.number().int().min(0).default(2),
  GOOGLE_AI_MAX_TOKENS: z.coerce.number().int().positive().default(2_048),
  GOOGLE_AI_TEMPERATURE: z.coerce.number().min(0).max(2).default(0.7),
  MISTRAL_API_KEY: z.string().min(1).optional(),
  MISTRAL_BASE_URL: z.string().url().default("https://api.mistral.ai/v1"),
  MISTRAL_MODEL: z.string().min(1).default("mistral-small-latest"),
  MISTRAL_TIMEOUT_MS: z.coerce.number().int().positive().default(30_000),
  MISTRAL_RETRY_COUNT: z.coerce.number().int().min(0).default(2),
  MISTRAL_MAX_TOKENS: z.coerce.number().int().positive().default(2_048),
  MISTRAL_TEMPERATURE: z.coerce.number().min(0).max(2).default(0.7),
});

const parsedEnvironment = runtimeEnvironmentSchema.safeParse(process.env);

if (!parsedEnvironment.success) {
  const formattedErrors = parsedEnvironment.error.issues
    .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
    .join("; ");

  throw new Error(
    `Invalid runtime environment configuration: ${formattedErrors}`,
  );
}

export const env = parsedEnvironment.data;
export type RuntimeEnvironment = typeof env;
export type RuntimeEnvironmentName = RuntimeEnvironment["NODE_ENV"];
