import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { removeTokenFromLocalStorage } from '../Auth/token';
import useAuth from '../Provider/UseAuth/useAuth';
import image1 from '../assets/manager.png';
import { FaSearch, FaBell, FaCog, FaHome, FaUser, FaSignOutAlt, FaKey } from 'react-icons/fa';
import { MdNotifications, MdDashboard, MdSettings } from 'react-icons/md';

const Navber = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    removeTokenFromLocalStorage();
    navigate("/login");
    setUser(null);
  };

  const image = `${import.meta.env.VITE_API_URL}${"/"}${user?.manager?.profile}`;

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setIsOpen(false);
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Generate breadcrumbs based on current location
  const getBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(segment => segment);
    const breadcrumbs = [];

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/([A-Z])/g, ' $1');
      breadcrumbs.push({
        label,
        path: currentPath,
        isLast: index === pathSegments.length - 1
      });
    });

    return breadcrumbs;
  };

  // Mock notifications data
  useEffect(() => {
    setNotifications([
      {
        id: 1,
        title: 'New meal added',
        message: 'A new meal has been added to the system',
        time: '2 minutes ago',
        type: 'info'
      },
      {
        id: 2,
        title: 'Payment received',
        message: 'Payment of ৳500 has been received',
        time: '1 hour ago',
        type: 'success'
      },
      {
        id: 3,
        title: 'System maintenance',
        message: 'Scheduled maintenance in 2 hours',
        time: '3 hours ago',
        type: 'warning'
      }
    ]);
  }, []);

  const unreadNotifications = notifications.filter(n => !n.read).length;

  return (
    <header className="header">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Section - Breadcrumbs */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-secondary-600">
            <Link to="/" className="flex items-center space-x-1 hover:text-primary-600 transition-colors">
              <FaHome className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>

            {getBreadcrumbs().map((breadcrumb, index) => (
              <React.Fragment key={index}>
                <span className="text-secondary-400">/</span>
                {breadcrumb.isLast ? (
                  <span className="text-secondary-900 font-medium">{breadcrumb.label}</span>
                ) : (
                  <Link
                    to={breadcrumb.path}
                    className="hover:text-primary-600 transition-colors"
                  >
                    {breadcrumb.label}
                  </Link>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="flex-1 max-w-2xl mx-4">
          <div className="search-input">
            <FaSearch className="search-input-icon" />
            <input
              type="text"
              placeholder="Search anything..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {/* Quick Actions */}
          <div className="hidden md:flex items-center space-x-2">
            <Link to="/dashboard/addmeal">
              <button className="p-2 text-secondary-600 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-200" title="Add Meal">
                <MdDashboard className="text-xl" />
              </button>
            </Link>
            <Link to="/dashboard/addcash">
              <button className="p-2 text-secondary-600 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-200" title="Add Cash">
                <FaUser className="text-xl" />
              </button>
            </Link>
          </div>

          {/* Notifications */}
          <div className="relative dropdown-container">
            <button
              className="relative p-2 text-secondary-600 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-200"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <MdNotifications className="text-xl" />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-error-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                  {unreadNotifications > 9 ? '9+' : unreadNotifications}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="dropdown w-80">
                <div className="p-4 border-b border-secondary-100">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-secondary-900">Notifications</h3>
                    <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                      Mark all read
                    </button>
                  </div>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div key={notification.id} className="p-4 border-b border-secondary-50 hover:bg-secondary-50 transition-colors">
                        <div className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${notification.type === 'success' ? 'bg-success-500' :
                            notification.type === 'warning' ? 'bg-warning-500' :
                              notification.type === 'error' ? 'bg-error-500' : 'bg-primary-500'
                            }`}></div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-secondary-900">{notification.title}</p>
                            <p className="text-sm text-secondary-600 mt-1">{notification.message}</p>
                            <p className="text-xs text-secondary-400 mt-2">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-secondary-500">
                      <MdNotifications className="w-12 h-12 mx-auto mb-4 text-secondary-300" />
                      <p>No notifications yet</p>
                    </div>
                  )}
                </div>
                <div className="p-4 border-t border-secondary-100">
                  <Link to="/dashboard/notifications" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                    View all notifications
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Settings */}
          <button className="p-2 text-secondary-600 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-200">
            <MdSettings className="text-xl" />
          </button>

          {/* User Role Badge */}
          {user?.email && (
            <div className="badge badge-primary hidden sm:flex">
              {user?.role}
            </div>
          )}

          {/* Login Button for non-authenticated users */}
          {!user?.email && (
            <Link to={'/login'}>
              <button className="btn btn-primary">
                Log In
              </button>
            </Link>
          )}

          {/* User Profile Dropdown */}
          {user?.email && (
            <div className="relative dropdown-container">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-3 p-2 rounded-xl hover:bg-secondary-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <div className="relative">
                  {user?.image ? (
                    <img
                      src={image}
                      alt="User"
                      className="w-10 h-10 rounded-full object-cover border-2 border-secondary-200"
                    />
                  ) : (
                    <img
                      src={image1}
                      alt="User"
                      className="w-10 h-10 rounded-full object-cover border-2 border-secondary-200"
                    />
                  )}
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-secondary-900">
                    {user?.name || 'User'}
                  </p>
                  <p className="text-xs text-secondary-500">
                    {user?.email}
                  </p>
                </div>
                <svg
                  className={`w-5 h-5 text-secondary-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06-.02L10 10.64l3.7-3.45a.75.75 0 111.04 1.08l-4.25 3.97a.75.75 0 01-1.04 0l-4.25-3.97a.75.75 0 01-.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isOpen && (
                <div className="dropdown w-64">
                  <div className="p-4 border-b border-secondary-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-lg">
                          {user?.name?.charAt(0) || 'U'}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-secondary-900 truncate">
                          {user?.name || 'User'}
                        </p>
                        <p className="text-xs text-secondary-500 truncate">
                          {user?.email}
                        </p>
                        <div className="badge badge-primary mt-1">
                          {user?.role}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="py-2">
                    <Link to={"/dashboard/profile"}>
                      <div className="dropdown-item">
                        <div className="flex items-center space-x-3">
                          <FaUser className="text-secondary-400" />
                          <span>My Profile</span>
                        </div>
                      </div>
                    </Link>

                    <Link to={"/dashboard/chnagepass"}>
                      <div className="dropdown-item">
                        <div className="flex items-center space-x-3">
                          <FaKey className="text-secondary-400" />
                          <span>Change Password</span>
                        </div>
                      </div>
                    </Link>

                    <Link to={"/dashboard/settings"}>
                      <div className="dropdown-item">
                        <div className="flex items-center space-x-3">
                          <FaCog className="text-secondary-400" />
                          <span>Settings</span>
                        </div>
                      </div>
                    </Link>

                    <div className="border-t border-secondary-100 my-2"></div>

                    <div
                      onClick={handleLogout}
                      className="dropdown-item cursor-pointer text-error-600 hover:text-error-700 hover:bg-error-50"
                    >
                      <div className="flex items-center space-x-3">
                        <FaSignOutAlt className="text-error-400" />
                        <span>Log Out</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navber;