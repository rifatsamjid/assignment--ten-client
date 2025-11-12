
import React from 'react';
import Hero from './Hero';
import TopRating from './TopRating';

const topRateMoviesPromise= fetch("https://assignment-ten-server-wine.vercel.app/top-rating-movies").then(res=>res.json())


const Home = () => {
  
  return (
    <div>
      <Hero></Hero>
      <h1 className='font-bold text-2xl mb-10 mt-28'>Top Rated Movies</h1>
      <TopRating topRateMoviesPromise={topRateMoviesPromise}></TopRating>
    </div>
  );
};

export default Home;
