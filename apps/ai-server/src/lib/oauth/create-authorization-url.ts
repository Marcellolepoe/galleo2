import { generateS256CodeChallenge } from "../crypto/oauth";

export async function createAuthorizationURL({
  authorizationEndpoint,
  clientId,
  scopes,
  redirectURI,
  state,
  codeVerifier,
  additionalParams,
}: {
  authorizationEndpoint: string;
  clientId: string;
  redirectURI: string;
  state: string;
  scopes: string[];
  codeVerifier?: string;
  additionalParams?: {
    prompt?: "select_account" | "consent";
  } & Record<string, string>;
}) {
  const url = new URL(authorizationEndpoint);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("state", state);
  url.searchParams.set("scope", scopes.join(" "));
  url.searchParams.set("redirect_uri", redirectURI);

  if (codeVerifier) {
    const codeChallenge = await generateS256CodeChallenge(codeVerifier);
    url.searchParams.set("code_challenge_method", "S256");
    url.searchParams.set("code_challenge", codeChallenge);
  }

  if (additionalParams) {
    for (const [key, value] of Object.entries(additionalParams)) {
      url.searchParams.set(key, value);
    }
  }

  return url;
}
