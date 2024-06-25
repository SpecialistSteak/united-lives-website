// app/api/gallery/route.ts

import { list } from "@vercel/blob";
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest): Promise<NextResponse> {
  const searchParams = request.nextUrl.searchParams;
  const limit = parseInt(searchParams.get('limit') ?? '10');
  const cursor = searchParams.get('cursor') ?? undefined;

  try {
    const result = await list({ limit, cursor });
    
    return NextResponse.json({
      blobs: result.blobs,
      cursor: result.cursor,
      hasMore: result.hasMore
    });
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    return NextResponse.json({ error: 'Failed to fetch gallery images' }, { status: 500 });
  }
}