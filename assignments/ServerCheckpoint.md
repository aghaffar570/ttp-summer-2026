# Server Checkpoint

This is not graded. It is a checkpoint — a way for you and your instructors to see where you are and where you need support before we move into databases next week. Be honest. Do your own work without copying from your `books-api` or `recipes-api` projects — the point is to see what sticks without something to copy from. If you are stuck, write down what you tried and what confused you.

When you are done, push your work to a GitHub repository and share the link.

---

## How to Submit

1. Create a new GitHub repository called `server-checkpoint`
2. Clone it to your machine
3. Build your work inside it using the structure below
4. Commit after each part and push when done

**Required setup:**
```
server-checkpoint/
  app.js
  package.json
```

Run `npm init -y` and `npm install express` before you start. Everything for this checkpoint lives in one file, `app.js` — don't split it into routers today.

---

## Starter Data

Paste this at the top of `app.js`:

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

Build the same five routes you've now built twice before. Write your explanation answers as a comment directly below the code they refer to.

- [ ] Set up Express, `express.json()`, and `app.listen` on port `8080`.
- [ ] `GET /api/plants` — return all plants.
- [ ] `GET /api/plants/:id` — return one plant, or `404` if no id matches.

  **Explain:** Why must you wrap `req.params.id` in `Number()` before comparing it to a plant's `id`?

- [ ] `POST /api/plants` — create a plant from `req.body`, assign it `nextId`, add it to the array, respond `201` with the new plant.
- [ ] `PATCH /api/plants/:id` — update only the fields sent in `req.body`, `404` if not found.

  **Explain:** Why does `PATCH` copy fields onto the existing object instead of replacing the whole thing?

- [ ] `DELETE /api/plants/:id` — remove the plant, `404` if not found, respond `204`.

  **Explain:** What is the difference between a `404` and a `204` response? When does each one happen here?

**Check it:** Test all five routes in Postman before moving on.

---

## Part 2 — Middleware

- [ ] Write a logging middleware that prints the request's method and URL on every request. Register it with `app.use`, above your routes.

  **Explain:** What would happen if you registered this middleware *below* your routes instead of above them?

- [ ] Write a validation middleware for `POST /api/plants` that checks `req.body` for `name` and `type`. If either is missing, respond `400` and stop. Attach it only to that one route.

  **Explain:** What would happen to a request if this middleware never called `next()` and never sent a response either?

- [ ] Wrap the logic inside each route in `try/catch`. In each `catch`, call `next(err)`.
- [ ] Add one error-handling middleware at the bottom of `app.js`, after all your routes but before `app.listen`. Have it log the error and respond `500`.

  **Explain:** How does Express know this middleware is for handling errors, instead of treating it like a normal route?

**Check it:** Temporarily make one route throw on purpose (reference a variable that doesn't exist) and confirm you get a logged error and a `500` response instead of a crash. Remove your test code afterward.

---

## Part 3 — Before We Talk About Databases

No new code for this part. Answer each question as a comment at the bottom of `app.js`.

- [ ] **Explain:** What happens to your `plants` array when you stop and restart `node app.js`? Why does that happen?
- [ ] **Explain:** If two different people sent requests to your API at the same time from two different computers, would they see the same list of plants? Why or why not?
- [ ] **Explain:** Based on what you just answered, what would have to be true about *where* your data lives for it to survive a restart?

---

## Before You Push

- [ ] `node app.js` starts without errors.
- [ ] All five plant routes work in Postman, including correct status codes.
- [ ] Your logging, validation, and error-handling middleware all work as described.
- [ ] Every "Explain" question has a written answer in a comment.
- [ ] Your work has been committed and pushed to GitHub.
