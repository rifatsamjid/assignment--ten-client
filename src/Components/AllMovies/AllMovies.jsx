import React from 'react';
import Movies from './Movies';

const allMoviesPromise= fetch("https://assignment-ten-server-wine.vercel.app/movies").then(res=>res.json())

const AllMovies = () => {
    return (
        <div className='max-w-[1400px] mx-auto'>
            <h1 className='font-bold text-3xl text-center my-10'>All Movies</h1>
            <Movies allMoviesPromise={allMoviesPromise}></Movies>
        </div>
    );
};

export default AllMovies;