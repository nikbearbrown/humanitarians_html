---
title: "From Model to Bill: Optimizing LLM Inference, Quantization, and LoRA | Sai Nikhil"
seoTitle: "Cutting LLM inference costs with quantization and LoRA"
description: "Sai Nikhil explains quantization, LoRA, and quadratic agentic token growth as the real levers for cutting LLM inference cost and latency."
summary: "Sai Nikhil breaks down how quantization shrinks model memory footprint, how LoRA and QLoRA cut fine-tuning cost by freezing base weights, and why quadratic token growth in agentic loops and output token cost drive the real dollar bill of running a model in production."
keywords: ["how to reduce llm inference cost", "quantization explained 8 bit 4 bit models", "lora vs qlora fine tuning cost", "why do agentic loops cost so much", "quadratic token growth agentic systems", "output tokens versus input tokens cost", "how to pick the cheapest model for a task", "weakest model that reliably handles a task eval"]
generated: "article"
---

Sai Nikhil draws a clear line between two different problems: training a model and running one. Training is mostly about capability. Running one in production is almost entirely about cost, memory, latency, and dollars. This walkthrough covers the mechanics that determine what a model actually costs once it ships.

## Two knobs that matter at inference

Two settings matter once a model is deployed. Temperature sets how sharply the model samples: low temperature is deterministic, high temperature is more creative and less reliable. Reasoning effort is often misread as switching to a different model, but it is really a budget, the same model given more room to work through a problem.

## Precision decides whether a model fits

Deployability is largely a question of numeric precision. A 7-billion-parameter model at 32-bit floating point takes up 28 gigabytes. Half precision cuts that in half. Eight-bit quantization brings it down to about 7 gigabytes, and 4-bit quantization brings it to roughly 3.5 gigabytes. Quantization can be symmetric or asymmetric, with asymmetric quantization carrying a zero point alongside a scale factor. It can also be applied after training, with a calibration pass, or during training itself, so the model learns to tolerate the coarser numeric grid from the start.

## LoRA and QLoRA: cutting the cost of customization

LoRA attacks a different cost: the cost of fine-tuning a model for a specific task. Full fine-tuning updates every weight in the model, which is expensive. LoRA instead freezes the original weight matrix and learns the update as the product of two much smaller, thinner matrices. QLoRA goes further, training those adapter matrices on top of a frozen 4-bit base model, combining the memory savings of quantization with the training-cost savings of LoRA.

## The harder question: which model to run

In production, the harder question is not which model is cheapest per token, but which model has the cheapest cost per successful task, counting tokens, retries, tool calls, latency, and the cost of being wrong. This reframing matters because a cheaper model that fails more often and needs more retries can end up costing more overall than a pricier model that succeeds on the first try.

## Why output tokens and agentic loops dominate the bill

Output tokens cost several times what input tokens cost and dominate latency. Input tokens are cheap individually, but they explode in agentic systems, where a naive multi-step loop grows the token count roughly quadratically as the conversation extends. That quadratic growth is often invisible until it shows up as a surprising bill or unexpectedly high latency. Token cuts made to save cost, if they quietly degrade accuracy, are a false economy: saving on tokens while increasing failure and retry rates can cost more in the end.

## The weakest model strategy

The practical strategy is to ask what the weakest model is that still works reliably for a given task, and answer that question on your own evaluation set rather than relying on general benchmarks. Precision decides whether a model fits in memory. LoRA decides what it costs to teach the model a specific task. The model you actually pick decides the bill. The recommended exercise is to take one task you run often, price it end-to-end including tokens, retries, and tool calls, then run the same task on the weakest model that might plausibly work, and compare the results on your own examples.

## Key takeaways

- Training cost and inference cost are different problems; deployability is mostly about precision, memory, and latency, not raw capability.
- Quantization shrinks a model's memory footprint dramatically: a 28GB model at full precision can shrink to about 3.5GB at 4-bit precision.
- LoRA freezes the base model's weights and learns a small update instead of fine-tuning every parameter; QLoRA trains those adapters on a frozen 4-bit base.
- Output tokens cost several times more than input tokens and dominate latency, while input tokens can grow roughly quadratically in agentic loops.
- The right model choice is the cheapest cost per successful task, not the cheapest per-token price, evaluated on your own task-specific examples.

## Who this is for

Engineers and teams deploying LLMs in production who need to understand where inference cost actually comes from and want a practical method for choosing the cheapest model that reliably completes a given task.
