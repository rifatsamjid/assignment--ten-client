import React from 'react';
import AddedMovies from './AddedMovies';
const recentAddedMoviesPromise=fetch("https://assignment-ten-server-wine.vercel.app/movies/recently-added-movies").then(res=>res.json())


const RecentlyAddedMovies = () => {
    return (
        <div>
            <AddedMovies recentAddedMoviesPromise={recentAddedMoviesPromise}></AddedMovies>
        </div>
    );
};

export default RecentlyAddedMovies;