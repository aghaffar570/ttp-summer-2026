# Assignment 05: React I — Movie Night Watchlist

## What You Are Building

A small React app where you can see a list of movies and click a button to mark each one as watched or unwatched.

By the end of this assignment you will have practiced:
- Creating a React component
- Displaying a list of items with `.map()`
- Passing data from one component to another (props)
- Making a button change something on the screen (state + events)

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

1. Open the file `src/App.jsx` in your code editor.
2. Select all the text inside it and delete it. The file should now be completely empty.
3. Open the file `src/App.css`.
4. Select all the text inside it and delete it.

> **If your terminal shows an error after `npm create vite`, stop and ask your instructor.** Setup problems are normal and your instructor can fix them quickly. Do not spend more than 10 minutes on setup — it is not the point of this assignment.

---

## Your Starting Data

Copy this code and paste it at the top of `src/App.jsx`.

This is the list of movies your app will display. You do not need to change this.

```js
const initialMovies = [
  { id: 1, title: "The Matrix",                         genre: "Sci-Fi",    year: 1999, watched: false },
  { id: 2, title: "Parasite",                           genre: "Thriller",  year: 2019, watched: false },
  { id: 3, title: "Everything Everywhere All at Once",  genre: "Sci-Fi",    year: 2022, watched: true  },
  { id: 4, title: "Knives Out",                         genre: "Mystery",   year: 2019, watched: false },
  { id: 5, title: "Coco",                               genre: "Animation", year: 2017, watched: true  },
  { id: 6, title: "Get Out",                            genre: "Horror",    year: 2017, watched: false },
]
```

Each movie has five pieces of information: `id`, `title`, `genre`, `year`, and `watched`.

---

## Part 1 — Show the Movie List

**New ideas in this part:** `useState`, writing a component, `.map()`

### Step 1.1 — Write the App component

Below the movie data you pasted, write this:

```jsx
import { useState } from 'react'

export default function App() {
  const [movies, setMovies] = useState(initialMovies)

  return (
    <div>
      <h1>Movie Night</h1>
    </div>
  )
}
```

Save the file. Go to your browser. You should see the words **Movie Night** on the page.

> `useState(initialMovies)` creates a piece of state called `movies`. React will remember this data and update the screen whenever it changes. `setMovies` is the function you will use later to change it.

---

### Step 1.2 — Show each movie

Right now you only have a heading. Next, you will display the list of movies.

Inside your `return`, add a `.map()` below the `<h1>`:

```jsx
return (
  <div>
    <h1>Movie Night</h1>

    {movies.map((movie) => (
      <div key={movie.id}>
        <p>{movie.title}</p>
        <p>{movie.genre} — {movie.year}</p>
      </div>
    ))}

  </div>
)
```

Save the file. You should now see all **six movies** listed on the page.

> `.map()` goes through every item in the `movies` array and returns a piece of JSX for each one. The `key` is required — it helps React keep track of which item is which.

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

Open `MovieCard.jsx` and write this:

```jsx
export default function MovieCard({ movie }) {
  return (
    <div>
      <p>{movie.title}</p>
      <p>{movie.genre} — {movie.year}</p>
    </div>
  )
}
```

This component receives one movie object (called `movie`) and displays it.

---

### Step 2.3 — Use MovieCard in App

Go back to `App.jsx`. At the top of the file (above `const initialMovies`), add this import:

```js
import MovieCard from './MovieCard'
```

Then update your `.map()` to use `<MovieCard />` instead of plain divs:

```jsx
{movies.map((movie) => (
  <MovieCard key={movie.id} movie={movie} />
))}
```

Save the file. Your page should look exactly the same as before — all six movies should still appear.

---

### Step 2.4 — Show the watched status

Each movie has a `watched` field — it is either `true` or `false`.

Open `MovieCard.jsx` and add a line that shows the watched status. Update the component to look like this:

```jsx
export default function MovieCard({ movie }) {

  let status = 'Not watched yet'
  if (movie.watched === true) {
    status = 'Watched'
  }

  return (
    <div>
      <p>{movie.title}</p>
      <p>{movie.genre} — {movie.year}</p>
      <p>{status}</p>
    </div>
  )
}
```

