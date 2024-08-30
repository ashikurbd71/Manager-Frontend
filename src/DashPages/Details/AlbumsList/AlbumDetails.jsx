import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import axoissecure from '../../../Hooks/Axoisscure';
import { Helmet } from 'react-helmet';
import DashCustomNav from '../../../Share/Formnav';

const AlbumDetails = () => {

    const { id } = useParams();

  const { data, refetch } = useQuery({
    queryKey: ["album"],
    queryFn: async () => {
      try {
        const res = await axoissecure.get(`/image/${id}`);
        console.log(res.data);
        return res.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    },
  });



    return (
      
        <>

<Helmet>
        <title>Manager || Album Details</title>
      </Helmet>
      <DashCustomNav name={'Notice details'} listroute={'/dashboard/albumlist'}/>
        
         <div className='bg-white w-[400px] my-18 mx-auto p-4'>
         <h1 className='fon font-serif pb-1 text-md font-semibold -mt-2'>{data?.date?.split('T')[0]}</h1>

      <img src={`${import.meta.env.VITE_API_URL}/${data?.profile}`} alt="" className='h-[400px] w-[400px] ' />

      <h1 className='fon font-semibold text-md text-gray-500 font-serif pt-3'>{data?.title}</h1>

         </div>
        
        </>
    );
};

export default AlbumDetails;