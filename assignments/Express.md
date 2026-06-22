# Assignment 08: Introduction to Express.js — Books API

## Goal

Build your first server. It will answer requests for a list of books — adding one, changing one, and deleting one — all before any frontend exists.

## Why This Matters

So far, your code has run in the browser. The browser is the **client** — it asks for things. Today you build the **server** — the computer that answers. A **server** is a program that waits for requests and sends back responses. **Express** is a tool that makes building a server in Node much faster.

You will test your server with **Postman**, a tool for sending requests without a browser. There is no frontend yet — that comes later. Today is just about the mechanics of CRUD: Create, Read, Update, Delete.

## Resources

- Express docs: https://expressjs.com/en/starter/hello-world.html
- Postman download: https://www.postman.com/downloads/

## Setup

This is a Node project, so there is no Vite step.

```bash
mkdir books-api
cd books-api
npm init -y
npm install express
```

Create one file: `app.js`. Everything for this assignment lives in this single file.

Paste this at the top of `app.js`. This is your starting data — an **array**, which is just a list:

```js
let books = [
  { id: 1, title: "The Pragmatic Programmer", author: "David Thomas", genre: "Tech", available: true },
  { id: 2, title: "Educated", author: "Tara Westover", genre: "Memoir", available: true },
  { id: 3, title: "Dune", author: "Frank Herbert", genre: "Sci-Fi", available: false },
  { id: 4, title: "Sapiens", author: "Yuval Noah Harari", genre: "History", available: true },
  { id: 5, title: "The Alchemist", author: "Paulo Coelho", genre: "Fiction", available: true },
];

let nextId = 6; // use this for any new book you create
```

---

## Part 1: Start the Server

**Why:** Before writing any routes, confirm the server itself can turn on.

Steps:
- [ ] Require `express`: `const express = require("express");`
- [ ] Create the app: `const app = express();`
- [ ] Add this line: `app.use(express.json());` — it lets your server read JSON that's sent to it. Without it, `req.body` will always be empty.
- [ ] At the bottom, start the server: `app.listen(8080, () => console.log("Server running on port 8080"));`
- [ ] In your terminal, run `node app.js`.

**Check it:** Your terminal shows `Server running on port 8080`.

---

## Part 2: Your First Route

**Why:** A **route** is a rule: "when a request comes to this address, run this code." Write the smallest possible route first, before touching your book data.

Steps:
- [ ] Above `app.listen`, add: `app.get("/", (req, res) => res.send("Books API is running"));`
- [ ] Stop your server (`Ctrl+C`) and run `node app.js` again. (Express does not restart itself — you must do this every time you change `app.js`.)
- [ ] Open `http://localhost:8080` in your browser.

**Check it:** The page shows "Books API is running".

---

## Part 3: GET All Books

**Why:** This is the simplest way to read data — send back the whole list.

Steps:
- [ ] Add: `app.get("/api/books", (req, res) => res.json(books));`
- [ ] Restart your server.
- [ ] Open Postman. Send a `GET` request to `http://localhost:8080/api/books`.

**Check it:** Postman shows all 5 books as JSON.

---

## Part 4: GET One Book by Id

**Why:** Now you'll read a single item using a **route parameter** — a piece of the URL itself, like the `2` in `/api/books/2`.

Steps:
- [ ] Add a new route: `app.get("/api/books/:id", (req, res) => { ... })`
- [ ] Inside, read the id from `req.params.id`. **Important:** this value is always a string, so wrap it in `Number()` before comparing it to the ids in your array.
- [ ] Find the matching book in the `books` array.
- [ ] If no book matches, send back status `404` and stop (use `return`).
- [ ] If a book matches, send it back as JSON.
- [ ] Restart your server.

**Check it:** `GET /api/books/2` returns "Educated". `GET /api/books/99` returns a `404` status.

---

## Part 5: POST a New Book

**Why:** Now you'll let the client create something new, instead of only reading data.

Steps:
- [ ] Add: `app.post("/api/books", (req, res) => { ... })`
- [ ] Read `title`, `author`, and `genre` from `req.body`.
- [ ] Build a new book object. Use `nextId` for its id, then increase `nextId` by 1.
- [ ] Add the new book to the `books` array.
- [ ] Send back status `201` and the new book.
- [ ] Restart your server.

**Check it:** In Postman, set the body to **raw → JSON**, and send `{ "title": "Clean Code", "author": "Robert Martin", "genre": "Tech" }` to `POST /api/books`. Then `GET /api/books` and confirm 6 books are now in the list.

---

## Part 6: PATCH an Existing Book

**Why:** `PATCH` changes only the fields you send — not the whole object.

Steps:
- [ ] Add: `app.patch("/api/books/:id", (req, res) => { ... })`
- [ ] Find the book by id (`Number()` again). If it's not found, send `404` and stop.
- [ ] Copy the fields from `req.body` onto the existing book, without erasing the fields you didn't send. (`Object.assign(book, req.body)` does this for you.)
- [ ] Send back status `200` and the updated book.
- [ ] Restart your server.

**Check it:** Send `{ "available": false }` to `PATCH /api/books/1`. Only `available` should change.

---

## Part 7: DELETE a Book

**Why:** The last CRUD action — removing something completely.

