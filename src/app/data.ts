import { StaticImageData } from "next/image";

import {
  AirwatchImage,
  AutopilotImage,
  CheatSheetAIImage,
  CloneImage,
  LibraryImage,
  SkygazeImage,
  TodoImage,
  VIPSImage,
  VueBitsImage,
} from "@/assets";

export interface IProjectData {
  LIVE_PREVIEW?: string;
  GITHUB?: string;
  DESCRIPTION: string[];
  NOTE?: string;
  TECH_STACK: string[];
  IMAGE: StaticImageData;
}

export const DATA = {
  HEADER: {
    NAME: "Pragnyan Ramtha",
    AGE: "17",
    PRONOUN: "he/him",
    HEADLINE:
      "AI Research Scientist. I build things for fun and experiment with new technologies.",
    RESUME: "/pragnyanrr-v3.pdf",
    EMAIL: "mailto:pragnyanramtha@gmail.com",
    GITHUB: "https://github.com/pragnyanramtha",
    LINKEDIN: "https://www.linkedin.com/in/pragnyanramtha",
  },

  ABOUT_ME: {
    INTRO:
      "Hello! My name is Pragnyan and I enjoy creating things that make people go Damn! My interest in programming started back in 2020 when I decided to try editing custom Linux distros, turns out hacking together a custom OS taught me a lot about Linux and Programming!",
    EXPERTISE:
      "Fast-forward to today, I have worked as a Founding Engineer at Six Axis Studios. I’m focused on building projects, contributing to open source, and working on my skills. I also recently joined NIAT - MRV University and would love to network with students and alumni.",
  },

  EXPERIENCE: {
    "Six Axis Studios": {
      WEBSITE: "https://6-axis-studios.vercel.app",
      POSITION: "Founding Engineer",
      LOCATION: "Remote",
      DURATION: "May, 2025 - Aug, 2025",
      DESCRIPTION: [
        "Built an AI agent to handle customer support queries, reducing response times by 50% and improving customer satisfaction by 65%.",
        "Found insights in client data to improve the company's sales by 20%.",
        "Built ai agents to increase efficiency and productivity of the company by 30%.",
      ],
      TECH_STACK: ["Scikit-learn", "LLM Agents", "APIs", "Python"],
    },
    "Open Source Contributions": {
      WEBSITE: "https://github.com/pragnyanramtha",
      POSITION: "GitHub Contributor",
      LOCATION: "Remote",
      DURATION: "2024 - Present",
      DESCRIPTION: [
        "Actively Contributed to 25+ open-source projects, across various organizations.",
        "Implemented various features and improved the codebase, reducing Clutter and improving code maintainability.",
        "Winner of IEEE Summer of Code (IEEESoC) Hackathon 2025, for my open source contribution to multiple projects.",
      ],
      TECH_STACK: ["Python", "TypeScript", "Git", "Docker", "CI/CD"],
    },
  },

  PROJECTS: {
    "Personality Clone": {
      DESCRIPTION: [
        "Using contrastive fine-tuning methodology, I fine-tuned a Sentence Transformer (SBERT) on my Instagram chats to mimic my response style.",
        "Implemented a siamese network architecture with cosine similarity loss, causing improved semantic embeddings and resulting in 92% accuracy in replicating my response style, a 28% improvement over baseline models.",
      ],
      TECH_STACK: ["TensorFlow", "Python", "CUDA", "Transformers"],
      IMAGE: CloneImage,
    },
    "Autopilot": {
      DESCRIPTION: [
        "Using function calling and tool-use paradigms, I built an intelligent AI automation system that performs complex tasks using natural language commands and AI agents.",
        "Implemented a Reasoning + Acting agent framework with safe command execution sandboxing, causing reduced execution errors and resulting in 45% faster task completion compared to manual workflows.",
      ],
      TECH_STACK: ["Python", "LLM Agents", "APIs"],
      IMAGE: AutopilotImage,
    },
    "CheatSheet AI": {
      DESCRIPTION: [
        "Using retrieval-augmented generation (RAG) and chain-of-thought prompting, I developed an AI system that generates contextual cheat sheets for various topics.",
        "Implemented semantic chunking with vector embeddings and multi-shot learning, causing improved content relevance and resulting in 65% reduction in user study time compared to traditional learning methods.",
      ],
      TECH_STACK: ["Python", "LLM Agents", "APIs"],
      IMAGE: CheatSheetAIImage,
    },
  },

  BLOGS: {
    "Training a lightweight personality clone": {
      DATE: "August 22, 2025",
      TIME: "6",
      LINK: "https://medium.com/@pragnyanramtha/from-raw-chat-logs-to-a-local-ai-an-end-to-end-guide-to-building-a-personality-clone-with-llama-3-1-b4a1d263b5e4",
      DESCRIPTION:
        "Dataset prep from chats, contrastive fine-tuning, and evaluation pitfalls.",
    },
    "How I’m building Autopilot": {
      DATE: "September 5, 2025",
      TIME: "5",
      LINK: "https://medium.com/@pragnyanramtha/autopilot-building-an-ai-powered-desktop-automation-system-47d8f8c7d32b",
      DESCRIPTION:
        "Notes on architecture choices, safe command execution, and early UX experiments.",
    },
    "CheatSheet AI – ranking experiments": {
      DATE: "September 1, 2025",
      TIME: "4",
      LINK: "https://medium.com/@pragnyanramtha/cheatsheet-ai-the-free-open-source-alternative-to-expensive-interview-tools-a9c29b97e26c",
      DESCRIPTION:
        "Trying hybrid retrieval + LLM reranking for better meta-search relevance.",
    },
  },

  OTHER_PROJECTS: {
    "Rezo Search Engine": {
      DESCRIPTION: [
        "A meta-search engine and API that aggregates results using multiple strategies from Google, Tavily, and other sources.",
        "Uses Google Gemini 2.5 Flash to process, rank, and summarize results for context-aware search.",
      ],
      TECH_STACK: ["Flask", "Google APIs", "Generative AI", "Render"],
    },
    "Synapse-Graph": {
      DESCRIPTION: [
        "A solution for detecting sentence boundaries in Knowledge Graphs using only graph structure and semantics, without access to original word order.",
      ],
      TECH_STACK: ["Python", "Graph Neural Networks", "Natural Language Processing", "spaCy", "NetworkX", "Machine Learning"],
    },
    "AI-analytics": {
      DESCRIPTION: [
        "A modern analytics dashboard that combines real-time data visualization with AI-powered insights.",
      ],
      TECH_STACK: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Shadcn UI", "Lucide React", "Framer Motion"],
    },
    "ASCII webcam": {
      DESCRIPTION: [
        "A browser-based application that converts live webcam video into colorful ASCII art in real-time.",
      ],
      TECH_STACK: ["HTML5", "CSS3", "JavaScript", "Canvas API", "MediaDevices API", "MediaRecorder API"],
    },
    "recipro": {
      DESCRIPTION: [
        "A decentralized social platform built on the Internet Computer blockchain. It allows users to post and interact without relying on centralized servers, with core logic implemented in Rust canisters.",
      ],
      TECH_STACK: ["Rust", "Dfinity SDK (DFX)", "Internet Computer (ICP)", "JavaScript", "HTML", "CSS", "Webpack"],
    },
    "GitHub Dark AMOLED Theme for Micro Editor": {
      DESCRIPTION: [
        "A custom GitHub Dark AMOLED-inspired color theme for the Micro terminal editor.",
      ],
      TECH_STACK: ["Micro Editor", "Color Schemes"],
    },
    "Gemini CLI – Fix Sudo Bug": {
      DESCRIPTION: [
        "Submitted a pull request to Google's Gemini CLI, fixing an issue where commands requiring sudo would fail. Added an interactive password prompt and a secure time-limited cache for sudo passwords.",
      ],
      TECH_STACK: ["TypeScript", "Node.js", "CLI"],
    },
    "Scrapy – Duplicate Filter Reliability Patch": {
      DESCRIPTION: [
        "Contributed to Scrapy by fixing a bug where semantically identical URLs (with or without trailing slashes) were treated as unique, causing duplicate fetches.",
        "Implemented canonical URL handling and middleware logic to prevent redundant crawling.",
      ],
      TECH_STACK: ["Python", "Scrapy", "Middleware"],
    },
    "BioBloom": {
      DESCRIPTION: [
        "Updated BioBloom, an open-source crop-management web application. It uses HTML/CSS/JavaScript (with Chart.js) on the frontend and a Node.js/Express/MongoDB backend.",
      ],
      TECH_STACK: ["JavaScript", "Node.js", "Express", "MongoDB", "Chart.js"],
    },
    "Vercel Portfolio v1": {
      DESCRIPTION: [
        "The first version of my portfolio website built with Next.js, TypeScript, and Tailwind CSS, deployed on Vercel.",
        "It showcases my projects, skills, and online presence with a clean and responsive UI.",
      ],
      TECH_STACK: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    },
    "deepResearch": {
      DESCRIPTION: [
        "A Dify plugin that integrates the Tavily API to enable real-time web search and retrieval inside AI applications.",
      ],
      TECH_STACK: ["Python", "Dify Plugin SDK", "Tavily API"],
    },
    "Smile Capture": {
      DESCRIPTION: [
        "A Flask web app that uses OpenCV for real-time face and smile detection. The app runs a webcam feed, detects smiles using Haar cascades, and automatically snaps a photo when a strong smile is detected.",
      ],
      TECH_STACK: ["Python", "Flask", "OpenCV"],
    },
    "Dify Plugin – Animo Visuals": {
      DESCRIPTION: [
        "A Dify plugin that integrates the Animo API to generate MP4 videos from text prompts.",
        "The plugin allows users to specify duration, style (cinematic, anime, realistic, etc.), and resolution.",
      ],
      TECH_STACK: ["Python", "Dify", "Animo API"],
    },
    "Dify Plugin – Legal Clause Researcher": {
      DESCRIPTION: [
        "A custom Dify plugin that analyzes legal text and identifies the presence of common contractual clauses using the Thomson Reuters Legal API.",
      ],
      TECH_STACK: ["Python", "Dify", "Thomson Reuters API"],
    },
    "learnit": {
      DESCRIPTION: [
        "An AI-powered educational platform that brings history's greatest minds to life through interactive conversations.",
      ],
      TECH_STACK: ["Next.js 15", "TypeScript", "Tailwind CSS", "Framer Motion", "Lucide React", "Sensay API", "Cerebras API", "html2pdf.js"],
    },
    "Dify Plugin – Real-time Stock Researcher": {
      DESCRIPTION: [
        "A Dify plugin that retrieves real-time stock prices and market data for given ticker symbols.",
      ],
      TECH_STACK: ["Python", "Dify", "Financial APIs"],
    },
  },

  SKILLS: {
    Languages: ["Python", "TypeScript"],
    "Certifications": ["Machine learning certification (Stanford)", "CS50: comp. Sci. (Harvard University)"],
    Libraries: ["Pytorch", "Transformers" ,"unsloth", "ollama"],
    "Database & Backend": ["Hosted locally on a raspberry pi"],
    "Cloud & Deployment": ["Github","Vercel","self-hosted"],
    "Achievements": [
      "Top 3 Finalist – IEEE SoC @ BMSIT (2000+ participants)",
      "Empathy encyption hackathon winner @ 2025",
      "daydream hyderabad @ hackclub winner 2025",
    ],
    "Tool kit": ["uv", "archlinux","Git", "Docker", "Neovim"],
  },
};
