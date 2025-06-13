import React, { useState, useEffect } from "react";
import { ThumbsUp, MessageCircle } from "lucide-react";
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
    <div className="space-y-4">
      <div
        onClick={() => setExpanded(!expanded)}
        className="flex justify-between items-center cursor-pointer px-4 py-3 rounded-xl font-bold text-xl bg-pink-100/10 hover:bg-pink-200/10 transition"
      >
        <span className="text-pink-500 text-3xl font-bold">Polls & Q&A</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 transform transition-transform ${
            expanded ? "rotate-180 text-blue-400" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8 overflow-hidden"
          >
            {pollQuestions.map((poll) => {
              const pollVote = votesData[poll.id];
              const voted = pollVote?.voted;
              const selected = pollVote?.selected;

              return (
                <div
                  key={poll.id}
                  className={`p-6 rounded-2xl shadow-xl border backdrop-blur-md transition-all duration-300 ${
                    isDarkMode
                      ? "bg-gradient-to-br from-zinc-800 to-zinc-900 border-zinc-700 text-gray-200"
                      : "bg-gradient-to-br from-white to-zinc-50 border-zinc-300 text-gray-800"
                  }`}
                >
                  <p className="text-lg font-semibold mb-6">{poll.question}</p>

                  <div className="space-y-3">
                    {poll.options.map((option) => (
                      <motion.div
                        key={option.id}
                        whileTap={{ scale: 0.97 }}
                        className={`flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer border transition-all ${
                          selected === option.id
                            ? "border-pink-500 bg-pink-100/10"
                            : "border-transparent hover:bg-zinc-100/10"
                        }`}
                        onClick={() => !voted && handleVote(poll.id, option.id)}
                      >
                        <span className="font-medium">{option.label}</span>
                        {voted ? (
                          <div className="w-2/3 bg-zinc-300 dark:bg-zinc-700 rounded-full overflow-hidden h-2 ml-4">
                            <div
                              className="bg-pink-500 h-full transition-all"
                              style={{
                                width: `${getPercentage(poll.id, option.id)}%`,
                              }}
                            />
                          </div>
                        ) : (
                          <span className="text-sm text-zinc-500">
                            {selected === option.id ? "✔️ Selected" : ""}
                          </span>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <button
                      disabled
                      className={`w-full sm:w-auto px-5 py-2 rounded-lg font-medium ${
                        voted
                          ? "bg-pink-500 text-white cursor-not-allowed"
                          : "bg-gray-400 text-white"
                      }`}
                    >
                      {voted ? " Voted" : "Vote Now"}
                    </button>

                    <div className="flex justify-center sm:justify-end gap-6 text-zinc-500 text-sm">
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>12 Comments</span>
                      </div>
                      <div
                        className="flex items-center gap-1 cursor-pointer"
                        onClick={() => handleLike(poll.id)}
                      >
                        <ThumbsUp
                          className={`w-4 h-4 ${
                            likes[poll.id] ? "text-pink-500" : ""
                          }`}
                        />
                        <span>{likes[poll.id] ? "Liked" : "Like"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PollsQA;
