// app/api/blog/[id]/route.ts

import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { BlogPost } from "../../../../types/blog-post";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const postId = params.id;

    if (!postId) {
      return NextResponse.json(
        { error: "Post ID is required" },
        { status: 400 }
      );
    }

    const parsedId = parseInt(postId, 10);

    if (isNaN(parsedId)) {
      return NextResponse.json({ error: "Invalid Post ID" }, { status: 400 });
    }

    const { rows } = await sql<Omit<BlogPost, "createdAt"> & { createdAt: string }>`
      SELECT id, title, content, tags, created_at as "createdAt"
      FROM blog_posts 
      WHERE id = ${parsedId} 
      LIMIT 1
    `;

    if (rows.length === 0) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Process the raw database row into the correct BlogPost format
    const post: BlogPost = {
      ...rows[0],
      tags: rows[0].tags || [],
      createdAt: new Date(rows[0].createdAt)
    };

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return NextResponse.json(
      { error: "Internal server error", details: (error as Error).message },
      { status: 500 }
    );
  }
}