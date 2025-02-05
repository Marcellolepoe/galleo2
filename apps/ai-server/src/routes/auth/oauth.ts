import { type Context, Hono } from "hono";
import { validator } from "hono/validator";
import { generateCodeVerifier, generateState } from "../../lib/crypto/oauth";
import type { EnvSchema } from "../../lib/env";
import {
  getCookie,
  getEnv,
  getSignedCookie,
  setCookie,
  setSignedCookie,
} from "../../lib/hono";
import type { CookieSerializeOptions } from "../../lib/hono.type";
import {
  OAUTH_COOKIE_REDIRECT_NAME,
  OAUTH_COOKIE_SESSION_NAME,
  OAUTH_COOKIE_STATE_NAME,
  OAUTH_COOKIE_VERIFIER_NAME,
  OAUTH_LOGIN_VALIDITY_MILLISECONDS,
  SESSION_COOKIE_SETTINGS,
} from "../../lib/oauth/constant";
import type { OAuth2Tokens, TokenStorage } from "../../lib/oauth/type";
import { safe } from "../../lib/result";

function handleRedirect({
  ctx,
  error,
  errorDescription,
  redirectUrl,
}: {
  ctx: Context;
  error: string;
  errorDescription: string;
  redirectUrl?: string;
}) {
  if (redirectUrl) {
    const url = new URL(redirectUrl);
    url.searchParams.set("error", error);
    url.searchParams.set("error_description", errorDescription);
    return ctx.redirect(url.toString(), 302);
  }
  return ctx.json({ error, error_description: errorDescription }, 400);
}

export function createOauthRouter(args: {
  createAuthUrl: OauthRouterInternalArgs<never>["createAuthUrl"];
  validateAuthorizationCode: OauthRouterInternalArgs<never>["validateAuthorizationCode"];
  onLoginSuccess: (args: {
    tokens: OAuth2Tokens;
  }) => Promise<{
    userType: "new" | "existing";
    sessionToken: string;
  }>;
  tokenStorage: OauthRouterInternalArgs<never>["tokenStorage"];
}): ReturnType<typeof createOauthRouterInternal>;
export function createOauthRouter<
  T extends Record<string, unknown> | null,
>(args: {
  createAuthUrl: OauthRouterInternalArgs<T>["createAuthUrl"];
  validateAuthorizationCode: OauthRouterInternalArgs<T>["validateAuthorizationCode"];
  getUserProfile: (tokens: OAuth2Tokens) => Promise<T>;
  onLoginSuccess: (args: {
    tokens: OAuth2Tokens;
    userProfile: T;
  }) => Promise<{
    userType: "new" | "existing";
    sessionToken: string;
  }>;
  tokenStorage: OauthRouterInternalArgs<T>["tokenStorage"];
}): ReturnType<typeof createOauthRouterInternal>;

export function createOauthRouter<T extends Record<string, unknown>>({
  createAuthUrl,
  validateAuthorizationCode,
  getUserProfile,
  onLoginSuccess,
  tokenStorage,
}: OauthRouterInternalArgs<T>) {
  return createOauthRouterInternal({
    createAuthUrl,
    validateAuthorizationCode,
    getUserProfile,
    onLoginSuccess,
    tokenStorage,
  });
}

