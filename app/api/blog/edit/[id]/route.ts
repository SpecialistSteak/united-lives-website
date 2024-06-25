// app/api/blog/edit/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "default_password";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const result = await pool.query(
      "SELECT title, content, tags FROM blog_posts WHERE id = $1",
      [params.id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching the blog post" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { title, content, tags, password } = await req.json();

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 401 }
      );
    }

    const result = await pool.query(
      "UPDATE blog_posts SET title = $1, content = $2, tags = $3 WHERE id = $4 RETURNING id",
      [title, content, tags, params.id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Blog post updated successfully",
      id: result.rows[0].id,
    });
  } catch (error) {
    console.error("Error updating blog post:", error);
    return NextResponse.json(
      { message: "An error occurred while updating the blog post" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { password } = await req.json();

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 401 }
      );
    }

    const result = await pool.query(
      "DELETE FROM blog_posts WHERE id = $1 RETURNING id",
      [params.id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Blog post deleted successfully",
      id: result.rows[0].id,
    });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return NextResponse.json(
      { message: "An error occurred while deleting the blog post" },
      { status: 500 }
    );
  }
}
