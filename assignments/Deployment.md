# Deploying Your PERN App

A setup guide for taking your full-stack app from **your laptop** to **the internet**.

> This is not a workshop with graded tasks. It's a reference you follow, top to bottom, when you're ready to put your app online. Read Part 0 first — the mental model matters more than the button-clicking.

![Diagram: moving each layer of a PERN app from localhost to production — the React frontend to Vercel, the Express backend to Render, and the Postgres database to Neon](../assets/local-to-prod.png)

### 🧭 Where you are

This guide has four parts. **Do them in order, one at a time.** Parts 1–3 are collapsed below — click a part open only when you're ready to work on it, so you're never staring at the whole wall of text at once.

- **Part 0 — The Big Picture** — read first
- ▸ **Part 1 — The Database ([Neon](https://neon.com/))**
- ▸ **Part 2 — The Backend ([Render](https://render.com/))**
- ▸ **Part 3 — The Frontend ([Vercel](https://vercel.com/))**
- **Part 4 — Close the loop** — the final wire
- **Checklist & Troubleshooting** — at the very bottom; search here when you're stuck

> 💡 One heads-up: your browser's Find (Ctrl-F / Cmd-F) can't search text inside a collapsed part. If you're hunting for an error message, expand the parts first, or scroll to the Troubleshooting table at the bottom (it's always open).

---

## 🗺️ Part 0 — The Big Picture

### 🤔 What does "deploy" even mean?

Right now, your app runs on **localhost**. That word is literal: the *local* computer is the *host* (the machine serving your app). When you run `npm run dev`, your laptop is the only computer in the world that can see your app. Close the laptop, and it's gone.

**Deploying** means putting each piece of your app on a computer that is *always on* and *reachable from anywhere*, so a stranger can open a link on their phone and use what you built. Those always-on computers live in data centers, and companies like Vercel, Render, and Neon rent them to you and their customers. But they also grant a FREE tier for developers to deploy small projects (for free, with a small capacity).

### 🧩 Your app is three separate programs

When it's all running on your laptop, it's easy to forget that a PERN app is **three different programs** talking to each other:

| Layer | What it is | Runs on your laptop as | Goes live on |
| --- | --- | --- | --- |
| **Database** | Where your data is stored (Postgres) | a Postgres server on port 5432 | **Neon** |
| **Backend** | Your Express server (the API) | `localhost:3000` (or similar) | **Render** |
| **Frontend** | Your Vite + React app (what users see) | `localhost:5173` | **Vercel** |

Each one has to be deployed **separately**, to a **different service**. There is no single "deploy my app" button, because there is no single app — there are three programs that need to find each other.

### 🔗 How the three talk to each other

```
   Browser                Vercel                 Render                 Neon
 (a user)  ───request──▶  Frontend  ───fetch──▶  Backend  ───query──▶  Database
                         (React)                (Express)             (Postgres)
```

The critical idea: **each layer only knows how to reach the layer below it because we give it an address.**

- The **frontend** needs to know the **backend's** address (a URL like `https://my-api.onrender.com`).
- The **backend** needs to know the **database's** address (a connection string from Neon).

On your laptop those addresses were all `localhost`. In production they become real URLs. Almost every deployment bug you hit this week comes down to **one layer still pointing at `localhost` instead of the real address.**

### ⬆️ The Golden Rule: deploy bottom-up

Because each layer depends on the one *below* it, you deploy in this order:

> **1. Database (Neon) → 2. Backend (Render) → 3. Frontend (Vercel)**

You can't tell your backend where the database is until the database exists. You can't tell your frontend where the backend is until the backend exists. So we build the chain from the bottom up.

### 🔑 One concept you need before anything else: environment variables

An **environment variable** is a named value that lives *outside your code*, in the environment where the program runs. Think of it as a setting your program reads at startup.

Why do we need them for deployment? Two reasons:

1. **The values are different on your laptop vs. production.** Your database address is `localhost` locally but a Neon URL in production. Rather than editing code every time, the code reads a variable, and each environment fills in its own value.
2. **Secrets must not live in your code.** Your database password is a secret. If you paste it into a file and push to GitHub, the whole world can read it. Environment variables let the *value* stay private while the *code* stays public.

On your laptop, these live in a file called `.env`. In production, you type them into a settings page on Render or Vercel. **The `.env` file must be listed in `.gitignore` so it never gets committed.** (More on this in each section.)

---

<details>
<summary>

## 📦 Part 1 — The Database (Neon)

</summary>

**Goal:** get a Postgres database running in the cloud and get its address.

### What Neon is

Neon is Postgres-as-a-service. Instead of installing and running Postgres on a computer yourself, Neon runs it for you and hands you a **connection string** — one long line of text that contains everything needed to reach the database: the host address, the port, the database name, your username, and your password.

A connection string looks like this:

```
postgresql://alex:npg_a1B2c3@ep-cool-name-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
```

Read left to right, that's: `postgresql://` (the protocol) · `alex` (username) · `npg_a1B2c3` (password) · the long host address · `/neondb` (the database name) · `?sslmode=require` (encrypt the connection). This whole string **is a secret** — it contains your password.

### Steps

1. Go to **neon.tech** and sign up (GitHub login is easiest).
2. Create a new **Project**. Neon creates a database inside it automatically (usually named `neondb`).
3. On the project dashboard, find the **Connection String** and copy it. Make sure it includes `?sslmode=require` at the end — cloud databases require encrypted connections.
4. That's it. Your database is live. But it's **empty** — no tables yet. We fix that in the next step.

### Getting your tables and data into Neon

Your Sequelize models describe your tables, but Neon doesn't have them yet. You have two options:

- **Let Sequelize build them** (simplest for this cohort). If your code calls `sequelize.sync()` on startup, then as soon as your backend connects to Neon it will create the tables automatically. If you also want starter data, run your seed script against the Neon database.
- **Run your migrations/seeds manually** against the Neon connection string, the same way you ran them locally.

Either way, the mental model is: *the database in the cloud starts empty, and your code is what fills it.*

### 🛑 Reality check before moving on 🛑

You now have a connection string. **Keep it somewhere safe** — you'll paste it into Render in the next part. You do **not** put it in your code. Treat it like a password, because it contains one.

</details>

---

<details>
<summary>

## 🚂 Part 2 — The Backend (Render)

</summary>

**Goal:** get your Express server running in the cloud, connected to your Neon database.

### What Render does

Render takes your backend code from GitHub, installs its dependencies, starts it, and keeps it running on a public URL. When you push new code to GitHub, Render automatically rebuilds and redeploys — that's called **continuous deployment**, and you get it for free.

### Before you deploy: three things your code must do

These are code changes you make on your laptop *first*, then push to GitHub. Deployment fails most often because one of these was skipped.

**1. Read the port from an environment variable.**

Locally you probably hardcoded a port like `3000`. In production, Render decides the port and tells your app through a `PORT` variable. Your server must listen on whatever Render provides, falling back to your local port when the variable isn't set:

> Use `process.env.PORT` for the port your server listens on. Fall back to your usual local port so it still works on your laptop.

If you ignore `PORT` and hardcode a number, Render can't route traffic to your app and the deploy will look "up" but be unreachable.

**2. Read the database connection from an environment variable.**

Your Sequelize setup must read the Neon connection string from a variable (commonly `DATABASE_URL`) instead of having a local username/password written in the file. Because Neon requires encryption, your Sequelize config also needs SSL turned on for the production connection. Point your Sequelize instance at `process.env.DATABASE_URL` with SSL enabled.

**3. Turn on CORS for your frontend.**

This one surprises everyone, so here's the *why*.

Browsers enforce a security rule called the **same-origin policy**: by default, a web page loaded from one domain (your Vercel frontend) is **not allowed** to make requests to a different domain (your Render backend). The browser blocks it. This exists so a malicious site can't secretly call your bank's API using your logged-in session.

On your laptop you may not have hit this, because tools can paper over it in development. In production, frontend and backend live on genuinely different domains, so the browser *will* block the request unless your backend explicitly says "I allow requests from that frontend." That permission is called **CORS** (Cross-Origin Resource Sharing).

You enable it with the `cors` middleware in Express, configured to allow your Vercel frontend's URL. You won't know that URL until Part 3 — so for now, get CORS installed and wired up, and we'll come back and lock it to the real URL at the end.

### Setting up the repo

Render deploys from a GitHub repository. Two common layouts:

- **Separate repos** — one for the backend, one for the frontend. Cleanest for beginners; each service points at its own repo.
- **One repo with two folders** (`/client` and `/server`) — a "monorepo." Works fine; you just tell Render to look in the `/server` folder using its **Root Directory** setting.

Whichever you use, make sure `.env` is in `.gitignore` and your `node_modules` folder is too. Push your backend to GitHub.

### Steps on Render

1. Go to **render.com**, sign up, and connect your GitHub account.
2. Click **New → Web Service** and pick your backend repository.
3. Fill in the settings:
   - **Root Directory** — only if your backend is in a subfolder (e.g. `server`). Leave blank if the repo *is* the backend.
   - **Build Command** — usually `npm install`.
   - **Start Command** — how you start your server in production, usually `npm start` (make sure your `package.json` has a `start` script that runs the server, not the dev watcher).
   - **Instance Type** — the **Free** tier.
4. Open the **Environment** section and add your variables — this is the production equivalent of your `.env` file:
   - `DATABASE_URL` → paste the Neon connection string from Part 1.
   - Any other secrets your app reads (Auth0 keys, etc.).
   - You do **not** need to set `PORT` — Render sets it for you.
5. Click **Create Web Service**. Render installs, builds, and starts your app, streaming the logs live. Read the logs — this is where you'll see either "database connected / server listening" or the exact error if something's wrong.
6. When it's done, Render gives you a public URL like `https://my-api.onrender.com`. **Copy it.**

### Test the backend by itself

Before touching the frontend, prove the backend works on its own. Open one of your `GET` routes directly in the browser or in Postman:

```
https://my-api.onrender.com/api/your-route
```

If you get JSON back, your backend and database are talking. **That's two of three layers done, and you verified it without the frontend involved** — a habit worth keeping: test each layer in isolation before connecting the next.

> **One free-tier quirk to expect:** Render's free web services "go to sleep" after ~15 minutes of no traffic. The next request wakes it up, which can take 30–60 seconds. So the first load after a quiet period is slow, then it's fast again. This is normal and fine for a student project — just don't panic on demo day; hit the URL once to wake it up beforehand.

</details>

---

<details>
<summary>

## ▲ Part 3 — The Frontend (Vercel)

</summary>

**Goal:** get your React app online, pointed at your live Render backend.

### What Vercel does, and what "building" means

Here's something that trips people up: the browser can't run your React project the way your laptop does. Your source code uses JSX and imports and modern syntax that browsers don't understand directly. During development, Vite translates all of that on the fly.

For production, Vite does that translation **once**, ahead of time, and produces a folder of plain HTML, CSS, and JavaScript that any browser can run. That process is called a **build** (you can see it yourself by running `npm run build` — it creates a `dist` folder). Vercel runs that build for you and then serves the resulting static files, fast, from servers around the world.

So the frontend deploy is: Vercel pulls your code from GitHub, runs `npm run build`, and publishes the `dist` folder.

### Before you deploy: point the frontend at the real backend

On your laptop, your `fetch` calls probably point at `http://localhost:3000`. In production that address means nothing — `localhost` on a user's phone is *their* phone, not your server. You must swap it for your Render URL, using an environment variable so the same code works in both places.

**Frontend environment variables work a little differently.** Because the frontend code runs in the user's browser (not on a private server), Vite only exposes variables whose names start with `VITE_`. So you create a variable like:

```
VITE_API_URL=https://my-api.onrender.com
```

Then in your code, replace hardcoded `http://localhost:3000` with `import.meta.env.VITE_API_URL`. Locally, you put `VITE_API_URL=http://localhost:3000` in a `.env` file in your frontend folder; in production, you set the Render URL in Vercel's settings. Same code, different value per environment — exactly the pattern from Part 0.

> **Important:** because `VITE_` variables get baked into the built files and shipped to the browser, **never** put a real secret (like your database password) in one. Those secrets belong on the backend only. A frontend variable is fine for a public API URL, which is all we need here.

### Steps on Vercel

1. Go to **vercel.com**, sign up, and connect GitHub.
2. Click **Add New → Project** and import your frontend repository (or the `/client` folder of your monorepo via the **Root Directory** setting).
3. Vercel auto-detects Vite and fills in the build settings (**Build Command** `npm run build`, **Output Directory** `dist`). Leave the defaults.
4. Open **Environment Variables** and add:
   - `VITE_API_URL` → your Render backend URL from Part 2.
5. Click **Deploy.** Vercel builds and publishes, then gives you a public URL like `https://my-app.vercel.app`. **This is the link you share** — it's the front door to your whole app.

### One more file: make refresh and deep links work

Try this on your fresh deploy: navigate to a page like `/polls/3`, then hit **refresh**. You'll likely get a **404 — Not Found**. Sharing that same link with a friend does the same thing. But clicking around from the home page works fine. What's going on?

Here's the mental model. Your app is a **Single-Page Application (SPA)**: Vercel only ever serves *one* real file, `index.html`. **React Router** does the rest — when you click a link, no request goes to the server; React Router just swaps what's on screen and updates the URL in the address bar. The `/polls/3` "page" exists only inside the browser.

So the two cases are different:

- **Clicking a link** → React Router handles it in the browser. No server involved. Works.
- **Refreshing or pasting the URL** → the browser asks Vercel, "give me the file at `/polls/3`." Vercel looks for a file at that path, finds nothing (there's only `index.html`), and returns **404**.

The fix is to tell Vercel: *for any path, serve `index.html` anyway, and let React Router figure out the rest.* You do that with a **`vercel.json`** file in the **root of your frontend project** (next to `package.json`):

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

Ref: https://vercel.com/docs/routing/rewrites

Read it plainly: "for any request path (`/(.*)` means *anything*), send back `/index.html`." Now a refresh on `/polls/3` loads `index.html`, React Router boots up, sees the URL is `/polls/3`, and renders the right page. Commit this file, push, and Vercel will pick it up on the next deploy.

> This is **not** the same as the "no data appears" bug. That one is CORS or a wrong `VITE_API_URL` — the backend. This one is a **404 on the page itself**, before any data is fetched — it's about how the *frontend* is served.

</details>

---

## 🔌 Part 4 — Close the loop (the step everyone forgets)

Your three layers are deployed, but there's one wire still loose. Remember Part 2, where we enabled CORS but didn't yet know the frontend's URL? Now you know it.

1. Go back to your **backend code** and set CORS to allow your real Vercel URL (`https://my-app.vercel.app`) instead of `localhost` or a placeholder.
2. Commit and push. Render redeploys automatically.
3. Open your Vercel link and use the app for real — load data, submit a form, refresh.

If the app now reads and writes data end to end, **you're live.** The full chain is connected:

```
User → Vercel (frontend) → Render (backend) → Neon (database) → and all the way back
```

---

## ✅ Deployment Checklist

Copy this into your notes and tick through it in order.

**Database — Neon**
- [ ] Created a Neon project and copied the connection string (with `?sslmode=require`)
- [ ] Tables exist in Neon (via `sync()`, migrations, or seeds)

**Backend — Render**
- [ ] Server listens on `process.env.PORT` (with a local fallback)
- [ ] Sequelize reads `process.env.DATABASE_URL`, with SSL enabled
- [ ] `cors` middleware installed and wired up
- [ ] `.env` and `node_modules` are in `.gitignore`
- [ ] `package.json` has a `start` script that runs the server
- [ ] Backend pushed to GitHub, deployed on Render
- [ ] `DATABASE_URL` set in Render's Environment settings
- [ ] Verified a `GET` route directly in the browser/Postman

**Frontend — Vercel**
- [ ] `fetch` calls use `import.meta.env.VITE_API_URL`, not `localhost`
- [ ] No secrets in any `VITE_` variable
- [ ] Frontend pushed to GitHub, deployed on Vercel
- [ ] `VITE_API_URL` set in Vercel's Environment settings
- [ ] `vercel.json` with the SPA rewrite is in the frontend root (refresh/deep links work)

**Close the loop**
- [ ] Backend CORS updated to allow the real Vercel URL, then redeployed
- [ ] Loaded the live Vercel link and confirmed data reads and writes work

---

## 🛠️ Troubleshooting: read the error, then find the layer

Almost every problem is *one layer failing to reach the next.* When something breaks, open your browser's **DevTools → Network tab**, click the failing request, and read what it says. Then match it below.

| What you see | What it usually means | Where to look |
| --- | --- | --- |
| Frontend loads, but no data appears | Frontend can't reach the backend | Is `VITE_API_URL` set correctly on Vercel? Did you rebuild after setting it? |
| **404** when you refresh or share a URL like `/polls/3` (but clicking links works) | Vercel is looking for a file at that path; React Router routes live only in the browser | Add `vercel.json` with the SPA rewrite to the frontend root, then redeploy (Part 3) |
| Console error mentioning **CORS** / "blocked by CORS policy" | Backend isn't allowing your frontend's origin | Update the backend's CORS config to your Vercel URL, push, let Render redeploy (Part 4) |
| Requests to `http://localhost:3000` in the Network tab | Frontend still hardcoded to localhost | Replace with `import.meta.env.VITE_API_URL` and redeploy |
| Backend logs show a database connection error | Backend can't reach Neon | Check `DATABASE_URL` on Render; confirm SSL is enabled in Sequelize |
| First request takes 30–60s, then it's fine | Render free tier woke from sleep | Normal. Hit the URL once to wake it before a demo |
| Render deploy "succeeds" but the URL won't load | App isn't listening on Render's port | Make sure the server uses `process.env.PORT` |
| Vercel build fails | The `npm run build` step errored | Read Vercel's build log; the app must build locally (`npm run build`) before it'll build in the cloud |

**The habit to build:** when something's broken, don't guess and don't change five things at once. Ask "which two layers are failing to talk?", open the Network tab or the service logs to confirm, then fix that one connection. That single skill will carry you through your capstone.
