import type { Db } from "@galleo/db";
import { insertSession } from "@galleo/db/mutations/insert-session";
import { generateRandomId } from "../crypto/random";
import { getConnInfo, getHeaders } from "../hono";

export async function setUpSession({ db, userId }: { db: Db; userId: string }) {
  const newSession = await insertSession({
    db,
    newSession: {
      id: generateRandomId(),
      userId,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
      token: generateRandomId(),
      ipAddress: getConnInfo(),
      userAgent: getHeaders().get("user-agent"),
    },
  });
  return newSession;
}
