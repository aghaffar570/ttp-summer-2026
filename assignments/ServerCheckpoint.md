# Server Checkpoint

This is not graded. It is a checkpoint. A checkpoint shows you and your instructors what you know, and what needs more practice, before we start databases next week.

You may look back at `books-api` or `recipes-api` projects on the setup if you need help.

If you do get stuck, write down what you tried. Write down what confused you.

When you are done, push your work to a GitHub repository. Share the link.

express doc: https://expressjs.com/en/5x/starter/hello-world/
array method cheat sheet: https://gist.github.com/ajeetkumarrauniyar/48d28c0c65b06c35bbeefdfc40453ac8

---

## How to Submit

1. Create a new GitHub repository called `ttp-server-checkpoint`
2. Clone it to your machine
3. Build your work inside this repo. Use the file structure below.
4. Commit after each part. Push when you are done.

---

**Required setup:**
```
ttp-server-checkpoint/
  app.js
```

Before you start:
- [ ] Run `npm init -y`.
- [ ] You should now see a package.json file with default package.json settings.
- [ ] Run `npm install express`.
- [ ] You should now see the `node_modules` directory in your project, and `express` listed in the package.json under dependencies.
- [ ] Put all your code in one file: `app.js`. Do not split it into routers today.

---

## Starter Data

Paste this at the top of `app.js`:

Because we don't have a Database, this data will mock stored data in memory.

```js
let plants = [
  { id: 1, name: "Snake Plant", type: "Succulent", sunlight: "Low", watered: true },
  { id: 2, name: "Pothos", type: "Vine", sunlight: "Medium", watered: false },
  { id: 3, name: "Monstera", type: "Tropical", sunlight: "Medium", watered: true },
  { id: 4, name: "Cactus", type: "Succulent", sunlight: "High", watered: false },
];

let nextId = 5;
```

---

## Part 1 — CRUD

You have built these five routes before. Build them again. Then add two small new things: `req.query`, and `async`/`await`.

For each **Explain** question, write your answer as a comment. Put it right below the code it's about.

- [ ] Set up Express.
  - [ ] Add `express.json()` as a middleware.
  - [ ] Add `app.listen` on port `8080`.

- [ ] `GET /api/plants` — should send back all plants.
  - [ ] Add this too: if the URL has `?type=`, only send back plants with that type. Hint: `req.params` and `req.query` are both objects on the request object itself. Try console.log and see what it gives you.

    **Explain:** What is the difference between `req.params` and `req.query`? Give one example of when you would use each one.

- [ ] `GET /api/plants/:id` — send back one plant based on the id.
  - [ ] If no plant matches the id, send back `404` with a simple message.
  - [ ] Make this route handler `async`.
  - [ ] Before you send the response, add this line: `await new Promise((resolve) => setTimeout(resolve, 500))`. This adds a half-second delay, like a real server would have.

    **Explain:** `req.params.id` is always a string. Why do you need to wrap it in `Number()` before comparing it to a plant's `id`?

    **Explain:** What happens if you remove `await` from in front of the delay? Does the route still work the same way?

- [ ] `POST /api/plants` — make a new plant from `req.body`.
  - [ ] Give the new plant an id using `nextId`. Then add 1 to `nextId`.
  - [ ] Check what data fields needs to be sent for the new plant
  - [ ] Add the new plant to the `plants` array by mutating the array.
  - [ ] Send back status `201` and the new plant.

- [ ] `PATCH /api/plants/:id` — find the plant that matches the id.
  - [ ] If no plant matches, send back `404` with a simple message.
  - [ ] If a plant matches, copy only the fields from `req.body` onto it. Do not replace the whole plant.
  - [ ] Send back status `200` and the updated plant.

    **Explain:** Why does `PATCH` copy fields onto the plant, instead of replacing the whole plant?

- [ ] `DELETE /api/plants/:id` — find the plant that matches the id.
  - [ ] If no plant matches, send back `404` with a simple message.
  - [ ] If a plant matches, remove it from the array.
  - [ ] Send back status `204` and a simple message.

    **Explain:** What is the difference between `404` and `204`? When do you use each one in this route?

**Check it:**
- [ ] Test all five routes in Postman.
- [ ] Try `GET /api/plants?type=Succulent`. You should only get plants with that type.
- [ ] Try `GET /api/plants/:id`. It should take a little longer to respond now. That's the delay you added.

---

## Part 2 — A Nested Resource: Plant Care Notes

