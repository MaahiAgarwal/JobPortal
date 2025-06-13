import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, Briefcase, Users, TrendingUp, Building, AlertCircle } from 'lucide-react';
import { searchJob, saveJobToUser } from '../ConfigAPI';
import FeaturedCompanies from '../components/MainPageComponents/FeaturedCompanies';
import Testimonials from '../components/MainPageComponents/Testimonials';
import FAQ from '../components/MainPageComponents/FAQ';
import WhyChooseUs from '../components/MainPageComponents/WhyChooseUs';
import PopularCategories from '../components/MainPageComponents/PopularCategories';
import CallToAction from '../components/MainPageComponents/CallToAction';
import {
  jobTitles,
  cities,
  getFeatures,
  testimonials,
  categories,
  faqs
} from '../constants/constants'; 

const Home = ({ isDarkMode, user }) => {
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const [filteredJobSuggestions, setFilteredJobSuggestions] = useState([]);
  const [filteredCitySuggestions, setFilteredCitySuggestions] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [searchPerformed, setSearchPerformed] = useState(false); // Track if search has been performed
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  };

  const features = getFeatures(isDarkMode);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [isDarkMode]);

  const handleSearchResults = async () => {
    // Only perform search if either job title or location is not empty
    if (!jobTitle && !location) {
      setSearchResults([]);
      setSearchPerformed(false);
      return;
    }

    setSearchPerformed(true);
    try {
      const response = await searchJob({ title: jobTitle, location });
      setSearchResults(response || []);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleJobTitleChange = (e) => {
    const value = e.target.value;
    setJobTitle(value);
    if (value) {
      const filtered = jobTitles.filter((title) =>
        title.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredJobSuggestions(filtered);
    } else {
      setFilteredJobSuggestions([]);
    }
  };

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocation(value);
    if (value) {
      const filtered = cities.filter((city) =>
        city.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCitySuggestions(filtered);
    } else {
      setFilteredCitySuggestions([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Only submit if either job title or location is not empty
    if (jobTitle || location) {
      handleSearchResults();
    }
  };

  const clearSearchResults = () => {
    setSearchResults([]);
    setSearchPerformed(false);
  };

  const highlightMatch = (text, searchTerm) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.split(regex).map((part, index) =>
      regex.test(part) ? <span key={index} style={{ fontWeight: 'bold', color: 'blue' }}>{part}</span> : part
    );
  };

  const handleToggle = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleApplyJob = async (job) => {
    if (!user) {
      navigate('/signin');
      return;
    }

    if (user?.userType === 'employer') {
      setErrorMessage('Employers cannot apply for jobs');
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    try {
      await saveJobToUser(job._id);
      navigate(`/apply-job/${job._id}`);
    } catch (error) {
      console.error("Error applying for job:", error);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-900'}`}>
      {/* Error Message */}
      {showError && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50">
          <div className={`p-4 rounded-lg shadow-lg flex items-center gap-2 bg-red-500 text-white`}>
            <AlertCircle size={20} />
            <span>{errorMessage}</span>
          </div>
        </div>
      )}

      {/* Header Section */}
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
              label: 'Candidates Hired', value: '1M+', color: 'text-blue-600 dark:text-indigo-400'
            }].map(({ label, value, color }, idx) => (
              <motion.div
                className="text-center"
                key={idx}
                whileHover={{ scale: 1.1 }}
              >
                <p className={`text-4xl font-bold ${color} animate-pulse`}>{value}</p>
                <p className="text-lg font-medium">{label}</p>
              </motion.div>
            ))}
          </div>
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
      </motion.div>

      {/* Search Form Section */}
      <div className="text-center mb-8" data-aos="fade-up">
        <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
          Find the Perfect Job for You
        </h2>
        <p className={`${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'} text-lg mb-6`}>
          Search thousands of job opportunities across industries and locations. Start your journey today!
        </p>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSubmit} className={`max-w-3xl mx-auto ${isDarkMode ? 'bg-zinc-800' : 'bg-white'} shadow-lg rounded-lg overflow-hidden flex mb-12 flex-col md:flex-row`} data-aos="fade-up">
        <div className="flex-1 flex items-center border border-zinc-300 rounded-l-lg mb-4 md:mb-0 md:mr-2">
          <Search className={`ml-4 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`} />
          <input
            type="text"
            placeholder="Job Title, Keywords"
            value={jobTitle}
            onChange={handleJobTitleChange}
            className={`w-full p-4 focus:outline-none rounded-l-lg ${isDarkMode ? 'bg-zinc-700 text-zinc-200' : 'bg-white text-zinc-900'}`}
          />
        </div>
        <div className="flex-1 flex items-center border border-zinc-300 mb-4 md:mb-0 md:mr-2">
          <MapPin className={`ml-4 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`} />
          <input
            type="text"
            placeholder="City, State, Country"
            value={location}
            onChange={handleLocationChange}
            className={`w-full p-4 focus:outline-none ${isDarkMode ? 'bg-zinc-700 text-zinc-200' : 'bg-white text-zinc-900'}`}
          />
        </div>
        <button
          type="submit"
          className={`px-6 py-3 rounded-r-lg ${isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'} hover:bg-blue-700 transition-transform transform hover:scale-105 hover:shadow-md`}
        >
          Search Jobs
        </button>
      </form>

      {/* Job Title Suggestions */}
      {jobTitle && filteredJobSuggestions.length > 0 && (
        <ul className={`absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm md:ml-8 md:w-[calc(100%-2rem)] ${
          isDarkMode ? 'bg-zinc-800 text-zinc-200' : 'bg-white text-zinc-900'
        }`}>
          {filteredJobSuggestions.map((suggestion, index) => (
            <li
              key={index}
              className={`p-2 ${isDarkMode ? 'bg-zinc-800' : 'bg-white'} border ${isDarkMode ? 'border-zinc-700' : 'border-zinc-300'} rounded-md cursor-pointer`}
              onClick={() => {
                setJobTitle(suggestion);
                setFilteredJobSuggestions([]);
              }}
            >
              {highlightMatch(suggestion, jobTitle)}
            </li>
          ))}
        </ul>
      )}

      {/* Location Suggestions */}
      {location && filteredCitySuggestions.length > 0 && (
        <ul className={`absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm md:ml-8 md:w-[calc(100%-2rem)] ${
          isDarkMode ? 'bg-zinc-800 text-zinc-200' : 'bg-white text-zinc-900'
        }`}>
          {filteredCitySuggestions.map((suggestion, index) => (
            <li
              key={index}
              className={`p-2 ${isDarkMode ? 'bg-zinc-800' : 'bg-white'} border ${isDarkMode ? 'border-zinc-700' : 'border-zinc-300'} rounded-md cursor-pointer`}
              onClick={() => {
                setLocation(suggestion);
                setFilteredCitySuggestions([]);
              }}
            >
              {highlightMatch(suggestion, location)}
            </li>
          ))}
        </ul>
      )}

      {/* Search Results */}
      <div className="mt-12 relative md:ml-8">
        {searchPerformed && (
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 px-4">
            <h2 className="text-2xl font-bold mb-4 md:mb-0">
              {searchResults.length > 0 
                ? `${searchResults.length} Job${searchResults.length !== 1 ? 's' : ''} Found` 
                : 'No Jobs Found'}
            </h2>
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-sm text-zinc-600 mr-2">
                {searchResults.length > 0 && (
                  <>
                    Showing results for: 
                    <span className="font-semibold ml-2">
                      {jobTitle || 'Any Job Title'} 
                      {location && ` in ${location}`}
                    </span>
                  </>
                )}
              </span>
              <button 
                onClick={() => {
                  setSearchPerformed(false);
                  setSearchResults([]);
                  setJobTitle('');
                  setLocation('');
                }}
                className={`px-4 py-2 rounded-md transition-colors ${
                  isDarkMode 
                    ? 'bg-red-600 text-white hover:bg-red-700' 
                    : 'bg-red-500 text-white hover:bg-red-600'
                }`}
              >
                Clear Search
              </button>
              <Link 
                to="/all-jobs" 
                className={`px-4 py-2 rounded-md border transition-colors ${
                  isDarkMode 
                    ? 'border-zinc-700 text-zinc-300 hover:bg-zinc-800' 
                    : 'border-zinc-300 text-zinc-700 hover:bg-zinc-100'
                }`}
              >
                Browse All Jobs
              </Link>
            </div>
          </div>
        )}

        <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 justify-center items-center">
          {searchPerformed && searchResults.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-2xl font-semibold text-zinc-500 mb-4">
                No Jobs Found
              </p>
              <p className="text-zinc-400 mb-6">
                Try adjusting your search terms or explore different job categories
              </p>
            </div>
          )}
          
          {searchPerformed && searchResults.length > 0 && 
            searchResults.map((job, index) => (
              <div
                key={index}
                className={`border p-5 rounded-lg ${isDarkMode ? 'bg-zinc-800 text-zinc-200 border-zinc-700' : 'bg-white text-zinc-900 border-zinc-300'} shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{job.title}</h3>
                    <p className="text-sm text-zinc-500 mt-1">{job.company}</p>
                  </div>
                  <span 
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      isDarkMode 
                        ? 'bg-blue-900 text-blue-300' 
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {job.type || 'Full Time'}
                  </span>
                </div>
                
                <div className="flex items-center text-sm text-zinc-600 mb-4">
                  <MapPin className="h-4 w-4 mr-2 opacity-70" />
                  <span>{job.location}</span>
                </div>
                
                <p className="mt-3 text-sm text-zinc-700 mb-5">
                  {job.description.length > 120 
                    ? `${job.description.substring(0, 120)}...` 
                    : job.description}
                </p>
                
                <div className="mt-4 flex justify-between items-center text-sm">
                  <Link
                    to={`/job/${job._id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => handleApplyJob(job)}
                    className={`px-4 py-2 rounded-md text-white ${
                      isDarkMode 
                        ? 'bg-blue-600 hover:bg-blue-700' 
                        : 'bg-blue-600 hover:bg-blue-700'
                    } ${!user ? '' : user?.userType === 'employer' ? 'opacity-50 cursor-not-allowed' : ''} transition-all duration-300`}
                  >
                    {!user ? 'Sign in to Apply' : user?.userType === 'employer' ? 'Employers Cannot Apply' : 'Apply Now'}
                  </button>
                </div>
              </div>
            ))
          }
        </div>
      </div>

      {/* Why Choose Us Section */}
      <WhyChooseUs features={features} isDarkMode={isDarkMode} />

      {/* Popular Categories Section */}
      <PopularCategories categories={categories} isDarkMode={isDarkMode} />

      {/* Featured Companies Section */}
      <FeaturedCompanies isDarkMode={isDarkMode} />

      {/* Testimonials Section */}
      <Testimonials testimonials={testimonials} isDarkMode={isDarkMode}/>

      {/* FAQ Section */}
      <FAQ faqs={faqs} isDarkMode={isDarkMode} />

      {/* Call to Action Section */}
      <CallToAction isDarkMode={isDarkMode} />
    </div>
  );
};

export default Home;