Save the file. Movies 3 and 5 (Everything Everywhere and Coco) should now show **Watched**. The others should show **Not watched yet**.

---

**Checkpoint 2:** Each movie shows its title, genre, year, and watched status. ✓

---

## Part 3 — Toggle Watched with a Button

**New ideas in this part:** event handlers, passing a function as a prop

This is the most important part. Read each step carefully before you write any code.

---

### Step 3.1 — Write the toggleWatched function in App

Open `App.jsx`. Inside your `App` function, add this function **above the `return`**:

```jsx
const toggleWatched = (id) => {
  const updatedMovies = movies.map((movie) => {
    if (movie.id === id) {
      return { ...movie, watched: !movie.watched }
    }
    return movie
  })
  setMovies(updatedMovies)
}
```

**What this does, line by line:**

- `movies.map(...)` — goes through every movie in the list
- `if (movie.id === id)` — finds the one movie that was clicked
- `{ ...movie, watched: !movie.watched }` — creates a copy of that movie, but with `watched` flipped from `true` to `false` (or from `false` to `true`)
- `return movie` — all other movies come back unchanged
- `setMovies(updatedMovies)` — gives React the new list so the screen updates

> **Why can't you just do `movie.watched = true`?**
> In React, you are not allowed to change state data directly. If you do, React does not know anything changed and the screen will not update. You must always create a new value and pass it to the setter function (`setMovies`).

---

### Step 3.2 — Pass toggleWatched to MovieCard

In your `.map()` inside `App.jsx`, pass `toggleWatched` as a prop to each `MovieCard`:

```jsx
{movies.map((movie) => (
  <MovieCard
    key={movie.id}
    movie={movie}
    onToggle={toggleWatched}
  />
))}
```

---

### Step 3.3 — Add a button to MovieCard

Open `MovieCard.jsx`. Update the component to receive the `onToggle` prop and add a button:

```jsx
export default function MovieCard({ movie, onToggle }) {

  let status = 'Not watched yet'
  if (movie.watched === true) {
    status = 'Watched'
  }

  let buttonLabel = 'Mark as Watched'
  if (movie.watched === true) {
    buttonLabel = 'Mark as Unwatched'
  }

  return (
    <div>
      <p>{movie.title}</p>
      <p>{movie.genre} — {movie.year}</p>
      <p>{status}</p>
      <button onClick={() => onToggle(movie.id)}>
        {buttonLabel}
      </button>
    </div>
  )
}
```

Save both files. Click a button on any movie. The status text and button label should both change immediately.

> **Common mistake:** Do not write `onClick={onToggle(movie.id)}`. That runs the function immediately when the page loads. Write `onClick={() => onToggle(movie.id)}` — this tells React to run the function only when the button is clicked.

---

**Checkpoint 3:** Each movie has a button. Clicking it toggles the watched status on that movie only. ✓

---

## Part 4 — Show the Stats

**New ideas in this part:** calculating values from state

At the top of your page, you will show three numbers: total movies, how many are watched, and how many are not.

Open `App.jsx`. Inside your `App` function, add these three lines **above the `return`**:

```jsx
const total = movies.length
const watched = movies.filter((m) => m.watched === true).length
const notWatched = total - watched
```

Then add a paragraph inside your `return` to display them:

```jsx
<p>Total: {total} | Watched: {watched} | Still to watch: {notWatched}</p>
```

Save the file. The three numbers should appear. Click a toggle button — the watched and not-watched counts should update automatically.

> These numbers do not need their own state. They are calculated directly from `movies`. Every time `movies` changes, React re-runs `App` and recalculates them.

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

- [ ] Right now `status` and `buttonLabel` each use an `if` statement. Try rewriting them as a single line using a ternary: `condition ? valueIfTrue : valueIfFalse`.
- [ ] Add a `removeMovie(id)` function in `App` that removes a movie from the list. Pass it to `MovieCard` as a prop and add a Remove button.
- [ ] Add a button at the top that, when clicked, hides all unwatched movies. Click it again to show all movies.
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
