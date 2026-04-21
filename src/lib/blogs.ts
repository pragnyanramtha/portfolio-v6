import "server-only";

import { cache } from "react";
import { readFileSync, readdirSync } from "fs";
import path from "path";

const BLOGS_DIRECTORY = path.join(process.cwd(), "src/content/blogs");

export interface BlogPost {
  SLUG: string;
  TITLE: string;
  DATE: string;
  DESCRIPTION: string[];
  INTRO: string[];
  CONTENT: {
    HEADING: string;
    PARAGRAPHS: string[];
  }[];
  READ_TIME: string;
  TOPICS: string[];
  ORDER: number;
}

type FrontmatterValue = string | string[];
type Frontmatter = Record<string, FrontmatterValue>;

export const getBlogPosts = cache(() => {
  return readdirSync(BLOGS_DIRECTORY)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => readBlogPost(fileName))
    .sort((a, b) => a.ORDER - b.ORDER);
});

export function getBlogPostBySlug(slug: string) {
  return getBlogPosts().find((post) => post.SLUG === slug);
}

function readBlogPost(fileName: string): BlogPost {
  const filePath = path.join(BLOGS_DIRECTORY, fileName);
  const fileContents = readFileSync(filePath, "utf8");
  const { frontmatter, body } = parseMarkdownFile(fileContents);
  const slug = fileName.replace(/\.md$/, "");
  const parsedBody = parseBlogBody(body);

  return {
    SLUG: slug,
    TITLE: getFrontmatterString(frontmatter, "title"),
    DATE: getFrontmatterString(frontmatter, "date"),
    READ_TIME: getFrontmatterString(frontmatter, "readTime"),
    DESCRIPTION: getFrontmatterList(frontmatter, "description"),
    TOPICS: getFrontmatterList(frontmatter, "topics"),
    ORDER: Number(getFrontmatterString(frontmatter, "order")),
    ...parsedBody,
  };
}

function parseMarkdownFile(fileContents: string) {
  const frontmatterMatch = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/.exec(
    fileContents
  );

  if (!frontmatterMatch) {
    throw new Error("Blog post is missing frontmatter.");
  }

  return {
    frontmatter: parseFrontmatter(frontmatterMatch[1]),
    body: frontmatterMatch[2].trim(),
  };
}

function parseFrontmatter(rawFrontmatter: string): Frontmatter {
  const frontmatter: Frontmatter = {};
  let activeListKey: string | null = null;

  for (const line of rawFrontmatter.split("\n")) {
    if (!line.trim()) continue;

    const listItem = /^\s+-\s+(.*)$/.exec(line);
    if (listItem && activeListKey) {
      const currentList = frontmatter[activeListKey];
      frontmatter[activeListKey] = [
        ...(Array.isArray(currentList) ? currentList : []),
        stripQuotes(listItem[1]),
      ];
      continue;
    }

    const keyValue = /^([A-Za-z]+):\s*(.*)$/.exec(line);
    if (!keyValue) continue;

    const [, key, value] = keyValue;
    activeListKey = value ? null : key;
    frontmatter[key] = value ? stripQuotes(value) : [];
  }

  return frontmatter;
}

function parseBlogBody(body: string) {
  const intro: string[] = [];
  const content: BlogPost["CONTENT"] = [];
  let activeSection: BlogPost["CONTENT"][number] | null = null;

  for (const block of body.split(/\n{2,}/).map((block) => block.trim())) {
    if (!block) continue;

    if (block.startsWith("## ")) {
      activeSection = {
        HEADING: block.replace(/^##\s+/, ""),
        PARAGRAPHS: [],
      };
      content.push(activeSection);
      continue;
    }

    if (activeSection) {
      activeSection.PARAGRAPHS.push(block);
    } else {
      intro.push(block);
    }
  }

  return {
    INTRO: intro,
    CONTENT: content,
  };
}

function getFrontmatterString(frontmatter: Frontmatter, key: string) {
  const value = frontmatter[key];

  if (typeof value !== "string") {
    throw new Error(`Blog post frontmatter "${key}" must be a string.`);
  }

  return value;
}

function getFrontmatterList(frontmatter: Frontmatter, key: string) {
  const value = frontmatter[key];

  if (!Array.isArray(value)) {
    throw new Error(`Blog post frontmatter "${key}" must be a list.`);
  }

  return value;
}

function stripQuotes(value: string) {
  return value.trim().replace(/^["']|["']$/g, "");
}
