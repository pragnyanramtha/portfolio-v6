---
title: "How I Reached #1 on ARC-AGI-2"
date: "Apr 2026"
readTime: "7 min read"
order: 2
topics:
  - ARC-AGI-2
  - Test-Time Training
  - Qwen
  - Kaggle
  - Reasoning
description:
  - How I adapted my parallel agent setup from AIMO3 to hit the top of the ARC Prize 2026 leaderboard.
  - I used per-puzzle test-time training, a heavily restricted DFS beam search, and an augmented re-scoring trick to make it work.
---

ARC-AGI-2 is François Chollet's benchmark for measuring fluid intelligence in AI. It sounds like a fun puzzle game: you get a few input-output grid pairs showing a transformation rule, and you have to apply that rule to a new grid. The grids are just 10 colors, up to 30x30. No math, no text. Just pure pattern recognition. And yet, massive frontier models completely choke on it.

When I started looking at the competition, I realized I had already solved a variant of this problem during AIMO3. The domain was different, but the core issue was the same: managing a time budget across parallel solvers and aggregating votes. I figured I could adapt my old code. 

## The stuff that didn't work

My first try was just few-shot prompting. Show the model the training grids, ask for the test output. It bombed immediately. The rules in ARC are compositional, and greedy decoding gives you exactly one shot. If the model guesses wrong, there's no recovery.

Then I tried ensembling outputs by shuffling the order of the training pairs in the prompt. I hoped that seeing the examples in a different order might trigger a better guess. It didn't. The model was just generating the same confused garbage from slightly different angles. I needed the model to actually internalize the rule, not just stare at it in the context window.

## The fix: test-time training per puzzle

The big realization was that every ARC puzzle is basically its own micro-dataset. The training pairs are literal labeled examples of the rule you need. So, instead of treating this as a static inference problem, I fine-tuned the model on those specific examples *before* asking it to solve the test grid. 

I used Qwen3-4B in 4-bit quantization via Unsloth, wrapped in a LoRA adapter. For every single puzzle, I reset the LoRA weights, trained for one epoch on the puzzle's examples, and then ran inference. The base weights stay frozen. I ran this across two T4 GPUs using `mp.spawn`, feeding off a shared queue.

## Aggressive augmentation

Here's the catch: most puzzles only have 3 or 4 examples. Fine-tuning on 4 examples does nothing unless you manufacture more data. 

I wrote an augmentation pipeline to generate 16 variants per puzzle. I used transposes, rotations (90, 180, 270 degrees), and random color permutations. Every variant is technically the same underlying rule, just viewed differently.

The color permutation was the real lifesaver. ARC uses 10 colors, and models easily fall into the trap of learning color-specific shortcuts instead of the actual structural logic. By randomizing the colors across the augmented dataset, the model is forced to learn the geometry of the transformation.

## Turbo DFS and keeping it fast

Standard beam search is way too slow here because the vocabulary size of a normal LLM is massive. But ARC grids only use the digits 0-9, newlines, and an EOS token. That's 12 tokens. 

I built a custom DFS decoder I called `turbo_dfs` that only looks at those 12 tokens. It explores the solution space and aggressively prunes any path that looks sketchy (specifically, if the cumulative NLL score goes over `-log(0.2)`). 

To make it actually run fast, I reused the KV cache. When the search extends a node by one token, I pass the existing cache forward. The model only has to process the single new token, not the whole sequence. Since everything branches from the same puzzle context, only the first forward pass is expensive. 

## Augmented re-scoring

The beam search spits out multiple candidate grids. Picking the right one is tough because the beam score only tells you how fluent the output is, not if the rule is correct.

To filter them, I scored each candidate against the augmented versions of the puzzle. I'd create an augmented dataset where the candidate was assumed to be the correct answer, and then asked the model how well it predicted that outcome. 

A genuinely correct solution will hold up across rotations and color swaps. A fake solution that just happens to look plausible will fall apart the second you rotate it. I combined the beam score with the mean augmented score, and submitted the top two predictions.

## Bringing it over from AIMO3

Three things ported directly from my AIMO3 setup. 
First, the global time budget: a 12-hour wall clock with a 600-second reserve, capping each puzzle at 1200 seconds. 
Second, the parallel worker pattern sharing a multiprocessing queue. 
Third, the multiple-candidate voting structure. 

The only really new piece was the test-time training loop. In AIMO3, the model was fixed and the loop was about reasoning. Here, the model physically adapts to the puzzle first. 

## What happened next

I open-sourced the whole Kaggle notebook after my submission. Honestly, the reaction was wild. People forked it, threw in bigger Qwen checkpoints, beefed up the augmentations, and pushed the approach way further than I had time to. Seeing the code become a baseline for other teams was probably the best part of the whole thing.

If you want to push this further yourself, my advice is: get a bigger base model with more LoRA capacity, replace my hacky augmented re-scoring with a proper learned scoring function, and build a time allocator that cuts its losses early if a puzzle looks unsolvable.