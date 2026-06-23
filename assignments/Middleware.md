# Assignment: Express Middleware & Routing — Recipes API

## Goal

Build a full CRUD API from scratch for a brand-new resource — on your own, with no starter routes. Then add a new layer on top: **middleware**, code that runs on every request before your routes do. You'll write your own middleware by hand first, then swap in the packages the industry actually uses.

## Why This Matters

Last time, you built your first server (the Books API). Today you do that again, by yourself, for a new resource — that's the repetition that makes CRUD routes start to feel automatic.

Then you go one layer deeper. You already used middleware without knowing it: `app.use(express.json())` is middleware — a function that runs *before* your routes, on *every* request. Today you write your own middleware for logging, validation, and errors. Once you've built each one by hand and understand exactly what it does, you'll replace it with a package (`morgan`, `cors`) that does the same job, better, in one line. Knowing how something works under the hood is what lets you trust a shortcut later.

## Resources

- Express middleware guide: https://expressjs.com/en/guide/using-middleware.html
- Express Router docs: https://expressjs.com/en/guide/routing.html
- nodemon: https://www.npmjs.com/package/nodemon 
- morgan: https://www.npmjs.com/package/morgan
- cors: https://www.npmjs.com/package/cors
- Postman: https://www.postman.com/downloads/

## Setup

```bash
mkdir recipes-api
cd recipes-api
npm init -y
npm install express
```

Create `app.js`. Paste this starter data at the top:

```js
let recipes = [
  { id: 1, title: "Spaghetti Carbonara", cuisine: "Italian", minutes: 25, servings: 4, vegetarian: false },
  { id: 2, title: "Chana Masala", cuisine: "Indian", minutes: 35, servings: 4, vegetarian: true },
  { id: 3, title: "Fish Tacos", cuisine: "Mexican", minutes: 20, servings: 3, vegetarian: false },
  { id: 4, title: "Margherita Pizza", cuisine: "Italian", minutes: 40, servings: 2, vegetarian: true },
  { id: 5, title: "Pad Thai", cuisine: "Thai", minutes: 30, servings: 2, vegetarian: false },
];

let nextId = 6;
```

You will not be given route code in this assignment. Use what you built in the Books API as your reference, not as code to copy-paste — type it fresh so the pattern sticks.

---

## Part 1: Build the Full CRUD API

**Why:** Same five routes as last time, but no snippets. This is where you find out what you actually remember.

Steps:
- [ ] Set up Express, `express.json()`, and `app.listen` on port `8080`.
- [ ] `GET /api/recipes` — return all recipes.
- [ ] `GET /api/recipes/:id` — return one recipe, or `404` if no id matches.
- [ ] `POST /api/recipes` — create a recipe from `req.body`, assign it `nextId`, add it to the array, respond `201` with the new recipe.
- [ ] `PATCH /api/recipes/:id` — update only the fields sent in `req.body`, `404` if not found.
- [ ] `DELETE /api/recipes/:id` — remove the recipe, `404` if not found, respond `204`.

**Check it:** Test all five routes in Postman before moving on. Don't move on with a broken route — everything after this builds on top of it. You may also want to check the GET /api/recipes route after POST, PATCH, DELETE to see if you actually mutated the data or not (in-memory).

---

## Part 2: Your First Middleware — Logging

**Why:** A **middleware** function is a function with the shape `(req, res, next)`. Express runs it before your route handler. Calling `next()` tells Express "I'm done, move on to the next thing." Forgetting to call `next()` means the request hangs forever. In a production env, the request will timeout.

Here's the *shape* of a middleware function (this example just counts requests — not the thing you're about to build):

```js
function exampleMiddleware(req, res, next) {
  console.log("a request came in");
  next();
}

app.use(exampleMiddleware);
```

Steps:
- [ ] Write your own middleware function that logs the request's method and URL (`req.method`, `req.originalUrl`) to the console.
- [ ] Register it with `app.use(...)`, **above** your routes. Order matters — middleware only affects routes defined after it.
- [ ] Restart your server.

**Check it:** Send any request in Postman. Your terminal logs a line for it before the response comes back.

---

## Part 3: "Route-Specific" Middleware — Validation

**Why:** Not every middleware should run on every route. You can attach one to a single route by passing it as an extra argument.

The shape looks like this (again, just the shape — not your validation logic):

