import "./MediaDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import media from "../data/media";
import RecommendationRow from "../components/movie/RecommendationRow";
import "./MediaDetails.css";

function MediaDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const item = useMemo(
    () => media.find((m) => m.id === Number(id)),
    [id]
  );

  const [isInWatchlist, setIsInWatchlist] = useState(false);

  useEffect(() => {
    if (!item) return;

    const watchlist = JSON.parse(
      localStorage.getItem("watchlist") || "[]"
    );

    setIsInWatchlist(watchlist.includes(item.id));
  }, [item]);

  if (!item) {
    return (
      <div className="media-not-found">
        <h1>Media Not Found</h1>

        <button onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    );
  }

  const toggleWatchlist = () => {
    let watchlist = JSON.parse(
      localStorage.getItem("watchlist") || "[]"
    );

    if (watchlist.includes(item.id)) {
      watchlist = watchlist.filter(
        (movieId) => movieId !== item.id
      );
      setIsInWatchlist(false);
    } else {
      watchlist.push(item.id);
      setIsInWatchlist(true);
    }

    localStorage.setItem(
      "watchlist",
      JSON.stringify(watchlist)
    );
  };

  return (
    <>
      <section
        className="details-hero"
        style={{
          backgroundImage: `
            linear-gradient(
              to bottom,
              rgba(8,11,20,.35),
              rgba(8,11,20,.92)
            ),
            url(${item.backdrop})
          `,
        }}
      >
        <div className="details-container">

          <img
            src={item.poster}
            alt={item.title}
            className="details-poster"
          />

          <div className="details-content">

            <span className="details-type">
              {item.type}
            </span>

            <h1>{item.title}</h1>

            <div className="details-meta">

              <span>⭐ {item.rating}</span>

              <span>{item.year}</span>

              <span>{item.genre}</span>

              <span>{item.duration}</span>

              <span>{item.language}</span>

            </div>

            <p className="details-description">
              {item.description}
            </p>

            <div className="details-actions">

              <button
                className="play-btn"
                onClick={() =>
                  navigate(`/watch/${item.id}`)
                }
              >
                ▶ Play
              </button>

              <button
                className="watchlist-btn"
                onClick={toggleWatchlist}
              >
                {isInWatchlist
                  ? "❤️ In Watchlist"
                  : "🤍 Add to Watchlist"}
              </button>

            </div>

          </div>

        </div>

      </section>

      <RecommendationRow currentMovie={item} />
    </>
  );
}

export default MediaDetails;