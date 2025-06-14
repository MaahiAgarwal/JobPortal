import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import Companies from './pages/Companies';
import CommunityPage from './pages/CommunityPage';
import AllJobs from './pages/AllJobs';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import JobPostingPage from './pages/JobPostingPage';
import Loading from './components/Layout/Loading';
import ApplyJob from './pages/ApplyJob';
import ChatbotTailwind from './components/Chatbot/ChatbotTailwind';
import { JobChatbotProvider } from './components/Chatbot/JobChatbotContext';
import { logout } from './ConfigAPI';
import Profile from './pages/Profile';
import MouseOverlay from './components/Layout/MouseOverlay';


function App() {
    const storedTheme = localStorage.getItem('isDarkMode');
    const initialTheme = storedTheme ? JSON.parse(storedTheme) : false;
    const [isDarkMode, setIsDarkMode] = useState(initialTheme);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [userType, setUserType] = useState(null);

    const toggleTheme = () => {
        const newTheme = !isDarkMode;
        setIsDarkMode(newTheme);
        localStorage.setItem('isDarkMode', JSON.stringify(newTheme));
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                console.log("Loaded user from localStorage:", parsedUser);
                setUser(parsedUser);
                setUserType(parsedUser.userType);
            } catch (error) {
                console.error("Error parsing user from localStorage:", error);
                localStorage.removeItem('user');
            }
        }
    },[])

    const handleLogin = (userData) => {
        console.log("User data: ", userData); 
        setUser(userData);
        setUserType(userData.userType);
    };

    const handleLogout = async (userType) => {
        try {
            if (!userType) {
                console.error("No user type provided for logout");
                return;
            }
            console.log("User type in logout: ", userType);
            const response = await logout(userType);
            if (response && response.status === 200) {
                localStorage.removeItem('user');
                setUser(null);
                setUserType(null);
            } else {
                console.error("Logout failed:", response);
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    return (
        <Router>
            <JobChatbotProvider>
                <div className={`min-h-screen ${isDarkMode ? 'dark bg-zinc-900 text-white' : 'bg-white text-black'} relative overflow-hidden`}>
                    {loading && <Loading isDarkMode={isDarkMode} />}
                    
                    <div className="flex flex-col min-h-screen">
                        <Navbar
                            isDarkMode={isDarkMode}
                            toggleTheme={toggleTheme}
                            user={user}
                            userType={userType}
                            logout={handleLogout}
                        />
                        <main className="flex-grow md:ml-64 mr-4 pl-4 pt-20 sm:pt-24 relative z-10">
                            <MouseOverlay isDarkMode={isDarkMode} />
                            <Routes>
                                <Route path="/" element={<Home isDarkMode={isDarkMode} user={user} />} />
                                <Route path="/companies" element={<Companies isDarkMode={isDarkMode} />} />
                                <Route path="/community-page" element={<CommunityPage isDarkMode={isDarkMode} user={user} />} />
                                <Route path="/job-posting-page" element={<JobPostingPage isDarkMode={isDarkMode} />} />
                                <Route path="/all-jobs" element={<AllJobs isDarkMode={isDarkMode} user={user} />} />
                                <Route path="/signin" element={<SignIn isDarkMode={isDarkMode} onLogin={handleLogin} />} />
                                <Route path="/signup" element={<SignUp isDarkMode={isDarkMode} />} />
                                <Route path="/apply-job/:id" element={<ApplyJob isDarkMode={isDarkMode} user={user} />} />
                                <Route path="/profile" element={<Profile isDarkMode={isDarkMode} userType={userType}/>} />
                            </Routes>
                        </main>
                        <Footer isDarkMode={isDarkMode} />
                    </div>
                    <ChatbotTailwind isDarkMode={isDarkMode} user={user} />
                </div>
            </JobChatbotProvider>
        </Router>
    );
}


export default App;