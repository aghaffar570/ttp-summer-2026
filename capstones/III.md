# Capstone III: Final Project

**Duration:** 3 weeks  
**Ends:** Demo Day, August 21  
**Guide:** [Working Together](./guide.md)

## Learning Goals

This is the full engineering cycle — define it, design it, build it, ship it, present it. You own the problem, the scope, the architecture, and the pitch. The technical bar is higher than Capstone II, the UI should be polished, and the demo should be something you're proud to show.

---

## What You're Building

Anything — as long as it's real, and shippable in three weeks. Completely open in topic and technology.

One new technology or capability beyond the core PERN stack is strongly encouraged (see suggestions below). This isn't a hard requirement, but it's what separates a good project from a great one.

---

## Step 1: Write Your PRD (Due End of Day 2)

Your team submits a Product Requirements Document by the end of Sprint 1, Day 2. An instructor will give you feedback quickly — you don't need to wait for sign-off to start building. If something needs to change, you'll hear back fast.

Your PRD must include:

- **Project name + tagline** — one punchy line that describes what it does
- **Problem statement** — what real problem are you solving, and for whom?
- **Target user** — who specifically is this for?
- **Solution** — how does your app address the problem?
- **Core features** — what your team commits to shipping
- **Stretch goals** — what you'd add with more time
- **Tech stack** — full list, including the new technology you're adding beyond PERN
- **Team roles** — who owns what across the three weeks
- **Demo pitch outline** — 3 bullets: the problem, the solution, the technical highlight

---

## Sprint Structure (optional)

| Sprint | Dates | Goal |
|--------|-------|------|
| Sprint 1 | Aug 3–7 | PRD submitted, schema designed, repo set up, core features started |
| Sprint 2 | Aug 10–14 | Core features complete, stretch goals in progress, deployed |
| Demo Prep | Aug 17–20 | Polish, seed data, presentation rehearsed |
| Demo Day | Aug 21 | Ship it |

---

## Going Beyond the Stack

At least one of the following is strongly encouraged. Pick something that makes your project genuinely more interesting — not just a checkbox:

- **Real-time features** — Socket.io / WebSockets (live updates, collaborative editing, chat, notifications)
- **Third-party APIs** — Google Maps, Stripe (payments), Twilio (SMS), Spotify, weather APIs
- **AI features** — OpenAI or Claude API for smart suggestions, content generation, or semantic search
- **File uploads** — Cloudinary or AWS S3 (images, attachments)
- **Email** — SendGrid or Nodemailer (confirmations, notifications)
- **Full-text search** — PostgreSQL `tsvector` for fast, relevance-ranked search
- **Progressive Web App (PWA)** — installable on mobile, works offline
- **React Native w/Expo** — mobile application for iOS and Android (UI swaps but the backend, db, and services remain the same)


---

## Demo Day Requirements

Your app will be judged on four things: does it work, does it look good, can you explain it, and would someone actually use it.

- **Deployed** — app runs on Vercel (or equivalent)
- **Seeded with realistic data** — no empty screens, no placeholder text during the demo
- **Polished UI** — consistent design, loading states handled, errors handled gracefully, responsiveness, accessibility (not required but nice)
- **5 - 7 minute presentation**:
  1. The problem — what are you trying to solve?
  2. Live demo — show the golden path, not every feature
  3. Tech highlights (3-5 slides)
    3.1 What was your tech stack and why did you choose it?
    3.2 What was the hardest technical problem you solved?
    3.3 What are you most proud of?
    3.4 What would you change if you had more time?
    3.5 Anything else you want to share

Rehearse the demo. Know who speaks when. Have a backup plan if the internet goes down.

---

## Technical Excellence Checklist

Before Demo Day, verify:

- [ ] No console errors in production
- [ ] No hardcoded secrets or API keys in the repo
- [ ] Sensitive config in environment variables
- [ ] Error messages shown to users (not stack traces)
- [ ] Loading states on async actions
- [ ] App works on mobile or is clearly desktop-only (either is fine, just be intentional)
- [ ] README explains what the project is and how to run it locally
