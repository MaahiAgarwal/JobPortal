import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HeaderSection = ({ isDarkMode }) => {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      className="text-center mb-16 px-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      variants={fadeUp}
    >
      <div className="max-w-3xl mx-auto">
        <motion.h1
          className="text-5xl md:text-6xl font-bold leading-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-400 to-indigo-700 animate-pulse"
          whileHover={{ scale: 1.05 }}
        >
          Find Your Dream Job
        </motion.h1>

        <div className="w-28 h-2 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 via-indigo-400 to-indigo-700 shadow-md"></div>

        <p className={`${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'} text-lg md:text-xl mb-8`}>
          Discover exciting job opportunities across various industries and locations.
        </p>

        <div className="flex justify-center gap-4 mb-8">
          <motion.div whileHover={{ scale: 1.1 }}>
            <Link
              to="/all-jobs"
              className={`px-6 py-3 text-lg font-medium rounded-lg transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg' 
                  : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg'
              }`}
            >
              Browse Jobs
            </Link>
          </motion.div>
        </div>

        <div className={`flex flex-wrap justify-center gap-6 md:gap-12 ${isDarkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>
          {[{
            label: 'Jobs Posted', value: '10,000+', color: 'text-blue-600 dark:text-indigo-400'
          }, {
            label: 'Companies Hiring', value: '500+', color: 'text-indigo-500 dark:text-blue-400'
          }, {
            label: 'Active Users', value: '20,000+', color: 'text-purple-500 dark:text-blue-300'
          }].map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
        <motion.div
          className="flex justify-center mt-12"
          whileHover={{ scale: 1.05 }}
        >
          <img
            src="/images/herosection.png"
            alt="Job Search Illustration"
            className="w-full max-w-lg mx-auto drop-shadow-lg rounded-lg transition-transform duration-500"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeaderSection;
