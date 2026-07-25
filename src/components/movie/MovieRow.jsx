import "./MovieRow.css";
import MovieCard from "./MovieCard";
import { useEffect, useRef, useState } from "react";

function MovieRow({ title, movies }) {
  const rowRef = useRef(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateButtons = () => {
    if (!rowRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
  };

  const scrollLeftHandler = () => {
    rowRef.current.scrollBy({
      left: -800,
      behavior: "smooth",
    });
  };

  const scrollRightHandler = () => {
    rowRef.current.scrollBy({
      left: 800,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    updateButtons();

    const row = rowRef.current;

    row.addEventListener("scroll", updateButtons);
    window.addEventListener("resize", updateButtons);

    return () => {
      row.removeEventListener("scroll", updateButtons);
      window.removeEventListener("resize", updateButtons);
    };
  }, []);

  return (
    <section className="movie-row">

      <div className="row-header">

        <h2>{title}</h2>

        <div className="row-buttons">

          <button
            onClick={scrollLeftHandler}
            disabled={!canScrollLeft}
            aria-label="Scroll Left"
          >
            ❮
          </button>

          <button
            onClick={scrollRightHandler}
            disabled={!canScrollRight}
            aria-label="Scroll Right"
          >
            ❯
          </button>

        </div>

      </div>

      <div
        className="movie-list"
        ref={rowRef}
      >
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
          />
        ))}
      </div>

    </section>
  );
}

export default MovieRow;