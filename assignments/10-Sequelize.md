# Assignment 10: Sequelize (ORM) — Books API + Database

## Goal

Replace the in-memory array from the Express assignment with a real PostgreSQL database using Sequelize — practicing model definition, associations, and full async CRUD with an ORM.

## Objectives

You will practice:

- Connecting Sequelize to a PostgreSQL database.
- Defining models with the correct data types and constraints.
- Using `db.sync()` to create tables from models.
- Performing CRUD operations with Sequelize methods.
- Defining and using `hasMany` / `belongsTo` associations.
- Eager loading related data with `include`.
- Writing a seed script to populate the database.

## Problem

Return to the **Books API** you built in Assignment 08. You'll keep the same Express routes and file structure but replace every in-memory array operation with a Sequelize database call.

**Start from your Assignment 08 code** (copy it or continue in the same repo):

```bash
cp -r books-api books-api-db
cd books-api-db
npm install sequelize pg pg-hstore
```

Create a database for this project:

```bash
psql -U postgres -c "CREATE DATABASE books_api;"
```

## Project Structure

Add these files and folders to your existing project:

```text
books-api-db/
├── app.js
├── db/
│   └── index.js          ← Sequelize connection
├── models/
│   ├── index.js          ← define associations, export models
│   ├── Book.js
│   └── Review.js
├── seed.js               ← script to populate the database
└── api/
    ├── index.js
    ├── books.js
    └── reviews.js
```

## Assignment Tasks

### Part 1: Database Connection

In `db/index.js`:

- [ ] Import `Sequelize` from `"sequelize"`.
- [ ] Create a Sequelize instance connected to `postgres://localhost:5432/books_api`.
- [ ] Set `logging: false` for now (or `console.log` if you want to see the generated SQL).
- [ ] Export the `db` instance.

Verify the connection works by adding this test to `app.js` temporarily:
```js
const db = require("./db");
db.authenticate().then(() => console.log("DB connected")).catch(console.error);
```

### Part 2: Book Model

In `models/Book.js`:

- [ ] Import `DataTypes` and `db`.
- [ ] Define a `Book` model with these fields:

| Field | Type | Constraints |
|---|---|---|
| `title` | `STRING` | `allowNull: false` |
| `author` | `STRING` | `allowNull: false` |
| `genre` | `STRING` | |
| `publishedYear` | `INTEGER` | |
| `available` | `BOOLEAN` | `defaultValue: true` |

- [ ] Export the model.

### Part 3: Review Model

In `models/Review.js`:

- [ ] Define a `Review` model with these fields:

| Field | Type | Constraints |
|---|---|---|
| `reviewer` | `STRING` | `allowNull: false` |
| `rating` | `INTEGER` | `allowNull: false` |
| `comment` | `TEXT` | |

- [ ] `bookId` will be added automatically via the association — do not define it manually.
- [ ] Export the model.

### Part 4: Associations

In `models/index.js`:

- [ ] Require both models.
- [ ] Define the association:
  ```js
  Book.hasMany(Review, { foreignKey: "bookId" });
  Review.belongsTo(Book, { foreignKey: "bookId" });
  ```
- [ ] Export `{ Book, Review }`.

### Part 5: Sync and Seed

In `app.js`:

- [ ] Require `models/index.js` (this registers the models and associations).
- [ ] Call `db.sync()` before `app.listen()`:
  ```js
  db.sync().then(() => {
    app.listen(8080, () => console.log("Server running on port 8080"));
  });
  ```
- [ ] Run `node app.js` — Sequelize should create the `Books` and `Reviews` tables automatically. Verify with `psql -U postgres -d books_api -c "\dt"`.

In `seed.js`:

- [ ] Import `{ Book, Review }` and `db`.
- [ ] Call `db.sync({ force: true })` to wipe and recreate tables.
- [ ] Use `Book.bulkCreate([...])` to insert at least 5 books.
- [ ] Use `Review.bulkCreate([...])` to insert at least 3 reviews (with correct `bookId` values).
- [ ] Call `process.exit()` when done.
- [ ] Run: `node seed.js`. Then verify the data is there:
  ```bash
  psql -U postgres -d books_api -c "SELECT * FROM \"Books\";"
  ```

