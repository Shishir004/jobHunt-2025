import React, { useState, useRef, useEffect } from "react";

const Popover = ({ buttonText = "Open", children }) => {
  const [open, setOpen] = useState(false);
  const popoverRef = useRef();

  // Close popover on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={popoverRef}>
      <button
        onClick={() => setOpen(!open)}
        className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        {buttonText}
      </button>

      {open && (
        <div className="absolute z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-4">
          {children}
        </div>
      )}
    </div>
  );
};

export default Popover;
