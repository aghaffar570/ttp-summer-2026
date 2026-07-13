# Frontend Review (Week 6, after Client-Side Routing)

Comprehensive pass over everything frontend-related so far. It includes topics from HTML-CSS, JS, DOM, DOM-Part2, React, React2, APIRequests, FrontendIntegration, and ClientSideRouting

### HTML & CSS (should know each idea - we will cover in the context of REACT) ✅
- semantic tags vs. div soup (`header`/`nav`/`main`/`section`/`footer`)
- forms: `label` connected to `input` via `for`/`id`, `required`, input types
- box model + `box-sizing: border-box`
- CSS variables in `:root`
- selectors: element, class, descendant, child, pseudo-class/pseudo-element
- flexbox for layout
- mobile-first responsive design + `@media (min-width: ...)`
- styling in Vite — inline vs. external stylesheet vs. Tailwind (i will go over tailwind with REACT)

### JavaScript Fundamentals (go back to workshop 1 & 2 to review JS fundamentals)
- `const` vs `let`, primitives vs. objects
- `typeof` gotchas (`typeof null`, `typeof []`)
- `==` vs `===`, truthy/falsy values
- function declarations vs. expressions vs. arrow functions
- array methods: `map`/`filter`/`find`/`some`/`every`/`reduce`/`includes`
- destructuring, rest, spread
- mutation vs. creating new copies — why this matters once React enters the picture

### DOM Manipulation (good to know for vanilla JS but we handle it differently in REACT)

- selecting elements: `getElementById`/`querySelectorAll`, HTMLCollection vs. NodeList
- `textContent` vs. reading/writing attributes
- `classList` (`add`/`remove`/`toggle`) instead of inline styles
- attributes vs. properties (`getAttribute`/`setAttribute` vs. `.value`)
- event listeners + event delegation (`event.target` vs. `event.currentTarget`)
- `closest()` to walk up the tree from a click target
- creating elements dynamically (`createElement`/`appendChild`)
- form basics: `preventDefault()`, `form.reset()`

### React Fundamentals ✅
- components + JSX
- props — passing data down, prop drilling
- `useState` — state vs. plain variables, why direct mutation doesn't re-render
- rendering lists with `.map()` + `key`
- updating state immutably (spread for objects/arrays instead of mutating)
- conditional rendering (ternary, if/else, early return / guard clauses)
- controlled inputs (`value` + `onChange`)
- handling forms (`preventDefault`, building an object from state, clearing inputs after submit)
- component extraction — when and why to split UI into a new file
- react lifecycle, in plain terms — what causes a re-render, and when
- nesting components with children
- styling

### Hooks Deep Dive ✅
- `useEffect` — what a "side effect" is, when the callback runs, the dependency array (`[]` = once)
- why the function passed to `useEffect` can't be `async` itself (and the inner-function workaround)
- hooks in general — rules of hooks (top level only, same order every render)
- `useState` vs. `useEffect` — which tool for which job
- ⚠️ `useContext` - avoid prop drilling - properly manage state across the app
- ⚠️ `useRef` - useful to reference a mutable object and keep the value upon re-renders
- ⚠️ `custom hooks` - create your own hooks!

