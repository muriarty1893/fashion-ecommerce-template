import { createHmac, pbkdf2Sync, randomBytes, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";

export type SessionUser = {
  id: string;
  email: string;
  role: string;
};

const sessionCookieName = "mode_session";
const sessionMaxAgeSeconds = 60 * 60 * 24 * 7;

const getSecret = () =>
  process.env.AUTH_SECRET ||
  process.env.NEXTAUTH_SECRET ||
  process.env.VERCEL_URL ||
  "mode-demo-development-secret";

const encode = (value: string) => Buffer.from(value).toString("base64url");
const decode = (value: string) => Buffer.from(value, "base64url").toString("utf8");

const sign = (value: string) =>
  createHmac("sha256", getSecret()).update(value).digest("base64url");

export const hashPassword = (password: string) => {
  const salt = randomBytes(16).toString("hex");
  const hash = pbkdf2Sync(password, salt, 120000, 32, "sha256").toString("hex");
  return `pbkdf2:${salt}:${hash}`;
};

export const verifyPassword = (password: string, storedPassword: string) => {
  if (!storedPassword.startsWith("pbkdf2:")) {
    return password === storedPassword;
  }

  const [, salt, hash] = storedPassword.split(":");
  const attempted = pbkdf2Sync(password, salt, 120000, 32, "sha256");
  const stored = Buffer.from(hash, "hex");

  return stored.length === attempted.length && timingSafeEqual(stored, attempted);
};

export const createSessionToken = (user: SessionUser) => {
  const payload = encode(
    JSON.stringify({
      ...user,
      exp: Math.floor(Date.now() / 1000) + sessionMaxAgeSeconds,
    }),
  );
  return `${payload}.${sign(payload)}`;
};

export const readSession = (request: Request): SessionUser | null => {
  const cookie = request.headers.get("cookie") || "";
  const token = cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${sessionCookieName}=`))
    ?.split("=")[1];

  if (!token) return null;

  const [payload, signature] = token.split(".");
  if (!payload || !signature || signature !== sign(payload)) return null;

  try {
    const session = JSON.parse(decode(payload)) as SessionUser & { exp: number };
    if (!session.exp || session.exp < Math.floor(Date.now() / 1000)) return null;
    return {
      id: String(session.id),
      email: session.email,
      role: session.role || "customer",
    };
  } catch {
    return null;
  }
};

export const setSessionCookie = (response: NextResponse, user: SessionUser) => {
  response.cookies.set(sessionCookieName, createSessionToken(user), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: sessionMaxAgeSeconds,
    path: "/",
  });
};

export const clearSessionCookie = (response: NextResponse) => {
  response.cookies.set(sessionCookieName, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/",
  });
};

export const requireSession = (request: Request) => {
  const session = readSession(request);
  if (!session) {
    return {
      response: NextResponse.json({ message: "Unauthorized" }, { status: 401 }),
      session: null,
    };
  }
  return { response: null, session };
};

export const requireAdmin = (request: Request) => {
  const sessionResult = requireSession(request);
  if (sessionResult.response || !sessionResult.session) return sessionResult;

  if (sessionResult.session.role !== "admin") {
    return {
      response: NextResponse.json({ message: "Forbidden" }, { status: 403 }),
      session: null,
    };
  }

  return sessionResult;
};

