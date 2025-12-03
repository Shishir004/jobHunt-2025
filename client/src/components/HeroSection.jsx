import { setSearchForTheJobUsingKeyword } from '../redux/jobslice';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// SVG Icon for the search button
const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);
const HeroSection = () => {
  const [input,setInput]=useState('');
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const searchJobhandler=(e)=>{
    e.preventDefault();
    dispatch(setSearchForTheJobUsingKeyword(input))
    navigate('/browse')
  }
  return (
    // Main container with a dark background, covering the full screen
    <div className="bg-slate-900 min-h-screen flex items-center justify-center font-sans p-4">
      <div className="container mx-auto flex flex-col items-center text-center px-4">
        
        {/* Top Tag */}
        <div className="mb-6">
          <span className="bg-slate-800 text-purple-400 text-sm font-semibold px-4 py-1 rounded-full border border-slate-700">
            No. 1 Job Hunt Website
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-4">
          <span className="bg-gradient-to-r from-purple-500 to-indigo-600 text-transparent bg-clip-text">
            Search, Apply &
          </span>
          <br />
          Get Your Dream Job
        </h1>

        {/* Subheading */}
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-10">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
          aspernatur temporibus nihil tempora dolor!
        </p>

        {/* Search Bar */}
        <form className="w-full max-w-xl mx-auto">
          <div className="relative flex items-center bg-slate-800 rounded-full shadow-lg border border-slate-700 focus-within:ring-2 focus-within:ring-purple-500 transition-all duration-300">
            <input
              type="text"
              onChange={(e)=>setInput(e.target.value)}
              placeholder="Find your dream job..."
              className="w-full bg-transparent text-white placeholder-gray-500 py-4 pl-6 pr-16 rounded-full focus:outline-none"
            />
            <button
            onClick={searchJobhandler}
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-indigo-500 transition-colors duration-300"
              aria-label="Search"
            >
              <SearchIcon />
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default HeroSection