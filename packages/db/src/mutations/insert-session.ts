import { err, ok, safe } from "@galleo/result";
import type { Db } from "../client";
import { type InsertSession, sessionTable } from "../schema/session";

export async function insertSession({
  db,
  newSession,
}: { db: Db; newSession: InsertSession }) {
  const sessionValues = await safe(() =>
    db.insert(sessionTable).values(newSession).returning(),
  );

  if (!sessionValues.success) {
    return sessionValues;
  }

  const session = sessionValues.data[0];
  if (!session) {
    return err(new Error("DB: Failed to insert session"));
  }

  return ok(session);
}
