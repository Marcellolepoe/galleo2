import * as v from "valibot";

const EnvSchema = v.object({
  NODE_ENV: v.union([v.literal("development"), v.literal("production")]),
  PRODUCTION_URL: v.string(),
  MICROSOFT_CLIENT_ID: v.string(),
  MICROSOFT_CLIENT_SECRET: v.string(),
  TURSO_DATABASE_URL: v.string(),
  TURSO_AUTH_TOKEN: v.string(),
  ENCRYPTION_KEY: v.string(),
});
export type EnvSchema = v.InferOutput<typeof EnvSchema>;
export function parseEnv(env: Record<string, unknown> & object) {
  return v.parse(EnvSchema, env);
}
