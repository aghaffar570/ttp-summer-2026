# Assignment 10: Sequelize (ORM) — Books API + Database

## Goal

Replace the in-memory array in your Books API with a real PostgreSQL database — connecting Sequelize, defining one model, and rewriting your existing routes to read and write real rows instead of a JS array.

## Why This Matters

The starter repo below already has five working routes against a plain array — the same Express CRUD you built in Assignment 08. That array disappears every time you restart `node app.js` — that's the exact problem PostgreSQL solves. Sequelize is the bridge: it's still PostgreSQL underneath, but instead of writing raw SQL strings by hand, you call JavaScript methods and Sequelize generates the SQL for you.

Today is deliberately just **one table**. Get connecting, defining a model, and querying it to feel solid before anything relates to anything else — a second model and the relationship between them is a separate session, not today.

## Objectives

You will practice:

- Connecting Sequelize to a PostgreSQL database.
- Defining a model with the correct data types and constraints.
- Using `db.sync()` to create a table from your model.
- Performing CRUD operations with Sequelize methods instead of array methods.

## Resources

- Sequelize — Getting Started: https://sequelize.org/docs/v6/getting-started/
- Sequelize — Model Basics: https://sequelize.org/docs/v6/core-concepts/model-basics/
- Sequelize — Model Querying Basics: https://sequelize.org/docs/v6/core-concepts/model-querying-basics/
- Sequelize — Model Instances (update/destroy): https://sequelize.org/docs/v6/core-concepts/model-instances/
- Sequelize — Data Types: https://sequelize.org/docs/v6/core-concepts/model-basics/#data-types

## Setup

You're starting from a provided repo today, not your own Assignment 08 code — this keeps everyone on the same starting point regardless of where your own Books API ended up.

- [ ] Go to https://github.com/aghaffar570/books-api-starter
- [ ] Click **Fork** (top right of the page). This copies the repo to your own GitHub account.
- [ ] Clone your fork: `git clone <your-fork-url>`
- [ ] `cd books-api-starter`
- [ ] `npm install`
- [ ] Then install today's new packages: `npm install sequelize pg pg-hstore`
- [ ] Create your database: `psql -U postgres -c "CREATE DATABASE books_api;"`
- [ ] Open `app.js`, `db/index.js`, and `models/book.js` — all three already have `// Workshop Part ...` comments marking exactly where each part below goes.

```text
books-api-starter/
├── app.js
├── db/
│   └── index.js     ← your Sequelize connection
└── models/
    └── book.js       ← your Book model
```

---

## Part 1: Connect to PostgreSQL

**Why:** Before Sequelize can run a single query, it needs to know which database to talk to — the same idea as the connection string you can use with raw `pg` and with `psql` itself.

In `db/index.js`:

- [ ] Import `Sequelize` from the `sequelize` package.
- [ ] Create a new `Sequelize` instance pointed at your `books_api` database.
- [ ] Export the instance. Every other file that needs the database imports it from this one file, and only this one file.

**Hint:** the connection string is `postgres://localhost:5432/books_api`. Sequelize's `new Sequelize(...)` takes that string as its first argument. See "Connecting to a database" in the Getting Started docs.

**Check it:** in `app.js`, temporarily add:
```
db.authenticate().then(() => console.log("DB connected")).catch(console.error)
```
Run `node app.js`. You should see "DB connected" in your terminal. Remove this check once it works — it was just to confirm the wiring, not something your app needs permanently. You should now sync the db.

---

## Part 2: Define the Book Model

**Why:** A model is how Sequelize learns the shape of a table before the table exists. Nothing happens to PostgreSQL yet — this step is just a JavaScript description of what a `Book` looks like.

In `models/Book.js`:

- [ ] Import `DataTypes` from `sequelize`, and import your `db` connection.
- [ ] Define a `Book` model with these fields:

| Field | Type | Constraints |
|---|---|---|
| `title` | `STRING` | `allowNull: false` |
| `author` | `STRING` | `allowNull: false` |
| `genre` | `STRING` | |
| `publishedYear` | `INTEGER` | |
| `available` | `BOOLEAN` | `defaultValue: true` |

- [ ] Export the model.

**Hint:** look at "Model definition" in the Model Basics docs — the method you're looking for takes a model name as its first argument, and an object of field definitions as its second. Each field in that object can have a `type` plus whatever constraints from the table above apply to it.

**Explain:** you didn't define an `id` field anywhere in the table above. Where does it come from, and what does it default to?

---

