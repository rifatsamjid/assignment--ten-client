import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

const MyCollection = () => {
  const { user } = useContext(AuthContext);
  const [myMovies, setMyMovies] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(
        `https://assignment-ten-server-wine.vercel.app/movies/user/${user.email}`
      )
        .then((res) => res.json())
        .then((data) => setMyMovies(data))
        .catch((err) => console.error(err));
    }
  }, [user]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h3 className="text-2xl font-bold mb-4 text-center">
        🎬 My Movie Collection
      </h3>

      {myMovies.length === 0 ? (
        <p className="text-center text-gray-500">
          You haven’t added any movies yet.
        </p>
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
          {myMovies.map((movie) => (
            <div
              key={movie._id}
              className="bg-white shadow-lg rounded-2xl overflow-hidden"
            >
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full h-60 object-cover"
              />
              <div className="p-4">
                <h4 className="text-xl font-semibold">{movie.title}</h4>
                <p className="text-gray-600 text-sm">
                  {movie.genre} • {movie.releaseYear}
                </p>
                <p className="text-sm mt-2">⭐ {movie.rating}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCollection;
