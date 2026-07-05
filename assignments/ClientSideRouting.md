# Assignment 11: Client-Side Routing — Quotes App

## Goal

Turn a single-page Quotes app into a multi-page app using React Router — a Home page listing all quotes, a dynamic page for viewing one quote, and an Add Quote page — all navigated client-side, with no full page reloads.

## Why This Matters

Last week you built a working Quotes app that talked to your Express backend — "All Quotes," "Add a Quote," and "Delete a Quote" were three sections stacked on one page. Real apps don't work that way: a quote gets its own URL, an "add" form gets its own URL, and clicking around between them shouldn't reload the whole page.

**No backend, no database this week.** Today's quotes live in a local JavaScript array — the whole lesson is about the frontend deciding what to show for a given URL, not about fetching data. You already know the difference between a request that goes to Express (Week 4) and a route that stays entirely in the browser (today) — this is the second kind.

## Resources

- React Router — `Routes` and `Route`: https://reactrouter.com/start/declarative/routing
- React Router — `useParams`: https://reactrouter.com/start/declarative/url-values#useparams
- React Router — `Link`, `NavLink`, and `useNavigate`: https://reactrouter.com/start/declarative/navigating

## Setup

This week starts from a **new starter repo**, `quotes-frontend-router-starter` — not your `quotes-frontend` fork from last week. It's a fresh, focused project just for practicing routing.

- [ ] Fork [`quotes-frontend-router-starter`](https://github.com/aghaffar570/quotes-frontend-router-starter) on GitHub, then clone your fork
- [ ] `cd` into the project and run `npm install`
- [ ] `npm run dev` and open the URL Vite gives you

**Look around before you write any code.** Here's what's already in the project:

```text
src/
├── main.jsx              ← already wired up for you, no need to edit
├── routes.jsx             ← all routes get defined here — TODOs marked
├── data/
│   └── quotes.js          ← 5 quotes, given to you, no need to edit
├── components/
│   └── Navbar.jsx          ← nav links, shown on every page — TODOs marked
└── pages/
    ├── Home.jsx             ← "All Quotes" page — TODOs marked
    ├── QuoteDetail.jsx       ← one quote, at /quotes/:id — TODOs marked
    ├── AddQuote.jsx           ← form, at /quotes/new — TODOs marked
    └── NotFound.jsx            ← catch-all page — TODOs marked
```

Every file with TODOs has them labeled `// TODO (Part N)`, matching the parts below. Each one tells you *what* to do in plain English — no code is given. If a TODO needs a specific React Router hook or component, it links to the exact docs page to read.

**Check it:** the page currently shows a "React Router Workshop" placeholder message and nothing else. That's expected — `main.jsx` already connects your app to React Router (read the comment there once, then ignore it), but `routes.jsx` doesn't render anything yet. Part 1 is where that changes.

---

## Part 1: The Home Route

**Why:** Before anything else can happen, React Router needs at least one route to render — the list of all quotes, at `/`.

- [ ] In `routes.jsx`: follow the TODOs to bring in what you need, then define a route so `Home` renders at the root path.
- [ ] In `pages/Home.jsx`: follow the TODOs to bring in the quote data, then display every quote's text and author. Reuse the `.quote-item` / `.quote-text` / `.quote-author` classes already in `App.css` so it looks like the list you built last week.
- [ ] Still in `Home.jsx`: make each quote a link to its own page.

**Check it:** `/` shows all 5 quotes. Each one is clickable (it just won't go anywhere useful yet — that's Part 3).

---

## Part 2: Navbar

**Why:** With more than one page coming, users need a way to move between them that isn't typing a URL by hand.

- [ ] In `Navbar.jsx`: follow the TODOs to add a link to `/` and a link to `/quotes/new`.
- [ ] In `routes.jsx`: render the navbar above your routes, so it shows regardless of which route is active.

**Check it:** the nav bar shows on `/` with a link to Home and a link to Add Quote. Clicking "Home" while already on `/` doesn't do anything weird. The active link should look visually different from the inactive one — read the hint in `Navbar.jsx` for how to detect that, then add a small `.active` style to `App.css` if one doesn't already stand out.

---

## Part 3: Dynamic Route — Quote Detail

**Why:** This is the core idea of dynamic routing: one route (`/quotes/:id`) has to render *different* content depending on what's in the URL.

- [ ] In `routes.jsx`: define a route so `QuoteDetail` renders at a path that captures an id from the URL.
- [ ] In `pages/QuoteDetail.jsx`: follow the TODOs to read the id out of the URL, then find the matching quote in the array.
- [ ] Render the quote's text and author. Add a link back to `/`.
- [ ] Handle the case where no quote matches (visit `/quotes/999` directly in the URL bar) — render a short message instead of letting the page break.

**Check it:** clicking a quote from Home takes you to its own page with the right text and author. Typing `/quotes/2` directly into the address bar also works. Typing `/quotes/999` shows your "not found" message, not a crash.

---

## Part 4: Programmatic Navigation — Add Quote

**Why:** So far every navigation has been the user clicking a link. Sometimes code needs to trigger navigation itself — after a form submits successfully, for example.

- [ ] In `routes.jsx`: define a route so `AddQuote` renders at `/quotes/new`.
- [ ] In `pages/AddQuote.jsx`: follow the TODOs to get a way to navigate from code, and use it inside `handleSubmit` so a successful submit sends the user back to `/`.

**Check it:** fill out the form and submit — you land back on `/`. The quote you typed does **not** appear in the list. That's expected — read the comment at the top of `AddQuote.jsx` for why.

---

## Part 5: Catch-All 404

**Why:** Right now, visiting a URL like `/nonsense` renders nothing. A real app should say so.

- [ ] In `routes.jsx`: define a catch-all route so `NotFound` renders when nothing else matches — this one has to come **last**, after every other route.
- [ ] In `pages/NotFound.jsx`: add a link back to `/`.

**Check it:** visit any made-up URL — you see "Page not found" with a working link home. Visiting `/quotes/999` still shows *your* not-found message from Part 3, not this one — they're two different situations (`/quotes/:id` matches, the id just isn't in the data — vs. no route matching at all).

