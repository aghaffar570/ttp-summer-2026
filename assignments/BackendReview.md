# Backend Review Workshop — Task Manager API

We build a backend API with Express, Sequelize, and PostgreSQL, one small step at a time.

By the end you have a real API: users, tasks that belong to those users, search and filtering, validation, and clean middleware — the exact shape your capstone backend will take.

> Code is hidden in **Show the code** toggles. Try the step from the plain-English instructions first. Open the toggle if you get stuck or want to check your work.

> There is no frontend today. You test every route in **Postman** — that is what Postman is for: hitting your API directly, before any React exists.

---

## What You Will Build

- A running Express server you start with `npm run dev`
- Two connected tables: `Users` and `Tasks` (a user has many tasks)
- Full CRUD for tasks (create, read, update, delete)
- Find a user by their **email**, not just their id (the login lookup)
- Search and filter tasks with query strings (`?search=`, `?status=`, `?minPriority=`)
- Validation that rejects bad data before it reaches the database
- Middleware: a logger, a validator, and one central error handler

## What You Will Practice

- Starting a Node project from scratch (`npm init`, `package.json` scripts)
- The two module systems: `require` / `module.exports` (this) vs. `import` / `export` (React)
- Express routes, `req.body`, `req.query`, `req.params`, status codes
- `res.redirect` — sending the client to a different route
- Sequelize models, `validate`, associations, and `db.sync()`
- `findByPk` **and** `findOne({ where })` — finding by id vs. by any field
- The `where` clause and `Op` operators for filtering
- Middleware, `next()`, and centralized error handling

---

# Setup

Make a new empty folder and set up a Node project from nothing. Run these one at a time.

```bash
mkdir task-api
cd task-api
npm init -y # this says yes to everything by default
npm install express sequelize pg pg-hstore
npm install --save-dev nodemon
```

- `express` — the server. `sequelize` + `pg` — talk to Postgres. `nodemon` — restarts the server for you when a file changes (a dev tool, not shipped to production, so it goes in `--save-dev`).

**Create the database.** In your terminal:

```bash
createdb --help # check if you can run this command - if you see an output, your're good to go. otherwise, create using postico or pgAdmin
createdb task_api
```

**Add scripts to `package.json`.** Open the file `npm init` just made. Find the `"scripts"` block and make it look like this:

<details>
<summary>Show the code — package.json scripts</summary>

```json
"scripts": {
  "dev": "nodemon app.js",
  "start": "node app.js"
}
```

</details>

- A script turns a long command into a short name. `npm run dev` now means `nodemon app.js`; `npm start` means `node app.js`.
- You will use `npm run dev` all day so the server restarts on every save. `start` is the plain version — **this is the script deployment platforms look for in Week 7.**

**Make your folders.** Inside `task-api`, create these empty files and folders — we fill them in as we go:

```
task-api/
  app.js
  db.js
  models/
  routes/
```

> **Two module systems — worth naming.** All summer your backend used `require(...)` and `module.exports`; your React code used `import` and `export`. Same idea (share code between files), two different systems. Node uses **CommonJS** (`require`) by default, which is what we use today. React + Vite used **ES Modules** (`import`). You switch a Node project to `import` by adding `"type": "module"` to `package.json` — but we are staying with `require` to match everything you already wrote on the server.

npm types: https://docs.npmjs.com/cli/v11/configuring-npm/package-json#type

---

# Phase 1 — A Server That Runs

**Goal:** Get Express listening and answer one route. No database yet — first the skeleton, then we add data.

### Steps

1. In `app.js`, import `express` and create the app.
2. Add `express.json()` so the app can read JSON request bodies later.
3. Add one route: `GET /health` that sends back `{ status: "ok" }`.
4. Tell the app to listen on port `3000`.
5. Run `npm run dev`. Open Postman and send a `GET` to `http://localhost:3000/health`.

<details>
<summary>Show the code</summary>

`app.js`
```js
const express = require("express");

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
```

</details>

**✅ Done when:** Postman gets `{ "status": "ok" }` back from `/health`, and your terminal shows the "Server running" message.

**Key ideas**
- A **server** waits for requests and sends back responses. Postman is the client here — no browser needed.
- A **route** is a method + a path + a handler: `app.get("/health", handler)`.
- `express.json()` is what fills in `req.body`. Without it, `req.body` is `undefined`.
- Because you ran `npm run dev` (nodemon), the server restarts on every save. No more killing and re-running `node app.js` by hand.

**Try more:** add a second route `GET /` — we will replace it with a redirect in Phase 4.

