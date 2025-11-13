
import React from "react";

const StatisticsSection = ({ totalMovies, totalUsers }) => {
  return (
    <section className="py-12 bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-2xl mt-16">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Platform Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white/10 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-semibold">Total Movies</h3>
            <p className="text-4xl font-bold mt-3">{totalMovies}</p>
          </div>
          <div className="p-6 bg-white/10 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-semibold">Total Users</h3>
            <p className="text-4xl font-bold mt-3">{totalUsers}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
