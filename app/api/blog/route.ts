// app/api/blog/route.ts

import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const offset = (page - 1) * limit;

  try {
    const { rows } = await sql`
      SELECT * FROM blog_posts 
      ORDER BY created_at DESC 
      LIMIT ${limit} OFFSET ${offset}
    `;
    console.log(
      `Retrieved ${rows.length} blog posts from the database (page ${page}, limit ${limit})`
    );
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}
