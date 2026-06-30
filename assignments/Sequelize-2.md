# Assignment 11: Sequelize Part II — Associations

## Goal

Continue from your `books-api-db` and add a second model with a real relationship. By the end, a single `GET /api/books/:id` will return a book with all its reviews embedded — and a new `POST` route will let you create a review that's automatically linked to the right book.

## Why This Matters

Most real apps aren't one table. A social app has users and posts. A store has products and orders. Your Books API has books and reviews. Sequelize's associations let you define those relationships in JavaScript, the same way foreign keys linked tables in SQL — so you can load connected data in one query instead of making several round trips.

Today adds one relationship on top of what you already built. The connection, the model pattern, the sync, and the route structure are all identical to last time — only the new pieces are new.

## Objectives

- Define a second model with the correct types and constraints.
- Use `hasMany` and `belongsTo` to declare a one-to-many relationship.
- See what `db.sync()` does when a new associated model is added.
- Use `include` to load related data in a single query.
- Add a nested route that creates a resource belonging to another.

## Resources

- Sequelize — Associations: https://sequelize.org/docs/v6/core-concepts/assocs/
- Sequelize — Eager Loading (`include`): https://sequelize.org/docs/v6/advanced-association-concepts/eager-loading/
- Sequelize — Model Querying Basics: https://sequelize.org/docs/v6/core-concepts/model-querying-basics/

---

## Setup

**If you completed Assignment 10 (`books-api-db` is working):**
Open your existing repo. Nothing new to fork or install.
- [ ] Start the server: `node app.js` should log "Server running on port 8080" with no errors.
- [ ] Hit `GET /api/books` in Postman and get back real rows from the database.
- [ ] If something is broken, fix it before adding anything new — a stable base matters more than moving fast.

**If you did not finish Assignment 10 or your server isn't connecting:**
Use the solution branch of the starter repo as your starting point instead:
- [ ] Go to https://github.com/aghaffar570/books-api-starter/tree/solution
- [ ] Fork the repo to your own GitHub account (the fork will include the `solution` branch).
- [ ] Clone your fork: `git clone <your-fork-url>`
- [ ] `cd books-api-starter`
- [ ] Switch to the solution branch: `git checkout solution`
- [ ] `npm install`
- [ ] Start the server: `node app.js` — you should see "Server running on port 8080".
- [ ] Verify it connects: `GET /api/books` in Postman should return real book rows.

From here, everyone is on the same working base — five Sequelize routes, one `Book` model, connected to PostgreSQL. Today you add one more model and wire the relationship.

---

## Part 1: Add the Review Model

**Why:** A review only makes sense attached to a specific book. Before we can link them, Sequelize needs to know what a `Review` looks like.

Create a new file `models/Review.js`:

- [ ] Import `DataTypes` and your `db` connection.
- [ ] Define a `Review` model with these fields:

| Field | Type | Constraints |
|---|---|---|
| `reviewer` | `STRING` | `allowNull: false` |
| `rating` | `INTEGER` | `allowNull: false` |
| `comment` | `TEXT` | |

- [ ] Export the model.
- [ ] Do not define a `bookId` field — the association in the next part creates it automatically.

**Hint:** the shape is identical to what you did for `Book` — `db.define(...)` with a name and a fields object. Look at your own `models/Book.js` if you need a reminder of the pattern.

**Explain:** you didn't add `bookId` to the field list above. Where will that column come from, and when will it actually appear in the database?

---

## Part 2: Wire the Association

**Why:** Declaring the association is what tells Sequelize how the two tables relate. Without it, there is no foreign key column and no way to query one from the other.

Create a new file `models/index.js`:

- [ ] Require both `Book` and `Review` at the top.
- [ ] Write the line that says one book can have many reviews.
- [ ] Write the line that says each review belongs to exactly one book.
- [ ] Export both models from this file.
- [ ] In `app.js`, update your `require` for `Book` to come from `./models` (the index file) instead of `./models/Book` directly — this is what makes the association code run before your routes use either model.

