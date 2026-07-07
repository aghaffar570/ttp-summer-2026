# Frontend Review Workshop — Movie App (TMDB)

We build a movie app with React and Vite, one small step at a time.

By the end you have a real app: a grid of movies, a detail page, and a favorites list.

> Code is hidden in **Show the code** toggles. Try the step from the plain-English instructions first. Open the toggle if you get stuck or want to check your work.

---

## What You Will Build

- A home page with a grid of movie cards
- A detail page for one movie (click a card to open it)
- A favorites list you can add to and remove from
- Loading and error messages while data loads

## What You Will Practice

- Components, props, and JSX
- `useState` and `useEffect`
- Fetching data with `async` / `await`
- The three states of a request: loading, error, success
- Lists with `.map()` and `key`
- React Router: `Routes`, `Route`, `Link`, `useParams`, `useNavigate`
- Sharing state with props (prop drilling)

---

# Setup

Run these in your terminal, one at a time.

```bash
npm create vite@latest movie-app
```

When it asks: Framework → **React**, Variant → **JavaScript**, linter → ESLint.

```bash
cd movie-app
npm install
npm install react-router
```

**Get an API key** from https://www.themoviedb.org (Settings → API).

You will need to create an account. In the settings, you will need to `subscribe` to the `Free Developer Plan`. Use any URL for the domain, and a simple text for the reason. Once you have your API KEY, you are ready.

Make a file called `.env` in the project root (next to `package.json`):

```
VITE_TMDB_KEY=your_key_here
```

- The name must start with `VITE_`. Vite only shares names that start with `VITE_`.
- Read it in code with `import.meta.env.VITE_TMDB_KEY`.

Open `.gitignore` and make sure `.env` is listed. This keeps your key off GitHub.

> Note: the key is still visible in the browser Network tab. That is fine for learning. In a real app you hide it behind your own backend. More on that later.

**Clean up the starter styles.** Empty out `src/App.css`. Replace `src/index.css` with the starter below. Then run `npm run dev` and open the link.

<details>
<summary>Show the code — index.css</summary>

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
  background: var(--bg);
  color: var(--text);
  font-family: system-ui, sans-serif;
  line-height: 1.5;
}

a {
  color: inherit;
  text-decoration: none;
}
```

</details>

---

# The API

Two endpoints for today. Swap in your own API's endpoints if you are following along with a different one.

**Popular movies (the home grid):**
```
https://api.themoviedb.org/3/movie/popular?api_key=YOUR_KEY
```

**One movie by id (the detail page):**
```
https://api.themoviedb.org/3/movie/550?api_key=YOUR_KEY
```

Lists come back in a `results` array. Each movie has `id`, `title`, `poster_path`, `vote_average`, `release_date`, and `overview`. Put this in front of `poster_path` to get the image:
```
https://image.tmdb.org/t/p/w500/POSTER_PATH
```

---

# Phase 1 — Show One Card

**Goal:** Show a single movie card using fake data. No API yet. First we learn the shape, then we connect real data.

### Steps

1. In `src`, make a `components` folder.
2. Inside it, make `MovieCard.jsx`. It takes a `movie` prop and shows the poster, title, and rating.
3. In `App.jsx`, make one fake movie object and pass it to `<MovieCard />`.

<details>
<summary>Show the code</summary>

`src/components/MovieCard.jsx`
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

`src/App.jsx`
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

</details>

**✅ Done when:** you see one card with an image, a title, and a rating.

**Key ideas**
- A **component** is a function that returns JSX.
- **Props** pass data from a parent to a child (`movie={fakeMovie}`).
- Read props inside `{ }` with destructuring.

**Try more:** show the release year under the rating.

---

# Phase 2 — Show a Grid

**Goal:** Show many cards from an array.

### Steps

1. In `App.jsx`, change the fake movie into an **array** of fake movies.
2. Use `.map()` to turn the array into a list of `<MovieCard />`s. Give each one a `key`.
3. Wrap the list of fake movies in a `<div className="grid">` and add the grid styles to `index.css`.
4. Give the `.grid` class some styles

<details>
<summary>Show the code</summary>

`src/App.jsx`
```jsx
import MovieCard from "./components/MovieCard";

const fakeMovies = [
  { id: 1, title: "Movie One", poster_path: "/abc.jpg", vote_average: 7.1 },
  { id: 2, title: "Movie Two", poster_path: "/def.jpg", vote_average: 8.2 },
  { id: 3, title: "Movie Three", poster_path: "/ghi.jpg", vote_average: 6.5 },
];

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

