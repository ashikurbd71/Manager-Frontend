import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { FaPrint, FaUser } from 'react-icons/fa6';

import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import DashCustomNav from '../../../Share/Formnav';
import axoissecure from '../../../Hooks/Axoisscure';


const NoticeDetailsPub = () => {
 const[member,setMember] = useState()
  const { id } = useParams();

  const { data, refetch } = useQuery({
    queryKey: ["volunteer"],
    queryFn: async () => {
      try {
        const res = await axoissecure.get(`/notice/${id}`);
        console.log(res.data);
        setMember(res?.data);
        return res.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    },
  });

  console.log(data)


    return (
      <>
      <Helmet>
        <title>Manager || Public || Notice details</title>
      </Helmet>
      <DashCustomNav name={'Notice details'} listroute={'/public/notice'}/>
     
        <div className='lg:px-24 px-5 pb-10'>
     

          <div className='flex  justify-end  pb-5'>

            <div className='flex border-2 cursor-pointer item items-center px-2 lg:px-3 py-1 gap-1'>
            <FaPrint className='text-bl text-blue-400'/>
            <h1 className='lg:text-lg font-medium text-gray-500'>Download</h1>
            </div>

          </div>

          <div className=' bg-white   min-h-screen '>

  
     
           <div className='lg:p-8 p-4 '>

            <h1 className=' text-gray-500 lg:text-lg text-md font-semibold'>{data?.date?.split('T')[0]}</h1>

            <h1 className='text-gray-500 -mb-1 mt-3 lg:text-lg text:md font-semibold'>{data?.assigner}</h1>

            <h1 className='text-gray-700  lg:text-md text-[16px] font-semibold'>{data?.position}</h1>

             <div className='flex gap-2 pt-5 items-center'>

                <h1 className=' font-semibold lg:text-lg text-md text-gray-700'>Topic : </h1>
                <h1 className='fon font-medium text-gray-500 lg:text-lg text-md'>{data?.noticetitle}</h1>

             </div>

    

           </div>


           <h1 className=' text-wrap font-medium text-gray-500  lg:pt-14 pt-8 px-4 lg:px-8'>  {
    data?.discription
   }</h1>


          </div>
            
          
        </div>

        </>
    );
};

export default NoticeDetailsPub;