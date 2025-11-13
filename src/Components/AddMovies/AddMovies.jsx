import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

const AddMovies = () => {
  const { user } = useContext(AuthContext);

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

  useEffect(() => {
    if (user?.email) {
      setFormData((prev) => ({ ...prev, addedBy: user.email }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const movieData = {
      ...formData,
      rating: parseFloat(formData.rating),
      releaseYear: parseInt(formData.releaseYear),
      duration: parseInt(formData.duration),
    };

    fetch("https://assignment-ten-server-wine.vercel.app/movies/add", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(movieData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          toast.success(" Movie added successfully!");
          e.target.reset();
          setFormData((prev) => ({
            ...prev,
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
          }));
        } else {
          toast.error(" Failed to add movie. Try again!");
        }
      })
      .catch(() => toast.error(" Something went wrong! Please try again."));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 p-4">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="bg-base-100 shadow-2xl rounded-2xl w-full max-w-2xl p-6 sm:p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-center mb-6 text-primary">
          Add a New Movie
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {[
            ["title", "Movie Title", "text"],
            ["genre", "Genre", "text"],
            ["releaseYear", "Release Year", "number"],
            ["director", "Director", "text"],
            ["cast", "Cast", "text"],
            ["rating", "Rating (1-10)", "number"],
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
              className={`w-full p-3  rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none ${
                name === "posterUrl" || name === "cast" ? "sm:col-span-2" : ""
              }`}
              required={["title", "genre", "releaseYear", "director"].includes(
                name
              )}
            />
          ))}

          <textarea
            name="plotSummary"
            placeholder="Plot Summary"
            value={formData.plotSummary}
            onChange={handleChange}
            rows="3"
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none sm:col-span-2"
          />

          <input
            type="email"
            name="addedBy"
            placeholder="Added By (Email)"
            value={formData.addedBy || user?.email}
            readOnly
            className="w-full p-3 rounded-lg border border-gray-200 sm:col-span-2"
          />

          <button
            type="submit"
            className="sm:col-span-2 py-3 mt-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:opacity-90 transition-all"
          >
            Add Movie
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMovies;
