# Capstone III: Demo Day Presentation

**When:** Demo Day, August 21
**Length:** 5–7 minutes per team
**What you need:** a slide deck + your deployed app
**Related:** [Capstone III](./III.md) · [Working Together](./guide.md)

This document tells you what to prepare, how to organize it, and how to deliver it.

---

## First: A Demo Is Not a Presentation

You have been demoing your app to TAs and instructors for three weeks. Demo Day is a different thing. Do not just do a longer version of your check-in demo.

| | **Check-in demo** (during capstone) | **Demo Day presentation** |
|---|---|---|
| **Who is watching** | Your TA or instructor, who already knows your project | People who have never seen your project — including non-technical guests |
| **Why you're doing it** | Prove a feature works, get unstuck | Make the audience understand your project and care about it |
| **Preparation** | None. You share your screen and click | Scripted, rehearsed, and timed |
| **What you show** | Localhost, half-finished screens, the code | The deployed app with real-looking data, plus slides |
| **Code** | Yes — you open files and debug together | No file browsing. Talk about the code from a slide |
| **Broken things** | Fine. That's the point of the check-in | Do not show them. Demo the path you know works |
| **Who talks** | Whoever built it | Everyone on the team |

**The short version:** a check-in demo answers *"does it work?"* A presentation answers *"why should I care, and what did you build?"*

---

## Before You Open the Slide Deck

Make two decisions as a team. Everything else depends on them.

**1. What is your core feature?**

Ask: *why would a stranger open our app?* That answer is your core feature. That is what you demo.

- Signing up is not the core feature. Nobody uses your app to sign up.
- Logging in is not the core feature.
- Your settings page is not the core feature.
- Pick **one** feature. Everything else gets mentioned in a sentence, or not at all.

**2. Who speaks when?**

- Split the presentation into parts and assign each part to a person.
- Everyone on the team should say something.
- Write down the handoff line for each switch ("...and Maria will show you how that works").

---

## The Four Parts

Total target: about 6 minutes. Times below are a guide, not a rule.

### Part 1 — Introduction (about 45 seconds)

- Say your project name.
- Introduce every team member by name.
- Give the pitch in one or two sentences, then stop.

Use this shape for the pitch:

> "People who **[do X]** struggle with **[problem Y]**. We built **[project name]** so they can **[do Z]**."

**Say "we," not "I."** You are showing a team project. Even if you personally wrote the whole authentication system, it is "we built." This is the most common mistake, and it is the easiest one to fix.

---

### Part 2 — The Demo (2 to 3 minutes)

This is the most important part. Show your **core feature**, live, on your deployed app.

**Tell it as a story.** Invent a user and narrate what they are doing:

> "Let's say Sarah just moved to a new city and wants to find a study group. She opens our site and..."

This is much easier for an audience to follow than "here is the dashboard, and here is a button."

Rules for the demo:

- Follow **one** user journey from start to finish.
- Do not jump between unrelated flows. If it doesn't fit the story, leave it out.
- Skip the signup and login screens. Be logged in before you start.
- Make sure your database has realistic seeded data. Empty lists and "test test test" look unfinished.
- If you have other features worth mentioning, mention them in one sentence — do not demo them.
- Have a screen recording of the demo saved as a backup, in case the internet fails.

---

### Part 3 — Under the Hood (about 1.5 to 2 minutes)

Now explain how you built it. Keep it high level — some people in the room do not write code.

**Your tech stack**

- List what you used: languages, frameworks, database, key packages, any external APIs.
- Say *why* for the interesting choices. Nobody needs a reason for React. They do want to know why you chose Socket.io, or Cloudinary, or the OpenAI API.

**Your main challenge**

- Pick **one** hard technical problem you solved. Not three.
- Explain what made it hard, and how you solved it.

You do not have time to walk through your code. Pick one of these three ways to show it instead:

1. **Describe it.** Explain in plain English what your main function does and why it was tricky.
2. **Put one snippet on a slide.** One short block of code, on the slide itself, talked about at a high level. Do not open your editor.
3. **Draw a diagram.** Show the pieces — browser, server, database, external service — and how a request travels between them. This is usually the strongest option.

Do not open VS Code and scroll through files. It is unreadable on a projector and the audience will lose you.

---

### Part 4 — Takeaways and Closing (about 45 seconds)

- Say again, in one sentence, what your app does and what problem it solves.
- Share 1 or 2 takeaways from building it. Two good ones beat five weak ones.
- Say what you would build next if you had more time.
- Thank the audience. Leave your app link and GitHub repo on the final slide.

---

## Your Slide Deck

Keep it simple. Around 8 to 10 slides is right for 6 minutes.

- **Title** — project name, tagline, team names
- **The problem** — who has it, and why it matters
- **The solution** — one sentence and a screenshot
- **Live demo** — a slide that just says "Demo," so you have somewhere to land when you switch to the browser
- **Tech stack** — logos or a plain list
- **Architecture diagram** — how the pieces connect
- **The hard problem** — what it was and how you solved it (this is where a code snippet goes, if you use one)
- **What's next** — features you'd add with more time
- **Thank you** — app link, GitHub link, team names

Slide rules:

- Few words per slide. Slides support you; they are not your script.
- Never read your slides out loud.
- Use a font size big enough to read from the back of the room.
- Screenshots should be full size and readable. Do not shrink them.

---

## Rules for the Whole Presentation

- Say "we," not "I."
- Every team member speaks.
- If you use a technical term the audience may not know, define it in half a sentence and move on.
- Do not apologize for what you didn't finish. Present what you built.
- Watch the clock. Going over time is unprofessional, and you will be cut off.

---

## Common Mistakes

- Demoing the signup flow. It is not why anyone uses your app.
- Showing every feature instead of one feature well.
- Saying "I built the backend." Say "we."
- Opening the code editor and scrolling.
- Demoing on an empty database.
- Reading the slides word for word.
- Presenting for the first time on Demo Day.

---

## Checklist Before August 21

- [ ] Core feature chosen and agreed on by the whole team
- [ ] Speaking parts assigned, with handoffs written down
- [ ] Slide deck finished and shared as a URL
- [ ] App deployed and loading fast
- [ ] Database seeded with realistic data
- [ ] Demo account already logged in before you present
- [ ] Backup screen recording of the demo saved locally
- [ ] Architecture diagram or code snippet ready on a slide
- [ ] Full run-through with your TA completed at least once
- [ ] Timed and under 7 minutes
- [ ] App link and GitHub link on the final slide

**Rehearse with your TA.** This is required during Demo Prep (Aug 17–20), not optional. Your TA will help you cut what doesn't fit, fix the timing, and find the parts that break when you're nervous.
