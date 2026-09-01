---
title: "EduTube QuizBuilder by Tanmay Zope"
seoTitle: "EduTube QuizBuilder: Turn YouTube Videos into Quizzes"
description: "A demo of EduTube QuizBuilder, a Python and Streamlit tool that turns any YouTube video into transcripts, summaries, lesson plans, notes, and quizzes."
summary: "Tanmay Zope demos EduTube QuizBuilder, a Streamlit app that transcribes YouTube videos and turns them into summaries, lesson plans, notes, and quizzes with GPT."
keywords: ["youtube video to quiz generator", "streamlit youtube transcription tool", "gpt lesson plan generator", "youtube playlist quiz builder", "edutube quizbuilder github", "ai generated study notes youtube", "python youtube education tool", "openai gpt quiz generator"]
generated: "article"
---
Turning a lecture video into something you can actually study from usually means someone sitting down to transcribe it, summarize it, and write quiz questions by hand. EduTube QuizBuilder, created by Tanmay Zope alongside Professor Nik Bear Brown, automates that entire pipeline, and this video walks through exactly how it works.

## What the tool does

EduTube QuizBuilder is a Python application built with Streamlit that connects to OpenAI's GPT model and to YouTube itself. You paste in the link of a YouTube video, and the tool processes and transcribes it. From that transcript, it can generate a concise summary, build a detailed lesson plan aimed at instructors, or produce clear, distilled notes aimed at students. The core feature, though, is quiz generation: turning the transcript into comprehension questions with multiple choice options and explanations. Every other feature in the app, the summary, the lesson plan, the notes, and the quiz, draws from that same transcribed text, which is what lets the tool move a single video through several different educational formats without asking the user to re-enter anything.

## Getting from video link to transcript

The workflow starts as simply as pasting a YouTube link into the app and clicking process. Behind that one action, the tool fetches the video, extracts its transcript, and makes that text available for every downstream feature. This transcription step is the foundation the rest of the app is built on: because GPT is working from the actual spoken content of the video rather than a title or description, the summaries, lesson plans, notes, and quizzes it produces are grounded in what was actually said, not a guess based on metadata.

## Walking through the demo

The demo starts with a single YouTube video pasted into the app and processed for transcription. From there, the presenter shows off each mode in turn. The summarization feature produces a concise version of the video's content. The lesson plan feature is aimed specifically at professors: it outlines an introduction, the main concepts to cover, and what an instructor should explain in class, alongside the summary, so a professor could use the video as a ready-made teaching resource. The notes feature does something similar for students, distilling the transcript into a concise set of notes they can review before testing themselves.

## Building quizzes from video content

The main event is quiz generation. Once a transcript is available, the user selects a number of questions and a difficulty level, moderate in the demo, and the tool generates a quiz with four answer options per question along with an explanation for the correct answer. Because both the number of questions and the difficulty are adjustable, the same video can produce a short warm-up quiz or a longer, harder one depending on what a class needs. The explanations attached to each answer matter as much as the questions themselves, since they turn the quiz into a study aid rather than just a graded checkpoint, letting a student see why an answer is correct even after they've already submitted a guess.

## Working across a full playlist

Beyond single videos, EduTube QuizBuilder also handles YouTube playlists. Pasting a playlist link surfaces every video in it, and the demo shows selecting two of them at once. The tool transcribes both, summarizes them in bullet points, and generates lesson plans for both videos together, complete with time allocations such as ten minutes for an introduction and twenty minutes for core concepts, along with suggested activities, assignments, and homework. It builds student notes across both videos as well, and then generates a five-question quiz, each with four options, a correct answer, and an explanation, drawn from the combined transcription of the playlist.

## Key takeaways

- EduTube QuizBuilder is a Streamlit application that combines OpenAI's GPT model with YouTube video transcription.
- It offers four core outputs from any video: transcript, summary, lesson plan, and student notes.
- Its quiz generation feature produces multiple choice questions with explanations, with adjustable question count and difficulty.
- The tool works on entire playlists, not just single videos, summarizing and quizzing across multiple videos at once.
- Lesson plans are structured for classroom use, including time allocations, activities, and assignments.

## Try it yourself

EduTube QuizBuilder is open source under the MIT License and available on GitHub as part of the AI4ED project. Setup involves cloning the repository, installing dependencies, adding an OpenAI API key, and launching the app with Streamlit. It is a solid example of the kind of applied, education-focused AI project that comes out of the Humanitarians AI community, and the project welcomes contributions, issues, and pull requests from anyone who wants to extend it.
