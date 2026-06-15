# Assignment 05: React I — Movie Night Watchlist

## What You Are Building

A small React app where you can see a list of movies and click a button to mark each one as watched or unwatched.

By the end of this assignment you will have practiced:
- Creating a React component
- Displaying a list of items with `.map()`
- Passing data from one component to another (props)
- Making a button change something on the screen (state + events)

---

## Working in Groups

You will work together on one screen — one person types, the other reads along and helps catch mistakes. Switch who is typing at each checkpoint.

One person creates the GitHub repository and adds the other as a collaborator:

1. The repo owner goes to the repository on GitHub, then **Settings → Collaborators → Add people**.
2. The collaborator accepts the invite from their email or GitHub notifications.

Both people should be looking at the screen at all times. The person not typing should be reading the instructions out loud, checking the browser, and catching errors.

---

## Step 0 — Set Up Your Project

Open your terminal and run these four commands. Run them **one at a time** and wait for each one to finish before running the next.

```bash
npm create vite@latest movie-night -- --template react
```
```bash
cd movie-night
```
```bash
npm install
```
```bash
npm run dev
```

After the last command, you will see a link in the terminal that looks like `http://localhost:5173`. Open that link in your browser.

You should see a page that says "Vite + React". That means your project is working.

**Before you write any code, do this cleanup:**

Vite fills these files with a demo to show the tool is working. You are going to replace them with your own app.

1. Open `src/App.jsx` — select all the text and delete it.
2. Open `src/App.css` — select all the text and delete it if you want to reset the styles.

> **If your terminal shows an error after `npm create vite`, stop and ask your instructor.** Setup problems are normal and your instructor can fix them quickly. Do not spend more than 10 minutes on setup — it is not the point of this assignment.

---

## Your Starter File

Paste this into `src/App.jsx`. This gives you the movie data and the basic structure of your component. You will build everything inside it.

```jsx
import { useState } from 'react'
import './App.css'

const initialMovies = [
  { id: 1, title: "The Matrix",                         genre: "Sci-Fi",    year: 1999, watched: false },
  { id: 2, title: "Parasite",                           genre: "Thriller",  year: 2019, watched: false },
  { id: 3, title: "Everything Everywhere All at Once",  genre: "Sci-Fi",    year: 2022, watched: true  },
  { id: 4, title: "Knives Out",                         genre: "Mystery",   year: 2019, watched: false },
  { id: 5, title: "Coco",                               genre: "Animation", year: 2017, watched: true  },
  { id: 6, title: "Get Out",                            genre: "Horror",    year: 2017, watched: false },
]

export default function App() {
  return (
    <div>

    </div>
  )
}
```

Save the file. Your browser should show a blank white page with no errors. That means your starter is working.

Each movie has five pieces of information: `id`, `title`, `genre`, `year`, and `watched`. You do not need to change any of this.

---

## Part 1 — Show the Movie List

**New ideas in this part:** `useState`, writing a component, `.map()`

### Step 1.1 — Add state and a heading

Inside your `App` function, above the `return`, use `useState` to store the movie list as state. Name the state variable `movies`.

Then inside the `return`, add an `<h1>` that says "Movie Night".

Save the file. You should see the words **Movie Night** on the page.

> **What is `useState`?** It is a React tool that lets your component remember data. When that data changes, React automatically updates what the user sees on screen. It gives you two things: the current value (`movies`) and a function to update it (`setMovies`).
>
> **Hint:** `useState` takes a starting value. Your starting value is the movie list — `initialMovies`.

---

### Step 1.2 — Show each movie

Right now you only have a heading. Next, you will display the list of movies.

Inside your `return`, below the `<h1>`, use `.map()` to go through the `movies` array. For each movie, display:
- The movie's title
- The genre and year on the same line

Wrap each movie's output in a `<div>`. Give each `<div>` a special prop called `key` and set it to the movie's `id`.

Save the file. You should now see all **six movies** listed on the page.

