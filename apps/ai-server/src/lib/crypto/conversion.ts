import { Buffer } from "node:buffer";

const base64ToUrlSafe = (str: string) =>
  str.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");

const urlSafeToBase64 = (str: string) => {
  const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  const padding = "=".repeat(4 - (base64.length % 4));
  return base64 + padding;
};

export function arrayBufferToBase64UrlSafe(arrayBuffer: ArrayBuffer) {
  return base64ToUrlSafe(Buffer.from(arrayBuffer).toString("base64"));
}

export function base64UrlSafeToBuffer(str: string) {
  return Buffer.from(urlSafeToBase64(str), "base64");
}
