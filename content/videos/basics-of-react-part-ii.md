---
title: "Basics of React - Part II"
seoTitle: "React To-Do List App Tutorial: State and Rendering"
description: "A hands-on React tutorial building a to-do list app, covering useState, dynamic list rendering, form handling, and mapping arrays to components."
summary: "Raghu Teja builds a to-do list app in React to teach state management, dynamic list rendering, and handling user input from scratch."
keywords: ["react to do list tutorial", "react usestate array tutorial", "react dynamic list rendering", "react form handle submit example", "react map array key prop", "react beginner project todo app", "create react app todo list", "react state management for beginners"]
generated: "article"
---
After covering what React is and building a simple counter, the natural next step is a project that forces you to manage more than one piece of state at a time. This second installment of the Basics of React series does exactly that, building a to-do list application from an empty project to a working app that lets you add tasks and see them rendered instantly on screen.

## Why a to-do list

A to-do list app is a classic learning project because it packs several essential React concepts into one small build: state management, handling user input, and dynamic list rendering. Rather than introducing these ideas separately, building the app forces all three to work together, which is the point of choosing this project as the follow-up to the earlier counter example.

## Setting up the project

The build starts the same way any React project does, with `npx create-react-app` and naming the project "todo-list." Once the scaffolding finishes, the tutorial clears out the default boilerplate in `App.js` to start from a blank slate, then starts the development server early with `npm start` so that changes are visible as they happen. Along the way, the video walks through a genuinely common beginner mistake: running `npm start` from the wrong directory, one that doesn't actually contain the project's `package.json` or `node_modules`, which produces an error that looks alarming but is simply a matter of navigating into the correct folder first.

## Building the form and managing state

The app structure centers on two pieces: a form for submitting new tasks and a list for displaying them. The form includes a text input and a submit button, with an `onSubmit` handler set up to run a `handleSubmit` function once triggered. Two `useState` hooks drive the app: one holds `task`, the current text typed into the input, and the other holds `tasks`, the array of all tasks created so far. The input field's `onChange` event updates `task` on every keystroke, keeping the input fully controlled by React state.

## Handling form submission

Inside `handleSubmit`, the first step is calling `event.preventDefault()`, which stops the form's default behavior of reloading the page, a small but important detail that demonstrates React's control over standard HTML form behavior. From there, the function builds a new task object containing the entered text and a `completed` flag set to false, then adds it to the `tasks` array. After the new task is added, the input is cleared by resetting `task` back to an empty string with `setTask("")`, so the field is ready for the next entry without any leftover text from the previous submission. The video demonstrates this directly: commenting out that reset line leaves the previous input text sitting in the field even after a new task, like "movie," gets successfully added to the list, which makes the purpose of the reset immediately visible.

## Rendering the list dynamically

Displaying the growing list of tasks uses React's `map()` function over the `tasks` array, rendering an ordered list item for each entry. Each mapped item needs a unique key, and the tutorial uses `task.id` for that purpose, since a stable key lets React efficiently track which items have changed, been added, or been removed without needing to re-render the entire list. This dynamic rendering is what lets the app immediately reflect new tasks like "laundry" as soon as they're submitted, without a full page reload.

## What's built, and what's next

By the end of the video, the app can accept a new task through the input, add it to state, clear the field, and render the updated list live. The tutorial closes by pointing to natural extensions: adding CSS styling for a more polished look, or adding a task-completion feature with a checkbox that strikes through a completed task, both left as exercises for the viewer to pursue using React's official documentation as a reference.

## Key takeaways

- The to-do list app combines state management, controlled form input, and dynamic list rendering in one small project.
- Two `useState` hooks track the current input text and the full array of tasks.
- `event.preventDefault()` inside the submit handler stops the default page reload behavior of HTML forms.
- Resetting the input state after submission is what clears the text field for the next entry.
- Mapping over the tasks array with a stable key, like `task.id`, lets React update the list efficiently as tasks are added.
- The finished app is a foundation that can be extended with styling or a task-completion checkbox.

## Try it yourself

This tutorial is aimed at React beginners who have already gone through Part I of the Basics of React series and want to build something slightly more complex than a counter. It's a good hands-on complement to Humanitarians AI's other applied coding walkthroughs for anyone learning front-end development step by step.
