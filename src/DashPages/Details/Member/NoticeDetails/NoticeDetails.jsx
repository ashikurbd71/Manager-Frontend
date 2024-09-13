import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { FaPrint, FaUser } from 'react-icons/fa6';

import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axoissecure from '../../../../Hooks/Axoisscure';
import DashCustomNav from '../../../../Share/Formnav';
import { usePDF } from "react-to-pdf";
import { MdDownloading } from 'react-icons/md';
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

  const [loading, setLoading] = useState(false);
  const options = {
    overrides: {
      canvas: {
        useCORS: true,
      },
    },
  };

  const { toPDF, targetRef } = usePDF(
    {
      filename: `noticedetails.pdf`,
    },
    options
  );

  const handleCardDownload = async () => {
    setLoading(true);
    try {
      await toPDF();
    } finally {
      setLoading(false);
    }
  };


    return (
      <>
      <Helmet>
        <title>Manager || Notice details</title>
      </Helmet>
      <DashCustomNav name={'Notice details'} listroute={'/dashboard/noticelist'}/>
     
        <div className='px-24 pb-10'>
     
        <div className='flex  justify-end  pb-5'>

<div className="w-100 flex flex-grow flex-col pb-3 items-end justify-start">
  <div className="flex flex-row space-x-3">
    {/* Follow Button */}
    <button
      onClick={() => handleCardDownload()}
      className="flex rounded-md bg-blue-500/80 px-5 py-2 text-white"
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <span>Printing</span>
          <MdDownloading  className="text-[20px] animate-ping text-white" />
        </div>
      ) : (
        <h1 className='fon font-semibold'>Download</h1>
      )}
    </button>
  </div>
</div>

</div>


          <div ref={targetRef} className=' bg-white   min-h-screen '>

  
     
           <div className='p-8 '>

            <h1 className=' text-gray-500 text-lg font-semibold'>{data?.date?.split('T')[0]}</h1>

            <h1 className='text-gray-500 -mb-1 mt-3 text-lg font-semibold'>{data?.assigner}</h1>

            <h1 className='text-gray-700  text-md font-semibold'>{data?.position}</h1>

             <div className='flex gap-2 pt-5 items-center'>

                <h1 className=' font-semibold text-lg text-gray-700'>Topic : </h1>
                <h1 className='fon font-medium text-gray-500 text-lg'>{data?.noticetitle}</h1>

             </div>

    

           </div>


           <p className=' text-wrap font-medium text-gray-500  pt-16 px-8'>  {
    data?.discription
   }</p>


          </div>
            
          
        </div>

        </>
    );
};

export default NoticeDetails;