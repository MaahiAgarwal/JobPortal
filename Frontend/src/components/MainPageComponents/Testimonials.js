import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const Testimonials = ({ testimonials, isDarkMode }) => {
  // Function to get avatar images from a placeholder API
  const getAvatarUrl = (gender, name) => {
    // Using DiceBear API for consistent placeholder avatars
    return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundType=gradientLinear&fontFamily=Helvetica`;
  };

  return (
    <div className="mb-16" data-aos="fade-up">
      <h2 className={`text-center text-4xl font-bold mb-10 tracking-wide ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
        What Our <span className="text-blue-500">Users Say</span>
      </h2>

      {/* Swiper for Small Screens */}
      <div className="sm:hidden">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={20}
          slidesPerView={1}
          className="w-full px-4"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div
                className={`relative p-8 text-center rounded-2xl shadow-lg transition-all transform hover:scale-105 hover:shadow-2xl 
                  ${isDarkMode ? 
                    "bg-zinc-800 text-zinc-200 border border-zinc-700 hover:border-blue-400 hover:bg-zinc-900" 
                    : 
                    "bg-white text-zinc-900 border border-zinc-300 hover:border-blue-500 hover:bg-blue-50"
                  }`}
              >
                {/* Avatar with fallback to placeholder */}
                <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-2 border-blue-500">
                  <img 
                    src={testimonial.avatar || getAvatarUrl('female', testimonial.name)} 
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = getAvatarUrl('female', testimonial.name);
                    }}
                  />
                </div>
                
                {/* Rating Stars */}
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-lg italic mb-4">
                  "{testimonial.feedback}"
                </p>
                <h3 className="text-xl font-semibold">{testimonial.name}</h3>
                <p className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  {testimonial.job}
                </p>

                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-transparent opacity-10 rounded-2xl blur-xl" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Grid Layout for Larger Screens */}
      <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-4">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={`relative p-6 text-center rounded-2xl shadow-lg transition-all transform hover:scale-105 hover:shadow-2xl 
              ${isDarkMode ? 
                "bg-zinc-800 text-zinc-200 border border-zinc-700 hover:border-blue-400 hover:bg-zinc-900" 
                : 
                "bg-white text-zinc-900 border border-zinc-300 hover:border-blue-500 hover:bg-blue-50"
              }`}
          >
            {/* Avatar with fallback to placeholder */}
            <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden border-2 border-blue-500">
              <img 
                src={testimonial.avatar || getAvatarUrl('female', testimonial.name)} 
                alt={testimonial.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = getAvatarUrl('female', testimonial.name);
                }}
              />
            </div>
            
            {/* Rating Stars */}
            <div className="flex justify-center mb-3">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            <p className={`text-sm italic mb-3 ${isDarkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>
              "{testimonial.feedback}"
            </p>
            <h3 className="text-lg font-semibold">{testimonial.name}</h3>
            <p className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
              {testimonial.job}
            </p>

            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-transparent opacity-10 rounded-2xl blur-xl" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;