"use client";
import { useEffect, useMemo, useState } from "react";
import CustomCursor from "@/components/WorkPhelo/CustomCursor";
import { MAX_ARTICLE_CONTENT_LENGTH } from "@/lib/admin-content-limits";
import { Eye, EyeOff } from "lucide-react";

type Post = { id: string; slug: string; title: string; excerpt: string; content: string; category: string; tags: string[]; featuredImage: string | null; status: string; updatedAt: string };
const blank = { title: "", slug: "", excerpt: "", content: "", category: "Business Technology", tags: "", featuredImage: "", status: "draft" };

export default function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [form, setForm] = useState(blank);
  const [editing, setEditing] = useState<string | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [listStatus, setListStatus] = useState<"published" | "draft">("published");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [query, setQuery] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    if (!previewOpen) return;
    function closeOnEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setPreviewOpen(false);
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [previewOpen]);

  async function load() {
    const session = await fetch("/api/admin/session", { cache: "no-store" }).then(r => r.json());
    setAuthenticated(session.authenticated);
    if (session.authenticated) {
      const result = await fetch("/api/admin/posts", { cache: "no-store" });
      if (result.ok) setPosts(await result.json());
    }
    setChecking(false);
  }
  useEffect(() => { load().catch(() => setChecking(false)); }, []);

  async function login(e: React.FormEvent) {
    e.preventDefault(); setBusy(true); setNotice("");
    const res = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
    const data = await res.json();
    setBusy(false);
    if (!res.ok) { setNotice(data.error || "Login failed."); return; }
    setPassword(""); await load();
  }
  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" }); setAuthenticated(false); setPosts([]);
  }
  function edit(post: Post) {
    setEditing(post.id);
    setEditorOpen(true);
    setListStatus(post.status === "published" ? "published" : "draft");
    setForm({ title: post.title, slug: post.slug, excerpt: post.excerpt, content: post.content, category: post.category, tags: post.tags.join(", "), featuredImage: post.featuredImage || "", status: post.status });
    setNotice(""); window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function fresh() { setEditing(null); setForm(blank); setNotice(""); }
  function startNewArticle() { fresh(); setEditorOpen(true); }
  function closeEditor() { fresh(); setEditorOpen(false); }
  async function upload(file?: File) {
    if (!file) return;
    setBusy(true); setNotice("Uploading image…");
    const data = new FormData(); data.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: data });
    const result = await res.json(); setBusy(false);
    if (!res.ok) { setNotice(result.error || "Upload failed."); return; }
    setForm(f => ({ ...f, featuredImage: result.url })); setNotice("Featured image uploaded.");
  }
  async function save(e: React.FormEvent) {
    e.preventDefault(); setBusy(true); setNotice("");
    const payload = { ...form, tags: form.tags.split(",").map(t => t.trim()).filter(Boolean) };
    const res = await fetch(editing ? `/api/admin/posts/${editing}` : "/api/admin/posts", {
      method: editing ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload)
    });
    const result = await res.json(); setBusy(false);
    if (!res.ok) { setNotice(result.error || "Could not save article."); return; }
    setNotice(form.status === "published" ? "Article published." : "Draft saved.");
    setListStatus(form.status === "published" ? "published" : "draft");
    fresh(); setEditorOpen(false); await load();
  }
  async function remove(id: string) {
    if (!window.confirm("Permanently delete this article?")) return;
    const res = await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
    if (res.ok) { setPosts(p => p.filter(x => x.id !== id)); if (editing === id) closeEditor(); }
  }
  const filtered = useMemo(() => posts.filter(p => p.status === listStatus && `${p.title} ${p.category}`.toLowerCase().includes(query.toLowerCase())), [posts, query, listStatus]);
  const publishedCount = useMemo(() => posts.filter(p => p.status === "published").length, [posts]);
  const draftCount = posts.length - publishedCount;

  if (checking) return <><CustomCursor /><main className="da-shell"><p>Loading secure dashboard…</p></main></>;
  if (!authenticated) return <>
    <CustomCursor />
    <main className="da-login-wrap">
      <form className="da-login" onSubmit={login}>
        <a className="da-brand" href="/">DATRIX <span>TECH SOLUTIONS</span></a>
        <p className="da-kicker">PRIVATE CONTENT MANAGEMENT</p>
        <h1>Blogs and Insights</h1>
        <p>Sign in to manage your articles.</p>
        <label>Admin password
          <div className="da-password-field">
            <input type={showPassword ? "text" : "password"} autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} required />
            <button type="button" className="da-password-toggle" onClick={() => setShowPassword(show => !show)} aria-label={showPassword ? "Hide password" : "Show password"} aria-pressed={showPassword}>
              {showPassword ? <EyeOff size={18} strokeWidth={1.8} aria-hidden="true" /> : <Eye size={18} strokeWidth={1.8} aria-hidden="true" />}
            </button>
          </div>
        </label>
        {notice && <p className="da-notice">{notice}</p>}
        <button disabled={busy}>{busy ? "Signing in…" : "Sign in securely"}</button>
        <a className="da-back" href="/#/blog">← Back to Blogs and Insights</a>
      </form>
    </main>
  </>;

  return <>
    <CustomCursor />
    <main className="da-shell">
      <header className="da-top">
        <a className="da-brand" href="/">DATRIX <span>TECH SOLUTIONS</span></a>
        <div>
          <a href="/#/blog" target="_blank" rel="noreferrer">View Blogs and Insights ↗</a>
          <button className="da-logout" onClick={logout}>Sign out</button>
        </div>
      </header>
      <div className="da-heading">
        <div>
          <p className="da-kicker">CONTENT MANAGEMENT</p>
          <h1>{editorOpen ? editing ? "Edit article" : "New article" : "Blogs and Insights"}</h1>
          <p>{editorOpen ? "Create or update an article for your readers." : "Manage your published articles and drafts."}</p>
        </div>
        {editorOpen
          ? <button type="button" className="da-secondary" onClick={closeEditor}>← Back to articles</button>
          : <button type="button" onClick={startNewArticle}>＋ New article</button>}
      </div>

      {editorOpen ? <section className="da-editor">
        <div className="da-editor-title">
          <h2>{editing ? "Edit article" : "Create an article"}</h2>
          <span className={form.status === "published" ? "da-ready" : "da-draft-status"}>{form.status === "published" ? "Ready to publish" : "Draft workspace"}</span>
        </div>
        <form onSubmit={save}>
          <div className="da-two">
            <label>Article title<input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required minLength={3} placeholder="Write a clear, engaging headline" /></label>
            <label>URL slug<input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} placeholder="auto-generated-from-title" /></label>
          </div>
          <label>Short excerpt<textarea rows={2} maxLength={320} value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))} required placeholder="A short summary shown on article cards…" /></label>
          <div className="da-two">
            <label>Category<input value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} required placeholder="Business Technology" /></label>
            <label>Tags <small>Separate with commas</small><input value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} placeholder="automation, finance, growth" /></label>
          </div>
          <label>Article content <small>Plain text / Markdown supported. Use ## for section headings and - for bullet points.</small>
            <textarea className="da-content" rows={12} maxLength={MAX_ARTICLE_CONTENT_LENGTH} value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} required placeholder={"## Introduction\nWrite your article here…"} />
            <small aria-live="polite">{form.content.length.toLocaleString()} / {MAX_ARTICLE_CONTENT_LENGTH.toLocaleString()} characters</small>
          </label>
          <div className="da-upload-row">
            <label>Featured image<input type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={e => upload(e.target.files?.[0])} /></label>
            {form.featuredImage && <div className="da-image-preview"><img src={form.featuredImage} alt="Featured preview" /><button type="button" onClick={() => setForm(f => ({ ...f, featuredImage: "" }))}>Remove image</button></div>}
          </div>
          <div className="da-actions">
            <label className="da-status">Publishing status
              <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                <option value="draft">Save as draft</option>
                <option value="published">Publish article</option>
              </select>
            </label>
            <div>
              <button type="button" className="da-secondary" onClick={() => setPreviewOpen(true)}>Preview</button>
              <button type="button" className="da-secondary" onClick={fresh}>Clear</button>
              <button disabled={busy}>{busy ? "Saving…" : editing ? "Save changes" : form.status === "published" ? "Publish article" : "Save draft"}</button>
            </div>
          </div>
          {notice && <p className="da-notice">{notice}</p>}
        </form>
      </section> : <section className="da-list">
        <div className="da-list-head">
          <div>
            <p className="da-kicker">YOUR CONTENT</p>
            <h2>{listStatus === "published" ? "Published articles" : "Drafts"} <span>{listStatus === "published" ? publishedCount : draftCount}</span></h2>
          </div>
          <div className="da-list-tools">
            <div className="da-list-tabs" role="group" aria-label="Filter articles by status">
              <button type="button" className={listStatus === "published" ? "active" : ""} aria-pressed={listStatus === "published"} onClick={() => { setListStatus("published"); setQuery(""); }}>Published <span>{publishedCount}</span></button>
              <button type="button" className={listStatus === "draft" ? "active" : ""} aria-pressed={listStatus === "draft"} onClick={() => { setListStatus("draft"); setQuery(""); }}>Drafts <span>{draftCount}</span></button>
            </div>
            <input aria-label="Search articles" placeholder="Search articles…" value={query} onChange={e => setQuery(e.target.value)} />
          </div>
        </div>
        {filtered.length === 0
          ? <p className="da-empty">{query ? "No articles match that search." : listStatus === "published" ? "No published articles yet. Create your first article." : "No drafts yet."}</p>
          : <div className="da-table-wrap">
            <table>
              <thead><tr><th>Article</th><th>Category</th><th>Status</th><th>Last updated</th><th>Actions</th></tr></thead>
              <tbody>{filtered.map(post => <tr key={post.id}>
                <td><strong>{post.title}</strong><small>/{post.slug}</small></td>
                <td>{post.category}</td>
                <td><span className={post.status === "published" ? "da-published" : "da-draft"}>{post.status}</span></td>
                <td>{new Date(post.updatedAt).toLocaleDateString()}</td>
                <td>
                  <button className="da-link" onClick={() => edit(post)}>Edit</button>
                  <button className="da-link da-delete" onClick={() => remove(post.id)}>Delete</button>
                  {post.status === "published" && <a className="da-link" href={`/#/blog/${post.slug}`} target="_blank" rel="noreferrer">Preview ↗</a>}
                </td>
              </tr>)}</tbody>
            </table>
          </div>}
      </section>}
      <footer className="da-footer">Datrix Tech Solutions · Blogs and Insights</footer>
      {previewOpen && <div className="da-preview-backdrop" onClick={e => { if (e.target === e.currentTarget) setPreviewOpen(false); }}>
        <article className="da-preview" role="dialog" aria-modal="true" aria-labelledby="da-preview-title">
          <button type="button" className="da-preview-close" onClick={() => setPreviewOpen(false)} autoFocus>Close preview</button>
          <span className="da-preview-category">{form.category || "Category"}</span>
          <h1 id="da-preview-title">{form.title || "Article title"}</h1>
          {form.excerpt && <p className="da-preview-excerpt">{form.excerpt}</p>}
          {form.featuredImage && <img src={form.featuredImage} alt={form.title ? `Featured image for ${form.title}` : "Featured image"} />}
          <div className="da-preview-content">
            {form.content.split(/\n+/).map((line, i) =>
              line.startsWith("## ") ? <h2 key={i}>{line.slice(3)}</h2> :
              line.startsWith("# ") ? <h2 key={i}>{line.slice(2)}</h2> :
              line.startsWith("- ") ? <p key={i}>• {line.slice(2)}</p> :
              line.trim() ? <p key={i}>{line}</p> : null
            )}
          </div>
        </article>
      </div>}
    </main>
  </>;
}
