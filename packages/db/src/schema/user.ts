import { relations } from "drizzle-orm";
import { integer, text } from "drizzle-orm/sqlite-core";
import { sqliteAppTable } from "./_table";
import { accountTable } from "./account";
import { sessionTable } from "./session";

export const userTable = sqliteAppTable("user", {
  id: text("user_id").primaryKey().notNull(),
  name: text().notNull(),
  image: text(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$onUpdateFn(() => new Date()),
  deletedAt: integer("deleted_at", { mode: "timestamp" }),
});

export type SelectUser = typeof userTable.$inferSelect;
export type InsertUser = typeof userTable.$inferInsert;

export const userRelations = relations(userTable, ({ many }) => ({
  sessions: many(sessionTable),
  accounts: many(accountTable),
}));
