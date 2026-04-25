---
title: "How I Built a Custom Harness to Beat the TerminalBench Leaderboard — Using GLM"
date: "Apr 2026"
readTime: "13 min read"
order: 1
topics:
  - TerminalBench
  - GLM
  - Agent Harnesses
  - Benchmarking
  - Tool Use
description:
  - The harness I built around GLM for TerminalBench, covering entry-point discovery, enforced planning state, trace retention, and parallel subagents.
  - Why the leaderboard data convinced me that harness engineering can close the gap between a mid-tier model and frontier agents.
---

I still don't understand how the biggest AI labs in the world were perfectly fine stalling out at 63% on TerminalBench. We're talking about a benchmark of 89 tasks. I've seen junior devs solve most of these problems in an afternoon. That 63% number bothered me. A lot. I spent way too many late nights last year burning through whatever API credits I could scrape together, trying to figure out what was actually broken. So I went digging.

## What TerminalBench actually is

Most people hear "AI benchmark" and assume it's another multiple-choice test or a LeetCode snippet. TerminalBench isn't that. You get a fully isolated Docker container, a live terminal, and a strict time limit. The agent actually has to explore the environment, write code, run Bash commands, and fix the system so it passes human-written unit tests.

The tests absolutely do not care about your "reasoning traces". You either fixed the OCaml garbage collector or you didn't. Period.

And the wall-clock time limit is brutal. If an agent writes the perfect fix but runs out of time, it gets a zero. No partial credit.

## Why GLM?

The TerminalBench 2.0 leaderboard was boringly predictable. GPT-5.2 sitting at 62.9%. Claude Opus 4.5 at 57.8%. Everyone just sort of accepted that the only way to climb the ranks was to throw more parameters and cash at the problem.

Then there was GLM 4.6, sitting down at 24.5% using the Terminus 2 harness. It looked like a total dead end. But I kept looking at that gap and wondering—how much of that is the model just being dumb, and how much of it is the harness strangling it?

The original paper actually gives away the answer if you read closely. Gemini 2.5 Pro gets 15.7% using OpenHands. You take that exact same model, drop it into the Terminus 2 harness, and it jumps to 32.6%. The model didn't get smarter; the scaffold just stopped getting in the way.

## Reading ForgeCode properly

When the ForgeCode paper dropped with an 81.8% success rate, everybody lost their minds over the headline number. But I was obsessed with *why* it worked on this specific benchmark.

Spoiler: ForgeCode didn't win because their agent was a genius. They won because they systematically fixed every stupid way agents fail. Agents love to lose track of what they are doing. They love burning 10 minutes philosophizing during an execution step. They ignore silent tool failures and just keep happily hallucinating.

ForgeCode didn't try to fix this with some magical mega-prompt. They fixed it with infrastructure. They forced the agent to maintain its planning state at the runtime level. The harness dictated the thinking budget, not the LLM.

It suddenly made sense. ForgeCode treats the model like an unreliable intern. It doesn't trust it at all. And because the harness micromanages everything, a mid-tier model can punch way out of its weight class.

## The Meta-Harness paper

The other paper that lived rent-free in my head was Stanford's Meta-Harness. They tried to automate harness design entirely—making a model write better harness code based on past failures.

Their ablation study is what got me. If you gave the optimizer just the scalar scores, it hit 34.6% accuracy. If you gave it summarized traces, it somehow did *worse*. But if you fed it the raw, unedited execution traces? 50.0% accuracy.

Summarizing the logs actively destroyed the signal. The model needed the raw stderr. It needed the exact dumb command that failed and the precise line number.

This is when I realized what agents are actually missing. It isn't reasoning. It's memory. An agent will hit turn 15 and completely forget the context of the error it saw on turn 3. Every existing harness was trying to save tokens by compressing history, and in doing so, they were throwing away the exact information the agent needed to course-correct.

## The architecture I built

I took those two concepts and basically welded them together.

**Layer 1: Entry-point discovery.** I hate watching an expensive LLM burn its first, highest-budget reasoning turn just running `ls` to figure out where it is. Before the main agent even wakes up, I run a dirt-cheap pass to scan the task and file tree, pinpointing the 3-4 files that actually matter.

**Layer 2: Runtime-controlled thinking budget.** The first 10 turns get a massive reasoning budget. That's planning mode. From turn 11 onward, the budget drops to the floor. You shouldn't be writing essays when you just need to execute `npm install`. The reasoning budget only spikes again if a test fails and the agent needs to figure out why. I enforce this at the infrastructure level. The prompt doesn't get a vote.

**Layer 3: Todo-write enforcement.** I completely stole this from ForgeCode. The harness literally refuses to execute the next tool call unless the agent has updated its task state log. Yeah, it's annoying, but it effectively eliminated the problem where an agent forgets what it was trying to do three steps ago.

**Layer 4: Full trace filesystem.** This is the part where the Meta-Harness completely changed how I think. Every single tool call, weird output, and exit code gets dumped into a structured local buffer. No compression. No summarizations. If the agent hits a wall on turn 20, it can just run `grep -r "exit_code=1" .traces/` and pull up the exact error from turn 4 that it's been compounding ever since.

I'm so confident about this because of the ablation the Stanford team ran. They tested three ways for the Meta-Harness proposer to look at history:

