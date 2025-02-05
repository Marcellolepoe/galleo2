import { getSessionWithAccountAndUser } from "@galleo/db/queries/get-session-with-account-and-user";
import { Hono } from "hono";
import { getCookie, getDb } from "../lib/hono";
import { OAUTH_COOKIE_SESSION_NAME } from "../lib/oauth/constant";

export const sessionRouter = new Hono()
  .basePath("/session")
  .get("/", async (c) => {
    const sessionToken = getCookie(OAUTH_COOKIE_SESSION_NAME);

    if (!sessionToken) {
      return c.json(
        {
          error: "unauthorized",
          error_description: "No session token found.",
        },
        401,
      );
    }

    const sessionResult = await getSessionWithAccountAndUser({
      db: getDb(),
      sessionId: sessionToken,
    });

    if (!sessionResult.success) {
      return c.json(
        {
          error: "internal_server_error",
          error_description: "Failed to validate session.",
        },
        500,
      );
    }

    const session = sessionResult.data;
    if (!session) {
      return c.json(
        {
          error: "unauthorized",
          error_description: "Invalid or expired session.",
        },
        401,
      );
    }

    return c.json({
      id: session.user.id,
      name: session.user.name,
      image: session.user.image,
      accounts: session.user.accounts.map((account) => {
        return {
          ...account,
          providerInfo: undefined,
        };
      }),
    });
  });
