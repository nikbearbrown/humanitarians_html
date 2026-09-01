---
title: "React Hook"
seoTitle: "useState Hook in React Explained"
description: "A hands-on explanation of the useState hook in React, covering why regular variables fail and how state persists data between renders."
summary: "Regular JavaScript variables do not survive a React re-render. This video shows why that fails and how the useState hook solves it with a working gallery example."
keywords: ["usestate hook react explained", "why use usestate instead of variable", "react state variable render", "array destructuring usestate", "react component memory", "usestate initial value example", "react state setter function", "multiple state variables react"]
generated: "article"
---
Click a button in a React app and expect the screen to update, but nothing happens. That's the exact problem this video walks through: why a normal JavaScript variable can't hold onto a value between renders, and how the useState hook fixes it.

## Why regular variables fail

The video starts with a small React app built around a gallery of sculptures, each with a name, artist, description, and image. The goal is simple: clicking a "Next" button should move to the next item in the array. The first attempt uses a plain local variable, an index that starts at zero and gets incremented inside a click handler. Clicking the button does increment the variable in the console, but the screen never updates. The reason is that local variables don't persist between renders. Every time React re-renders a component, it renders from scratch, and any changes made to a local variable are wiped out. Worse, updating a local variable never tells React that it needs to re-render in the first place.

## What useState actually does

To fix this, two things need to happen: the data needs to persist between renders, and React needs to be triggered to re-render with the new data. The useState hook handles both. Importing useState from react and calling it returns two things: a state variable and a setter function, delivered as an array using a pattern called array destructuring. The video renames the example variables to index and setIndex, initialized to zero. Now, instead of a plain assignment, the click handler calls setIndex with the incremented value. React remembers the latest value it was told to set, so on the next render, index comes back with the updated number instead of resetting to zero. The gallery advances correctly, and clicking Next actually changes what's shown on screen.

## How state persists across renders

The mechanics matter here: every time a component renders, useState returns the current stored value along with the setter function that can update it. When setIndex is called, React stores the new value, and on the next render it hands that stored value back instead of the hardcoded initial one. This is what makes state fundamentally different from a local variable. It's also why the convention of naming pairs like `const [something, setSomething] = useState(...)` shows up everywhere in React code.

## Multiple state variables

The video extends the example by adding a second, unrelated piece of state: a boolean called showMore that toggles whether a description is visible. A second button flips this value between true and false using its own setter function, showing that a component can hold multiple independent state variables side by side. The general guidance offered is to keep unrelated pieces of state separate, and only combine them into one state object if they tend to change together.

## Key takeaways

- Local variables don't survive a React re-render because the component renders from scratch each time.
- useState returns a state variable and a setter function as a two-item array, accessed through array destructuring.
- Calling the setter function is what tells React both to remember the new value and to trigger a re-render.
- A component can hold several independent state variables, and it's good practice to keep unrelated state separate.
- State variables should be declared at the top of the component function, similar to how imports are placed at the top of a file.

## Who this is for

This is aimed at developers new to React who are working through the basics of hooks, following on from an earlier video in the same series on useEffect. It's a solid next step for anyone building their first interactive React components.
