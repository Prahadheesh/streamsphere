import { useNavigate } from "react-router-dom";
import media from "../../data/media";

function ContinueWatching() {
  const navigate = useNavigate();

  const watched = media.filter((item) => {
    const progress = localStorage.getItem(`watch-${item.id}`);
    return progress && Number(progress) > 0;
  });

  if (watched.length === 0) {
    return null;
  }

  return (
    <section className="continue-section">
      <h2>Continue Watching</h2>

      <div className="search-grid">
        {watched.map((item) => (
          <div
            key={item.id}
            className="search-card"
            onClick={() => navigate(`/watch/${item.id}`)}
          >
            <img src={item.poster} alt={item.title} />

            <h3>{item.title}</h3>

            <p>
              Resume Watching
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ContinueWatching;