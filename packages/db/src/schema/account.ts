import { relations, sql } from "drizzle-orm";
import { integer, text } from "drizzle-orm/sqlite-core";
import { sqliteAppTable } from "./_table";
import { type SelectUser, userTable } from "./user";

export interface AccountProviderInfoOauthRaw {
  type: "oauth";
  accessToken: string;
  refreshToken: string | null;
  accessTokenExpiresAt: number | null;
  refreshTokenExpiresAt: number | null;
  idToken: string | null;
  scope: string[];
  email: string;
  emailVerified: boolean;
}
export type AccountProviderInfoOauth = Omit<
  AccountProviderInfoOauthRaw,
  "accessTokenExpiresAt" | "refreshTokenExpiresAt"
> & {
  accessTokenExpiresAt: Date | null;
  refreshTokenExpiresAt: Date | null;
};

export interface AccountProviderInfoPassword {
  type: "password";
  password: string;
  email: string;
  emailVerified: boolean;
}
type AccountProviderInfoRaw =
  | AccountProviderInfoOauthRaw
  | AccountProviderInfoPassword;
export type AccountProviderInfo =
  | AccountProviderInfoOauth
  | AccountProviderInfoPassword;

export const accountTable = sqliteAppTable(
  "account",
  {
    id: text("account_id").primaryKey().notNull(),
    userId: text()
      .notNull()
      .references(() => userTable.id),
    provider: text().notNull(),
    providerInfo: text({ mode: "json" })
      .notNull()
      .$type<AccountProviderInfoRaw>(),
    email: text("email").generatedAlwaysAs(
      () => sql`json_extract(provider_info, '$.email')`,
    ),
    emailVerified: integer("email_verified").generatedAlwaysAs(
      () =>
        sql`IIF(json_extract(provider_info, '$.emailVerified') = true, 1, 0)`,
    ),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date()),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .notNull()
      .$onUpdateFn(() => new Date()),
    deletedAt: integer("deleted_at", { mode: "timestamp" }),
  },
  (_table) => {
    return [
      //   index("account_email_idx").on(table.email),
      //   index("account_email_verified_idx").on(table.emailVerified),
    ];
  },
);
export type SelectAccount = Omit<
  typeof accountTable.$inferSelect,
  "providerInfo"
> & {
  providerInfo: AccountProviderInfo;
};
export type SelectAccountWithUser = SelectAccount & {
  user: SelectUser;
};
export type InsertAccount = typeof accountTable.$inferInsert;

export const accountRelations = relations(accountTable, ({ one }) => ({
  user: one(userTable, {
    fields: [accountTable.userId],
    references: [userTable.id],
  }),
}));
