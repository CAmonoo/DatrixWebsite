
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { BLOG_POSTS, type BlogPost } from "../blogData";

type LivePost = {
  id: string;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  featuredImage?: string | null;
  publishedAt?: string | null;
};

function ArticleBody({ post }: { post: LivePost | BlogPost }) {
  const live = "content" in post;

  return (
    <article className="dt-blog-article">
      <button
        className="dt-blog-back"
        onClick={() => {
          window.location.hash = "#/blog";
        }}
      >
        <span aria-hidden="true">←</span> All articles
      </button>

      <div className="dt-blog-article-head">
        <span className="dt-blog-category">{post.category}</span>
        <h1>{post.title}</h1>
        <p className="dt-blog-deck">{post.excerpt}</p>

        <div className="dt-blog-meta">
          {live
            ? post.publishedAt
              ? new Date(post.publishedAt).toLocaleDateString(
                  undefined,
                  { month: "long", year: "numeric" }
                )
              : "Datrix Insights"
            : post.date}
          <span>·</span>
          {live ? "Datrix Insights" : post.readTime}
        </div>
      </div>

      {live && post.featuredImage ? (
        <img
          src={post.featuredImage}
          alt=""
          className="dt-blog-live-image"
        />
      ) : !live ? (
        <div
          className={`dt-blog-art ${post.artClass}`}
          aria-hidden="true"
        >
          <span>{post.artLabel}</span>
        </div>
      ) : null}

      <div className="dt-blog-prose">
        {live ? (
          <div className="dt-blog-live-content">
            {post.content.split(/\n+/).map((line, i) =>
              line.startsWith("## ") ? (
                <h2 key={i}>{line.slice(3)}</h2>
              ) : line.startsWith("# ") ? (
                <h2 key={i}>{line.slice(2)}</h2>
              ) : line.startsWith("- ") ? (
                <p key={i}>• {line.slice(2)}</p>
              ) : line.trim() ? (
                <p key={i}>{line}</p>
              ) : null
            )}
          </div>
        ) : (
          post.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>

              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}

              {section.bullets?.length ? (
                <ul>
                  {section.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))
        )}

        <div className="dt-blog-article-cta">
          <p>Looking to make your business operations work smarter?</p>
          <h2>Let's find the right solution for your team.</h2>
          <a href="#/contact-us">
            Talk to Datrix <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </article>
  );
}

