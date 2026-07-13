import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { AppError, toAppError } from "@/lib/errors";

export type PaginationMeta = { page: number; pageSize: number; total: number; totalPages: number };
export type ApiSuccess<T> = { success: true; data: T; meta?: { pagination?: PaginationMeta; requestId?: string } };
export type ApiFailure = { success: false; error: { code: string; message: string; details?: unknown }; meta?: { requestId?: string } };

export function successResponse<T>(data: T, init?: { status?: number; pagination?: PaginationMeta; requestId?: string }) {
  return NextResponse.json<ApiSuccess<T>>(
    { success: true, data, meta: { pagination: init?.pagination, requestId: init?.requestId } },
    { status: init?.status ?? 200 },
  );
}

export function errorResponse(error: unknown, requestId?: string) {
  const appError = toAppError(error);
  return NextResponse.json<ApiFailure>(
    { success: false, error: { code: appError.code, message: appError.message, details: appError.details }, meta: { requestId } },
    { status: appError.status },
  );
}

export function validationErrorResponse(error: ZodError, requestId?: string) {
  return errorResponse(new AppError("VALIDATION_ERROR", "Request validation failed.", error.flatten()), requestId);
}
