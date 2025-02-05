export interface OAuthProviderConfig {
  authorizationEndpoint: string;
  tokenEndpoint: string;
  userInfoEndpoint: string;
  id: string;
}

export interface OAuth2Tokens {
  tokenType: string;
  accessToken: string;
  accessTokenExpiresAt: Date | null;
  refreshToken: string | null;
  refreshTokenExpiresAt: Date | null;
  scopes: string[];
  idToken: string | null;
}

export type TokenStorage = "cookie" | "header";
