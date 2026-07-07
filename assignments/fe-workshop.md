# Frontend Review Workshop — Movie App (TMDB)

Week 6 · Client-Side Routing Review

In this workshop we build a full movie app with React and Vite. We start small and add one thing at a time. By the end you will have a real app that searches movies, shows them in a grid, opens a detail page, and saves favorites.

**We follow the instructor step by step. Same steps, but the instructor uses a different API. That is okay. The ideas are the same.**

---

## What You Will Build

- A home page with a grid of movie cards
- A search bar to find movies
- A detail page for one movie (click a card to open it)
- A favorites list saved with React Context
- Loading and error messages while data is fetched

---

## What You Will Practice

- Components, props, and JSX
- `useState` and `useEffect`
- Fetching data with `async`/`await`
- The three states of a request: loading, error, success
- Lists with `.map()` and `key`
- React Router: `Routes`, `Route`, `Link`, `useParams`, `useNavigate`
- React Context for shared state
- A custom hook to reuse fetch logic
- Controlled inputs and forms

---

# Setup

## 1. Create the Project

Open your terminal. Run these commands one at a time.

```bash
npm create vite@latest movie-app
```

When it asks:
- Framework: **React**
- Variant: **JavaScript**

Then:

```bash
cd movie-app
npm install
```

## 2. Add React Router

```bash
npm install react-router-dom
```

## 3. Add Your API Key

Get a free API key from https://www.themoviedb.org (Settings → API).

Create a file called `.env` in the root of your project (same level as `package.json`).

```
VITE_TMDB_KEY=your_key_here
```

**Important rules:**
- The name must start with `VITE_`. Vite only shares variables that start with `VITE_`.
- You read it in code with `import.meta.env.VITE_TMDB_KEY`. Not `process.env`.

## 4. Protect Your Key

Open `.gitignore`. Make sure this line is there:

```
.env
```

This stops your key from going to GitHub.

> Note: In a frontend-only app, the key is still visible in the browser Network tab. Anyone can see it. This is fine for learning. In a real app, you hide the key behind your own backend server. We will talk about this later.

## 5. Clean Up

- Delete everything inside `src/App.css`.
- Delete everything inside `src/index.css`. Paste this starter:

```css
:root {
  --bg: #0f0f0f;
  --card: #1a1a1a;
  --text: #ffffff;
  --muted: #9ca3af;
  --accent: #e50914;
  --space: 16px;
  --radius: 8px;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background: #0f0f0f;
  color: var(--text);
  font-family: system-ui, sans-serif;
  line-height: 1.5;
}

a {
  color: inherit;
  text-decoration: none;
}
```

## 6. Start the Server

```bash
npm run dev
```

Open the link it shows (usually `http://localhost:5173`).

---

# The API

We will use three endpoints. The instructor will use different ones, but the shape is the same.

**Popular movies (the home grid):**
```
https://api.themoviedb.org/3/movie/popular?api_key=YOUR_KEY
```

**Search movies:**
```
https://api.themoviedb.org/3/search/movie?api_key=YOUR_KEY&query=batman
```

**One movie by id (the detail page):**
```
https://api.themoviedb.org/3/movie/550?api_key=YOUR_KEY
```

The response has a `results` array for lists. Each movie has `id`, `title`, `poster_path`, `vote_average`, `release_date`, and `overview`.

Images need a base URL in front of `poster_path`:
```
https://image.tmdb.org/t/p/w500/POSTER_PATH
```

---

# Phase 1 — Show One Card (Components + Props + JSX)

**Goal:** Render a single movie card using fake data. No API yet.

We start with fake data on purpose. First we learn the shape. Then we connect the real API.

### Steps

1. In `src`, create a folder called `components`.
2. Inside it, create `MovieCard.jsx`.

```jsx
function MovieCard({ movie }) {
  return (
    <div className="card">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <h3>{movie.title}</h3>
      <p>⭐ {movie.vote_average}</p>
    </div>
  );
}

export default MovieCard;
```

3. Open `App.jsx`. Replace everything with:

```jsx
import MovieCard from "./components/MovieCard";

const fakeMovie = {
  id: 550,
  title: "Fight Club",
  poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
  vote_average: 8.4,
};

function App() {
  return (
    <div>
      <h1>Movie App</h1>
      <MovieCard movie={fakeMovie} />
    </div>
  );
}

export default App;
```

### ✅ Done when
You see one movie card with an image, a title, and a rating.

