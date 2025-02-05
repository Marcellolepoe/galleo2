export interface OAuthProviderConfig {
  authorizationEndpoint: string;
  tokenEndpoint: string;
  userInfoEndpoint: string;
  id: string;
}

export interface OAuth2Tokens {
  tokenType: string;
  accessToken: string;
  refreshToken: string | null;
  accessTokenExpiresAt: Date | null;
  refreshTokenExpiresAt: Date | null;
  idToken: string | null;
  scope: string[];
}

export type TokenStorage = "cookie" | "header";