export default function BlogPage({
  slug = "",
  onRequestDemo,
}: {
  slug?: string;
  onRequestDemo: () => void;
}) {
  const [livePosts, setLivePosts] = useState<LivePost[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [category, setCategory] = useState("All topics");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/blog", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        setLivePosts(Array.isArray(data) ? data : []);
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  // Prepare articles before rendering.
  const posts = useMemo(
    () => [
      ...livePosts,
      ...BLOG_POSTS.filter(
        (p) => !livePosts.some((l) => l.slug === p.slug)
      ),
    ],
    [livePosts]
  );

  const categories = useMemo(
    () => [
      "All topics",
      ...Array.from(new Set(posts.map((p) => p.category))),
    ],
    [posts]
  );

  const filtered = useMemo(
    () =>
      posts.filter(
        (p) =>
          (category === "All topics" || p.category === category) &&
          (!search.trim() ||
            `${p.title} ${p.excerpt} ${p.category}`
              .toLowerCase()
              .includes(search.trim().toLowerCase()))
      ),
    [posts, category, search]
  );

  const featured = posts[0];

  const liveSelected = livePosts.find((p) => p.slug === slug);
  const starterSelected = BLOG_POSTS.find((p) => p.slug === slug);

  const isLive = (
    p: LivePost | BlogPost
  ): p is LivePost => "content" in p;

  // All hooks have executed before any conditional return.
  if (liveSelected) {
    return <ArticleBody post={liveSelected} />;
  }

  if (
    starterSelected &&
    !livePosts.some((p) => p.slug === slug)
  ) {
    return <ArticleBody post={starterSelected} />;
  }

  return (
    <main className="dt-blog-page">
      <section className="dt-blog-hero">
        <div className="container dt-blog-hero-inner">
          <div className="dt-blog-eyebrow">
            <span /> BLOGS AND INSIGHTS
          </div>

          <h1>
            Ideas for a <em>smarter</em>
            <br />
            way to work.
          </h1>

          <p>
            Practical insights on business technology, finance, people
            and the systems that help ambitious organisations move forward.
          </p>

          <a className="dt-blog-hero-link" href="#dt-blog-list">
            Explore the insights <span aria-hidden="true">↓</span>
          </a>

          <div className="dt-blog-hero-orbit" aria-hidden="true">
            <span>INSIGHT</span>
            <b>DX</b>
          </div>
        </div>
      </section>

      {featured && (
        <section className="container dt-blog-featured-wrap">
          <div className="dt-blog-section-kicker">
            LATEST INSIGHT <span />
          </div>

          <a
            className="dt-blog-featured"
            href={`#/blog/${featured.slug}`}
          >
            <div
              className={`dt-blog-art dt-blog-feature-art ${
                isLive(featured) ? "" : featured.artClass
              }`}
              aria-hidden="true"
            >
              {isLive(featured) && featured.featuredImage ? (
                <img src={featured.featuredImage} alt="" />
              ) : (
                <span>
                  {isLive(featured) ? "DAT RIX INSIGHT" : featured.artLabel}
                </span>
              )}
            </div>

            <div className="dt-blog-feature-copy">
              <span className="dt-blog-category">
                {featured.category}
              </span>
              <h2>{featured.title}</h2>
              <p>{featured.excerpt}</p>
              <div className="dt-blog-meta">Datrix Insights</div>
              <span className="dt-blog-read-link">
                Read the article <b aria-hidden="true">↗</b>
              </span>
            </div>
          </a>
        </section>
      )}

      <section
        className="container dt-blog-list-section"
        id="dt-blog-list"
      >
        <div className="dt-blog-list-heading">
          <div>
            <div className="dt-blog-section-kicker">
              THE LATEST <span />
            </div>
            <h2>Explore our thinking.</h2>
          </div>

          <p>
            Ideas, perspectives and practical guidance for the people
            building better businesses.
          </p>
        </div>

        <div className="dt-blog-controls">
          <div
            className="dt-blog-categories"
            aria-label="Filter articles by topic"
          >
            {categories.map((item) => (
              <button
                key={item}
                className={category === item ? "active" : ""}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <label className="dt-blog-search">
            <span aria-hidden="true">⌕</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search insights"
              aria-label="Search insights"
            />
          </label>
        </div>

        <div className="dt-blog-grid">
          {filtered.map((post) => (
            <a
              className="dt-blog-card"
              href={`#/blog/${post.slug}`}
              key={post.slug}
            >
              <div
                className={`dt-blog-art ${
                  isLive(post) ? "" : post.artClass
                }`}
                aria-hidden="true"
              >
                {isLive(post) && post.featuredImage ? (
                  <img src={post.featuredImage} alt="" />
                ) : (
                  <span>
                    {isLive(post) ? "DAT RIX INSIGHT" : post.artLabel}
                  </span>
                )}
                <b>↗</b>
              </div>

              <div className="dt-blog-card-content">
                <span className="dt-blog-category">
                  {post.category}
                </span>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>

                <div className="dt-blog-card-footer">
                  <span>
                    {isLive(post) ? "Datrix Insights" : post.date}
                  </span>
                  <span>Read article</span>
                </div>
              </div>
            </a>
          ))}

          {filtered.length === 0 && (
            <div className="dt-blog-empty">
              {loaded
                ? "No articles match that search. Try another topic or keyword."
                : "Loading insights…"}
            </div>
          )}
        </div>
      </section>

      <section className="dt-blog-bottom-cta">
        <div className="container">
          <div>
            <span>BUILD WITH CONFIDENCE</span>
            <h2>
              Technology should move
              <br />
              your business forward.
            </h2>
          </div>

          <button onClick={onRequestDemo}>
            Discover what Datrix can do <b aria-hidden="true">↗</b>
          </button>
        </div>
      </section>
    </main>
  );
}
