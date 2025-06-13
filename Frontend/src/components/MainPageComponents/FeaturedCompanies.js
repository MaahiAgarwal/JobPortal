import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { companies } from "../../constants/constants";

const FeaturedCompanies = ({ isDarkMode = false }) => {

  const [activeSlide, setActiveSlide] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsToShow(1);
      else if (window.innerWidth < 1024) setItemsToShow(2);
      else if (window.innerWidth < 1280) setItemsToShow(3);
      else setItemsToShow(4);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const interval = setInterval(() => {
      handleNext();
    }, 3000);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(interval);
    };
  }, [activeSlide]);

  const totalSlides = companies.length - itemsToShow + 1;

  const handlePrev = () => {
    setActiveSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index) => {
    setActiveSlide(index);
  };

  return (
    <div className={`w-full py-16 ${isDarkMode ? "bg-zinc-900" : "bg-zinc-50"}`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h2 className={`text-4xl font-bold ${isDarkMode ? "text-white" : "text-zinc-900"}`}>Top Companies Hiring</h2>
          <div className={`mt-2 h-1 w-24 mx-auto rounded-full bg-gradient-to-r ${isDarkMode ? "from-indigo-500 to-purple-500" : "from-indigo-600 to-purple-600"}`} />
          <p className={`mt-4 text-xl ${isDarkMode ? "text-zinc-300" : "text-zinc-600"}`}>Explore opportunities with industry leaders</p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className={`absolute -left-5 md:-left-8 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full 
              ${isDarkMode ? "bg-zinc-800/80 text-white hover:bg-zinc-700/80" : "bg-white/80 text-zinc-800 hover:bg-white"} 
              shadow-lg backdrop-blur-md border ${isDarkMode ? "border-white/5" : "border-white/20"} 
              transition-all duration-300 hover:scale-110 hover:shadow-blue-500/20`}
          >
            <ChevronLeft size={28} />
          </button>

          {/* Slider */}
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${activeSlide * (100 / itemsToShow)}%)` }}>
              {companies.map((company, index) => (
                <div key={index} className="flex-none px-3" style={{ width: `${100 / itemsToShow}%` }}>
                  <div className={`group h-72 p-6 rounded-xl relative overflow-hidden
                      ${isDarkMode ? "bg-gradient-to-br from-zinc-900/40 to-zinc-900/60 border border-white/5" : "bg-gradient-to-br from-white/60 to-white/80 border border-white/20"} 
                      backdrop-blur-xl shadow-lg transition-all duration-500 ease-out
                      hover:shadow-2xl hover:shadow-blue-500/20
                      before:absolute before:inset-0 
                      before:bg-[radial-gradient(800px_circle_at_var(--mouse-x)_var(--mouse-y),rgba(59,130,246,0.06),transparent_40%)]
                      after:absolute after:inset-0 
                      after:bg-[radial-gradient(600px_circle_at_var(--mouse-x)_var(--mouse-y),rgba(59,130,246,0.4),transparent_40%)]
                      after:opacity-0 after:transition-opacity after:duration-500 hover:after:opacity-100
                      hover:-translate-y-1`}
                      onMouseMove={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                        e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
                      }}
                  >
                    <div className={`relative w-full h-40 mb-4 flex items-center justify-center rounded-xl p-3 
                        ${isDarkMode ? "bg-gradient-to-br from-zinc-800/30 to-zinc-900/30" : "bg-gradient-to-br from-white/40 to-white/60"} 
                        backdrop-blur-md transition-transform duration-500 
                        group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-blue-500/10
                        border ${isDarkMode ? "border-white/5" : "border-white/20"}`}
                    >
                      <img
                        src={company.image}
                        alt={company.name}
                        className="max-w-full max-h-full object-contain filter transition-all duration-500
                          group-hover:brightness-110 group-hover:contrast-110 group-hover:saturate-110"
                      />
                    </div>
                    <div className="relative space-y-2">
                      <h3 className={`text-lg font-semibold text-center transition-colors duration-300
                          ${isDarkMode ? "text-zinc-200 group-hover:text-blue-300" : "text-zinc-800 group-hover:text-blue-600"}`}
                      >
                        {company.name}
                      </h3>
                      <p className={`text-sm text-center transition-colors duration-300
                          ${isDarkMode ? "text-zinc-400 group-hover:text-zinc-300" : "text-zinc-600 group-hover:text-zinc-800"}`}
                      >
                        {company.description || "Leading technology company"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleNext}
            className={`absolute -right-5 md:-right-8 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full 
              ${isDarkMode ? "bg-zinc-800/80 text-white hover:bg-zinc-700/80" : "bg-white/80 text-zinc-800 hover:bg-white"} 
              shadow-lg backdrop-blur-md border ${isDarkMode ? "border-white/5" : "border-white/20"} 
              transition-all duration-300 hover:scale-110 hover:shadow-blue-500/20`}
          >
            <ChevronRight size={28} />
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ease-out 
                ${activeSlide === index ? `${isDarkMode ? "bg-gradient-to-r from-indigo-500 to-purple-500" : "bg-gradient-to-r from-indigo-600 to-purple-600"} w-6` : `${isDarkMode ? "bg-zinc-700" : "bg-zinc-300"}`}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedCompanies;