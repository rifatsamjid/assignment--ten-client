import React, { useState } from 'react';

const AddMovies = () => {
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    releaseYear: '',
    director: '',
    cast: '',
    rating: '',
    duration: '',
    plotSummary: '',
    posterUrl: '',
    language: '',
    country: '',
    addedBy: ''
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('https://assignment-ten-server-wine.vercel.app/movies/add', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => {
        console.log('Movie added:', data);
        alert('Movie added successfully!');
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="max-w-md mx-auto bg-gray-100 p-6 rounded-2xl shadow-lg mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Add a New Movie</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="text" name="title" placeholder="Movie Title" onChange={handleChange} className="w-full p-2 rounded border" required />
        <input type="text" name="genre" placeholder="Genre" onChange={handleChange} className="w-full p-2 rounded border" required />
        <input type="number" name="releaseYear" placeholder="Release Year" onChange={handleChange} className="w-full p-2 rounded border" required />
        <input type="text" name="director" placeholder="Director" onChange={handleChange} className="w-full p-2 rounded border" required />
        <input type="text" name="cast" placeholder="Cast" onChange={handleChange} className="w-full p-2 rounded border" />
        <input type="number" name="rating" placeholder="Rating (1-10)" onChange={handleChange} className="w-full p-2 rounded border" />
        <input type="number" name="duration" placeholder="Duration (min)" onChange={handleChange} className="w-full p-2 rounded border" />
        <textarea name="plotSummary" placeholder="Plot Summary" onChange={handleChange} className="w-full p-2 rounded border" />
        <input type="text" name="posterUrl" placeholder="Poster URL" onChange={handleChange} className="w-full p-2 rounded border" />
        <input type="text" name="language" placeholder="Language" onChange={handleChange} className="w-full p-2 rounded border" />
        <input type="text" name="country" placeholder="Country" onChange={handleChange} className="w-full p-2 rounded border" />
        <input type="email" name="addedBy" placeholder="Added By (Email)" onChange={handleChange} className="w-full p-2 rounded border" />

        <button type="submit" className="bg-blue-500 text-white w-full p-2 rounded hover:bg-blue-600">Add Movie</button>
      </form>
    </div>
  );
};

export default AddMovies;