> **What is `.map()`?** It goes through every item in an array and returns something for each one. Here, you are returning a piece of JSX for each movie.
>
> **Hint:** To show a JavaScript value inside JSX, wrap it in curly braces: `{movie.title}`.
>
> **Gotcha:** Every item inside a `.map()` must have a `key`. Without it, React will warn you in the console and your list may behave strangely when items change.

---

**Checkpoint 1:** Your page shows "Movie Night" and lists all six movies with their title, genre, and year. ✓

---

## Part 2 — Create a MovieCard Component

**New ideas in this part:** creating a second component, props

Right now all your display code lives inside `App`. In this part, you will move the movie display into its own component called `MovieCard`.

### Step 2.1 — Create the file

In your `src` folder, create a new file called `MovieCard.jsx`.

> To create a file: right-click the `src` folder in your code editor and choose "New File". Name it `MovieCard.jsx`.

---

### Step 2.2 — Write the MovieCard component

Open `MovieCard.jsx`. Write a component called `MovieCard` that:
- Accepts one prop — a single movie object. Name the parameter `movie`.
- Displays the movie's title and the genre and year on the same line.
- Exports the function as the default export.

> **What are props?** Props are how you pass information from one component to another. They work like function parameters.
>
> **Hint:** Your function will receive props as an object. You can pull out just the `movie` key by writing `{ movie }` inside the parentheses: `function MovieCard({ movie })`. This is called **destructuring** — it might look unusual, but it is just a shortcut for `const movie = props.movie`.
>
> **Gotcha:** If you see "Cannot read properties of undefined", it usually means `movie` is not arriving as a prop. Check how you are calling `<MovieCard />` in the next step.

---

### Step 2.3 — Use MovieCard in App

Go back to `App.jsx`. You need to do two things:

1. Import `MovieCard` at the top of the file. The path will be `'./MovieCard'` — the dot-slash means "in the same folder".
2. Update your `.map()` to render `<MovieCard />` instead of plain divs. Pass the current movie to it as a prop named `movie`. Move the `key` prop onto `<MovieCard />`.

Save the file. Your page should look exactly the same as before — all six movies should still appear.

> **Gotcha:** The `key` prop belongs on the outermost element inside the `.map()`. Since `<MovieCard />` is now the outermost thing, put `key` there — not inside `MovieCard.jsx`.

---

### Step 2.4 — Show the watched status

Each movie has a `watched` field. It is either `true` or `false`.

Open `MovieCard.jsx`. Before your `return` statement, figure out what text to show:
- If `movie.watched` is `true`, use the text **Watched**
- Otherwise, use the text **Not watched yet**

Store that text in a variable. Then add a `<p>` to your JSX that displays it.

Save the file. Movies 3 and 5 (Everything Everywhere and Coco) should now show **Watched**. The others should show **Not watched yet**.

> **Hint:** Use a plain `if` statement. Declare a variable before the `return`, set it based on the condition, then use it inside your JSX with `{ }`.

---

**Checkpoint 2:** Each movie shows its title, genre, year, and watched status. ✓

---

## Part 3 — Toggle Watched with a Button

**New ideas in this part:** event handlers, passing a function as a prop

This is the most important part. Read each step carefully before you write any code.

---

### Step 3.1 — Write the toggleWatched function in App

Open `App.jsx`. Inside your `App` function, above the `return`, write a function called `toggleWatched`. It should:
- Accept one argument: the `id` of the movie to toggle
- Use `.map()` to go through the `movies` array
- For the movie whose `id` matches the argument, return a copy of it with `watched` flipped to the opposite value (`true` becomes `false`, `false` becomes `true`)
- For all other movies, return them unchanged
- Call `setMovies` with the updated array