Steps:
- [ ] Add: `app.delete("/api/books/:id", (req, res) => { ... })`
- [ ] Find the book's position in the array by id. If it's not found, send `404` and stop.
- [ ] Remove it from the `books` array.
- [ ] Send back status `204` with no body: `res.sendStatus(204)`.
- [ ] Restart your server.

**Check it:** Delete a book, then `GET /api/books` and confirm it's gone.

---

## Common Gotchas

- `req.params.id` is always a **string**. `"2" === 2` is `false` — always wrap it in `Number()` first.
- `req.body` is `undefined` if you forget `app.use(express.json())`.
- Every route must send back **exactly one** response. Forgetting `return` before `res.sendStatus(404)` will cause a "Cannot set headers after they are sent" crash.
- `PATCH` should only update the fields sent in the request, not replace the whole object.
- `204 No Content` should have no body. Use `res.sendStatus(204)`, not `res.status(204).json(...)`.
- Forgot to restart your server after a change? Stop it (`Ctrl+C`) and run `node app.js` again.
- In Postman, set the request body format to **raw → JSON** for POST and PATCH routes.

## How to Submit Your Work

Steps:
- [ ] Open your terminal. Make sure you are inside your `books-api` folder.
- [ ] Run `git init`.
- [ ] Run `git add .`
- [ ] Run `git commit -m "complete books api assignment"`
- [ ] Go to [github.com](https://github.com). Click the **+** icon, then **New repository**.
- [ ] Name it `books-api`. Leave every checkbox unchecked. Click **Create repository**.
- [ ] Copy the three commands GitHub shows you under "...or push an existing repository from the command line." Paste them into your terminal and press enter.
- [ ] Refresh the GitHub page in your browser to confirm your files are there.

**Submit:** Copy your repo's URL and submit that link.

## Industry Standards

- Check for required fields before touching the data store — validate at the boundary.
- Send back the status code that matches what happened: `200` read/updated, `201` created, `204` deleted, `404` not found, `400` bad input.
- Real projects split routes into separate files by resource instead of one big file — you'll practice that pattern in the stretch challenges.

## Stretch Challenges

Only attempt these after Parts 1–7 work and are tested in Postman. Try them roughly in this order.

- [ ] **Filter by genre:** Add a query string to your GET-all route. If `req.query.genre` has a value, send back only books matching that genre. Example: `GET /api/books?genre=Sci-Fi`.
- [ ] **Validation:** On `POST /api/books`, return `400` if `title` or `author` is missing from `req.body`.
- [ ] **Error handling:** Wrap your route logic in `try/catch`. Log the error, and respond with `500` if something unexpected happens.
- [ ] **Organize your code:** Right now everything is in one file. Split it up:
  - Create an `api/` folder with `index.js` and `books.js`.
  - Move your book routes into `api/books.js`, using `express.Router()` instead of `app`.
  - In `api/index.js`, mount the books router.
  - In `app.js`, mount your `api/index.js` router under `/api`, and remove the routes you moved out.
- [ ] **Add dev middleware:** Install `cors` and `morgan`. Add `app.use(cors())` so a future frontend can talk to your server, and `app.use(morgan("dev"))` to log every request in your terminal.
- [ ] **Reviews (a second, nested resource):** Create `api/reviews.js`. Reviews belong to a book through a `bookId` field.
  ```js
  let reviews = [
    { id: 1, bookId: 1, reviewer: "Alice", rating: 5, comment: "Must-read for any developer." },
    { id: 2, bookId: 1, reviewer: "Bob", rating: 4, comment: "Dense but rewarding." },
    { id: 3, bookId: 3, reviewer: "Charlie", rating: 5, comment: "One of the best sci-fi novels ever written." },
  ];

  let nextReviewId = 4;
  ```
  - [ ] `GET /api/books/:bookId/reviews` — return all reviews where `review.bookId === Number(req.params.bookId)`.
  - [ ] `POST /api/books/:bookId/reviews` — read `reviewer`, `rating`, `comment` from `req.body`. Create a new review with the next id and the correct `bookId`. Respond `201`.
  - [ ] `DELETE /api/reviews/:id` — delete a review by its own id. Respond `204`.
  - [ ] On the POST review route, return `400` if `rating` is missing or is not a number between 1 and 5.
  - [ ] Mount this router in `api/index.js` under both `/books` and `/reviews`, since it needs to answer to both URL shapes.
- [ ] Add `GET /api/books/:id/reviews` that also includes the book's own data, not just the reviews.
- [ ] Add pagination to `GET /api/books` using `?page=1&limit=3` query params.
- [ ] Add `PATCH /api/reviews/:id` to update a review.
- [ ] Add `GET /api/books/available` that returns only books where `available` is `true`. (Hint: this route must be defined **before** `/api/books/:id`, or Express will treat `"available"` as an id.)
- [ ] Add middleware that counts every request that hits your server and logs the running total.

## Finished Checklist

Before submitting, verify:

- [ ] `node app.js` starts without errors.
- [ ] `GET /api/books` returns all 5 starter books.
- [ ] `GET /api/books/:id` returns one book, or `404` if not found.
- [ ] `POST /api/books` creates a new book; `GET /api/books` confirms it's there.
- [ ] `PATCH /api/books/:id` changes only the fields you sent.
- [ ] `DELETE /api/books/:id` removes the book; `GET /api/books` confirms it's gone.
- [ ] Your work has been committed and pushed to GitHub.
