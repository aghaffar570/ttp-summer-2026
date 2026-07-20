# Capstone Guide: Working Together

This guide applies to all three capstones. Read it before you write a single line of code.

---

## Your TA

Each group will be assigned a TA as your primary point of contact. They'll check in with you daily after lunch. It helps to keep them in the loop — what's going well, what's stuck, what decisions you're wrestling with. You can reach out to anyone on the instructional team, but your assigned TA is usually a good place to start.

Your TA acts as your **project manager (PM)** — a coach who runs your standup and helps you get unblocked, not a teammate who writes your code. Two short companion docs go deeper, and you should read both before you start:

- **[Getting Help & Escalation](./getting-help.md)** — who to ask, in what order, and how to ask so you actually get unblocked.
- **[Using AI Responsibly](./ai-policy.md)** — how AI tools fit into a project you have to understand and defend.

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
3. Deploy all three layers early — frontend to **Vercel**, backend to **Render**, database to **Neon** — following the [Week 7 Deployment guide](../assignments/Deployment.md). Deploying a small app is far easier than a big one, so get the whole pipeline working before you pile on features

---

## Daily Standup

Every day, your team meets for a quick **standup** — about 10 minutes, run by your TA. It isn't a status report for management; it's how four people building one thing stay pointed in the same direction.

Each person answers three questions:

- **What did I do yesterday?**
- **What do I intend to do today?**
- **What's blocking me?**

Keep blockers **specific**. "I'm stuck on the backend" isn't something anyone can act on. "My `POST /polls` returns a 500 and the error says `column pollId does not exist`" is. Name the code, the error message, or the teammate's PR you're waiting on.

Standup is also where you say out loud what you're building — which happens to be the best proof that you actually understand it (see [Using AI Responsibly](./ai-policy.md)).

---

## The GitHub Workflow

Collaboration is the whole point of this week, and Git is where collaboration actually happens. You last used the collaborative flow in Week 2 — here it is again, tuned for four people sharing **one** repo.

**The golden rule: `main` always works.** Nobody commits directly to `main`, and nobody pushes broken code to it. Every change arrives through a Pull Request that a teammate has looked at. This one habit prevents most of the pain teams hit this week.

### One shared repo — not forks

- [ ] One teammate creates the team repo
- [ ] Add the other three under **Settings → Collaborators**
- [ ] Everyone clones the *same* repo (a fork is your own copy — that's not what you want here)

### Branch for every piece of work

A **branch** is a separate, safe copy of the code where you build one thing without disturbing anyone else.

- [ ] Start from an up-to-date `main`: `git checkout main` then `git pull`
- [ ] Make a branch named for the work: `git checkout -b create-poll-form`
- [ ] Commit small and often as you go
- [ ] Push your branch: `git push -u origin create-poll-form`

### Open a Pull Request to merge in

A **Pull Request (PR)** asks to merge your branch into `main`, and gives a teammate a place to review it first.

- [ ] Open a PR from your branch into `main` on GitHub
- [ ] Write a one-line description: what it does and how to test it
- [ ] Link the issue it finishes (type `Closes #4` in the description)
- [ ] Tag a teammate to review

### Review before you merge

- [ ] The reviewer pulls the branch and confirms it runs
- [ ] The reviewer approves, or leaves comments
- [ ] The author pushes fixes for any comments
- [ ] Merge the PR, then delete the branch

### Keep PRs small, and sync often

- **Small PRs get reviewed; giant ones get rubber-stamped.** A PR touching 3 files is a 5-minute review. One touching 30 files is impossible to review and guarantees conflicts. Merge several small PRs a day rather than one giant one on Friday.
- **A merge conflict is normal, not a disaster.** It just means two people changed the same lines. Pull `main` into your branch often so conflicts stay small — and the *first* time you hit one, do it with your TA rather than alone.
- **Every PR traces back to your project board.** If work isn't an issue on the board, the team can't see it's happening.

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
