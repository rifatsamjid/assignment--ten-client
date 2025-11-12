import React from "react";
import { Star } from "lucide-react";

const TopMovies = ({ top }) => {
  const { title, rating, releaseYear, posterUrl, genre } = top;

  return (
    <div className=" backdrop-blur-md bg-gray-300 rounded-xl p-8 shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      <img
        src={posterUrl}
        alt={title}
        className="w-full rounded-sm bg-cover h-72 object-cover"
      />

      <div className="p-4 text-center ">
        <h2 className="text-xl font-semibold mb-1">{title}</h2>

        <div className="flex justify-center items-center gap-1 mb-2 text-yellow-400">
          <Star size={18} fill="currentColor" />
          <span className="font-medium">{rating}</span>
        </div>

        <p className="text-sm ">{genre}</p>
        <p className="text-sm mt-1">{releaseYear}</p>
      </div>
      <button className="btn w-full ">View Details</button>
    </div>
  );
};

export default TopMovies;
