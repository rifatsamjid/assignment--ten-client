import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";

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
        console.log("Movie added:", data);
        alert("Movie added successfully!");
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
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="max-w-md mx-auto p-6 rounded-2xl shadow-lg mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Add a New Movie</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* all your existing inputs */}
        <input
          type="text"
          name="title"
          placeholder="Movie Title"
          onChange={handleChange}
          className="w-full p-2 rounded border"
          required
        />
        <input
          type="text"
          name="genre"
          placeholder="Genre"
          onChange={handleChange}
          className="w-full p-2 rounded border"
          required
        />
        <input
          type="number"
          name="releaseYear"
          placeholder="Release Year"
          onChange={handleChange}
          className="w-full p-2 rounded border"
          required
        />
        <input
          type="text"
          name="director"
          placeholder="Director"
          onChange={handleChange}
          className="w-full p-2 rounded border"
          required
        />
        <input
          type="text"
          name="cast"
          placeholder="Cast"
          onChange={handleChange}
          className="w-full p-2 rounded border"
        />
        <input
          type="number"
          name="rating"
          placeholder="Rating (1-10)"
          step="0.1"
          onChange={handleChange}
          className="w-full p-2 rounded border"
        />
        <input
          type="number"
          name="duration"
          placeholder="Duration (min)"
          onChange={handleChange}
          className="w-full p-2 rounded border"
        />
        <textarea
          name="plotSummary"
          placeholder="Plot Summary"
          onChange={handleChange}
          className="w-full p-2 rounded border"
        />
        <input
          type="text"
          name="posterUrl"
          placeholder="Poster URL"
          onChange={handleChange}
          className="w-full p-2 rounded border"
        />
        <input
          type="text"
          name="language"
          placeholder="Language"
          onChange={handleChange}
          className="w-full p-2 rounded border"
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          onChange={handleChange}
          className="w-full p-2 rounded border"
        />

        
        <input
          type="email"
          name="addedBy"
          placeholder="Added By (Email)"
          defaultValue={formData.addedBy}
          className="w-full p-2 rounded border "
          readOnly
        />

        <button
          type="submit"
          className="bg-blue-500 w-full p-2 rounded hover:bg-blue-600"
        >
          Add Movie
        </button>
      </form>
    </div>
  );
};

export default AddMovies;
