import "./MovieCard.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function MovieCard({ movie }) {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);

  const openMedia = () => {
    navigate(`/media/${movie.id}`);
  };

  const playMedia = (e) => {
    e.stopPropagation();
    navigate(`/watch/${movie.id}`);
  };

  return (
    <article
      className="movie-card"
      onClick={openMedia}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") openMedia();
      }}
    >
      <div className="movie-image-container">
        {!imageLoaded && <div className="movie-image-loader"></div>}

        <img
          src={movie.poster}
          alt={movie.title}
          className={`movie-poster ${imageLoaded ? "loaded" : ""}`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            e.target.src = "/src/assets/hero.png";
            setImageLoaded(true);
          }}
        />

        <div className="movie-gradient"></div>

        <span className="movie-type">
          {movie.type}
        </span>

        <span className="movie-rating">
          ⭐ {movie.rating}
        </span>

        <div className="movie-overlay">

          <h3>{movie.title}</h3>

          <div className="movie-meta">

            <span>{movie.year}</span>

            <span>{movie.genre}</span>

            <span>{movie.duration}</span>

          </div>

          <p className="movie-description">
            {movie.description.length > 110
              ? `${movie.description.substring(0, 110)}...`
              : movie.description}
          </p>

          <div className="movie-actions">

            <button
              className="watch-button"
              onClick={playMedia}
            >
              ▶ Watch
            </button>

            <button
              className="details-button"
              onClick={(e) => {
                e.stopPropagation();
                openMedia();
              }}
            >
              Details
            </button>

          </div>

        </div>

      </div>
    </article>
  );
}

export default MovieCard;