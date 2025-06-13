import { UserCircle, Mail, Phone, Globe, Edit3 } from 'lucide-react';
import { useState } from 'react';

export const ProfileCard = ({ user, isDarkMode, appliedJobs, userType, updateUser }) => {
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState(user);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const saveProfileChanges = () => {
    updateUser(profileData);
    setEditMode(false);
  };

  const cancelEdit = () => {
    setProfileData(user);
    setEditMode(false);
  };

  return (
    <div className={`max-w-4xl mx-auto mb-12 p-4 sm:p-6 md:p-8 rounded-3xl shadow-2xl border backdrop-blur-sm ${
      isDarkMode 
        ? 'bg-zinc-800/80 border-zinc-700/50' 
        : 'bg-white/90 border-white/50'
    }`}>
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 sm:gap-8">
        {/* Profile Image Section */}
        <div className="relative group">
          {user.profileImage ? (
            <img
              src={user.profileImage}
              alt="Profile"
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover border-4 border-gradient-to-r from-blue-500 to-purple-500 shadow-xl group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className={`w-28 h-28 sm:w-32 sm:h-32 rounded-2xl flex items-center justify-center border-4 ${
              isDarkMode ? 'border-zinc-600 bg-zinc-700/50' : 'border-zinc-300 bg-zinc-100'
            } group-hover:scale-105 transition-transform duration-300`}>
              <UserCircle size={72} className={isDarkMode ? 'text-zinc-500' : 'text-zinc-400'} />
            </div>
          )}
          <button 
            onClick={() => setEditMode(!editMode)}
            className={`absolute -bottom-3 -right-3 p-2 rounded-full shadow-lg ${
              isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
            } text-white transition-colors duration-200`}>
            <Edit3 size={16} />
          </button>
        </div>

        {/* Profile Info */}
        <div className="flex-1 text-center sm:text-left">
          {editMode ? (
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                value={profileData.name || ""}
                onChange={handleInputChange}
                placeholder="Full Name"
                className={`w-full p-3 rounded-xl text-lg font-semibold ${
                  isDarkMode 
                    ? 'bg-zinc-700/50 text-zinc-100 border-zinc-600' 
                    : 'bg-white text-zinc-800 border-zinc-300'
                } border`}
              />
              <input
                type="email"
                name="email"
                value={profileData.email || ""}
                onChange={handleInputChange}
                placeholder="Email Address"
                className={`w-full p-2 rounded-lg ${
                  isDarkMode 
                    ? 'bg-zinc-700/50 text-zinc-100 border-zinc-600' 
                    : 'bg-white text-zinc-800 border-zinc-300'
                } border`}
              />
              <input
                type="tel"
                name="phone"
                value={profileData.phone || ""}
                onChange={handleInputChange}
                placeholder="Phone Number"
                className={`w-full p-2 rounded-lg ${
                  isDarkMode 
                    ? 'bg-zinc-700/50 text-zinc-100 border-zinc-600' 
                    : 'bg-white text-zinc-800 border-zinc-300'
                } border`}
              />
              <div className="flex flex-wrap gap-3 justify-end">
                <button 
                  onClick={cancelEdit}
                  className={`px-4 py-2 rounded-lg ${
                    isDarkMode 
                      ? 'bg-zinc-700 hover:bg-zinc-600 text-zinc-300' 
                      : 'bg-zinc-200 hover:bg-zinc-300 text-zinc-800'
                  }`}>
                  Cancel
                </button>
                <button 
                  onClick={saveProfileChanges}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                  Save
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <h2 className={`text-2xl sm:text-3xl font-bold mb-2 ${isDarkMode ? 'text-zinc-100' : 'text-zinc-800'}`}>
                  {user.name || "Your Name"}
                </h2>
                <div className="flex items-center gap-2 justify-center sm:justify-start mb-1">
                  <Mail size={16} className={isDarkMode ? 'text-zinc-400' : 'text-zinc-500'} />
                  <p className={`${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    {user.email || "email@example.com"}
                  </p>
                </div>
                {user.phone && (
                  <div className="flex items-center gap-2 justify-center sm:justify-start mb-1">
                    <Phone size={16} className={isDarkMode ? 'text-zinc-400' : 'text-zinc-500'} />
                    <p className={`${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                      {user.phone}
                    </p>
                  </div>
                )}
                {user.website && (
                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    <Globe size={16} className={isDarkMode ? 'text-zinc-400' : 'text-zinc-500'} />
                    <a href={user.website} className="text-blue-500 hover:text-blue-600 transition-colors" target="_blank" rel="noopener noreferrer">
                      {user.website}
                    </a>
                  </div>
                )}
              </div>

              {/* Stats Row */}
              <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
                <div className={`px-4 py-2 rounded-xl ${
                  isDarkMode ? 'bg-zinc-700/50' : 'bg-zinc-100'
                }`}>
                  <div className="text-xl sm:text-2xl font-bold text-blue-500">
                    {appliedJobs.length}
                  </div>
                  <div className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    {userType === "user" ? "Applications" : "Posted Jobs"}
                  </div>
                </div>
                {userType === "user" && (
                  <div className={`px-4 py-2 rounded-xl ${
                    isDarkMode ? 'bg-zinc-700/50' : 'bg-zinc-100'
                  }`}>
                    <div className="text-xl sm:text-2xl font-bold text-green-500">
                      {Math.floor(appliedJobs.length * 0.3)}
                    </div>
                    <div className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                      Interviews
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