---

## Common Gotchas

- **URL params come back as strings.** The id you read out of the URL in `QuoteDetail.jsx` is text, but each quote's `id` in `data/quotes.js` is a number. Comparing them directly will never find a match — you'll need to convert one side before comparing.
- **Hooks outside the Router:** route-aware hooks throw an error if the component isn't rendered underneath the router provider. Since everything routes through `routes.jsx`, this shouldn't happen — but double check if you see this error.
- **Route order and the catch-all:** the catch-all route has to come last, or it swallows every route below it.
- **Link vs. the nav-link component:** both navigate the same way. The nav-link version is only different because it knows whether it's currently active — use it for nav bars, not for one-off links inside a page.
- **The quote you "add" disappears on refresh.** Correct — there's no backend and no shared state today. Not a bug.

## Stretch Challenges

- [ ] Add a search input on Home that filters the quote list, using search params so the filter survives a page refresh (`?author=beck`).
- [ ] Read the current URL path somewhere outside a route param — e.g. show it in a small debug line.
- [ ] Extract the `<Navbar />` + page-content wrapper into a `MainLayout.jsx` that uses an outlet for child routes, and nest your routes under it instead of rendering `Navbar` directly in `routes.jsx`.
- [ ] Preview only, don't fully build it: sketch what it would take to redirect away from `/quotes/new` if a fake `isLoggedIn` flag were `false`. (Full version comes with Auth0 in a couple weeks.)

## How to Submit Your Work

- [ ] `cd` into your `quotes-frontend-router-starter` project
- [ ] `git add .`
- [ ] `git commit -m "add client-side routing to quotes app"`
- [ ] `git push`
- [ ] Go to your fork on GitHub. Confirm your changes are there.

**Submit:** paste your fork's URL.

## Finished Checklist

Before submitting, verify:

- [ ] `/` shows all 5 quotes, each linking to its own page.
- [ ] Clicking a quote goes to `/quotes/:id` and shows the right text/author.
- [ ] Visiting `/quotes/999` directly shows a "not found" message, not a crash.
- [ ] The nav bar appears on every page, and the active link is visibly styled differently.
- [ ] Submitting the Add Quote form redirects you to `/` (the quote itself doesn't need to appear in the list).
- [ ] Visiting a made-up URL (e.g. `/whatever`) shows your 404 page with a working link home.
- [ ] Your work is committed and pushed to your `quotes-frontend-router-starter` fork on GitHub.
