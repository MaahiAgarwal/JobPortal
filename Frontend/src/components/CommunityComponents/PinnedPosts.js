import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Pin, CalendarClock, Users } from "lucide-react";
import {pinnedPosts} from "../../constants/constants";

const PinnedPosts = ({ isDarkMode }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="space-y-4">
      {/* Toggle Header */}
      <div
        onClick={() => setExpanded(!expanded)}
        className="flex justify-between items-center cursor-pointer px-4 py-3 rounded-xl font-bold text-xl bg-blue-100/10 hover:bg-blue-200/10 transition"
      >
        <span className="text-blue-500 text-3xl font-bold flex items-center gap-2">
          <Pin className="w-6 h-6" />
          Pinned Posts
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 transform transition-transform ${
            expanded ? "rotate-180 text-blue-500" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Animated Content */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-4 overflow-hidden"
          >
            {pinnedPosts.map((post) => (
              <div
                key={post.id}
                className={`p-6 rounded-2xl shadow-xl border backdrop-blur-md transition hover:scale-[1.02] hover:shadow-2xl duration-300 group ${
                  isDarkMode
                    ? "bg-gradient-to-br from-[#1e1e1e] to-[#2c2c2c] border-zinc-700 text-gray-100"
                    : "bg-gradient-to-br from-white to-zinc-100 border-zinc-300 text-gray-800"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-lg font-semibold">
                    <Users className="w-5 h-5 text-blue-400" />
                    <span>{post.title}</span>
                  </div>
                  <span className="text-xs text-zinc-400">{post.timestamp}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                  <CalendarClock className="w-4 h-4" />
                  <span>{post.details}</span>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PinnedPosts;
