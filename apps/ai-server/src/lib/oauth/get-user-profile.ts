import { decodeJwt } from "jose";
import { type Result, ok, safe, safeFetch } from "../result";
import type { OAuth2Tokens } from "./type";

// biome-ignore lint/suspicious/noExplicitAny: This is okay because we are letting the end user define the type
export async function getUserProfile<T extends Record<string, any>>({
  tokens,
  getUserProfileOverride,
  userInfoEndpoint,
}: {
  tokens: OAuth2Tokens;
  getUserProfileOverride?: (tokens: OAuth2Tokens) => T;
  userInfoEndpoint?: string;
}): Promise<Result<T>> {
  if (getUserProfileOverride) {
    const profileResult = await safe(() => getUserProfileOverride(tokens));
    return profileResult;
  }

  let profile: Partial<T> = {};
  // If we have an ID token, decode it first
  if (tokens.idToken) {
    profile = decodeJwt(tokens.idToken) as T;
  }
  // If we have a userInfo endpoint, fetch additional data
  if (userInfoEndpoint) {
    const response = await safeFetch(userInfoEndpoint, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });

    if (!response.success) {
      return response;
    }

    const dataResult = await safe<T>(() => response.data.json());
    if (!dataResult.success) {
      return dataResult;
    }

    profile = { ...profile, ...dataResult.data };
  }

  return ok(profile as T);
}
