import { NextResponse } from "next/server";
import acknowledgedMembers from "../../../public/acknowledged.json";
import { deprecationHeaders } from "@/lib/api-v1";

export async function GET() {
  return NextResponse.json(acknowledgedMembers, { headers: deprecationHeaders(null) });
}
