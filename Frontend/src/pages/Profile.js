import { useEffect, useState } from 'react';
import { getUser, getEmployer } from '../ConfigAPI';
import { UserCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  ProfileHeader, 
  ProfileCard, 
  ProfileTabs, 
  ApplicationsTab, 
  SavedJobsTab, 
  SettingsTab 
} from '../components/profile';

const Profile = ({ isDarkMode, userType }) => {
  const [user, setUser] = useState({});
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [activeTab, setActiveTab] = useState('applications');

  const getUserData = async () => {
    try {
      const userData = await getUser();
      setUser(userData || {});
      setAppliedJobs(userData.appliedJobs || []);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const getEmployerData = async () => {
    try {
      const employerData = await getEmployer();
      setUser(employerData || {});
      setAppliedJobs(employerData.postedJobs || []);
    } catch (error) {
      console.error("Error fetching employer data:", error);
      setUser({});
    }
  };

  const updateUser = (updatedData) => {
    setUser(updatedData);
    // API call to update user would go here
  };

  useEffect(() => {
    if (userType === "user") getUserData();
    else if (userType === "employer") getEmployerData();
  }, [userType]);

  if (!userType) {
    return (
      <div className={`min-h-screen flex items-center justify-center px-4 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900' 
          : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50'
      }`}>
        <div className={`w-full max-w-md p-6 sm:p-8 rounded-3xl text-center ${
          isDarkMode 
            ? 'bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50' 
            : 'bg-white/80 backdrop-blur-sm border border-white/50 shadow-xl'
        }`}>
          <UserCircle size={80} className={`mx-auto mb-6 ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`} />
          <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-zinc-200' : 'text-zinc-800'}`}>
            Access Required
          </h2>
          <p className={`${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'} mb-6`}>
            Please log in to view your profile and manage your jobs.
          </p>
          <Link to="/signin">
            <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
              Sign In
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-zinc-900' : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50'}`}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <ProfileHeader isDarkMode={isDarkMode} userType={userType} />

        {/* Profile Card */}
        <ProfileCard 
          user={user} 
          isDarkMode={isDarkMode} 
          appliedJobs={appliedJobs} 
          userType={userType}
          updateUser={updateUser}
        />

        {/* Tabs */}
        <div className="mt-6">
          <ProfileTabs 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            isDarkMode={isDarkMode} 
            userType={userType}
          />
        </div>

        {/* Tab Content */}
        <div className="mt-6 w-full max-w-6xl mx-auto px-2 sm:px-4">
          {activeTab === 'applications' ? (
            <ApplicationsTab 
              appliedJobs={appliedJobs} 
              isDarkMode={isDarkMode} 
              userType={userType}
            />
          ) : activeTab === 'saved' ? (
            <SavedJobsTab isDarkMode={isDarkMode} />
          ) : (
            <SettingsTab isDarkMode={isDarkMode} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
