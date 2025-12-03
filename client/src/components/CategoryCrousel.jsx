import React, { useState, useEffect } from 'react';
import { setSearchForTheJobUsingKeyword } from '../redux/jobslice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// SVG Icons
const ChevronLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);
const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const CategoryCrousel = () => {
  const categories = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Search Engine Optimization",
    "Graphic Designer",
    "Data Scientist",
    "Project Manager",
    "UI/UX Designer"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const slideBy = 1;

  // Adjust itemsPerPage based on screen size
  useEffect(() => {
    const updateItems = () => {
      if (window.innerWidth < 480) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 768) {
        setItemsPerPage(2);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(3);
      } else {
        setItemsPerPage(4);
      }
    };
    updateItems();
    window.addEventListener('resize', updateItems);
    return () => window.removeEventListener('resize', updateItems);
  }, []);

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(prev + slideBy, categories.length - itemsPerPage));
  };
  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(prev - slideBy, 0));
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobhandler = (query) => {
    dispatch(setSearchForTheJobUsingKeyword(query));
    navigate('/browse');
  };

  return (
    <div className="bg-slate-900 min-h-20 font-sans text-white">
      <div className="py-6 sm:py-8">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="flex items-center justify-center space-x-2 sm:space-x-4">
            
            {/* Left Arrow */}
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="p-1 sm:p-2 rounded-full bg-slate-800 border border-slate-700 text-gray-400 hover:bg-slate-700 hover:text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeftIcon />
            </button>

            {/* Carousel */}
            <div className="w-full max-w-3xl overflow-hidden">
              <div
                className="flex space-x-2 sm:space-x-4 transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
              >
                {categories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => searchJobhandler(category)}
                    className="flex-shrink-0 w-[90%] sm:w-1/2 md:w-1/3 lg:w-1/4 capitalize px-4 sm:px-5 py-2 text-xs sm:text-sm font-medium text-gray-300 bg-slate-800 border border-slate-700 rounded-full hover:bg-slate-700 hover:text-white transition-colors duration-300"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Arrow */}
            <button
              onClick={handleNext}
              disabled={currentIndex >= categories.length - itemsPerPage}
              className="p-1 sm:p-2 rounded-full bg-slate-800 border border-slate-700 text-gray-400 hover:bg-slate-700 hover:text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRightIcon />
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCrousel;
