import { Schema } from "effect";

const EnvSchema = Schema.Struct({
  NODE_ENV: Schema.Literal("production", "development", "test", "preview"),
  NEXT_PUBLIC_POSTHOG_KEY: Schema.String,
  NEXT_PUBLIC_POSTHOG_UI_HOST: Schema.String,
});
type EnvSchema = typeof EnvSchema.Type;
type AddUndefined<T> = {
  [P in keyof T]: (T[P] extends string ? string : T[P]) | undefined;
};

export const env = Schema.decodeUnknownSync(EnvSchema)({
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
  NEXT_PUBLIC_POSTHOG_UI_HOST: process.env.NEXT_PUBLIC_POSTHOG_UI_HOST,
} satisfies AddUndefined<EnvSchema>);
