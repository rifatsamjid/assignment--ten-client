import React, { use } from "react";
import TopMovies from "./TopMovies";

const TopRating = ({ topRateMoviesPromise }) => {
  const movies = use(topRateMoviesPromise);
  console.log(movies);
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {movies.map((top) => (
        <TopMovies top={top} key={top._id}></TopMovies>
      ))}
    </div>
  );
};

export default TopRating;
