import { ok, safe } from "@galleo/result";
import { and, eq, gt, isNull } from "drizzle-orm";
import type { Db } from "../client";
import { sessionTable } from "../schema/session";

export async function getSessionWithAccountAndUser({
  db,
  sessionId,
}: { db: Db; sessionId: string }) {
  const result = await safe(() =>
    db.query.sessionTable.findFirst({
      where: and(
        eq(sessionTable.token, sessionId),
        isNull(sessionTable.deletedAt),
        gt(sessionTable.expiresAt, new Date()),
      ),
      with: {
        user: {
          with: {
            accounts: true,
          },
        },
      },
    }),
  );

  if (!result.success) {
    return result;
  }
  return ok(result.data ?? null);
}
