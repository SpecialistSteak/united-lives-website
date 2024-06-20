import { list } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const cursor = searchParams.get("cursor") ?? "";
  const result = await list({
    limit: 1,
    cursor,
  });
  return NextResponse.json(result);
}