**Why:** Some resources belong to other resources. You saw this before with recipes and reviews. A care note only exists if its plant exists. 

Another way to think about resources is the "nouns" of your application. What categories of objects are you working with? In this case, we have "plants" and "notes."

So for nesting routes, some nouns are related to other nouns. For example, a resource for reviews should only exist if there are recipes, comments should only exist if there are posts, and likes should only exist if there are photos or reels.

Today there is no router file. Everything stays in `app.js`. A nested resource is just a route with two parts in its URL, like `/plants/:plantId/notes`.

Add this starter data above the `plants` array in `app.js`:

```js
let careNotes = [
  { id: 1, plantId: 1, note: "Needs water every 2 weeks." },
  { id: 2, plantId: 1, note: "Tolerates low light well." },
  { id: 3, plantId: 3, note: "Loves humidity." },
];

let nextNoteId = 4;
```

Steps:
- [ ] `GET /api/plants/:plantId/notes` — find all care notes where `note.plantId` matches `plantId` from the URL.
  - [ ] Send back those notes.

  **Explain:** What does `:plantId` represent in this URL? Why is it a param, and notes isn't?

- [ ] `POST /api/plants/:plantId/notes` — make a new note from `req.body` (it will have a `note` field).
  - [ ] Give the new note an id using `nextNoteId`. Then add 1 to `nextNoteId`.
  - [ ] Give the new note the `plantId` from the URL.
  - [ ] Add the note to `careNotes`.
  - [ ] Send back status `201` and the new note.

- [ ] `DELETE /api/notes/:id` — find the note that matches the id.
  - [ ] Remove it from `careNotes`.
  - [ ] Send back status `204` and a simple message.

    **Explain:** This `:id` is the note's own id, not a plant's id. Why does this route start with `/api/notes`, and not `/api/plants`?

**Check it:**
- [ ] `GET /api/plants/1/notes` should return 2 notes.
- [ ] `DELETE /api/notes/1` — this should delete the note with id 1.
- [ ] `GET /api/plants/1/notes` again. Now you should only see 1 note.

---

## Part 3 — Middleware

- [ ] Write a logging middleware. It should print the request's method and URL.
- [ ] Use `app.use` to run it on every request. Put it above your routes.

    **Explain:** What happens if you put this middleware below your routes instead of above them?

- [ ] Write a validation middleware for `POST /api/plants`.
  - [ ] Check that `req.body` has `name` and `type`.
  - [ ] If either one is missing, send back `400` with a simple message, and stop the execution from moving forward.
  - [ ] Attach this middleware to only that one route.

  **Explain:** What is a good reason to have a middleware for our POST routes?

  **Explain:** What happens to a request if this middleware never calls `next()`, and never sends a response?

- [ ] Wrap the code inside each route in `try`/`catch`.
  - [ ] In each `catch`, call `next(err)`. Hint: Where do we get the `next` function from?

- [ ] Add one error-handling middleware. Put it at the bottom of `app.js`, after your routes and before `app.listen`.
  - [ ] Inside it, log the error.
  - [ ] Send back status `500`.

  **Explain:** The error-handling middleware has `4 parameters`, not 3. How does Express know this means it's for errors? Hint: It has to do with the first argument passed in to the handler.

**Check it:**
- [ ] Make one route throw an error on purpose. (Try using a variable name in the code that doesn't exist.)
- [ ] Send a request to that route.
- [ ] You should see the error logged, and a `500` response. Your server should not crash.
- [ ] Remove your test code when you're done.

---

## Part 4 — Before We Talk About Databases

No new code for this part. Just answer the questions. Write each answer as a comment at the bottom of `app.js`.

- [ ] **Explain:** You stop and restart `node app.js`. What happens to your `plants` array? Why does that happen?
- [ ] **Explain:** Two people send requests to your API at the same time, from two different computers. Do they see the same list of plants? Why or why not?
- [ ] **Explain:** Think about your last answer. What would need to be true about where your data lives, so it can survive a restart?

---

## Before You Push

- [ ] `node app.js` starts with no errors.
- [ ] All five plant routes work in Postman. Each one sends back the right status code.
- [ ] `GET /api/plants?type=...` works. It only sends back plants with that type.
- [ ] `GET /api/plants/:id` works. It takes a little longer now, because of the delay.
- [ ] The plant care notes routes work. You can list notes, add a note, and delete a note.
- [ ] Your logging, validation, and error-handling middleware all work.
- [ ] Every "Explain" question has a written answer.
- [ ] Your work is committed and pushed to GitHub.