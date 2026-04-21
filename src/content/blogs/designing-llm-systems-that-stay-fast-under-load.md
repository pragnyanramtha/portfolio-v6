---
title: "Designing LLM Systems That Stay Fast Under Load"
date: "Apr 2026"
readTime: "6 min read"
order: 4
topics:
  - LLM Systems
  - Latency
  - Inference
  - Observability
description:
  - How I break a strict latency budget across retrieval, prompt assembly, inference, and post-processing when moving AI systems from a neat demo to actual production.
  - Engineering trade-offs I care about: caching, parallel execution, and why I sometimes deliberately pick a smaller model over a massive one.
---

We've all been there. You build an LLM demo, it feels snappy on your laptop, and you think you're ready. Then real traffic hits. Multiple users, bloated prompts, upstream tool calls—and suddenly your latency is entirely out of hand. At that point, latency isn't a model problem anymore. It's a systems problem.

I've learned to treat every request like I'm allocating a strict budget. Instead of obsessing over which model is objectively the "smartest," I look at where the time actually goes. How much on retrieval? Context building? Inference? Response shaping? Only then do I decide what to optimize.

## Start with a latency budget, not a model benchmark

The biggest trap is optimizing inference in a vacuum. In production, the model is just one piece of a messy pipeline. You've got vector search, database lookups, assembling the prompt, running safety checks, and formatting the output. 

If my total response budget is two seconds, I assign hard caps to each stage before I even think about touching the infrastructure or swapping models.

It completely changes the conversation. Say your pipeline spends 900ms on retrieval and 700ms on model generation. You don't need a more expensive frontier model. You need better chunking. You need more selective context. Stop blocking calls. Raw tokens per second is a vanity metric. End-to-end time for a good answer is the only thing that matters.

## Stop queueing things that don't need to wait

Running tool calls in parallel is honestly one of the easiest wins, assuming the dependencies are actually independent. If you need to pull documentation, look up a user profile, and load a policy, there is absolutely no reason those should queue behind each other. I've seen minor tweaks in orchestration buy back more latency than weeks of model fine-tuning.

And then there's caching. It only works if you're repeating something well-defined. I stick to caching stable prompt prefixes, common retrieval results, and deterministic post-processing. I rarely cache entire final responses unless the task is completely static. A stale, hallucinated-feeling answer is way worse than making a user wait an extra half second.

## If you aren't measuring it, you're guessing

Trying to fix latency without good instrumentation is just throwing darts in the dark. I need traces for every single stage. I want request IDs passing across services. And please, look at percentiles instead of averages. 

The P95 metric usually tells the ugly truth that the median hides, especially when one slow database call drags the entire user experience down.

At the end of the day, people want consistency. Users will tolerate a system that's a beat slower but predictable. But if it's lightning-fast one minute and stalls out the next? They lose trust instantly. That's exactly why I often go with a smaller, well-behaved model wrapped in bulletproof orchestration, rather than a giant model that only shines when the stars align.