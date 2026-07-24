<!--
HOW TO USE THIS TEMPLATE
1. This becomes your FRONTEND repo's README.md — the front door of your project.
   Copy everything below the line into that README.md.
2. Replace every [bracket] with your own answer.
3. Delete the italic hints once a section is filled in.
4. The goal is a README a NEW developer could read and run your project without asking you anything.
5. Due Monday, 10:00 AM. The poll app is used as the running example throughout.
-->

---

# [Project Name]

[One or two sentences describing what the app does and who it's for.]

> *Example: **QuickPoll** — a web app where anyone can create a poll with multiple options, vote, and watch the results update. Built as a team to practice the full PERN stack end to end.*

## Live Demo

| Environment | URL |
| --- | --- |
| Frontend (Vercel) | [https://...] |
| Backend API (Render) | [https://...] |

*Both links must load. This is how we confirm the app is deployed.*

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | React (Vite), React Router, CSS |
| Backend | Node.js, Express |
| Database | PostgreSQL, Sequelize (ORM) |
| Auth | Auth0 *(remove if you didn't add login)* |
| Hosting | Vercel (frontend), Render (backend), Neon (database) |

*List only what you actually used. If you added a library (e.g. a chart library), add it here.*

## Features

- [ ] View all polls on a home page
- [ ] Create a poll with a title, description, and 2+ options
- [ ] Vote on a poll
- [ ] See results — vote count per option, most votes first
- [ ] [Any stretch feature you shipped, e.g. one vote per browser]

## Architecture

[One sentence on how the pieces talk to each other.]

```
React (Vercel)  ──fetch──▶  Express API (Render)  ──Sequelize──▶  PostgreSQL (Neon)
```

*Example: The React frontend calls the Express API over HTTP. Express uses Sequelize to read and write to a PostgreSQL database hosted on Neon.*

## Database Schema

[Paste a screenshot of your dbdiagram.io ERD, or link to it.]

| Table | Key columns | Relationships |
| --- | --- | --- |
| Polls | title, description | has many Options |
| Options | text, pollId (FK) | belongs to Poll, has many Votes |
| Votes | optionId (FK) | belongs to Option |

## API Reference

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/polls` | Return all polls |
| POST | `/polls` | Create a poll with its options |
| GET | `/polls/:id` | Return one poll with options and vote counts |
| POST | `/polls/:id/vote` | Submit a vote for an option |

*Add any extra routes you built (e.g. `DELETE /polls/:id`).*

## Getting Started (Run It Locally)

### Prerequisites
- Node.js (v18+) and npm installed
- A PostgreSQL database URL (we use [Neon](https://neon.tech))

### 1. Clone both repos
```bash
git clone [frontend-repo-url]
git clone [backend-repo-url]
```

### 2. Start the backend
```bash
cd [backend-folder]
npm install
# create a .env file (see below)
npm run dev
```

Backend `.env`:
```
DATABASE_URL=postgresql://user:password@host/dbname
PORT=3000
```

### 3. Start the frontend
```bash
cd [frontend-folder]
npm install
# create a .env file (see below)
npm run dev
```

Frontend `.env`:
```
VITE_API_URL=http://localhost:3000
```

The app runs at `http://localhost:5173` (Vite's default).

*If you added Auth0, list its env vars here too (e.g. `VITE_AUTH0_DOMAIN`, `VITE_AUTH0_CLIENT_ID`, `AUTH0_AUDIENCE`).*

## Team & Roles

| Name | Focused on |
| --- | --- |
| [Name] | [e.g. frontend pages] |
| [Name] | [e.g. backend routes] |
| [Name] | [e.g. database + deployment] |

*Roles overlapping is normal — just say who focused where.*

## Design Decisions

Write 2–3 short "we did X because Y" lines. Plain English.

- [Example: We count votes by loading each option with its votes and using `.length`, because it was the simplest thing that worked.]
- [Example: We used React Router so moving between pages doesn't reload the browser.]
- [Your decision here.]

Design file (Figma / wireframe / sketch): [link or screenshot — a photo of a paper sketch is fine]

## Challenges & What We Learned

Answer in a sentence or two each. Honesty helps you more than polish.

- **Hardest bug or blocker:** [what was it, and how did you get past it?]
- **What we'd do differently:** [one thing]
- **One thing we learned about working as a team:** [one thing]
