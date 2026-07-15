import type { Metadata } from "next";
import { DATA } from "@/app/data";
import { Contact, Footer, Navbar } from "@/components/sections";
import { CursorLayer } from "@/components/ui/cursor-layer";
import GridPattern from "@/components/ui/grid-pattern";
import { getBlogPosts } from "@/lib/blogs";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog — AI Engineering, LLM Fine-Tuning, Open Source",
  description:
    "Technical writing on LLM fine-tuning, AI agent systems, model compression, and open-source contributions by Pragnyan Ramtha.",
  alternates: {
    canonical: "/blogs",
  },
};

export default function BlogsPage() {
  const blogPosts = getBlogPosts();

  return (
    <div className="mx-auto px-4 pt-6 sm:pt-12 w-full lg:w-2/3 text-foreground">
      <Navbar />

      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        className="[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]"
      />

      <main className="px-4 min-h-lvh">
        <section className="py-16">
          <h1 className="font-medium text-primary/90 text-base">
            blog archive.
          </h1>
          <div className="max-w-3xl mt-2 text-muted-foreground text-sm text-justify leading-relaxed space-y-4">
            <p>
              I use this space to write about AI systems, model training, and
              the practical engineering decisions behind shipping reliable
              machine learning work.
            </p>
            <p>
              The writing follows the same pattern as the rest of this
              portfolio: direct notes, measurable trade-offs, and lessons that
              came out of real implementation work rather than abstract
              speculation.
            </p>
          </div>
        </section>

        <section className="pb-12">
          <ul className="flex flex-col gap-12 font-normal text-primary/90 text-base">
            {blogPosts.map((post) => (
              <li key={post.SLUG} className="cursor-target">
                <Link
                  href={`/blogs/${post.SLUG}`}
                  className="block pl-4 border-muted-foreground hover:border-primary border-l size-full transition-all duration-300"
                >
                  <div className="flex sm:flex-row flex-col sm:items-center sm:justify-between gap-2">
                    <p className="text-primary/90 text-xl">{post.TITLE}</p>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="inline-block bg-secondary px-2 py-1 rounded">
                        {post.DATE}
                      </span>
                      <span className="text-muted-foreground">
                        {post.READ_TIME}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-1 mt-3 pl-3 text-muted-foreground text-sm text-justify list-disc">
                    {post.DESCRIPTION.map((line, index) => (
                      <li key={index}>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap items-center gap-3 mt-4 text-sm">
                    <span className="flex items-center gap-1">
                      Read article <ArrowUpRight size={18} />
                    </span>
                  </div>

                  <ul className="flex flex-wrap items-center gap-2 mt-3 pl-3">
                    {post.TOPICS.map((topic) => (
                      <li
                        key={topic}
                        className="bg-muted px-2 py-1 rounded text-xs"
                      >
                        {topic}
                      </li>
                    ))}
                  </ul>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <Contact data={DATA.HEADER} />
        <Footer />
      </main>

      <CursorLayer />
    </div>
  );
}