## Part 3: Create the Table

**Why:** Defining a model in JavaScript doesn't touch PostgreSQL by itself. A separate step is what actually creates the table from that definition.

In `app.js`:

- [ ] Import your `Book` model (this is what registers it with the connection).
- [ ] Before `app.listen` runs, call the sync method on your `db` connection. It returns a Promise — make sure the server doesn't start accepting requests until that Promise resolves.
- [ ] Run `node app.js`.

**Check it:** `psql -U postgres -d books_api -c "\dt"` should now show a `Books` table. (Sequelize pluralizes and capitalizes your model name by default — `Book` the model becomes `Books` the table.)

**Explain:** the sync method has an option that drops and recreates every table from scratch. What argument turns that on, and why would you never want to call it that way outside of a seed script?

---

## Part 4: Replace the Routes

**Why:** This is the actual payoff — the same five routes you already built and tested in Postman, now reading and writing real database rows instead of a plain array.

In `app.js`, replace the in-memory logic one route at a time. Keep the same paths and the same status codes you already have — only what happens *inside* each handler changes.

- [ ] `GET /api/books` — fetch every row from the `Book` table. Look for the method that returns an array of all matching rows.
- [ ] `GET /api/books/:id` — fetch one book by its primary key. The method for this takes an id directly — no more `.find()` with a callback. If nothing comes back, you still need your `404`.
- [ ] `POST /api/books` — create a new book directly from `req.body`. Notice you no longer manage a `nextId` variable yourself — who's responsible for assigning the id now?
- [ ] `PATCH /api/books/:id` — find the book first. If it doesn't exist, `404`, same as before. If it does, there's an instance method that updates it in place — call that, then send back the result.
- [ ] `DELETE /api/books/:id` — find the book first, then call its instance method for removing itself. Same `404` rule as the others.
- [ ] Delete the `books` array and the `nextId` variable. Nothing should reference them anymore.

**Hint:** every Sequelize method here returns a Promise — `await` every single one. The four methods you need are covered across Model Querying Basics (for finding/creating) and Model Instances (for updating/destroying an instance you already found).

**Explain:** the method for finding one book by id returns `null`, not `undefined`, when nothing matches. What goes wrong if you call an instance method directly on that result without checking for `null` first?

---

## Common Gotchas

- All Sequelize methods are **async** — forgetting `await` means you're sending back a Promise object, not your data.
- The find-by-id method returns `null` when nothing matches, never an error and never `undefined`. Always check before acting on the result.
- Sequelize's default table names are pluralized and PascalCase (`Books`, not `books` or `book`). That's why a raw `psql` query against it needs double quotes: `SELECT * FROM "Books"`.
- The "wipe and recreate" sync option deletes existing data every time it runs. Reserve it for a seed script — never call it from your normal `app.js` startup.

## Coming Later

This assignment is intentionally scoped to one table. Once connecting, defining a model, and querying it through Sequelize all feel automatic, the next session adds a second model (`Review`) and the relationship between `Book` and `Review` — associations and loading related data together. Don't go looking for that yet; it isn't part of this assignment.

## Stretch Challenges

If you finish early:

- [ ] Add `?genre=` filtering to `GET /api/books` — look for the `where` option on the same method you used for fetching all books.
- [ ] Write a `seed.js` script that inserts several books at once using a bulk-insert method, instead of POSTing them one at a time in Postman.
- [ ] Look up `Op.like` in the Sequelize docs. Could you use it to let `GET /api/books?search=dune` match partial titles?

## How to Submit Your Work

All of today's code lives in your `books-api-starter` fork. That's the repo you push.

Steps:
- [ ] Open your terminal. Make sure you are inside your `books-api-starter` folder.
- [ ] Run `git add .`
- [ ] Run `git commit -m "connect books api to postgres with sequelize"`
- [ ] Run `git push`
- [ ] Go to your fork on GitHub. Confirm your changes are there.

**Submit:** Copy your fork's URL and submit that link.

## Finished Checklist

Before submitting, verify:

- [ ] `node app.js` starts, connects to PostgreSQL, and logs "Server running on port 8080".
- [ ] `psql -U postgres -d books_api -c "\dt"` shows a `Books` table.
- [ ] All five routes work in Postman, against real rows in the database — not the old array.
- [ ] The in-memory `books` array and `nextId` variable are completely removed from `app.js`.
- [ ] Every Sequelize call in your routes has an `await` in front of it.
- [ ] Your work is committed and pushed to your `books-api-starter` fork on GitHub.
