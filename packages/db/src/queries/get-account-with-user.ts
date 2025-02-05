import { type Result, err, ok, safe } from "@galleo/result";
import { eq } from "drizzle-orm";
import type { Db } from "../client";
import { type SelectAccountWithUser, accountTable } from "../schema/account";

export async function getAccountWithUser({
  db,
  accountId,
}: { db: Db; accountId: string }): Promise<
  Result<SelectAccountWithUser | null>
> {
  const result = await safe(() =>
    db.query.accountTable.findFirst({
      where: eq(accountTable.id, accountId),
      with: {
        user: true,
      },
    }),
  );

  if (!result.success) {
    return result;
  }

  if (!result.data) {
    return ok(null);
  }

  if (result.data.user) {
    return err(
      new Error(`DB: Missing user for given account_id ${result.data.id}`),
    );
  }

  if (result.data.providerInfo.type === "oauth") {
    return ok({
      ...result.data,
      providerInfo: {
        ...result.data.providerInfo,

        accessTokenExpiresAt: result.data.providerInfo.accessTokenExpiresAt
          ? new Date(result.data.providerInfo.accessTokenExpiresAt)
          : null,
        refreshTokenExpiresAt: result.data.providerInfo.refreshTokenExpiresAt
          ? new Date(result.data.providerInfo.refreshTokenExpiresAt)
          : null,
      },
    });
  }
  return ok({
    ...result.data,
    providerInfo: result.data.providerInfo,
  });
}
