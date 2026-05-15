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

### Frontend (React)
- **Home page** — list of all polls
- **Create poll page** — form to add a title, description, and 2+ options
- **Poll page** — shows the poll options and a way to vote
- **Results page** — shows vote counts per option (bar chart or list, most votes wins)
- React Router for navigation between pages
- Basic, clean CSS styling

---

## Stretch Goals

Finished the core? Pick anything from this list:

- Auth0 login/signup
- Prevent voting more than once (per user or per browser)
- Shareable poll link (copy to clipboard)
- Poll end date/time — closes automatically
- Allow unauthenticated users to vote (toggle on poll creation)
- Ranked-choice voting — implement the [Instant-Runoff algorithm](https://en.wikipedia.org/wiki/Instant-runoff_voting)
- Duplicate an existing poll
- Delete a draft poll
- Admin panel — view all polls, disable any poll
- Email notification when results are available
- Mobile-friendly UI

