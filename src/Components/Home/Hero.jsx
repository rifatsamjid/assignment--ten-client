import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const recentMovies = [
  {
    title: "Interstellar",
    year: 2014,
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    image:
      "https://i.ibb.co.com/Jj0bJCbx/MV5-BYzdj-MDAx-ZGIt-Mj-I2-My00-ODA1-LTlk-Nz-It-OWFj-MDU5-ZDJl-YWY3-Xk-Ey-Xk-Fqc-Gc-V1-FMjpg-UX1000.jpg",
  },
  {
    title: "The Batman",
    year: 2022,
    description:
      "Bruce Wayne, in his second year of fighting crime, uncovers corruption in Gotham City.",
    image:
      "https://i.ibb.co.com/VW5JSxsf/68901f6ae49b8c404602f009-the-batman-movie-poster-glossy-quality.jpg",
  },
  {
    title: "Dune",
    year: 2021,
    description:
      "Paul Atreides leads a revolution on the desert planet Arrakis to control the spice trade.",
    image: "https://i.ibb.co.com/xqbSPqHZ/Dune-Part2.webp",
  },
  {
    title: "Avatar: The Way of Water",
    year: 2022,
    description:
      "Jake Sully and Neytiri navigate family life and conflicts on Pandora, exploring new regions.",
    image: "https://i.ibb.co.com/X0Dg7jg/images-3.jpg",
  },
  {
    title: "Oppenheimer",
    year: 2023,
    description:
      "The story of J. Robert Oppenheimer and the creation of the atomic bomb during WWII.",
    image: "https://i.ibb.co.com/HLjPvLn5/images-9.jpg",
  },
];

const HeroInfinite = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === recentMovies.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // 

    return () => clearInterval(interval);
  }, []);

  const currentMovie = recentMovies[currentIndex];

  return (
    <div className="relative w-full flex justify-center items-center py-20 px-4">
      <AnimatePresence>
        <motion.div
          key={currentMovie.title}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 1 }}
          className="flex flex-col md:flex-row items-center max-w-[1300px] w-full bg-base-300 rounded-xl p-6 shadow-lg"
        >
          {/* Poster Left */}
          <img
            src={currentMovie.image}
            alt={currentMovie.title}
            className="w-72  object-cover rounded-lg mb-4 md:mb-0 md:mr-6 shadow-lg"
          />

          {/* Text Right */}
          <div className="flex flex-col justify-center text-center md:text-left md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              {currentMovie.title}
            </h2>
            <p className="text-gray-400 mb-4">{currentMovie.year}</p>
            <p className="text-lg md:text-base">{currentMovie.description}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default HeroInfinite;
