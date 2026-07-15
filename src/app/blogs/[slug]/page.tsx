import type { Metadata } from "next";
import { DATA } from "@/app/data";
import { Contact, Footer, Navbar } from "@/components/sections";
import { CursorLayer } from "@/components/ui/cursor-layer";
import GridPattern from "@/components/ui/grid-pattern";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/blogs";
import { renderBlogMarkdown } from "@/lib/render-text";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return getBlogPosts().map((post) => ({
    slug: post.SLUG,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  const description = post.DESCRIPTION[0] || post.TITLE;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://pragnyanramtha.dev";

  return {
    title: `${post.TITLE}`,
    description,
    alternates: {
      canonical: `/blogs/${post.SLUG}`,
    },
    openGraph: {
      title: post.TITLE,
      description,
      url: `${baseUrl}/blogs/${post.SLUG}`,
      type: "article",
      publishedTime: post.DATE,
      authors: ["Pragnyan Ramtha"],
      images: [
        {
          url: `${baseUrl}/opengraph-image.png`,
          width: 1200,
          height: 630,
          alt: post.TITLE,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.TITLE,
      description,
      images: [`${baseUrl}/opengraph-image.png`],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return (
      <div className="mx-auto px-4 pt-6 sm:pt-12 w-full lg:w-2/3 text-foreground">
        <Navbar />

        <main className="px-4 py-24 min-h-lvh">
          <div className="max-w-2xl space-y-4">
            <p className="font-medium text-primary/90 text-base">blog.</p>
            <h1 className="font-bold text-3xl tracking-tight">
              This post does not exist.
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed">
              The link is likely outdated or the slug no longer matches the
              current content model.
            </p>
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-sm text-primary/90"
            >
              <ArrowLeft size={16} />
              Back to all posts
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const relatedPosts = getBlogPosts().filter(
    (candidate) => candidate.SLUG !== post.SLUG
  );

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: post.TITLE,
              description: post.DESCRIPTION[0],
              author: {
                "@type": "Person",
                name: "Pragnyan Ramtha",
                url: "https://pragnyanramtha.dev",
              },
              publisher: {
                "@type": "Organization",
                name: "Pragnyan Ramtha",
              },
              datePublished: post.DATE,
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `https://pragnyanramtha.dev/blogs/${post.SLUG}`,
              },
              keywords: post.TOPICS.join(", "),
            }),
          }}
        />
        <article className="py-16">
          <div className="max-w-3xl">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-muted-foreground text-sm hover:text-primary/90 transition-colors"
            >
              <ArrowLeft size={16} />
              Back to all posts
            </Link>

            <header className="mt-6 space-y-4">
              <p className="font-medium text-primary/90 text-base">blog.</p>
              <h1 className="font-bold text-3xl sm:text-4xl tracking-tight text-primary/90">
                {post.TITLE}
              </h1>

              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="inline-block bg-secondary px-2 py-1 rounded text-xs">
                  {post.DATE}
                </span>
                <span className="text-muted-foreground">{post.READ_TIME}</span>
              </div>

              <ul className="flex flex-wrap items-center gap-2">
                {post.TOPICS.map((topic) => (
                  <li
                    key={topic}
                    className="bg-muted px-2 py-1 rounded text-xs text-primary/90"
                  >
                    {topic}
                  </li>
                ))}
              </ul>
            </header>

            <div className="mt-8 space-y-4 text-muted-foreground text-sm sm:text-base leading-7 text-justify">
              {post.INTRO.map((paragraph, index) => (
                <p key={index}>{renderBlogMarkdown(paragraph)}</p>
              ))}
            </div>

            <div className="mt-12 space-y-12">
              {post.CONTENT.map((section) => (
                <section key={section.HEADING} className="pl-4 border-l">
                  <h2 className="font-medium text-xl text-primary/90">
                    {section.HEADING}
                  </h2>
                  <div className="mt-4 space-y-4 text-muted-foreground text-sm sm:text-base leading-7 text-justify">
                    {section.PARAGRAPHS.map((paragraph, index) => (
                      <p key={index}>{renderBlogMarkdown(paragraph)}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </article>

        {relatedPosts.length > 0 && (
          <section className="pb-12">
            <h2 className="font-medium text-primary/90 text-base">
              keep reading.
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mt-4">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.SLUG}
                  href={`/blogs/${relatedPost.SLUG}`}
                  className="block p-4 border rounded-lg border-muted-foreground/30 hover:border-primary transition-all duration-300 cursor-target"
                >
                  <p className="text-primary/90 text-lg">{relatedPost.TITLE}</p>
                  <p className="mt-2 text-muted-foreground text-sm leading-relaxed text-justify">
                    {relatedPost.DESCRIPTION[0]}
                  </p>
                  <span className="inline-flex items-center gap-1 mt-4 text-sm">
                    Read next <ArrowUpRight size={18} />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <Contact data={DATA.HEADER} />
        <Footer />
      </main>

      <CursorLayer />
    </div>
  );
}
