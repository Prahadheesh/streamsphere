import { useNavigate } from "react-router-dom";
import media from "../data/media";

function Watchlist() {
  const navigate = useNavigate();

  const watchlist = JSON.parse(
    localStorage.getItem("watchlist") || "[]"
  );

  const items = media.filter((movie) =>
    watchlist.includes(movie.id)
  );

  return (
    <div className="watch-page">
      <h1>My Watchlist</h1>

      {items.length === 0 ? (
        <p>No movies in your watchlist.</p>
      ) : (
        <div className="search-grid">
          {items.map((item) => (
            <div
              key={item.id}
              className="search-card"
              onClick={() => navigate(`/media/${item.id}`)}
            >
              <img src={item.poster} alt={item.title} />

              <h3>{item.title}</h3>

              <p>{item.year}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Watchlist;