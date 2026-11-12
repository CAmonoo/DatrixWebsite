import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}
function slugify(value: string) {
  return value.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 90);
}

export async function GET() {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const posts = await db.post.findMany({ orderBy: { updatedAt: "desc" } });
  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await request.json();
    const title = clean(body.title, 180);
    const excerpt = clean(body.excerpt, 320);
    const content = clean(body.content, 50000);
    const category = clean(body.category, 80);
    const status = body.status === "published" ? "published" : "draft";
    const tags = Array.isArray(body.tags) ? body.tags.map((t: unknown) => clean(t, 32)).filter(Boolean).slice(0, 12) : [];
    const featuredImage = clean(body.featuredImage, 1500) || null;
    if (title.length < 3 || !excerpt || !content || !category) {
      return NextResponse.json({ error: "Title, excerpt, article content and category are required." }, { status: 400 });
    }
    const base = slugify(clean(body.slug, 100) || title);
    if (!base) return NextResponse.json({ error: "Please provide a valid article title or URL slug." }, { status: 400 });
    let slug = base;
    let n = 2;
    while (await db.post.findUnique({ where: { slug } })) slug = `${base}-${n++}`;
    const post = await db.post.create({
      data: { title, slug, excerpt, content, category, tags, featuredImage, status,
        publishedAt: status === "published" ? new Date() : null },
    });
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Create post failed:", error);
    return NextResponse.json({ error: "Could not save article. Check that the Neon database is connected and migrated." }, { status: 500 });
  }
}
