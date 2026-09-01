---
title: "Create Educational AI Tutors with GPT: How We Built Ada, Newton, and Grace"
seoTitle: "How We Built Ada, Newton, and Grace AI Tutors"
description: "Nik Bear Brown explains how custom GPTs built with simple prompts became calculus, physics, and algorithms tutors used in real Northeastern University courses."
summary: "Three custom GPT tutors, a calculus bot named Ada, a physics bot named Newton, and an algorithms bot named Grace, show how a single prompt file can become a real classroom teaching tool."
keywords: ["custom gpt educational tutor", "ada calculus gpt tutor", "newton physics gpt tutor", "grace algorithms gpt tutor", "chatgpt tutor for college courses", "northeastern university ai tutor", "custom gpt classroom prompts", "ai tutor scaffolding tone", "gpt plus account classroom tool", "professor bear ai tutors"]
generated: "article"
---

Funding anything new inside a university can take a year, even for something as small as a classroom tool. Custom GPTs sidestep that entirely: if one person has a GPT Plus account, they can build a chatbot tutor that serves hundreds of students in a class, at essentially no institutional cost or approval process. Nik Bear Brown, Professor Bear, walks through three of these tutors that are already running in real Northeastern University courses.

## Three tutors, three subjects

Out of the hundreds of custom GPTs built for various courses, three get the spotlight here. Ada is an introductory calculus bot used by Abby Williams in her class, providing step-by-step math guidance. Newton is an introductory physics bot used at Northeastern for intro physics classes taught by Shri and Tom Kelly, with dynamic visualizations built into its responses. Grace is an algorithms tutor built for an algorithms course, and its impact was visible in a very concrete way: after students started using Grace, office hours attendance dropped off almost entirely. A couple of people came the first week, and after that, students just used the chatbot to get their questions answered, a pattern visible both anecdotally and in the bot's usage statistics.

## How simple the build actually is

The technical bar for building one of these is low. It's fundamentally a matter of writing prompts, and the creators made the exact prompts for all three bots available for anyone to look at and reuse. Ada and the others took roughly half an hour to an hour to build initially. Grace, for instance, was written by Nik Bear Brown together with a collaborator, taking about an hour to get the bot working. Since then, instructors like Abby Williams have taken over refining and maintaining the prompts for their own bots, tuning tone and content to match how they actually want to teach.

## Real feedback, real usage

These bots aren't just built and forgotten. Surveys run on all three tutors show they average around 4.8 out of 5 with students. One story sticks out: a student who was afraid to ask questions in class because she felt she'd look unprepared in front of Abby directly turned instead to the chatbot, where that hesitation wasn't a barrier. That's a specific kind of value a bot can offer that office hours sometimes can't, a judgment-free space to ask a question that feels too basic to ask a person.

## Scaffolding, not answers

A specific design choice runs through all three tutors: they're built to scaffold learning rather than hand over answers. What every teacher actually wants from a tool like this is for it to explain why an answer is right when it's right, and why it's wrong when it's wrong, not just deliver a correct result. This gets demonstrated directly with Ada: a student can upload a photograph of a handwritten calculus problem, since students often work out equations on paper first, especially when the notation is hard to type or format correctly, and Ada will check the work, pointing out exactly what was done correctly and where a specific, often small, error crept in.

## Tone matters as much as content

Beyond correctness, tone was treated as a deliberate design element, not an afterthought. Abby specifically wanted Ada to be encouraging even when a student gets something wrong, which shows up clearly in how the bot responds: acknowledging what a student did right, being specific about what's incorrect, and being clear that a mistake doesn't erase the parts that were done well. That tone reportedly carries Abby's own personality into the GPT itself, encouraging and friendly even in the middle of correcting an error.

## Key takeaways

- Custom GPTs let a single instructor with a GPT Plus account build a course-specific tutor for hundreds of students, without institutional funding delays.
- Ada (calculus), Newton (physics), and Grace (algorithms) are all in active use in real Northeastern University courses.
- Grace visibly reduced office hours attendance, since students got their questions answered through the bot instead.
- The bots are designed to scaffold understanding, explaining why an answer is right or wrong, rather than just outputting a correct answer.
- Student survey ratings for all three tutors average around 4.8 out of 5, and instructors have taken over prompt-tuning their own bots' tone.

## Try it yourself

The full prompts and code behind Ada, Newton, and Grace are shared publicly for anyone who wants to build a similar tutor for their own course, work that grew out of Nik Bear Brown's collaboration with Northeastern University faculty and his nonprofit, Humanitarians AI.
