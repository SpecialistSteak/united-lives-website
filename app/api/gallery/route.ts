import { list, ListBlobResult } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

const ITEMS_PER_PAGE = 10;

export async function GET(request: NextRequest): Promise<NextResponse> {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") ?? "1");

  try {
    let allBlobs: ListBlobResult["blobs"] = [];
    let cursor: string | undefined;

    // Fetch all blobs, keeping cursor in the route file rather than in the client to avoid issues
    do {
      const result: ListBlobResult = await list({ limit: 100, cursor });
      allBlobs = [...allBlobs, ...result.blobs];
      cursor = result.cursor;
    } while (cursor);

    // Sort blobs by uploadedAt in descending order
    allBlobs.sort(
      (a, b) =>
        new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    );

    // Calculate start and end indices for the requested page
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    // Get the blobs for the requested page
    const pageBlobs = allBlobs.slice(startIndex, endIndex);

    return NextResponse.json({
      blobs: pageBlobs,
      currentPage: page,
      totalPages: Math.ceil(allBlobs.length / ITEMS_PER_PAGE),
    });
  } catch (error) {
    console.error("Error fetching gallery images:", error);
    return NextResponse.json(
      { error: "Failed to fetch gallery images" },
      { status: 500 }
    );
  }
}
