import React from "react";
import Hero from "./Hero";
import TopRating from "./TopRating";
import RecentlyAddedMovies from "../RecentlyAddedMovies/RecentlyAddedMovies";
import About from "../About/About";
import GenreSection from "../GenreSection/GenreSection";

const topRateMoviesPromise = fetch(
  "https://assignment-ten-server-wine.vercel.app/movies/top-rating-movies"
).then((res) => res.json());

const Home = () => {
  return (
    <div className="max-w-[1400px] m-auto text-center">
      <Hero></Hero>
      <h1 className="font-bold text-2xl mb-10 mt-28">Top Rated Movies</h1>
      <TopRating
        className="mb-16"
        topRateMoviesPromise={topRateMoviesPromise}
      ></TopRating>

      <h1 className="font-bold text-2xl mb-10 mt-28">Recently Added</h1>
      <RecentlyAddedMovies></RecentlyAddedMovies>
      <About></About>
      <GenreSection></GenreSection>
    </div>
  );
};

export default Home;
