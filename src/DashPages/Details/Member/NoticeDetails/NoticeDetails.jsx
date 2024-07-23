import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { FaPrint, FaUser } from 'react-icons/fa6';

import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axoissecure from '../../../../Hooks/Axoisscure';
import DashCustomNav from '../../../../Share/Formnav';

const NoticeDetails = () => {
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
        <title>Manager || Notice details</title>
      </Helmet>
      <DashCustomNav name={'Notice details'} listroute={'/dashboard/noticelist'}/>
     
        <div className='px-24 pb-10'>
     

          <div className='flex  justify-end  pb-5'>

            <div className='flex border-2 cursor-pointer item items-center px-3 py-1 gap-1'>
            <FaPrint className='text-bl text-blue-400'/>
            <h1 className='text-lg font-medium text-gray-500'> Print</h1>
            </div>

          </div>

          <div className=' bg-white   min-h-screen '>

  
     
           <div className='p-8 '>

            <h1 className=' text-gray-500 text-lg font-semibold'>{data?.date?.split('T')[0]}</h1>

            <h1 className='text-gray-500 -mb-1 mt-3 text-lg font-semibold'>{data?.assigner}</h1>

            <h1 className='text-gray-700  text-md font-semibold'>{data?.position}</h1>

             <div className='flex gap-2 pt-5 items-center'>

                <h1 className=' font-semibold text-lg text-gray-700'>Topic : </h1>
                <h1 className='fon font-medium text-gray-500 text-lg'>{data?.noticetitle}</h1>

             </div>

    

           </div>


           <h1 className=' text-wrap font-medium text-gray-500  pt-16 px-8'>  {
    data?.discription
   }</h1>


          </div>
            
          
        </div>

        </>
    );
};

export default NoticeDetails;