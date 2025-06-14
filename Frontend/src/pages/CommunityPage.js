import React from "react";
import HeaderSection from "../components/CommunityComponents/HeaderSection";
import JobListings from "../components/CommunityComponents/JobListings";
import ResourceHub from "../components/CommunityComponents/ResourceHub";
import PollsQA from "../components/CommunityComponents/PollsQA";
import PinnedPosts from "../components/CommunityComponents/PinnedPosts";
import CommunityFeed from "../components/CommunityComponents/CommunityFeed";
import { jobListings,resources,trendingTopics,leaderboard } from "../constants/constants";

const CommunityPage = ({ isDarkMode, user }) => {
  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        isDarkMode ? "bg-zinc-900 text-white" : "bg-zinc-50 text-zinc-900"
      }`}
    >
      {/* Hero Section */}
      <div
        className={`relative w-full flex flex-col items-center justify-center py-16 md:py-28 px-4 text-center rounded-b-[40px] overflow-hidden ${
          isDarkMode
            ? "bg-gradient-to-br from-zinc-800 to-zinc-900"
            : "bg-gradient-to-br from-blue-50 to-purple-50"
        }`}
      >
        <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        <HeaderSection isDarkMode={isDarkMode} />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Community Feed (8 columns) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Pinned Posts */}
            <PinnedPosts isDarkMode={isDarkMode} />

            {/* Community Feed */}
            <CommunityFeed 
              trendingTopics={trendingTopics}
              leaderboard={leaderboard}
              isDarkMode={isDarkMode} 
              user={user}
            />
          </div>

          {/* Right Column: Sidebar (4 columns) */}
          <div className="lg:col-span-4 space-y-8">
            <div className="sticky top-6 space-y-8">
              {/* Job Listings */}
              <JobListings
                jobListings={jobListings}
                isDarkMode={isDarkMode}
                user={user}
              />

              {/* Resource Hub */}
              <ResourceHub
                resources={resources}
                isDarkMode={isDarkMode}
              />

              {/* Polls & Q&A */}
              <PollsQA isDarkMode={isDarkMode} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;