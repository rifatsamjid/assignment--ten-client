import React, { useEffect, useState } from "react";
import Hero from "./Hero";
import TopRating from "./TopRating";
import RecentlyAddedMovies from "../RecentlyAddedMovies/RecentlyAddedMovies";
import About from "../About/About";
import GenreSection from "../GenreSection/GenreSection";
import StatisticsSection from "../StatisticsSection/StatisticsSection";

const topRateMoviesPromise = fetch(
  "https://assignment-ten-server-wine.vercel.app/movies/top-rating-movies"
).then((res) => res.json());

const Home = () => {
  const [totalMovies, setTotalMovies] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // fetch movies
        const resMovies = await fetch(
          "https://assignment-ten-server-wine.vercel.app/movies"
        );
        const moviesData = await resMovies.json();
        setTotalMovies(moviesData.length);

        // fetch users
        const resUsers = await fetch(
          "https://assignment-ten-server-wine.vercel.app/users"
        );
        const usersData = await resUsers.json();
        setTotalUsers(usersData.length);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching stats:", error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-80">
        <span className="loading loading-spinner text-primary text-2xl"></span>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] m-auto text-center">
      <Hero />
      <StatisticsSection totalMovies={totalMovies} totalUsers={totalUsers} />

      <h1 className="font-bold text-2xl mb-10 mt-28">Top Rated Movies</h1>
      <TopRating
        className="mb-16"
        topRateMoviesPromise={topRateMoviesPromise}
      />

      <h1 className="font-bold text-2xl mb-10 mt-28">Recently Added</h1>
      <RecentlyAddedMovies />

      <About />
      <GenreSection />
    </div>
  );
};

export default Home;