### Key ideas
- A **component** is a function that returns JSX.
- **Props** are how a parent passes data to a child (`movie={fakeMovie}`).
- We read props inside `{ }`.

### Try more (if you finish early)
- Add the release year under the rating.

---

# Phase 2 — Show a Grid (Lists + `.map()` + `key`)

**Goal:** Show many cards from an array of fake movies.

### Steps

1. In `App.jsx`, change the fake data to an array:

```jsx
const fakeMovies = [
  { id: 1, title: "Movie One", poster_path: "/abc.jpg", vote_average: 7.1 },
  { id: 2, title: "Movie Two", poster_path: "/def.jpg", vote_average: 8.2 },
  { id: 3, title: "Movie Three", poster_path: "/ghi.jpg", vote_average: 6.5 },
];
```

2. Render the list with `.map()`:

```jsx
function App() {
  return (
    <div>
      <h1>Movie App</h1>
      <div className="grid">
        {fakeMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
```

3. Add grid styles to `index.css`:

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: var(--space);
  padding: var(--space);
}

.card {
  background: var(--card);
  border-radius: var(--radius);
  overflow: hidden;
}

.card img {
  width: 100%;
  display: block;
}

.card h3 {
  font-size: 15px;
  padding: 8px;
}

.card p {
  color: var(--muted);
  padding: 0 8px 8px;
}
```

### ✅ Done when
You see three cards in a responsive grid. (Images may be broken — that is fine, the data is fake.)

### Key ideas
- `.map()` turns an array of data into an array of JSX.
- **`key`** must be unique. React uses it to track each item. Use the id, not the index.

### Try more
- Add a hover effect: when you hover a card, lift it up with `transform: translateY(-4px)` and a `transition`.

---

# Phase 3 — Fetch Real Movies (`useState` + `useEffect` + async)

**Goal:** Replace fake data with real movies from the API.

This is the big step. Watch how the component does not change much. Only where the data comes from changes.

### Steps

1. In `App.jsx`, import the hooks:

```jsx
import { useState, useEffect } from "react";
import MovieCard from "./components/MovieCard";
```

2. Replace the component:

```jsx
function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const key = import.meta.env.VITE_TMDB_KEY;
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${key}`;

    async function loadMovies() {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to load movies");
        const data = await res.json();
        setMovies(data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, []);

  if (loading) return <p style={{ padding: 16 }}>Loading...</p>;
  if (error) return <p style={{ padding: 16 }}>Error: {error}</p>;

  return (
    <div>
      <h1 style={{ padding: 16 }}>Popular Movies</h1>
      <div className="grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
```

### ✅ Done when
Real popular movies appear in the grid with real posters.

### Key ideas
- **`useState`** holds data that can change. When it changes, the component re-renders.
- **`useEffect`** runs code after the component shows. The `[]` at the end means "run once."
- We keep **three states**: `loading`, `error`, and the data (`movies`).
- The function inside `useEffect` cannot be `async` itself. So we make an inner `async` function and call it.
- `try` / `catch` / `finally`: try the request, catch the error, finally stop loading no matter what.

### Try more
- Log `data` to the console before `setMovies`. Look at the shape.

---

# Phase 4 — Add Search (Controlled Input + Forms)

**Goal:** Type a movie name, press search, see results.

### Steps

1. Add state for the search text and a "query" that triggers the fetch:

```jsx
const [search, setSearch] = useState("");
const [query, setQuery] = useState("");
```

2. Change the `useEffect` to depend on `query`:

```jsx
useEffect(() => {
  const key = import.meta.env.VITE_TMDB_KEY;

  const url = query
    ? `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${query}`
    : `https://api.themoviedb.org/3/movie/popular?api_key=${key}`;

  async function loadMovies() {
    setLoading(true);
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to load movies");
      const data = await res.json();
      setMovies(data.results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  loadMovies();
}, [query]);
```

3. Add a search form above the grid:

```jsx
function handleSubmit(e) {
  e.preventDefault();
  setQuery(search);
}
```

```jsx
<form onSubmit={handleSubmit} style={{ padding: 16, display: "flex", gap: 8 }}>
  <input
    type="text"
    placeholder="Search movies..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    style={{ padding: 8, flex: 1 }}
  />
  <button type="submit" style={{ padding: "8px 16px" }}>Search</button>
