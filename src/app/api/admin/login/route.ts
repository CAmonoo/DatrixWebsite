import { NextRequest, NextResponse } from "next/server";
import { createAdminSession, validAdminPassword } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const password = typeof body.password === "string" ? body.password : "";
    if (!validAdminPassword(password)) {
      return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
    }
    await createAdminSession();
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Admin login configuration error:", error);
    return NextResponse.json({ error: "Admin login is not configured correctly. Check Vercel environment variables." }, { status: 503 });
  }
}
