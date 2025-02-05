import { type Result, err, ok, safe, safeFetch } from "../result";
import type { OAuth2Tokens } from "./type";

function getOAuth2Tokens(data: Record<string, unknown>): Result<OAuth2Tokens> {
  if (typeof data.token_type !== "string") {
    return err(new Error("Invalid token type"));
  }
  if (typeof data.access_token !== "string") {
    return err(new Error("Invalid access token"));
  }
  const accessTokenExpiresAt = (() => {
    // cast okay because parseInt returns NaN for invalid data
    const expiresIn = Number.parseInt(data.expires_in as string);
    if (Number.isNaN(expiresIn)) {
      return null;
    }
    return new Date(Date.now() + expiresIn * 1000);
  })();

  return ok({
    tokenType: data.token_type,
    accessToken: data.access_token,
    refreshToken:
      typeof data.refresh_token === "string" ? data.refresh_token : null,
    refreshTokenExpiresAt: null,
    accessTokenExpiresAt,
    scopes: typeof data.scope === "string" ? data.scope.split(" ") : [],
    idToken: typeof data.id_token === "string" ? data.id_token : null,
  });
}

export async function validateAuthorizationCode({
  code,
  codeVerifier,
  redirectURI,
  clientId,
  clientSecret,
  tokenEndpoint,
  authentication,
}: {
  tokenEndpoint: string;
  clientId: string;
  clientSecret: string;
  code: string;
  redirectURI: string;
  codeVerifier: string | null;
  authentication?: "basic" | "post";
}): Promise<Result<OAuth2Tokens>> {
  const headers: Record<string, string> = {
    "content-type": "application/x-www-form-urlencoded",
    accept: "application/json",
    // required by Github
    "user-agent": "@rect/auth",
  };

  const searchParams = new URLSearchParams();
  searchParams.set("grant_type", "authorization_code");
  searchParams.set("code", code);
  searchParams.set("redirect_uri", redirectURI);
  if (codeVerifier) {
    searchParams.set("code_verifier", codeVerifier);
  }

  if (authentication === "basic") {
    const encodedCredentials = btoa(`${clientId}:${clientSecret}`);
    headers.authorization = `Basic ${encodedCredentials}`;
  } else {
    searchParams.set("client_id", clientId);
    searchParams.set("client_secret", clientSecret);
  }

  const body = new TextEncoder().encode(searchParams.toString());
  // required by Reddit
  headers["Content-Length"] = body.byteLength.toString();

  const responseResult = await safeFetch(tokenEndpoint, {
    method: "POST",
    body,
    headers,
  });

  if (!responseResult.success) {
    return responseResult;
  }
  const response = responseResult.data;
  const responseJsonResult = await safe(() => response.json());
  if (!responseJsonResult.success) {
    return responseJsonResult;
  }
  if (
    typeof responseJsonResult.data !== "object" ||
    responseJsonResult.data === null ||
    !("token_type" in responseJsonResult.data)
  ) {
    return err(
      new Error(
        `Invalid response from token endpoint ${tokenEndpoint}. Received ${JSON.stringify(
          decodeURIComponent(JSON.stringify(responseJsonResult.data)),
        )}`,
      ),
    );
  }

  const tokens = getOAuth2Tokens(responseJsonResult.data);
  return tokens;
}
