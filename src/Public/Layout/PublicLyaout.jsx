import React from 'react';
import PublicNavber from '../Components/PublicNavber';
import { Outlet } from 'react-router-dom';
import Marquee from 'react-fast-marquee';
import { useQuery } from '@tanstack/react-query';
import axoissecure from '../../Hooks/Axoisscure';

const PublicLyaout = () => {

  const { data, refetch } = useQuery({
    queryKey: ["no"],
    queryFn: async () => {
      try {
        const res = await axoissecure.get(`/notice`);
        console.log(res.data);
   
        return res.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    },
  });

  console.log(data,"gfgdgdgd")

  
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
   {data?.map((item, index) => (
  <span key={index} className="mx-4">
    {Array.isArray(item?.noticetitle) ? item?.noticetitle.join(" , ") : item?.noticetitle}
  </span>
))}

      </Marquee>
    </div>
  </div>
     </>
    );
};

export default PublicLyaout;