export default App;
```

`src/index.css` (add to the bottom)
```css
.grid {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space);
  padding: var(--space);
}

.card {
  flex: 1 1 160px;
  max-width: 220px;
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

</details>

**✅ Done when:** you see three cards in a responsive grid. (Broken images are fine — the data is fake.)

**Key ideas**
- `.map()` turns an array of data into an array of JSX.
- **`key`** must be unique. Use the id, not the index.

**Try more:** add a hover effect that lifts the card with `transform: translateY(-4px)` and a `transition`.

---

# Phase 3 — Fetch Real Movies

**Goal:** Replace the fake array with real movies from the API. This is the big step. Notice the card does not change — only where the data comes from.

### Steps

1. In `App.jsx`, add three pieces of state: `movies`, `loading`, and `error`.
2. In a `useEffect` with `[]` (run once), fetch popular movies and store them.
3. Because the effect function can't be `async`, make an **inner** `async` function and call it.
4. Use `try` / `catch` / `finally` so errors are caught and loading always stops.
5. Show a loading message, then an error message, then the grid.

<details>
<summary>Show the code</summary>

`src/App.jsx`
```jsx
import { useState, useEffect } from "react";
import MovieCard from "./components/MovieCard";

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

export default App;
```

</details>

**✅ Done when:** real popular movies appear in the grid with real posters.

**Key ideas**
- **`useState`** holds data that can change. Changing it re-renders the component.
- **`useEffect`** runs after the component shows. `[]` means "run once."
  - And if you do provide a value in the `[]`, then the useEffect will re-run anytime that value changes.
- Keep **three states**: loading, error, and the data.
- The effect function can't be `async`, so we make an inner `async` function.
- `try` / `catch` / `finally`: try the request, catch the error, finally stop loading.

**Try more:** log `data` to the console before `setMovies` and look at its shape.

---

# Phase 4 — Add Routing and a Detail Page

**Goal:** Click a card to open a detail page at its own URL. We split the app into pages.

### Steps

1. In `main.jsx`, wrap `<App />` in `<BrowserRouter>`.
2. Make a `pages` folder. Move the home logic (state, fetch, grid) from `App.jsx` into `pages/Home.jsx` and rename the function `Home`.
3. Make `pages/MovieDetail.jsx`. Read the id with `useParams`, fetch that one movie, and show its details. Add a Back button with `useNavigate`.
4. In `App.jsx`, keep only the routes: `/` → `Home`, `/movie/:id` → `MovieDetail`, and a catch-all `*` → "Page Not Found" (listed **last**).
5. In `MovieCard.jsx`, wrap the card in a `<Link>` to `/movie/{id}`.

<details>
<summary>Show the code</summary>

`src/main.jsx`
```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
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

`src/pages/Home.jsx` (this is the movie-loading code moved out of App)
```jsx
import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";

function Home() {
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

export default Home;
```

`src/pages/MovieDetail.jsx`
```jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

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

`src/App.jsx` (now just routes)
```jsx
import { Routes, Route } from "react-router";
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

`src/components/MovieCard.jsx` (wrap in a Link)
```jsx
import { Link } from "react-router";

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

</details>

**✅ Done when:** clicking a card changes the URL to `/movie/550` and shows the detail page. Back returns home. A bad URL shows "Page Not Found."

**Key ideas**
- **`Routes` / `Route`** match a URL to a component.
- **`Link`** changes the page without reloading. A plain `<a>` reloads everything.
- **`useParams`** reads `:id` from the URL. The id is always a **string**.
- **`useNavigate`** moves the user in code (after a click, a submit, etc.).
- **`path="*"`** is the catch-all. It must be **last** — route order matters.

**Try more:** show a nicer "not found" message when the id doesn't match a real movie.

---

# Phase 5 — Favorites (Shared State with Props)

**Goal:** Add a Save button to each card and a favorites count in a navbar on every page.

The count (in the navbar) and the buttons (on the cards) are far apart, but they share the same list. So the list lives high up in `App.jsx`, and we pass it down as props. Passing props down through levels like this is called **prop drilling**.

### Steps

1. In `App.jsx`, add a `favorites` state array. 
    - Add `toggleFavorite(movie)`  this function adds the movie if it's not saved to favorites, remove it if it is (always make a **new** array)
    - Add `isFavorite(id)` - this function should tell you if the movie is currently favorited or not (boolean)
2. Make `components/Navbar.jsx`. Pass it the favorites **count** as a prop and show it. Put `<Navbar />` above `<Routes>`.
3. Pass `toggleFavorite` and `isFavorite` down: `App` → `Home` → `MovieCard`.
4. In `MovieCard.jsx`, add a Save button. Use `e.preventDefault()` so clicking it does not open the card's `Link`.

<details>
<summary>Show the code</summary>

`src/App.jsx`
```jsx
import { useState } from "react";
import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";

function App() {
  const [favorites, setFavorites] = useState([]);

  function toggleFavorite(movie) {
    setFavorites((prev) => {
      const exists = prev.find((m) => m.id === movie.id);
      if (exists) return prev.filter((m) => m.id !== movie.id);
      return [...prev, movie];
    });
  }

  function isFavorite(id) {
    return favorites.some((m) => m.id === id);
  }

  return (
    <>
      <Navbar favoritesCount={favorites.length} />
      <Routes>
        <Route
          path="/"
          element={<Home toggleFavorite={toggleFavorite} isFavorite={isFavorite} />}
        />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="*" element={<h1 style={{ padding: 16 }}>Page Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
```

`src/components/Navbar.jsx`
```jsx
import { Link } from "react-router";

function Navbar({ favoritesCount }) {
  return (
    <nav style={{ display: "flex", justifyContent: "space-between", padding: 16 }}>
      <Link to="/"><strong>🎬 Movie App</strong></Link>
      <span>❤️ {favoritesCount}</span>
    </nav>
  );
}

export default Navbar;
```

`src/pages/Home.jsx` (receive the props, pass them to each card)
```jsx
function Home({ toggleFavorite, isFavorite }) {
  // ...all the movie-loading code stays the same...

  return (
    <div>
      <h1 style={{ padding: 16 }}>Popular Movies</h1>
      <div className="grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            toggleFavorite={toggleFavorite}
            isFavorite={isFavorite}
          />
        ))}
      </div>
    </div>
  );
}
```

`src/components/MovieCard.jsx`
```jsx
import { Link } from "react-router";

function MovieCard({ movie, toggleFavorite, isFavorite }) {
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

</details>

**✅ Done when:** clicking Save fills the heart and bumps the navbar count. Clicking again removes it. The count is correct on every page.

**Key ideas**
- State that is **shared** lives in the closest common parent, then flows down as props (**prop drilling**).
- Update state **immutably**: `[...prev, movie]` to add, `.filter()` to remove. Never push into the old array.
- `e.preventDefault()` on the button stops the card's `Link` from opening.
- Refreshing the page clears the favorites — they only live in memory. **Week 7's database is what makes them stick.**

**Try more:** make a `/favorites` page that shows only saved movies, and add a link to it in the navbar.

---

# You Did It 🎉

You built a real React app with:

- Components and props
- `useState` and `useEffect`
- Real data fetching with loading and error states
- Routing with a home page and a detail page
- Shared state passed down with props (favorites)

Same shape as a real production app. Your capstones will use these same pieces.

## Quick Reference

| Concept | Where we used it |
|---|---|
| Component + props | `MovieCard` |
| `.map()` + `key` | The grid |
| `useState` | movies, loading, error, favorites |
| `useEffect` + `[]` | fetch on load |
| async / try / catch / finally | every fetch |
| `Routes` / `Route` | `App.jsx` |
| `Link` | `MovieCard`, `Navbar` |
| `useParams` | `MovieDetail` |
| `useNavigate` | Back button |
| catch-all `*` route | 404 page |
| prop drilling | favorites |

---

## Stretch Challenges (if you finish early)

- **Search.** Add a search box that finds movies by name. The search endpoint is `https://api.themoviedb.org/3/search/movie?api_key=YOUR_KEY&query=batman`. Use a controlled input and only fetch when the user submits. Empty search goes back to popular.
- **Favorites page.** A `/favorites` route that shows only saved movies.
- **No-results message.** Show friendly text when a list comes back empty.
- **Polish.** Card hover effects, a nicer detail layout, a loading spinner.

## Going Deeper (Later)

Not required today. Explore when you are ready.

- **`useSearchParams`** — put the search text in the URL so it can be shared.
- **`Outlet` and nested layouts** — share a navbar layout across routes the router way.
- **React Context** — share state without passing props through every level (the cleaner version of what we did by hand).
- **Connect to your own Express backend** — call your own server instead of a public API. Two servers, two ports, and CORS.
