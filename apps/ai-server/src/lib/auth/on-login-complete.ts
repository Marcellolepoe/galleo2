import type { Db } from "@galleo/db";
import { ok } from "@galleo/result";
import type { OAuth2Tokens } from "../oauth/type";
import { setUpOauthAccount } from "./account";
import { setUpSession } from "./session";

export async function onLoginComplete({
  db,
  tokens,
  info,
}: {
  db: Db;
  tokens: OAuth2Tokens;
  info: {
    providerUserId: string;
    provider: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image: string | null;
  };
}) {
  const accountWithUserResult = await setUpOauthAccount({
    db,
    oauthAccount: {
      providerUserId: info.providerUserId,
      provider: info.provider,
      name: info.name,
      email: info.email,
      emailVerified: info.emailVerified,
      image: info.image,
    },
    tokens,
  });
  if (!accountWithUserResult.success) {
    return accountWithUserResult;
  }

  const accountWithUser = accountWithUserResult.data;
  const sessionResult = await setUpSession({
    db,
    userId: accountWithUser.user.id,
  });
  if (!sessionResult.success) {
    return sessionResult;
  }
  const session = sessionResult.data;

  return ok({
    userType: accountWithUser.userType,
    sessionToken: session.token,
  });
}
