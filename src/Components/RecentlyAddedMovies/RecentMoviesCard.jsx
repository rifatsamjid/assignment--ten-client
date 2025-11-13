
import React from 'react';

const RecentMoviesCard = ({data}) => {
    return (
        <div>
             <div className="p-4">
            <h2 className="text-lg font-semibold">{data.title} ({data.releaseYear})</h2>
            <p className="text-sm text-gray-600 mb-2">{data.genre}</p>
            <p className="text-sm mb-1"><strong>Director:</strong> {data.director}</p>
            <p className="text-sm mb-1"><strong>Cast:</strong> {data.cast}</p>
            <p className="text-sm mb-2"><strong>Rating:</strong> {data.rating}</p>
            <p className="text-sm text-gray-700 line-clamp-3">{data.plotSummary}</p>
          </div>
        </div>
        
    );
};

export default RecentMoviesCard;