> **Why can't you just do `movie.watched = !movie.watched`?**
> In React, you are not allowed to change state directly. If you do, React does not know anything changed and the screen will not update. You must always create a new value and pass it to the setter function.
>
> **Hint:** To flip a boolean, use `!value`. If `watched` is `true`, then `!watched` is `false`.
>
> **Hint:** To create a copy of an object with one property changed, look into the **spread operator**: `{ ...movie }` creates a copy of all of `movie`'s properties. You can then add a property after it to override just that one: `{ ...movie, watched: !movie.watched }`.
>
> **Gotcha:** Your `.map()` must return something for every item — not just the one you are changing. If you forget `return` for the unchanged movies, the others will disappear from your list.

---

### Step 3.2 — Pass toggleWatched to MovieCard

In your `.map()` inside `App.jsx`, pass `toggleWatched` to each `<MovieCard />` as a prop. Name the prop `onToggle`.

> **Gotcha:** You are passing the function itself, not calling it. Do not put parentheses after `toggleWatched`. Writing `onToggle={toggleWatched()}` would call the function immediately on page load — not what you want.

---

### Step 3.3 — Add a button to MovieCard

Open `MovieCard.jsx`. Update your component to:
1. Accept a second prop: `onToggle`
2. Decide what the button label should say — if the movie is watched, show **Mark as Unwatched**; otherwise show **Mark as Watched**. Use the same pattern you used for the status text.
3. Add a `<button>` element that, when clicked, calls `onToggle` and passes it the movie's `id`

Save both files. Click a button on any movie. The status text and button label should both change immediately.

> **Gotcha:** Do not write `onClick={onToggle(movie.id)}`. That calls the function the moment the page loads, not when the button is clicked. Wrap it in an arrow function so it only runs on click: `onClick={() => onToggle(movie.id)}`.

---

**Checkpoint 3:** Each movie has a button. Clicking it toggles the watched status on that movie only. ✓

---

## Part 4 — Show the Stats

**New ideas in this part:** calculating values from state

At the top of your page, display three numbers:
- Total number of movies
- How many are watched
- How many are not yet watched

In `App.jsx`, above the `return`, calculate these three values from the `movies` array. Then display them inside a `<p>` in your JSX.

Click a toggle button — the numbers should update automatically without any extra code.

> **Hint:** `array.length` gives you the count of items in an array. `array.filter(...)` gives you a new array with only the items that match a condition — write `.length` right after it to count how many passed.
>
> **Why don't these need their own `useState`?** They are calculated directly from `movies`. Every time `movies` changes, React re-runs `App` and recalculates them. You do not need to store them separately.

---

**Checkpoint 4:** The stats at the top update when you click toggle buttons. ✓

---

## Finished Checklist

Before you submit, confirm each item:

- [ ] The app loads in the browser with no errors.
- [ ] All six movies appear.
- [ ] Each movie shows its title, genre, year, and watched status.
- [ ] Clicking the button on a movie toggles it between watched and unwatched.
- [ ] The stats at the top update when you click buttons.
- [ ] `MovieCard` is in a separate file: `src/MovieCard.jsx`.
- [ ] Your work is committed and pushed to GitHub.

---

## Stretch Challenges

Only start these after everything above is working.

- [ ] Right now you used `if` statements for `status` and `buttonLabel`. Try rewriting them as a single line using a **ternary**: `condition ? valueIfTrue : valueIfFalse`.
- [ ] Add a `removeMovie` function in `App` that removes a movie from the list. Pass it to `MovieCard` as a prop and add a Remove button. Hint: look at how `.filter()` works.
- [ ] Add a button at the top that hides all unwatched movies when clicked. Click again to show all.
- [ ] Move the stats paragraph into its own component called `StatsBar`. Pass `movies` to it as a prop.

---

## Quick Reference

| Problem | Check this |
|---|---|
| Page is blank | Does your component name start with a capital letter? Is it exported? |
| Movies do not appear | Is your `.map()` inside the `return`? Does each item have a `key`? |
| Button does nothing | Is `toggleWatched` passed as `onToggle` to MovieCard? |
| Stats do not update | Are you calculating from `movies` state, not a separate variable? |
| "Cannot read properties of undefined" | Did you destructure `{ movie }` correctly in MovieCard? |
