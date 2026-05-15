# Capstone Guide: Working Together

This guide applies to all three capstones. Read it before you write a single line of code.

---

## Your TA

Each group will be assigned a TA as your primary point of contact. They'll check in with you daily after lunch. It helps to keep them in the loop — what's going well, what's stuck, what decisions you're wrestling with. You can reach out to anyone on the instructional team, but your assigned TA is usually a good place to start.

---

## Before You Write Code

Teams that spend a little time planning before coding tend to move faster and hit fewer roadblocks. Here's what we recommend doing on Day 1:

1. **GitHub Project Board** — a few issues to get you started goes a long way for staying organized
2. **Database schema diagram** — sketching your tables in [dbdiagram.io](https://dbdiagram.io) before writing models saves a lot of painful migrations later
3. **UI wireframe** — even one rough screen in [Figma](https://www.figma.com) helps the team agree on what you're actually building
4. **Team Norms document** — a quick conversation using [this template](https://docs.google.com/document/d/1kKkbEWmXAA6VJK5ZPmkyeqgySchUwpPvuWMVLuiYeSs/edit?usp=sharing) about PRs, disagreements, and working hours prevents a lot of friction later
5. **Discord access** — make sure you can reach the cohort Discord on campus WiFi at [https://ptb.discord.com](https://ptb.discord.com)

---

## Getting Started (Once You Have the Repos)

1. Make sure everyone is a collaborator and can push to the team repo
2. Make sure everyone can run the project locally — if anyone can't, that's everyone's top priority
3. Deploy to Vercel immediately — it's much easier before you've added changes

---

## How to Divide the Work

There's no single right answer. Two approaches work well — talk it through as a team and commit to one before you start.

### Vertical Slices
Each person owns one feature end-to-end: the React components, the Express routes, and the database models for that feature.

**Example:** One person builds everything for "Create Poll" — the form, the POST route, and the Sequelize model. Another builds everything for "View Results."

- **Pro:** Ship independently. Touch the full stack. Easier to demo progress daily.
- **Con:** Harder to coordinate shared utilities, layouts, and components across features.

### Horizontal Layers
Each person owns one layer of the stack across all features.

**Example:** One person owns all React components. Another owns all Express routes. Another owns the database schema and Sequelize models.

- **Pro:** Clear ownership. Easier to stay in your lane early on.
- **Con:** Tight coordination required. Risk that some teammates don't touch the full stack.

**Regardless of which approach you choose:** make sure everyone writes code at every layer of the stack before the project ends. Don't let anyone stay exclusively on the frontend or backend the entire time.

---

## A Few Final Notes

**Don't get stuck in your comfort zone.** If you're most comfortable with React, that's exactly why you should also be writing Express routes this week.

**Research is real work.** Reading documentation, watching a tutorial on a new library, figuring out why your query is returning the wrong data — this deserves time and recognition. Account for it in your project board.

**Communication is a technical skill.** When something isn't working on the team — a PR that's blocking progress, a decision nobody agrees on, a teammate who's going quiet — bring it up constructively and early. The best engineers aren't just good at code. They're good at working with people.

**Collaboration is the primary learning objective.** The app is the vehicle. How you build it together is the lesson.