---

# Phase 2 — Connect Postgres and Define Models

**Goal:** Connect to the database, describe two tables as Sequelize models, and add validation so bad data can't get in.

validators ref: https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/#validators

### Steps

1. In `db.js`, create one `Sequelize` instance pointed at your `task_api` database and export it.
2. In `models/User.js`, define a `User` with `name`, `email`, and `password`. Add validation: the email must be a real email, the name can't be empty, and the password must be at least 8 characters.
3. In `models/Task.js`, define a `Task` with `title`, `priority` (a number, default 1), and `status` (a string, default `"todo"`).
4. In `db.js` (or a small `models/index.js`), declare the association: a `User` **has many** `Task`s, and a `Task` **belongs to** a `User`.
5. In `app.js`, import `db` and call `db.sync()` before the server listens, so the tables get created.

<details>
<summary>Show the code</summary>

`db.js`
```js
const { Sequelize } = require("sequelize");

// If your Postgres needs a username/password, put them in the URL:
// "postgres://user:password@localhost:5432/task_api"
const db = new Sequelize("postgres://localhost:5432/task_api", {
  logging: false,
});

module.exports = db;
```

`models/User.js`
```js
const { DataTypes } = require("sequelize");
const db = require("../db");

const User = db.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { len: [8, 100] },
  },
});

module.exports = User;
```

`models/Task.js`
```js
const { DataTypes } = require("sequelize");
const db = require("../db");

const Task = db.define("Task", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },
  priority: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "todo",
  },
});

module.exports = Task;
```

`models/index.js` (declares the association in one place)
```js
const db = require("../db");
const User = require("./User");
const Task = require("./Task");

User.hasMany(Task);
Task.belongsTo(User);

module.exports = { db, User, Task };
```

`app.js` (add the sync — import from `models/index.js`)
```js
const express = require("express");
const { db } = require("./models");

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

db.sync().then(() => {
  app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
  });
});
```

</details>

**✅ Done when:** you run `npm run dev` with no errors, and in your database GUI (Postico / Beekeeper / pgAdmin) you can see two tables: `Users` and `Tasks`. `Tasks` has a `UserId` column that Sequelize added for you.

**Key ideas**
- One `Sequelize` instance, exported once, imported everywhere. That is your one connection.
- **Validation lives on the model.** `validate: { isEmail: true }` means Sequelize refuses to save a bad email — the wall is at the data layer, not scattered across routes. This is the practical half of "validate at the boundary."
- The `UserId` foreign key appears automatically **because you declared the association before `db.sync()` ran.** Declare associations first, sync second.
- `db.sync()` reads your models and reshapes the tables to match. Handy for learning — but it can silently drop a column, and `sync({ force: true })` **deletes all data**. Never point `{ force: true }` at real data.

> **`sync()` vs. migrations — awareness only.** In a real deployed app you don't let `sync()` reshape live tables, because a wrong change can wipe user data. Instead you write **migrations**: small, ordered, version-controlled files that each make one deliberate change ("add a `dueDate` column"). You run them on purpose. You don't need to write migrations today — just know that `sync()` is a development convenience, and migrations are the grown-up version you'll meet when you deploy.

---

# Phase 3 — Seed Some Data

**Goal:** Put a few rows in the database with a small script, so the routes have something to return.

### Steps

