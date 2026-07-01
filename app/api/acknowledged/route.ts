import { NextResponse } from "next/server";
import acknowledgedMembers from "../../../public/acknowledged.json";

export async function GET() {
  return NextResponse.json(acknowledgedMembers);
}
