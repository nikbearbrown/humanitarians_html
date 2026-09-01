---
title: "Mycroft Ep. 3: The Boring (and Essential) Work of Code Auditing"
seoTitle: "Mycroft Ep. 3: Code Auditing Before You Build"
description: "Amruta Naik audits a 100-recipe repository before writing new code, confirms a real gap, and sets up an honest recipe maturity status header."
summary: "Amruta Naik spends week three of Mycroft not writing code, but proving a vendor runway calculator doesn't already exist in a 100-recipe repository."
keywords: ["code repository audit before building", "vendor runway calculator recipe", "recipe maturity ladder status draft", "mycroft financial ai recipe spec", "checking existing code before building", "run log evidence recipe status", "humanitarians ai mycroft project", "avoid duplicating existing code"]
generated: "article"
---

Most builders want to start typing the moment an idea feels ready. Amruta Naik's third week on the Mycroft project is a deliberate exercise in not doing that. Instead of writing new scoring code, she spent the week checking whether the thing she wanted to build already existed somewhere in the repository, and writing down honestly what state her own work was actually in.

## The trap of building before checking

The problem Amruta describes is one every builder eventually falls into: excitement to build outruns the discipline to check whether someone already built it. In a repository holding 100 recipes, there is a real chance an idea already exists in some form. Skip the check and the best case is duplicated work; the worst case is shipping a second, slightly worse version of something the team already trusts. The fix isn't clever, just disciplined: before writing another line of scoring code, search the whole library first.

## Confirming a real gap, in writing

Amruta searched the entire hundred-recipe library for anything doing runway or financial health work and wrote down an actual verdict rather than a hunch. Her finding: no recipe in the library computes vendor runway as a standalone, sourced, gated artifact. The closest match mentions runway in passing inside a larger multi-agent brief, but never actually computes it. That gap is now documented, not assumed, which is the entire point of doing the search in the first place.

## Writing an honest recipe spec

With the gap confirmed, Amruta wrote the formal recipe specification, the machine-readable header sitting at the top of the recipe that states what it is and, crucially, what state it's in. She set the status to draft, with each open field acting as a placeholder for work not yet done. The header functions as a promise: the label always has to tell the truth about how mature the recipe actually is, never how mature anyone wishes it were.

## Earning your way up the maturity ladder

That honesty principle extends into a maturity ladder every recipe climbs: draft, specified, runnable, sample, and up. A recipe doesn't move a rung because someone feels ready to promote it. It moves because there's evidence in the run log to justify the promotion. This week's recipe earned its first honest label, and every future rung it climbs will need to be earned the same way, with logged evidence rather than a status change made on faith.

## Key takeaways

- Search the full repository and write down an actual verdict before building anything new, rather than assuming a gap exists.
- A machine-readable status header (draft, specified, runnable, sample, and so on) keeps a recipe's stated maturity honest.
- Recipes only move up the maturity ladder when run log evidence justifies the promotion, never just because it feels time.
- The unglamorous auditing week is what makes the more visible, "glamorous" weeks of a project trustworthy.

## Try it yourself

Before starting your next feature or project, spend twenty minutes doing what Amruta did: search whatever repository or system you're adding to and confirm, in writing, whether your idea already exists. Then write one honest sentence about what state your own work is really in, not the state you wish it were. That habit is central to how the Mycroft project, part of Humanitarians AI's fellow-driven work, builds tools people can actually trust.
