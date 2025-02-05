import {
  arrayBufferToBase64UrlSafe,
  base64UrlSafeToBuffer,
} from "./conversion";

function deriveHmacKey(key: string) {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(key),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

export const hmac = {
  async sign({ key, value }: { value: string; key: string }) {
    const derivedKey = await deriveHmacKey(key);
    const signature = await crypto.subtle.sign(
      "HMAC",
      derivedKey,
      new TextEncoder().encode(value),
    );
    return arrayBufferToBase64UrlSafe(signature);
  },
  async verify({
    key,
    value,
    signature,
  }: { value: string; key: string; signature: string }) {
    const derivedKey = await deriveHmacKey(key);
    const signatureBuffer = base64UrlSafeToBuffer(signature);
    const encodedData = new TextEncoder().encode(value);

    const result = await crypto.subtle.verify(
      "HMAC",
      derivedKey,
      signatureBuffer,
      encodedData,
    );
    return result;
  },
};
