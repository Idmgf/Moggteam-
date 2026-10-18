import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { UserRole } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireSecret, isProduction } from "@/lib/env";

const COOKIE_NAME = "tamyr_pop_session";
const SESSION_DAYS = 30;

function sessionKey() {
  return new TextEncoder().encode(requireSecret("SESSION_SECRET"));
}

export async function createSession(userId: string, role: UserRole) {
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  const session = await prisma.session.create({ data: { userId, expiresAt } });
  const token = await new SignJWT({ sid: session.id, role })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(userId)
    .setIssuedAt()
    .setExpirationTime(expiresAt)
    .sign(sessionKey());
  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: isProduction(),
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
}

export async function getCurrentUser() {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, sessionKey());
    if (typeof payload.sub !== "string" || typeof payload.sid !== "string") return null;
    const session = await prisma.session.findFirst({
      where: { id: payload.sid, userId: payload.sub, expiresAt: { gt: new Date() } },
      include: { user: true },
    });
    return session?.user ?? null;
  } catch {
    return null;
  }
}

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) throw new Error("unauthorized");
  return user;
}

export async function requireAdmin() {
  const user = await requireUser();
  if (user.role !== "ADMIN") throw new Error("forbidden");
  return user;
}

export async function destroyCurrentSession() {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (token) {
    try {
      const { payload } = await jwtVerify(token, sessionKey());
      if (typeof payload.sid === "string") await prisma.session.delete({ where: { id: payload.sid } }).catch(() => undefined);
    } catch {
      // An invalid token is still removed below; no user data is logged.
    }
  }
  store.set(COOKIE_NAME, "", { httpOnly: true, secure: isProduction(), sameSite: "lax", path: "/", maxAge: 0 });
}
