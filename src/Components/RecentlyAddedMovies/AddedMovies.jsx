import React, { use } from 'react';
import RecentMoviesCard from './RecentMoviesCard';

const AddedMovies = ({recentAddedMoviesPromise}) => {
    
            const recentlyAdded = use(recentAddedMoviesPromise)
        console.log(recentlyAdded)

    return (
        <div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                {
                    recentlyAdded.map(data=><RecentMoviesCard key={data._id} data={data}></RecentMoviesCard>)
                }
            </div>
        </div>
    );
};

export default AddedMovies;
