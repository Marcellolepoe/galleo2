import { Buffer } from "node:buffer";
import { safeFetch } from "@galleo/result";
import { Hono } from "hono";
import { onLoginComplete } from "../../lib/auth/on-login-complete";
import { getDb } from "../../lib/hono";
import { TOKEN_STORAGE } from "../../lib/oauth/constant";
import { createAuthorizationURL } from "../../lib/oauth/create-authorization-url";
import { getUserProfile } from "../../lib/oauth/get-user-profile";
import type { OAuth2Tokens, OAuthProviderConfig } from "../../lib/oauth/type";
import { validateAuthorizationCode } from "../../lib/oauth/validate-authorization-code";
import { createOauthRouter } from "./oauth";

// Microsoft OAuth endpoints and configuration
const MICROSOFT_TENANT_ID = "common";
const MICROSOFT_AUTH_CONFIG: OAuthProviderConfig = {
  id: "microsoft",
  authorizationEndpoint: `https://login.microsoftonline.com/${MICROSOFT_TENANT_ID}/oauth2/v2.0/authorize`,
  tokenEndpoint: `https://login.microsoftonline.com/${MICROSOFT_TENANT_ID}/oauth2/v2.0/token`,
  userInfoEndpoint: "https://graph.microsoft.com/v1.0/me",
};

// Types for Microsoft profile data
export interface MicrosoftEntraIDProfile extends Record<string, unknown> {
  id: string;
  displayName: string;
  givenName: string;
  surname: string;
  mail: string;
  picture: string | null;
}

export const microsoftEntraIdRouter = ({
  scopes,
  extraAuthUrlQueryParams,
  overrides,
}: {
  scopes?: string[];
  extraAuthUrlQueryParams?: {
    prompt?: "select_account";
  } & Record<string, string>;
  overrides?: {
    envVars?: {
      clientId?: string;
      clientSecret?: string;
    };
    getUserProfile?: (token: OAuth2Tokens) => Promise<MicrosoftEntraIDProfile>;
  };
}) => {
  const envVars = {
    clientId: overrides?.envVars?.clientId ?? "MICROSOFT_CLIENT_ID",
    clientSecret: overrides?.envVars?.clientSecret ?? "MICROSOFT_CLIENT_SECRET",
  };
  const finalScopes = [
    ...(scopes ?? []),
    "openid",
    "profile",
    "email",
    "User.Read",
  ];

  return new Hono().route(
    `/${MICROSOFT_AUTH_CONFIG.id}`,
    createOauthRouter<MicrosoftEntraIDProfile | null>({
      createAuthUrl: async ({ state, codeVerifier, currentUrl, env }) => {
        const clientId = env[envVars.clientId as keyof typeof env];
        if (!clientId) {
          throw new Error(`Client ID is not set for ${envVars.clientId}`);
        }

        const redirectURI = new URL(currentUrl);
        const url = await createAuthorizationURL({
          authorizationEndpoint: MICROSOFT_AUTH_CONFIG.authorizationEndpoint,
          clientId,
          redirectURI: `${redirectURI.origin}${redirectURI.pathname}/callback`,
          state,
          codeVerifier,
          scopes: finalScopes,
          additionalParams: extraAuthUrlQueryParams,
        });
        return url.href;
      },
      validateAuthorizationCode: async ({
        code,
        codeVerifier,
        currentUrl,
        env,
      }) => {
        const clientId = env[envVars.clientId as keyof typeof env];
        if (!clientId) {
          throw new Error(`Client ID is not set for ${envVars.clientId}`);
        }

        const clientSecret = env[envVars.clientSecret as keyof typeof env];
        if (!clientSecret) {
          throw new Error(
            `Client Secret is not set for ${envVars.clientSecret}`,
          );
        }

        const redirectURL = new URL(currentUrl);
        const redirectURI = `${redirectURL.origin}${redirectURL.pathname}`;

        const result = await validateAuthorizationCode({
          tokenEndpoint: MICROSOFT_AUTH_CONFIG.tokenEndpoint,
          clientId,
          clientSecret,
          code,
          codeVerifier,
          redirectURI,
          authentication: "post",
        });
        if (!result.success) {
          throw result.error;
        }
        return result.data;
      },
      getUserProfile: async (token) => {
        const result = await getUserProfile({
          tokens: token,
          userInfoEndpoint: MICROSOFT_AUTH_CONFIG.userInfoEndpoint,
          getUserProfileOverride: overrides?.getUserProfile,
        });
        if (!result.success) {
          throw result.error;
        }

        const profilePhotoSize = 48;
        const profilePhotoResult = await safeFetch(
          `https://graph.microsoft.com/v1.0/me/photos/${profilePhotoSize}x${profilePhotoSize}/$value`,
          {
            headers: {
              Authorization: `Bearer ${token.accessToken}`,
            },
          },
        );
        if (!profilePhotoResult.success) {
          throw profilePhotoResult.error;
        }

        const pictureBuffer = await profilePhotoResult.data.arrayBuffer();
        const picture = `data:image/jpeg;base64,${Buffer.from(
          pictureBuffer,
        ).toString("base64")}`;

        return Promise.resolve({
          ...result.data,
          picture,
        });
      },
      onLoginSuccess: async ({ tokens, userProfile }) => {
        if (!userProfile) {
          throw new Error("Missing user profile. Please try again.");
        }

        const result = await onLoginComplete({
          db: getDb(),
          info: {
            email: userProfile.mail,
            emailVerified: true,
            image: userProfile.picture,
            name: userProfile.displayName,
            provider: MICROSOFT_AUTH_CONFIG.id,
            providerUserId: userProfile.id,
          },
          tokens,
        });
        if (!result.success) {
          throw result.error;
        }
        return result.data;
      },
      tokenStorage: TOKEN_STORAGE,
    }),
  );
};