1. Make a file `seed.js`.
2. Import `db`, `User`, and `Task`.
3. Call `db.sync({ force: true })` **here only** — this wipes and rebuilds the tables so seeding is repeatable.
4. Create one user, then create a few tasks that belong to that user (pass the user's id).
5. Add a script `"seed": "node seed.js"` to `package.json`, then run `npm run seed`.

<details>
<summary>Show the code</summary>

`seed.js`
```js
const { db, User, Task } = require("./models");

async function seed() {
  await db.sync({ force: true }); // wipe + rebuild — only ever in a seed script

  const alex = await User.create({
    name: "Alex",
    email: "alex@example.com",
    password: "supersecret",
  });

  await Task.create({ title: "Write project proposal", priority: 3, status: "todo", UserId: alex.id });
  await Task.create({ title: "Review pull requests", priority: 2, status: "doing", UserId: alex.id });
  await Task.create({ title: "Water the plants", priority: 1, status: "done", UserId: alex.id });

  console.log("Seeded!");
  await db.close();
}

seed();
```

`package.json` (add to scripts)
```json
"seed": "node seed.js"
```

</details>

**✅ Done when:** `npm run seed` prints "Seeded!", and your database GUI shows one user and three tasks.

**Key ideas**
- Every Sequelize call is **async** — `await` it, or you get a Promise instead of data.
- `{ force: true }` belongs **only** in a seed script, never in `app.js`. In `app.js` it would wipe the database every time the server restarts.
- `Task.create({ ..., UserId: alex.id })` is how a task gets attached to a user — the foreign key is just a column you set.

**Try more:** seed a second user with their own tasks.

---

# Phase 4 — CRUD Routes for Tasks

**Goal:** Build the five classic routes for tasks in their own router file, and mount them under `/api/tasks`. Also add a redirect on the home route.

### Steps

1. Make `routes/tasks.js`. Create an `express.Router()`.
2. Add five routes on the router:
   - `GET /` → all tasks
   - `GET /:id` → one task by id (use `findByPk`)
   - `POST /` → create a task from `req.body`
   - `PATCH /:id` → update a task
   - `DELETE /:id` → delete a task
3. Send the right status code each time: `200` read/updated, `201` created, `204` deleted, `404` when the id doesn't exist.
4. In `app.js`, mount the router: `app.use("/api/tasks", tasksRouter)`.
5. Change the home route `GET /` to **redirect** to `/api/tasks` using `res.redirect`.

<details>
<summary>Show the code</summary>

`routes/tasks.js`
```js
const express = require("express");
const router = express.Router();
const { Task } = require("../models");

// GET all tasks
router.get("/", async (req, res) => {
  const tasks = await Task.findAll();
  res.json(tasks);
});

// GET one task by id
router.get("/:id", async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json(task);
});

// CREATE a task
router.post("/", async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json(task);
});

// UPDATE a task
router.patch("/:id", async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (!task) return res.status(404).json({ error: "Task not found" });
  await task.update(req.body);
  res.json(task);
});

// DELETE a task
router.delete("/:id", async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (!task) return res.status(404).json({ error: "Task not found" });
  await task.destroy();
  res.sendStatus(204);
});

module.exports = router;
```

`app.js` (mount the router + redirect the home route)
```js
const express = require("express");
const { db } = require("./models");
const tasksRouter = require("./routes/tasks");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.redirect("/api/tasks");
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/tasks", tasksRouter);

db.sync().then(() => {
  app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
  });
});
```

</details>

**✅ Done when:** in Postman you can list tasks (`GET /api/tasks`), fetch one, create one, update one, and delete one — each with the right status code. Visiting `http://localhost:3000/` in a browser lands you on the task list.

**Key ideas**
- `express.Router()` groups one resource's routes in one file. Mounting with `app.use("/api/tasks", ...)` adds the `/api/tasks` prefix — the router file itself doesn't repeat it.
- `findByPk` finds a row **by its primary key (the id)**, and returns `null` (never `undefined`) when there's no match.
- Every route sends exactly **one** response. Notice the `return` before each early `res.status(404)` — without it, the code keeps running and you crash with "headers already sent."
- **`res.redirect("/api/tasks")`** tells the client "go make a fresh request over there instead." Here it's a convenience. In Week 7 it's the backbone of auth: "not logged in → `res.redirect('/login')`." Same one line.

**Try more:** add a `GET /api/tasks/:id` response that includes the task's user with `include`.

---

# Phase 5 — Find a User by Email (findOne + where)

**Goal:** Look a user up by a field that **isn't** the id. `findByPk` only knows the primary key — but real apps constantly find rows by email, username, or slug. This is the exact lookup a login does.

### Steps

1. Make `routes/users.js` with its own `express.Router()`.
2. Add `GET /` that returns all users **unless** an `email` is passed in the query string (`?email=...`), in which case return just that one user.
3. To find that one user, use `findOne` with a `where` clause on the email — **not** `findByPk`.
4. Return `404` if no user has that email.
5. Mount it in `app.js`: `app.use("/api/users", usersRouter)`.
6. Test both in Postman: `GET /api/users` and `GET /api/users?email=alex@example.com`.

<details>
<summary>Show the code</summary>

`routes/users.js`
```js
const express = require("express");
const router = express.Router();
const { User } = require("../models");

router.get("/", async (req, res) => {
  const { email } = req.query;

  // Look up by a field that isn't the id
  if (email) {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: "No user with that email" });
    return res.json(user);
  }

  const users = await User.findAll();
  res.json(users);
});

module.exports = router;
```

`app.js` (add the mount)
```js
const usersRouter = require("./routes/users");
// ...
app.use("/api/users", usersRouter);
```

</details>

**✅ Done when:** `GET /api/users?email=alex@example.com` returns the single matching user, and a made-up email returns `404`.

**Key ideas**
- **`findByPk(id)` finds by the primary key only.** For anything else — email, username, a slug — you use **`findOne({ where: { field: value } })`**.
- `findOne` returns the first matching row, or `null` if there's no match.
- **This is the heart of every login.** Week 7's auth starts by doing exactly this: `User.findOne({ where: { email } })`, then checking the password. You just built the lookup half of authentication.

**Try more:** the `password` comes back in the response — that's a security smell. Return the user without it (hint: look at Sequelize's `attributes` option).

