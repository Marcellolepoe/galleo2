import { env } from "hono/adapter";
import { getContext } from "hono/context-storage";
import {
  getCookie as getHonoCookie,
  setCookie as setHonoCookie,
} from "hono/cookie";
import { hmac } from "./crypto/hmac";
import { parseEnv } from "./env";
import type { CookieSerializeOptions } from "./hono.type";

export function getEnv() {
  const ctx = getContext();
  const envMap = env(ctx);
  const envValidated = parseEnv(envMap);
  return envValidated;
}

export function setCookie(args: CookieSerializeOptions) {
  const ctx = getContext();
  setHonoCookie(ctx, args.name, args.value, args);
}

export function getCookie<T>(
  name: string,
  validateCookie: (value: string) => T | null,
): T | null;
export function getCookie(name: string): string | null;
export function getCookie<T>(
  name: string,
  validateCookie?: (value: string) => T | null,
) {
  const ctx = getContext();
  const cookieValue = getHonoCookie(ctx, name);
  if (!cookieValue) {
    return null;
  }
  const parsed = validateCookie ? validateCookie(cookieValue) : cookieValue;
  return parsed;
}

export async function setSignedCookie(args: CookieSerializeOptions) {
  const { ENCRYPTION_KEY } = getEnv();
  const ctx = getContext();
  const signatureBase64 = await hmac.sign({
    key: ENCRYPTION_KEY,
    value: args.value,
  });
  const cookieValue = `${args.value}.${signatureBase64}`;

  setHonoCookie(ctx, args.name, cookieValue, args);
}

export async function getSignedCookie(name: string) {
  const env = getEnv();
  const ctx = getContext();
  const cookieValue = getHonoCookie(ctx, name);
  if (!cookieValue) {
    return null;
  }
  const [value, signature] = cookieValue.split(".");
  if (!value || !signature) {
    return null;
  }
  const isValid = await hmac.verify({
    key: env.ENCRYPTION_KEY,
    value,
    signature,
  });
  return isValid ? value : null;
}
