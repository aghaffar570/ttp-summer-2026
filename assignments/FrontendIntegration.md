# Assignment: Connect the Frontend — Recipes App

## Goal

Build a React app that talks to a real Express server. No more Postman — your own page will list, add, and delete recipes by calling your own backend.

## Why This Matters

You already know two things, but you have never used them together:

- **fetch** — In the API Requests assignment, you asked another computer for data and showed it on the page.
- **Express** — This week, you built a server that answers requests for recipes.

Today you connect them. The difference this time: the server is not somewhere out on the internet. It runs on your own computer.

You will also do more than just *read* data today. You will **add** and **delete** recipes from the page. This means you will *send* data to the server, not just ask for it.

One new thing: you will run **two servers at the same time** — your Express API on one port, and your React app on another. They are two separate programs. They talk to each other over the network, the same way your browser talks to any website.

## Resources

- fetch: https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch
- React docs on `useEffect`: https://react.dev/reference/react/useEffect

## Setup

You need **two terminal windows** open — one for the backend, one for the frontend. You will fork two separate repos, one for each.

**Terminal 1 — start the backend (`recipes-api`):**
- [ ] Go to https://github.com/aghaffar570/recipes-api-starter
- [ ] Click **Fork** (top right of the page). This copies the repo to your own GitHub account.
- [ ] Clone your fork: `git clone <your-fork-url>`
- [ ] `cd recipes-api-starter`
- [ ] `npm install`
- [ ] `node app.js`
- [ ] Leave this terminal open and running.

**Check it:** Your terminal shows `Server running on port 8080`. In Postman, send `GET http://localhost:8080/api/recipes` — you should get back 5 recipes.

**Terminal 2 — start the frontend (`recipes-frontend`):**
- [ ] Go to https://github.com/aghaffar570/recipes-frontend-starter
- [ ] Click **Fork**.
- [ ] Clone your fork: `git clone <your-fork-url>`
- [ ] `cd recipes-frontend-starter`
- [ ] `npm install`
- [ ] `npm run dev`
- [ ] Open the URL it gives you (probably `http://localhost:5173`).

**Check it:** Your browser shows "Recipes" with an empty list, an "Add Recipe" form, and no errors in the console. Both terminals are still running.

**Look around before you write any code.** The frontend repo already has the React side built for you:
- `App.jsx` holds the `recipes` state and renders `RecipeForm` and `RecipeList`.
- `components/RecipeForm.jsx` is a working form. Typing and submitting it already calls a function — it just doesn't talk to the server yet.
- `components/RecipeList.jsx` and `components/RecipeCard.jsx` show each recipe with **Delete** and **Toggle Vegetarian** buttons. Same idea — the buttons work, but nothing is connected yet.

Open `App.jsx`. You will find four spots marked `// TODO`: one `useEffect`, and three functions (`handleAddRecipe`, `handleDeleteRecipe`, `handleToggleVegetarian`). Those four spots are this entire assignment. Everything else is already done for you.

> **Key idea — read this before you start:** Sending a request to the server does **not** update your screen by itself. `recipes` in React is just a copy of the data, used to draw the list on your page. The server and your page are two separate things — they do not stay in sync on their own. This is why every TODO has two jobs, not one: first send the request, **then** call `setRecipes` to update what you see.
>
> **How to debug:** You click a button and nothing changes on the screen. You refresh the page, and now you see the change. That means your request worked! The bug is just the missing `setRecipes` step — not your `fetch`. (Refresh works because it runs the `useEffect` from Part 1 again, which asks the server for the full list.)

---

## Part 1: Load Recipes on Page Load

**Why:** A page should not start empty if there is data ready for it. You will ask for the data as soon as the page loads.

Steps:
- [ ] In `App.jsx`, find the `useEffect` marked `TODO (Part 1)`.
- [ ] Fetch `` `${API_URL}/api/recipes` ``.
- [ ] Turn the response into JSON.
- [ ] Save it into `recipes` using `setRecipes`.

**Check it:** Refresh the page. All 5 starter recipes show up in the list below the form. This data came from your server — you did not type it into your code.

---

## Part 2: Add a New Recipe

