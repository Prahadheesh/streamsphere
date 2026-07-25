import HeroBanner from "../components/movie/HeroBanner";
import MovieRow from "../components/movie/MovieRow";
import ContinueWatching from "../components/media/ContinueWatching";
import media from "../data/media";

function Home() {
  const movies = media.filter((item) => item.type === "Movie");
  const series = media.filter((item) => item.type === "Series");
  const tvShows = media.filter((item) => item.type === "TV Show");
  const cartoons = media.filter((item) => item.type === "Cartoon");

  const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

  const watchlistMedia = media.filter((item) =>
    watchlist.includes(item.id)
  );

  return (
    <>
      <HeroBanner />

      <ContinueWatching />

      {movies.length > 0 && (
        <MovieRow
          title="🎬 Movies"
          movies={movies}
        />
      )}

      {series.length > 0 && (
        <MovieRow
          title="🎞️ Series"
          movies={series}
        />
      )}

      {tvShows.length > 0 && (
        <MovieRow
          title="📺 TV Shows"
          movies={tvShows}
        />
      )}

      {cartoons.length > 0 && (
        <MovieRow
          title="🎨 Cartoons"
          movies={cartoons}
        />
      )}

      {watchlistMedia.length > 0 && (
        <MovieRow
          title="❤️ My Watchlist"
          movies={watchlistMedia}
        />
      )}
    </>
  );
}

export default Home;