---

# Phase 6 — Search and Filter Tasks (the where clause + Op)

**Goal:** Let the client filter the task list with query strings. This is how every search bar and filter in your capstone gets built on the backend.

We want three filters on `GET /api/tasks`:
- `?search=review` → tasks whose **title contains** "review"
- `?status=todo` → tasks with an exact status
- `?minPriority=2` → tasks with **priority ≥ 2**

### Steps

1. In `routes/tasks.js`, import `Op` from Sequelize.
2. In the `GET /` route, read `search`, `status`, and `minPriority` from `req.query`.
3. Build up a `where` object, adding a condition only for the filters that were actually passed:
   - exact match for `status` → `where.status = status`
   - "contains" for `search` → `Op.iLike` with `%value%`
   - "greater than or equal" for `minPriority` → `Op.gte`
4. Pass `{ where }` to `findAll`.
5. Test each filter in Postman, and combinations like `?status=todo&minPriority=2`.

<details>
<summary>Show the code</summary>

`routes/tasks.js` (top of file + the updated GET route)
```js
const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const { Task } = require("../models");

router.get("/", async (req, res) => {
  const { search, status, minPriority } = req.query;
  const where = {};

  if (status) {
    where.status = status; // exact match
  }
  if (search) {
    where.title = { [Op.iLike]: `%${search}%` }; // contains, case-insensitive
  }
  if (minPriority) {
    where.priority = { [Op.gte]: Number(minPriority) }; // greater than or equal
  }

  const tasks = await Task.findAll({ where });
  res.json(tasks);
});
```

</details>

**✅ Done when:** `?search=review` returns only the "Review pull requests" task, `?minPriority=2` hides the priority-1 task, and combining filters narrows the list correctly. No query string still returns everything.

**Key ideas**
- `where: { field: value }` is an **exact** match. That's all you need for a status or an id.
- For everything else you import **`Op`** and use an operator as the key:
  - `Op.gte` / `Op.lte` — greater/less than or equal (numbers, dates)
  - `Op.iLike` (or `Op.like`) — text contains, with `%` as the wildcard. `iLike` ignores case.
  - `Op.in` — matches any value in a list, e.g. `{ [Op.in]: ["todo", "doing"] }`
- Building the `where` object up conditionally means one route handles "all tasks" and "filtered tasks" — the client decides by what it sends.
- Always `Number()` a query value before a numeric comparison — `req.query` values are always strings.

**Try more:** add `?status=todo,doing` (a comma-separated list) and turn it into an `Op.in` filter by splitting on the comma.

---

# Phase 7 — Middleware: Logger, Validation, and Error Handling

**Goal:** Add the kinds of middleware you'll want in every capstone: one that runs on every request (a logger), one that guards a single route (validation), one that catches routes nobody matched (a 404 fallback), and one that catches errors in one place.

### Steps

1. **Logger (runs on everything).** In `app.js`, write a function `logger(req, res, next)` that logs the method and URL, then calls `next()`. Register it with `app.use(logger)` **above** your routes.
2. **Route-specific validation.** In `routes/tasks.js`, write `requireTitle(req, res, next)` that sends `400` if `req.body.title` is missing, otherwise calls `next()`. Add it as an extra argument on the `POST` route, before the handler.
3. **Catch Sequelize validation errors.** Wrap the `create` handler in `try/catch`. If the error is a Sequelize validation error, send `400` with the message; otherwise pass it on with `next(err)`.
4. **404 catch-all.** After **all** your routes (but before the error handler), add an `app.use` with **no path** that sends `404`. It runs only when no route above it matched.
5. **Central error handler.** At the very **bottom** of `app.js` (after the 404 catch-all), add an error-handling middleware — the one with **four** parameters `(err, req, res, next)`.

<details>
<summary>Show the code</summary>

