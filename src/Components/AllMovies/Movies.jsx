import React, { use } from 'react';
import AllMoviesCard from './AllMoviesCard';


const Movies = ({allMoviesPromise}) => {
    const allMoves= use(allMoviesPromise)
    // console.log(allMoves)
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {
                allMoves.map(movies=><AllMoviesCard key={movies._id} movies={movies}></AllMoviesCard>)
            }
        </div>
    );
};

export default Movies;