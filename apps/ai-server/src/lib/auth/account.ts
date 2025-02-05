import type { Db } from "@galleo/db";
import { insertUserAndAccount } from "@galleo/db/mutations/insert-user-and-account";
import { getAccountWithUser } from "@galleo/db/queries/get-account-with-user";
import type {
  AccountProviderInfoOauth,
  SelectAccountWithUser,
} from "@galleo/db/schema/account";
import type { InsertUser } from "@galleo/db/schema/user";
import { type Result, ok } from "@galleo/result";
import { generateRandomId } from "../crypto/random";
import type { OAuth2Tokens } from "../oauth/type";

export async function setUpOauthAccount({
  db,
  oauthAccount,
  tokens,
}: {
  db: Db;
  oauthAccount: Omit<AccountProviderInfoOauth, keyof OAuth2Tokens | "type"> & {
    providerUserId: string;
    provider: string;
  } & Omit<InsertUser, "id" | "createdAt" | "updatedAt" | "deletedAt">;
  tokens: OAuth2Tokens;
}): Promise<Result<SelectAccountWithUser & { userType: "existing" | "new" }>> {
  const account = await getAccountWithUser({
    db,
    accountId: oauthAccount.providerUserId,
  });
  if (!account.success) {
    return account;
  }
  const accountWithUser = account.data;
  if (accountWithUser) {
    return ok({ ...accountWithUser, userType: "existing" as const });
  }
  const newAccountWithUser = await insertUserAndAccount({
    db,
    user: {
      id: generateRandomId(),
      name: oauthAccount.name,
      image: oauthAccount.image,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    account: {
      id: oauthAccount.providerUserId,
      provider: oauthAccount.provider,
      providerInfo: {
        type: "oauth",
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        accessTokenExpiresAt: tokens.accessTokenExpiresAt?.getTime() ?? null,
        refreshTokenExpiresAt: tokens.refreshTokenExpiresAt?.getTime() ?? null,
        idToken: tokens.idToken,
        scope: tokens.scope,
        email: oauthAccount.email,
        emailVerified: oauthAccount.emailVerified,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
  if (!newAccountWithUser.success) {
    return newAccountWithUser;
  }
  return ok({ ...newAccountWithUser.data, userType: "new" as const });
}
