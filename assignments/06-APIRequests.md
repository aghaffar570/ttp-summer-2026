# Assignment 06: API Requests — Users & Posts Explorer

## Goal

Build a React app that fetches real data from a public API and displays it — practicing `useEffect`, `axios`, async/await, loading states, and making a second fetch based on user interaction.

## Objectives

You will practice:

- Making HTTP GET requests with `axios`.
- Using `useEffect` to fetch data after a component mounts.
- Managing loading and error states.
- Making a second fetch triggered by a user action.
- Rendering data from an API response.
- Understanding the Promises model and `async/await`.

## Problem

Build a **Users & Posts Explorer** using [JSONPlaceholder](https://jsonplaceholder.typicode.com/) — a free public API that returns realistic fake data. This same request/response pattern is exactly what you'll use once you build your own backend.

You'll display a list of users. When a user is clicked, fetch and display all of their posts.

Scaffold the project:

```bash
npm create vite@latest posts-explorer -- --template react
cd posts-explorer
npm install axios
npm run dev
```

**API Endpoints (no key required):**

| URL | Returns |
|---|---|
| `https://jsonplaceholder.typicode.com/users` | Array of 10 users |
| `https://jsonplaceholder.typicode.com/posts?userId=1` | Posts for user 1 |

## Assignment Tasks

### Part 1: Fetch Users on Mount

- [ ] In `App.jsx`, add three state variables: `users` (array, default `[]`), `loading` (boolean, default `true`), and `error` (default `null`).
- [ ] Write an async function `fetchUsers` that uses `axios.get` to fetch `https://jsonplaceholder.typicode.com/users` and sets `users` with `response.data`.
- [ ] Wrap the fetch in a `try/catch` — on error, set `error` to the error message.
- [ ] Always set `loading` to `false` when the fetch finishes (success or failure) — use a `finally` block.
- [ ] Call `fetchUsers` inside a `useEffect` with an empty dependency array.
- [ ] While loading, render `<p>Loading users...</p>`.
- [ ] If there's an error, render `<p>Error: {error}</p>`.
- [ ] Otherwise, render a list of user names.

### Part 2: UserList Component

Create `src/components/UserList.jsx`.

- [ ] Receives `users` and `onSelectUser` as props.
- [ ] Renders each user as a clickable `<li>` or `<button>`.
- [ ] Displays each user's `name` and `email`.
- [ ] Calls `onSelectUser(user)` when a user is clicked.
- [ ] Visually highlights the selected user (add a CSS class or inline style).

### Part 3: Select a User and Fetch Their Posts

- [ ] In `App`, add `selectedUser` state (default `null`) and `posts` state (default `[]`).
- [ ] Write a function `handleSelectUser(user)` that sets `selectedUser` to the chosen user.
- [ ] Write an async function `fetchPosts(userId)` that fetches `https://jsonplaceholder.typicode.com/posts?userId=${userId}` and sets `posts`.
- [ ] Use a second `useEffect` that runs `fetchPosts(selectedUser.id)` whenever `selectedUser` changes. Make sure it only runs when `selectedUser` is not `null`.
- [ ] Pass `handleSelectUser` to `<UserList>` as `onSelectUser`.

### Part 4: PostList Component

Create `src/components/PostList.jsx`.

- [ ] Receives `selectedUser` and `posts` as props.
- [ ] If `selectedUser` is `null`, renders `<p>Select a user to see their posts.</p>`.
- [ ] Otherwise renders the selected user's name as a heading and their posts below it.
- [ ] Each post displays its `title` and `body`.
- [ ] Shows a post count: `"X posts by [name]"`.

### Part 5: Layout and Polish

- [ ] Lay the `UserList` and `PostList` side by side using CSS flexbox or grid.
- [ ] Add a loading state specifically for posts (`postsLoading`) so the post panel shows `"Loading posts..."` while fetching.
- [ ] Add a `"Clear selection"` button that sets `selectedUser` and `posts` back to their default values.

## Common Gotchas

- Calling `axios.get` directly in the component body (outside `useEffect`) causes an **infinite loop** — every state update triggers a re-render, which triggers a fetch, which triggers a state update.
- `axios` returns the data at `response.data`. `fetch` returns a Response object — you have to call `await response.json()` to get the data.
- `useEffect` with no dependency array runs after **every** render. An empty `[]` array runs only once on mount.
- The `useEffect` callback cannot itself be `async`. Define the async function inside the effect and call it immediately:
  ```js
  useEffect(() => {
    const load = async () => { ... };
    load();
  }, []);
  ```
- Don't forget `selectedUser` in the second `useEffect`'s dependency array, or the linter will warn you and you may see stale data.
- If you see `"Cannot read properties of null"` — your component tried to read a property on `selectedUser` before it was set. Guard with `selectedUser &&`.

## Industry Standards

- Always handle three states for any async operation: loading, error, and success.
- Keep fetch logic in clearly named functions (`fetchUsers`, `fetchPosts`) rather than anonymous functions inside `useEffect`.
- Never put an API key or token directly in a frontend request to a public API — anyone can read your source code. For private keys, use a backend proxy.
- Separate data-fetching concerns from rendering concerns — components should receive data as props, not each fetch independently (this pattern scales better).

## Stretch Challenges

If you finish early:

- [ ] Add a search input above the user list that filters users by name as you type.
- [ ] Fetch a single post's comments when a post is clicked: `https://jsonplaceholder.typicode.com/comments?postId=1`.
- [ ] Add a `"Back to users"` breadcrumb that appears when a user is selected.
- [ ] Display each user's company name (`user.company.name`) and website (`user.website`) on the user card.
- [ ] Cache fetched posts in an object so switching between users doesn't re-fetch if you've already loaded their posts.

## Finished Checklist

Before submitting, verify:

- [ ] The app loads and displays 10 users without errors.
- [ ] Clicking a user fetches and displays their posts.
- [ ] Loading states appear during both fetches.
- [ ] Clicking a second user updates the post panel.
- [ ] The "Clear selection" button resets the view.
- [ ] The console shows no unhandled Promise rejections.
- [ ] Your work has been committed and pushed to GitHub.
