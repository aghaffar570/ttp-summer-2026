# Assignment 05: React I — Movie Night Watchlist

## Goal

Build a multi-component React app that lets users manage a personal movie watchlist — practicing components, state, props, list rendering, and passing functions between components.

## Objectives

You will practice:

- Scaffolding a React app with Vite.
- Breaking a UI into focused, reusable components.
- Managing state with `useState`.
- Passing data from parent to child via props.
- Passing functions as props so children can update parent state.
- Rendering lists with `.map()` and unique `key` props.
- Conditionally rendering JSX.

## Problem

Build a **Movie Night Watchlist** — a React app where users can track movies they want to watch and mark them as watched once they've seen them.

Scaffold the project with Vite:

```bash
npm create vite@latest movie-night -- --template react
cd movie-night
npm install
npm run dev
```

Delete the contents of `App.jsx` and `App.css`. You'll write everything from scratch.

## Starter Data

Add this array to `App.jsx` as your initial state value:

```js
const initialMovies = [
  { id: 1, title: "The Matrix", genre: "Sci-Fi", year: 1999, watched: false },
  { id: 2, title: "Parasite", genre: "Thriller", year: 2019, watched: false },
  { id: 3, title: "Everything Everywhere All at Once", genre: "Sci-Fi", year: 2022, watched: true },
  { id: 4, title: "Knives Out", genre: "Mystery", year: 2019, watched: false },
  { id: 5, title: "Coco", genre: "Animation", year: 2017, watched: true },
  { id: 6, title: "Get Out", genre: "Horror", year: 2017, watched: false },
];
```

## Assignment Tasks

Complete each part in order. Each part builds on the last.

### Part 1: App Component + Initial Render

- [ ] Import `useState` and initialize `movies` state using `initialMovies`.
- [ ] Return a `<div>` with a heading (`<h1>Movie Night 🎬</h1>`).
- [ ] Below the heading, display a count: `"X movies in your list"` using the movies state length.
- [ ] Verify the page loads without errors.

### Part 2: MovieList Component

Create `src/components/MovieList.jsx`.

- [ ] `MovieList` receives a `movies` prop (an array).
- [ ] It returns a `<ul>` containing one `<li>` per movie using `.map()`.
- [ ] Each `<li>` displays the movie's `title`, `genre`, and `year`.
- [ ] Give each `<li>` a `key` prop using the movie's `id`.
- [ ] Import and render `<MovieList movies={movies} />` inside `App`.

### Part 3: MovieCard Component

Create `src/components/MovieCard.jsx`.

- [ ] `MovieList` should render a `<MovieCard />` for each movie instead of a plain `<li>`.
- [ ] `MovieCard` receives a single `movie` prop (one object).
- [ ] It displays the movie's `title`, `genre`, and `year`.
- [ ] It conditionally renders either a `"✅ Watched"` or `"🎬 Unwatched"` badge based on `movie.watched`.
- [ ] Apply a CSS class of `"watched"` to the card's root element when `movie.watched` is `true` — style it however you like.

### Part 4: Toggle Watched

- [ ] In `App`, write a function `toggleWatched(id)` that updates the `movies` state — flipping `watched` from `false` to `true` or vice versa for the movie with the matching `id`. Do not mutate the original array.
- [ ] Pass `toggleWatched` down through `MovieList` to `MovieCard` as a prop.
- [ ] In `MovieCard`, add a button labeled `"Mark as Watched"` or `"Mark as Unwatched"` (based on current state) that calls the function when clicked.
- [ ] Verify clicking the button changes the badge and button text immediately.

### Part 5: Stats Bar

Create `src/components/StatsBar.jsx`.

- [ ] Receives `movies` as a prop.
- [ ] Displays:
  - Total movies in the list.
  - Number watched.
  - Number still to watch.
- [ ] Render `<StatsBar movies={movies} />` in `App`, above the movie list.

### Part 6: Genre Filter

- [ ] In `App`, add a `selectedGenre` state variable initialized to `"All"`.
- [ ] Compute a `genres` array by extracting all unique genres from `movies` (include `"All"` as the first option).
- [ ] Render a `<select>` dropdown populated with those genre options.
- [ ] Filter the movies passed to `<MovieList>` based on `selectedGenre`.
- [ ] When `"All"` is selected, show every movie.

## Common Gotchas

- Component names must be **capitalized** (`MovieCard`, not `movieCard`). Lowercase names are treated as HTML elements by React.
- Every element in a `.map()` call needs a `key` prop — and it must be on the **outermost** element returned.
- Never mutate state directly. `movies[0].watched = true` won't trigger a re-render. Use `setMovies(...)` with a new array.
- Passing a function as a prop means passing the **reference**, not calling it: `toggleWatched={toggleWatched}`, not `toggleWatched={toggleWatched(id)}`.
- JSX `{}` accepts **expressions** only — you can't write an `if` statement inside `{}`. Use a ternary or `&&` instead.
- `props` is an object — destructure it or access with `props.movieName`.

## Industry Standards

- One component per file is the standard in every professional React codebase.
- State lives at the **lowest common ancestor** — put it as deep as it can go while still being accessible to every component that needs it.
- Prefer `const` for state updater functions defined inside the component.
- Name event handler props with `on` prefix (`onToggle`, `onDelete`) and the handler function with `handle` (`handleToggle`, `handleDelete`).
- Avoid index as `key` when the list can be reordered or filtered — use a stable id.

## Stretch Challenges

If you finish early:

- [ ] Add a `removeMovie(id)` function and a delete button on each card.
- [ ] Add a `"Watched Only"` toggle button that shows only watched movies.
- [ ] Add a `rating` field (1–5 stars) to each movie and let users update it with a `<select>`.
- [ ] Sort the movie list alphabetically or by year using a `<select>`.
- [ ] Persist the movies list to `localStorage` so it survives a page refresh.

## Finished Checklist

Before submitting, verify:

- [ ] The app loads without console errors.
- [ ] All six starter movies appear.
- [ ] Clicking "Mark as Watched" toggles the badge and button label correctly.
- [ ] The genre filter shows only matching movies.
- [ ] The stats bar updates when watched status changes.
- [ ] Components are in separate files under `src/components/`.
- [ ] Your work has been committed and pushed to GitHub.
