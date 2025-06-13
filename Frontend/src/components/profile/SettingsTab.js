import { FileText, Plus } from 'lucide-react';

export const SettingsTab = ({ isDarkMode }) => {
  return (
    <div className={`p-8 rounded-3xl ${
      isDarkMode ? 'bg-zinc-800/50' : 'bg-white/50'
    }`}>
      <h3 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-zinc-100' : 'text-zinc-800'}`}>
        Account Settings
      </h3>
      
      <div className="space-y-6">
        <div>
          <h4 className={`text-lg font-medium mb-4 ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
            Notification Preferences
          </h4>
          <div className={`p-4 rounded-xl ${
            isDarkMode ? 'bg-zinc-700/50' : 'bg-zinc-100/50'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className={isDarkMode ? 'text-zinc-200' : 'text-zinc-800'}>Email Notifications</p>
                <p className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  Receive important updates via email
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className={`w-11 h-6 rounded-full peer ${
                  isDarkMode 
                    ? 'bg-zinc-600 peer-checked:bg-blue-500' 
                    : 'bg-zinc-300 peer-checked:bg-blue-500'
                } peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className={isDarkMode ? 'text-zinc-200' : 'text-zinc-800'}>Push Notifications</p>
                <p className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  Get real-time updates on your device
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className={`w-11 h-6 rounded-full peer ${
                  isDarkMode 
                    ? 'bg-zinc-600 peer-checked:bg-blue-500' 
                    : 'bg-zinc-300 peer-checked:bg-blue-500'
                } peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
              </label>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className={`text-lg font-medium mb-4 ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
            Security
          </h4>
          <div className={`p-4 rounded-xl ${
            isDarkMode ? 'bg-zinc-700/50' : 'bg-zinc-100/50'
          }`}>
            <button className={`w-full text-left py-3 px-4 rounded-lg mb-2 ${
              isDarkMode ? 'hover:bg-zinc-600/50' : 'hover:bg-zinc-200/50'
            }`}>
              <p className={isDarkMode ? 'text-zinc-200' : 'text-zinc-800'}>Change Password</p>
            </button>
            <button className={`w-full text-left py-3 px-4 rounded-lg ${
              isDarkMode ? 'hover:bg-zinc-600/50' : 'hover:bg-zinc-200/50'
            }`}>
              <p className={isDarkMode ? 'text-zinc-200' : 'text-zinc-800'}>Two-Factor Authentication</p>
              <p className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Add an extra layer of security to your account
              </p>
            </button>
          </div>
        </div>
        
        <div>
          <h4 className={`text-lg font-medium mb-4 ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
            Documents
          </h4>
          <div className={`p-4 rounded-xl ${
            isDarkMode ? 'bg-zinc-700/50' : 'bg-zinc-100/50'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className={isDarkMode ? 'text-zinc-200' : 'text-zinc-800'}>Resume</p>
                <p className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  Last updated 2 weeks ago
                </p>
              </div>
              <button className={`px-4 py-2 rounded-lg ${
                isDarkMode ? 'bg-zinc-600 hover:bg-zinc-500' : 'bg-zinc-200 hover:bg-zinc-300'
              }`}>
                <FileText size={16} className={isDarkMode ? 'text-zinc-300' : 'text-zinc-700'} />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className={isDarkMode ? 'text-zinc-200' : 'text-zinc-800'}>Cover Letter</p>
                <p className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  Not uploaded yet
                </p>
              </div>
              <button className={`px-4 py-2 rounded-lg ${
                isDarkMode ? 'bg-zinc-600 hover:bg-zinc-500' : 'bg-zinc-200 hover:bg-zinc-300'
              }`}>
                <Plus size={16} className={isDarkMode ? 'text-zinc-300' : 'text-zinc-700'} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};