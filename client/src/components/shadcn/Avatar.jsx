import React, { useState, useRef, useEffect } from 'react';
const AvatarDropdown = ({ src, fallback, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Effect to handle clicks outside of the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    // Add event listener when the dropdown is open
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    // Cleanup the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center border-2 border-gray-600 hover:border-blue-500 transition-colors duration-300 overflow-hidden">
        {src ? (
          <img src={src} alt="User Avatar" className="w-full h-full rounded-full object-cover" />
        ) : (
          <span className="font-bold text-white">{fallback}</span>
        )}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10">
          {children}
        </div>
      )}
    </div>
  );
};
export default AvatarDropdown;