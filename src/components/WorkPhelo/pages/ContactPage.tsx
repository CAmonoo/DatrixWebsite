"use client";

import React, { useState } from "react";
import ParticleField from "../ParticleField";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CONTACT_EMAIL = "info@datrixtechsolutions.com";

type SendStatus = "idle" | "sending" | "success" | "error";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [notes, setNotes] = useState("");
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<SendStatus>("idle");
  const [successMsg, setSuccessMsg] = useState("");

  const buildMailto = () => {
    const payload = {
      name: name.trim() || "Website visitor",
      email: email.trim(),
      mobile: mobile.trim(),
      notes: notes.trim(),
    };
    const subject = encodeURIComponent(`Website Enquiry — ${payload.name}`);
    const body = encodeURIComponent(
      `Name: ${payload.name}\nEmail: ${payload.email}\nMobile: ${payload.mobile}\n\n${payload.notes}`
    );
    return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (name.trim().length < 2 || name.trim().length > 100)
      errs.first_name = "Please enter your name (2–100 characters)";
    const phoneDigits = mobile.replace(/\D/g, "");
    if (!mobile.trim() || phoneDigits.length < 7 || phoneDigits.length > 15 || !/^\+?[\d\s().-]{7,20}$/.test(mobile.trim()))
      errs.mobile = "Please provide a valid contact number";
    if (!(email.trim() && EMAIL_RE.test(email)))
      errs.email = "Please supply a valid email address";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const payload = {
      name: name.trim(),
      email: email.trim(),
      mobile: mobile.trim(),
      notes: notes.trim(),
      website,
    };

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json().catch(() => null);
      if (!res.ok || !result?.ok) throw new Error(result?.error || "Unable to send");
      setSuccessMsg(
        "Thanks for getting in touch. Your message has been sent to our inbox. We’ll get back to you within one business day."
      );
      setStatus("success");
      setName("");
      setEmail("");
      setMobile("");
      setNotes("");
      setWebsite("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="wrapper">
      <style
        dangerouslySetInnerHTML={{
          __html: `.our-products,.home-footer{display: none;}`,
        }}
      />
      <section className="contactSection sectionPadding contactApple contact-vibe-background vibe-hero vibe-hero--navy">
        <ParticleField interactive />
        <div className="container">
          <div className="ca-head">
            <h1>Get in Touch</h1>
            <p className="ca-sub">
              Tell us about your business, and we’ll respond within one business day.
            </p>
          </div>

          <div className="ca-form">
            <div className="contact-form-container">
              <form
                id="contactForm"
                name="contactForm"
                role="form"
                onSubmit={submit}
                noValidate
              >
                <input type="hidden" name="type" value="contact" />
                <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
                  <label htmlFor="website">Leave this field empty</label>
                  <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <input
                        type="text"
                        name="first_name"
                        id="first_name"
                        className="form-control form-default"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      {errors.first_name ? (
                        <label className="error" htmlFor="first_name">
                          {errors.first_name}
                        </label>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="form-control form-default"
                        placeholder="Your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {errors.email ? (
                        <label className="error" htmlFor="email">
                          {errors.email}
                        </label>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <input
                        type="text"
                        name="mobile"
                        id="contact"
                        className="form-control form-default"
                        placeholder="Your contact number (include country code if applicable)"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                      />
                      {errors.mobile ? (
                        <label className="error" htmlFor="contact">
                          {errors.mobile}
                        </label>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <textarea
                        className="form-control form-default"
                        placeholder="Message"
                        name="notes"
                        id="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <input
                  type="submit"
                  value={status === "sending" ? "Sending…" : "Submit"}
                  name="submit"
                  className="request-btn big"
                  disabled={status === "sending"}
                />
              </form>

              <div
                id="contactSuccess"
                className="contact-submit"
                style={{ display: status === "success" ? "block" : "none" }}
              >
                {successMsg}
              </div>

              <div
                id="contactFailure"
                className="contact-submit contact-failure"
                style={{ display: status === "error" ? "block" : "none" }}
              >
                We couldn’t send your message just now. Please try again or send it straight
                from your mail app instead:{" "}
                <a href={buildMailto()}>email {CONTACT_EMAIL}</a>
              </div>
            </div>
          </div>

          <p className="ca-mail">
            Prefer email? Write to us directly at{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </p>
        </div>
      </section>
    </div>
  );
}