The summaries didn't just fail to help—they made things actively worse than just giving the model a raw score. Compressing traces strips out the exact context you need to track a failure back to its root cause. When the proposer could read everything—raw code, stderr, tool calls—it could form actual causal hypotheses and fix things. When it only had summaries, it was basically flying blind.

I apply that exact same logic at inference time. The agent running the task right now needs that same diagnostic access. The trace filesystem lets GLM, which has a smaller context window and weaker baseline than Claude Opus, punch way above its weight class, entirely because it doesn't evict its own history just to save tokens.

Look, the token cost is real. I won't pretend it's free. But the paper proved that the accuracy you buy back from having raw trace access—they were passing 10 million tokens of diagnostic context per iteration—is worth way more than what you spend on it.

**Layer 5: Subagent parallelization.** If a task can be broken down—like checking syntax across five files, waiting for a build step, or running parallel searches—I spin off cheap subagent calls with near-zero thinking budgets. The main thread doesn't sit around blocked. On TerminalBench, cutting wall-clock time directly translates to passing instead of failing.

## How the Meta-Harness loop actually works

The outer loop described in the paper is conceptually dead simple, but practically insane. It looks like this:


Initialize D with seed harnesses (e.g., Terminus 2, Terminus-KIRA)

For N iterations:
  → Proposer (Claude Code) queries filesystem D via grep/cat
  → Inspects source code + scores + execution traces of all prior candidates
  → Forms causal hypotheses about failure modes
  → Proposes new harness code
  → New harness is validated (interface check), then evaluated
  → (new harness, scores, traces) → stored in D

Return Pareto frontier over D

The key word there is *filesystem*, not *context window*. The proposer reads a median of 82 files per iteration. It pulls in over 20 prior candidates in a single search step. The total diagnostic info can hit 10 million tokens per iteration. That’s roughly three orders of magnitude more than whatever other text optimizers like OPRO or TextGrad are ingesting per step.

The loop is deliberately barebones. There's no hardcoded parent-selection rule, no fixed mutation operators, no predefined templates. The proposer decides what to inspect, what failures matter, and whether to patch a few lines or rewrite the whole thing. By delegating the diagnosis entirely to the coding agent, the system just automatically gets better as coding agents get better.

The search trajectories they published show exactly why this matters. Early on, the proposer made a combined structural fix and a prompt edit. Both candidates regressed. Instead of just abandoning the idea, the proposer hypothesized that the regressions were confounded—it had changed two things at once, so it couldn't isolate the failure. It split the changes, tested them separately, and found the additive modification that became the best candidate.

That is not a scalar score telling you "0.34." That is a causal reasoning chain. You only get that from raw, messy traces.

## What Meta-Harness discovered that nobody hand-engineered

People gloss over the most interesting result in the entire paper: the discovered harness for IMO-level math problems transferred to five completely unseen models, getting an average 4.7 point gain over no retrieval. Nobody sat down and designed this strategy. The loop found it by grinding through a 500,000-problem corpus and discovering *how* to retrieve, not just *whether* to retrieve.

The same logic applies to coding. The TerminalBench harnesses it found weren't just brittle, overfit solutions with hardcoded strings (the authors checked for this explicitly). They were genuinely reusable context-management strategies that worked because they accurately modeled how agents actually fail.

For Haiku 4.5, that approach got 37.6%—number one on the leaderboard, beating Goose, Terminus-KIRA, Mini-SWE-Agent, and every other hand-engineered scaffold in its tier.

For Opus 4.6, it hit 76.4%—number two overall, sitting right behind ForgeCode's 81.8% (which the paper notes couldn't even be reproduced from their public code alone).

That’s the bar I’m trying to hit.

## The numbers

The baseline for GLM 4.6 on TerminalBench-2 using the default Terminus 2 harness was a pathetic 24.5%. That's the floor. That's the model's raw capability when wrapped in a neutral scaffold that ignores its specific failure modes.

When I finally got GLM running inside my custom harness on the local subset of tasks I could afford, the jump was honestly kind of shocking. The gains hit exactly where the paper predicted they would:

- **Execution errors:** Stupid stuff like missing executables, silent build failures, or broken PATHs basically vanished. The trace buffer gave the agent the full diagnostic chain to `grep` its way out of the mess.
- **Context loss failures:** These dropped to almost zero, entirely thanks to the todo-write enforcement in the loop.
- **Verification failures:** Where the agent randomly stops before confirming tests pass—these got caught by the reasoning spike on verification triggers.

The only time it still choked was on genuine domain knowledge gaps. Differential cryptanalysis. Low-level memory allocator tasks. You can build the greatest harness in the world, but it can't install knowledge the model simply doesn't have.

But for the vast majority of tasks where the failure was just sloppy agent engineering—forgetting context, ignoring errors, burning the clock—the harness moved the needle completely.

## What's next

I haven't run the full official leaderboard yet. Running 89 tasks across multiple trials requires massive scale on Daytona containers, and frankly, I don't have the API credits for it. I’ve only been running on a local subset.

But I know the architecture works. Hustling the compute to run the full evaluation is next on my list.

Look, frontier models are insanely expensive. GPT-5.2 burned 137.5 million input tokens just to get that 62.9% score on 74 tasks. GLM is cheap enough that a 17-year-old in Hyderabad can actually iterate on it. If a hyper-optimized harness can close even half the gap between a mid-tier model and a frontier one, the cost-performance math of this whole industry changes. 

And that's exactly what I'm trying to prove.