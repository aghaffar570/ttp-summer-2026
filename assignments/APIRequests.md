# Assignment 06: API Requests — Users Directory

## Goal

Get a list of users from the internet and show them on the page.

## Why This Matters

Up to now, you typed your data right into your code, like the movie list. Real apps do not do that. They ask another computer (called a **server**) for data. The server sends the data back. This takes a moment. We need a way to wait for it, and then update the page when it arrives. That is what this assignment teaches.


## Resource

fetch:
- https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch
- https://javascript.info/fetch


**API Endpoints (no key required):**

| URL | Returns |
|---|---|
| `https://jsonplaceholder.typicode.com/users` | Array of 10 users |
| `https://jsonplaceholder.typicode.com/posts?userId=1` | Posts for user 1 |



## Setup

```bash
npm create vite@latest users-directory -- --template react
cd users-directory
npm run dev
```

Open `App.jsx`. Delete everything inside it. Delete everything inside `App.css` too. You will write all new code.

We will get data from this address:

```
https://jsonplaceholder.typicode.com/users
```

It gives back a list of 10 fake users.

---

## Part 1: Run Code One Time, When the Page Opens

**Why:** Right now, all your code runs every time the page updates. We only want to fetch data one time, the moment the page opens. **`useEffect`** is a tool that runs code one time.

Steps:

- [ ] Open `App.jsx`.
- [ ] At the top, import `useEffect` next to `useState`.
- [ ] Inside your `App` function, call `useEffect`.
- [ ] Give `useEffect` a function. Inside that function, write one line: `console.log("page loaded")`.
- [ ] After that function, add an empty array: `[]`. This empty array is the second argument passed in useEffect and it tells React "only run one time."
- [ ] Save the file. Open your browser console. Refresh the page.

**Check it:** "page loaded" should show in the console. It should show up only one time, not many times.

---

## Part 2: Get the Real Data

**Why:** Now you can run code one time when the page opens. This is the moment to ask the server for data. Right now, do not worry about what shows on the page — just focus on getting the data and saving it. It is okay if the page stays blank for this part.

Steps:

- [ ] Add a state variable called `users`. Start it as an empty array: `useState([])`.
- [ ] Inside `useEffect`, write a new function called `fetchUsers`. Make it `async`. (**`async`** means this function is allowed to pause and wait for something, like an answer from the internet.)
- [ ] Inside `fetchUsers`, use `fetch` to ask for the address above.
- [ ] Put `await` in front of `fetch`. (**`await`** means "wait here for the answer before moving to the next line."). Remember we want the data returned in json format.
- [ ] Update our state `users`, using `setUsers`.
- [ ] Right after you write `fetchUsers` function, call it within useEffect: `fetchUsers()`.

A small note: the function you hand to `useEffect` cannot be `async` itself. That is why we write a second function (`fetchUsers`) inside it. See **Common Gotchas** below for the exact code if this part feels confusing.

**Check it:** Inside `fetchUsers`, add `console.log(response.data)`. Open your console. You should see a list of 10 users. The page itself can still be blank — that is expected.

---

## Part 3: Show the Data on the Page

**Why:** You already know how to turn a list into HTML. You did this with the movie list, using `.map()` and a component. Now you will do the exact same thing, but with data that came from the internet.

Steps:

- [ ] Make a new component called `UserCard`.
- [ ] `UserCard` should take one prop, called `user`.
- [ ] Inside `UserCard`, show `user.name` and `user.email`.
- [ ] Back in `App`, use `.map()` on `users`. For each user, render a `UserCard`.
- [ ] Give each `UserCard` a `key`. Use the user's `id`.

**Check it:** Refresh the page. You should see 10 user cards. You may notice the page is blank for a split second before they appear — we will fix that next.

---

## Part 4: Add a Loading Message

**Why:** Right now there is a short, awkward moment where the page is blank while the data is still on its way. We can use a second state variable to show a friendly message during that wait, instead of leaving the page looking broken or empty.

