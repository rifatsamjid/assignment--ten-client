import React, { useContext } from "react";
import { Link, useLoaderData } from "react-router";
import { Star, Clock, Globe, Film, Edit, Trash2, Plus } from "lucide-react";
import { AuthContext } from "../../Context/AuthContext";
import { useWatchList } from "../WatchList/WatchListContext";

const MoviesDetails = () => {
  const movie = useLoaderData();
  const { user } = useContext(AuthContext);
  const { addToWatchList, isInWatchList } = useWatchList(); 

  const {
    _id,
    title,
    genre,
    releaseYear,
    director,
    cast,
    rating,
    duration,
    plotSummary,
    posterUrl,
    language,
    country,
    addedBy,
  } = movie;

  const isOwner = user?.email === addedBy;
  const alreadyInList = isInWatchList(_id);

  const handleAddToWatchList = () => {
    if (alreadyInList) {
      alert(`${title} already in your Watch List!`);
      return;
    }
    addToWatchList(movie);
    alert(`${title} added to Watch List!`);
  };

  const handleEdit = () => {
    console.log("Edit movie:", _id);
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(`Delete "${title}"?`);
    if (confirmDelete) {
      fetch(`https://your-server-url.com/movies/${_id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(() => alert("Movie deleted!"))
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className="flex justify-center items-center py-16 px-4">
      <div className="max-w-[1100px] w-full bg-base-300 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
        {/* Poster */}
        <div className="flex justify-center items-center">
          <img
            src={posterUrl || "/placeholder.jpg"}
            alt={title}
            className="rounded-xl w-full max-w-[450px] object-cover shadow-lg"
          />
        </div>

        {/* Movie Info */}
        <div className="flex flex-col justify-center space-y-4">
          <h1 className="text-4xl font-bold">{title}</h1>
          <p className="text-lg">
            {genre} • {releaseYear}
          </p>

          <div className="flex items-center gap-2 text-yellow-400">
            <Star fill="currentColor" size={20} />
            <span className="text-lg font-semibold">{rating}/10</span>
          </div>

          <div className="flex flex-wrap gap-4 text-sm">
            <p className="flex items-center gap-1">
              <Clock size={16} /> {duration} min
            </p>
            <p className="flex items-center gap-1">
              <Globe size={16} /> {language}
            </p>
            <p className="flex items-center gap-1">
              <Film size={16} /> {country}
            </p>
          </div>

          <p>
            <span className="font-semibold">Director:</span> {director}
          </p>
          <p>
            <span className="font-semibold">Cast:</span> {cast}
          </p>

          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Plot Summary</h2>
            <p className="leading-relaxed">{plotSummary}</p>
          </div>

          {/* Add to Watch List Button */}
          <button
            onClick={handleAddToWatchList}
            disabled={alreadyInList}
            className={`mt-6 flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-white transition-all ${
              alreadyInList
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-amber-600 hover:bg-amber-700"
            }`}
          >
            <Plus size={20} />
            {alreadyInList ? "Already in Watch List" : "Add to Watch List"}
          </button>

          {/* Edit/Delete for Owner */}
          {isOwner && (
            <div className="flex gap-4 mt-4">
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white"
              >
                <Edit size={18} /> Edit
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white"
              >
                <Trash2 size={18} /> Delete
              </button>
            </div>
          )}

          <p className="text-sm mt-4">
            Added By: <span className="font-medium">{addedBy}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MoviesDetails;
