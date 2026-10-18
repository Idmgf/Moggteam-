import { NextResponse } from "next/server";

export function apiError(code: string, status = 400) {
  return NextResponse.json({ ok: false, code }, { status });
}

export function apiSuccess<T>(data: T, status = 200) {
  return NextResponse.json({ ok: true, data }, { status });
}

export function isKnownError(error: unknown, code: string) {
  return error instanceof Error && error.message === code;
}
