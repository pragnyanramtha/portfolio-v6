import { DATA } from "@/app/data";
import {
  AboutMe,
  Blogs,
  Contact,
  Experience,
  Footer,
  Header,
  Navbar,
  Projects,
  Skills,
} from "@/components/sections";
import { GitHubContributions } from "@/components/sections/github-contribution";
import { ResearchPapers } from "@/components/sections/research-papers";
import { CursorLayer } from "@/components/ui/cursor-layer";
import GridPattern from "@/components/ui/grid-pattern";
import { getBlogPosts } from "@/lib/blogs";

export default function Page() {
  const blogPosts = getBlogPosts();

  return (
    <div className="mx-auto px-4 pt-6 sm:pt-12 w-full lg:w-2/3 xl:w-1/2 text-foreground">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded"
      >
        Skip to content
      </a>

      <Navbar />

      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        className="[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]"
      />

      <main id="main-content" className="px-4 min-h-lvh">
        <Header data={DATA.HEADER} />
        <AboutMe data={DATA.ABOUT_ME} />
        <Experience data={DATA.EXPERIENCE} />
        <Projects data={DATA.PROJECTS} />
        <GitHubContributions />
        <Blogs data={blogPosts} />
        <ResearchPapers data={DATA.RESEARCH_PAPERS} />
        <Skills data={DATA.SKILLS} />
        <Contact data={DATA.HEADER} />
        <Footer />
      </main>

      <CursorLayer />
    </div>
  );
}
