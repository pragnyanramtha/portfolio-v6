import type { Metadata } from "next";
import ProjectPageClient from "@/components/project-page-client";

export const metadata: Metadata = {
  title: "Projects — AI Agent Platforms, LLM Fine-Tuning, Open Source",
  description:
    "Featured projects by Pragnyan Ramtha: Agent7 AI agent platform, AIMO-3 reasoning models, personality cloning, and 70+ open-source contributions to AI libraries.",
  alternates: {
    canonical: "/projects",
  },
};

export default function ProjectsPage() {
  return <ProjectPageClient />;
}
