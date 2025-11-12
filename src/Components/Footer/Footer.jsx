import React from "react";
import { Link } from "react-router";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-base-100 border-t mt-10">
      <div className="container mx-auto px-4 py-10 flex flex-col md:flex-row justify-between gap-8">
        
        <div className="flex flex-col gap-4 w-full md:w-1/4 text-center md:text-left">
          <h2 className="text-2xl font-bold text-primary">MovieMaster Pro</h2>
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} MovieMaster Pro. All rights
            reserved.
          </p>
        </div>

        
        <div className="flex flex-col sm:flex-row gap-6 w-full md:w-1/2 justify-center">
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-gray-700">Movies</h3>
            <Link to="/movies" className="link link-hover text-gray-600">
              All Movies
            </Link>
            <Link
              to="/movies/top-rated"
              className="link link-hover text-gray-600"
            >
              Top Rated
            </Link>
            <Link to="/movies/recent" className="link link-hover text-gray-600">
              Recently Added
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-gray-700">Genres</h3>
            <Link to="/genres/action" className="link link-hover text-gray-600">
              Action
            </Link>
            <Link to="/genres/comedy" className="link link-hover text-gray-600">
              Comedy
            </Link>
            <Link to="/genres/drama" className="link link-hover text-gray-600">
              Drama
            </Link>
            <Link to="/genres/horror" className="link link-hover text-gray-600">
              Horror
            </Link>
          </div>
        </div>

        
        <div className="flex flex-col gap-4 w-full md:w-1/4 text-center md:text-right">
          <h3 className="font-semibold text-gray-700">Follow Us</h3>
          <div className="flex justify-center md:justify-end gap-3 text-gray-600">
            <a href="#" className="hover:text-primary transition">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-primary transition">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-primary transition">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-primary transition">
              <FaLinkedinIn />
            </a>
          </div>

          
          <div className="mt-4">
            <p className="text-gray-600 text-sm mb-2">
              Subscribe to our newsletter
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered input-sm w-full"
              />
              <button className="btn btn-primary btn-sm">Subscribe</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
