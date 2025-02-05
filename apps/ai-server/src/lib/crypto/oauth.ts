import { arrayBufferToBase64UrlSafe } from "./conversion";

export function generateCodeVerifier() {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return arrayBufferToBase64UrlSafe(array);
}

export async function generateS256CodeChallenge(codeVerifier: string) {
  const data = new TextEncoder().encode(codeVerifier);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return arrayBufferToBase64UrlSafe(hash);
}

export function generateState() {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return arrayBufferToBase64UrlSafe(array);
}
