import { sql } from "@vercel/postgres";

import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse> {
  const { rows } = await sql`SELECT * FROM blog_posts ORDER BY created_at DESC`;
  return NextResponse.json(rows);
}