### Data Fetching ✅
- `fetch` + `async`/`await`
- the three states of any request: loading / error / success
- axios as an alternative to `fetch` — worth introducing now? (auto JSON parsing, error handling differences, wasn't used in any workshop so far)
- separating fetch logic into named functions (`fetchUsers`) instead of anonymous callbacks
- connecting to their OWN Express backend vs. a public API — two servers, two ports, CORS
- full CRUD from the frontend: GET/POST/DELETE/PATCH, headers, `JSON.stringify`
- keeping client state in sync with the server — calling the setter only after the request succeeds

### Client-Side Routing (just covered — reinforce concepts) ✅
- `Routes`/`Route`, index routes
- `Link`/`NavLink` vs. a plain `<a>`
- `useParams` — dynamic segments, and the string-vs-number id gotcha
- `useNavigate` — programmatic navigation after an action (e.g. form submit)
- catch-all 404 route + why route order matters
- foreshadowed but not required yet: `Outlet`/nested layouts, `useSearchParams`, `useLocation`, protected routes with `Navigate`


### Loose Threads Worth Naming (awareness, not deep review)
- environment variables for API URLs (`import.meta.env`) — mentioned once as a stretch goal, likely hasn't landed for most students
- why refreshing the page loses anything added/deleted client-side only — good setup for "this is exactly what Week 7's real database fixes"

---

# Backend Review (Week 6, after Client-Side Routing)

Same comprehensive pass, backend side. Pulled from Express (Books API), Middleware (Recipes API), Sequelize I (Books + Postgres), Sequelize II (Associations), ServerCheckpoint (Plants API), and FullStack (Quotes — all three layers connected).

> **⚠️ = not yet covered.** These are the gaps to close in review (Week 6) before the Week 7 CRUD/Auth solo and the capstone. Everything unmarked was taught and is being reinforced.

### Node.js & Tooling Fundamentals (⚠️ gaps — never had a dedicated workshop)
- ⚠️ **module system — CommonJS vs. ES Modules.** Same word "module," two different systems. The backend workshops used CommonJS (`require(...)` / `module.exports`); React + Vite used ES Modules (`import` / `export`). That's why the two halves of their stack *looked* different. Node defaults to CommonJS; adding `"type": "module"` to `package.json` flips a Node project to `import`/`export`. Naming this removes a source of quiet confusion 
- ⚠️ **the `"scripts"` block in `package.json`.** It turns a long command into a short name: `npm run dev` instead of `nodemon app.js`, `npm start` instead of `node app.js`. Two reasons it matters now: (1) it's where `nodemon` lives so you stop retyping it, and (2) deployment platforms (Vercel/Neon in Week 7) look at `scripts` to know how to start the app — no `start` script, no deploy. Check npm for reference.

### Express Fundamentals
- what a server is, client vs. server, why Postman exists (testing without a frontend)
- `app.get`/`app.post`/`app.patch`/`app.delete` — a route as "method + path → handler"
- `req.params` (route params, e.g. `:id`) vs. `req.query` (`?type=...`) vs. `req.body`
- `req.params.id` is always a string — `Number()` it before comparing to a stored id
- `express.json()` — without it, `req.body` is always `undefined`
- status codes that match what happened: `200` read/updated, `201` created, `204` deleted (no body), `404` not found, `400` bad input, `500` server error
- every route must send back exactly one response — a missing `return` before an early `res.sendStatus(404)` causes a "headers already sent" crash
- restarting the server after every change (`node app.js`) — Express doesn't hot-reload on its own (nodemon fixes this and it is a tool but not required)
- ⚠️ **`res.redirect("/some/path")`** — instead of sending data back, tell the browser to go make a fresh request at a different route. Comes up the moment you build an auth flow ("not logged in → redirect to login") or a post-submit "send them back to the list" on the server side. One line, but you've never seen a route hand the client off to another route.
- ⚠️ **`res.sendFile(path)`** — a route can send back an actual **file** (an HTML page, a PDF, an image) instead of JSON. So far every route sent `res.json(...)`; Express can also hand over a whole file. (Awareness — we don't need it, because Vite serves our React frontend and we only use the backend to access data from the database.)
- ⚠️ **`express.static("public")`** — point Express at a folder and it serves everything in it (images, CSS, a built React app) automatically, no route per file. This is how a single server can host both an API *and* a website. (Awareness — with Vercel + Vite our frontend is hosted separately, so we don't use this. Named so you recognize it in a tutorial that runs everything from one server.)
- ⚠️ **an Express-side catch-all route** (`app.get("*", ...)` or an `app.use(...)` with no path, placed **last**) — runs when no earlier route matched. Two common uses: return a tidy `404` for unknown API routes, or send `index.html` so a single-server React app survives a page refresh. **Not the same as React Router's `*` route** — that one renders a `<NotFound>` component *in the browser*; this one runs *on the server* before any HTML exists. (We build the JSON-404 version in the review workshop.)

### Middleware
- the shape: `(req, res, next)` — forgetting to call `next()` hangs the request forever
- `app.use(fn)` runs on every request; order matters — it only affects routes registered *after* it
- route-specific middleware — passing a validation function as an extra argument before the handler
- centralized error handling — an error-handling middleware takes **four** params (`err, req, res, next`), lives after all routes, and is reached via `next(err)` from a `catch` block
- going from hand-rolled to package once the mechanic is understood: manual logger → `morgan`, manual CORS header → `cors`
- CORS, in plain terms: browsers block a frontend on one port from calling an API on another port unless the server explicitly allows it
- ⚠️ **the three flavors of `next()`** — plain `next()` moves to the next middleware in the chain (what you know); `next(err)` jumps straight to the error-handling middleware (covered above); `next("route")` skips the *rest of this route's* handlers and drops to the next 'route that matches the same path'. Only the third is new, and it's niche 


### Organizing an Express App
- `express.Router()` — grouping routes by resource instead of one giant `app.js`
- mounting: `app.use("/api", router)` — the router file itself doesn't repeat `/api`
- nested/related resources — one resource belongs to another through a foreign-key-style field (`bookId`, `recipeId`, `plantId`) and its own nested route (`/api/books/:bookId/reviews`)
- a nested resource's own actions (e.g. deleting a single review) use its own id and its own top-level route (`/api/reviews/:id`), not the parent's path

### Sequelize + PostgreSQL
- Sequelize is a bridge — still Postgres underneath, but you call JS methods instead of writing raw SQL
- connecting: one `Sequelize` instance, exported from a single file everything else imports from
- defining a model: fields + types (`STRING`, `INTEGER`, `BOOLEAN`, `TEXT`) + constraints (`allowNull`, `defaultValue`) — this alone doesn't touch Postgres yet
- `db.sync()` — the step that actually creates the table from the model definition
- CRUD via Sequelize methods instead of array methods: fetch-all, find-by-primary-key, create, an instance's own update/destroy methods
- gotchas: every Sequelize call is async (missing `await` returns a Promise, not data); find-by-id returns `null`, never `undefined`, on no match; table names are auto pluralized + PascalCased (`Books`, not `books`); `sync({ force: true })` wipes existing data — never in normal startup, only in a seed script
- ⚠️ **`findOne({ where: { email } })` — querying by a field that isn't the primary key.** You know `findByPk`, which only works for the id. But "find the user with *this email*," "find the plant with *this slug*" — that's `findOne` + a `where` clause. **This is the single most important gap for Week 7: Auth0 or any login flow begins by looking a user up by email.** Without it you can build CRUD but not auth.
- ⚠️ **the `where` clause and `Op` operators — how filtering and search get built.** `where: { field: value }` is an exact match. For anything else you import `Op` and use `Op.gt` / `Op.lt` (greater/less than — prices, dates), `Op.like` (text search — the guts of a search bar), `Op.in` (match any value in a list). Every capstone grows a filter or a search box; this is the tool for it.
- ⚠️ **model-level validation — `validate: {}` on a field.** A field can carry its own rules: `validate: { isEmail: true, notEmpty: true, len: [8, 100] }`. Sequelize rejects bad data *before* it touches Postgres and throws a clear validation error your `catch` block can turn into a `400`. This is the missing practical half of the "validate at the boundary" standard you were already taught as a principle.
- ⚠️ **migrations vs. `sync()` — awareness only.** `sync()` looks at the model and reshapes the table to match — great for learning, but it can silently drop a column, and `{ force: true }` deletes everything. Migrations are versioned, ordered change files you run deliberately — the real-world way to evolve a live database (e.g. on Neon) without losing user data. Goal for now: know that `sync()` is a dev convenience, **not** something you point at real users' data. Don't teach writing migrations yet.

### Associations
- `hasMany` / `belongsTo` — declaring a one-to-many relationship, and why you need both sides
- the foreign key column (e.g. `bookId` on `Reviews`) is created automatically once the association is declared — but only if it's declared *before* `db.sync()` runs
- `include` — eager loading related rows in one query instead of two separate ones
- an empty array back from an `include` means "no related rows yet," not an error

### Full-Stack Integration (all three layers)
- two servers, two ports, running at the same time (React dev server + Express) — they're separate programs that talk over HTTP (a network request)
- the frontend doesn't know or care that the data now lives in Postgres — it still just calls `fetch` against the same routes
- verifying real persistence: restart the Express server and confirm data survives (the actual point of the whole database unit)
- same CRUD gotchas as ever, just end-to-end now: CORS, `express.json()`, remembering to update React state (`setX`) after a request succeeds — the request to the server and the on-screen UI are two separate things. the user does not know what the server does, nor what the server gives back; they only see the UI

### Industry Standards Worth Repeating
- validate input at the boundary, before it touches the data store - don't trust users to put correct input field values
- keep cross-cutting logic (logging, validation, auth) in middleware, not copy-pasted into every route
- reach for a maintained package once you understand what the hand-rolled version was doing (`morgan`, `cors`) — don't keep hand-rolling solved problems - if you can think of a problem, there's a chance someone has already built a solution - use it!
- split routes into files by resource once an app has more than one or two resources

### Loose Threads Worth Naming
- `.env` / `dotenv` for config like the port and API keys you want hidden
- rate limiting (`express-rate-limit`) and security headers (`helmet`) as added middlewares
- pagination and query-string filtering (`?page=`, `?genre=`) 
