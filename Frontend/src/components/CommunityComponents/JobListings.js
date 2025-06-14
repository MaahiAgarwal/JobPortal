import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Building2, MapPin, Laptop, BadgeCheck, AlertCircle, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const JobListings = ({ jobListings, isDarkMode, user }) => {
  const [expanded, setExpanded] = useState(false);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const handleApply = (jobId) => {
    if (!user) {
      navigate('/signin');
      return;
    }

    if (user?.userType === 'employer') {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    navigate(`/apply-job/${jobId}`);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    },
    exit: { opacity: 0, height: 0 }
  };

  const jobItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="space-y-4 w-full">
      {/* Toggle Header */}
      <motion.div
        onClick={() => setExpanded(!expanded)}
        className={`flex justify-between items-center cursor-pointer p-4 rounded-xl font-bold ${
          isDarkMode 
            ? "bg-zinc-800 hover:bg-zinc-700" 
            : "bg-white hover:bg-zinc-50"
        } transition-all shadow-sm border ${
          isDarkMode 
            ? "border-zinc-700" 
            : "border-zinc-200"
        }`}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${
            isDarkMode 
              ? "bg-green-900/30 text-green-400" 
              : "bg-green-100 text-green-600"
          }`}>
            <Building2 size={20} />
          </div>
          <h2 className={`text-xl font-bold ${
            isDarkMode ? "text-white" : "text-zinc-800"
          }`}>
            Job Opportunities
          </h2>
        </div>
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown 
            size={24} 
            className={isDarkMode ? "text-zinc-400" : "text-zinc-500"} 
          />
        </motion.div>
      </motion.div>

      {/* Animated Content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="overflow-hidden"
          >
            {/* Error Message */}
            <AnimatePresence>
              {showError && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className={`mb-4 p-3 rounded-xl text-center ${
                    isDarkMode
                      ? "bg-red-900/80 text-red-200"
                      : "bg-red-100 text-red-600"
                  } backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-2`}
                >
                  <AlertCircle size={18} />
                  <span>Employers cannot apply for jobs</span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-4"> {/* Changed to single column layout */}
              {jobListings.map((job) => (
                <motion.div
                  key={job._id || job.id}
                  variants={jobItemVariants}
                  className={`p-5 rounded-xl border ${
                    isDarkMode
                      ? "bg-zinc-800/50 hover:bg-zinc-700/70 border-zinc-700"
                      : "bg-white hover:bg-zinc-50 border-zinc-200"
                  } transition-all duration-300 shadow-sm`}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className={`text-lg font-bold ${
                      isDarkMode ? "text-white" : "text-zinc-800"
                    }`}>
                      {job.title}
                    </h3>
                    <span
                      className={`px-2.5 py-1 text-xs rounded-full font-medium ${
                        isDarkMode
                          ? "bg-green-900/30 text-green-400"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {job.type || "Full-time"}
                    </span>
                  </div>

                  <div className="space-y-3 mb-5">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        isDarkMode 
                          ? "bg-zinc-700 text-zinc-300" 
                          : "bg-zinc-100 text-zinc-600"
                      }`}>
                        <Building2 size={16} />
                      </div>
                      <span className={`text-sm ${
                        isDarkMode ? "text-zinc-300" : "text-zinc-700"
                      }`}>
                        {job.company}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        isDarkMode 
                          ? "bg-zinc-700 text-zinc-300" 
                          : "bg-zinc-100 text-zinc-600"
                      }`}>
                        <MapPin size={16} />
                      </div>
                      <span className={`text-sm ${
                        isDarkMode ? "text-zinc-300" : "text-zinc-700"
                      }`}>
                        {job.location}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        isDarkMode 
                          ? "bg-zinc-700 text-zinc-300" 
                          : "bg-zinc-100 text-zinc-600"
                      }`}>
                        <Laptop size={16} />
                      </div>
                      <span className={`text-sm ${
                        isDarkMode ? "text-zinc-300" : "text-zinc-700"
                      }`}>
                        {job.salary || "Competitive Salary"}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-zinc-200 dark:border-zinc-700">
                    <div className={`flex items-center gap-2 text-sm ${
                      isDarkMode ? "text-green-400" : "text-green-600"
                    }`}>
                      <BadgeCheck size={18} className="shrink-0" />
                      <span>Actively hiring</span>
                    </div>
                    <motion.button
                      onClick={() => handleApply(job._id || job.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        isDarkMode
                          ? "bg-green-900/30 text-green-400 hover:bg-green-900/50"
                          : "bg-green-100 text-green-600 hover:bg-green-200"
                      } ${
                        !user ? "" : user?.userType === 'employer' 
                          ? "opacity-50 cursor-not-allowed" 
                          : ""
                      }`}
                      whileHover={!user || user?.userType !== 'employer' ? { scale: 1.05 } : {}}
                      whileTap={!user || user?.userType !== 'employer' ? { scale: 0.95 } : {}}
                    >
                      {!user ? "Sign in to Apply" : "Apply Now"}
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>

            {jobListings.length === 0 && (
              <motion.div 
                className={`p-8 text-center rounded-xl ${
                  isDarkMode ? "bg-zinc-800/50" : "bg-zinc-100"
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className={`text-lg ${
                  isDarkMode ? "text-zinc-400" : "text-zinc-600"
                }`}>
                  No job listings available at the moment
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default JobListings;