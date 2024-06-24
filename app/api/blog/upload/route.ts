// app/api/blog/upload/route.ts

import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'default_password';

export async function POST(req: Request) {
  try {
    const { title, content, tags, password } = await req.json();

    // Check password
    if (ADMIN_PASSWORD !== password) {
      return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
    }

    // Convert tags string to an array
    const tagsArray = tags.split(',').map((tag: string) => tag.trim());

    const result = await pool.query(
      'INSERT INTO blog_posts (title, content, tags) VALUES ($1, $2, $3) RETURNING id',
      [title, content, tagsArray]
    );

    const newPostId = result.rows[0].id;

    return NextResponse.json({ message: 'Blog post created successfully', id: newPostId }, { status: 201 });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json({ message: 'An error occurred while creating the blog post' }, { status: 500 });
  }
}