import { NextRequest } from "next/server";
import { appConfig } from "@/config/app.config";
import { REQUEST_ID_HEADER } from "@/config/constants";
import { prisma } from "@/database/prisma";
import { errorResponse, successResponse } from "@/lib/api/responses";
import { logger } from "@/lib/logger";

async function checkDatabase() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return { status: "ok" as const };
  } catch (error) {
    logger.warn("Health check database probe failed", { error: error instanceof Error ? error.message : String(error) });
    return { status: "degraded" as const };
  }
}

export async function GET(request: NextRequest) {
  const requestId = request.headers.get(REQUEST_ID_HEADER) ?? undefined;

  try {
    const database = await checkDatabase();
    return successResponse(
      {
        status: database.status === "ok" ? "ok" : "degraded",
        timestamp: new Date().toISOString(),
        version: appConfig.version,
        environment: appConfig.environment,
        checks: { database },
      },
      { requestId, status: database.status === "ok" ? 200 : 503 },
    );
  } catch (error) {
    logger.error("Health check failed", error, { requestId });
    return errorResponse(error, requestId);
  }
}
