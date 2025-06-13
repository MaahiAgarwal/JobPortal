import { Briefcase, Building2, MapPin, Clock, ExternalLink, Award, Settings } from 'lucide-react';

export const JobCard = ({ job, isDarkMode, userType }) => {
  return (
    <div className={`group p-6 rounded-2xl shadow-lg border backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
      isDarkMode 
        ? 'bg-zinc-800/80 border-zinc-700/50 hover:border-zinc-600' 
        : 'bg-white/90 border-white/50 hover:border-zinc-200'
    }`}>
      {/* Job Header */}
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl ${
          isDarkMode ? 'bg-blue-600/20' : 'bg-blue-100'
        }`}>
          <Briefcase className="text-blue-500" size={24} />
        </div>
        <button className={`opacity-0 group-hover:opacity-100 p-2 rounded-lg transition-all duration-200 ${
          isDarkMode ? 'hover:bg-zinc-700' : 'hover:bg-zinc-100'
        }`}>
          <ExternalLink size={16} className={isDarkMode ? 'text-zinc-400' : 'text-zinc-600'} />
        </button>
      </div>

      {/* Job Details */}
      <div className="mb-4">
        <h4 className={`text-xl font-semibold mb-2 group-hover:text-blue-500 transition-colors ${
          isDarkMode ? 'text-zinc-100' : 'text-zinc-800'
        }`}>
          {job.title}
        </h4>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Building2 size={16} className={isDarkMode ? 'text-zinc-400' : 'text-zinc-500'} />
            <span className={`text-sm ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
              {job.company}
            </span>
          </div>
          
          {job.location && (
            <div className="flex items-center gap-2">
              <MapPin size={16} className={isDarkMode ? 'text-zinc-400' : 'text-zinc-500'} />
              <span className={`text-sm ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                {job.location}
              </span>
            </div>
          )}

          {job.appliedDate && (
            <div className="flex items-center gap-2">
              <Clock size={16} className={isDarkMode ? 'text-zinc-400' : 'text-zinc-500'} />
              <span className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Applied {job.appliedDate}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Job Status/Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-opacity-20 border-zinc-300">
        {userType === "user" ? (
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            job.status === 'accepted' ? 'bg-green-100 text-green-700' :
            job.status === 'rejected' ? 'bg-red-100 text-red-700' :
            job.status === 'interview' ? 'bg-blue-100 text-blue-700' :
            isDarkMode ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-100 text-yellow-700'
          }`}>
            {job.status || 'Pending'}
          </span>
        ) : (
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            isDarkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-700'
          }`}>
            {job.applicants || 0} applicants
          </span>
        )}
        
        <div className="flex gap-2">
          <button className={`p-2 rounded-lg transition-colors ${
            isDarkMode ? 'hover:bg-zinc-700' : 'hover:bg-zinc-100'
          }`}>
            <Award size={16} className={isDarkMode ? 'text-zinc-400' : 'text-zinc-600'} />
          </button>
          {userType === "employer" && (
            <button className={`p-2 rounded-lg transition-colors ${
              isDarkMode ? 'hover:bg-zinc-700' : 'hover:bg-zinc-100'
            }`}>
              <Settings size={16} className={isDarkMode ? 'text-zinc-400' : 'text-zinc-600'} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};