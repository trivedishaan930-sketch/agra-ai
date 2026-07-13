import { env } from "@/lib/env";

export const aiConfig = {
  defaultProvider: "openai",
  providers: {
    openai: { enabled: Boolean(env.OPENAI_API_KEY) },
    anthropic: { enabled: Boolean(env.ANTHROPIC_API_KEY) },
    google: { enabled: Boolean(env.GOOGLE_AI_API_KEY) },
  },
} as const;
