import { useState } from 'react'
import './App.css'
import MovieCard from './MovieCard'

const initialMovies = [
  { id: 1, title: "The Matrix",                         genre: "Sci-Fi",    year: 1999, watched: false },
  { id: 2, title: "Parasite",                           genre: "Thriller",  year: 2019, watched: false },
  { id: 3, title: "Everything Everywhere All at Once",  genre: "Sci-Fi",    year: 2022, watched: true  },
  { id: 4, title: "Knives Out",                         genre: "Mystery",   year: 2019, watched: false },
  { id: 5, title: "Coco",                               genre: "Animation", year: 2017, watched: true  },
  { id: 6, title: "Get Out",                            genre: "Horror",    year: 2017, watched: false },
]

function hello() {
  console.log('hello')
}


export default function App() {
  const [allMovies, setAllMovies] = useState(initialMovies)

  const total = allMovies.length // total movies
  const numWatchedMovies = allMovies.filter((mov) => mov.watched).length
  const numNotWatched = total - numWatchedMovies

  const toggleWatched = (id) => {
    console.log(id)

    const updateArry = allMovies.map((item) => {
      if (item.id === id) {
        return { ...item, watched: !item.watched }
      }

      return item
    })

    setAllMovies(updateArry)
  }

  return (
    <div>
      <h1>Movie Night</h1>

      <h2>
        total: {total} -- watched: {numWatchedMovies} -- unwatched: {numNotWatched}
      </h2>

      {
        allMovies.map(function(item) {
          return (
            <MovieCard key={item.id} mov={item} onToggle={toggleWatched} />
          )
        })
      }
    </div>
  )
}