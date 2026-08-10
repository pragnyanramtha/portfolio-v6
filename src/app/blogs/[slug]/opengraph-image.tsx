import { ImageResponse } from "next/og";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/blogs";

export const runtime = "nodejs";
export const alt = "Blog post — Pragnyan Ramtha";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.SLUG }));
}

export default async function OgImage({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const resolved = params instanceof Promise ? await params : params;
  const post = getBlogPostBySlug(resolved.slug);

  if (!post) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#0a0a0a",
            color: "#fafafa",
          }}
        >
          <div style={{ fontSize: 32 }}>Post not found</div>
        </div>
      ),
      { ...size }
    );
  }

  const title = post.TITLE;
  const topics = post.TOPICS.slice(0, 4);
  const description = post.DESCRIPTION[0] ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#09090b",
          color: "#fafafa",
          padding: "48px 56px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* subtle grid */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.06,
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* top row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 14,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#a1a1aa",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                background: "#fafafa",
                display: "flex",
              }}
            />
            pragnyanramtha.dev / blog
          </span>
          <span style={{ display: "flex", gap: 12 }}>
            <span>{post.DATE}</span>
            <span style={{ opacity: 0.5 }}>•</span>
            <span>{post.READ_TIME}</span>
          </span>
        </div>

        {/* middle */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 980 }}>
          <div
            style={{
              fontSize: title.length > 48 ? 44 : 52,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#fafafa",
              display: "flex",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 18,
              lineHeight: 1.5,
              color: "#a1a1aa",
              maxWidth: 880,
              display: "-webkit-box",
              overflow: "hidden",
            }}
          >
            {description}
          </div>
        </div>

        {/* bottom */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div style={{ display: "flex", gap: 10 }}>
            {topics.map((t) => (
              <span
                key={t}
                style={{
                  fontSize: 12,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  background: "#27272a",
                  border: "1px solid #3f3f46",
                  color: "#e4e4e7",
                  padding: "8px 14px",
                  borderRadius: 999,
                  display: "flex",
                }}
              >
                {t}
              </span>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 2,
            }}
          >
            <span style={{ fontSize: 20, fontWeight: 700, color: "#fafafa" }}>Pragnyan Ramtha</span>
            <span style={{ fontSize: 13, color: "#a1a1aa" }}>AI Engineer · Agent7 · ARC-AGI #1</span>
          </div>
        </div>

        {/* accent bar */}
        <div
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            height: 4,
            width: "100%",
            background: "linear-gradient(90deg, #fafafa 0%, #52525b 50%, transparent 100%)",
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
