import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { MAX_ARTICLE_CONTENT_LENGTH } from "@/lib/admin-content-limits";

export const runtime = "nodejs";
type Context = { params: Promise<{ id: string }> };
function clean(value: unknown, max: number) { return typeof value === "string" ? value.trim().slice(0, max) : ""; }

export async function PUT(request: NextRequest, context: Context) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await context.params;
  try {
    const body = await request.json();
    if (typeof body.content === "string" && body.content.length > MAX_ARTICLE_CONTENT_LENGTH) {
      return NextResponse.json({ error: `Article content cannot exceed ${MAX_ARTICLE_CONTENT_LENGTH.toLocaleString()} characters.` }, { status: 400 });
    }
    const title = clean(body.title, 180), excerpt = clean(body.excerpt, 320);
    const content = clean(body.content, MAX_ARTICLE_CONTENT_LENGTH), category = clean(body.category, 80);
    const status = body.status === "published" ? "published" : "draft";
    const tags = Array.isArray(body.tags) ? body.tags.map((t: unknown) => clean(t, 32)).filter(Boolean).slice(0, 12) : [];
    if (title.length < 3 || !excerpt || !content || !category) return NextResponse.json({ error: "Title, excerpt, content and category are required." }, { status: 400 });
    const current = await db.post.findUnique({ where: { id } });
    if (!current) return NextResponse.json({ error: "Article not found." }, { status: 404 });
    const updated = await db.post.update({ where: { id }, data: {
      title, excerpt, content, category, tags,
      featuredImage: clean(body.featuredImage, 1500) || null,
      status, publishedAt: status === "published" ? (current.publishedAt || new Date()) : null,
    }});
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Update post failed:", error);
    return NextResponse.json({ error: "Could not update article." }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, context: Context) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await context.params;
  try {
    await db.post.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Could not delete article." }, { status: 404 });
  }
}
