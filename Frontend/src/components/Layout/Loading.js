import React, { useEffect, useState } from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';

function Loading({ isDarkMode }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(interval);
        }
        return Math.min(oldProgress + 10, 100); 
      });
    }, 100); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-500 ${
        isDarkMode
          ? 'bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900'
          : 'bg-gradient-to-r from-zinc-200 via-zinc-400 to-zinc-500'
      }`}
    >
      <div className="w-full max-w-sm px-4 space-y-6">
        <div className="text-center">
          <div className="text-5xl font-extrabold text-blue-600 animate-pulse">HireMe</div>
        </div>
        <div className="flex justify-center mt-4">
          <ScaleLoader color={isDarkMode ? '#ffffff' : '#000000'} loading={true} size={50} />
        </div>
        <div className="text-xl font-light text-center text-white mt-4">Loading...</div>
      </div>
    </div>
  );
}

export default Loading;
