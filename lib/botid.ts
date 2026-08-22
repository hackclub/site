import { checkBotId } from "botid/server";
import type { BotIdProtectedRoute } from "./botid-protected-routes";
import { apiError } from "./api-error";

type BotIdCheckLevel = NonNullable<BotIdProtectedRoute["advancedOptions"]>["checkLevel"];

export async function blockBotRequest(checkLevel: BotIdCheckLevel = "basic") {
  const verification = await checkBotId({
    advancedOptions: { checkLevel },
  });

  if (!verification.isBot) return null;

  return apiError({
    status: 403,
    code: "forbidden",
    message: "Unable to verify request",
    hint: "This request looked automated. Human traffic only on this endpoint.",
  });
}
