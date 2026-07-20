# Capstone I: Polling App

**Duration:** 1 week  
**Guide:** [Working Together](./guide.md)

## Goals

Reinforce every layer of the PERN stack by building a real app together for the first time. The goal is not to ship a polished product — it's to make React, Express, PostgreSQL, and Sequelize work together as a team.

Collaboration is the primary objective. Communication, task ownership, and coordination matter as much as the code.

---

## What You're Building

A simple polling app. Users can create a poll with multiple options, vote on it, and see the results.

---

## Core Requirements

Ship all of these before reaching for stretch goals.

> **Design it yourself first.** The tables and routes below are a **shared contract** — everyone builds against the same shape, so your four-person team can work in parallel (the frontend can build the vote page while the backend is still writing that route). Don't just copy them, though: on Day 1, sketch your own schema in [dbdiagram.io](https://dbdiagram.io) and your own list of routes, *then* compare against this reference. The design thinking is yours; the shared contract is what keeps everyone unblocked.

### Database (PostgreSQL + Sequelize)
- Design and create three tables: `Polls`, `Options`, and `Votes`
  - `Polls`: title, description
  - `Options`: text, pollId (foreign key)
  - `Votes`: optionId (foreign key)
- Set up associations between models

### Backend (Express)
- `GET /polls` — return all polls
- `POST /polls` — create a new poll with its options
- `GET /polls/:id` — return a single poll with its options and vote counts
- `POST /polls/:id/vote` — submit a vote for an option

> **On vote counts:** you don't need any special database math for results. Every vote is a row that points at one option — so an option's vote count is simply how many vote rows point to it. If you load an option together with its votes, you can count them from there.

### Frontend (React)
- **Home page** — list of all polls
- **Create poll page** — form to add a title, description, and 2+ options
- **Poll page** — shows the poll options and a way to vote
- **Results page** — shows vote counts per option (bar chart or list, most votes wins)
- React Router for navigation between pages
- Basic, clean CSS styling

---

## Core Complete

Your core is done when a visitor can do all of this — and it all survives a refresh:

- [ ] See every poll on the home page
- [ ] Create a poll with a title, description, and 2 or more options
- [ ] Open a poll and cast a vote
- [ ] See a poll's results — each option's vote count, most votes first
- [ ] Move between pages via navigation, with no full page reload
- [ ] Stop and restart the backend, reload the page, and the polls and votes are still there

That last one is the whole reason you used a database instead of a variable — don't skip checking it. Once every box is ticked, move on to stretch goals.

---

## Stretch Goals

Finished the core? Pick at least 2 from this list:

- Auth0 login/signup
- Prevent voting more than once (per user or per browser)
- Shareable poll link (copy to clipboard)
- Poll end date/time — closes automatically
- Active vs. closed polls — give a poll an open/closed state, and show open and closed polls on separate pages (for example `/polls/active` and `/polls/closed`)
- Allow unauthenticated users to vote (toggle on poll creation)
- Ranked-choice voting — implement the [Instant-Runoff algorithm](https://en.wikipedia.org/wiki/Instant-runoff_voting)
- Duplicate an existing poll
- Delete a draft poll
- Admin panel — view all polls, disable any poll
- Email notification when results are available
- Mobile-friendly UI