**Hint:** the two method names you're looking for are `hasMany` and `belongsTo`. Look at the Associations doc linked above — the "One-To-Many" section shows the exact pattern.

**Check it:** restart `node app.js`. Open pgAdmin or Postico and look at the `Reviews` table — you should see a `bookId` column that wasn't there before. That column was added automatically because of the association.

**Explain:** `Book.hasMany(Review)` and `Review.belongsTo(Book)` both describe the same relationship. What does each one actually add on its own — why do you need both?

---

## Part 3: Include Reviews on a Book

**Why:** This is what associations are actually for — loading related rows in one query instead of two. Sequelize runs a JOIN behind the scenes and attaches the results for you.

In `app.js`, update `GET /api/books/:id`:

- [ ] Pass an extra option to your find-by-pk call that tells it to also load the book's associated reviews.

**Hint:** the option is called `include`, and its value is the model you want to load alongside the book. Look at the Eager Loading doc or the `include` examples in the Associations page.

**Check it:** `GET /api/books/1` in Postman. The response should now include a `Reviews` key with an array. It will be empty for now — an empty array means it worked, not that something is wrong.

---

## Part 4: Create Reviews

**Why:** No point loading reviews if there is no way to add them. A nested route is the standard REST pattern for creating something that belongs to another resource.

Add a new route to `app.js`:

- [ ] `POST /api/books/:bookId/reviews` — read `reviewer`, `rating`, and `comment` from `req.body`. Get `bookId` from `req.params`. Create a new `Review` linked to that book. Respond `201` with the new review.

**Check it:**
1. In Postman, `POST /api/books/1/reviews` with body `{ "reviewer": "Ada", "rating": 5, "comment": "Loved it." }`
2. Then `GET /api/books/1` — the review should now appear inside the `Reviews` array on the book.

**Explain:** you pulled `bookId` from `req.params`, not from `req.body`. Why does it matter where that value comes from?

---

## Common Gotchas

- Associations must be defined **before** `db.sync()` runs. If the `bookId` column is missing in Postico/pgAdmin, the association isn't being called first — check that `models/index.js` is required in `app.js` before the server starts.
- If you see "Review is not associated to Book," the association line ran after the query tried to use it. Import order matters.
- `include` returns an empty array (`[]`) when a book has no reviews — not `null`, not an error. An empty array is the correct result.
- Sequelize names the key on the book `Reviews` (capitalized, pluralized) by default. That's what you'll see in the Postman response.
- All Sequelize calls are still async — every `await` from last session still applies here.

---

## Finished Checklist

Before submitting, verify:

- [ ] `node app.js` starts without errors, and both `Books` and `Reviews` tables exist in pgAdmin/Postico.
- [ ] `GET /api/books/:id` returns the book with a `Reviews` array.
- [ ] `POST /api/books/:bookId/reviews` creates a review linked to the correct book.
- [ ] After adding reviews, `GET /api/books/:id` shows them embedded on the book.
- [ ] Your work is committed and pushed to GitHub.

## How to Submit Your Work

You're submitting to the same `books-api-db` repo you pushed for Assignment 10.

- [ ] Run `git add .`
- [ ] Run `git commit -m "add Review model and associations"`
- [ ] Run `git push`

**Submit:** the same GitHub repo URL as Assignment 10.

## Stretch Challenges

If you finish early:

- [ ] Add `GET /api/books/:bookId/reviews` — return all reviews for one book without loading the whole book object.
- [ ] Add `DELETE /api/reviews/:id` — delete a single review by its own id. Notice this route starts with `/reviews`, not `/books`.
- [ ] Try deleting a book that has reviews — what happens to its reviews? Look up `onDelete` in the Sequelize association docs.
- [ ] Add a check: if `rating` is missing or isn't a number between 1 and 5, respond with `400` before creating the review.
