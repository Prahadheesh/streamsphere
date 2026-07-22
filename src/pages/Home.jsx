import HeroBanner from "../components/movie/HeroBanner";
import MovieRow from "../components/movie/MovieRow";
import movies from "../data/movies";

function Home() {
  return (
    <>
      <HeroBanner />

      <MovieRow
        title="Trending Now"
        movies={movies}
      />
    </>
  );
}

export default Home;