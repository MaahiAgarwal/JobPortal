import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const ProfileTabs = ({ activeTab, setActiveTab, isDarkMode, userType }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="max-w-6xl mx-auto mb-8 px-4 sm:px-6">
      {/* --- Desktop/Tablet Tabs --- */}
      <div className={`hidden md:flex items-center border-b ${isDarkMode ? 'border-zinc-700' : 'border-zinc-200'}`}>
        <button
          onClick={() => setActiveTab('applications')}
          className={`px-6 py-3 font-medium relative ${
            activeTab === 'applications' 
              ? isDarkMode 
                ? 'text-blue-400' 
                : 'text-blue-600'
              : isDarkMode 
                ? 'text-zinc-400 hover:text-zinc-300' 
                : 'text-zinc-600 hover:text-zinc-800'
          }`}
        >
          {userType === "user" ? "Applications" : "Job Posts"}
          {activeTab === 'applications' && (
            <span className={`absolute bottom-0 left-0 right-0 h-0.5 ${
              isDarkMode ? 'bg-blue-500' : 'bg-blue-600'
            }`} />
          )}
        </button>

        {userType === "user" && (
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-6 py-3 font-medium relative ${
              activeTab === 'saved' 
                ? isDarkMode 
                  ? 'text-blue-400' 
                  : 'text-blue-600'
                : isDarkMode 
                  ? 'text-zinc-400 hover:text-zinc-300' 
                  : 'text-zinc-600 hover:text-zinc-800'
            }`}
          >
            Saved Jobs
            {activeTab === 'saved' && (
              <span className={`absolute bottom-0 left-0 right-0 h-0.5 ${
                isDarkMode ? 'bg-blue-500' : 'bg-blue-600'
              }`} />
            )}
          </button>
        )}

        <button
          onClick={() => setActiveTab('settings')}
          className={`px-6 py-3 font-medium relative ${
            activeTab === 'settings' 
              ? isDarkMode 
                ? 'text-blue-400' 
                : 'text-blue-600'
              : isDarkMode 
                ? 'text-zinc-400 hover:text-zinc-300' 
                : 'text-zinc-600 hover:text-zinc-800'
          }`}
        >
          Settings
          {activeTab === 'settings' && (
            <span className={`absolute bottom-0 left-0 right-0 h-0.5 ${
              isDarkMode ? 'bg-blue-500' : 'bg-blue-600'
            }`} />
          )}
        </button>
      </div>

      {/* --- Mobile Dropdown --- */}
      <div className="md:hidden relative mt-4">
        <button 
          onClick={() => setShowDropdown(!showDropdown)}
          className={`w-full flex items-center justify-between gap-2 px-4 py-3 rounded-xl ${
            isDarkMode ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-zinc-100 hover:bg-zinc-200'
          }`}
        >
          <span className={isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}>
            {activeTab === 'applications' 
              ? (userType === "user" ? "Applications" : "Job Posts") 
              : activeTab === 'saved' 
                ? "Saved Jobs" 
                : "Settings"
            }
          </span>
          <ChevronDown size={16} className={isDarkMode ? 'text-zinc-400' : 'text-zinc-600'} />
        </button>

        {showDropdown && (
          <div className={`absolute top-full mt-2 w-full rounded-xl shadow-xl z-10 ${
            isDarkMode ? 'bg-zinc-800 border border-zinc-700' : 'bg-white border border-zinc-200'
          }`}>
            <button
              onClick={() => {
                setActiveTab('applications');
                setShowDropdown(false);
              }}
              className={`w-full text-left px-4 py-2 rounded-t-xl ${
                activeTab === 'applications' 
                  ? isDarkMode 
                    ? 'bg-zinc-700 text-blue-400' 
                    : 'bg-blue-50 text-blue-600'
                  : isDarkMode 
                    ? 'hover:bg-zinc-700 text-zinc-300' 
                    : 'hover:bg-zinc-100 text-zinc-800'
              }`}
            >
              {userType === "user" ? "Applications" : "Job Posts"}
            </button>

            {userType === "user" && (
              <button
                onClick={() => {
                  setActiveTab('saved');
                  setShowDropdown(false);
                }}
                className={`w-full text-left px-4 py-2 ${
                  activeTab === 'saved' 
                    ? isDarkMode 
                      ? 'bg-zinc-700 text-blue-400' 
                      : 'bg-blue-50 text-blue-600'
                    : isDarkMode 
                      ? 'hover:bg-zinc-700 text-zinc-300' 
                      : 'hover:bg-zinc-100 text-zinc-800'
                }`}
              >
                Saved Jobs
              </button>
            )}

            <button
              onClick={() => {
                setActiveTab('settings');
                setShowDropdown(false);
              }}
              className={`w-full text-left px-4 py-2 rounded-b-xl ${
                activeTab === 'settings' 
                  ? isDarkMode 
                    ? 'bg-zinc-700 text-blue-400' 
                    : 'bg-blue-50 text-blue-600'
                  : isDarkMode 
                    ? 'hover:bg-zinc-700 text-zinc-300' 
                    : 'hover:bg-zinc-100 text-zinc-800'
              }`}
            >
              Settings
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
