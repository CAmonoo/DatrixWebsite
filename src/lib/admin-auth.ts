import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "datrix_admin_session";
const MAX_AGE = 60 * 60 * 24 * 7;

function secret() {
  const value = process.env.ADMIN_SESSION_SECRET;
  if (!value || value.length < 32) throw new Error("ADMIN_SESSION_SECRET must contain at least 32 characters.");
  return value;
}

function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("hex");
}

export function validAdminPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD || "";
  if (!expected || expected.length < 12) throw new Error("ADMIN_PASSWORD must be configured with at least 12 characters.");
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function createAdminSession() {
  const expires = String(Date.now() + MAX_AGE * 1000);
  const value = `${expires}.${sign(expires)}`;
  (await cookies()).set(COOKIE_NAME, value, {
    httpOnly: true, secure: process.env.NODE_ENV === "production",
    sameSite: "strict", path: "/", maxAge: MAX_AGE,
  });
}

export async function destroyAdminSession() {
  (await cookies()).delete(COOKIE_NAME);
}

export async function isAdminAuthenticated() {
  const value = (await cookies()).get(COOKIE_NAME)?.value;
  if (!value) return false;
  const [expires, signature] = value.split(".");
  if (!expires || !signature || !/^\d+$/.test(expires) || Number(expires) < Date.now()) return false;
  const expected = sign(expires);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}
