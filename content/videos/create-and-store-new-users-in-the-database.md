---
title: "Create and store new users in the database"
seoTitle: "Store New Users in MongoDB with Mongoose"
description: "A walkthrough of building a Mongoose user schema, hashing passwords with bcrypt, and validating duplicate emails before saving to MongoDB."
summary: "This lecture builds the create-user flow for a MERN app, from a Mongoose schema through password hashing with bcrypt to catching duplicate email errors."
keywords: ["mongoose user schema tutorial", "hash password bcrypt before save", "mongoose pre save hook password", "create user api mongodb", "duplicate email validation mongoose", "bcrypt salt rounds recommendation", "mern stack create user", "mongoose schema required unique trim"]
generated: "article"
---
A working backend needs more than a route that says a user was created; it needs to actually store that user safely in the database, with a password nobody can read in plain text. This lecture picks up right where the previous one left off, connecting a frontend request all the way through to a saved, hashed record in MongoDB.

## Building the Mongoose user schema

The first step is creating a schema that Mongoose can use to talk to MongoDB. Inside a new `models` folder, a `user.js` file imports mongoose and defines a schema with three fields: name, email, and password. Each field gets a type of String. The name field also uses `trim`, which strips extra spaces a user might accidentally add, and `required: true`, since a user can't exist without a name. The email field adds `unique: true`, because while two users could share a name, they can't share an email address, which is what uniquely identifies each account. The finished schema is exported with `module.exports` so it can be imported into the controller.

## Creating and saving a new user

In the controller, the schema is imported and used to build a new user object from the payload sent by the frontend: `const { name, email, password } = req.body`. That data is passed into a new instance of the schema with the `new` keyword, and the response is sent back as JSON. Testing this with Postman shows the new user object coming back correctly, including an `_id` field that MongoDB automatically adds. But at this point the data isn't actually saved yet. Calling `.save()` on the new user object is what writes it to the database, and because that's an asynchronous operation, the function needs to be marked `async` and the save call needs `await` in front of it.

## Hashing the password with bcrypt

Storing a password as plain text is a serious security problem: anyone who gets access to the database can read every user's password directly. The fix is the bcrypt dependency, installed with `npm install bcrypt`. Inside the schema file, a `pre('save')` middleware function runs before every save operation. Inside it, `this.isModified('password')` checks whether the password field was actually changed. If it was, `bcrypt.hash()` is used to hash it, with a salt value added to make the hash harder to crack. A salt somewhere around 8 to 10 is recommended; going much higher, like 100 or 150, slows down account creation without adding meaningful security. The hashed result replaces `this.password` before the save proceeds, and since bcrypt's hashing is asynchronous, the pre-save function itself needs to be async with an awaited hash call.

## Validating duplicate emails and status codes

Even with the schema's `unique: true` constraint, sending a duplicate email produces a raw database error rather than a clean response. To handle this properly, the controller checks for an existing user with the same email before creating a new one, using `User.findOne()` with the given email, awaited inside an async function. If a matching user is found, the response returns an error message saying the email is already in use, along with a 401 status code, since a duplicate email is treated as an authorization-style error. When account creation succeeds, the response explicitly sets a 200 status rather than relying on the default.

## Key takeaways

- A Mongoose schema defines field types plus constraints like `required`, `unique`, and `trim`.
- Creating a new document with `new User(...)` doesn't save it; you need an awaited `.save()` call.
- Passwords should never be stored as plain text; hash them with bcrypt inside a `pre('save')` middleware hook.
- A bcrypt salt value around 8 to 10 balances security against performance.
- Checking for an existing user with `findOne()` before saving lets you return a clean, specific error instead of a raw database exception.
- Explicit status codes, like 401 for a duplicate email and 200 for success, make API responses easier to handle on the frontend.

## Who this is for

This lecture is built for developers following along with a MERN stack course who are implementing user creation for the first time, and it's a practical reference for anyone adding secure password storage to a Node and MongoDB backend.
