# Capstone II: Open Project

**Duration:** 1 week  
**Guide:** [Working Together](./guide.md)

## Goals

Same technical foundation as Capstone I — but now you choose the problem. The goal is to practice the full PERN stack on a project your team cares about, while learning to scope, articulate, and own a product idea.

---

## What You're Building

Your team picks a project from the idea menu below, or pick one of your own. Either way, you write a simplified PRD before writing any code.

---

## Step 1: Write Your PRD

Before touching the codebase, your team writes a short Product Requirements Document. This is a team alignment tool — not a gate. Write it together on Day 1, share it with the instructors, and start building.

Your PRD must include:

- **Project name**
- **What:** 1–2 sentences describing what you're building
- **Why:** Who is it for and what problem does it solve?
- **Core features:** A bullet list of what your team commits to shipping this week
- **Stretch goals:** What you'd add with more time
- **Team roles:** Who owns what

No approval required. If your scope needs adjusting, an instructor will let you know quickly.

---

## Idea Menu

Every project below is buildable in a week by four people. They're grouped by difficulty: the **Comfortable** picks sit right at Capstone I's level, and the **Step up** picks each add *one* new idea — a new kind of relationship, or a single rule beyond plain create-read-update-delete. The "new idea it teaches" column shows where each project would grow you, so pick one that matches how your team is feeling.

| # | Project | What you'd build | The new idea it teaches | Difficulty |
|---|---------|------------------|-------------------------|------------|
| 1 | **Recipe Box** | Save recipes with ingredients and steps; browse and rate others' | You design the whole schema yourself; ratings are tallied like Capstone I's votes | Comfortable |
| 2 | **Group Potluck Planner** | Create an event, list the dishes needed, and let people claim a slot; show what's still unclaimed | A "claim" that's exclusive — one slot, one person — plus a live "what's left" view | Comfortable |
| 3 | **Q&A Help Board** | Ask questions, post answers, upvote answers, and mark one answer as accepted | Familiar voting, plus a **state change** — one answer becomes the accepted one | Step up |
| 4 | **Playlist / Watchlist Builder** | Build lists of songs, movies, or books; the same item can live on many lists | Your first **many-to-many** relationship — the natural next step after Capstone I | Step up |
| 5 | **Class / Event Booking** | Offer sessions with limited seats; people book a spot, and the app blocks overbooking | A **rule beyond CRUD** — count the seats taken and refuse a booking once it's full | Step up |
| 6 | **Café Order Builder** | Browse a menu, build an order with quantities, and see a running total | A join table that **carries data** (the quantity on each line) plus a computed total | Step up |

Every one has an obvious next layer for stretch goals — add accounts, deploy it, or make it searchable.

**Proposing your own?** It should be completable in a week by four people and touch every layer of the stack. If you're unsure, lean simpler.

---

## Technical Requirements

Same stack as Capstone I:

- **React** — component-based UI, React Router for navigation, clean styling
- **Express** — RESTful API routes for your core resources
- **PostgreSQL + Sequelize** — relational schema designed by your team
- **CRUD** — users can create, read, update, and delete the core resource of your app

---

## Stretch Goals

Define your own based on your project. Common additions:

- Auth0 authentication
- Deployment (Vercel + Neon)
- Search or filter functionality
- User profiles
- Notifications or confirmation messages
- Mobile-friendly UI

---

## How to Divide the Work

Same choice as Capstone I — vertical slices or horizontal layers. You've done this once. Use what worked and fix what didn't.

---

## Before You Write Code

1. PRD completed and documented on your README.md
2. GitHub Project Board — populated with issues (optional but recommended)
3. Database schema diagram — [dbdiagram.io](https://dbdiagram.io)
4. UI wireframe — at least one screen in [Figma](https://www.figma.com)

