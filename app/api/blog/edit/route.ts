// app/api/blog/edit/route.ts

import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = (page - 1) * limit;

    const countResult = await pool.query("SELECT COUNT(*) FROM blog_posts");
    const total = parseInt(countResult.rows[0].count);

    const result = await pool.query(
      "SELECT id, title, tags FROM blog_posts ORDER BY created_at DESC LIMIT $1 OFFSET $2",
      [limit, offset]
    );

    return NextResponse.json({ posts: result.rows, total });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching blog posts" },
      { status: 500 }
    );
  }
}
