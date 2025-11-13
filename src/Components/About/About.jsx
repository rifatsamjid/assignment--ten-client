import React from "react";

const About = () => {
  return (
    <div className="mt-20">
      <section className="py-16 bg-gradient-to-r from-purple-100 to-indigo-300 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <div className="max-w-5xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
            About <span className="text-indigo-600">MovieMaster Pro</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            <strong>MovieMaster Pro</strong> is your ultimate destination to
            explore, review, and manage movies seamlessly. Discover top-rated
            titles, track your watchlist, and stay updated with the latest
            releases — all in one intuitive platform.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Built for movie lovers, powered by a modern React + Firebase stack,
            with smooth animations and a delightful user experience. 🍿
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
