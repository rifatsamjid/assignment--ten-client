import React, { useContext } from "react";
import { useLoaderData } from "react-router";
import { Star, Clock, Globe, Film, Edit, Trash2 } from "lucide-react";
import { AuthContext } from "../../Context/AuthContext";

const MoviesDetails = () => {
  const movie = useLoaderData();
  const { user } = useContext(AuthContext); 

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

  const handleEdit = () => {
    console.log("Edit movie:", _id);
    // navigate(`/edit/${_id}`) 
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(`Delete "${title}"?`);
    if (confirmDelete) {
      fetch(`https://your-server-url.com/movies/${_id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          alert("Movie deleted successfully!");
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className="flex justify-center items-center py-16 px-4 bg-[#0a0a0a] text-white">
      <div className="max-w-[1100px] w-full bg-white/5 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
        {/* Left: Poster */}
        <div className="flex justify-center items-center">
          <img
            src={posterUrl}
            alt={title}
            className="rounded-xl w-full max-w-[450px] object-cover shadow-lg"
          />
        </div>

        {/* Right: Movie Info */}
        <div className="flex flex-col justify-center space-y-4">
          <h1 className="text-4xl font-bold">{title}</h1>
          <p className="text-gray-400">
            {genre} • {releaseYear}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 text-yellow-400">
            <Star fill="currentColor" size={20} />
            <span className="text-lg font-semibold">{rating}/10</span>
          </div>

          {/* Duration, Language, Country */}
          <div className="flex flex-wrap gap-4 text-gray-300 text-sm">
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

          {/* Director */}
          <p>
            <span className="font-semibold text-white">Director:</span>{" "}
            <span className="text-gray-300">{director}</span>
          </p>

          {/* Cast */}
          <p>
            <span className="font-semibold text-white">Cast:</span>{" "}
            <span className="text-gray-300">{cast}</span>
          </p>

          {/* Plot Summary */}
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Plot Summary</h2>
            <p className="text-gray-300 leading-relaxed">{plotSummary}</p>
          </div>

          {/* Edit/Delete Buttons (Owner Only) */}
          {isOwner && (
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition-all px-4 py-2 rounded-lg text-white font-medium"
              >
                <Edit size={18} /> Edit
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 transition-all px-4 py-2 rounded-lg text-white font-medium"
              >
                <Trash2 size={18} /> Delete
              </button>
            </div>
          )}

          {/* Added By */}
          <p className="text-sm text-gray-400 mt-3">
            Added By: <span className="text-gray-200">{addedBy}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MoviesDetails;
