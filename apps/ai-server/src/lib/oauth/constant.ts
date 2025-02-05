import type { CookieSerializeOptions } from "../hono.type";
import type { TokenStorage } from "./type";

export const OAUTH_LOGIN_VALIDITY_MILLISECONDS = 1000 * 60 * 10; // 10 minutes

export const OAUTH_COOKIE_STATE_NAME = "oauth_state";
export const OAUTH_COOKIE_VERIFIER_NAME = "oauth_verifier";
export const OAUTH_COOKIE_REDIRECT_NAME = "oauth_redirect";
export const OAUTH_COOKIE_SESSION_NAME = "oauth_session";

export const TOKEN_STORAGE: TokenStorage = "header";

export const SESSION_COOKIE_SETTINGS = (
  name: string,
  value: string,
  currentUrl: string,
): CookieSerializeOptions => {
  const domain = currentUrl.includes("localhost")
    ? "localhost"
    : // The . at the start enables the cookie to be shared between subdomains
      // The splitting is so that we get the top level domain
      `.${new URL(currentUrl).hostname.split(".").slice(-2).join(".")}`;

  return {
    name,
    value,
    httpOnly: true,
    path: "/",
    domain,
    // This enables the cookie to be used in iframes.
    // Note that you'll likely have to use document.requestStorageAccess to enable the iframe to have the cookies stored
    secure: true,
    sameSite: "none",
  };
};
