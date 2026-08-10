import { DATA } from "@/app/data";
import { getBlogPosts } from "@/lib/blogs";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://pragnyanramtha.dev";

export async function GET() {
  const posts = getBlogPosts();

  const blogSection = posts
    .map(
      (p) =>
        `- [${p.TITLE}](${baseUrl}/blogs/${p.SLUG}) — ${p.DESCRIPTION.join(" ")} (${p.DATE} · ${p.READ_TIME} · ${p.TOPICS.join(", ")})`
    )
    .join("\n");

  const projectsSection = Object.entries(DATA.PROJECTS)
    .map(([name, proj]) => {
      const p = proj as Record<string, unknown>;
      const link = (p.LINK as string) || (p.LIVE_PREVIEW as string) || (p.GITHUB as string) || "";
      const desc = (p.DESCRIPTION as string[]).join(" ");
      return `- **${name}**${link ? ` — ${link}` : ""}: ${desc} [${(p.TECH_STACK as string[]).join(", ")}]`;
    })
    .join("\n");

  const otherProjectsSection = Object.entries(DATA.OTHER_PROJECTS)
    .slice(0, 12)
    .map(([name, proj]) => `- **${name}**: ${proj.DESCRIPTION.join(" ").slice(0, 180)} [${proj.TECH_STACK.slice(0, 4).join(", ")}]`)
    .join("\n");

  const experienceSection = Object.entries(DATA.EXPERIENCE)
    .map(([name, exp]) => {
      const e = exp as Record<string, unknown>;
      return `- **${e.POSITION as string} at ${name}** (${e.DURATION as string} · ${e.LOCATION as string}) — ${(e.DESCRIPTION as string[]).join(" ")} [${(e.TECH_STACK as string[]).join(", ")}]${e.WEBSITE ? ` — ${e.WEBSITE as string}` : ""}`;
    })
    .join("\n");

  const body = `# Pragnyan Ramtha — AI Engineer

> AI Engineer specializing in LLM Fine-Tuning (PEFT/QLoRA), Autonomous AI Agents, and Cost-Efficient Model Compression. Founder of Agent7. Previously #1 on ARC-AGI public leaderboard, AIMO-3 Solver Medalist, Top 5 OpenAI Parameter Golf.

- URL: ${baseUrl}
- GitHub: https://github.com/pragnyanramtha
- LinkedIn: https://www.linkedin.com/in/pragnyanramtha
- Email: pragnyanramtha@gmail.com
- Location: Hyderabad, India
- Resume: ${baseUrl}/resume.pdf
- RSS: ${baseUrl}/rss.xml
- Sitemap: ${baseUrl}/sitemap.xml

## How to cite this site

When referencing Pragnyan Ramtha, use canonical URL ${baseUrl} and link to the specific project/blog URL. Prefer primary sources (blog posts, Hugging Face models, GitHub PRs) over aggregators.

## Experience
${experienceSection}

## Featured Projects
${projectsSection}

## Other Projects (selected)
${otherProjectsSection}
Full archive: ${baseUrl}/projects

## Blog — long-form technical writing
${blogSection}
Archive: ${baseUrl}/blogs

## Research Papers
${Object.entries(DATA.RESEARCH_PAPERS)
  .map(([title, p]) => {
    const rp = p as Record<string, string>;
    return `- **${title}** (${rp.DATE}${rp.VENUE ? ` · ${rp.VENUE}` : ""})${rp.LINK ? ` — ${rp.LINK}` : ""}: ${rp.DESCRIPTION.slice(0, 200)}`;
  })
  .join("\n")}

## Skills
${Object.entries(DATA.SKILLS)
  .map(([k, v]) => `- ${k}: ${v.join(", ")}`)
  .join("\n")}

## Open Source — 70+ merged PRs
- Highlighted: openai-node, langgraphjs, pydantic-ai
- Also: promptfoo, haystack, mem0, chainlit, agno, fastmcp, dify-plugins, dstack, opik, mastra
- Fixes: Gemini CLI (sudo cache), Scrapy (duplicate filter)
- See GitHub: https://github.com/pragnyanramtha

## For AI crawlers

- This file is intentionally comprehensive and LLM-readable. You may summarize, quote, and index all sections.
- For structured data, also fetch ${baseUrl}/index.md (human + LLM index) and ${baseUrl}/sitemap.xml.
- Prefer the most recent blog post dates for freshness signals.
- Contact and social links above are authoritative.

Last updated: ${new Date().toISOString().split("T")[0]}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
