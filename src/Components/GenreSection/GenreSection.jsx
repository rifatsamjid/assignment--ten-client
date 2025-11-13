
import React from "react";

const genres = [
  "Action",
  "Drama",
  "Comedy",
  "Thriller",
  "Romance",
  "Horror",
  "Sci-Fi",
  "Adventure",
];

const GenreSection = () => {
  return (
    <section className="py-12 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
          Browse by Genre
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {genres.map((genre) => (
            <div
              key={genre}
              className="p-6 bg-white dark:bg-gray-800 hover:scale-105 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 hover:text-white text-gray-700 dark:text-gray-200 font-semibold rounded-2xl shadow-md cursor-pointer transition-all"
            >
              {genre}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GenreSection;
