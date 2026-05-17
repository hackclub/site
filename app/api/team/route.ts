import { NextResponse } from "next/server";
import teamMembers from "../../../public/team.json";

export async function GET() {
  return NextResponse.json(teamMembers);
}
