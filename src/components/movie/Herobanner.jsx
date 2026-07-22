import "./HeroBanner.css";
import { featuredMovie } from "../../data/movies";

function HeroBanner() {
  return (
    <section className="hero-banner">
      <div className="hero-overlay">
        <h1>{featuredMovie.title}</h1>

        <p className="hero-info">
          ★ {featuredMovie.rating} | {featuredMovie.year} |{" "}
          {featuredMovie.genre} | {featuredMovie.duration}
        </p>

        <p className="hero-description">
          {featuredMovie.description}
        </p>

        <div className="hero-buttons">
          <button className="play-btn">▶ Play</button>
          <button className="list-btn">+ My List</button>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;