---
title: "Bhavana's Week 01: Follow the Spec Until You Shouldn't"
seoTitle: "Follow the Spec Until You Shouldn't: Naming Rule"
description: "Bhavana Bhariday explains why codebase convention beats spec literalism when a new library's naming collides with an existing function name."
summary: "When a spec's recommended function name collides with a name already doing real work in your codebase, the codebase wins, and Bhavana explains exactly why."
keywords: ["codebase convention vs spec", "naming collision supabase", "create_server_client naming conflict", "loadbearing name test coding", "llm prompt audit naming collisions", "structured data seo job listings", "software architecture naming rule", "when to follow spec literally", "humanitarians ai fellows software engineering", "rename around a spec"]
generated: "article"
---
A technical specification tells you to name a function one way. Your codebase already uses that exact name for something else entirely. Who wins? Bhavana Bhariday, a Humanitarians AI fellow and SEO engineer working on Jobseeker, ran into this collision while doing what looked like routine work, and the rule she pulled out of it is worth knowing before you ever paste a spec's recommended name into your own code.

## The mission and the collision

The task for the week was straightforward on paper: give every job page on Jobseeker structured data that Google can actually read, so search results show up correctly and rank well. That work ran straight into a naming collision the specification never warned about. The specification called for a function named `create_server_client`, imported from `lib/supabase-server`. The problem was that the codebase already had a function with that exact name, imported from `supabase/ssr`, and it was the real client constructor already doing real work throughout the app. The codebase's own wrapper, built around the same concept, was called something different, `create_supabase_server_client`. Same underlying name at stake, two different meanings already in play.

## The rule: codebase convention beats spec literalism

Before getting into how the collision played out, the rule itself is worth stating plainly: when a spec tells you to name something, and that exact name is already doing a job in your codebase, you have three options. You can duplicate the existing logic under the new name, you can silently drop the spec's naming instruction, or you can keep your codebase's existing name and rename around the spec instead. Of those three, only the last one has no hidden cost. Duplicating logic creates two sources of truth that can drift apart. Silently dropping the spec's instruction creates confusion for the next person who reads the spec and expects to find that name. Renaming around the spec, keeping the codebase's convention and adjusting how the spec's instruction is applied, avoids both problems.

## Why this isn't about ignoring the spec

It would be easy to read this rule as "specs don't matter, do whatever your codebase already does." That's not the claim. The rule is narrower than that: the codebase wins only when the name in question is already load-bearing, meaning it's already attached to real, working logic that other code depends on. When there's no collision, the calculus flips entirely. On a fresh file, where a name like `create_server_client` means nothing yet because nothing in the codebase uses it, the right move is to follow the spec exactly. The name is free, and matching the documentation helps whoever reads the code next, since it lines up with what they'd find if they went looking at the library's own docs.

## The load-bearing name test

The distinction that decides which path to take comes down to one test: is the name already load-bearing in your codebase? If yes, no collision-driven exception applies, and the codebase's existing convention wins. If no, the spec's name is free to use, and following it exactly is the better choice because it costs nothing and helps future readers. One rule, but it points in opposite directions depending on whether the name is already spoken for.

## Auditing your own repo

The practical exercise that comes out of this is a prompt you can run against your own codebase before pasting in any spec-recommended name: check whether that identifier is already defined somewhere, and if so, decide which usage should win and why. A good answer to that prompt names exactly where the identifier already exists and picks a side with a stated reason. A bad answer either renames blindly without checking, or misses that the name was already taken in the first place. Running this check before adopting a spec's naming is a small habit that prevents a specific, avoidable class of bugs: two different pieces of logic quietly sharing one name.

## Key takeaways

- When a spec's recommended name collides with an existing, load-bearing name in your codebase, keep the codebase's convention and rename around the spec.
- The three options in a naming collision are duplicate the logic, silently drop the spec's name, or rename around it; only renaming around it avoids hidden costs.
- On a fresh file with no existing collision, follow the spec's naming exactly, since it's free and helps future readers match the documentation.
- The deciding test is whether the name is already load-bearing, meaning it's already attached to real, working logic elsewhere in the codebase.
- Before adopting any spec's recommended name, run a quick audit prompt against your repo to check whether that identifier is already defined and by what.

## Who this is for

This is for developers working with third-party libraries or specs that dictate specific function or variable names, especially when integrating something like Supabase into an existing codebase. It comes out of Bhavana's ongoing work as a Humanitarians AI fellow on the Jobseeker project's SEO and structured-data implementation.
