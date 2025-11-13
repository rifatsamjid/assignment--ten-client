import React, { useContext, useState } from "react";
import { useLoaderData } from "react-router";
import { Star, Clock, Globe, Film, Edit, Trash2, Plus } from "lucide-react";
import { AuthContext } from "../../Context/AuthContext";
import { useWatchList } from "../WatchList/WatchListContext";
import toast, { Toaster } from "react-hot-toast";

const MoviesDetails = () => {
  const movie = useLoaderData();
  const { user } = useContext(AuthContext);
  const { addToWatchList, isInWatchList } = useWatchList();

  const [editingMovie, setEditingMovie] = useState(null);
  const [deleteMovie, setDeleteMovie] = useState(null);
  const [formData, setFormData] = useState({ ...movie });

  const isOwner = user?.email === movie.addedBy;
  const alreadyInList = isInWatchList(movie._id);

  const handleAddToWatchList = () => {
    if (alreadyInList) {
      toast.error(`${movie.title} already in your Watch List!`);
      return;
    }
    addToWatchList(movie);
    toast.success(`${movie.title} added to Watch List!`);
  };

  // Edit handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(
      `https://assignment-ten-server-wine.vercel.app/movies/${editingMovie._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Movie updated successfully!");
          setEditingMovie(null);
        } else {
          toast.error("No changes detected.");
        }
      })
      .catch((err) => console.error(err));
  };

  // Delete handler
  const confirmDelete = (id) => {
    fetch(`https://assignment-ten-server-wine.vercel.app/movies/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success("Movie deleted successfully!");
          setDeleteMovie(null);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="flex justify-center items-center py-16 px-4">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="max-w-[1100px] w-full bg-base-300 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
        {/* Poster */}
        <div className="flex justify-center items-center">
          <img
            src={movie.posterUrl || "/placeholder.jpg"}
            alt={movie.title}
            className="rounded-xl w-full max-w-[450px] object-cover shadow-lg"
          />
        </div>

        {/* Movie Info */}
        <div className="flex flex-col justify-center space-y-4">
          <h1 className="text-4xl font-bold">{movie.title}</h1>
          <p className="text-lg">
            {movie.genre} • {movie.releaseYear}
          </p>

          <div className="flex items-center gap-2 text-yellow-400">
            <Star fill="currentColor" size={20} />
            <span className="text-lg font-semibold">{movie.rating}/10</span>
          </div>

          <div className="flex flex-wrap gap-4 text-sm">
            <p className="flex items-center gap-1">
              <Clock size={16} /> {movie.duration} min
            </p>
            <p className="flex items-center gap-1">
              <Globe size={16} /> {movie.language}
            </p>
            <p className="flex items-center gap-1">
              <Film size={16} /> {movie.country}
            </p>
          </div>

          <p>
            <span className="font-semibold">Director:</span> {movie.director}
          </p>
          <p>
            <span className="font-semibold">Cast:</span> {movie.cast}
          </p>

          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Plot Summary</h2>
            <p className="leading-relaxed">{movie.plotSummary}</p>
          </div>

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

          {isOwner && (
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => {
                  setEditingMovie(movie);
                  setFormData(movie);
                }}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white"
              >
                <Edit size={18} /> Edit
              </button>
              <button
                onClick={() => setDeleteMovie(movie)}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white"
              >
                <Trash2 size={18} /> Delete
              </button>
            </div>
          )}

          <p className="text-sm mt-4">
            Added By: <span className="font-medium">{movie.addedBy}</span>
          </p>
        </div>
      </div>

      {/* Delete Modal */}
      {deleteMovie && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white dark:bg-base-300 p-6 sm:p-8 rounded-2xl w-[90%] max-w-md shadow-2xl text-center">
            <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
              Delete Movie
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-red-600">
                {deleteMovie.title}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setDeleteMovie(null)}
                className="w-full sm:w-1/2 py-3 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold transition"
              >
                Cancel
              </button>
              <button
                onClick={() => confirmDelete(deleteMovie._id)}
                className="w-full sm:w-1/2 py-3 rounded-lg bg-gradient-to-r from-red-500 to-red-700 hover:opacity-90 text-white font-semibold transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingMovie && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white dark:bg-base-300 p-8 rounded-2xl w-[95%] max-w-3xl shadow-2xl overflow-y-auto max-h-[90vh]">
            <h3 className="text-2xl font-semibold mb-6 text-center">
              Edit Movie Information
            </h3>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {[
                "title",
                "genre",
                "releaseYear",
                "director",
                "cast",
                "rating",
                "duration",
                "posterUrl",
                "language",
                "country",
              ].map((name) => (
                <input
                  key={name}
                  type={
                    ["releaseYear", "rating", "duration"].includes(name)
                      ? "number"
                      : "text"
                  }
                  name={name}
                  placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
                  value={formData[name]}
                  onChange={handleChange}
                  className={`w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none`}
                  required={[
                    "title",
                    "genre",
                    "releaseYear",
                    "director",
                  ].includes(name)}
                />
              ))}

              <textarea
                name="plotSummary"
                placeholder="Plot Summary"
                value={formData.plotSummary}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none md:col-span-2"
                rows="3"
              />

              <input
                type="email"
                name="addedBy"
                value={formData.addedBy || user?.email}
                readOnly
                className="w-full p-3 rounded-lg border border-gray-200 md:col-span-2"
              />

              <div className="md:col-span-2 flex flex-col sm:flex-row justify-between gap-4 mt-4">
                <button
                  type="button"
                  onClick={() => setEditingMovie(null)}
                  className="w-full sm:w-1/2 py-3 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-1/2 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 text-white font-semibold transition"
                >
                  Update Movie
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoviesDetails;
