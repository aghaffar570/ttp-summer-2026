# Assignment 08: Introduction to Express.js — Books API

## Goal

Build a fully working REST API with Express using in-memory data — practicing route definitions, reading the request, sending responses, and using Postman to test every endpoint before a frontend ever exists.

## Objectives

You will practice:

- Setting up an Express server from scratch.
- Defining routes for all five CRUD operations.
- Reading data from `req.params`, `req.body`, and `req.query`.
- Sending the correct status codes and response bodies.
- Organizing routes using `express.Router()`.
- Testing API endpoints with Postman.
- Using middleware (`express.json()`, `cors`, `morgan`).

## Problem

Build a **Books API** — a REST API for a small bookstore. The data lives in memory (no database yet). You'll implement full CRUD for books, then add a second resource: reviews for each book.

Create the project folder manually (no Vite — this is a Node/Express project):

```bash
mkdir books-api
cd books-api
npm init -y
npm install express cors morgan
```

Create this file structure:

```text
books-api/
├── app.js
└── api/
    ├── index.js
    ├── books.js
    └── reviews.js
```

## Starter Data

Add this to `api/books.js` as your in-memory store:

```js
let books = [
  { id: 1, title: "The Pragmatic Programmer", author: "David Thomas", genre: "Tech", available: true },
  { id: 2, title: "Educated", author: "Tara Westover", genre: "Memoir", available: true },
  { id: 3, title: "Dune", author: "Frank Herbert", genre: "Sci-Fi", available: false },
  { id: 4, title: "Sapiens", author: "Yuval Noah Harari", genre: "History", available: true },
  { id: 5, title: "The Alchemist", author: "Paulo Coelho", genre: "Fiction", available: true },
];

let nextId = 6; // use this for generating new ids
```

Add this to `api/reviews.js`:

```js
let reviews = [
  { id: 1, bookId: 1, reviewer: "Alice", rating: 5, comment: "Must-read for any developer." },
  { id: 2, bookId: 1, reviewer: "Bob", rating: 4, comment: "Dense but rewarding." },
  { id: 3, bookId: 3, reviewer: "Charlie", rating: 5, comment: "One of the best sci-fi novels ever written." },
];

let nextReviewId = 4;
```

## Assignment Tasks

### Part 1: Server Setup

In `app.js`:

- [ ] Require `express`, `cors`, and `morgan`.
- [ ] Create an Express app with `const app = express()`.
- [ ] Register these middleware in order:
  ```js
  app.use(cors());
  app.use(morgan("dev"));
  app.use(express.json());
  ```
- [ ] Mount the API router: `app.use("/api", require("./api"))`.
- [ ] Start the server on port 8080: `app.listen(8080, () => console.log("Server running on port 8080"))`.
- [ ] Run `node app.js` and verify `"Server running on port 8080"` appears.

### Part 2: Books — GET Routes

In `api/books.js`, create an `express.Router()` and implement:

- [ ] `GET /api/books` — respond with the full books array.
- [ ] `GET /api/books/:id` — find the book by id. Respond with the book, or `404` if not found.
- [ ] `GET /api/books?genre=Sci-Fi` — filter the books array by `req.query.genre` when provided. If no query param, return all books.

Wire up the router in `api/index.js`:
```js
const router = require("express").Router();
router.use("/books", require("./books"));
module.exports = router;
```

Test all three GET routes in Postman before moving on.

### Part 3: Books — POST, PATCH, DELETE

Still in `api/books.js`:

- [ ] `POST /api/books` — read `title`, `author`, `genre` from `req.body`. Create a new book object with the next id, add it to the array, respond with `201` and the new book.
- [ ] `PATCH /api/books/:id` — find the book by id (return `404` if not found). Update only the fields provided in `req.body` (do not replace the whole object). Respond with `200` and the updated book.
- [ ] `DELETE /api/books/:id` — find the book by id (return `404` if not found). Remove it from the array. Respond with `204` and no body.

Test each route in Postman:
- POST with a JSON body `{ "title": "Clean Code", "author": "Robert Martin", "genre": "Tech" }`.
- PATCH with `{ "available": false }` — only that field should change.
- DELETE a book, then GET all to confirm it's gone.

### Part 4: Reviews — Nested Resource

In `api/reviews.js`, create a second router for reviews. Reviews belong to a book (`bookId`).

- [ ] `GET /api/books/:bookId/reviews` — return all reviews where `review.bookId === Number(req.params.bookId)`.
- [ ] `POST /api/books/:bookId/reviews` — read `reviewer`, `rating`, and `comment` from `req.body`. Create a new review with the next id and the correct `bookId`. Respond with `201` and the new review.
- [ ] `DELETE /api/reviews/:id` — delete a review by its own id. Respond with `204`.

Mount the reviews router in `api/index.js`:
```js
router.use("/books", require("./reviews")); // for /api/books/:bookId/reviews
router.use("/reviews", require("./reviews")); // for /api/reviews/:id
```

> Hint: you may need to export the reviews router with two separate paths or handle both route shapes inside the same file.

### Part 5: Validation and Error Handling

- [ ] On `POST /api/books`, return `400` if `title` or `author` is missing from `req.body`.
- [ ] On `POST /api/books/:bookId/reviews`, return `400` if `rating` is missing or is not a number between 1 and 5.
- [ ] Wrap every route handler in a `try/catch` block that logs the error and responds with `500` on unexpected failures.

## Common Gotchas

- `req.params.id` is always a **string** — convert with `Number()` before comparing to the numeric ids in your array. `"2" === 2` is `false`.
- `req.body` is `undefined` if you forget `app.use(express.json())`. Register this middleware **before** your routes.
- Every route must send **exactly one** response. Forgetting `return` before `res.sendStatus(404)` often causes a "Cannot set headers after they are sent" crash.
- `PATCH` should only update the fields sent in the request, not replace the whole object. Use spread: `Object.assign(book, req.body)` or `{ ...book, ...req.body }`.
- `204 No Content` should have no body. `res.sendStatus(204)` does this correctly. `res.status(204).json(...)` will cause an error.
- In Postman, set the request body format to **raw → JSON** for POST and PATCH routes.

## Industry Standards

- Routes should be split by resource, not grouped by HTTP method.
- Check for required fields before touching the data store — validate at the boundary.
- Route handlers should be thin — logic should live in helper functions or service layer, not inside the route directly (you'll see this pattern in bigger codebases).
- Use a consistent naming convention for route files: one file per resource.
- Use `morgan` in development for visibility — you should be able to see every request in the terminal.

## Stretch Challenges

If you finish early:

- [ ] Add a `GET /api/books/:id/reviews` route that returns reviews with the book data included (look up the book too).
- [ ] Add pagination to `GET /api/books` using `?page=1&limit=3` query params.
- [ ] Add a `PATCH /api/reviews/:id` route to update a review.
- [ ] Add a route `GET /api/books/available` that returns only books where `available` is `true`. (Hint: this route must be defined **before** `/:id` or Express will treat `"available"` as the id.)
- [ ] Add a simple request-counting middleware that logs how many total requests have hit the server.

## Finished Checklist

Before submitting, verify:

- [ ] `node app.js` starts without errors.
- [ ] All five book routes return the correct status codes in Postman.
- [ ] `GET /api/books?genre=Sci-Fi` returns only matching books.
- [ ] POST creates a new book; GET all confirms it's there.
- [ ] PATCH only updates the provided fields.
- [ ] DELETE removes the book; GET all confirms it's gone.
- [ ] Review routes work for GET and POST.
- [ ] Missing required fields return `400`, not `500`.
- [ ] Your work has been committed and pushed to GitHub.
