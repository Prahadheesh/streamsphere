import { useState } from "react";
import media from "../data/media";
import { useNavigate } from "react-router-dom";

function Search() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const navigate = useNavigate();

  const filteredMedia = media.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(query.toLowerCase());

    const matchesCategory =
      category === "All" || item.type === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="search-page">
      <h1>Search</h1>

      <input
        type="text"
        placeholder="Search movies or TV shows..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />

      <div className="filter-buttons">
        <button
          className={category === "All" ? "active-filter" : ""}
          onClick={() => setCategory("All")}
        >
          All
        </button>

        <button
          className={category === "Movie" ? "active-filter" : ""}
          onClick={() => setCategory("Movie")}
        >
          Movies
        </button>

        <button
          className={category === "TV Show" ? "active-filter" : ""}
          onClick={() => setCategory("TV Show")}
        >
          TV Shows
        </button>
      </div>

      <div className="search-grid">
        {filteredMedia.map((item) => (
          <div
            key={item.id}
            className="search-card"
            onClick={() => navigate(`/media/${item.id}`)}
          >
            <img src={item.poster} alt={item.title} />

            <h3>{item.title}</h3>

            <p>
              {item.type} • {item.year}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;