</form>
```

### ✅ Done when
You type a movie name, click Search, and matching movies appear. Empty search shows popular movies again.

### Key ideas
- A **controlled input**: the input's `value` comes from state. `onChange` updates the state. React controls the input, not the browser.
- **`preventDefault()`** stops the form from reloading the page.
- When `query` changes, `useEffect` runs again. This is the dependency array doing its job.

### Try more
- Show a message when there are no results.

---

# Phase 5 — Add Routing (Routes + Link + useParams)

**Goal:** Click a card to open a detail page at its own URL.

Now we split into pages. The home page has the grid. A detail page shows one movie.

### Steps

1. Open `main.jsx`. Wrap the app in `BrowserRouter`:

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
```

2. Make two pages. Create a `pages` folder in `src`.

Move the home logic into `pages/Home.jsx`. (Take the grid, search, and fetch from `App.jsx` and put them here. Rename the function to `Home`.)

3. Create `pages/MovieDetail.jsx`:

```jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const key = import.meta.env.VITE_TMDB_KEY;
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${key}`;

    async function loadMovie() {
      const res = await fetch(url);
      const data = await res.json();
      setMovie(data);
      setLoading(false);
    }

    loadMovie();
  }, [id]);

  if (loading) return <p style={{ padding: 16 }}>Loading...</p>;

  return (
    <div style={{ padding: 16 }}>
      <button onClick={() => navigate("/")}>← Back</button>
      <h1>{movie.title}</h1>
      <p>⭐ {movie.vote_average} · {movie.release_date}</p>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        style={{ borderRadius: 8, marginTop: 12, maxWidth: 300 }}
      />
      <p style={{ marginTop: 12 }}>{movie.overview}</p>
    </div>
  );
}

export default MovieDetail;
```

4. Now `App.jsx` only handles routes:

```jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:id" element={<MovieDetail />} />
      <Route path="*" element={<h1 style={{ padding: 16 }}>Page Not Found</h1>} />
    </Routes>
  );
}

export default App;
```

5. Make each card a link. Open `MovieCard.jsx`:

```jsx
import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.id}`} className="card">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <h3>{movie.title}</h3>
      <p>⭐ {movie.vote_average}</p>
    </Link>
  );
}

export default MovieCard;
```

### ✅ Done when
You click a card, the URL changes to `/movie/550`, and you see the detail page. The Back button returns you home. A bad URL shows "Page Not Found."

### Key ideas
- **`Routes` / `Route`**: match a URL to a component.
- **`Link`** changes the page without reloading. A plain `<a>` would reload everything.
- **`useParams`** reads the `:id` from the URL. Note: `id` is always a **string**.
- **`useNavigate`** moves the user in code (after a click, a submit, etc.).
- **`path="*"`** is the catch-all. It must be **last**. Route order matters.

### Try more
- If you refresh on `/movie/550` in a real deployed app, it can break. Ask the instructor why. (Hint: the server does not know that route.)

---

# Phase 6 — Favorites with Context (Shared State)

**Goal:** Add a favorite button. Show a favorites count in a navbar on every page.

Why Context? The navbar and the cards are far apart. Passing props through many levels is painful. Context lets any component read shared state directly.

### Steps

1. Create `src/context/FavoritesContext.jsx`:

```jsx
import { createContext, useContext, useState } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  function toggleFavorite(movie) {
    setFavorites((prev) => {
      const exists = prev.find((m) => m.id === movie.id);
      if (exists) {
        return prev.filter((m) => m.id !== movie.id);
      }
      return [...prev, movie];
    });
  }

  function isFavorite(id) {
    return favorites.some((m) => m.id === id);
  }

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
```

2. Wrap the app in the provider. Open `main.jsx`:

```jsx
import { FavoritesProvider } from "./context/FavoritesContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </BrowserRouter>
  </StrictMode>
);
```

3. Create a `components/Navbar.jsx`:

```jsx
import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

function Navbar() {
  const { favorites } = useFavorites();

  return (
    <nav style={{ display: "flex", justifyContent: "space-between", padding: 16 }}>
      <Link to="/"><strong>🎬 Movie App</strong></Link>
      <span>❤️ {favorites.length}</span>
    </nav>
  );
}

export default Navbar;
```

4. Show the navbar on every page. In `App.jsx`, add it above `Routes`:

```jsx
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* ...routes stay the same... */}
      </Routes>
    </>
  );
}
```

5. Add a favorite button on the card. Open `MovieCard.jsx`:

