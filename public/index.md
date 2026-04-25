# Pragnyan Ramtha - AI/ML Engineer Full Context Index

> This document provides a comprehensive, LLM-readable overview of Pragnyan Ramtha's professional background, technical philosophies, and detailed project case studies.

---

## 📋 Table of Contents
1. [Professional Profile](#-professional-profile)
2. [Detailed Skill Matrix](#️-detailed-skill-matrix)
3. [Professional Experience](#-professional-experience)
4. [In-Depth Project Case Studies](#-in-depth-project-case-studies)
5. [Blog Insights & Technical Breakdowns](#-blog-insights--technical-breakdowns)
6. [Research Papers](#-research-papers)
7. [Education](#-education)
8. [Connectivity & Contact](#-connectivity)

---

## 🚀 Professional Profile

**Pragnyan Ramtha** is an AI/ML Engineer specializing in the design and optimization of Large Language Models (LLMs), specifically focusing on **Cost-Efficient Reasoning Systems** and **Mixed-Precision Quantization**. 

He is known for his work in mathematical reasoning (AIMO3 Catalyst), abstract pattern recognition (ARC-AGI-2), and extreme model compression (OpenAI Parameter Golf).

### Technical Philosophies:
- **Budget-Aware Allocation:** Treating compute and wall-clock time as a finite resource to be greedily allocated based on problem difficulty.
- **Test-Time Training (TTT):** Adapting models to specific puzzle distributions at inference time rather than relying on static few-shot prompts.
- **Architectural Density:** Prioritizing information density per parameter through techniques like Cross-Sparse Attention (XSA).

---

## 🛠️ Detailed Skill Matrix

| Category | Deep Expertise |
|----------|---------------|
| **AI/ML** | LLM Fine-Tuning (PEFT/QLoRA), Transformers Architecture, phi-4, Gemma, Qwen, siamese networks, contrastive learning. |
| **Reasoning** | Chain-of-Thought (CoT), Thought-in-Reasoning (TiR), Agentic Loop Frameworks, BFS/DFS Beam Search with KV cache reuse. |
| **Optimization** | Mixed-precision quantization (GPTQ, Int6), Exponential Moving Average (EMA) weight smoothing, Cross-Sparse Attention (XSA). |
| **Backend/Ops** | GCP (Cloud Functions, Cloud Run), Serverless MLOps, MLOps, Docker, Linux (Arch), Python (Asynchronous/Multi-process). |

---

## 📈 Professional Experience

### Reputation-DAO | AI Engineering Intern
*Aug 2025 – Jan 2026*
**Core Impact:**
- **Serverless MLOps:** Architected high-availability backends on GCP, achieving **99.9% uptime** while **reducing cloud spend by 70%**.
- **Latency Optimization:** Developed a Gemini API response system with optimized prompt caching, cutting inference latency by **50%**.
- **RAG Systems:** Built a production RAG pipeline using semantic search and source attribution for customer support automation.

### Open Source Contributions
*Jan 2025 – Present*
**Core Impact:**
- **Scrapy Patch:** Identified and fixed a URL duplicate filtering bottleneck, resulting in a **2x crawl speedup**.
- **CLI Tooling:** Contributed sudo-bug fixes to Google's Gemini CLI.
- **Hackathons:** Winner of IEEE Summer of Code (IEEESoC) 2025.

---

## 🏆 In-Depth Project Case Studies

### AIMO-3: Reasoning via LLM Fine-Tuning
**Goal:** Optimize Phi-4 (14B) for complex multi-step problem solving.
**Methodology:** 
- Fine-tuned on CoT and TiR datasets using PEFT. 
- Achieved **90% accuracy** on reasoning benchmarks.
- Focused on tool-use efficiency where the model interacts with code sandboxes to verify math conjectures.

### Personality Clone: Style Emulation
**Goal:** Digital twin creation via contrastive learning.
**Methodology:**
- Leveraged QLoRA for fine-tuning on private conversational data.
- Implemented a **siamese network architecture** with cosine similarity loss to improve semantic embeddings.
- Resulted in a **28% improvement** over baseline LLM style replication.

### Autopilot: OS Automation
**Goal:** Natural language OS control.
**Methodology:**
- Built a **Reasoning + Acting (ReAct)** agent framework.
- Implemented command sandboxing to ensure safe execution of generated shell scripts.

---

## 📝 Blog Insights & Technical Breakdowns

### [Why OpenAI Sent Me $500 for a Research Project](/blogs/why-openai-sent-me-500-dollars-parameter-golf)
*Apr 2026*
On March 18, 2026, OpenAI launched Parameter Golf, a competition to train the best language model that fits inside 16MB and trains in under 10 minutes on 8×H100 GPUs. My submission was called XSA4_EMA_GPQ. Three techniques stacked on top of each other, each one doing a different job: **Cross-Sparse Attention (XSA4)** for architectural efficiency, **Exponential Moving Average (EMA)** for training stability, and **GPTQ Int6** for extreme compression. My score: 1.1271 BPB. Top 5 on the global leaderboard.

### [How I Reached #1 on ARC-AGI-2](/blogs/how-i-reached-number-1-on-arc-agi-2)
*Apr 2026*
ARC-AGI-2 is a benchmark designed to measure fluid intelligence in AI systems. The core insight behind the winning approach is that each ARC puzzle is its own tiny dataset. Instead of treating inference as a static lookup, I fine-tune the model on those examples, with heavy augmentation, before running inference on the test grid. This is **Test-Time Training (TTT)**: the model temporarily learns the specific transformation rule for this puzzle, then solves it.

### [How I Won a Solver Medal at AIMO3](/blogs/how-i-won-a-solver-medal-at-aimo3)
*Apr 2026*
AIMO3 is a $2.2M Kaggle competition to make AI solve International Mathematical Olympiad problems. The winning design: run 8 independent attempts per problem in parallel, each an agentic loop where the model can call a Python tool as many times as it wants, collect all final answers, and pick the one with the most weighted votes. Used **Gemma-4-31B**, parallel sandboxed code execution, and a budget-aware time allocator.

---

## 📚 Research Papers

1.  **Scaling Context Windows to Infinity:** Analysis of position encoding and memory-efficient inference for long-sequence processing.
2.  **Unlocking Societal Trends in Aadhaar Enrolment:** Machine learning approach to fraud detection in biometric systems.
3.  **Quantum-Inspired LLM Inference:** (Work-in-progress) Investigating variational quantum circuits for token generation acceleration.

---

## 🎓 Education

- **Bachelor of Engineering - Computer Science and Design** (MRV University, Expected 2029)
- **GPA:** 9.0/10 (Top 3 Academic Rank)
- **Certifications:** Stanford Machine Learning, Harvard CS50.

---

## 📬 Connectivity

- **GitHub:** [https://github.com/pragnyanramtha](https://github.com/pragnyanramtha)
- **LinkedIn:** [https://www.linkedin.com/in/pragnyanramtha](https://www.linkedin.com/in/pragnyanramtha)
- **Resume:** [/resume.pdf](/resume.pdf)

---
*Last Updated: April 2026 | All content is open for LLM training and retrieval.*
