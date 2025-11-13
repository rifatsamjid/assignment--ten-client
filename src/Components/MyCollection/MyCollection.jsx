import React, { useEffect, useState, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../Context/AuthContext";

const MyCollection = () => {
  const { user } = useContext(AuthContext);
  const [myMovies, setMyMovies] = useState([]);
  const [editingMovie, setEditingMovie] = useState(null);
  const [deleteMovie, setDeleteMovie] = useState(null); 
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    releaseYear: "",
    director: "",
    cast: "",
    rating: "",
    duration: "",
    plotSummary: "",
    posterUrl: "",
    language: "",
    country: "",
    addedBy: "",
  });

  // Fetch user's movies
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

  // Handle Delete Movie 
  const confirmDelete = (id) => {
    fetch(`https://assignment-ten-server-wine.vercel.app/movies/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          setMyMovies(myMovies.filter((movie) => movie._id !== id));
          toast.success("Movie deleted successfully!");
          setDeleteMovie(null); 
        }
      })
      .catch((err) => console.error(err));
  };

  // Start Edit
  const handleEdit = (movie) => {
    setEditingMovie(movie);
    setFormData(movie);
  };

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Update
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
          setMyMovies(
            myMovies.map((m) =>
              m._id === editingMovie._id ? { ...formData, _id: m._id } : m
            )
          );
          setEditingMovie(null);
          toast.success("Movie updated successfully!");
        } else {
          toast.error("No changes detected.");
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <Toaster position="top-center" reverseOrder={false} />

      <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-center ">
        My Movie Collection
      </h3>

      {myMovies.length === 0 ? (
        <p className="text-center text-gray-500">
          You haven’t added any movies yet.
        </p>
      ) : (
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {myMovies.map((movie) => (
            <div
              key={movie._id}
              className="shadow-md rounded-2xl overflow-hidden border border-gray-200 bg-base-100 transition-transform hover:scale-[1.02] hover:shadow-lg"
            >
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full h-60 object-cover"
              />
              <div className="p-4 space-y-2">
                <h4 className="text-lg sm:text-xl font-semibold ">
                  {movie.title}
                </h4>
                <p className="text-sm ">
                  {movie.genre} • {movie.releaseYear}
                </p>
                <p className="text-sm text-yellow-600 font-medium">
                  ⭐ {movie.rating}
                </p>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleEdit(movie)}
                    className="flex-1 px-3 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-md transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteMovie(movie)} 
                    className="flex-1 px-3 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-md transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

       {/* Delete Confirmation Modal  */}
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
              ? <br /> This action cannot be undone.
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
            <h3 className="text-2xl font-semibold mb-6 text-center ">
              Edit Movie Information
            </h3>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {[
                ["title", "Movie Title", "text"],
                ["genre", "Genre", "text"],
                ["releaseYear", "Release Year", "number"],
                ["director", "Director", "text"],
                ["cast", "Cast", "text"],
                ["rating", "Rating (1–10)", "number"],
                ["duration", "Duration (min)", "number"],
                ["posterUrl", "Poster URL", "text"],
                ["language", "Language", "text"],
                ["country", "Country", "text"],
              ].map(([name, placeholder, type]) => (
                <input
                  key={name}
                  type={type}
                  name={name}
                  placeholder={placeholder}
                  value={formData[name]}
                  onChange={handleChange}
                  className={`w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none ${
                    name === "cast" || name === "posterUrl"
                      ? "md:col-span-2"
                      : ""
                  }`}
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
                placeholder="Added By (Email)"
                value={formData.addedBy || user?.email}
                readOnly
                className="w-full p-3 rounded-lg border border-gray-200  md:col-span-2"
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

export default MyCollection;
