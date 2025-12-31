import React, { useState, useEffect, useRef } from "react";
import { 
  Bell, 
  Search, 
  Settings, 
  User, 
  ChevronDown,
  Sun,
  Moon,
  X,
  Check
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationMenuOpen, setNotificationMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [userData, setUserData] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Refs for dropdown containers
  const userMenuRef = useRef(null);
  const notificationMenuRef = useRef(null);
  const notificationButtonRef = useRef(null);
  const userButtonRef = useRef(null);

  // Load user data and notifications
  useEffect(() => {
    fetchUserProfile();
    fetchNotifications();
    
    // Check dark mode preference
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside notification dropdown and not on notification button
      if (notificationMenuOpen && 
          notificationMenuRef.current && 
          !notificationMenuRef.current.contains(event.target) &&
          notificationButtonRef.current && 
          !notificationButtonRef.current.contains(event.target)) {
        setNotificationMenuOpen(false);
      }

      // Check if click is outside user dropdown and not on user button
      if (userMenuOpen && 
          userMenuRef.current && 
          !userMenuRef.current.contains(event.target) &&
          userButtonRef.current && 
          !userButtonRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [userMenuOpen, notificationMenuOpen]);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:33/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserData(response.data);
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  };

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:33/notifications', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(response.data);
      const unread = response.data.filter(notification => !notification.is_read).length;
      setUnreadCount(unread);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
      // Mock data for demo
      setNotifications([
        { 
          id: 1, 
          title: "Welcome!", 
          message: "Welcome to Employee Pro Dashboard", 
          is_read: false, 
          type: "info",
          created_at: new Date().toISOString()
        },
        { 
          id: 2, 
          title: "System Update", 
          message: "System maintenance scheduled for tomorrow at 2 AM", 
          is_read: true, 
          type: "warning",
          created_at: "2024-01-14T10:30:00"
        },
        { 
          id: 3, 
          title: "New Employee Added", 
          message: "John Doe has been added to the Sales department", 
          is_read: false, 
          type: "success",
          created_at: "2024-01-13T14:20:00"
        },
      ]);
      setUnreadCount(2);
    }
  };

  const toggleNotificationMenu = () => {
    // Toggle notification menu and close user menu if open
    setNotificationMenuOpen(prev => !prev);
    if (userMenuOpen) {
      setUserMenuOpen(false);
    }
  };

  const toggleUserMenu = () => {
    // Toggle user menu and close notification menu if open
    setUserMenuOpen(prev => !prev);
    if (notificationMenuOpen) {
      setNotificationMenuOpen(false);
    }
  };

  const closeNotificationMenu = () => {
    setNotificationMenuOpen(false);
  };

  const closeUserMenu = () => {
    setUserMenuOpen(false);
  };

  const markNotificationAsRead = async (id, e) => {
    // Prevent event from bubbling up to parent div (which would close the modal)
    if (e) e.stopPropagation();
    
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:33/notifications/${id}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Update local state
      setNotifications(notifications.map(notification =>
        notification.id === id ? { ...notification, is_read: true } : notification
      ));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  const markAllAsRead = async (e) => {
    // Prevent event from bubbling up to parent
    if (e) e.stopPropagation();
    
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:33/notifications/mark-all-read`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Update local state
      setNotifications(notifications.map(notification => ({ ...notification, is_read: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error);
    }
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'success': return '✅';
      case 'warning': return '⚠️';
      case 'error': return '❌';
      default: return 'ℹ️';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Search */}
          <div className="flex-1 flex items-center">
            <form onSubmit={handleSearch} className="relative max-w-md w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Search employees, reports..."
              />
            </form>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Notifications Button & Dropdown */}
            <div className="relative">
              <button
                ref={notificationButtonRef}
                onClick={toggleNotificationMenu}
                className="relative p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-900"></span>
                )}
              </button>
              
              {/* Notifications Modal/Dropdown */}
              {notificationMenuOpen && (
                <div 
                  ref={notificationMenuRef}
                  className="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 py-2 z-50"
                  onClick={(e) => e.stopPropagation()} // Prevent click inside from closing
                >
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Notifications</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {unreadCount} unread {unreadCount === 1 ? 'notification' : 'notifications'}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllAsRead}
                          className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 px-2 py-1 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-300"
                        >
                          Mark all as read
                        </button>
                      )}
                      <button
                        onClick={closeNotificationMenu}
                        className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
                        aria-label="Close notifications"
                      >
                        <X size={16} className="text-gray-500" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-300 border-b border-gray-100 dark:border-gray-800 cursor-pointer ${
                            !notification.is_read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                          }`}
                          onClick={(e) => markNotificationAsRead(notification.id, e)}
                        >
                          <div className="flex items-start">
                            <div className="mr-3 text-lg">
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <p className={`text-sm font-medium ${!notification.is_read ? 'text-blue-800 dark:text-blue-300' : 'text-gray-900 dark:text-white'}`}>
                                  {notification.title}
                                </p>
                                <div className="flex items-center">
                                  {notification.is_read && (
                                    <Check size={12} className="text-green-500 mr-1" />
                                  )}
                                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                                    {formatTime(notification.created_at)}
                                  </span>
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                {notification.message}
                              </p>
                            </div>
                          </div>
                          {!notification.is_read && (
                            <div className="flex items-center mt-2">
                              <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                              <span className="text-xs text-blue-600 dark:text-blue-400">New • Click to mark as read</span>
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-6 text-center">
                        <Bell size={32} className="mx-auto text-gray-400 mb-2" />
                        <p className="text-gray-500 dark:text-gray-400">No notifications</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                          You're all caught up!
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="border-t border-gray-100 dark:border-gray-800 pt-2">
                    <Link
                      to="/notifications"
                      onClick={closeNotificationMenu}
                      className="block px-4 py-3 text-sm text-center text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-300"
                    >
                      View all notifications
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Settings */}
            <Link
              to="/settings"
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
            >
              <Settings size={20} />
            </Link>

            {/* User Profile */}
            <div className="relative">
              <button
                ref={userButtonRef}
                onClick={toggleUserMenu}
                className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
              >
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    {userData?.avatar ? (
                      <img 
                        src={userData.avatar} 
                        alt={userData?.full_name} 
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <span className="text-white font-semibold">
                        {userData?.full_name?.charAt(0) || 'A'}
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {userData?.full_name || "Admin User"}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {userData?.role || "Administrator"}
                  </p>
                </div>
                <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${userMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* User Dropdown Menu */}
              {userMenuOpen && (
                <div 
                  ref={userMenuRef}
                  className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 py-2 z-50"
                  onClick={(e) => e.stopPropagation()} // Prevent click inside from closing
                >
                  <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Signed in as</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                          {userData?.email || "admin@example.com"}
                        </p>
                      </div>
                      <button
                        onClick={closeUserMenu}
                        className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
                        aria-label="Close menu"
                      >
                        <X size={14} className="text-gray-500" />
                      </button>
                    </div>
                  </div>
                  <Link
                    to="/profile"
                    onClick={closeUserMenu}
                    className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-300"
                  >
                    <User size={16} className="mr-3" />
                    Your Profile
                  </Link>
                  <Link
                    to="/settings"
                    onClick={closeUserMenu}
                    className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-300"
                  >
                    <Settings size={16} className="mr-3" />
                    Settings
                  </Link>
                  <div className="border-t border-gray-100 dark:border-gray-800 mt-2 pt-2">
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-300"
                    >
                      <span className="mr-3">🚪</span>
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    System Status: <span className="font-medium text-green-600 dark:text-green-500">Active</span>
                  </span>
                </div>
                <div className="hidden md:block">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Last sync: <span className="font-medium">Today, {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Link
                  to="/quick-actions"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-300"
                >
                  📋 Quick Actions
                </Link>
                <Link
                  to="/reports"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300 transition-colors duration-300"
                >
                  📈 View Reports
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}