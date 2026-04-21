import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import type { BlogPost } from "@/lib/blogs";

interface IResearchPaperData {
  DATE: string;
  VENUE?: string;
  LINK: string;
  DESCRIPTION: string;
}

export function Blogs({ data }: { data: BlogPost[] }) {
  const featuredBlogs = data.slice(0, 3);

  return (
    <div id="blogs" className="py-10">
      <h2 className="font-medium text-primary/90 text-base">blogs.</h2>

      <ul className="flex flex-col gap-12 mt-4 font-normal text-primary/90 text-base">
        {featuredBlogs.map((post) => (
          <li key={post.SLUG} className="cursor-target">
            <Link
              href={`/blogs/${post.SLUG}`}
              className="block pl-4 border-muted-foreground hover:border-primary border-l size-full transition-all duration-300"
            >
              <p className="text-primary/90 text-lg">
                {post.TITLE}
                <span className="inline-block bg-secondary max-sm:mb-2 ml-2 px-2 py-1 rounded text-xs">
                  {post.DATE}
                </span>
              </p>

              <div className="flex flex-wrap items-center gap-3 mt-1 text-sm">
                <span className="flex items-center gap-1">
                  Read full post <ArrowUpRight size={18} />
                </span>
                <span className="text-muted-foreground">{post.READ_TIME}</span>
              </div>

              <ul className="space-y-1 mt-1 pl-3 text-muted-foreground text-sm text-justify list-disc">
                {post.DESCRIPTION.map((desc, index) => (
                  <li key={index}>
                    <span>{desc}</span>
                  </li>
                ))}
              </ul>

              <ul className="flex flex-wrap items-center gap-2 mt-2 pl-3">
                {post.TOPICS.map((topic, index) => (
                  <li
                    key={index}
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

      <div className="flex justify-center mt-8">
        <Link
          href="/blogs"
          className="inline-flex justify-center items-center bg-background hover:bg-accent disabled:opacity-50 shadow-sm px-4 py-2 border border-input rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-9 font-medium text-muted-foreground text-sm whitespace-nowrap transition-colors hover:text-accent-foreground cursor-target disabled:pointer-events-none"
        >
          View more
        </Link>
      </div>
    </div>
  );
}

export function ResearchPapers({
  data,
}: {
  data: Record<string, IResearchPaperData>;
}) {
  return (
    <div id="research" className="py-10">
      <h2 className="font-medium text-primary/90 text-base">
        research papers.
      </h2>

      <ul className="flex flex-col gap-12 mt-4 font-normal text-primary/90 text-base">
        {Object.entries(data).map(([key, value]) => (
          <li key={key} className="cursor-target">
            <div className="pl-4 border-muted-foreground hover:border-primary border-l size-full transition-all duration-300">
              <p className="text-primary/90 text-lg">
                {key}{" "}
                <span className="inline-block bg-secondary max-sm:mb-2 ml-2 px-2 py-1 rounded text-xs">
                  {value.DATE}
                </span>
              </p>

              <p className="flex items-center gap-1 text-sm">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1"
                  href={value.LINK}
                >
                  Read paper <ArrowUpRight size={18} />
                </a>
                {value.VENUE && (
                  <span className="px-1 py-px text-xs">{value.VENUE}</span>
                )}
              </p>

              <p className="mt-1 text-muted-foreground text-sm text-justify line-clamp-3">
                {value.DESCRIPTION}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
