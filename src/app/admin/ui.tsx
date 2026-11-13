"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Post = { id: string; slug: string; title: string; excerpt: string; content: string; category: string; tags: string[]; featuredImage: string | null; status: string; updatedAt: string };
const blank = { title: "", slug: "", excerpt: "", content: "", category: "Business Technology", tags: "", featuredImage: "", status: "draft" };

export default function AdminDashboard() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [form, setForm] = useState(blank);
  const [editing, setEditing] = useState<string | null>(null);
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
    setForm({ title: post.title, slug: post.slug, excerpt: post.excerpt, content: post.content, category: post.category, tags: post.tags.join(", "), featuredImage: post.featuredImage || "", status: post.status });
    setNotice(""); window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function fresh() { setEditing(null); setForm(blank); setNotice(""); }
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
    fresh(); await load();
  }
  async function remove(id: string) {
    if (!window.confirm("Permanently delete this article?")) return;
    const res = await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
    if (res.ok) { setPosts(p => p.filter(x => x.id !== id)); if (editing === id) fresh(); }
  }
  const filtered = useMemo(() => posts.filter(p => `${p.title} ${p.category} ${p.status}`.toLowerCase().includes(query.toLowerCase())), [posts, query]);

  if (checking) return <main className="da-shell"><p>Loading secure dashboard…</p></main>;
  if (!authenticated) return <main className="da-login-wrap"><form className="da-login" onSubmit={login}>
    <a className="da-brand" href="/">DATRIX <span>TECH SOLUTIONS</span></a>
    <p className="da-kicker">PRIVATE CONTENT MANAGEMENT</p><h1>Blogs and Insights</h1>
    <p>Sign in to manage your articles.</p>
    <label>Admin password<input type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} required /></label>
    {notice && <p className="da-notice">{notice}</p>}
    <button disabled={busy}>{busy ? "Signing in…" : "Sign in securely"}</button>
    <a className="da-back" href="#/blog">← Back to Blogs and Insights</a>
  </form></main>;

  return <main className="da-shell">
    <header className="da-top"><a className="da-brand" href="/">DATRIX <span>TECH SOLUTIONS</span></a><div><a href="#/blog" target="_blank">View Blogs and Insights ↗</a><button className="da-logout" onClick={logout}>Sign out</button></div></header>
    <div className="da-heading"><div><p className="da-kicker">CONTENT MANAGEMENT</p><h1>Blogs and Insights</h1><p>Write, edit and publish articles for the Datrix website.</p></div><button onClick={fresh}>＋ New article</button></div>
    <section className="da-editor">
      <div className="da-editor-title"><h2>{editing ? "Edit article" : "Create an article"}</h2><span>{form.status === "published" ? "Ready to publish" : "Draft workspace"}</span></div>
      <form onSubmit={save}>
        <div className="da-two"><label>Article title<input value={form.title} onChange={e => setForm(f => ({...f,title:e.target.value}))} required minLength={3} placeholder="Write a clear, engaging headline" /></label><label>URL slug<input value={form.slug} onChange={e => setForm(f => ({...f,slug:e.target.value}))} placeholder="auto-generated-from-title" /></label></div>
        <label>Short excerpt<textarea rows={2} maxLength={320} value={form.excerpt} onChange={e => setForm(f => ({...f,excerpt:e.target.value}))} required placeholder="A short summary shown on article cards…" /></label>
        <div className="da-two"><label>Category<input value={form.category} onChange={e => setForm(f => ({...f,category:e.target.value}))} required placeholder="Business Technology" /></label><label>Tags <small>Separate with commas</small><input value={form.tags} onChange={e => setForm(f => ({...f,tags:e.target.value}))} placeholder="automation, finance, growth" /></label></div>
        <label>Article content <small>Plain text / Markdown supported. Use ## for section headings and - for bullet points.</small><textarea className="da-content" rows={12} value={form.content} onChange={e => setForm(f => ({...f,content:e.target.value}))} required placeholder={"## Introduction\nWrite your article here…"} /></label>
        <div className="da-upload-row"><label>Featured image<input type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={e => upload(e.target.files?.[0])} /></label>{form.featuredImage && <div className="da-image-preview"><img src={form.featuredImage} alt="Featured preview" /><button type="button" onClick={() => setForm(f => ({...f,featuredImage:""}))}>Remove image</button></div>}</div>
        <div className="da-actions"><label className="da-status">Publishing status<select value={form.status} onChange={e => setForm(f => ({...f,status:e.target.value}))}><option value="draft">Save as draft</option><option value="published">Publish article</option></select></label><div><button type="button" className="da-secondary" onClick={() => setPreviewOpen(true)}>Preview</button><button type="button" className="da-secondary" onClick={fresh}>Clear</button><button disabled={busy}>{busy ? "Saving…" : editing ? "Save changes" : form.status === "published" ? "Publish article" : "Save draft"}</button></div></div>
        {notice && <p className="da-notice">{notice}</p>}
      </form>
    </section>
    <section className="da-list"><div className="da-list-head"><div><p className="da-kicker">YOUR CONTENT</p><h2>All articles <span>{posts.length}</span></h2></div><input aria-label="Search articles" placeholder="Search articles…" value={query} onChange={e => setQuery(e.target.value)} /></div>
      {filtered.length === 0 ? <p className="da-empty">No articles yet. Create your first article above.</p> : <div className="da-table-wrap"><table><thead><tr><th>Article</th><th>Category</th><th>Status</th><th>Last updated</th><th>Actions</th></tr></thead><tbody>{filtered.map(post => <tr key={post.id}><td><strong>{post.title}</strong><small>/{post.slug}</small></td><td>{post.category}</td><td><span className={post.status === "published" ? "da-published" : "da-draft"}>{post.status}</span></td><td>{new Date(post.updatedAt).toLocaleDateString()}</td><td><button className="da-link" onClick={() => edit(post)}>Edit</button><button className="da-link da-delete" onClick={() => remove(post.id)}>Delete</button>{post.status === "published" && <a className="da-link" href={`#/blog/${post.slug}`} target="_blank">Preview ↗</a>}</td></tr>)}</tbody></table></div>}
    </section>
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
  </main>;
}
