import { initBotId } from "botid/client/core";
import { botIdProtectedRoutes } from "@/lib/botid-protected-routes";

initBotId({
  protect: botIdProtectedRoutes,
});
