import { relations } from "drizzle-orm";
import { integer, text } from "drizzle-orm/sqlite-core";
import { sqliteAppTable } from "./_table";
import { userTable } from "./user";

export const sessionTable = sqliteAppTable("session", {
  id: text("session_id").primaryKey().notNull(),
  token: text().notNull(),
  ipAddress: text(),
  userAgent: text(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  userId: text()
    .notNull()
    .references(() => userTable.id),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$onUpdateFn(() => new Date()),
  deletedAt: integer("deleted_at", { mode: "timestamp" }),
});
export type SelectSession = typeof sessionTable.$inferSelect;
export type InsertSession = typeof sessionTable.$inferInsert;

export const sessionRelations = relations(sessionTable, ({ one }) => ({
  user: one(userTable, {
    fields: [sessionTable.userId],
    references: [userTable.id],
  }),
}));
