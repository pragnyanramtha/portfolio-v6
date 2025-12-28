import { StaticImageData } from "next/image";

import { AutopilotImage, AimoImage, CheatSheetAIImage, CloneImage } from "@/assets";

export interface IProjectData {
  LIVE_PREVIEW?: string;
  GITHUB?: string;
  DESCRIPTION: string[];
  NOTE?: string;
  TECH_STACK: string[];
  IMAGE?: StaticImageData;
}

export const DATA = {
  HEADER: {
    NAME: "Pragnyan Ramtha",
    AGE: "17",
    PRONOUN: "he/him",
    HEADLINE:
      "AI Engineer - Building end‑to‑end LLM agents, automation systems, and production‑grade infrastructure",
    RESUME: "/resumev4.pdf",
    EMAIL: "mailto:pragnyanramtha@gmail.com",
    GITHUB: "https://github.com/pragnyanramtha",
    LINKEDIN: "https://www.linkedin.com/in/pragnyanramtha",
  },

  ABOUT_ME: {
    INTRO:
      "I design maintainable, production‑grade AI systems and can comfortably work with deep cloud infrastructure when needed. I learn new tools fast and use AI as a force‑multiplier in my coding, desigining, and research loops, which lets me move much faster while keeping systems reliable.",
        },

  EXPERIENCE: {
    "Reputation-DAO": {
      WEBSITE: "https://reputationdao.com/",
      POSITION: "AI Engineering Intern",
      LOCATION: "Remote",
      DURATION: "Aug 2025 – Jan 2025",
      DESCRIPTION: [
        "Architected a GCP serverless backend achieving 99.9% uptime by leveraging Cloud Functions and Cloud Run for production-grade AI orchestration.",
        "Reduced inference latency by 50% across support workflows by engineering a Gemini API response system with optimized prompt caching.",
        "Boosted accuracy and trust by developing a RAG pipeline utilizing semantic search for real-time documentation retrieval and source attribution.",
      ],
      TECH_STACK: ["GCP", "Gemini API", "RAG", "Serverless", "Python"],
    },
    "Various Open Source Projects": {
      WEBSITE: "https://github.com/pragnyanramtha",
      POSITION: "Open Source Developer",
      LOCATION: "Remote",
      DURATION: "2024 - Present",
      DESCRIPTION: [
        "Actively Contributed to 25+ open-source projects, across various organizations.",
        "Refactored and enhanced the codebase to boost maintainability, achieving an 80% developer satisfaction rate.",
        "Winner of IEEE Summer of Code (IEEESoC) Hackathon 2025, for my open source contribution to multiple projects.",
      ],
      TECH_STACK: ["Python", "TypeScript", "Git", "Docker", "CI/CD"],
    },
  },

  PROJECTS: {
    "AIMO-3: Efficient Reasoning via LLM Fine-Tuning": {
      NOTE: "Dec 2025",
      LINK: "https://huggingface.co/pragnyanramtha/phi-4-math-rplus",
      DESCRIPTION: [
        "Fine-tuned Phi-4 (14B) on CoT and TiR datasets to optimize multi-step problem solving and tool-use efficiency.",
        "Achieved 90% accuracy on reasoning benchmarks, rivaling 70B parameter models while utilizing significantly fewer compute resources.",
      ],
      TECH_STACK: ["Phi-4", "Fine-tuning", "CoT/TiR", "PEFT"],
      IMAGE: AimoImage,
    },
    "Personality Clone": {
      NOTE: "Oct 2025",
      LINK: "https://huggingface.co/pragnyanramtha/pragnyan-clone",
      DESCRIPTION: [
        "Fine-tuned a Large Language model, leveraging PEFT (QLoRA) and contrastive learning on private conversational data to emulate personal response style.",
        "Implemented a siamese network architecture with cosine similarity loss, which improved semantic embeddings and achieved 92% accuracy in replicating my response style, a 28% improvement over baseline models.",
      ],
      TECH_STACK: ["TensorFlow", "Python", "CUDA", "Transformers"],
      IMAGE: CloneImage,
    },
    "Autopilot": {
      NOTE: "Aug 2025",
      LINK: "https://github.com/pragnyanramtha/autopilot",
      DESCRIPTION: [
        "Engineered an AI-driven OS automation system leveraging function calling and tool-use paradigms to execute complex natural language tasks to achieve low-level automation.",
        "Built a Reasoning + Acting agent framework with command sandboxing, reducing execution errors and achieving 45% faster task completion than manual workflows.",
      ],
      TECH_STACK: ["Python", "LLM Agents", "APIs"],
      IMAGE: AutopilotImage,
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
    "CheatSheet AI": {
      DESCRIPTION: [
        "Using retrieval-augmented generation (RAG) and chain-of-thought prompting, I developed an AI system that generates contextual cheat sheets for various topics.",
        "Implemented semantic chunking with vector embeddings and multi-shot learning, improving content relevance and achieving 65% reduction in user study time compared to traditional learning methods.",
      ],
      TECH_STACK: ["Python", "LLM Agents", "APIs"],
      IMAGE: CheatSheetAIImage,
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
    Languages: ["Python", "TypeScript", "Bash", "C"],
    "Certifications": ["Machine learning certification (Stanford)", "CS50: comp. Sci. (Harvard University)"],
    "AI/ML": ["PyTorch", "Transformers", "Unsloth", "Scikit-learn", "PEFT/QLoRA", "RAG"],
    Infra: ["GCP", "Azure", "Docker", "Linux (Arch)", "Git"],
    "Achievements": [
      "Winner, IEEE Summer of Code (IEEESOC) Hackathon 2025",
      "Winner, Empathy Encryption Hackathon 2025",
      "Winner, Daydream Hyderabad @ Hackclub 2025",
      "Top 0.5% Finalist, Shell AI Hackathon 2025",
      
    ],
    "Tool kit": ["uv", "Neovim", "Arch Linux"],
  },
};
