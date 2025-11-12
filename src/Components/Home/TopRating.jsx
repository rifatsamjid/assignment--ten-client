import React, { use } from "react";
import TopMovies from "./TopMovies";

const TopRating = ({ topRateMoviesPromise }) => {
  const movies = use(topRateMoviesPromise);
  console.log(movies);
  return (
    <div>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {movies.map((top) => (
          <TopMovies top={top} key={top._id}></TopMovies>
        ))}
      </div>
      <div className="flex justify-center items-center">
        <button className="btn flex justify-center mt-12">Show All</button>
      </div>
    </div>
  );
};

export default TopRating;
