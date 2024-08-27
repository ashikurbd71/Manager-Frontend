import React from 'react';
import { FaBriefcase, FaUniversity, FaHome, FaHeart, FaMapMarkerAlt, FaUser, FaClock } from 'react-icons/fa';
import useAuth from '../../../../Provider/UseAuth/useAuth';

const PostAbout = () => {

  const{user} = useAuth()

;
const date = new Date(user?.userName?.joiningDate);



// Array of month names
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const formattedDate = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
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
          Study at <span className="font-semibold">{user?.userName?.department?.name}</span>
        </p>
      </div>
    
      <div className="flex items-center mb-2">
        <FaUniversity className="text-gray-600 mr-2" />
        <p>
          Studied at <span className="font-semibold">{user?.userName?.instituteName?.name}</span>
        </p>
      </div>
      <div className="flex items-center mb-2">
        <FaHome className="text-gray-600 mr-2" />
        <p>
          Lives in <span className="font-semibold">Rangpur,Bngladesh</span>
        </p>
      </div>
      <div className="flex items-center mb-2">
        <FaMapMarkerAlt className="text-gray-600 mr-2" />
        <p>
          From <span className="font-semibold">{user?.userName?.address}</span>
        </p>
      </div>
    
      <div className="flex items-center mb-2">
        <FaClock className="text-gray-600 mr-2" />
        <p>
          Joined <span className="font-semibold">{formattedDate}</span>
        </p>
      </div>
    </div>
  );
};

export default PostAbout;