```jsx
import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

function MovieCard({ movie }) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorited = isFavorite(movie.id);

  function handleFavorite(e) {
    e.preventDefault(); // stop the Link from navigating
    toggleFavorite(movie);
  }

  return (
    <Link to={`/movie/${movie.id}`} className="card">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <h3>{movie.title}</h3>
      <p>⭐ {movie.vote_average}</p>
      <button onClick={handleFavorite} style={{ margin: 8 }}>
        {favorited ? "❤️ Saved" : "🤍 Save"}
      </button>
    </Link>
  );
}

export default MovieCard;
```

### ✅ Done when
You click Save on a card. The heart fills. The count in the navbar goes up. Click again to remove it. The count works on every page.

### Key ideas
- **Context** shares state without passing props through every level.
- **`createContext`** makes it. **`Provider`** gives the value. **`useContext`** reads it.
- We wrap the read in our own hook `useFavorites()` so it is clean to use.
- We update state **immutably**: `[...prev, movie]` to add, `.filter()` to remove. We never push into the old array.
- `e.preventDefault()` on the button stops the card's `Link` from opening.

### Try more
- Make a `/favorites` page that shows only saved movies. Add a link to it in the navbar.

---

# Phase 7 — Custom Hook (Clean Up the Fetch)

**Goal:** Move the fetch logic out of `Home` into a reusable hook.

Right now the fetch code lives inside the page. If another page needs movies too, we would copy it. A custom hook fixes that.

### Steps

1. Create `src/hooks/useMovies.js`:

```jsx
import { useState, useEffect } from "react";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const key = import.meta.env.VITE_TMDB_KEY;

    const url = query
      ? `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${query}`
      : `https://api.themoviedb.org/3/movie/popular?api_key=${key}`;

    async function loadMovies() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to load movies");
        const data = await res.json();
        setMovies(data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, [query]);

  return { movies, loading, error };
}
```

2. Use it in `Home.jsx`. The page gets much shorter:

```jsx
import { useState } from "react";
import { useMovies } from "../hooks/useMovies";
import MovieCard from "../components/MovieCard";

function Home() {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const { movies, loading, error } = useMovies(query);

  function handleSubmit(e) {
    e.preventDefault();
    setQuery(search);
  }

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ padding: 16, display: "flex", gap: 8 }}>
        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: 8, flex: 1 }}
        />
        <button type="submit" style={{ padding: "8px 16px" }}>Search</button>
      </form>

      {loading && <p style={{ padding: 16 }}>Loading...</p>}
      {error && <p style={{ padding: 16 }}>Error: {error}</p>}

      <div className="grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Home;
```

### ✅ Done when
The app works exactly the same as before. But the fetch logic now lives in one reusable hook.

### Key ideas
- A **custom hook** is just a function that starts with `use` and uses other hooks inside.
- It lets you reuse logic across components without copy-paste.
- The page is now about **showing UI**. The hook is about **getting data**. Each part has one job.

### Try more
- Notice the `useMovies` hook could be used by any page. This is the power of custom hooks.

---

# You Did It 🎉

You built a full React app with:

- Components and props
- `useState`, `useEffect`, and a custom hook
- Real data fetching with loading and error states
- Search with a controlled form
- Routing with a home page and a detail page
- Shared state with Context (favorites)

This is the same shape as a real production app. Every capstone you build will use these same pieces.

---

## Quick Reference

| Concept | Where we used it |
|---|---|
| Component + props | `MovieCard` |
| `.map()` + `key` | The grid |
| `useState` | movies, loading, error, search |
| `useEffect` + `[]` | fetch on load |
| `useEffect` + `[query]` | fetch on search |
| async / try / catch / finally | every fetch |
| controlled input | search bar |
| `Routes` / `Route` | `App.jsx` |
| `Link` | `MovieCard`, `Navbar` |
| `useParams` | `MovieDetail` |
| `useNavigate` | Back button |
| catch-all `*` route | 404 page |
| Context | favorites |
| custom hook | `useMovies` |

---

## If You Want To Go Deeper (Later)

These are not required today. Explore them when you are ready.

- **`useSearchParams`** — put the search text in the URL so it can be shared.
- **Debouncing** — search as you type, without a button, without spamming the API.
- **`Outlet` and nested layouts** — share a navbar layout across routes the router way.
- **Protected routes** — block pages behind login with `<Navigate />`.
- **axios** — a library that makes fetch shorter and parses JSON for you.
- **Connect to your own Express backend** — instead of a public API, call your own server. Two servers, two ports, and CORS.