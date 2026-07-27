# Capstone II — Fundamentals Track: Build a CRUD App

**Duration:** 1 week
**Guide:** [Working Together](./guide.md)

---

## Goals

Rebuild the core loop of every web app until it feels routine: **one** database table, an Express API that does full CRUD on it, and a React frontend that reads and changes that data. By the end you should be able to follow one piece of data from a form in the browser, to a row in Postgres, and back to the screen — without a reference open.

---

## What You're Building

A CRUD app for **one resource** — a single kind of thing you keep a list of. Pick something you actually care about:

- Books you've read, movies to watch, or games you've played
- Workouts, meals, or water logged each day
- Plants and when you last watered them
- Job applications and their status
- Anything else that is a simple list of one kind of thing

You'll build full **C**reate, **R**ead, **U**pdate, and **D**elete across the whole stack.

### Solo or as a team?

**Default: each teammate builds their own resource, end to end.** You still share standups and help each other, but everyone writes their own model, routes, and pages — so nobody skips the reps. If your team would rather build one app together instead, that's fine — decide with your TA on Day 1.

---

## Core Requirements

Ship all of these before reaching for stretch goals.

> **Design it first.** On Day 1, before writing code, sketch your one table and list your five routes on paper or in [dbdiagram.io](https://dbdiagram.io). Then build.

### Database (PostgreSQL + Sequelize)

- [ ] Design **one** model for your resource
- [ ] Give it at least **three** fields, including:
  - [ ] one required text field (the app should reject a blank one)
  - [ ] one optional field
  - [ ] one field that isn't plain text — a true/false, a number, or a category

### Backend (Express)

Build a route for each part of the CRUD loop:

- [ ] Return every item
- [ ] Return a single item by its id
- [ ] Create a new item from submitted data
- [ ] Update an existing item
- [ ] Delete an item
- [ ] A request for an item that doesn't exist gets a clear "not found" response, not a crash

### Frontend (React)

- [ ] A page that lists every item
- [ ] A page that shows one item on its own, found by the id in the URL
- [ ] A form to add a new item
- [ ] A way to edit an existing item
- [ ] A way to delete an item
- [ ] Navigation between pages with React Router, with no full page reload
- [ ] Something shown while data is loading, and a clear message if a request fails

---

## Core Complete

Your core is done when you can do all of this — and it all survives a refresh:

- [ ] See every item on the list page
- [ ] Add a new item through a form and watch it appear
- [ ] Open one item on its own detail page
- [ ] Edit an item and see the change stick
- [ ] Delete an item and watch it disappear
- [ ] Move between pages via navigation, with no full page reload
- [ ] Stop and restart the backend, reload the page, and your items are still there

That last one is the whole reason you used a database instead of a variable — don't skip checking it. Once every box is ticked, move on to stretch goals.

---

## Stretch Goals

Finished the core? These push you toward the Open Project — pick a couple:

- [ ] Style it cleanly, and make it work on a phone
- [ ] Search or filter the list by your non-text field
- [ ] Sort the list (newest first, A–Z, done vs. not done)
- [ ] Add a **second** resource that relates to the first (this is the bridge to Capstone III)
- [ ] Deploy it — frontend to **Vercel**, backend to **Render**, database to **Neon**
- [ ] Auth0 login, so each user sees only their own items

---

## Before You Write Code

1. Pick your resource and its fields
2. Sketch the one table — [dbdiagram.io](https://dbdiagram.io)
3. Write down your five routes
4. Sketch the list page and the form — one rough screen in [Figma](https://www.figma.com)
