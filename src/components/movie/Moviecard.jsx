import "./MovieCard.css";

function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <img
        src={movie.image}
        alt={movie.title}
        className="movie-poster"
      />

      <div className="movie-overlay">
        <h3>{movie.title}</h3>

        <span className="rating">
          ⭐ {movie.rating}
        </span>

        <p>{movie.year}</p>
      </div>
    </div>
  );
}

export default MovieCard;