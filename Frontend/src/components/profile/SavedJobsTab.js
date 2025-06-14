import { Bookmark, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SavedJobsTab = ({ isDarkMode }) => {
  return (
    <div className={`text-center py-16 rounded-3xl ${
      isDarkMode ? 'bg-zinc-800/50' : 'bg-white/50'
    }`}>
      <Bookmark size={64} className={`mx-auto mb-4 ${isDarkMode ? 'text-zinc-600' : 'text-zinc-400'}`} />
      <h4 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
        Saved Jobs
      </h4>
      <p className={`text-sm mb-6 ${isDarkMode ? 'text-zinc-500' : 'text-zinc-600'}`}>
        Your saved jobs will appear here for quick access
      </p>
      <Link to="/all-jobs">
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
                Browse Jobs
              </button>
      </Link>
    </div>
  );
};