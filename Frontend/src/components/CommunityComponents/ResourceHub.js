import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link2, Search, ChevronDown, Tags, Bookmark } from "lucide-react";

const ResourceHub = ({ resources, isDarkMode }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");
  const [expanded, setExpanded] = useState(true);
  const [filteredResources, setFilteredResources] = useState(resources);

  // Get all unique tags from resources
  const allTags = [
    "All",
    ...Array.from(
      new Set(
        resources
          .map((r) => r.tag?.trim()) // Trim whitespace and handle undefined
          .filter(Boolean) // Remove empty/null/undefined
          .map(tag => tag.toLowerCase()) // Normalize to lowercase
      )
    )
  ].map(tag => tag === "all" ? "All" : tag.charAt(0).toUpperCase() + tag.slice(1)); // Capitalize first letter

  useEffect(() => {
    const filtered = resources.filter((resource) => {
      // Search by title (case insensitive)
      const matchesSearch = resource.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase().trim());
      
      // Filter by tag (case insensitive and handle undefined tags)
      const resourceTag = resource.tag?.toLowerCase().trim() || '';
      const matchesTag = 
        selectedTag === "All" || 
        resourceTag === selectedTag.toLowerCase().trim();
      
      return matchesSearch && matchesTag;
    });

    setFilteredResources(filtered);
  }, [searchQuery, selectedTag, resources]);

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
              ? "bg-purple-900/30 text-purple-400" 
              : "bg-purple-100 text-purple-600"
          }`}>
            <Bookmark size={20} />
          </div>
          <h2 className={`text-xl font-bold ${
            isDarkMode ? "text-white" : "text-zinc-800"
          }`}>
            Resource Hub
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden space-y-4"
          >
            {/* Search + Tag filter */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${
                  isDarkMode ? "text-zinc-500" : "text-zinc-400"
                }`}>
                  <Search size={18} />
                </div>
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-lg border shadow-sm focus:outline-none focus:ring-2 transition ${
                    isDarkMode
                      ? "bg-zinc-800 text-gray-200 border-zinc-700 focus:ring-purple-500 focus:border-purple-500"
                      : "bg-white text-gray-900 border-zinc-300 focus:ring-purple-400 focus:border-purple-400"
                  }`}
                />
              </div>

              <div className="relative flex-1">
                <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${
                  isDarkMode ? "text-zinc-500" : "text-zinc-400"
                }`}>
                  <Tags size={18} />
                </div>
                <select
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-lg border shadow-sm focus:outline-none focus:ring-2 transition appearance-none ${
                    isDarkMode
                      ? "bg-zinc-800 text-gray-200 border-zinc-700 focus:ring-purple-500 focus:border-purple-500"
                      : "bg-white text-gray-900 border-zinc-300 focus:ring-purple-400 focus:border-purple-400"
                  }`}
                >
                  {allTags.map((tag, index) => (
                    <option key={index} value={tag}>
                      {tag}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Debugging info (remove in production) */}
            <div className={`text-xs p-2 rounded ${
              isDarkMode ? "bg-zinc-700 text-zinc-300" : "bg-zinc-100 text-zinc-700"
            }`}>
              <p>Debug: Searching for "{searchQuery}" in titles</p>
              <p>Filtering by tag: "{selectedTag}"</p>
              <p>Showing {filteredResources.length} of {resources.length} resources</p>
            </div>

            {/* Resources List */}
            <div className="space-y-3">
              {filteredResources.length > 0 ? (
                filteredResources.map((resource) => (
                  <motion.div
                    key={resource.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`p-4 rounded-xl border transition-all duration-300 ${
                      isDarkMode
                        ? "bg-zinc-800/50 hover:bg-zinc-700/70 border-zinc-700"
                        : "bg-white hover:bg-zinc-50 border-zinc-200"
                    }`}
                    whileHover={{ y: -3 }}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <a
                        href={resource.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-base font-semibold flex items-center gap-2 hover:text-purple-500 transition ${
                          isDarkMode ? "text-white" : "text-zinc-800"
                        }`}
                      >
                        <Link2 size={16} className="flex-shrink-0" />
                        <span>{resource.title}</span>
                      </a>
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                          isDarkMode
                            ? "bg-purple-900/30 text-purple-400"
                            : "bg-purple-100 text-purple-600"
                        }`}
                      >
                        {resource.tag || "Resource"}
                      </span>
                    </div>

                    {resource.description && (
                      <p className={`text-sm mb-3 ${
                        isDarkMode ? "text-zinc-300" : "text-zinc-600"
                      }`}>
                        {resource.description}
                      </p>
                    )}

                    {resource.topics && (
                      <div className="flex flex-wrap gap-2">
                        {resource.topics.map((topic, idx) => (
                          <span
                            key={idx}
                            className={`px-2 py-1 text-xs rounded-full ${
                              isDarkMode
                                ? "bg-zinc-700 text-zinc-300"
                                : "bg-zinc-100 text-zinc-700"
                            }`}
                          >
                            #{topic}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`p-6 text-center rounded-xl ${
                    isDarkMode ? "bg-zinc-800/50" : "bg-zinc-100"
                  }`}
                >
                  <p className={`text-base ${
                    isDarkMode ? "text-zinc-400" : "text-zinc-600"
                  }`}>
                    No resources found matching your criteria
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResourceHub;