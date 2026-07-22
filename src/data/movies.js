const movies = [
  {
    id: 1,
    title: "Stranger Things",
    rating: "8.7",
    year: "2016",
    image: "/src/assets/images/hero.jpg",
  },
  {
    id: 2,
    title: "Interstellar",
    rating: "8.6",
    year: "2014",
    image: "/src/assets/images/hero.jpg",
  },
  {
    id: 3,
    title: "Avatar",
    rating: "7.9",
    year: "2009",
    image: "/src/assets/images/hero.jpg",
  },
  {
    id: 4,
    title: "Inception",
    rating: "8.8",
    year: "2010",
    image: "/src/assets/images/hero.jpg",
  },
  {
    id: 5,
    title: "The Batman",
    rating: "7.8",
    year: "2022",
    image: "/src/assets/images/hero.jpg",
  },
];

export const featuredMovie = {
  title: movies[0].title,
  rating: movies[0].rating,
  year: movies[0].year,
  genre: "Sci-Fi",
  duration: "4 Seasons",
  description:
    "When a young boy disappears, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one extraordinary girl.",
  image: movies[0].image,
};

export default movies;