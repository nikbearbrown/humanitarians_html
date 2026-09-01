---
title: "React hooks"
seoTitle: "useEffect Hook in React Explained"
description: "An explanation of React hooks with a focus on useEffect, including a demo that fetches and displays user data from a public API."
summary: "This fourth video in the React basics series explains the useEffect hook and demos it live by fetching random user data from a public API."
keywords: ["useeffect hook explained react", "react hooks side effects tutorial", "fetch api data useeffect example", "useeffect empty dependency array", "component did mount useeffect equivalent", "randomuser me api react demo", "react hooks introduced version 16", "useeffect cleanup memory leaks"]
generated: "article"
---
Fetching data from an external API and getting a React component to actually display it sounds simple, but it requires understanding one specific hook: useEffect. This fourth entry in the React basics series focuses entirely on that hook, explaining what it does and demonstrating it live with a working example.

## What React hooks are

Hooks are functions that let components hook into React's state and lifecycle features from within function components. They were introduced in React 16 to solve problems like reusing stateful logic across components without restructuring everything into class components. Hooks like useState, useEffect, and useContext are described as fundamental to building reactive, efficient React applications, and this video zeroes in on useEffect specifically.

## What useEffect is for

useEffect allows a function component to perform side effects, operations that reach outside the component itself. That includes things like fetching data, setting up a subscription, or manually changing the DOM. In older, class-based React, this kind of behavior was split across three separate lifecycle methods: componentDidMount, componentDidUpdate, and componentWillUnmount. useEffect replaces all three, bundling their capabilities into a single, unified API and simplifying what used to be a more fragmented lifecycle model.

## When useEffect matters most

The hook becomes especially useful when fetching data from an external API. A common pattern is a user interface change, like clicking an "Add" button, triggering an HTTP call, after which the DOM needs to update to reflect the result. useEffect is what makes that update happen cleanly, giving components a structured way to react to changes and update accordingly.

## Building the demo

The demo builds a small app that fetches and displays user data from a public API. Inside `app.js`, both useState and useEffect are imported. useState creates a `userData` state variable, initialized to null since no data has been fetched yet. The fetch itself targets randomuser.me's API, and the JSON response is stored into that state variable once retrieved. Passing an empty array as the second argument to useEffect tells React that the effect doesn't depend on any values, props, or state, so it only needs to run once, similar to componentDidMount in the older class-based model.

## Debugging the response shape

Getting the display right takes some trial and error in the video. The fetched data comes back as an object containing a `results` array, and pulling the name and email requires drilling into `results[0]` rather than treating the top-level object as the user directly. Logging the response to the console repeatedly is what surfaces this structure, and once the correct path, `results[0].name` and `results[0].email`, is used, the component displays the fetched user's information correctly. Each time the page refreshes, useEffect runs again, fetching and displaying a new random user.

## Cleanup and wrapping up

Beyond just running effects, useEffect also supports cleaning them up. If an effect sets up a subscription or a timer, useEffect can clear that out when the component unmounts, which prevents memory leaks. With the demo working end to end, fetching, storing, and displaying data from an external API, the video closes out having covered how to perform side effects in React function components using useEffect.

## Key takeaways

- useEffect lets function components perform side effects like data fetching, subscriptions, or manual DOM updates.
- It replaces componentDidMount, componentDidUpdate, and componentWillUnmount from class components in a single unified API.
- Passing an empty array as the second argument runs the effect only once, similar to componentDidMount.
- API responses often need careful inspection, logging the data to the console is the fastest way to find the correct property path.
- useEffect also supports cleanup logic, useful for clearing subscriptions or timers to prevent memory leaks.

## Who this is for

This video is aimed at developers working through the React basics series who have already covered component fundamentals and are ready to learn how components interact with the outside world through side effects.
