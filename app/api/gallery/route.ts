import { list } from "@vercel/blob";
import { NextResponse } from 'next/server';

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit') ?? '10');
  const cursor = searchParams.get('cursor') ?? '';

  const result = await list({
    limit,
    cursor,
  });
  
  return NextResponse.json(result);
}
