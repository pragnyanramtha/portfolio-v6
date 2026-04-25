---
title: "Why OpenAI Sent Me $500 for a Research Project"
date: "Apr 2026"
readTime: "8 min read"
order: 1
topics:
  - Parameter Golf
  - OpenAI
  - Cross-Sparse Attention
  - GPTQ
  - Model Compression
description:
  - How I built XSA4 + EMA + GPTQ-Int6 to place top-5 globally in OpenAI's Parameter Golf challenge.
  - Explaining bits-per-byte, Cross-Sparse Attention, EMA smoothing, and what GPTQ actually does under the hood.
---

In March 2026, OpenAI launched "Parameter Golf." The challenge was simple: train the best language model you can that fits inside exactly 16MB, and trains in under 10 minutes on 8xH100 GPUs. 

They judge the models on a single metric: bits-per-byte (BPB) on a held-out slice of the FineWeb dataset. Their baseline scored 1.2244. I submitted a PR on March 22nd that scored 1.1271 BPB, landing in the top 5 globally. OpenAI sent me 500 bucks for the trouble.

My submission was a stack of three techniques: Cross-Sparse Attention (XSA4), Exponential Moving Average (EMA), and GPTQ Int6 quantization. Here is exactly what those are and why putting them together worked.

## What is bits-per-byte anyway?

BPB measures how well a model compresses text. If you used the model as a zip file, how many bits would it need to encode each raw byte of text? If it perfectly predicts the next character, it needs 0 bits. If it's guessing randomly, it needs 8 bits. English text theoretically has an entropy around 1.0 to 1.1 BPB. So we're basically trying to get a tiny model to compress text near the physical limit of the English language.

The nice thing about BPB is that it's tokenizer-agnostic. It looks at raw UTF-8 bytes. This stops people from gaming the leaderboard by using massive vocabularies to artificially lower per-token loss. Everyone is graded on the exact same scale.

## 16MB is incredibly small

At float32 precision, 16MB is only 4 million parameters. That's nothing. At int4, you get 32 million. The whole game is figuring out how to pack the smartest possible parameters into that tiny footprint, which means quantization is mandatory. And since you only have 10 minutes to train, you get maybe 5,000 gradient steps. Every architectural choice has to be highly efficient.

The baseline model was a 9-layer transformer with tied embeddings and int8 quantization. The top submission beat it by stacking architecture changes, clever training, and aggressive quantization. My submission focused on maximizing the utility of the available bits.

## Cross-Sparse Attention (XSA4)

Normally, a transformer runs self-attention at every single layer. Every token looks at every other token, all the way down. This eats up a massive amount of parameter budget for the Q, K, V, and output projection matrices.

Cross-Sparse Attention (XSA) just skips attention on the early layers. In my XSA4 setup, only the last 4 layers get self-attention. The early layers are just pure feedforward MLPs. 

This works because early layers mostly just learn local stuff—character patterns and basic syntax. They don't need a global view of the whole text. By ripping the attention heads out of the early layers, I freed up millions of parameters that I could reallocate to make the MLP layers wider and deeper. 

## Exponential Moving Average (EMA)

When you're training a model, the gradient updates jump around. The current weights of a model just reflect the very last step it took, which can be noisy and suboptimal. 

EMA fixes this by keeping a shadow copy of the weights. Every step, it updates the shadow copy slightly: `EMA_weights = 0.997 * EMA_weights + 0.003 * current_weights`. It creates a smoothed-out trajectory of the training run.

The EMA weights almost always perform better at inference time than the raw final checkpoint, because they smooth out any weird aggressive steps the optimizer took at the very end. Evaluating on the EMA weights reliably dropped my BPB by 0.002–0.005. It only works if you train long enough, though; if you use EMA on a run shorter than 4,000 steps, it just averages in a bunch of garbage from the start of training.

## GPTQ with Int6 precision

GPTQ isn't just naive rounding. If you just take a float32 weight and round it to the nearest int8, you wreck the model. GPTQ looks at the Hessian of the loss to figure out which weights actually matter. When it rounds a weight and introduces an error, it mathematically compensates for that error by tweaking the neighboring weights.

I used GPTQ to crush the MLP weights down to 6 bits (int6). I left the attention projections at int8, because attention heads are way more fragile. This mixed-precision setup let me cram more MLP parameters into the 16MB budget without breaking the model's brain. 

## Why stack these three?

XSA4 gives you better architecture density. EMA gives you better training stability. GPTQ Int6 gives you better compression density. They attack the problem from three completely different angles, so they stack perfectly without interfering with each other.

I hit 1.1271 BPB, which was just 0.0081 off the #1 spot. The guy who won added self-generated GPTQ calibration—having the model generate its own calibration data to run GPTQ against, instead of using a static dataset. If I had to do it again, I'd steal that trick immediately.

## The real point of the competition

The $500 is whatever. The cool part is that the entire leaderboard is open source. All the code, weights, and training configs are public. 

OpenAI explicitly uses this to scout for junior researchers, but for the rest of us, it's just a fantastic sandbox. The tricks you use to cram a model into 16MB for a toy competition are the exact same tricks you use to run models on mobile phones or edge devices. Parameter Golf is just a disguised masterclass in model compression, and playing around with it taught me more than reading ten papers on the subject would have.