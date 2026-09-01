---
title: "Chapter 1: The Move That Changed Everything"
seoTitle: "AlphaGo Move 37: The Move That Changed Everything"
description: "AlphaGo's move 37 against Lee Sedol explained through a four-part cycle of perceive, act, reward, and update, and why Amazon's hiring AI lacked it."
summary: "AlphaGo's famous move 37 against Lee Sedol is used to explain the perceive-act-reward-update cycle that makes a system genuinely agentic, and why Amazon's recruiting AI, missing that cycle, collapsed into biased pattern replication."
keywords: ["alphago move 37 explained", "lee sedol alphago game analysis", "perceive act reward update cycle", "amazon recruiting ai bias explained", "epistemically invisible constraint ai", "human decision node design", "what makes ai agentic vs automated", "alphago self play training explained", "ai reward signal design mistakes"]
generated: "article"
---

On March 13, 2016, in front of roughly 80 million viewers, a computer program playing Go placed a stone on the fifth row, twelfth column, and the reigning European champion at the commentary desk went silent. "It's not a human move," Fan Hui finally said. "I've never seen a human play this move." Lee Sedol, the eighteen-time world champion sitting across the board, got up and left the room for fifteen minutes. Two thousand years of professional Go had never produced that move, not because human players were too slow to find it, but because a very different kind of limitation was at work.

## The solution space is not what humans actually explore

The chapter's central distinction is between the full solution space, everything that could possibly be done in a domain, and what humans actually explore within it, a much smaller subset shaped by everything a person has been taught, every pattern memorized, every move already seen. From inside a domain, those two things feel identical. They are not. AlphaGo's training ran without the constraints that shape human intuition, and it found a move inside territory the human mind had simply never entered, not because it was smarter, but because it was different.

## The four-part cycle behind the move

That difference traces back to a specific architecture: perceive, act, reward, update. At each step, the system observes the full state of the board, all stones, all positions. It selects a move, guided by a policy network estimating the best option. After a completed game, it receives a reward signal that is exact and unambiguous, win or loss, with no noise or partial credit. Then its network weights adjust automatically: sequences that led to wins become more probable, sequences that led to losses become less probable. Then it starts over. This cycle, described as the minimum architecture that makes a system genuinely agentic rather than merely automated, ran millions of times through self-play, versions of AlphaGo competing against other versions of itself. No human ever told it which moves were good; the only signal was win or lose. Because no human doctrine was baked into that training loop, nothing in the system flagged move 37 as unusual. It evaluated the position as a position, estimated a win probability, and generated the move that followed from that estimate.

## What happens when the cycle is broken

The chapter sets this against a contrasting case: an automated recruiting tool Amazon built in 2014, trained on ten years of hiring data to surface the best candidates. It had perception, reading resume text, and action, ranking candidates. What it lacked was a reward signal tied to actual job performance and any update mechanism that could correct what that missing signal failed to measure. What it did have was ten years of hiring data reflecting a technology industry that had been male-dominated for decades, and the system learned those patterns directly, penalizing resumes from women's colleges and downgrading candidates whose resumes mentioned women's organizations. Amazon's own auditors caught it by 2015; the project was scrapped by 2018. Without a genuine reward signal and an update mechanism, the system wasn't an agentic tool at all, it was a pattern replication engine with no brakes: it could only replicate and amplify what it was shown, never correct it.

## Constraints that experts can't see from inside their own framework

Professional Go players weren't consciously avoiding the region of the board move 37 came from; that region simply never surfaced as a candidate within the pattern recognition built by decades of accumulated training. The chapter names this an epistemically invisible constraint, a limit on expert judgment that the expert cannot perceive from within their own framework. Every domain has them, medicine and finance included, and they mark exactly where a well-designed machine system is most likely to find something humans systematically miss.

## The human decision node

This leads to what the chapter calls the most important design concept in the material: the human decision node, the point in any human-machine workflow where a person has to exercise judgment the system's objective function cannot encode, a pharmacist overriding a drug interaction flag, a loan officer weighing whether a rejection reflects real risk or historical bias, a surgeon whose clinical intuition conflicts with a diagnostic AI. A well-designed node gives that person the machine's recommendation, its confidence level, the basis for the estimate, and its known failure modes. A poorly designed node presents the machine's output as a fait accompli, creating the illusion of oversight while actually producing rubber-stamp approval.

## The human side of the story

Lee Sedol returned from those fifteen minutes a different player, having rebuilt his model of the game. In the fourth match, he played move 78, a counter of such creative precision that AlphaGo's win probability crashed from 70% to 23% in a single step. Fan Hui said the same thing about this move that he'd said about move 37, "it's not a human move," but this time as a compliment. The encounter with a genuinely different reasoning architecture had expanded what Lee Sedol himself could find.

## Frequently asked questions

**Amazon's recruiting system had perception and action. What two elements was it missing?** Reward and update: a reward signal tied to actual job performance, and an update mechanism that could correct what that signal failed to measure. Without both, the system could only replicate and amplify the patterns in its training data.

**What are the three questions to ask about any system called "agentic"?** Is the perceive-act-reward-update cycle complete, does it perceive, act, receive an honest reward, and actually update? Is the reward signal measuring what actually matters, or a proxy that can be gamed? And is the human decision node designed for genuine judgment, or is it rubber-stamp approval dressed up as oversight?

## Key takeaways

- AlphaGo's move 37 came from a solution space human players had never explored, not superior intelligence, but the absence of centuries of accumulated human doctrine.
- The perceive-act-reward-update cycle, trained through millions of rounds of self-play with an unambiguous win/loss signal, is what separates a genuinely agentic system from an automated one.
- Amazon's 2014 recruiting tool lacked a real reward signal and update mechanism, so it replicated a decade of biased hiring data instead of learning from it.
- Epistemically invisible constraints exist in every expert domain, and they mark exactly where a well-built machine system is likely to find what humans systematically miss.
- A human decision node's quality depends on being handed a recommendation, confidence level, basis, and failure modes, not just an output to rubber-stamp.

## Who this is for

This chapter is for anyone trying to evaluate whether a system marketed as "agentic" actually deserves the label, and for anyone designing the human checkpoint inside an AI-assisted workflow. It's the kind of systems-level thinking about human-AI collaboration that Humanitarians AI's explainer content regularly returns to: not just what a machine can compute, but how well the human decision point around it is designed.
