import { drizzle } from "drizzle-orm/libsql";
import * as account from "./schema/account";
import * as session from "./schema/session";
import * as user from "./schema/user";

const sqliteSchema = {
  ...account,
  ...session,
  ...user,
};

export const createDb = ({
  tursoDbUrl,
  tursoDbAuthToken,
}: {
  tursoDbUrl: string;
  tursoDbAuthToken: string;
}) =>
  drizzle({
    connection: {
      url: tursoDbUrl,
      authToken: tursoDbAuthToken,
    },
    schema: sqliteSchema,
    casing: "snake_case",
  });
export type Db = ReturnType<typeof createDb>;