Steps:

- [ ] Add a state variable called `loading`. Start it as `true`.
- [ ] Inside `fetchUsers`, right after you call `setUsers`, set `loading` to `false` using `setLoading`.
- [ ] Back in `App`, check if `loading` is `true`. If it is, render some JSX with "Loading users..." instead of the list.
- [ ] If `loading` is `false`, show the list of `UserCard`s like you already built in Part 3.

**Check it:** Refresh the page. You should briefly see "Loading users...", then the 10 user cards — no more blank flash in between.

---

## Common Gotchas

- The callback function you pass to `useEffect` cannot be `async`. Write a second function inside it, and call that one instead. Like this:
  ```js
  useEffect(() => { // this function cannot be async

    // that is why we write our own async function here:
    const fetchUsers = async () => {
      const response = await fetch("https://jsonplaceholder.typicode.com/users")
      const data = await response.json()
      setUsers(data)
      setLoading(false)
    }
    fetchUsers()
  }, [])
  ```
- Do not call `fetch` outside of `useEffect`. If you do, it will run forever, over and over.

## Stretch Challenges

Only try these after Parts 1–4 work. Try them in this order:

- [ ] Add an `error` state variable. Wrap your fetch in `try/catch`. If it fails, show an error message.
- [ ] Let someone click a `UserCard`. When they click it, fetch that user's posts. You may need to refer to the documentation on how to fetch the particular user: https://jsonplaceholder.typicode.com/ (check guide for user endpoints)
- [ ] Move your list code out of `App`. Put it in its own `UserList` component.
- [ ] Add a search box. Type a name, and only matching users show up.

## How to Submit Your Work

**Why:** So far you have only cloned repos that already existed on GitHub. This time, you started a brand new project on your computer first. So we need a few new steps to connect it to a brand new, empty repo on GitHub.

Steps:

- [ ] Open your terminal. Make sure you are inside your `users-directory` folder.
- [ ] Run `git init`. This turns your folder into a git project. (You only do this once, at the start.)
- [ ] Run `git add .`
- [ ] Run `git commit -m "complete users directory assignment"`
- [ ] Go to [github.com](https://github.com). Click the **+** icon in the top right, then click **New repository**.
- [ ] Name it `users-directory`. Leave every checkbox unchecked (no README, no `.gitignore`, no license). Click **Create repository**.
- [ ] GitHub now shows you a page with a few different code blocks. Find the one titled **"…or push an existing repository from the command line."** It looks like this:
  ```bash
  git remote add origin https://github.com/<your-username>/users-directory.git
  git branch -M main
  git push -u origin main
  ```
- [ ] Copy those three lines exactly as GitHub shows them (they will already have your username and repo name filled in). Paste them into your terminal and press enter.
- [ ] Refresh the GitHub page in your browser. You should now see all your files there.

**Check it:** Open your repo link in the browser. Confirm you can see `App.jsx` and your `UserCard` component.

**Submit:** Copy your repo's URL — it will look like `https://github.com/<your-username>/users-directory` — and submit that link.

---

## Finished Checklist

- [ ] "page loaded" shows in the console one time.
- [ ] The console shows the 10 users after the fetch.
- [ ] The page shows "Loading users...", then shows 10 users — no blank flash.
- [ ] Each user shows through a `UserCard` component.
- [ ] No errors show in the console.
- [ ] Your work is committed and pushed to GitHub.



## Industry Standards

- Always handle three states for any async operation: loading, error, and success.
- Keep fetch logic in clearly named functions (`fetchUsers`, `fetchPosts`) rather than anonymous functions inside `useEffect`.
- Never put an API key or token directly in a frontend request to a public API — anyone can read your source code. For private keys, use a backend proxy.
- Separate data-fetching concerns from rendering concerns — components should receive data as props, not each fetch independently (this pattern scales better).

