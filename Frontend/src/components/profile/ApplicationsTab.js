import { Briefcase, Plus } from 'lucide-react';
import { JobCard } from './JobCard';
import { Link } from 'react-router-dom';

export const ApplicationsTab = ({ appliedJobs, isDarkMode, userType }) => {
  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h3 className={`text-3xl font-bold ${isDarkMode ? 'text-zinc-100' : 'text-zinc-800'}`}>
          {userType === "user" ? "Your Applications" : "Your Job Posts"}
        </h3>
        {userType === "employer" && (
          <Link to="/job-posting-page">
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
              <Plus size={18} />
              Post New Job
            </button>
          </Link>

        )}
      </div>

      {appliedJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {appliedJobs.map((job, index) => (
            <JobCard key={index} job={job} isDarkMode={isDarkMode} userType={userType} />
          ))}
        </div>
      ) : (
        <div className={`text-center py-16 rounded-3xl ${
          isDarkMode ? 'bg-zinc-800/50' : 'bg-white/50'
        }`}>
          <Briefcase size={64} className={`mx-auto mb-4 ${isDarkMode ? 'text-zinc-600' : 'text-zinc-400'}`} />
          <h4 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
            {userType === "user" ? "No Applications Yet" : "No Jobs Posted"}
          </h4>
          <p className={`text-sm mb-6 ${isDarkMode ? 'text-zinc-500' : 'text-zinc-600'}`}>
            {userType === "user" 
              ? "Start browsing and applying to jobs to see them here" 
              : "Create your first job posting to attract candidates"
            }
          </p>
          {
            userType === "user" ?
                  <Link to="/all-jobs">
                    <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
                      Browse Jobs 
                    </button>
                  </Link> :
                  <Link to="/job-posting-page">
                    <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
                      Post a Job
                    </button>
                  </Link>
          }
        </div>
      )}
    </>
  );
};