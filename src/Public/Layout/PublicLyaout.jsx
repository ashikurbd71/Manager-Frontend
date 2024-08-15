import React from 'react';
import PublicNavber from '../Components/PublicNavber';
import { Outlet } from 'react-router-dom';
import Marquee from 'react-fast-marquee';

const PublicLyaout = () => {
    return (
     <>
     
     <PublicNavber/>

    <div className='lg:px-10 min-h-screen'>
    <Outlet />
    </div>
              
  <div className="m">
    <div className="flex items-center">
      <div className="bg-[#C0E1F1] text-black font-bold px-10 py-2">
        Notice
      </div>
      <Marquee
        className="bg-red-500 text-white font-semibold py-2"
        speed={50}
        gradient={false}
      >
       <h1>I love You</h1>
      </Marquee>
    </div>
  </div>
     </>
    );
};

export default PublicLyaout;