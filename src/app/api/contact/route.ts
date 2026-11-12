import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const DEFAULT_CONTACT_EMAIL = "info@datrixtechsolutions.com";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[\d\s().-]{7,20}$/;
const RESEND_API_URL = "https://api.resend.com/emails";

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    };
    return entities[character];
  });
}

async function sendEmail(payload: Record<string, unknown>, apiKey: string) {
  const response = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(12_000),
    cache: "no-store",
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    console.error("Resend delivery failed:", response.status, result);
    throw new Error("Email delivery failed");
  }
  return result;
}

export async function POST(req: NextRequest) {
  const contentLength = Number(req.headers.get("content-length") ?? 0);
  if (contentLength > 16_000) {
    return NextResponse.json({ ok: false, error: "Request too large" }, { status: 413 });
  }

  let body: { name?: string; email?: string; mobile?: string; notes?: string; website?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  // Quietly discard automated submissions that fill the hidden honeypot field.
  if (typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json({ ok: true });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const mobile = typeof body.mobile === "string" ? body.mobile.trim() : "";
  const phoneDigits = mobile.replace(/\D/g, "");
  const notes = typeof body.notes === "string" ? body.notes.trim() : "";

  if (name.length < 2 || name.length > 100) {
    return NextResponse.json({ ok: false, error: "Please enter a name between 2 and 100 characters." }, { status: 400 });
  }
  if (email.length > 254 || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 400 });
  }
  if (!mobile || mobile.length > 20 || phoneDigits.length < 7 || phoneDigits.length > 15 || !PHONE_RE.test(mobile)) {
    return NextResponse.json({ ok: false, error: "Please enter a valid contact number." }, { status: 400 });
  }
  if (notes.length > 5_000) {
    return NextResponse.json({ ok: false, error: "Your message is too long." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL || DEFAULT_CONTACT_EMAIL;
  if (!apiKey || !from) {
    console.error("Contact form configuration missing RESEND_API_KEY or RESEND_FROM_EMAIL.");
    return NextResponse.json(
      { ok: false, error: "The contact form is temporarily unavailable. Please email us directly." },
      { status: 503 }
    );
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMobile = escapeHtml(mobile || "Not provided");
  const safeNotes = escapeHtml(notes || "No message provided").replace(/\r?\n/g, "<br />");

  try {
    await sendEmail({
      from,
      to: [to],
      reply_to: email,
      subject: `New website enquiry from ${name.replace(/[\r\n]/g, " ")}`,
      text: ["New enquiry from the Datrix website", `Name: ${name}`, `Email: ${email}`, `Phone: ${mobile || "Not provided"}`, "", "Message:", notes || "No message provided"].join("\n"),
      html: `<div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;color:#172033;line-height:1.6"><h2>New website enquiry</h2><table style="width:100%;border-collapse:collapse"><tr><td style="padding:10px;border-bottom:1px solid #e5e7eb;font-weight:bold">Name</td><td style="padding:10px;border-bottom:1px solid #e5e7eb">${safeName}</td></tr><tr><td style="padding:10px;border-bottom:1px solid #e5e7eb;font-weight:bold">Email</td><td style="padding:10px;border-bottom:1px solid #e5e7eb">${safeEmail}</td></tr><tr><td style="padding:10px;border-bottom:1px solid #e5e7eb;font-weight:bold">Phone</td><td style="padding:10px;border-bottom:1px solid #e5e7eb">${safeMobile}</td></tr></table><h3>Message</h3><p>${safeNotes}</p></div>`,
    }, apiKey);
  } catch {
    return NextResponse.json(
      { ok: false, error: "We couldn't send your message right now. Please try again or email us directly." },
      { status: 502 }
    );
  }

  // A visitor acknowledgement is helpful, but the business notification above
  // is the critical delivery and must not be duplicated if this email fails.
  let confirmationSent = false;
  try {
    await sendEmail({
      from,
      to: [email],
      subject: "We received your message | Datrix Tech Solutions",
      text: `Hello ${name},\n\nThank you for contacting Datrix Tech Solutions. We have received your message and our team will get back to you within one business day.\n\nRegards,\nDatrix Tech Solutions`,
      html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#172033;line-height:1.7"><h2>Thank you for contacting Datrix.</h2><p>Hello ${safeName},</p><p>We've received your message and our team will get back to you within one business day.</p><p>Regards,<br /><strong>Datrix Tech Solutions</strong></p><p><a href="mailto:${escapeHtml(to)}">${escapeHtml(to)}</a></p></div>`,
    }, apiKey);
    confirmationSent = true;
  } catch (error) {
    console.error("Visitor confirmation email failed:", error);
  }

  return NextResponse.json({ ok: true, confirmationSent });
}