**Why:** So far you have only *read* from your server. Now you will *send* it something — the same kind of request Postman was making for you in the Middleware assignment, except now your own form does it.

The form is already built. Submitting it calls `onAdd(newRecipe)`, which runs `handleAddRecipe` in `App.jsx`. That function is the only piece left for you to write.

Steps:
- [ ] In `App.jsx`, find `handleAddRecipe`, marked `TODO (Part 2)`.
- [ ] Send a `POST` request to `` `${API_URL}/api/recipes` ``.
- [ ] Set `method: "POST"`.
- [ ] Set a `headers` object with `"Content-Type": "application/json"`.
- [ ] Set `body: JSON.stringify(newRecipe)`.
- [ ] When the request succeeds, turn the response into JSON and add the new recipe to your `recipes` state — either add it to the array yourself, or fetch the whole list again.

**Check it:** Submit the form. A 6th recipe appears on the page with no refresh. While your backend is still running, check `GET /api/recipes` in Postman — the new recipe should be there too. (If you stop and restart `node app.js`, it will disappear. More on that soon.)

---

## Part 3: Delete a Recipe

**Why:** The last piece of CRUD from the frontend: remove something, and watch the page update.

Every recipe card already has a **Delete** button. Clicking it calls `onDelete(recipe.id)`, which runs `handleDeleteRecipe` in `App.jsx`.

Steps:
- [ ] In `App.jsx`, find `handleDeleteRecipe`, marked `TODO (Part 3)`.
- [ ] Send a `DELETE` request to `` `${API_URL}/api/recipes/${id}` ``.
- [ ] When it succeeds, remove that recipe from your `recipes` state.

**Check it:** Click the Delete button. The card disappears right away. Check `GET /api/recipes` in Postman — the recipe is gone from the server too.

---

## Common Gotchas

- **CORS error in the console?** Check that `recipes-api` has `app.use(cors())`. Without it, the browser blocks your request.
- **POST or PATCH not working?** Check you set the `"Content-Type": "application/json"` header. Without it, `req.body` will be empty on the server, even though you sent data.
- **Nothing happens when you click a button?** Check your backend terminal. Is `recipes-api` still running? Did it crash?
- The `id` you use in the URL is a string. That is fine here — you are not doing math with it, just placing it inside a URL.
- Two terminals, two servers. If you stop the wrong one, the other terminal will start showing connection errors.

## Stretch Challenges

- [ ] **Toggle vegetarian:** Every recipe card already has a "Toggle Vegetarian" button calling `handleToggleVegetarian` — fill it in with a `PATCH` request that flips `vegetarian`.
- [ ] **Loading state:** Show "Loading..." while the first fetch is in progress.
- [ ] **Error state:** If the fetch fails (try stopping your backend and refreshing), show a friendly message instead of a blank page.
- [ ] **Reviews:** For each recipe, fetch and show its reviews from `/api/recipes/:recipeId/reviews`.
- [ ] **Environment variable:** Instead of hardcoding `http://localhost:8080`, store it in a `.env` file as `VITE_API_URL` and read it with `import.meta.env.VITE_API_URL`.

## How to Submit Your Work

All of today's code lives in your `recipes-frontend-starter` fork. That's the only repo you need to push.

Steps:
- [ ] Open your terminal. Make sure you are inside your `recipes-frontend-starter` folder.
- [ ] Run `git add .`
- [ ] Run `git commit -m "connect frontend to recipes-api"`
- [ ] Run `git push`
- [ ] Go to your fork on GitHub. Confirm your changes are there.

**Submit:** Copy your fork's URL and submit that link.

## Finished Checklist

Before submitting, verify:

- [ ] Both `recipes-api-starter` and `recipes-frontend-starter` run at the same time without errors.
- [ ] The page loads all recipes from your server when it first opens.
- [ ] Submitting the form adds a recipe — you can see it on the page and with a Postman `GET`.
- [ ] Clicking Delete removes a recipe — on the page and on the server.
- [ ] Your work is committed and pushed to your `recipes-frontend-starter` fork on GitHub.

---

**One thing to notice:** if you stop and restart `node app.js`, every recipe you added or deleted today is gone. The data goes back to the original 5. Remember this — it is exactly the problem next week solves, with a real database.
