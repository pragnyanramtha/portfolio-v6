---
title: "How I Won a Solver Medal at AIMO3"
date: "Apr 2026"
readTime: "6 min read"
order: 3
topics:
  - AIMO3
  - Gemma 4
  - Math Reasoning
  - Agentic LLMs
  - Kaggle
description:
  - A breakdown of the system I built for AIMO3, a $2.2M Kaggle math competition. 
  - I used Gemma-4-31B, parallel sandboxed execution, weighted voting, and a nasty budget-aware time allocator to scrape a solver medal.
---

AIMO3 (the AI Mathematical Olympiad Progress Prize) is a $2.2M Kaggle competition where your model has to solve International Mathematical Olympiad problems. You get a single H100, a five-hour time limit, zero internet access, and 50 brutal math problems. The output has to be a single integer between 0 and 99999. No partial credit. 

Previous winners used massive GPU clusters to score 34/50. This time, everything had to run in a single offline Kaggle notebook, and the difficulty was cranked up to full IMO level—heavy number theory, combinatorics, the works. I managed to walk away with a solver medal. Here's how I did it.

## The first few attempts

My initial idea was pretty standard: load a Qwen 3 base model, write a heavy system prompt, generate a single answer, and extract the boxed integer. This works great on high school math. It completely explodes on IMO problems. The model needs to verify its own work, backtrack, and run numerical tests before committing. A single-pass generation is just the model hallucinating with confidence.

Next, I tried adding a verifier model to check the first model's work. It essentially just doubled my inference time, and the verifier wasn't even very good at catching logical errors. I realized I didn't need a critic—I needed the model to run Python against its own reasoning mid-thought so it could fix its own mistakes.

## What actually worked: Parallel agents and voting

The final architecture is conceptually really simple. I ran 8 independent attempts per problem in parallel. Each attempt is an agent loop where the model writes Python, a sandbox executes it, the output feeds back into the prompt, and the model keeps thinking. It can do this for up to 128 turns or until the clock runs out.

At the end, all 8 attempts cast a vote for their final answer. The votes are weighted based on a proxy for confidence: attempts that triggered fewer Python errors get more weight. If 4 out of the 8 attempts agree on the exact same answer before the time runs out, I kill the remaining runs early to save compute. That early-stop mechanism saved my life on the easier problems.

## Trick 1: Cheating the model load time

Gemma-4-31B is a massive file to load from disk. Standard `from_pretrained()` reads the shards sequentially, which is agonizingly slow on Kaggle's storage. 

Before even calling PyTorch, I wrote a script to walk the model directory and read all the files in parallel across 8 threads in 1GB chunks, throwing the data away instantly. The goal was just to force the OS to page those bytes into RAM so the actual model load hit the cache instead of the disk.

It took about 40 seconds to run, but saved several minutes off the actual model loading time. When you only have 5 hours and the clock is ticking before you even see the first problem, those minutes matter.

## Trick 2: A pool of persistent Jupyter kernels

I didn't want the overhead of spinning up a new Python process every time the model wanted to run a tool call. Instead, I initialized 16 `AIMO3Sandbox` instances right at startup. Each one is a persistent Jupyter kernel, pre-loaded with `numpy`, `sympy`, `itertools`, and `mpmath`. They sit in a thread-safe queue. 

When an agent needs to run code, it grabs a hot kernel from the pool, runs the code, wipes the variables with `%reset -f`, and throws it back in the pool. If a kernel times out, I just interrupt it with `km.interrupt_kernel()` to keep it alive. This kept latency incredibly low across 8 parallel agents.

## Trick 3: Budget allocation

Averaged out, you get about 6 minutes per problem. But IMO problems aren't average. Burning 6 minutes on a simple combinatorics warmup and only leaving 6 minutes for a nightmare algebra problem is a great way to lose.

Before every problem, I checked the remaining wall-clock time, subtracted a 300-second emergency reserve for each unsolved problem, and gave whatever was left to the current problem (capped at 15 minutes). 

Because of the early-stop mechanism, easy problems would finish fast and bank their leftover time. The hard problems that chewed through all 8 attempts naturally inherited the massive budget left over from the easy ones. It was just a greedy time allocator, but it kept the whole pipeline from bleeding out on a single roadblock.