# Assignment 09: PostgreSQL — Library Database

## Goal

Design and query a relational database from scratch using raw SQL — practicing table creation, all four CRUD operations, foreign keys, and JOIN queries.

## Objectives

You will practice:

- Connecting to PostgreSQL using `psql`.
- Creating a database and tables with the correct data types and constraints.
- Writing `INSERT`, `SELECT`, `UPDATE`, and `DELETE` statements.
- Filtering, sorting, and limiting results.
- Defining primary keys and foreign key relationships.
- Writing `JOIN` queries to combine data across tables.
- Running a SQL seed file to reset the database.

## Problem

Design and populate a **Library Database** for a small public library. The database will track books, members, and checkouts (which member borrowed which book and when).

All work goes in `.sql` files. You'll run them with `psql`.

Create a project folder:

```bash
mkdir library-db
cd library-db
```

Create two files:

```text
library-db/
├── seed.sql      ← creates tables and inserts data
└── queries.sql   ← your SELECT / UPDATE / DELETE queries
```

## Database Schema

Your database should contain these three tables:

**`members`**
| Column | Type | Constraints |
|---|---|---|
| `id` | `SERIAL` | `PRIMARY KEY` |
| `name` | `VARCHAR(100)` | `NOT NULL` |
| `email` | `VARCHAR(150)` | `NOT NULL UNIQUE` |
| `membership_type` | `VARCHAR(20)` | default `'standard'` |
| `joined_at` | `TIMESTAMP` | default `NOW()` |

**`books`**
| Column | Type | Constraints |
|---|---|---|
| `id` | `SERIAL` | `PRIMARY KEY` |
| `title` | `VARCHAR(200)` | `NOT NULL` |
| `author` | `VARCHAR(100)` | `NOT NULL` |
| `genre` | `VARCHAR(50)` | |
| `published_year` | `INTEGER` | |
| `available` | `BOOLEAN` | default `true` |

**`checkouts`**
| Column | Type | Constraints |
|---|---|---|
| `id` | `SERIAL` | `PRIMARY KEY` |
| `book_id` | `INTEGER` | `REFERENCES books(id) ON DELETE CASCADE` |
| `member_id` | `INTEGER` | `REFERENCES members(id) ON DELETE CASCADE` |
| `checked_out_at` | `TIMESTAMP` | default `NOW()` |
| `returned_at` | `TIMESTAMP` | nullable (null = not returned yet) |

## Assignment Tasks

### Part 1: Setup

- [ ] Create the database:
  ```bash
  psql -U postgres -c "CREATE DATABASE library;"
  ```
- [ ] Connect to it:
  ```bash
  psql -U postgres -d library
  ```
- [ ] From inside psql, confirm the connection with `\conninfo`.

### Part 2: seed.sql — Create Tables

Write `seed.sql`. Every time you run it, it should fully reset the database.

- [ ] Start with `DROP TABLE IF EXISTS` for all three tables in the correct order (checkouts first, then books and members — because of foreign key dependencies).
- [ ] Write `CREATE TABLE` statements for all three tables using the schema above.
- [ ] Insert at least **6 members** with a mix of `standard` and `premium` membership types.
- [ ] Insert at least **10 books** across at least 3 genres. Set `available = false` for at least 2 books.
- [ ] Insert at least **5 checkouts** — some returned (with a `returned_at` value), some not (leave `returned_at` as `NULL`).

Run your seed file:

```bash
psql -U postgres -d library -f seed.sql
```

Connect and verify with `\dt` and `SELECT * FROM members;`.

### Part 3: queries.sql — SELECT Queries

Write each query in `queries.sql` with a comment label above it.

