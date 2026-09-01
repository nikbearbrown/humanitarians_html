---
title: "Installing Basic Software Requirements"
seoTitle: "MERN Stack Setup: Node, VS Code, Express, MongoDB"
description: "A setup lecture for a MERN stack movie review app, covering Node.js, VS Code, npm init, Express, and MongoDB installation with basic routing."
summary: "The first lecture in a MERN stack movie review app series, walking through installing Node.js, VS Code, and Express, then setting up basic routing in an MVC folder structure."
keywords: ["mern stack setup tutorial", "install node js lts version", "npm init package json", "express js basic server setup", "mvc folder structure node express", "app.get app.listen express example", "postman post request testing", "mongodb atlas free account setup", "node index.js server running"]
generated: "article"
---
Starting a full stack application means getting the right tools installed before a single line of application logic gets written. This lecture opens a series on building a MERN stack movie review app, where users will eventually be able to upload movie trailers and other users can rate and review them, and it walks through every piece of software needed to get there.

## Checking for and installing Node.js

The first requirement is Node.js. Before installing anything, it's worth checking whether it's already present by running `node -v` in the command prompt. A version number means Node is installed; an error saying the command isn't recognized means it needs to be installed. The video recommends downloading the LTS, or long-term support, version rather than the current release, since the current version can carry more bugs. After downloading, the installer walks through the standard steps: accepting the license agreement and choosing an install folder, with the default Program Files location being a safe choice for most people.

## Setting up VS Code

Next comes a code editor. VS Code is used throughout the lecture, though any editor works, including alternatives like Atom or Sublime Text. The installer is downloaded from the VS Code site, matched to the operating system, and installed with default options, including creating a desktop shortcut and adding an "Open with Code" option in Windows Explorer for convenience.

## Initializing the project with npm

With the tools in place, the next step is turning a plain folder into a Node.js project. Running `npm init` inside the project folder walks through a series of prompts: package name, description, entry point (kept as the default `index.js`), and author name. Confirming these creates a `package.json` file that records the project's metadata. A quick `console.log(1 + 1)` inside `index.js`, run with `node index.js`, confirms that JavaScript is executing correctly in the environment.

## Installing and running Express

To move beyond plain JavaScript and build a web application, Express is installed with `npm install express`. This creates a `package-lock.json` file and adds Express as a dependency inside `package.json`, along with a `node_modules` folder containing the libraries Express depends on. A minimal server is set up with `const express = require('express')`, `const app = express()`, and `app.listen(8080, ...)` to start listening on port 8080. Running `node index.js` starts the server, and visiting `localhost:8080` in a browser initially returns a "cannot GET" message, since no route has been defined yet for that path.

## Adding routes and moving to an MVC structure

A basic route is added with `app.get('/', (req, res) => { res.send('<h1>Homepage</h1>') })`, and a second route for an About page demonstrates handling multiple endpoints. As the application grows, cramming every route into a single `index.js` file becomes impractical, which is where the MVC, or model-view-controller, pattern comes in. Since this is a backend-only application, the focus is on models and controllers rather than views. Separate `routers` and `controller` folders are created, each containing a `user.js` file. The router file imports Express's `router` module with `express.Router()`, defines routes like `router.get(...)`, and exports the router with `module.exports = router`. Back in `index.js`, that router is imported and wired in with `app.use(userRouter)`, keeping the main file clean while routing logic lives in its own module. The controller file then holds the actual functions that respond to each route, like an initial `createUser` function that sends a basic response.

## Testing with Postman and installing MongoDB

Since browsers only send GET requests by default, testing a POST route requires a dedicated tool. Postman is installed for this purpose, allowing requests of any type, GET, POST, PUT, PATCH, or DELETE, to be sent directly to the server. A POST request to `localhost:8080` confirms that the router and controller are correctly wired together. Finally, MongoDB is set up by creating a free account through MongoDB's website, which provides free hosting for the database the application will use in later lectures.

## Key takeaways

- Check for existing installs with `node -v`, `npm -v`, and `npx -v` before reinstalling anything.
- Prefer the LTS version of Node.js over the current release for stability.
- `npm init` creates the `package.json` file that defines a Node.js project.
- Express is added as a dependency with `npm install express` and used to define routes and start a server with `app.listen()`.
- Splitting routes and logic into separate `routers` and `controller` folders follows the MVC pattern and keeps `index.js` manageable as the app grows.
- Postman is needed to test non-GET requests like POST, since browsers only issue GET requests by default.

## Who this is for

This lecture is for beginners setting up their first MERN stack project from scratch, and it works well as a starting reference for anyone about to build a full stack Node, Express, React, and MongoDB application step by step.
