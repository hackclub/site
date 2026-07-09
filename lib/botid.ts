import { checkBotId } from "botid/server";
import { NextResponse } from "next/server";
import type { BotIdProtectedRoute } from "./botid-protected-routes";

type BotIdCheckLevel = NonNullable<BotIdProtectedRoute["advancedOptions"]>["checkLevel"];

export async function blockBotRequest(checkLevel: BotIdCheckLevel = "basic") {
  const verification = await checkBotId({
    advancedOptions: { checkLevel },
  });

  if (!verification.isBot) return null;

  return NextResponse.json({ error: "Unable to verify request" }, { status: 403 });
}
