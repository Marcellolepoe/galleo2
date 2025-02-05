import { ok, safe } from "@galleo/result";
import { eq } from "drizzle-orm";
import type { Db } from "../client";
import { sessionTable } from "../schema/session";

export async function getSession({
  db,
  sessionId,
}: { db: Db; sessionId: string }) {
  const result = await safe(() =>
    db.query.sessionTable.findFirst({
      where: eq(sessionTable.id, sessionId),
    }),
  );

  if (!result.success) {
    return result;
  }

  return ok(result.data ?? null);
}
