import { APP_VERSION } from "@/config/constants";
import { env } from "@/lib/env";

export const appConfig = {
  name: env.NEXT_PUBLIC_APP_NAME,
  url: env.NEXT_PUBLIC_APP_URL,
  version: APP_VERSION,
  environment: env.NODE_ENV,
  isProduction: env.NODE_ENV === "production",
  isDevelopment: env.NODE_ENV === "development",
} as const;
