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
  DESCRIPTION: string[];
  NOTE?: string;
  TECH_STACK: string[];
  IMAGE?: StaticImageData;
}

export interface IBlogData {
  SLUG: string;
  DATE: string;
  DESCRIPTION: string[];
  INTRO: string[];
  CONTENT: {
    HEADING: string;
    PARAGRAPHS: string[];
  }[];
  READ_TIME: string;
  TOPICS: string[];
  LINK?: string;
}

export const DATA = {
  HEADER: {
    NAME: "Pragnyan Ramtha",
    AGE: "17",
    PRONOUN: "he/him",
    HEADLINE:
      "AI/ML Engineer - Specializing in LLM fine-tuning and AI system design",
    RESUME: "/resumev5.pdf",
    EMAIL: "mailto:pragnyanramtha@gmail.com",
    GITHUB: "https://github.com/pragnyanramtha",
    LINKEDIN: "https://www.linkedin.com/in/pragnyanramtha",
  },

  ABOUT_ME: {
    INTRO:
      "Results-driven AI/ML Engineer specializing in Large Language Model (LLM) fine-tuning and AI system design. I design maintainable, production‑grade AI systems and can comfortably work with deep cloud infrastructure. I learn new tools fast and use AI as a force‑multiplier in my coding, designing, and research loops, which lets me move much faster while keeping systems reliable.",
  },

  EXPERIENCE: {
    "Reputation-DAO": {
      WEBSITE: "https://reputationdao.com/",
      POSITION: "AI Engineering Intern",
      LOCATION: "Remote",
      DURATION: "Aug 2025 – Jan 2026",
      DESCRIPTION: [
        "Architected a high-availability serverless MLOps backend on GCP (Cloud Functions, Cloud Run) for production grade AI orchestration, achieving 99.9% uptime while successfully cutting down on cloud costs by 70%.",
        "Engineered a Gemini API response system with optimized prompt caching, which significantly reduced API costs and delivered a 50% reduction in inference latency across critical workflows.",
        "Boosted accuracy of customer support bot by developing a RAG pipeline utilizing semantic search for real-time documentation retrieval and source attribution.",
      ],
      TECH_STACK: ["GCP", "Gemini API", "RAG", "Serverless", "Python"],
    },
    "Open Source Contributions": {
      WEBSITE: "https://github.com/pragnyanramtha",
      POSITION: "Github Contributor",
      LOCATION: "Remote",
      DURATION: "Jan 2025 – Present",
      DESCRIPTION: [
        "Served as a key contributor to 30+ open-source projects, focusing on bug fixes and core feature development.",
        "Identified a bottleneck in Scrapy causing severe latency, authored a fix that eliminated the drag and achieved a 2x speedup for affected workflows.",
        "Winner of IEEE Summer of Code (IEEESoC) Hackathon 2025, for open source contributions to multiple projects.",
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
        "Achieved 90% accuracy on reasoning benchmarks, rivaling 125B parameter models while utilizing significantly fewer compute resources.",
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
    Autopilot: {
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
    "Why OpenAI Sent Me $500 for a Research Project": {
      SLUG: "why-openai-sent-me-500-dollars-parameter-golf",
      DATE: "Apr 2026",
      READ_TIME: "8 min read",
      DESCRIPTION: [
        "A complete breakdown of how I built XSA4 + EMA + GPTQ-Int6, the submission that landed at 1.1271 BPB and placed top-5 globally in OpenAI's Parameter Golf challenge.",
        "Every technique explained from first principles: what bits-per-byte is, how Cross-Sparse Attention works, why EMA produces better weights than a single checkpoint, and what GPTQ actually does differently from naive quantization.",
      ],
      INTRO: [
        "On March 18, 2026, OpenAI launched Parameter Golf, a competition to train the best language model that fits inside 16MB and trains in under 10 minutes on 8×H100 GPUs. Submissions are judged on a single number: bits-per-byte (BPB) on a held-out slice of the FineWeb dataset. The baseline they shipped scores 1.2244. The current SOTA is 1.1147. I submitted PR #531 on March 22. My score: 1.1271 BPB. Top 5 on the global leaderboard. OpenAI sent me $500.",
        "My submission was called XSA4_EMA_GPQ. Three techniques stacked on top of each other, each one doing a different job. This post is exactly what each of them is, why it works, and why I picked this specific combination.",
      ],
      CONTENT: [
        {
          HEADING: "What bits-per-byte actually means",
          PARAGRAPHS: [
            "BPB stands for bits-per-byte. It answers a deceptively simple question: if you used this model as a compressor, how many bits would it need to encode each raw byte of text? A model that perfectly predicts every next character needs 0 bits, it already knows what's coming. A model that's completely random needs 8 bits per byte (since a byte has 8 bits of entropy). English text actually has a theoretical entropy of around 1.0–1.1 BPB. So every submission in this competition is trying to get a model to compress text nearly as well as the physical limits of English.",
            "BPB is tokenizer-agnostic because the denominator is always raw UTF-8 bytes, not tokens. This is important because models with different vocabulary sizes would otherwise be unfairly compared, a byte-level model that uses 256-token vocab and a BPE model that uses 16,384-token vocab would look wildly different on a per-token loss metric even if they model the same information. BPB normalises everything to the same denominator. Lower is strictly better.",
          ],
        },
        {
          HEADING: "The constraint: 16MB is nothing",
          PARAGRAPHS: [
            "At float32, 16MB gives you exactly 4 million parameters. At float16, 8 million. At int8, 16 million. At int4 (4 bits per weight), 32 million. The entire architecture game in this competition is about packing as many useful parameters as possible into that budget, which immediately makes quantization not optional, but central. The 10-minute training cap on 8×H100s means you can do roughly 4,000–6,000 gradient steps depending on sequence length and batch size. Every architectural choice has to earn its keep within that compute budget.",
            "The baseline model ships as a 9-layer, 512-dim transformer with a 1024-token vocabulary, tied embeddings, and int8 quantization. It scores 1.2244 BPB. The top submission improved that to 1.1147, a 9% compression improvement, by stacking techniques across quantization, architecture, and training strategy. My submission sits at 1.1271, contributing primarily through the combination of XSA4, EMA, and GPTQ Int6.",
          ],
        },
        {
          HEADING: "Cross-Sparse Attention (XSA4)",
          PARAGRAPHS: [
            "Standard transformer self-attention is applied at every single layer. Every token attends to every other token, at every depth of the network. This is expensive in terms of both compute and the number of parameters sitting in Q, K, V, and output projection matrices. Cross-Sparse Attention (XSA) is an architectural change: instead of running full self-attention at every layer, you run it only at specific layers, and make the other layers MLP-only. XSA4 means full self-attention is applied only at the last 4 layers of the model. Every earlier layer is pure feedforward.",
            "Why does this help? Two reasons. First, early layers in a transformer mostly learn local, position-sensitive features, things like character n-grams and short-range syntax. Full attention with a global receptive field is overkill for that job. Second, removing attention from early layers frees up parameter budget. The parameters you save on Q/K/V/O projections for those layers can be reallocated to wider MLP layers or more depth. XSA variants dominate 3 of the top 6 leaderboard slots. The intuition is correct: not every layer needs to see everything at once.",
          ],
        },
        {
          HEADING: "Exponential Moving Average (EMA)",
          PARAGRAPHS: [
            "During training, model weights are updated every step via gradient descent. At any given step, the current weights reflect the last gradient update, which is noisy, especially early in training when the loss surface is steep. Exponential Moving Average (EMA) maintains a shadow copy of the weights that is a smoothed version of the training trajectory. At every step, the EMA weights are updated as: EMA_weights = 0.997 × EMA_weights + 0.003 × current_weights. The shadow copy changes slowly, accumulating a weighted average of all past weight states with recent states contributing more.",
            "The key insight is that the EMA weights are almost always better than the final raw checkpoint for inference. The training optimizer takes aggressive steps to minimise loss quickly, those steps sometimes overshoot into slightly worse regions of the loss surface. The EMA smooths out those overshoots. When you evaluate at the end of training, you evaluate the EMA weights, not the raw optimiser weights. In practice, EMA at decay 0.997 reliably drops BPB by 0.002–0.005 compared to the raw final checkpoint, which in this competition is a meaningful gap. However, as other competitors discovered, EMA only helps when training is long enough, at under ~4,000 steps the shadow weights get contaminated by early poorly-converged states and can actually hurt.",
          ],
        },
        {
          HEADING: "GPTQ with Int6 mixed precision",
          PARAGRAPHS: [
            "GPTQ stands for Generative Pre-Training Quantization. It is a post-training quantization method that is much smarter than naive rounding. The naive approach is: take each float32 weight, round it to the nearest int8 value, done. GPTQ instead uses second-order information, specifically, the Hessian of the loss with respect to each weight, to figure out which weights are most sensitive to rounding error, and compensates for the error introduced by quantizing one weight by adjusting its neighbours. This is called error propagation with Cholesky decomposition, and it means GPTQ can quantize more aggressively while preserving nearly the same model quality.",
            "I used GPTQ with int6 precision for the MLP weights, 6 bits per weight instead of 8. Int6 fits more parameters in the 16MB budget than int8, and because GPTQ is compensating for rounding error rather than just hoping the model survives it, the quality degradation is minimal. The attention projections stayed at int8 because attention heads are more sensitive to weight perturbations. This mixed-precision strategy, int6 for MLP, int8 for attention, is the same philosophy as my AIMO3 work: allocate the budget where sensitivity is lowest, protect the budget where it matters most.",
          ],
        },
        {
          HEADING: "Why this combination specifically",
          PARAGRAPHS: [
            "XSA4 improves the architecture's parameter efficiency, you get the same modelling quality with fewer attention parameters, freeing room for deeper or wider MLPs. EMA improves the weight quality at inference time, the final model you submit is smoother and more generalised than any single checkpoint. GPTQ Int6 compresses the weights further into the 16MB budget without the quality loss that naive quantization would cause. Each technique attacks a different axis: architecture, training stability, and compression. They are additive because they don't interfere with each other.",
            "The combination lands at 1.1271 BPB, which is 0.0081 above the #1 slot. The top submission adds self-generated GPTQ calibration, after training, the model generates its own calibration sequences from its own distribution, collects Hessians from forward hooks, and runs GPTQ on those self-generated sequences rather than held-out data. That extra step is what closes the gap. In a future submission that would be the first thing I'd add on top of this stack.",
          ],
        },
        {
          HEADING: "What AIMO3 and ARC-AGI taught me here",
          PARAGRAPHS: [
            "The instinct that carried over from both competitions was: don't optimise the obvious thing in isolation. In AIMO3, I didn't just pick a better model, I built a better inference loop. In ARC-AGI, I didn't just prompt better, I fine-tuned per puzzle. In Parameter Golf, the obvious thing is to make the model smaller. The actual lever is information density per parameter, and XSA + EMA + GPTQ are three completely different angles on that same problem, architectural density, training-time density, and compression-time density.",
            "The budget allocation mindset also carried over directly. In AIMO3 I distributed wall-clock time across problems. Here I distributed bit budget across components, int6 where sensitivity is low, int8 where it's high, full attention only in the last 4 layers. It's the same greedy allocation logic, just the resource is bits instead of seconds.",
          ],
        },
        {
          HEADING: "The $500 and what it actually is",
          PARAGRAPHS: [
            "OpenAI awards prizes and compute credits to submissions that meaningfully advance the leaderboard or demonstrate novel technique combinations. PR #531, XSA4_EMA_GPQ, dated March 22, 2026. The competition is explicitly designed as a talent-scouting pipeline: top performers are considered for junior researcher roles in June 2026, including students and olympiad competitors.",
            "The $500 is less interesting than the fact that the submission is fully open source on the OpenAI repository, code, weights, and training config. The combination of XSA4 + EMA + GPTQ was immediately available for anyone to fork and extend. That's the real point of doing it publicly. The techniques that improve BPB in a 16MB toy competition are the exact same techniques that make models run on phones, edge hardware, and constrained inference budgets. Parameter Golf is a talent hunt dressed up as a compression challenge, and it turns out competing seriously in toy problems is one of the faster ways to learn real things.",
          ],
        },
      ],
      TOPICS: [
        "Parameter Golf",
        "OpenAI",
        "Cross-Sparse Attention",
        "GPTQ",
        "Model Compression",
      ],
    },

    "How I Reached #1 on ARC-AGI-2": {
      SLUG: "how-i-reached-number-1-on-arc-agi-2",
      DATE: "Apr 2026",
      READ_TIME: "7 min read",
      DESCRIPTION: [
        "How I adapted the parallel agent and budget allocation patterns I built for AIMO3 to reach the top of the ARC Prize 2026 leaderboard, using per-puzzle test-time training, a vocabulary-restricted DFS beam search with KV cache reuse, and augmented re-scoring.",
        "A breakdown of the full pipeline: what I tried, what finally worked, and the three engineering tricks that made the difference.",
      ],
      INTRO: [
        "ARC-AGI-2 is the second iteration of François Chollet's Abstract and Reasoning Corpus, a benchmark designed to measure fluid intelligence in AI systems. The task sounds deceptively simple: you're shown a few input-output grid pairs demonstrating some transformation rule, then asked to apply that same rule to a new input grid. The outputs are 10-color grids, up to 30x30. No math, no language, just pattern recognition and reasoning about spatial transformations. Frontier models with hundreds of billions of parameters still barely crack it.",
        "When I looked at this competition, the thing I kept coming back to was that I'd already solved a harder version of the core problem at AIMO3: time-budget-aware parallel solving with aggregated voting. The domain was completely different, but the skeleton was the same. I started adapting from there.",
      ],
      CONTENT: [
        {
          HEADING: "What I tried first",
          PARAGRAPHS: [
            "The natural first attempt was pure few-shot prompting, feed the model the training grid pairs as context and ask it to predict the test output. This fails almost immediately on ARC-AGI-2 because the transformations are compositional and often involve rules the model has never seen expressed in language. Greedy decoding gives you one guess and zero recovery mechanism when it's wrong.",
            "I also tried ensembling outputs from multiple random prompt orderings. Shuffling which training pair comes first changes what the model attends to, but without any actual adaptation, you're just sampling the same confused prior from different angles. The model doesn't know the puzzle any better after seeing the examples in a different order. What I actually needed was for the model to internalize the transformation rule, not just see it in context.",
          ],
        },
        {
          HEADING: "What finally worked: test-time training per puzzle",
          PARAGRAPHS: [
            "The core insight behind the winning approach is that each ARC puzzle is its own tiny dataset. The training pairs in the puzzle are literally labeled examples of the exact rule you need to apply. So instead of treating inference as a static lookup, I fine-tune the model on those examples, with heavy augmentation, before running inference on the test grid. This is Test-Time Training (TTT): the model temporarily learns the specific transformation rule for this puzzle, then solves it.",
            "I used Qwen3-4B loaded in 4-bit quantization with Unsloth, wrapped in a LoRA adapter with r=256 targeting all projection layers, embed_tokens, and lm_head. For each puzzle, the LoRA weights are reset to defaults, fine-tuned for one epoch on the augmented puzzle, and then used for inference. The base weights never change. This runs on two T4 GPUs in parallel via mp.spawn, with a shared puzzle queue, the same pattern I used for the kernel pool in AIMO3.",
          ],
        },
        {
          HEADING: "aggressive augmentation during training",
          PARAGRAPHS: [
            "A puzzle might have only 3 or 4 training pairs. Fine-tuning on 4 examples is almost useless unless you can manufacture more. The augmentation pipeline generates 16 variants per puzzle by composing three types of transformations: transpose, three rotations (rot90, rot90×2, rot90×3), and random color permutations. Each variant is a completely valid instance of the same underlying rule, just viewed from a different angle or with relabeled colors. After augmentation, the training set is large enough for the LoRA adapter to actually learn something.",
            "The color permutation is particularly important. ARC grids use 10 colors (0–9) and models trained purely on original grids can accidentally learn color-specific patterns instead of structural ones. Randomly permuting all color indices across every augmented variant forces the model to learn the transformation as a structural relationship, not a color shortcut. The same permutation is applied consistently to both input and output grids so the rule still holds.",
          ],
        },
        {
          HEADING: "turbo DFS with vocabulary restriction and KV cache",
          PARAGRAPHS: [
            "Standard beam search for grid generation is expensive because the vocabulary is the full tokenizer, tens of thousands of tokens. ARC grids only ever contain the digits 0–9, newlines, and the EOS token. That's 12 tokens total. I restricted decoding to only this ARC vocabulary and built a custom DFS decoder called turbo_dfs that explores the solution space depth-first, pruning any path whose cumulative NLL score exceeds -log(0.2). Paths that exceed the budget are abandoned early rather than completed and discarded at the end.",
            "The KV cache reuse is what makes this fast enough to be practical. Each node in the DFS tree corresponds to a partial grid sequence. When the DFS extends a node by one token, I pass the existing past_key_values cache from the parent node forward, the model only processes the single new token at each step, not the entire sequence from scratch. Since the search tree fans out from a shared prefix (the puzzle context), the first forward pass is the only expensive one. Everything after that is single-token extensions on top of cached activations.",
          ],
        },
        {
          HEADING: "augmented re-scoring to pick the best solution",
          PARAGRAPHS: [
            "The DFS beam search returns multiple candidate solutions for each puzzle, different grids that were all plausible under the model's distribution. Picking the right one is not trivial. The beam score (cumulative NLL) alone isn't a reliable signal because it only measures how fluent the output is, not whether it's actually the correct transformation. To get a better signal, I score each candidate solution against augmented versions of the puzzle: I create the augmented dataset with the candidate as the answer, then ask the model to score how well it predicts that candidate as the output across several augmented query-answer pairs.",
            "A correct solution should score well across all augmentations of the puzzle, because the same rule applies regardless of rotation or color permutation. An incorrect solution that looks plausible from one angle will typically score badly once you rotate the puzzle or permute the colors. The final ranking combines beam score and mean augmented score using two selection algorithms, score_full_probmul_3 and score_kgmon, and the top-2 predictions per puzzle are submitted as attempt_1 and attempt_2.",
          ],
        },
        {
          HEADING: "Adapting from AIMO3",
          PARAGRAPHS: [
            "Coming off AIMO3, three patterns carried over directly. First, the global time budget logic, a 12-hour wall clock with a 600-second reserve, and a per-puzzle hard cutoff at 1200 seconds. Puzzles that finish fast bank time for harder ones. Second, the parallel worker pattern, instead of a kernel pool, I had two GPU processes pulling from a shared mp.Manager queue, each handling a disjoint subset of puzzles. Third, the multiple-candidate-plus-voting structure, in AIMO3 it was 8 attempts voting on an integer answer, here it's DFS beams ranked by augmented scores. The framing is identical.",
            "The main new thing ARC-AGI-2 added that AIMO3 didn't need was the test-time training loop itself. In AIMO3 the model was fixed and the loop was multi-turn reasoning. Here, the model adapts to each puzzle before reasoning at all. That felt like a natural extension, instead of giving the model more turns, give it a few gradient steps first.",
          ],
        },
        {
          HEADING: "Open source and what came after",
          PARAGRAPHS: [
            "After the submission went through I open-sourced the full notebook on Kaggle. The response was way beyond what I expected. Other competitors forked it, swapped in larger Qwen checkpoints, extended the augmentation pipeline, and started building ensemble strategies on top of the turbo_dfs decoder. Within a few weeks, multiple teams had pushed the core approach further than I could alone, stronger LoRA configs, better augmentation seeds, refined scoring functions. Seeing the notebook become a foundation rather than just a personal submission was genuinely the most satisfying part of this.",
            "If you're looking at this to build something stronger: the highest-leverage changes I'd chase next are a larger base model with more LoRA capacity, a learned scoring function to replace the heuristic augmented re-scoring, and a smarter per-puzzle time allocator that uses early inference results to decide whether to keep training or cut losses and move on.",
          ],
        },
      ],
      TOPICS: [
        "ARC-AGI-2",
        "Test-Time Training",
        "Qwen",
        "Kaggle",
        "Reasoning",
      ],
    },
    "How I Won a Solver Medal at AIMO3": {
      SLUG: "how-i-won-a-solver-medal-at-aimo3",
      DATE: "Apr 2026",
      READ_TIME: "6 min read",
      DESCRIPTION: [
        "A walkthrough of the agentic system I built for AIMO3, the $2.2M Kaggle competition to make AI solve International Mathematical Olympiad problems, using Gemma-4-31B, parallel sandboxed code execution, weighted voting, and a budget-aware time allocator.",
        "What I tried, what flopped, and the three engineering tricks that actually moved the needle.",
      ],
      INTRO: [
        "AIMO3 is the third iteration of the AI Mathematical Olympiad Progress Prize, a $2.2M Kaggle competition backed by XTX Markets. You get one H100, zero internet, a five-hour clock, and 50 original olympiad-level math problems. Your model has to return a non-negative integer between 0 and 99999 for each one. That's it. No partial credit, no explanation score, just right or wrong.",
        "Previous winners scored 34/50 using GPU clusters. This edition bumped difficulty up to full IMO level, number theory, combinatorics, geometry, algebra, all in a single offline Kaggle notebook. I ended up with a solver medal, and this is what the pipeline looked like.",
      ],
      CONTENT: [
        {
          HEADING: "What I tried first",
          PARAGRAPHS: [
            "The obvious first attempt was a single-pass solver: load Qwen 3 base model, write a strong system prompt, generate once, extract the boxed answer. It works fine on textbook problems. It falls apart completely on IMO-level problems where the model needs to verify, backtrack, or test a conjecture numerically before committing. A single generation pass gives the model no feedback loop, it's just vibing with no error correction.",
            "I also tried building a verifier layer, a second model pass that reads the first model's solution and checks for logical errors. In practice this just doubled inference time and the verifier wasn't reliably better than the generator at catching mistakes. What I actually needed was not a smarter critic, but a way for the model to run code against its own reasoning mid-solution and course-correct on the spot.",
          ],
        },
        {
          HEADING: "What finally worked: parallel agents with voting",
          PARAGRAPHS: [
            "The winning design is dead simple in concept: run 8 independent attempts per problem in parallel, each attempt is an agentic loop where the model can call a Python tool as many times as it wants, collect all final answers, and pick the one with the most weighted votes. Each attempt runs in its own persistent Jupyter kernel, the model writes code, the sandbox executes it, the output goes back into the conversation, and the model keeps going for up to 128 turns or until the time budget runs out.",
            "Voting is weighted by a confidence proxy: attempts with fewer Python errors get higher weight. If 4 out of 8 attempts agree on the same answer before the timeout, the solver stops early, no point burning compute when the consensus is already clear. This early-stop at CFG.early_stop = 4 alone recovered significant wall-clock time on easier problems, leaving budget for the hard ones.",
          ],
        },
        {
          HEADING: "Trick 1 - preloading model files into OS page cache",
          PARAGRAPHS: [
            "Gemma-4-31B at full precision is a lot of disk to read at model load time. The standard transformers from_pretrained() call reads each shard sequentially, which is brutally slow on Kaggle's storage. Before calling from_pretrained(), I walk the entire model directory, collect every file, and read them all in parallel across 8 threads, each thread reads 1GB chunks and discards the data immediately. The only point is to force the OS to page those bytes into RAM so the actual model load hits cache instead of disk.",
            "This is not a transformers feature or an HF trick. It's just reading files before PyTorch needs them so the kernel has them warm. On the H100 node, this took about 40-50 seconds but saved several minutes off the actual model load. In a 5-hour competition where the first problem doesn't arrive until the model is loaded, that delta matters.",
          ],
        },
        {
          HEADING: "Trick 2 - a pool of 16 persistent Jupyter kernels",
          PARAGRAPHS: [
            "Instead of spawning a new Python process for each tool call, I initialize 16 AIMO3Sandbox instances at startup, each one is a full KernelManager with its own set of 5 ports, pre-loaded with math, numpy, sympy, itertools, collections, and mpmath at 64 decimal places. They sit in a thread-safe queue. When an attempt needs to run code, it grabs a kernel from the pool, executes, and puts it back after a %reset -f.",
            "This means kernel startup overhead happens exactly once per kernel per run, not once per tool call. With 8 attempts running in parallel, each doing multiple tool calls per turn, cold-starting kernels on demand would've been a catastrophe. The pool also made sandbox timeout handling cleaner, on timeout, I interrupt the kernel with km.interrupt_kernel() so it stays alive in the pool rather than dying and needing to be replaced.",
          ],
        },
        {
          HEADING: "Trick 3 - budget allocation across problems",
          PARAGRAPHS: [
            "Five hours across 50 problems averages to 6 minutes each, but olympiad problems are wildly uneven in difficulty. Spending 6 minutes on a combinatorics warmup and 6 minutes on a hard number theory problem is a bad trade. Instead, before each problem I compute remaining wall-clock time, subtract a 300-second reserve for each unsolved problem still in the queue, and allocate whatever's left to the current problem, capped at 900 seconds.",
            "This means easy problems that hit early-stop at 4 agreeing votes bank time for harder ones. Hard problems that need 8 full attempts and still have no consensus get the most budget. The system naturally weights time toward difficulty without any explicit difficulty classifier. It's just greedy allocation with a floor and ceiling, and it kept me from bleeding out on a single hard problem.",
          ],
        },
      ],
      TOPICS: ["AIMO3", "Gemma 4", "Math Reasoning", "Agentic LLMs", "Kaggle"],
    },

    "Designing LLM Systems That Stay Fast Under Load": {
      SLUG: "designing-llm-systems-that-stay-fast-under-load",
      DATE: "Apr 2026",
      READ_TIME: "6 min read",
      DESCRIPTION: [
        "A practical note on how I break a strict latency budget across retrieval, prompt assembly, inference, and post-processing when moving AI systems from demo to production.",
        "I focus on concrete engineering trade-offs such as caching strategy, parallel tool execution, observability, and the cases where a smaller model beats a larger default on total system throughput.",
      ],
      INTRO: [
        "Most LLM demos feel fast until real traffic arrives. Once multiple users, larger prompts, and upstream tool calls enter the loop, latency stops being a model problem and starts becoming a systems problem.",
        "My default approach is to treat every request like a budget allocation exercise. Instead of only asking which model is smartest, I map where time is spent across retrieval, context building, inference, and response shaping, then decide which parts deserve optimization first.",
      ],
      CONTENT: [
        {
          HEADING: "Start with a latency budget, not a model benchmark",
          PARAGRAPHS: [
            "The first mistake teams make is optimizing inference in isolation. In production, the model is just one segment in a longer path that includes vector search, database lookups, prompt assembly, safety checks, and formatting. If the total response budget is two seconds, I prefer assigning hard caps to each stage before changing infrastructure or models.",
            "This changes the conversation immediately. A pipeline that spends 900ms on retrieval and 700ms on model generation does not need a more expensive frontier model. It needs better chunking, more selective context, and fewer blocking calls. The useful metric is not raw tokens per second. It is end-to-end time for a good answer.",
          ],
        },
        {
          HEADING: "Use parallelism carefully and cache only what repeats",
          PARAGRAPHS: [
            "Parallel tool execution is one of the cleanest wins when dependencies are independent. If a system needs documentation retrieval, user profile lookup, and policy loading, those operations should not queue behind each other. Small changes in orchestration often recover more latency than model tuning.",
            "Caching only works when the repeated unit is well-defined. I usually cache stable prompt prefixes, frequently accessed retrieval results, and deterministic post-processing layers. I avoid caching entire final responses unless the task is obviously repetitive, because stale answers are usually more damaging than slightly slower ones.",
          ],
        },
        {
          HEADING:
            "Observability decides whether the system is actually improving",
          PARAGRAPHS: [
            "Latency work without instrumentation turns into guesswork very quickly. I want traces for every stage, request IDs across services, and clear percentiles instead of average-only dashboards. P95 usually tells a more honest story than the median, especially when one slow dependency drags the whole experience down.",
            "The practical goal is consistency. Users forgive systems that are slightly slower but predictable. They lose trust in systems that are fast on one request and stall on the next. For that reason, I often choose a smaller, better-behaved model with stronger orchestration over a larger model that performs well only under ideal conditions.",
          ],
        },
      ],
      TOPICS: ["LLM Systems", "Latency", "Inference", "Observability"],
    },
    "What Fine-Tuning Smaller Models Taught Me About Reasoning": {
      SLUG: "what-fine-tuning-smaller-models-taught-me-about-reasoning",
      DATE: "Mar 2026",
      READ_TIME: "8 min read",
      DESCRIPTION: [
        "A notes-driven write-up on building compact reasoning models under limited compute, covering dataset curation, PEFT setup, evaluation discipline, and failure analysis.",
        "The piece argues for tighter experiment loops, stronger benchmark hygiene, and reproducible training pipelines over oversized runs that are expensive to iterate on and difficult to trust.",
      ],
      INTRO: [
        "Working with smaller models removed a lot of comforting illusions from my training loop. When the parameter budget is limited, weak data curation, noisy labels, and vague evaluation show up immediately in the outputs.",
        "That constraint turned out to be useful. It forced me to think more carefully about what I was teaching the model, how I was measuring progress, and which failures were actually about reasoning versus simple formatting or retrieval errors.",
      ],
      CONTENT: [
        {
          HEADING: "Data quality changes more than another training run",
          PARAGRAPHS: [
            "The strongest lift usually came from cleaning datasets, not from increasing run count. For reasoning tasks, I care less about the total number of examples and more about whether the examples demonstrate clear intermediate steps, tool use boundaries, and consistent completion styles. Smaller models amplify dataset inconsistencies instead of smoothing them out.",
            "I now spend more time removing ambiguous samples, deduplicating near-copies, and checking whether the target behavior is actually learnable from the data format. That sounds less exciting than scaling a run, but it usually improves output quality faster and with far less cost.",
          ],
        },
        {
          HEADING: "Evaluation needs to separate reasoning from presentation",
          PARAGRAPHS: [
            "A model can fail a benchmark for the wrong reason. I have seen runs that produced strong intermediate reasoning but lost points because the answer format drifted, or because tool invocation syntax was inconsistent. If evaluation mixes reasoning quality with surface formatting, it becomes difficult to know what to fix next.",
            "My preferred approach is layered evaluation. First I check final-task accuracy. Then I inspect reasoning traces, failure clusters, and prompt sensitivity. That decomposition gives much better direction for the next iteration than a single aggregate score ever will.",
          ],
        },
        {
          HEADING: "Smaller models reward tighter experimental discipline",
          PARAGRAPHS: [
            "Because smaller models train faster, they encourage shorter and more disciplined feedback loops. That means clearer experiment naming, stable validation slices, and reproducible training configs. When those pieces are missing, teams end up remembering runs by intuition instead of evidence.",
            "The broader lesson is that reasoning performance is rarely improved by one dramatic trick. It usually comes from a steady pipeline of cleaner data, narrower objectives, and better measurement. Smaller models simply make that truth harder to ignore.",
          ],
        },
      ],
      TOPICS: ["Fine-tuning", "Reasoning", "PEFT", "Evaluation"],
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
      VENUE: "Under Research",
      LINK: "#",
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
    Languages: ["Python", "C++", "Bash", "SQL", "TypeScript"],
    "AI/ML Tools": [
      "PyTorch",
      "Transformers",
      "Unsloth",
      "NumPy",
      "Pandas",
      "Scikit-learn",
      "PEFT/QLoRA",
      "CUDA",
    ],
    Infrastructure: ["GCP", "Azure", "Docker", "Linux (Arch)", "Git"],
    Certifications: [
      "Machine learning certification (Stanford)",
      "CS50: comp. Sci. (Harvard University)",
    ],
    Achievements: [
      "Artificial Intelligence Mathematical Olympiad (AIMO) Silver Medalist",
      "Authored 2 Research Papers on Modern AI Optimization Techniques",
      "Winner, IEEE Summer of Code (IEEESOC) Hackathon 2025",
      "Winner, Empathy Encryption Hackathon 2025",
      "Winner, Daydream Hyderabad @ Hackclub 2025",
      "Top 0.5% Finalist, Shell AI Hackathon 2025",
    ],
    "Developer Tools": ["uv", "Neovim", "Arch Linux"],
  },
};

export type BlogPost = IBlogData & {
  TITLE: string;
};

export const BLOG_POSTS: BlogPost[] = Object.entries(DATA.BLOGS).map(
  ([TITLE, blog]) => ({
    TITLE,
    ...blog,
  })
);

export function getBlogPostBySlug(slug: string) {
  return BLOG_POSTS.find((post) => post.SLUG === slug);
}
