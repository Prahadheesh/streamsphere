import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

import media from "../data/media";

import VideoPlayer from "../components/player/VideoPlayer";
import RecommendationRow from "../components/movie/RecommendationRow";

import "./Watch.css";

function Watch() {
  const { id } = useParams();
  const navigate = useNavigate();

  const item = useMemo(
    () => media.find((m) => m.id === Number(id)),
    [id]
  );

  const recommendations = useMemo(() => {
    if (!item) return [];

    return media
      .filter(
        (m) =>
          m.id !== item.id &&
          m.type === item.type
      )
      .slice(0, 10);
  }, [item]);

  if (!item) {
    return (
      <div className="media-not-found">

        <h1>Media Not Found</h1>

        <p>
          The requested media does not exist.
        </p>

        <button
          onClick={() => navigate("/")}
        >
          ← Back Home
        </button>

      </div>
    );
  }

  return (
    <div className="watch-page">

      <VideoPlayer media={item} />

      <section className="watch-information">

        <div className="watch-header">

          <span className="watch-type">
            {item.type}
          </span>

          <h1>{item.title}</h1>

        </div>

        <div className="watch-meta">

          {item.year && (
            <span>{item.year}</span>
          )}

          {item.duration && (
            <span>{item.duration}</span>
          )}

          {item.rating && (
            <span>⭐ {item.rating}</span>
          )}

        </div>

        <p className="watch-description">
          {item.description}
        </p>

      </section>

      {recommendations.length > 0 && (
        <RecommendationRow
          title="You May Also Like"
          movies={recommendations}
        />
      )}

    </div>
  );
}

export default Watch;