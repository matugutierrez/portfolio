import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "portfolio_admin";

function secret() {
  return process.env.AUTH_SECRET || "dev-secret-change-in-render";
}

function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("hex");
}

export function makeSession(username: string) {
  const payload = Buffer.from(JSON.stringify({ username, exp: Date.now() + 1000 * 60 * 60 * 12 })).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function verifySession(token?: string) {
  try {
    if (!token) return false;
    const [payload, signature] = token.split(".");
    if (!payload || !signature) return false;
    const expected = sign(payload);
    if (signature.length !== expected.length) return false;
    const valid = timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
    if (!valid) return false;
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as { exp: number };
    return Date.now() < data.exp;
  } catch {
    return false;
  }
}

export async function isAdmin() {
  const cookieStore = await cookies();
  return verifySession(cookieStore.get(COOKIE_NAME)?.value);
}

export async function setAdminSession(username: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, makeSession(username), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export function credentialsAreValid(username: string, password: string) {
  return username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD;
}
