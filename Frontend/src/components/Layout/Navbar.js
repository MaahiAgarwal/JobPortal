import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Sun,
    Moon,
    Menu,
    X,
    Home,
    Building2,
    Briefcase,
    Users2,
    NotebookText,
    LogIn,
    UserPlus2,
    UserRound,
    Landmark,
    Network,
    FileEdit,
    SearchCheck,
    LogOut,
    AlertTriangle,
    Users,
    MessageCircle,
    Search,
    Bell,
    Check,
    Trash2,
    MapPin
} from "lucide-react";
import {
  jobTitles,
  cities,
  sampleNotifications
} from "../../constants/constants";

const Navbar = ({ isDarkMode, toggleTheme, user, logout }) => {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [notifications, setNotifications] = useState(sampleNotifications);
    const [filteredResults, setFilteredResults] = useState([]);

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.length > 0) {
            const matchedJobs = jobTitles.filter(job =>
                job.toLowerCase().includes(query.toLowerCase())
            );
            const matchedCities = cities.filter(city =>
                city.toLowerCase().includes(query.toLowerCase())
            );

            setFilteredResults([
                ...matchedJobs.map(job => ({ type: 'job', text: job })),
                ...matchedCities.map(city => ({ type: 'location', text: city }))
            ]);
            setShowSearchResults(true);
        } else {
            setFilteredResults([]);
            setShowSearchResults(false);
        }
    };

    const handleResultClick = (result) => {
        if (result.type === 'job') {
            navigate(`/all-jobs?search=${encodeURIComponent(result.text)}`);
        } else {
            navigate(`/all-jobs?location=${encodeURIComponent(result.text)}`);
        }
        setShowSearchResults(false);
        setSearchQuery('');
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery) {
            navigate(`/all-jobs?search=${encodeURIComponent(searchQuery)}`);
            setShowSearchResults(false);
            setSearchQuery('');
        }
    };

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setIsSidebarOpen(false);

    const getInitials = (name) => {
        const parts = name.split(" ");
        return parts
            .map((n) => n[0])
            .join("")
            .toUpperCase();
    };

    const handleLogoutClick = () => {
        setShowLogoutConfirm(true);
        setIsDropdownOpen(false);
    };

    const confirmLogout = () => {
        logout(user.userType);
        setShowLogoutConfirm(false);
    };

    const cancelLogout = () => {
        setShowLogoutConfirm(false);
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    const markAsRead = (id) => {
        setNotifications(notifications.map(notif =>
            notif.id === id ? { ...notif, read: true } : notif
        ));
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map(notif => ({ ...notif, read: true })));
    };

    const deleteNotification = (id) => {
        setNotifications(notifications.filter(notif => notif.id !== id));
    };

    const getNotificationColor = (type) => {
        switch (type) {
            case 'job':
                return 'text-green-500 dark:text-green-400';
            case 'application':
                return 'text-blue-500 dark:text-blue-400';
            case 'interview':
                return 'text-purple-500 dark:text-purple-400';
            default:
                return 'text-gray-500 dark:text-gray-400';
        }
    };

    const glassEffect = isDarkMode
        ? "bg-zinc-900/80 backdrop-blur-lg border-zinc-700/30 shadow-xl shadow-zinc-900/20"
        : "bg-white/85 backdrop-blur-lg border-zinc-200/30 shadow-xl shadow-zinc-300/10";

    const SidebarLinks = () => (
        <div className="p-4 space-y-2">
            <Link
                to="/"
                onClick={closeSidebar}
                className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ease-out hover:bg-opacity-50 group ${
                    isDarkMode
                        ? "hover:bg-zinc-800/50 text-zinc-200"
                        : "hover:bg-zinc-100/70 text-zinc-800"
                }`}
            >
                <div className={`p-2 rounded-lg transition-all duration-200 group-hover:bg-blue-500/10 ${
                    isDarkMode ? "bg-zinc-800/40" : "bg-zinc-100/60"
                }`}>
                    <Home size={20} className="text-blue-500 dark:text-blue-400" />
                </div>
                <span className="font-medium">Home</span>
            </Link>

            <Link
                to="/companies"
                onClick={closeSidebar}
                className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ease-out hover:bg-opacity-50 group ${
                    isDarkMode
                        ? "hover:bg-zinc-800/50 text-zinc-200"
                        : "hover:bg-zinc-100/70 text-zinc-800"
                }`}
            >
                <div className={`p-2 rounded-lg transition-all duration-200 group-hover:bg-purple-500/10 ${
                    isDarkMode ? "bg-zinc-800/40" : "bg-zinc-100/60"
                }`}>
                    <Building2 size={20} className="text-purple-500 dark:text-purple-400" />
                </div>
                <span className="font-medium">Companies</span>
            </Link>

            {user && (
                <Link
                    to="/community-page"
                    onClick={closeSidebar}
                    className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ease-out hover:bg-opacity-50 group ${
                        isDarkMode
                            ? "hover:bg-zinc-800/50 text-zinc-200"
                            : "hover:bg-zinc-100/70 text-zinc-800"
                    }`}
                >
                    <div className={`p-2 rounded-lg transition-all duration-200 group-hover:bg-green-500/10 ${
                        isDarkMode ? "bg-zinc-800/40" : "bg-zinc-100/60"
                    }`}>
                        <Network size={20} className="text-green-500 dark:text-green-400" />
                    </div>
                    <span className="font-medium">Community</span>
                </Link>
            )}

            {user?.userType === "employer" && (
                <Link
                    to="/job-posting-page"
                    onClick={closeSidebar}
                    className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ease-out hover:bg-opacity-50 group ${
                        isDarkMode
                            ? "hover:bg-zinc-800/50 text-zinc-200"
                            : "hover:bg-zinc-100/70 text-zinc-800"
                    }`}
                >
                    <div className={`p-2 rounded-lg transition-all duration-200 group-hover:bg-orange-500/10 ${
                        isDarkMode ? "bg-zinc-800/40" : "bg-zinc-100/60"
                    }`}>
                        <FileEdit size={20} className="text-orange-500 dark:text-orange-400" />
                    </div>
                    <span className="font-medium">Post Job</span>
                </Link>
            )}

            <Link
                to="/all-jobs"
                onClick={closeSidebar}
                className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ease-out hover:bg-opacity-50 group ${
                    isDarkMode
                        ? "hover:bg-zinc-800/50 text-zinc-200"
                        : "hover:bg-zinc-100/70 text-zinc-800"
                }`}
            >
                <div className={`p-2 rounded-lg transition-all duration-200 group-hover:bg-pink-500/10 ${
                    isDarkMode ? "bg-zinc-800/40" : "bg-zinc-100/60"
                }`}>
                    <SearchCheck size={20} className="text-pink-500 dark:text-pink-400" />
                </div>
                <span className="font-medium">All Jobs</span>
            </Link>

            <button
                onClick={toggleTheme}
                className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ease-out hover:bg-opacity-50 group ${
                    isDarkMode
                        ? "hover:bg-zinc-800/50 text-zinc-200"
                        : "hover:bg-zinc-100/70 text-zinc-800"
                }`}
            >
                <div className={`p-2 rounded-lg transition-all duration-200 group-hover:bg-indigo-500/10 ${
                    isDarkMode ? "bg-zinc-800/40" : "bg-zinc-100/60"
                }`}>
                    {isDarkMode ? (
                        <Sun size={20} className="text-yellow-400" />
                    ) : (
                        <Moon size={20} className="text-indigo-500" />
                    )}
                </div>
                <span className="font-medium">Toggle Theme</span>
            </button>

            <div className={`mt-4 pt-4 border-t ${
                isDarkMode ? "border-zinc-800/50" : "border-zinc-200/50"
            }`}>
                {user ? (
                    <button
                        onClick={handleLogoutClick}
                        className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ease-out hover:bg-opacity-50 group ${
                            isDarkMode
                                ? "hover:bg-zinc-800/50 text-red-400"
                                : "hover:bg-zinc-100/70 text-red-500"
                        }`}
                    >
                        <div className={`p-2 rounded-lg transition-all duration-200 group-hover:bg-red-500/10 ${
                            isDarkMode ? "bg-zinc-800/40" : "bg-zinc-100/60"
                        }`}>
                            <LogOut size={20} className="text-red-500 dark:text-red-400" />
                        </div>
                        <span className="font-medium">Logout</span>
                    </button>
                ) : (
                    <>
                        <Link
                            to="/signin"
                            onClick={closeSidebar}
                            className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ease-out hover:bg-opacity-50 group ${
                                isDarkMode
                                    ? "hover:bg-zinc-800/50 text-blue-400"
                                    : "hover:bg-zinc-100/70 text-blue-500"
                            }`}
                        >
                            <div className={`p-2 rounded-lg transition-all duration-200 group-hover:bg-blue-500/10 ${
                                isDarkMode ? "bg-zinc-800/40" : "bg-zinc-100/60"
                            }`}>
                                <LogIn size={20} className="text-blue-500 dark:text-blue-400" />
                            </div>
                            <span className="font-medium">Sign In</span>
                        </Link>
                        <Link
                            to="/signup"
                            onClick={closeSidebar}
                            className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ease-out hover:bg-opacity-50 group ${
                                isDarkMode
                                    ? "hover:bg-zinc-800/50 text-blue-400"
                                    : "hover:bg-zinc-100/70 text-blue-500"
                            }`}
                        >
                            <div className={`p-2 rounded-lg transition-all duration-200 group-hover:bg-blue-500/10 ${
                                isDarkMode ? "bg-zinc-800/40" : "bg-zinc-100/60"
                            }`}>
                                <UserPlus2 size={20} className="text-blue-500 dark:text-blue-400" />
                            </div>
                            <span className="font-medium">Sign Up</span>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );

    const handleProfileClick = (e) => {
        e.preventDefault()
        if(user){
            navigate(`/profile`);
        }
    }

    return (
        <>
            {/* Logout Confirmation Dialog */}
            {showLogoutConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className={`w-full max-w-md rounded-2xl p-6 ${isDarkMode ? "bg-zinc-800/95" : "bg-white/95"} border ${
                        isDarkMode ? "border-zinc-700/50" : "border-zinc-200/50"
                    } shadow-2xl`}>
                        <div className="flex flex-col items-center space-y-4">
                            <div className="p-3 rounded-full bg-red-100/80 dark:bg-red-900/30">
                                <AlertTriangle size={40} className="text-red-500 dark:text-red-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-center">
                                Confirm Logout
                            </h3>
                            <p className="text-center text-zinc-600 dark:text-zinc-300">
                                Are you sure you want to log out of your account?
                            </p>
                            <div className="flex w-full space-x-3 pt-4">
                                <button
                                    onClick={cancelLogout}
                                    className={`flex-1 py-2.5 px-4 rounded-xl font-medium transition-colors ${
                                        isDarkMode
                                            ? "bg-zinc-700/80 hover:bg-zinc-600/80 text-white"
                                            : "bg-zinc-200/80 hover:bg-zinc-300/80 text-zinc-800"
                                    }`}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmLogout}
                                    className="flex-1 py-2.5 px-4 bg-red-500/90 hover:bg-red-600/90 text-white rounded-xl font-medium transition-colors"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Navbar */}
            <nav className={`fixed top-0 left-0 right-0 z-40 border-b ${glassEffect}`}>
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex items-center justify-between h-16">
                        {/* Left Section: Logo and Brand */}
                        <div className="flex items-center gap-3">
                            <button
                                onClick={toggleSidebar}
                                className={`md:hidden p-2 rounded-lg transition-all ${
                                    isDarkMode
                                        ? "text-zinc-300 hover:bg-zinc-800/50"
                                        : "text-zinc-600 hover:bg-zinc-100/70"
                                }`}
                            >
                                <Menu size={22} />
                            </button>
                            <Link to="/" className="flex items-center gap-2">
                                <span className={`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${
                                    isDarkMode
                                        ? "from-indigo-400 to-purple-400"
                                        : "from-indigo-600 to-purple-600"
                                }`}>
                                    HireMe
                                </span>
                            </Link>
                        </div>

                        {/* Center Section: Search Bar */}
                        <div className="hidden md:block max-w-xl w-full mx-8">
                            <div className="relative w-full">
                                <form onSubmit={handleSearchSubmit}>
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                        placeholder="Search for jobs, locations..."
                                        className={`w-full h-10 pl-10 pr-4 rounded-xl transition-all duration-200 focus:ring-2 focus:ring-opacity-50 ${
                                            isDarkMode
                                                ? "bg-zinc-800/50 text-zinc-200 placeholder-zinc-400 focus:ring-indigo-500"
                                                : "bg-zinc-100/50 text-zinc-900 placeholder-zinc-500 focus:ring-indigo-400"
                                        }`}
                                    />
                                    <Search className={`absolute left-3 top-2.5 w-5 h-5 ${
                                        isDarkMode ? "text-zinc-400" : "text-zinc-500"
                                    }`} />
                                </form>

                                {/* Search Results Dropdown */}
                                {showSearchResults && filteredResults.length > 0 && (
                                    <div className={`absolute left-0 right-0 mt-2 py-2 rounded-xl shadow-xl ${glassEffect} border max-h-96 overflow-y-auto z-50`}>
                                        {filteredResults.map((result, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleResultClick(result)}
                                                className={`w-full px-4 py-2.5 text-left flex items-center gap-3 transition-colors ${
                                                    isDarkMode
                                                        ? "hover:bg-zinc-700/50"
                                                        : "hover:bg-zinc-100/50"
                                                }`}
                                            >
                                                {result.type === 'job' ? (
                                                    <Briefcase className="w-4 h-4 text-indigo-500" />
                                                ) : (
                                                    <MapPin className="w-4 h-4 text-indigo-500" />
                                                )}
                                                <span className={`text-sm ${
                                                    isDarkMode ? "text-zinc-200" : "text-zinc-800"
                                                }`}>
                                                    {result.text}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Section: Actions */}
                        <div className="flex items-center gap-3">
                            <button
                                onClick={toggleTheme}
                                className={`p-2 rounded-lg transition-all ${
                                    isDarkMode
                                        ? "text-yellow-400 hover:bg-zinc-800/50"
                                        : "text-zinc-600 hover:bg-zinc-100/70"
                                }`}
                            >
                                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                            </button>

                            {user ? (
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setShowNotifications(!showNotifications)}
                                        className={`relative p-2 rounded-lg transition-all ${
                                            isDarkMode
                                                ? "text-zinc-300 hover:bg-zinc-800/50"
                                                : "text-zinc-600 hover:bg-zinc-100/70"
                                        }`}
                                    >
                                        <Bell size={20} />
                                        {unreadCount > 0 && (
                                            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500"></span>
                                        )}
                                    </button>
                                    {showNotifications && (
                                        <div className={`absolute right-4 mt-2 w-80 rounded-xl shadow-xl py-2 ${glassEffect} border top-14`}>
                                            <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-200/10">
                                                <h3 className={`font-medium ${
                                                    isDarkMode ? 'text-zinc-200' : 'text-zinc-800'
                                                }`}>
                                                    Notifications
                                                </h3>
                                                {unreadCount > 0 && (
                                                    <button
                                                        onClick={markAllAsRead}
                                                        className="text-xs text-indigo-500 hover:text-indigo-400 transition-colors"
                                                    >
                                                        Mark all as read
                                                    </button>
                                                )}
                                            </div>
                                            <div className="max-h-80 overflow-y-auto">
                                                {notifications.length > 0 ? (
                                                    notifications.map((notif) => (
                                                        <div
                                                            key={notif.id}
                                                            className={`px-4 py-3 flex items-start gap-3 transition-colors ${
                                                                !notif.read ? (isDarkMode ? 'bg-zinc-800/30' : 'bg-zinc-100/50') : ''
                                                            } ${
                                                                isDarkMode
                                                                    ? 'hover:bg-zinc-700/50'
                                                                    : 'hover:bg-zinc-100/70'
                                                            }`}
                                                        >
                                                            <div className={`flex-1 ${!notif.read ? 'font-medium' : ''}`}>
                                                                <p className={`text-sm ${getNotificationColor(notif.type)}`}>
                                                                    {notif.message}
                                                                </p>
                                                                <p className="text-xs text-zinc-500 mt-1">
                                                                    {notif.time}
                                                                </p>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                {!notif.read && (
                                                                    <button
                                                                        onClick={() => markAsRead(notif.id)}
                                                                        className="p-1 text-indigo-500 hover:text-indigo-400 transition-colors"
                                                                        title="Mark as read"
                                                                    >
                                                                        <Check size={14} />
                                                                    </button>
                                                                )}
                                                                <button
                                                                    onClick={() => deleteNotification(notif.id)}
                                                                    className="p-1 text-zinc-500 hover:text-red-500 transition-colors"
                                                                    title="Delete notification"
                                                                >
                                                                    <Trash2 size={14} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="px-4 py-3 text-sm text-zinc-500 text-center">
                                                        No notifications
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                    <div className="relative">
                                        <button 
                                            onClick={handleProfileClick}
                                            className="flex items-center gap-2 p-1 rounded-lg transition-all hover:bg-zinc-800/50 dark:hover:bg-zinc-100/30"
                                        >
                                            <img
                                                src={user.profileImage || "https://randomuser.me/api/portraits/men/1.jpg"}
                                                alt="Profile"
                                                className="w-8 h-8 rounded-lg object-cover ring-2 ring-indigo-500/30"
                                            />
                                            <span className={`hidden sm:block font-medium ${
                                                isDarkMode ? "text-zinc-200" : "text-zinc-800"
                                            }`}>
                                                {user.name || "User"}
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center gap-3">
                                    <Link
                                        to="/signin"
                                        className={`px-3 py-2 rounded-lg font-medium text-sm transition-all ${
                                            isDarkMode
                                                ? "text-zinc-200 hover:bg-zinc-800/50"
                                                : "text-zinc-800 hover:bg-zinc-100/70"
                                        }`}
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        to="/signup"
                                        className="px-3 py-2 rounded-lg font-medium text-sm text-white bg-gradient-to-r from-indigo-500 to-purple-500 transition-all hover:shadow-lg hover:shadow-indigo-500/20"
                                    >
                                        Sign Up
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full w-72 transform ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-300 ease-in-out z-30 md:hidden ${glassEffect} border-r shadow-2xl`}
            >
                <div className={`flex justify-between items-center px-6 py-4 border-b ${
                    isDarkMode ? "border-zinc-800/50" : "border-zinc-200/50"
                }`}>
                    <div className="flex items-center space-x-3">
                        <Briefcase size={24} className="text-blue-500 dark:text-blue-400" />
                        <span className="text-xl font-semibold bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent">
                            HireMe
                        </span>
                    </div>
                    <button
                        onClick={toggleSidebar}
                        className="p-2 rounded-lg hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 transition-all"
                    >
                        <X size={24} className="text-zinc-500 dark:text-zinc-400" />
                    </button>
                </div>
                <SidebarLinks />
            </div>

            {/* Desktop Sidebar */}
            <div className={`hidden md:flex flex-col h-screen w-64 fixed top-0 left-0 z-30 pt-20 ${glassEffect} border-r shadow-2xl`}>
                <SidebarLinks />
            </div>

            {/* Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/30 backdrop-blur-sm z-20 md:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}
        </>
    );
};

export default Navbar;