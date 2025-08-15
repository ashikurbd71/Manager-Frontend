import React, { useState } from 'react';
import {
  FaImages,
  FaVideo,
  FaUser,
  FaEdit,
  FaCamera,
  FaHeart,
  FaComment,
  FaShare,
  FaEllipsisH
} from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import CreatePost from '../../DashPages/Form/CreatePost/CreatePost';
import useAuth from '../../Provider/UseAuth/useAuth';
import { ModernCard, ModernAlert } from '../../Share/ModernComponents';

function ProfileCard() {
  const [activeTab, setActiveTab] = useState('Posts');
  const [isOpen, setIsOpen] = useState(null);
  const [update, setUpdate] = useState();
  const { user } = useAuth();

  const openModal = (id) => {
    setIsOpen(true);
    setUpdate(id);
  };

  const image = `${import.meta.env.VITE_API_URL}${"/"}${user?.userName?.profile}`;
  const defaultImage = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";

  return (
    <>
      <Helmet><title>Profile || {user?.userName?.name}</title></Helmet>

      <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Profile Header Card */}
          <ModernCard className="mb-6 overflow-hidden">
            {/* Cover Image */}
            <div className="relative h-48 bg-gradient-to-r from-primary-500 to-secondary-500">
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              <div className="absolute bottom-4 right-4">
                <button className="btn btn-outline bg-white/90 backdrop-blur-sm">
                  <FaCamera className="mr-2" />
                  Change Cover
                </button>
              </div>
            </div>

            {/* Profile Info */}
            <div className="relative px-6 pb-6">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
                <div className="flex flex-col sm:flex-row sm:items-end space-y-4 sm:space-y-0 sm:space-x-6">
                  {/* Profile Picture */}
                  <div className="relative -mt-16">
                    <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
                      <img
                        className="h-full w-full object-cover"
                        src={image || defaultImage}
                        alt="Profile"
                        onError={(e) => {
                          e.target.src = defaultImage;
                        }}
                      />
                    </div>
                    <button className="absolute bottom-2 right-2 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white hover:bg-primary-700 transition-colors">
                      <FaEdit className="w-4 h-4" />
                    </button>
                  </div>

                  {/* User Info */}
                  <div className="text-center sm:text-left">
                    <h1 className="text-2xl font-bold text-secondary-900 mb-1">
                      {user?.userName?.name || 'User Name'}
                    </h1>
                    <p className="text-secondary-600 mb-2">
                      {user?.userName?.email || 'user@example.com'}
                    </p>
                    <div className="flex items-center justify-center sm:justify-start space-x-4 text-sm text-secondary-500">
                      <span className="flex items-center">
                        <FaUser className="mr-1" />
                        Member
                      </span>
                      <span>•</span>
                      <span>Joined recently</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                  <button className="btn btn-primary">
                    <FaEdit className="mr-2" />
                    Edit Profile
                  </button>
                  <button className="btn btn-outline">
                    <FaShare className="mr-2" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </ModernCard>

          {/* Create Post Card */}
          <ModernCard className="mb-6">
            <div className="flex items-start space-x-4">
              <img
                className="w-12 h-12 rounded-full object-cover"
                src={image || defaultImage}
                alt="Profile"
                onError={(e) => {
                  e.target.src = defaultImage;
                }}
              />
              <div className="flex-1">
                <button
                  onClick={() => openModal()}
                  className="w-full text-left p-4 bg-secondary-50 rounded-xl border-2 border-dashed border-secondary-200 hover:border-primary-300 hover:bg-primary-50 transition-all duration-200 text-secondary-600 hover:text-primary-600"
                >
                  What's on your mind, {user?.userName?.name?.split(' ')[0] || 'User'}?
                </button>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-secondary-100">
                  <button
                    onClick={() => openModal()}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-secondary-100 transition-colors text-secondary-600 hover:text-primary-600"
                  >
                    <FaImages className="text-lg" />
                    <span>Photo/Video</span>
                  </button>

                  <button
                    onClick={() => openModal()}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-secondary-100 transition-colors text-secondary-600 hover:text-primary-600"
                  >
                    <FaVideo className="text-lg" />
                    <span>Live Video</span>
                  </button>
                </div>
              </div>
            </div>
          </ModernCard>

          {/* Navigation Tabs */}
          <ModernCard>
            <div className="border-b border-secondary-100">
              <nav className="flex space-x-8">
                <NavLink
                  to="/public/profilecard"
                  className={({ isActive }) =>
                    `flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${isActive
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
                    }`
                  }
                  onClick={() => setActiveTab('Posts')}
                >
                  <FaUser className="w-4 h-4" />
                  <span>Details</span>
                </NavLink>

                <NavLink
                  to="/public/profilecard/about"
                  className={({ isActive }) =>
                    `flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${isActive
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
                    }`
                  }
                  onClick={() => setActiveTab('About')}
                >
                  <FaEdit className="w-4 h-4" />
                  <span>About</span>
                </NavLink>

                <NavLink
                  to="/public/profilecard/photo"
                  className={({ isActive }) =>
                    `flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${isActive
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
                    }`
                  }
                  onClick={() => setActiveTab('Photos')}
                >
                  <FaImages className="w-4 h-4" />
                  <span>Photos</span>
                </NavLink>
              </nav>
            </div>

            {/* Tab Content */}
            <div className="py-6">
              <Outlet />
            </div>
          </ModernCard>
        </div>
      </div>

      {/* Create Post Modal */}
      <CreatePost isOpen={isOpen} setIsOpen={setIsOpen} update={update} />
    </>
  );
}

export default ProfileCard;
