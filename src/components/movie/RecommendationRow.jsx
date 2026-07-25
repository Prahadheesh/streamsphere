import MovieCard from "./MovieCard";
import media from "../../data/media";
import "./MovieRow.css";

function RecommendationRow({ currentMovie }) {
  const recommendations = media
    .filter(
      (movie) =>
        movie.id !== currentMovie.id &&
        (movie.genre === currentMovie.genre ||
          movie.category === currentMovie.category)
    )
    .slice(0, 6);

  if (recommendations.length === 0) return null;

  return (
    <section className="movie-row">
      <h2>🎬 More Like This</h2>

      <div className="movie-list">
        {recommendations.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}

export default RecommendationRow;