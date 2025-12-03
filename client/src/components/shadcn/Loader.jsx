import React from 'react';

/**
 * An attractive loader component that displays a set of bouncing bars.
 * This provides a more visually interesting loading state than a simple spinner.
 */
const AttractiveLoader = () => {
  console.log("AttractiveLoader mounted");
  return (
    <>
      {/* We inject the keyframe animation styles directly into the document head. */}
      <style>
        {`
          @keyframes bounce {
            0%, 75%, 100% {
              transform: scaleY(0.4);
              opacity: 0.5;
            }
            25% {
              transform: scaleY(1);
              opacity: 1;
            }
          }
          .animate-bounce-bar {
            animation: bounce 1.5s infinite ease-in-out;
          }
          .animation-delay-100 {
            animation-delay: -0.1s;
          }
          .animation-delay-200 {
            animation-delay: -0.2s;
          }
          .animation-delay-300 {
            animation-delay: -0.3s;
          }
          .animation-delay-400 {
            animation-delay: -0.4s;
          }
        `}
      </style>
      
      {/* The loader's visual container. */}
      <div className="flex items-end space-x-1">
        {/* Each div represents a bar in the equalizer animation. */}
        <div className="w-2 h-8 bg-gradient-to-t from-blue-500 to-cyan-400 rounded-sm animate-bounce-bar animation-delay-400"></div>
        <div className="w-2 h-8 bg-gradient-to-t from-blue-500 to-cyan-400 rounded-sm animate-bounce-bar animation-delay-300"></div>
        <div className="w-2 h-8 bg-gradient-to-t from-blue-500 to-cyan-400 rounded-sm animate-bounce-bar animation-delay-200"></div>
        <div className="w-2 h-8 bg-gradient-to-t from-blue-500 to-cyan-400 rounded-sm animate-bounce-bar animation-delay-100"></div>
        <div className="w-2 h-8 bg-gradient-to-t from-blue-500 to-cyan-400 rounded-sm animate-bounce-bar"></div>
      </div>
    </>
  );
};

export default AttractiveLoader;
