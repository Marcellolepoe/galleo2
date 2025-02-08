import { hc } from "hono/client";
import type { AiServerType } from "../../../ai-server/src/routes";

export const aiServer = hc<AiServerType>("http://localhost:6922/", {
  init: {
    credentials: "include",
  },
});

export const getSession = async () => {
  const sessionResp = await aiServer.session.$get();
  if (!sessionResp?.ok) {
    return null;
  }
  const result = await sessionResp.json();
  return result;
};

export interface UserSession {
  name: string;
  image: string | null;
}
