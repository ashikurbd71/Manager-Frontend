import React, { useState } from 'react';
import { FaFlag, FaImages, FaVideo } from 'react-icons/fa6';

import { NavLink, Outlet } from 'react-router-dom';
import CreatePost from '../../DashPages/Form/CreatePost/CreatePost';
import useAuth from '../../Provider/UseAuth/useAuth';

function ProfileCard() {
  const [activeTab, setActiveTab] = useState('Posts');

  const [isOpen, setIsOpen] = useState(null)
  const[update,setUpdate] = useState()
  const{user} = useAuth()

  const openModal = (id) => {
    setIsOpen(true)
    setUpdate(id)
  }
  const image = `${import.meta.env.VITE_API_URL}${"/"}${user?.userName?.profile}`;
  return (
    <div className="flex flex-col justify-center items-center lg:mt-0 my-14 lg:h-[100vh]">
      <div className="relative flex flex-col items-center rounded-[10px] border-[1px] border-gray-200 w-[400px] mx-auto p-4 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:bg-navy-800 dark:text-white dark:shadow-none">
        <div className="relative flex h-32 w-full justify-center rounded-xl bg-cover">
          <img 
            src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/banner.ef572d78f29b0fee0a09.png" 
            className="absolute flex h-32 w-full justify-center rounded-xl bg-cover"
            alt="Banner"
          />
          <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:border-navy-700">
            <img 
              className="h-full w-full rounded-full" 
              src={image}
              alt="Avatar" 
            />
          </div>
        </div>
        <div className="mt-10 mb-4 flex flex-col items-center">

          <p className="text-base pt-3 font-semibold text-gray-600">{user?.userName?.name}</p>
        </div>

        <div className="  bg-white  p-3 border rounded-md w-full">
      <div className="flex items-center space-x-4">
        <img
          className="w-10 h-10 rounded-full"
          src={image}
          alt="Profile"
        />
        {/* <input
          className="w-full bg-gray-100 rounded-full py-2 px-4 text-gray-700 focus:outline-none"
          type="text"
          placeholder="What's on your mind?"
        /> */}
        <div onClick={() => openModal()}   className="w-full cursor-pointer bg-gray-100 rounded-full py-2 px-4 text-gray-700 focus:outline-none">
        What's on your mind?
        </div>
      </div>
      <hr className="my-2" />
      <div className="flex justify-between">
       
        <button onClick={() => openModal()}  className="flex items-center text-[#0284C7] hover:bg-gray-100 p-2 rounded-lg">
          <FaImages className="text-lg" />
          <span className="ml-2">Photo/video</span>
        </button>
       
      </div>
    </div>
    <div className="w-full my-3 mx-auto">
      <div className="flex justify-between border-b">
        <NavLink
          to="/public/profilecard"
          className={`px-4 py-2 focus:outline-none ${
            activeTab === 'Posts'
              ? 'text-[#0284C7] border-b-2 border-[#0284C7] font-medium'
              : 'text-gray-600 hover:text-[#0284C7]'
          }`}
          onClick={() => setActiveTab('Posts')}
        >
          Details
        </NavLink>
        <NavLink
          to="/public/profilecard/about"
          className={`px-4 py-2 focus:outline-none ${
            activeTab === 'About'
              ? 'text-[#0284C7] border-b-2 border-[#0284C7] font-medium'
              : 'text-gray-600 hover:text-[#0284C7]'
          }`}
          onClick={() => setActiveTab('About')}
        >
          About
        </NavLink>
       
        <NavLink
          to="/public/profilecard/photo"
          className={`px-4 py-2 focus:outline-none ${
            activeTab === 'Photos'
              ? 'text-[#0284C7] border-b-2 border-[#0284C7] font-medium'
              : 'text-gray-600 hover:text-[#0284C7]'
          }`}
          onClick={() => setActiveTab('Photos')}
        >
          Photos
        </NavLink>
      </div>

       <div>
        <Outlet/>
       </div>
    </div>
      </div>
      <CreatePost isOpen={isOpen} setIsOpen={setIsOpen} update={update}  />
    </div>
  );
}

export default ProfileCard;
