---
title: "Basics of React by Humanitarians AI Fellow Raghu Teja | Powered by Bear Brown & Company"
seoTitle: "Basics of React: Theory, Setup, and Counter Demo"
description: "Raghu Teja explains React's core concepts, virtual DOM, JSX, and components, then sets up a project and builds a working counter app step by step."
summary: "A comprehensive React primer covering what React is, its key features like JSX and the virtual DOM, environment setup, and a hands-on counter app built with useState."
keywords: ["what is react js explained", "react virtual dom explained", "react jsx tutorial beginners", "react useState counter example", "create react app setup guide", "react components reusability tutorial", "react one way data binding", "learn react from scratch tutorial"]
generated: "article"
---
Most React tutorials jump straight into code, but skipping the theory tends to leave beginners typing syntax they don't actually understand. This nearly 35-minute walkthrough by Humanitarians AI Fellow Raghu Teja takes the opposite approach: it starts with what React is and why it matters before opening a single file, then moves into a full environment setup and a working counter application built live.

## What React actually is

React is described as a declarative, efficient, and flexible JavaScript library for building reusable UI components. It lets developers assemble complex interfaces out of small, isolated pieces of code called components. The video's running example is a video player interface made up of a thumbnail component and a like-button component, both reusable pieces that can be combined to build out screens, pages, and full applications. React was originally developed by Facebook in 2013 and now powers products like WhatsApp and Instagram, though its use today extends far beyond those two apps. There's also React Native, a separate framework built on the same principles for creating mobile applications.

## Why React exists: the virtual DOM

The main reason to reach for React is speed. Before tools like it existed, even a small interaction, clicking a button, updating a form field, would often trigger a full page reload, an expensive operation in terms of both processing time and user experience. React solves this with the virtual DOM, a JavaScript object that represents a lightweight copy of the actual page. When something changes, like a like button being clicked, React updates the virtual DOM first, compares it against the previous version, and then updates only the parts of the real DOM that actually changed. That targeted updating is what makes React fast enough to use extensively on both the client and server side, and it pairs with a component and data pattern that keeps larger applications easier to read and maintain.

## The five core features

The video organizes React's defining features into five points. JSX, JavaScript XML, is a syntax extension that lets HTML-like markup live directly inside JavaScript functions, rather than keeping markup, logic, and styling in fully separate files the way vanilla JavaScript projects often do. Components are the building blocks of any React application, each with its own logic, and their reusability and scalability are a major reason React scales well on large projects, since the same thumbnail component, for instance, can be reused across many videos rather than rebuilt each time. One-way data binding means data flows in a single direction through the application, which gives developers tighter control and keeps components effectively immutable rather than allowing unpredictable changes to ripple in multiple directions. The virtual DOM, covered above, is listed again here as a feature in its own right, since it's what makes React's approach to rendering distinct. And simplicity rounds out the list: because React is built around small, reusable, JSX-based components, the resulting code tends to be easier to read, write, and reason about, even for developers newer to front-end work.

## Setting up the development environment

With the concepts covered, the video moves into a live setup. Getting started with React requires Node.js installed locally, which the video recommends downloading directly from the Node.js website for whichever operating system you're using, Windows, Mac, or Linux, and Visual Studio Code as the recommended editor for a smoother overall experience. Confirming Node is installed is as simple as typing `node` in a terminal and checking for a version response.

From there, a new project is created with `npx create-react-app my-app`, run from inside a dedicated projects folder. This command downloads React's dependencies and scaffolds a full project structure automatically, including the `node_modules` folder holding all the underlying packages, a `public` folder containing `index.html`, the page where the entire application ultimately renders inside a `<div id="root">`, and a `src` folder containing `App.js`, where the actual application code lives. Running `npm start` launches the development server, and the video walks through exactly how the default "Learn React" text traces back to `App.js`, and how that component gets imported and rendered inside `index.js` through `ReactDOM.createRoot()` targeting that same root div.

## Building a live counter

To make state concrete, the video clears out the App.js boilerplate, briefly hitting a compile error along the way because a component function must always return valid JSX, resolved here using an empty fragment as a placeholder. From that clean state, the tutorial builds a counter: importing `useState` from React, creating a `count` variable initialized to zero, and rendering it inside an `<h2>` alongside a button. Clicking the button calls `setCount(count + 1)`, incrementing the state by one each time.

The video uses this simple example to explain what state actually is: an updatable structure that holds the data belonging to a component, and one that can change over time based on user interaction. A component that holds state like this is called a stateful component, and it's described as the heart of a React component because it governs both behavior and rendering. To make the mechanism visible rather than abstract, the tutorial adds `console.log` statements to show exactly when the component re-renders, first on initial page load, and then again on every click, confirming that React re-renders only the parts of the interface tied to the changed state rather than reloading the whole page.

## Key takeaways

- React is a component-based JavaScript library that builds interfaces out of small, reusable pieces of code.
- The virtual DOM lets React compare a lightweight in-memory representation of the UI against the real DOM and update only what changed.
- JSX lets HTML-like syntax live directly inside JavaScript functions, keeping markup and logic together.
- One-way data binding keeps data flow predictable and components effectively immutable.
- `create-react-app` scaffolds a full project, including `node_modules`, `public/index.html`, and `src/App.js`, in one command.
- The `useState` hook is the mechanism for adding and updating state, demonstrated here with a simple click counter.

## Who this is for

This video is built for complete beginners to React, or anyone who wants a refresher that connects the "why" behind React's design to the actual code. It's a solid entry point before moving on to more applied builds, such as the to-do list app and weather app covered later in the React Basics series from Humanitarians AI.
