import React from "react";
import { Trash2 } from "lucide-react";
import { useWatchList } from "./WatchListContext"; 

const WatchList = () => {
  const { watchList, removeFromWatchList } = useWatchList(); 

  if (watchList.length === 0) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Watch List is Empty</h1>
        <a href="/movies" className="btn btn-primary">
          Browse Movies
        </a>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">
        My Watch List ({watchList.length})
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {watchList.map((movie) => (
          <div key={movie._id} className="card bg-base-100 shadow-xl relative">
            <button
              onClick={() => removeFromWatchList(movie._id)}
              className="absolute top-2 right-2 btn btn-circle btn-sm btn-error z-10"
            >
              <Trash2 size={16} />
            </button>
            <a href={`/movies/${movie._id}`}>
              <figure className="h-64">
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-full h-full object-cover rounded-t-xl"
                />
              </figure>
              <div className="card-body p-4">
                <h2 className="card-title text-lg">{movie.title}</h2>
                <p className="text-sm">
                  {movie.genre} • {movie.releaseYear}
                </p>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchList;