- [ ] Select all books.
- [ ] Select only the `title` and `author` columns from all books.
- [ ] Select all books in the `'Sci-Fi'` genre.
- [ ] Select all books that are currently available (`available = true`).
- [ ] Select all members whose `membership_type` is `'premium'`.
- [ ] Select all books ordered by `published_year` descending (newest first).
- [ ] Select the 3 most recently added members (`ORDER BY joined_at DESC LIMIT 3`).
- [ ] Select all books where the author's name contains the letter `'a'` (case-insensitive).

### Part 4: queries.sql — INSERT, UPDATE, DELETE

Continue in `queries.sql`:

- [ ] Insert a new member.
- [ ] Insert a new book.
- [ ] Insert a new checkout row linking one of your members to one of your books.
- [ ] Update a book's `available` status to `false` after it's checked out.
- [ ] Update a checkout's `returned_at` to `NOW()` to mark it as returned.
- [ ] Update that book's `available` status back to `true`.
- [ ] Delete a member by id.
- [ ] Confirm the member's checkouts were also deleted (because of `ON DELETE CASCADE`).

### Part 5: queries.sql — JOIN Queries

- [ ] Write a `JOIN` query that returns every checkout with the **member's name** and the **book's title**.
- [ ] Write a query that returns all checkouts where `returned_at IS NULL` (currently checked out), with member name and book title.
- [ ] Write a query that returns all checkouts where `returned_at IS NOT NULL` (already returned), with member name and book title.
- [ ] Write a query that counts how many books each member has checked out. Include member name and count. Order by count descending.
- [ ] Write a query that returns all books that have **never** been checked out. (Hint: `LEFT JOIN` + check for `NULL`.)

## Common Gotchas

- **Always use `WHERE` with `UPDATE` and `DELETE`.** Without it, every row is affected.
  ```sql
  DELETE FROM members; -- deletes ALL members. Always add WHERE.
  ```
- Drop tables in the right order in your seed file. If `checkouts` references `books`, you must drop `checkouts` first.
- `SERIAL` handles auto-incrementing ids — do not provide an id in your `INSERT` statements.
- `NULL` is not the same as an empty string. `WHERE returned_at = NULL` never matches anything — use `WHERE returned_at IS NULL`.
- Single quotes `'like this'` for string values. Double quotes `"like this"` for column/table identifiers. They are not interchangeable.
- After running your seed file, the id sequence resets. If you inserted then deleted rows before re-seeding, ids may not start at 1. This is expected.

## Industry Standards

- Always write a seed file — being able to reset to a known state is essential during development.
- Column names are conventionally `snake_case` in SQL (not camelCase).
- Foreign key columns are named `<resource>_id` by convention (`book_id`, `member_id`).
- `ON DELETE CASCADE` is a deliberate choice — use it when child rows are meaningless without the parent. If child rows should be preserved, use `ON DELETE SET NULL` or restrict the delete.
- In production, never `DROP TABLE` to make changes. Write a migration that `ALTER TABLE`s instead.

## Stretch Challenges

If you finish early:

- [ ] Write a query that returns the most-borrowed book (the one with the most checkout rows).
- [ ] Write a query that returns members who have not made any checkouts at all.
- [ ] Add a `due_date` column to `checkouts` (7 days after `checked_out_at`) and write a query to find overdue books.
- [ ] Add a `fine_amount` column to `checkouts` and write an `UPDATE` that sets a fine on all overdue unreturned checkouts.
- [ ] Write a `VIEW` named `current_checkouts` that encapsulates the "currently checked out" query.

## Finished Checklist

Before submitting, verify:

- [ ] `seed.sql` runs without errors and creates all three tables.
- [ ] All three tables have the correct columns, types, and constraints (`\d members`, `\d books`, `\d checkouts`).
- [ ] Foreign key constraints are in place — try deleting a member and verify their checkouts disappear.
- [ ] All SELECT queries in `queries.sql` return the expected results.
- [ ] UPDATE and DELETE queries target specific rows (not all rows).
- [ ] All JOIN queries return combined data from two or more tables.
- [ ] Your work has been committed and pushed to GitHub.
