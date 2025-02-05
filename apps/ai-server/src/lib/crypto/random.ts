import { Buffer } from "node:buffer";

function generateRandomString(length: number) {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Buffer.from(array).toString("hex").toLowerCase();
}

export function generateRandomId() {
  return generateRandomString(16);
}
