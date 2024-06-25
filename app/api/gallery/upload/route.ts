import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

const CORRECT_PASSWORD = process.env.ADMIN_PASSWORD || "default_password";

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");

  // Parse the FormData
  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const password = formData.get("password") as string | null;

  // Check password
  if (password !== CORRECT_PASSWORD) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 403 });
  }

  // Check if file exists
  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  try {
    const blob = await put(filename ?? "", file, {
      access: "public",
    });

    return NextResponse.json(blob);
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: "File upload failed" }, { status: 500 });
  }
}
