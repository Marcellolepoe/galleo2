import { Hono } from "hono";
import { contextStorage } from "hono/context-storage";
import { cors } from "hono/cors";
import type { EnvSchema } from "../lib/env";
import { getEnv } from "../lib/hono";
import { authRouter } from "./auth";

interface User {
  id: string;
  email: string;
  name: string;
  image?: string;
}

interface Session {
  id: string;
  userId: string;
  expiresAt: Date;
}

const app = new Hono<{
  Variables: {
    user: User | null;
    session: Session | null;
  };
  Bindings: EnvSchema;
}>()
  .use(contextStorage())
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
  .route("/", authRouter);

export default app;
export type AiServerType = typeof app;
