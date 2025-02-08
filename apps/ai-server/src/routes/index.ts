import { type Db, createDb } from "@galleo/db";
import { Hono } from "hono";
import { contextStorage } from "hono/context-storage";
import { cors } from "hono/cors";
import type { EnvSchema } from "../lib/env";
import { getEnv } from "../lib/hono";
import { authRouter } from "./auth";
import { chatRouter } from "./chat";
import { sessionRouter } from "./session";

const app = new Hono<{
  Variables: {
    db: Db;
  };
  Bindings: EnvSchema;
}>()
  .use(contextStorage())
  .use(async (c, next) => {
    c.set(
      "db",
      createDb({
        tursoDbUrl: c.env.TURSO_DATABASE_URL,
        tursoDbAuthToken: c.env.TURSO_AUTH_TOKEN,
      }),
    );
    await next();
  })
  .use(
    cors({
      origin: (origin) => {
        const env = getEnv();
        if (env.NODE_ENV === "development") {
          return origin;
        }
        return env.PRODUCTION_URL;
      },
      allowHeaders: ["Content-Type", "Authorization", "Cookie"],
      allowMethods: ["POST", "GET", "OPTIONS"],
      exposeHeaders: ["Set-Cookie", "X-Session-Token"],
      maxAge: 600,
      credentials: true,
    }),
  )
  .route("/", authRouter)
  .route("/", sessionRouter)
  .route("/api/chat", chatRouter);

export default app;
export type AiServerType = typeof app;
