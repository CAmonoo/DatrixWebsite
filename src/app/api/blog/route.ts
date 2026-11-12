import { NextResponse } from "next/server";
import { db } from "@/lib/db";
export const dynamic = "force-dynamic";
export async function GET() {
  try {
    const posts = await db.post.findMany({ where: { status: "published" }, orderBy: { publishedAt: "desc" } });
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Public blog fetch failed:", error);
    return NextResponse.json([]);
  }
}
