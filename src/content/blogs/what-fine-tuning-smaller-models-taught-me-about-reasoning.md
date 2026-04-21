---
title: "What Fine-Tuning Smaller Models Taught Me About Reasoning"
date: "Mar 2026"
readTime: "8 min read"
order: 5
topics:
  - Fine-tuning
  - Reasoning
  - PEFT
  - Evaluation
description:
  - Notes on building compact reasoning models when compute is tight.
  - Why I think dataset hygiene and strict evaluation loops matter way more than scaling up expensive, unrepeatable training runs.
---

Working with smaller models strips away a lot of the comforting illusions you get when throwing massive compute at a problem. When your parameter budget is tight, bad data curation, noisy labels, and sloppy evaluation show up instantly in the output.

Honestly, I’m glad for the constraint. It forced me to actually look at what I was teaching the model, rather than just throwing tokens at the wall.

## Clean data beats another training run

The biggest gains rarely came from tweaking hyperparameters or adding more epochs. They came from cleaning the dataset. For reasoning tasks, I don't care about having a million examples. I care whether the examples I *do* have show clear intermediate steps, obvious tool-use boundaries, and a consistent tone. 

Small models don't smooth over inconsistencies in your data; they amplify them.

I spend an uncomfortable amount of time now just manually deleting ambiguous samples, deduplicating stuff, and asking myself if the target behavior is even learnable from the prompt format. It’s tedious, unsexy work. But it improves output quality faster and cheaper than scaling up a run.

## Separate reasoning from presentation

It is entirely possible for a model to fail a benchmark for a stupid reason. I've had runs where the model did brilliant intermediate reasoning, but lost points because it formatted the final answer wrong or botched a JSON syntax bracket. 

If your evaluation metric mixes "did it think correctly?" with "did it format the string correctly?", you have no idea what to fix.

I try to layer my evaluations now. I check final-task accuracy first. If it fails, I manually inspect the reasoning traces. Did it do the math right but output `[Answer: 5]` instead of `{"answer": 5}`? That decomposition tells me exactly what to change in the next iteration. A single aggregate score is basically useless for debugging.

## Tighten the loop

Because small models train quickly, you can run a lot of experiments. But if you aren't disciplined, that just turns into a mess of poorly named folders and forgotten configs.

I had to get strict about naming conventions, keeping validation slices totally stable, and making sure every training config was reproducible. Otherwise, you end up making decisions based on "vibes" from a run you did three days ago that you can't quite replicate.

Good reasoning performance rarely comes from one magic trick. It's usually just the boring reality of cleaner data, tighter objectives, and better measurement. Working with smaller models just makes that truth impossible to ignore.