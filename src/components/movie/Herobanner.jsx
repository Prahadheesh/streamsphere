import "./HeroBanner.css";

function HeroBanner() {
  return (
    <section className="hero-banner">
      <div className="hero-overlay">
        <h1>Stranger Things</h1>

        <p className="hero-info">
          ★ 8.7 | 2016 | Sci-Fi | 4 Seasons
        </p>

        <p className="hero-description">
          When a young boy disappears, a small town uncovers a mystery
          involving secret experiments, terrifying supernatural forces,
          and one extraordinary girl.
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