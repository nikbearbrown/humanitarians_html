---
title: "Why One Always-Present Token Secretly Hijacks Every Attention Statistic, YouTube metadata"
seoTitle: "Why Token Zero Hijacks Your Attention Statistics"
description: "Liam explains why the sentence-start token wins the attention max in transformer heads 91% of the time, and how excluding it reveals real dependencies."
summary: "Liam explains why token zero, the always-present sentence-start marker with no real content, wins the attention max in a transformer head 91% of the time, and why excluding it from a statistic reveals the actual subject-verb dependency underneath."
keywords: ["why does token zero dominate attention weights", "what is an attention sink in transformers", "how softmax forces attention mass somewhere", "why attention max statistic is misleading", "how to exclude sink token from attention analysis", "subject verb dependency hidden by attention sink", "checking if attention position is signal or sink", "mechanistic interpretability attention head analysis"]
generated: "article"
---

Someone assumes that when one token wins the attention max almost every time, it must be carrying the real signal. Liam explains why that assumption is backwards: it isn't signal, it's a sink, and understanding why changes how you should read any attention statistic.

## The finding: token zero dominates 91% of the time

Look at one real attention head, layer four, head three, across 50,000 sentences. Token zero, the sentence-start marker, wins the max-attention position in 91 percent of them, carrying more than half the total weight every single time. The verb-to-subject dependency that anyone studying this head would actually expect to find only becomes visible once token zero is excluded from the count.

## Why softmax has to put its mass somewhere

The natural guess is that if one position wins a statistic almost every time across thousands of unrelated sentences, it must be carrying the sentence's real meaning, since attention is supposed to point at what matters most. But softmax has to spend all of its probability mass on every single row, whether or not any position in that row actually deserves it. Token zero is present in every sequence and carries no sentence-specific meaning of its own, which makes it the cheapest place for a head to park leftover attention weight when nothing else is strongly preferred. That is not a discovery about meaning. It is simply where the math had nowhere else to go.

## The worked example

Take one sentence starting with that marker. The raw attention weights might read something like 0.58 on the marker itself, with far less spread across every actual content word. Run that same pattern across a thousand sequences and the marker wins the max attention position 94 percent of the time. Exclude just that one position from the count, and the real dependency, the verb pointing back to its subject, wins 68 percent of the time instead. The signal was there all along, just buried under the sink.

## What a dominant sink does and doesn't tell you

Seeing a sink dominate a head's max attention position does not mean that head learned nothing useful. The real signal can still be sitting in the rest of the row, it is just outweighed by the one reflex position the moment you only look at whichever position wins the max. Going the other direction, a head that does not lean heavily on token zero is not automatically trustworthy either. It might simply be parking its leftover weight on a different filler position instead, like a comma or a padding token.

## Masking reveals the real patterns

Mask out the known non-signal positions across the same head, and patterns that were invisible before light up across almost every row: real subject, object, and verb links. One always-present, meaning-empty token quietly wins nearly every attention statistic computed on that head. Excluding it before trusting what the rest of the pattern shows is the necessary step to actually see the structure underneath.

## Key takeaways

- Token zero, the sentence-start marker, won the attention max in one real head 91% of the time across 50,000 sentences, carrying over half the weight each time.
- Softmax must distribute its full probability mass on every row, making an always-present, content-empty token the cheapest place to park leftover attention.
- Excluding the sink position from a max-attention statistic can flip the dominant pattern, in the worked example, verb-to-subject dependency rose from invisible to winning 68% of the time.
- A head dominated by a sink token has not necessarily learned nothing, real signal can be present in the row but outweighed at the max position.
- A head avoiding one sink token isn't automatically clean either, it may be parking weight on a different filler position like a comma or padding token.

## Who this is for

Anyone doing interpretability work on transformer attention mechanisms, or building intuition about why raw attention statistics can mislead, will find this a concrete method for checking whether a dominant position is real signal or an attention sink.
