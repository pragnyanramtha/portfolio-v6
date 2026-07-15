import { StaticImageData } from "next/image";

import {
  AutopilotImage,
  AimoImage,
  CheatSheetAIImage,
  CloneImage,
} from "@/assets";

export interface IProjectData {
  LIVE_PREVIEW?: string;
  GITHUB?: string;
  LINK?: string;
  DESCRIPTION: string[];
  NOTE?: string;
  TECH_STACK: string[];
  IMAGE?: StaticImageData;
}

export const DATA = {
  HEADER: {
    NAME: "Pragnyan Ramtha",
    AGE: "18",
    PRONOUN: "he/him",
    HEADLINE: "Founder @agent7.dev • Prev. #1 on ARC-AGI Public Leaderboard",
    RESUME: "/resume.pdf",
    MEETING: "https://cal.com/pragnyanramtha",
    EMAIL: "mailto:pragnyanramtha@gmail.com",
    GITHUB: "https://github.com/pragnyanramtha",
    LINKEDIN: "https://www.linkedin.com/in/pragnyanramtha",
  },

  ABOUT_ME: {
    INTRO:
      "I built **[Agent7](https://agent7.dev)** solo, **a no-code platform to build AI agents** that run long autonomous sessions. **I've won 5 hackathons** and previously held **#1 on the ARC-AGI** public leaderboard. I've also contributed **70+ merged PRs** across the open-source ecosystem, including contributions to",
    OPEN_SOURCE: [
      { name: "openai-node", url: "https://github.com/openai/openai-node/pull/1885", highlight: true },
      { name: "langgraphjs", url: "https://github.com/langchain-ai/langgraphjs/pull/2409", highlight: true },
      { name: "pydantic-ai", url: "https://github.com/pydantic/pydantic-ai/pull/720", highlight: true },
      { name: "promptfoo", url: "https://github.com/promptfoo/promptfoo/pull/9255" },
      { name: "haystack", url: "https://github.com/deepset-ai/haystack/pull/11330" },
      { name: "mem0", url: "https://github.com/mem0ai/mem0/pull/5170" },
      { name: "chainlit", url: "https://github.com/Chainlit/chainlit/pull/2927" },
      { name: "agno", url: "https://github.com/agno-agi/agno/pull/7948" },
      { name: "fastmcp", url: "https://github.com/PrefectHQ/fastmcp/pull/4164" },
      { name: "dify-plugins", url: "https://github.com/langgenius/dify-plugins/pulls?q=is%3Apr+author%3Apragnyanramtha+is%3Amerged" },
      { name: "dstack", url: "https://github.com/dstackai/dstack/pull/3885" },
      { name: "opik", url: "https://github.com/comet-ml/opik/pull/6735" },
      { name: "mastra", url: "https://github.com/mastra-ai/mastra/pull/5098" },
    ],
  },

  EXPERIENCE: {
    Agent7: {
      WEBSITE: "https://agent7.dev",
      POSITION: "Founder",
      LOCATION: "Remote",
      DURATION: "2025 - Present",
      DESCRIPTION: [
        "Shipped a **no-code AI agent platform** from zero to production solo, connecting **1,000+ app connectors** and orchestrating **20,000+ tools** by building the full stack: agent engine, approval system, integrations, and no-code frontend.",
        "Enabled teams to hand off **20+ hours of weekly repeat work**, agents run autonomously for hours to days across research, outreach, CRM, and cross-app workflows by designing a long-running orchestration system with **approval-first safety controls**.",
      ],
      TECH_STACK: [
        "Next.js",
        "TypeScript",
        "AI Agents",
        "Full-Stack Development",
        "SaaS",
      ],
    },
    "Learnable India": {
      WEBSITE: "https://learnableindia.org/",
      POSITION: "Software Engineer",
      LOCATION: "Remote",
      DURATION: "Apr 2026 - Present",
      DESCRIPTION: [
        "Built **assistive software for blind learners** from scratch, shipping a learning portal with **screen-reader compatible workflows** by engineering accessibility-first interfaces and AI-powered assistance tools.",
        "Delivered **accessible class sessions for visually impaired students**, adapting tools and workflows for screen-reader compatibility across real-time sessions by **collaborating with educators and TEDx speakers** to design inclusive learning experiences.",
      ],
      TECH_STACK: [
        "Accessibility Engineering",
        "Accessibility",
        "Python",
        "Learning Portals",
        "AI Assistance",
      ],
    },
    "Reputation Dao": {
      WEBSITE: "https://reputationdao.com/",
      POSITION: "Agentic AI Developer",
      LOCATION: "Hyderabad, Telangana - Remote",
      DURATION: "Aug 2025 - Jan 2026",
      DESCRIPTION: [
        "Architected a GCP serverless backend achieving **99.9% uptime** by leveraging Cloud Functions and Cloud Run for production-grade AI orchestration.",
        "Reduced inference latency by **50%** across support workflows by engineering a Gemini API response system with optimized prompt caching.",
        "Boosted accuracy and trust by developing a RAG pipeline utilizing semantic search for real-time documentation retrieval and source attribution.",
      ],
      TECH_STACK: [
        "Web Development",
        "Full-Stack Development",
        "GCP",
        "Gemini API",
        "RAG",
        "Python",
      ],
    },
    "Six Axis Studios": {
      POSITION: "ML Engineer (Freelance)",
      LOCATION: "Remote",
      DURATION: "Feb 2025 - May 2025",
      DESCRIPTION: [
        "Researched **world-model approaches** for architecture workflows to generate **CAD-style design outputs** from spatial context and architect design intent.",
        "Prototyped **ML pipelines** that translated early architectural concepts into structured geometry, creating a faster path from design exploration to **CAD handoff**.",
        "Evaluated generated layouts against **architectural constraints** to improve reliability before model outputs were used in downstream design workflows.",
      ],
      TECH_STACK: [
        "Artificial Intelligence",
        "World Models",
        "CAD Generation",
        "Machine Learning",
        "Python",
      ],
    },
  },

  PROJECTS: {
    Agent7: {
      NOTE: "2025 - Present",
      LINK: "https://agent7.dev",
      DESCRIPTION: [
        "Built a no-code AI agent platform from scratch, solo. Agents connect to 1,000+ apps and run autonomous sessions for hours or days.",
        "Handles research, outreach, CRM updates, lead qualification, and cross-app workflows from plain English instructions.",
      ],
      TECH_STACK: [
        "Next.js",
        "TypeScript",
        "AI Agents",
        "Integrations",
        "SaaS",
      ],
    },
    "AIMO-3: Efficient Reasoning via LLM Fine-Tuning": {
      NOTE: "Dec 2025",
      LINK: "https://huggingface.co/pragnyanramtha/phi-4-math-rplus",
      DESCRIPTION: [
        "Fine-tuned Phi-4 (14B) on CoT and TiR datasets to optimize multi-step problem solving and tool-use efficiency.",
        "Achieved **90% accuracy** on reasoning benchmarks, rivaling 125B parameter models while utilizing significantly fewer compute resources.",
      ],
      TECH_STACK: ["Phi-4", "Fine-tuning", "CoT/TiR", "PEFT"],
      IMAGE: AimoImage,
    },
    "Personality Clone": {
      NOTE: "Oct 2025",
      LINK: "https://huggingface.co/pragnyanramtha/pragnyan-clone",
      DESCRIPTION: [
        "Fine-tuned a Large Language model, leveraging PEFT (QLoRA) and contrastive learning on private conversational data to emulate personal response style.",
        "Implemented a siamese network architecture with cosine similarity loss, which improved semantic embeddings and achieved **92% accuracy** in replicating my response style, a **28% improvement** over baseline models.",
      ],
      TECH_STACK: ["TensorFlow", "Python", "CUDA", "Transformers"],
      IMAGE: CloneImage,
    },
    Autopilot: {
      NOTE: "Aug 2025",
      LINK: "https://github.com/pragnyanramtha/autopilot",
      DESCRIPTION: [
        "Engineered an AI-driven OS automation system leveraging function calling and tool-use paradigms to execute complex natural language tasks to achieve low-level automation.",
        "Built a Reasoning + Acting agent framework with command sandboxing, reducing execution errors and achieving **45% faster task completion** than manual workflows.",
      ],
      TECH_STACK: ["Python", "LLM Agents", "APIs"],
      IMAGE: AutopilotImage,
    },
  },

  RESEARCH_PAPERS: {
    "Scaling Context Windows to Infinity: A Comprehensive Study of Position Encoding, Attention Mechanisms, Memory-Efficient Inference, and Context Reduction Techniques in Large Language Models":
      {
        DATE: "2026",
        VENUE: "Academia.edu",
        LINK: "https://www.academia.edu/162466927/Scaling_Context_Windows_to_Infinity_A_Comprehensive_Study_of_Position_Encoding_Attention_Mechanisms_Memory_Efficient_Inference_and_Context_Reduction_Techniques_in_Large_Language_Models?source=swp_share",
        DESCRIPTION:
          "A comprehensive analysis of techniques for extending context windows in large language models, examining position encoding strategies, efficient attention mechanisms, and memory-optimized inference approaches to enable processing of arbitrarily long sequences.",
      },
    "Unlocking Societal Trends in Aadhaar Enrolment and Updates: Anomaly Detection and Fraud Risk Prediction":
      {
        DATE: "2026",
        VENUE: "Academia.edu",
        LINK: "https://www.academia.edu/162466949/Unlocking_Societal_Trends_in_Aadhaar_Enrolment_and_Updates_Anomaly_Detection_and_Fraud_Risk_Prediction_A_Data_Driven_Approach_to_Identify_Suspicious_Patterns?source=swp_share",
        DESCRIPTION:
          "A data-driven approach to identify suspicious patterns in India's Aadhaar biometric identification system, utilizing machine learning for anomaly detection and fraud risk prediction in enrollment and update processes.",
      },
    "Speeding Up LLM Inference Using Quantum Computing Techniques": {
      DATE: "2026",
      VENUE: "In Progress",
      LINK: "",
      DESCRIPTION:
        "Exploring quantum-inspired algorithms and quantum computational primitives to accelerate inference in large language models, investigating quantum annealing for attention mechanisms and variational quantum circuits for efficient token generation.",
    },
  },

  EDUCATION: {
    "MRV UNIVERSITY": {
      DEGREE: "Bachelor of Engineering - Computer Science and Design",
      LOCATION: "Hyderabad, Telangana",
      DURATION: "Expected June 2029",
      GPA: "9.0/10",
      HIGHLIGHT: "Top 3 academic rank",
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
      TECH_STACK: [
        "Python",
        "Graph Neural Networks",
        "Natural Language Processing",
        "spaCy",
        "NetworkX",
        "Machine Learning",
      ],
    },
    "AI-analytics": {
      DESCRIPTION: [
        "A modern analytics dashboard that combines real-time data visualization with AI-powered insights.",
      ],
      TECH_STACK: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Shadcn UI",
        "Lucide React",
        "Framer Motion",
      ],
    },
    "ASCII webcam": {
      DESCRIPTION: [
        "A browser-based application that converts live webcam video into colorful ASCII art in real-time.",
      ],
      TECH_STACK: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "Canvas API",
        "MediaDevices API",
        "MediaRecorder API",
      ],
    },
    recipro: {
      DESCRIPTION: [
        "A decentralized social platform built on the Internet Computer blockchain. It allows users to post and interact without relying on centralized servers, with core logic implemented in Rust canisters.",
      ],
      TECH_STACK: [
        "Rust",
        "Dfinity SDK (DFX)",
        "Internet Computer (ICP)",
        "JavaScript",
        "HTML",
        "CSS",
        "Webpack",
      ],
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
    BioBloom: {
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
    deepResearch: {
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
    learnit: {
      DESCRIPTION: [
        "An AI-powered educational platform that brings history's greatest minds to life through interactive conversations.",
      ],
      TECH_STACK: [
        "Next.js 15",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion",
        "Lucide React",
        "Sensay API",
        "Cerebras API",
        "html2pdf.js",
      ],
    },
    "Dify Plugin – Real-time Stock Researcher": {
      DESCRIPTION: [
        "A Dify plugin that retrieves real-time stock prices and market data for given ticker symbols.",
      ],
      TECH_STACK: ["Python", "Dify", "Financial APIs"],
    },
  },

  SKILLS: {
    Languages: ["Python", "TypeScript", "Rust", "C", "SQL", "Bash", "Go"],
    "AI/ML": [
      "PyTorch",
      "Transformers",
      "Unsloth",
      "PEFT/QLoRA",
      "RAG Pipelines",
      "AI Agents",
      "LLM Fine-tuning",
      "CUDA",
    ],
    "Full-Stack": [
      "Next.js",
      "React",
      "Node.js",
      "Tailwind CSS",
      "PostgreSQL",
      "REST APIs",
      "SaaS Architecture",
    ],
    Infrastructure: ["GCP", "Docker", "Linux (Arch)", "Nix", "Git", "CI/CD"],
    Achievements: [
      "Prev. #1 on ARC-AGI Public Leaderboard",
      "70+ merged open-source PRs",
      "Winner, NIAT RAG Challenge",
      "Finalist, Smallest AI × IIT G",
      "Winner, IEEE Summer of Code 2025",
      "Winner, Empathy Encryption Hackathon 2025",
      "Winner, Daydream Hyderabad @ Hackclub 2025",
      "Top 0.5% Finalist, Shell AI Hackathon 2025",
    ],
    Certifications: [
      "Machine Learning Specialization (Stanford)",
      "CS50: Computer Science (Harvard University)",
    ],
    "Developer Tools": ["Neovim", "Arch Linux", "uv"],
  },
};
