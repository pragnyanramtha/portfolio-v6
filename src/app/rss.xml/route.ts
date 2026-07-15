import { getBlogPosts } from "@/lib/blogs";

const baseUrl = "https://pragnyanramtha.dev";

export async function GET() {
  const posts = getBlogPosts();

  const items = posts
    .map(
      (post) => `    <item>
      <title><![CDATA[${post.TITLE}]]></title>
      <link>${baseUrl}/blogs/${post.SLUG}</link>
      <guid isPermaLink="true">${baseUrl}/blogs/${post.SLUG}</guid>
      <description><![CDATA[${post.DESCRIPTION.join(" ")}]]></description>
      <pubDate>${new Date(post.DATE).toUTCString()}</pubDate>
      ${post.TOPICS.map((t) => `<category>${t}</category>`).join("\n      ")}
    </item>`
    )
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Pragnyan Ramtha — AI Engineering Blog</title>
    <link>${baseUrl}</link>
    <description>Technical writing on LLM fine-tuning, AI agents, model compression, and open-source AI engineering.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate",
    },
  });
}
