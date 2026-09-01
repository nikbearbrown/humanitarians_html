---
title: "Establish communication between the backend APIs and database"
seoTitle: "Connect Node.js Backend APIs to MongoDB"
description: "A lecture walkthrough on testing Node.js API requests with Postman, structuring API route patterns, and connecting an Express backend to MongoDB."
summary: "This lecture covers testing POST requests with Postman, structuring API URL patterns by controller, and connecting a Node.js and Express backend to MongoDB with Mongoose."
keywords: ["connect nodejs backend to mongodb", "postman test post api request", "express app.use json middleware", "mongoose connect local mongodb uri", "nodemon auto restart node server", "api url pattern router controller", "mvc pattern node express api", "mongodb connection refused localhost fix"]
generated: "article"
---

Getting a Node.js application to return an HTML page is one thing. Getting it to actually receive data from a frontend, route that data to the right controller, and store it in a database is a different problem entirely, and it's the one this lecture works through step by step, from testing requests in Postman to getting a live connection to MongoDB.

## Beyond GET: testing other request types with Postman

The previous lecture ended with a basic GET request returning an HTML page in the browser. A backend needs more than GET, though; PUT, POST, DELETE, and PATCH requests all come up regularly, and a browser alone can't easily send them. Changing a route from a GET handler to a POST handler in the code is simple, but testing it needs a dedicated tool: Postman, which can send any of these request types directly. Sending a POST request to a URL that only had a GET handler previously and getting back the expected response is the first confirmation the change worked.

## Structuring URL patterns by controller

As an application grows past a single user controller, it picks up a search controller, a product controller, a review controller, and more. To keep requests routed correctly, each one needs a unique API pattern. A pattern like /api/user tells the application to route the request to the user router specifically. Within that router, further action is needed to distinguish between operations like creating, deleting, or updating a user, which is why a route gets an additional segment, like /create, to uniquely identify which controller method handles it.

## Avoiding manual restarts with nodemon

Restarting the application by hand after every code change gets old fast. Installing nodemon (`npm install nodemon`) fixes that: it's added as a dev dependency, since it's only needed during development and not in deployment, and a script entry runs the app through nodemon instead of node directly. Once that's wired up, saving a code change triggers an automatic restart, and the change is reflected without any manual intervention.

## Sending real data from frontend to backend

Data moving from a frontend to a backend API travels as a payload, typically in JSON format. In Postman, that means sending raw JSON data in the request body, for example a name, an email, and a password field, for a "create user" request. In a professional environment, a password would be hashed before it's ever sent, though this lecture sends it directly for the sake of demonstrating the basic flow. To actually see what the backend received, logging `request.body` inside the controller is the way to check, but by default the request body comes back undefined until the application is told what format the incoming data is in. Adding `app.use(express.json())` in app.js fixes that, and after that middleware is in place, the same request correctly logs the name, email, and password fields the frontend sent.

## Connecting the backend to MongoDB

With the frontend-to-backend communication working, the next step is backend-to-database communication, using MongoDB as the database. Mongoose is the dependency that handles this, playing a role similar to an ORM like Hibernate for a Spring Boot application: it avoids a lot of boilerplate and lets you run queries when you actually need them, following an MVC-style pattern. After installing Mongoose (`npm install mongoose`), a dedicated db folder with an index.js file inside it requires Mongoose and calls `mongoose.connect` with the local URI of the database, retrievable from MongoDB Compass by copying its connection string, followed by the specific database name being used.

## Handling the connection asynchronously

Connecting to a database is an asynchronous process: the application kicks off the connection and moves on to its next steps without waiting for the connection to finish first. A `.then()` handler logs a success message once the database actually connects, and a `.catch()` handler logs an error message if it doesn't. Requiring that db/index.js file from app.js starts the connection process as soon as the application starts, but because it's asynchronous, the "server is running" message can print before the "database connected" message does, which is expected behavior rather than a bug.

## Debugging a connection refused error

Running into a "connection refused" error pointing at the MongoDB URI and port often traces back to how localhost resolves on a given machine. Replacing "localhost" in the connection string with the explicit loopback IP address, 127.0.0.1, resolves this in many cases, since it removes any ambiguity about which address the application is actually trying to reach.

## Key takeaways

- Postman is the tool for testing POST, PUT, PATCH, and DELETE requests that a browser can't easily send on its own.
- API URL patterns should map to specific controllers (like /api/user), with additional segments identifying the exact action within that controller.
- Nodemon eliminates manual restarts by watching for file changes and restarting the server automatically, and belongs in dev dependencies only.
- `app.use(express.json())` is required for Express to parse an incoming JSON request body; without it, `request.body` comes back undefined.
- Mongoose connects a Node.js backend to MongoDB and reduces boilerplate, similar to how an ORM works in other frameworks.
- Database connections are asynchronous, so a "server running" log can appear before a "database connected" log without indicating an error.
- A "connection refused" error against a MongoDB URI can often be resolved by using 127.0.0.1 instead of localhost in the connection string.

## Who this is for

This lecture is for developers learning backend fundamentals who have already built a basic Node.js and Express application and are ready to connect it to a real database. It picks up directly from an earlier lecture on routers and controllers, and the next lecture continues by using Mongoose to create a user record in the database.
