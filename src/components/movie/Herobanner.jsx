import "./Herobanner.css";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import media from "../../data/media";

function HeroBanner() {
  const navigate = useNavigate();

  // Show only media that has a backdrop
  const featuredMedia = useMemo(
    () => media.filter((item) => item.backdrop),
    []
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const changeSlide = useCallback(
    (index) => {
      setFade(false);

      setTimeout(() => {
        setCurrentIndex(index);
        setFade(true);
      }, 180);
    },
    []
  );

  const nextSlide = useCallback(() => {
    changeSlide((currentIndex + 1) % featuredMedia.length);
  }, [changeSlide, currentIndex, featuredMedia.length]);

  const previousSlide = useCallback(() => {
    changeSlide(
      currentIndex === 0
        ? featuredMedia.length - 1
        : currentIndex - 1
    );
  }, [changeSlide, currentIndex, featuredMedia.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [nextSlide]);

  const currentMovie = featuredMedia[currentIndex];

  if (!currentMovie) return null;

  return (
    <section
      className={`hero-banner ${fade ? "fade-in" : "fade-out"}`}
      style={{
        backgroundImage: `
          linear-gradient(
            to right,
            rgba(6,10,18,0.92),
            rgba(6,10,18,0.55),
            rgba(6,10,18,0.85)
          ),
          url(${currentMovie.backdrop})
        `,
      }}
    >
      <div className="hero-content">

        <span className="hero-tag">
          {currentMovie.type}
        </span>

        <h1 className="hero-title">
          {currentMovie.title}
        </h1>

        <div className="hero-meta">

          <span>⭐ {currentMovie.rating}</span>

          <span>{currentMovie.year}</span>

          <span>{currentMovie.genre}</span>

          <span>{currentMovie.duration}</span>

          <span>{currentMovie.language}</span>

        </div>

        <p className="hero-description">
          {currentMovie.description}
        </p>

        <div className="hero-actions">

          <button
            className="play-button"
            onClick={() =>
              navigate(`/watch/${currentMovie.id}`)
            }
          >
            ▶ Play
          </button>

          <button
            className="info-button"
            onClick={() =>
              navigate(`/media/${currentMovie.id}`)
            }
          >
            More Info
          </button>

        </div>

      </div>

      <button
        className="hero-nav hero-left"
        onClick={previousSlide}
        aria-label="Previous"
      >
        ❮
      </button>

      <button
        className="hero-nav hero-right"
        onClick={nextSlide}
        aria-label="Next"
      >
        ❯
      </button>

      <div className="hero-indicators">

        {featuredMedia.map((item, index) => (
          <button
            key={item.id}
            className={
              index === currentIndex
                ? "indicator active"
                : "indicator"
            }
            onClick={() => changeSlide(index)}
            aria-label={item.title}
          />
        ))}

      </div>
    </section>
  );
}

export default HeroBanner;