interface OauthRouterInternalArgs<T extends Record<string, unknown> | null> {
  createAuthUrl: (args: {
    state: string;
    codeVerifier: string;
    currentUrl: string;
    env: EnvSchema;
  }) => Promise<string>;
  validateAuthorizationCode: (args: {
    code: string;
    codeVerifier: string | null;
    currentUrl: string;
    env: EnvSchema;
  }) => Promise<OAuth2Tokens>;
  getUserProfile?: (tokens: OAuth2Tokens) => Promise<T>;
  onLoginSuccess: (args: {
    tokens: OAuth2Tokens;
    userProfile: T | undefined;
  }) => Promise<{
    userType: "new" | "existing";
    sessionToken: string;
  }>;
  tokenStorage: TokenStorage;
}
export function createOauthRouterInternal<T extends Record<string, unknown>>({
  createAuthUrl,
  validateAuthorizationCode,
  getUserProfile,
  onLoginSuccess,
  tokenStorage,
}: OauthRouterInternalArgs<T>) {
  return new Hono()
    .get(
      "/",
      validator("query", (value) => {
        const { successUrl, newUserUrl, errorUrl } = value;

        // TODO: validate redirect urls
        const redirectUrls: {
          successUrl?: string;
          newUserUrl?: string;
          errorUrl?: string;
        } = {};
        if (typeof successUrl === "string") {
          redirectUrls.successUrl = successUrl;
        }
        if (typeof newUserUrl === "string") {
          redirectUrls.newUserUrl = newUserUrl;
        }
        if (typeof errorUrl === "string") {
          redirectUrls.errorUrl = errorUrl;
        }

        return redirectUrls;
      }),
      async (c) => {
        const env = getEnv();
        const state = generateState();
        const codeVerifier = generateCodeVerifier();

        const cookieOptions: Omit<CookieSerializeOptions, "name" | "value"> = {
          httpOnly: true,
          path: "/",
          secure: env.NODE_ENV === "production",
          sameSite: "lax",
          expires: new Date(Date.now() + OAUTH_LOGIN_VALIDITY_MILLISECONDS),
        };

        const redirectUrls = c.req.valid("query");

        setCookie({
          name: OAUTH_COOKIE_REDIRECT_NAME,
          value: JSON.stringify(redirectUrls),
          ...cookieOptions,
        });

        await setSignedCookie({
          name: OAUTH_COOKIE_STATE_NAME,
          value: state,
          ...cookieOptions,
        });
        await setSignedCookie({
          name: OAUTH_COOKIE_VERIFIER_NAME,
          value: codeVerifier,
          ...cookieOptions,
        });

        const url = await createAuthUrl({
          state,
          codeVerifier,
          currentUrl: c.req.url,
          env,
        });

        return c.redirect(url.toString(), 302);
      },
    )
    .on(["GET", "POST"], "/callback", async (c) => {
      const {
        code: queryCode,
        state: queryState,
        error: queryError,
        error_description: queryErrorDescription,
        error_uri: queryErrorUri,
      } = c.req.query();
      const {
        code: bodyCode,
        state: bodyState,
        error: bodyError,
        error_description: bodyErrorDescription,
        error_uri: bodyErrorUri,
      } = await c.req.parseBody();

      const code = queryCode ?? bodyCode;
      const state = queryState ?? bodyState;

      const error = queryError ?? bodyError;
      const errorDescription = queryErrorDescription ?? bodyErrorDescription;
      const errorUri = queryErrorUri ?? bodyErrorUri;

      const cookieRedirect = getCookie(OAUTH_COOKIE_REDIRECT_NAME, (raw) => {
        try {
          const parsed = JSON.parse(raw);
          if (typeof parsed !== "object" || parsed === null) {
            return null;
          }
          return {
            successUrl:
              typeof parsed.successUrl === "string"
                ? parsed.successUrl
                : undefined,
            errorUrl:
              typeof parsed.errorUrl === "string" ? parsed.errorUrl : undefined,
            newUserUrl:
              typeof parsed.newUserUrl === "string"
                ? parsed.newUserUrl
                : undefined,
          };
        } catch {
          return null;
        }
      });

      if (
        error instanceof File ||
        errorDescription instanceof File ||
        errorUri instanceof File
      ) {
        return handleRedirect({
          ctx: c,
          error: "invalid_request",
          errorDescription: "Error is not a string",
          redirectUrl: cookieRedirect?.errorUrl,
        });
      }

      if (typeof state !== "string") {
        return handleRedirect({
          ctx: c,
          error: "invalid_request",
          errorDescription:
            "State not found. Your login session may have expired. Please try again.",
          redirectUrl: cookieRedirect?.errorUrl,
        });
      }
      if (typeof code !== "string") {
        return handleRedirect({
          ctx: c,
          error: error ?? "invalid_request",
          errorDescription: errorDescription
            ? `${errorDescription}. ${errorUri ? errorUri : ""}`
            : "Missing Code.",
          redirectUrl: cookieRedirect?.errorUrl,
        });
      }

      const cookieState = await getSignedCookie(OAUTH_COOKIE_STATE_NAME);
      if (cookieState !== state) {
        return handleRedirect({
          ctx: c,
          error: "invalid_request",
          errorDescription: "State mismatch",
          redirectUrl: cookieRedirect?.errorUrl,
        });
      }

      const cookieVerifier = await getSignedCookie(OAUTH_COOKIE_VERIFIER_NAME);

      const env = getEnv();
      const tokensResult = await safe(() =>
        validateAuthorizationCode({
          code,
          codeVerifier: cookieVerifier,
          currentUrl: c.req.url,
          env,
        }),
      );
      if (!tokensResult.success) {
        return handleRedirect({
          ctx: c,
          error: "invalid_request",
          errorDescription: `Failed to validate authorization code: ${tokensResult.error}`,
          redirectUrl: cookieRedirect?.errorUrl,
        });
      }

      const tokens = tokensResult.data;

      const userProfile = await getUserProfile?.(tokens);
      const { sessionToken, userType } = await onLoginSuccess({
        tokens,
        userProfile,
      });

      if (tokenStorage === "cookie") {
        setCookie(
          SESSION_COOKIE_SETTINGS(
            OAUTH_COOKIE_SESSION_NAME,
            sessionToken,
            c.req.url,
          ),
        );
      }
      if (tokenStorage === "header") {
        c.header("X-Session-Token", sessionToken);
      }

      if (userType === "new" && cookieRedirect?.newUserUrl) {
        return c.redirect(cookieRedirect.newUserUrl, 302);
      }
      if (cookieRedirect?.successUrl) {
        return c.redirect(cookieRedirect.successUrl, 302);
      }
      return c.redirect("/", 302);
    });
}