`app.js` (logger near the top, error handler at the bottom)
```js
function logger(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next();
}

app.use(express.json());
app.use(logger); // runs on every request that comes after this line

// ... your routes: app.get("/"), app.use("/api/tasks"), app.use("/api/users") ...

// 404 catch-all: no route above matched. No path, runs after all routes.
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Error-handling middleware: FOUR params, and it lives LAST
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong" });
});
```

`routes/tasks.js` (validator + guarded create with try/catch)
```js
function requireTitle(req, res, next) {
  if (!req.body.title) {
    return res.status(400).json({ error: "title is required" });
  }
  next();
}

router.post("/", requireTitle, async (req, res, next) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      return res.status(400).json({ error: err.errors[0].message });
    }
    next(err); // hand anything unexpected to the central error handler
  }
});
```

</details>

**✅ Done when:** every request prints a line in your terminal; a `POST` with no `title` returns `400` from `requireTitle`; a `GET` to a made-up route like `/api/nonsense` returns a clean `404` JSON instead of Express's default HTML error page; and a `POST` to `/api/users` with a bad email (test the user route the same way) returns a `400` validation message instead of crashing the server.

**Key ideas**
- Middleware is `(req, res, next)`. **Forgetting `next()` hangs the request forever** — nothing after it ever runs.
- `app.use(fn)` runs on **every** request registered *after* it — order matters.
- A validator passed as an extra argument (`router.post("/", requireTitle, handler)`) guards just that one route.
- A **404 catch-all** (`app.use` with no path, after all routes) runs when nothing above it matched — it turns "unknown route" into a tidy JSON `404`. It's the server-side cousin of React Router's `*` route: one runs on the server, the other in the browser.
- The **error handler is the odd one out: four parameters** (`err, req, res, next`), and it must be **last** — after even the 404 catch-all. You reach it by calling `next(err)` from a `catch`.
- There's also `next("route")` — it skips the rest of *this* route's handlers and jumps to the next route matching the same path. Niche; just know it exists.
- Your model validation and your route validation are two layers of the same idea: **reject bad input at the boundary** before it reaches the database.

**Try more:** replace your hand-written `logger` with the `morgan` package (`npm install morgan`, then `app.use(morgan("dev"))`) — the maintained version of what you just built by hand.

---

# You Did It 🎉

You built a real backend API with:

- A project set up from scratch, with `package.json` scripts
- Postgres + Sequelize models with validation and an association
- Full CRUD for tasks, plus a redirect
- A user lookup by email — the login lookup
- Search and filtering with `Op`
- Logger, validator, and a central error handler

Same shape as a real production backend. Your capstone API will use these exact pieces — and Week 7's auth is built directly on the `findOne({ where: { email } })` you wrote today.

## Quick Reference

| Concept | Where we used it |
|---|---|
| `package.json` scripts | `npm run dev`, `npm run seed`, `npm start` |
| CommonJS `require` / `module.exports` | every file |
| Model + validation | `User` (isEmail, len), `Task` |
| `hasMany` / `belongsTo` | User ↔ Task |
| `db.sync()` vs `{ force: true }` | `app.js` vs `seed.js` |
| `findByPk` | get one task by id |
| `findOne({ where })` | find a user by email |
| `where` + `Op.gte` / `Op.iLike` / `Op.in` | task filters |
| `res.redirect` | `GET /` → `/api/tasks` |
| `express.Router()` + `app.use` | `routes/tasks.js`, `routes/users.js` |
| Middleware + `next()` | logger, `requireTitle` |
| Error handler (4 params) | bottom of `app.js` |

---

## Stretch Challenges (if you finish early)

- **Tasks for one user.** Add `GET /api/users/:id/tasks` that returns only that user's tasks (hint: `where: { UserId: id }`, or `include`).
- **Sorting.** Add `?sort=priority` to the task list using Sequelize's `order` option.
- **Op.in filter.** Support `?status=todo,doing` by splitting on the comma and using `Op.in`.
- **Hide the password.** Never return the `password` field (hint: `attributes: { exclude: ["password"] }`).
- **Swap in packages.** Replace your logger with `morgan` and add `cors` so a React frontend on another port could call this API.

## Going Deeper (Later)

Not required today. Explore when you are ready.

- **Migrations** — versioned change files that replace `sync()` for real deployed databases (Sequelize CLI).
- **`dotenv`** — move your database URL and port into a `.env` file instead of hard-coding them.
- **Authentication** — Week 7. It starts with the exact `findOne({ where: { email } })` you wrote, then adds password hashing and sessions/tokens.
- **ES Modules on the backend** — try `"type": "module"` in `package.json` and convert one file from `require` to `import` to feel the difference.
