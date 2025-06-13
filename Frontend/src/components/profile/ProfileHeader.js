import { UserCircle } from 'lucide-react';

export const ProfileHeader = ({ isDarkMode, userType }) => {
  return (
    <div className="text-center mb-10 sm:mb-12 px-4 sm:px-6 relative">
      {/* Gradient blur background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-indigo-600/20 rounded-3xl blur-3xl"></div>
      
      {/* Content */}
      <div className="relative z-10">
        <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r ${
          isDarkMode 
            ? 'from-blue-400 via-purple-400 to-indigo-400' 
            : 'from-blue-600 via-purple-600 to-indigo-600'
        } bg-clip-text text-transparent`}>
          {userType === "user" ? "Your Profile" : "Company Dashboard"}
        </h1>

        <p className={`text-base sm:text-lg ${
          isDarkMode ? 'text-zinc-400' : 'text-zinc-600'
        }`}>
          {userType === "user" 
            ? "Manage your career journey and track applications" 
            : "Oversee your job postings and company presence"
          }
        </p>
      </div>
    </div>
  );
};
