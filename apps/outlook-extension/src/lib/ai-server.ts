import { hc } from "hono/client";
import type { AiServerType } from "../../../ai-server/src/routes";

export const aiServer = hc<AiServerType>("http://localhost:6922/", {
  init: {
    credentials: "include",
  },
});
