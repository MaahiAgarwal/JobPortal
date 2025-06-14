import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Pin, CalendarClock, Users, ChevronDown } from "lucide-react";
import { pinnedPosts } from "../../constants/constants";

const PinnedPosts = ({ isDarkMode }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="space-y-2">
      {/* Toggle Header */}
      <motion.div
        whileTap={{ scale: 0.98 }}
        onClick={() => setExpanded(!expanded)}
        className={`flex justify-between items-center cursor-pointer px-5 py-4 rounded-xl font-medium transition-all ${
          isDarkMode
            ? "bg-zinc-800 hover:bg-zinc-700"
            : "bg-blue-50 hover:bg-blue-100"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${
            isDarkMode 
              ? "bg-blue-900/30 text-blue-400" 
              : "bg-blue-100 text-blue-600"
          }`}>
            <Pin className="w-5 h-5" />
          </div>
          <span className={`text-lg font-semibold ${
            isDarkMode ? "text-white" : "text-blue-800"
          }`}>
            Pinned Posts
          </span>
        </div>
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className={`w-5 h-5 ${
            isDarkMode ? "text-blue-400" : "text-blue-600"
          }`} />
        </motion.div>
      </motion.div>

      {/* Animated Content */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="space-y-3 overflow-hidden"
          >
            {pinnedPosts.map((post) => (
              <motion.div
                key={post.id}
                whileHover={{ y: -2 }}
                className={`p-5 rounded-xl border transition-all ${
                  isDarkMode
                    ? "bg-zinc-800/80 border-zinc-700 hover:border-blue-400/30 hover:shadow-lg hover:shadow-blue-900/10"
                    : "bg-white border-zinc-200 hover:border-blue-300 hover:shadow-md"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-1.5 rounded-md ${
                        isDarkMode 
                          ? "bg-blue-900/30 text-blue-400" 
                          : "bg-blue-100 text-blue-600"
                      }`}>
                        <Users className="w-4 h-4" />
                      </div>
                      <h3 className={`font-medium ${
                        isDarkMode ? "text-white" : "text-zinc-800"
                      }`}>
                        {post.title}
                      </h3>
                    </div>
                    <div className={`flex items-center gap-2 text-sm ${
                      isDarkMode ? "text-zinc-400" : "text-zinc-600"
                    }`}>
                      <CalendarClock className="w-4 h-4" />
                      <span>{post.details}</span>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${
                    isDarkMode 
                      ? "bg-zinc-700 text-zinc-300" 
                      : "bg-zinc-100 text-zinc-600"
                  }`}>
                    {post.timestamp}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PinnedPosts;