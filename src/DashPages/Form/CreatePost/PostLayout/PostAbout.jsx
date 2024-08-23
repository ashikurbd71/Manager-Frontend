import React from 'react';
import { FaBriefcase, FaUniversity, FaHome, FaHeart, FaMapMarkerAlt, FaUser, FaClock } from 'react-icons/fa';

const PostAbout = () => {
  return (
    <div className="w-full text-gray-600 text-sm mx-auto mt-4">
      {/* <div className="flex items-center mb-2">
        <FaBriefcase className="text-gray-600 mr-2" />
        <p>
          Software Engineer at <span className="font-semibold">Systech Digital Limited</span>
        </p>
      </div> */}
      <div className="flex items-center mb-2">
        <FaUniversity className="text-gray-600 mr-2" />
        <p>
          Study at <span className="font-semibold">Computer Science and Technology</span>
        </p>
      </div>
    
      <div className="flex items-center mb-2">
        <FaUniversity className="text-gray-600 mr-2" />
        <p>
          Studied at <span className="font-semibold">Rangpur Ideal Institute of Technology, Rangpur.</span>
        </p>
      </div>
      <div className="flex items-center mb-2">
        <FaHome className="text-gray-600 mr-2" />
        <p>
          Lives in <span className="font-semibold">Rangpur City</span>
        </p>
      </div>
      <div className="flex items-center mb-2">
        <FaMapMarkerAlt className="text-gray-600 mr-2" />
        <p>
          From <span className="font-semibold">Rabaitari, Rājshāhi, Bangladesh</span>
        </p>
      </div>
    
      <div className="flex items-center mb-2">
        <FaClock className="text-gray-600 mr-2" />
        <p>
          Joined <span className="font-semibold">September 2016</span>
        </p>
      </div>
    </div>
  );
};

export default PostAbout;
