import { setSearchForTheJobUsingKeyword } from "../redux/jobslice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { X, SlidersHorizontal } from "lucide-react"; // icons for open/close

const filterData = [
  {
    filterType: "Location",
    array: [
      "Dehradun",
      "Bangalore",
      "Delhi",
      "Ahemdabad",
      "Kolkata",
      "Haryana",
      "Mumbai",
      "Chandigarh",
    ],
  },
  {
    filterType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "Fullstack Developer",
    ],
  },
  {
    filterType: "Salary",
    array: ["5-10 LPA", "10-20 LPA", "20+ LPA"],
  },
];

const FilterCard = () => {
  const [selectedFilters, setSelectedFilters] = useState({});
  const [isOpen, setIsOpen] = useState(false); // for mobile toggle
  const dispatch = useDispatch();

  const handleFilterChange = (type, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  useEffect(() => {
    dispatch(setSearchForTheJobUsingKeyword(selectedFilters));
  }, [selectedFilters]);

  const clearAllFilters = () => {
    setSelectedFilters({});
  };

  return (
    <>
      {/* Mobile toggle button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors"
        >
          <SlidersHorizontal size={18} />
          Filters
        </button>
      </div>

      {/* Sidebar (desktop: always visible, mobile: slide-in) */}
      <div
        className={`bg-[#161B22] rounded-xl shadow-lg p-6 border border-gray-700 h-fit
        lg:block
        fixed lg:static top-0 right-0 w-72 h-full lg:h-fit z-50 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"}`}
      >
        {/* Mobile close button */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-100">Filter Jobs</h3>
          <div className="flex items-center gap-3">
            <button
              onClick={clearAllFilters}
              className="text-sm text-purple-400 hover:text-purple-300 hover:underline"
            >
              Clear All
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden text-gray-400 hover:text-gray-200"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {filterData.map((filter) => (
            <fieldset key={filter.filterType}>
              <legend className="font-semibold text-gray-200 mb-3">
                {filter.filterType}
              </legend>
              <div className="space-y-2">
                {filter.array.map((item) => (
                  <label
                    key={item}
                    className="flex items-center cursor-pointer text-gray-400 hover:text-gray-200 transition-colors"
                  >
                    <input
                      type="radio"
                      name={filter.filterType}
                      value={item}
                      checked={selectedFilters[filter.filterType] === item}
                      onChange={() =>
                        handleFilterChange(filter.filterType, item)
                      }
                      className="sr-only peer"
                    />
                    <span className="w-4 h-4 rounded-full border-2 border-gray-500 mr-3 flex items-center justify-center peer-checked:border-purple-500">
                      <span className="w-2 h-2 rounded-full bg-purple-500 opacity-0 peer-checked:opacity-100 transition-opacity"></span>
                    </span>
                    {item}
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
        </div>
      </div>

      {/* Mobile overlay when sidebar is open */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}
    </>
  );
};

export default FilterCard;
