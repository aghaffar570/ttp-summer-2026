export default function MovieCard (props) {

  let movieStatus = ''
  if (props.mov.watched) {
    movieStatus = 'watched'
  } else {
    movieStatus = 'unwatched'
  }

  let buttonLabel = props.mov.watched ? 'Mark as Unwatched' : 'Mark as Watched'

  // ternary
  // let movieStatus = props.mov.watched ? 'watched' : 'unwatched'

  return (
    <div>
      {props.mov.title} - {props.mov.genre} - {props.mov.year}
      <p>status: {movieStatus}</p>
      <button onClick={(event) => {

        props.onToggle(props.mov.id)

      }}>
        {buttonLabel}
        </button>

      <br />
      <br />
    </div>
  )
}