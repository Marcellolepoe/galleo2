import { type Result, safe } from "@galleo/result";
import type { Db } from "../client";
import {
  type InsertAccount,
  type SelectAccountWithUser,
  accountTable,
} from "../schema/account";
import { type InsertUser, userTable } from "../schema/user";

export async function insertUserAndAccount({
  db,
  user,
  account,
}: {
  db: Db;
  user: InsertUser;
  account: Omit<InsertAccount, "userId">;
}): Promise<Result<SelectAccountWithUser>> {
  const result = await safe(() =>
    db.transaction(async (tx) => {
      const userValues = await tx.insert(userTable).values(user).returning();
      const userValue = userValues[0] ?? null;
      if (!userValue) {
        throw new Error("DB: Failed to insert user");
      }

      const accountValues = await tx
        .insert(accountTable)
        .values({
          ...account,
          userId: userValue.id,
        })
        .returning();

      const accountValue = accountValues[0];
      if (!accountValue) {
        throw new Error("DB: Failed to insert account");
      }

      const serializedAccount =
        accountValue.providerInfo.type === "oauth"
          ? {
              ...accountValue,
              providerInfo: {
                ...accountValue.providerInfo,
                accessTokenExpiresAt: accountValue.providerInfo
                  .accessTokenExpiresAt
                  ? new Date(accountValue.providerInfo.accessTokenExpiresAt)
                  : null,
                refreshTokenExpiresAt: accountValue.providerInfo
                  .refreshTokenExpiresAt
                  ? new Date(accountValue.providerInfo.refreshTokenExpiresAt)
                  : null,
              },
            }
          : { ...accountValue, providerInfo: accountValue.providerInfo };

      return { ...serializedAccount, user: userValue };
    }),
  );

  return result;
}