### Part 6: Update the Books Routes

Replace the in-memory logic in `api/books.js` with Sequelize calls. Import `{ Book }` from `../models`.

- [ ] `GET /api/books` — `Book.findAll()`. If `req.query.genre` is provided, filter with `where: { genre: req.query.genre }`.
- [ ] `GET /api/books/:id` — `Book.findByPk(Number(req.params.id))`. Return `404` if `null`.
- [ ] `POST /api/books` — `Book.create(req.body)`. Respond with `201` and the new book.
- [ ] `PATCH /api/books/:id` — find by pk, then `book.update(req.body)`. Respond with the updated book.
- [ ] `DELETE /api/books/:id` — find by pk, then `book.destroy()`. Respond with `204`.

Remove the in-memory `books` array and `nextId` variable entirely.

### Part 7: Update the Reviews Routes

Replace the in-memory logic in `api/reviews.js` with Sequelize calls. Import `{ Review }` from `../models`.

- [ ] `GET /api/books/:bookId/reviews` — `Review.findAll({ where: { bookId: Number(req.params.bookId) } })`.
- [ ] `POST /api/books/:bookId/reviews` — `Review.create({ ...req.body, bookId: Number(req.params.bookId) })`. Respond with `201`.
- [ ] `DELETE /api/reviews/:id` — find by pk, destroy, respond with `204`.

### Part 8: Eager Loading

- [ ] Update `GET /api/books/:id` to also return the book's reviews:
  ```js
  Book.findByPk(id, { include: Review })
  ```
- [ ] Test in Postman — the response should include a `Reviews` array on the book object.
- [ ] Add a route `GET /api/reviews/:id` that returns a single review with its associated book:
  ```js
  Review.findByPk(id, { include: Book })
  ```

## Common Gotchas

- All Sequelize methods are **async** — always `await` them. Forgetting `await` means you're responding with a Promise object, not data.
- `findByPk()` returns `null` if the record doesn't exist. Call `.update()` or `.destroy()` on `null` and the server crashes. Always check: `if (!book) return res.sendStatus(404)`.
- Sequelize table names are **pluralized and PascalCase** by default (`"Books"`, `"Reviews"`). This affects raw `psql` queries — use `SELECT * FROM "Books"` with double quotes.
- `db.sync({ force: true })` drops and recreates all tables every time. Only run this in your seed script — never in `app.js` in production.
- Associations must be defined **before** `db.sync()` is called, or the foreign key column won't be created.
- `Book.create(req.body)` passes all body fields to the model. If someone sends a field your model doesn't define, Sequelize ignores it — but be intentional about what you accept in production (allowlist fields).

## Industry Standards

- Keep the Sequelize connection in one place (`db/index.js`) and import it everywhere — never create multiple connections.
- Put all associations in `models/index.js` — this makes the dependency graph clear and avoids circular require issues.
- Use `findOrCreate()` in seed scripts to avoid duplicate data if the seed is run twice without `force: true`.
- Never commit a seed file that drops production data — use a separate dev seed and a prod migration strategy.
- In production, `db.sync()` is replaced by migrations — Sequelize CLI generates and runs these.

## Stretch Challenges

If you finish early:

- [ ] Add an `averageRating` virtual field to the `Book` model that computes the average across all its reviews.
- [ ] Add `GET /api/books` query support for `?available=true` using Sequelize `where`.
- [ ] Use `Op.like` to add `?search=dune` filtering on title.
- [ ] Add a `User` model and make reviews belong to a user (add `userId` to reviews).
- [ ] Add `order: [["createdAt", "DESC"]]` to all `findAll` calls so newest items appear first.

## Finished Checklist

Before submitting, verify:

- [ ] `node seed.js` runs without errors and populates the database.
- [ ] `node app.js` starts and logs `"Server running on port 8080"`.
- [ ] All five book routes work correctly in Postman.
- [ ] `GET /api/books/:id` includes the book's reviews in the response.
- [ ] Review routes work for GET, POST, and DELETE.
- [ ] The in-memory arrays from Assignment 08 are completely removed.
- [ ] No route handler is missing `await` on a Sequelize call.
- [ ] Your work has been committed and pushed to GitHub.
