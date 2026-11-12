import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!process.env.BLOB_READ_WRITE_TOKEN) return NextResponse.json({ error: "Image storage is not configured. Add BLOB_READ_WRITE_TOKEN in Vercel." }, { status: 503 });
  try {
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) return NextResponse.json({ error: "Choose an image to upload." }, { status: 400 });
    if (!["image/jpeg", "image/png", "image/webp", "image/avif"].includes(file.type)) return NextResponse.json({ error: "Use a JPG, PNG, WEBP or AVIF image." }, { status: 400 });
    if (file.size > 5 * 1024 * 1024) return NextResponse.json({ error: "Images must be 5 MB or smaller." }, { status: 400 });
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-").slice(-100) || "article-image";
    const blob = await put(`blogs/${Date.now()}-${safeName}`, file, { access: "public", addRandomSuffix: true });
    return NextResponse.json({ url: blob.url });
  } catch (error) {
    console.error("Image upload failed:", error);
    return NextResponse.json({ error: "Image upload failed. Please try again." }, { status: 500 });
  }
}