```js
app.get("/example", exampleMiddleware, (req, res) => {
  res.send("handled after middleware ran");
});
```

Steps:
- [ ] Write a middleware function that checks `req.body` for `title` and `cuisine`. If either is missing, send status `400` and **return** — don't call `next()`.
- [ ] If both are present, call `next()` so the route handler runs.
- [ ] Attach this middleware to your `POST /api/recipes` route only.

**Check it:** `POST /api/recipes` with a missing `title` returns `400` and does **not** create a recipe. A valid request still works as before. You should add console.log statements to see the order of things are happening.

---

## Part 4: Centralized Error Handling

**Why:** Right now, if something unexpected throws inside a route, your server crashes or hangs. An error-handling middleware catches problems in one place instead of repeating `try/catch` everywhere.

Docs for error handling: https://expressjs.com/en/guide/error-handling/#writing-error-handlers

You should write this above the `app.listen` and after all routes so it's the fallback for all errors.

An error-handling middleware has **four** parameters, not three — that's how Express knows it's for errors:

```js
function exampleErrorHandler(err, req, res, next) {
  console.error(err);
  res.sendStatus(500);
}
```

Steps:
- [ ] Wrap the logic inside each of your five recipe routes in a `try/catch` block.
- [ ] In each `catch`, call `next(err)` instead of handling it yourself. You will need to accept the `next` function in your handler as the third argument.
- [ ] Add one error-handling middleware at the very **bottom** of `app.js` but before your `app.listen`, after all your routes. Have it log the error and respond `500`.

