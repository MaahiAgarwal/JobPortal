import React, { useState, useEffect } from "react";
import { ThumbsUp, MessageCircle, ChevronDown, BarChart2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { pollQuestions } from "../../constants/constants";

const PollsQA = ({ isDarkMode }) => {
  const [votesData, setVotesData] = useState({});
  const [likes, setLikes] = useState({});
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    const storedVotes = JSON.parse(localStorage.getItem("poll-votes")) || {};
    const storedLikes = JSON.parse(localStorage.getItem("poll-likes")) || {};
    setVotesData(storedVotes);
    setLikes(storedLikes);
  }, []);

  const handleVote = (pollId, selectedId) => {
    const updated = {
      ...votesData,
      [pollId]: {
        selected: selectedId,
        voted: true,
      },
    };
    setVotesData(updated);
    localStorage.setItem("poll-votes", JSON.stringify(updated));
  };

  const handleLike = (pollId) => {
    const newLikes = {
      ...likes,
      [pollId]: !likes[pollId],
    };
    setLikes(newLikes);
    localStorage.setItem("poll-likes", JSON.stringify(newLikes));
  };

  const getPercentage = (pollId, optionId) => {
    const selected = votesData[pollId]?.selected;
    return selected === optionId ? 100 : 0; // mock logic
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
              ? "bg-pink-900/30 text-pink-400" 
              : "bg-pink-100 text-pink-600"
          }`}>
            <BarChart2 size={20} />
          </div>
          <h2 className={`text-xl font-bold ${
            isDarkMode ? "text-white" : "text-zinc-800"
          }`}>
            Polls & Q&A
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
            {pollQuestions.map((poll) => {
              const pollVote = votesData[poll.id];
              const voted = pollVote?.voted;
              const selected = pollVote?.selected;

              return (
                <motion.div
                  key={poll.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`p-5 rounded-xl border transition-all duration-300 ${
                    isDarkMode
                      ? "bg-zinc-800/50 hover:bg-zinc-700/70 border-zinc-700"
                      : "bg-white hover:bg-zinc-50 border-zinc-200"
                  }`}
                  whileHover={{ y: -3 }}
                >
                  <h3 className={`text-lg font-bold mb-4 ${
                    isDarkMode ? "text-white" : "text-zinc-800"
                  }`}>
                    {poll.question}
                  </h3>

                  <div className="space-y-3 mb-6">
                    {poll.options.map((option) => (
                      <motion.div
                        key={option.id}
                        whileTap={{ scale: 0.97 }}
                        className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer transition-all ${
                          selected === option.id
                            ? isDarkMode
                              ? "bg-pink-900/20 border-pink-500"
                              : "bg-pink-100 border-pink-400"
                            : isDarkMode
                              ? "hover:bg-zinc-700 border-zinc-600"
                              : "hover:bg-zinc-100 border-zinc-300"
                        } border`}
                        onClick={() => !voted && handleVote(poll.id, option.id)}
                      >
                        <span className={`font-medium ${
                          isDarkMode ? "text-zinc-200" : "text-zinc-700"
                        }`}>
                          {option.label}
                        </span>
                        {voted ? (
                          <div className="w-1/2 bg-zinc-300 dark:bg-zinc-700 rounded-full overflow-hidden h-2 ml-4">
                            <div
                              className={`h-full transition-all ${
                                isDarkMode ? "bg-pink-400" : "bg-pink-500"
                              }`}
                              style={{
                                width: `${getPercentage(poll.id, option.id)}%`,
                              }}
                            />
                          </div>
                        ) : (
                          <span className={`text-sm ${
                            isDarkMode ? "text-zinc-400" : "text-zinc-500"
                          }`}>
                            {selected === option.id ? "✔️ Selected" : ""}
                          </span>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-700">
                    <button
                      disabled={voted}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        voted
                          ? isDarkMode
                            ? "bg-pink-900/30 text-pink-400 cursor-not-allowed"
                            : "bg-pink-100 text-pink-600 cursor-not-allowed"
                          : isDarkMode
                            ? "bg-pink-900/30 text-pink-400 hover:bg-pink-900/50"
                            : "bg-pink-100 text-pink-600 hover:bg-pink-200"
                      }`}
                    >
                      {voted ? "Vote Submitted" : "Submit Vote"}
                    </button>

                    <div className="flex justify-center sm:justify-end gap-4">
                      <div className={`flex items-center gap-1 text-sm ${
                        isDarkMode ? "text-zinc-400" : "text-zinc-500"
                      }`}>
                        <MessageCircle size={16} className="flex-shrink-0" />
                        <span>12 Comments</span>
                      </div>
                      <button
                        onClick={() => handleLike(poll.id)}
                        className={`flex items-center gap-1 text-sm transition-colors ${
                          likes[poll.id] 
                            ? isDarkMode 
                              ? "text-pink-400" 
                              : "text-pink-600"
                            : isDarkMode 
                              ? "text-zinc-400 hover:text-zinc-300" 
                              : "text-zinc-500 hover:text-zinc-700"
                        }`}
                      >
                        <ThumbsUp size={16} className="flex-shrink-0" />
                        <span>{likes[poll.id] ? "Liked" : "Like"}</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PollsQA;