**Check it:** Temporarily make one route throw on purpose (e.g. reference a variable that doesn't exist) and confirm your server logs the error and responds `500` instead of crashing. Remove your test code afterward.

---

## Part 5: Organize Into Routers

**Why:** One giant `app.js` doesn't scale. `express.Router()` lets you group routes by resource, in their own file.

The mounting pattern looks like this:

```js
// in a router file
const router = require("express").Router();
router.get("/example", (req, res) => res.send("hi"));
module.exports = router;

// in app.js
const exampleRouter = require("./api/example");
app.use("/api", exampleRouter);
```

Steps:
- [ ] Create an `api/` folder with `recipes.js` and `index.js`.
- [ ] Move all five recipe routes into `api/recipes.js`, using `router` instead of `app`, and drop `/api/recipes` down to just `/` and `/:id` (the prefix gets added when you mount it).
- [ ] In `api/index.js`, import the recipes router and mount it under `/recipes`.
- [ ] In `app.js`, import `api/index.js` and mount it under `/api`. Remove the routes you moved out.

**Check it:** All five routes from Part 1 still work exactly the same in Postman — only their location in your code changed.

---

## Part 6: A Second, Nested Resource — Reviews

**Why:** Real APIs have resources that belong to other resources. A review belongs to a recipe through a `recipeId` field. This is the same shape you'll see constantly in real backends.

Add this starter data to `app.js` (or wherever your data currently lives):

```js
let reviews = [
  { id: 1, recipeId: 1, reviewer: "Sam", rating: 5, comment: "Restaurant quality." },
  { id: 2, recipeId: 1, reviewer: "Priya", rating: 4, comment: "Good but a little salty." },
  { id: 3, recipeId: 2, reviewer: "Alex", rating: 5, comment: "My new go-to." },
];

let nextReviewId = 4;
```

Steps:
- [ ] Create `api/reviews.js` with its own router.
- [ ] `GET /api/recipes/:recipeId/reviews` — return all reviews where `review.recipeId` matches.
- [ ] `POST /api/recipes/:recipeId/reviews` — create a review for that recipe from `req.body` (`reviewer`, `rating`, `comment`).
- [ ] On that `POST`, validate that `rating` is a number between 1 and 5. Respond `400` if not.
- [ ] `DELETE /api/reviews/:id` — delete a review by its own id, respond `204`.
- [ ] In `api/index.js`, mount the reviews router under **both** `/recipes` and `/reviews` — it needs to answer to both URL shapes.

**Check it:** `GET /api/recipes/1/reviews` returns 2 reviews. Posting a review with `rating: 9` returns `400`.

---

## Part 7: From Manual to Package — Logging

**Why:** You already built a logger in Part 2. Now see how a maintained package does the same job, with more detail, in one line. This is the trade you'll make constantly as an engineer: understand the mechanic, then reach for the tool.

Steps:
- [ ] `npm install morgan`.
- [ ] Require it, and add `app.use(morgan("dev"))`.
- [ ] Delete (or comment out) the middleware you wrote in Part 2.
- [ ] Restart your server and compare the terminal output to what you had before.

**Check it:** Every request still logs to your terminal — now with method, URL, status code, and response time, automatically.

---

## Part 8: From Manual to Package — CORS

**Why:** Browsers block a frontend running on one port (e.g. `localhost:5173`) from talking to an API on another port (`localhost:8080`), unless the server explicitly allows it. That's called **CORS** (Cross-Origin Resource Sharing). There's no frontend yet, but you're setting this up so a future one can connect.

This is the actual header your browser is checking for — write it by hand first:

```js
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
```

Steps:
- [ ] Add the manual middleware above to `app.js`, before your routes.
- [ ] Now replace it: `npm install cors`, then `app.use(cors())` in its place.
- [ ] Remove the manual version.

**Check it:** Your server still responds normally in Postman (Postman ignores CORS, so this step is really about knowing the header exists for when a real frontend connects later).

---

## Common Gotchas

- Forgetting to call `next()` inside a middleware hangs the request forever — Postman will just spin.
- `app.use(fn)` with no path runs on **every** route. Order matters: middleware only applies to routes registered *after* it.
- An error-handling middleware needs **exactly four** parameters (`err, req, res, next`) — that's the only way Express recognizes it as an error handler.
- When you mount a router with `app.use("/api", router)`, every route inside that router file gets `/api` added in front of it automatically. Don't repeat `/api` inside the router file itself.
- `req.params.recipeId` is a string — wrap it in `Number()` before comparing to `recipeId` in your array.
- Restart your server after every change. Express does not reload itself.

## How to Submit Your Work

Steps:
- [ ] Open your terminal. Make sure you are inside your `recipes-api` folder.
- [ ] Run `git init`.
- [ ] Run `git add .`
- [ ] Run `git commit -m "complete recipes api assignment"`
- [ ] Go to [github.com](https://github.com). Click the **+** icon, then **New repository**.
- [ ] Name it `recipes-api`. Leave every checkbox unchecked. Click **Create repository**.
- [ ] Copy the three commands GitHub shows you under "...or push an existing repository from the command line." Paste them into your terminal and press enter.
- [ ] Refresh the GitHub page in your browser to confirm your files are there.

**Submit:** Copy your repo's URL and submit that link.

## Industry Standards

- Cross-cutting logic (logging, auth checks, validation) belongs in middleware, not copy-pasted inside every route.
- Validate input at the boundary, before it touches your data — that's why validation middleware runs before the route handler.
- Centralize error handling in one place instead of writing a custom response for every possible failure.
- For a well-solved problem (logging, CORS, parsing), reach for a maintained package once you understand what it's doing for you. Don't keep hand-rolling things people have already solved well.

## Stretch Challenges

Only attempt these after Parts 1–8 work and are tested in Postman.

- [ ] **Request counter:** Add a middleware that increments a counter on every request, and a `GET /api/stats` route that returns the running total.
- [ ] **Filter by query:** Add `?cuisine=Italian` support to `GET /api/recipes`.
- [ ] **Pagination:** Add `?page=1&limit=3` support to `GET /api/recipes`.
- [ ] **PATCH a review:** Add `PATCH /api/reviews/:id`.
- [ ] **Rate limiting:** Install `express-rate-limit` and limit any client to 100 requests per 15 minutes.
- [ ] **Environment variables:** Install `dotenv`, move your port number into a `.env` file, and read it with `process.env.PORT`.
- [ ] **Security headers:** Install `helmet` and add `app.use(helmet())`.

## Finished Checklist

Before submitting, verify:

- [ ] `node app.js` starts without errors.
- [ ] All five recipe routes work in Postman.
- [ ] Your logging, validation, and error-handling middleware all work as described.
- [ ] Your routes live in `api/recipes.js` and `api/reviews.js`, mounted through `api/index.js`.
- [ ] Reviews can be listed, created, and deleted, and `rating` is validated.
- [ ] `morgan` and `cors` are installed and replace your manual versions.
- [ ] Your work has been committed and pushed to GitHub.
