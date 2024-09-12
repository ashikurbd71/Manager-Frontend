import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { FaPrint, FaUser } from 'react-icons/fa6';
import DashCustomNav from '../../../Share/Formnav';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axoissecure from './../../../Hooks/Axoisscure';
import { MdDownloading } from 'react-icons/md';
import { usePDF } from "react-to-pdf";
const ManagerDetails = () => {
 const[member,setMember] = useState()
  const { id } = useParams();

  const { data, refetch } = useQuery({
    queryKey: ["volunteer"],
    queryFn: async () => {
      try {
        const res = await axoissecure.get(`/manager/${id}`);
        console.log(res.data);
        setMember(res?.data);
        return res.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    },
  });


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
      filename: `managerdetails.pdf`,
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


  console.log(member)

  const join = member?.startDate;
  const parsedDate = new Date(join);
  
  // Format the date as "14 May 2024"
  const formattedDate = parsedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  const join1 = member?.endDate;
  const parsedDate1 = new Date(join1);
  
  // Format the date as "14 May 2024"
  const formattedDate1 = parsedDate1.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });



  const image = `${import.meta.env.VITE_API_URL}${"/"}${member?.profile}`;

  console.log(image)


    return (
      <>
      <Helmet>
        <title>Manager || Manager details</title>
      </Helmet>
      <DashCustomNav c name={'Manager details'} listroute={'/dashboard/managerlist'}/>
     
        <div className='px-10 pb-10'>
     

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
          <div ref={targetRef} className=' bg-white min min-h-screen'>

  <div className='  justify-items-center items-center p-10 flex'>
  <img src={image} alt=""  className=' object-cover w-[200px] h-[200px] border-2 rounded-lg '/>
  </div>
           
      <div className='flex mx-10 gap-1 items-center'>
  <FaUser/>
      <h1 className='text-left text-[20px]  font-semibold  text-[#0284C7]'>{member?.position}</h1>
      </div>

      
      <div className="text-gray-700 p-10">
  <div className="overflow-x-auto">
    
    <table className="w-full border border-gray-200 text-sm">
        
      <tbody>
      <tr>
          <td className="px-4 py-2 font-semibold border border-gray-200">Name</td>
          <td className="px-4 py-2 border border-gray-200">{member?.name}</td>
        </tr>

        <tr>
          <td className="px-4 py-2 font-semibold border border-gray-200">Phone</td>
          <td className="px-4 py-2 border border-gray-200">{member?.number}</td>
        </tr>

        <tr>
          <td className="px-4 py-2 font-semibold border border-gray-200">Institute Name</td>
          <td className="px-4 py-2 border border-gray-200">{member?.instituteName?.name}</td>
        </tr>

        <tr>
          <td className="px-4 py-2 font-semibold border border-gray-200">Department</td>
          <td className="px-4 py-2 border border-gray-200">{member?.department?.name}</td>
        </tr>

        <tr>
          <td className="px-4 py-2 font-semibold border border-gray-200">Semester</td>
          <td className="px-4 py-2 border border-gray-200">{member?.semister?.name}</td>
        </tr>

   
        <tr>
          <td className="px-4 py-2 font-semibold border border-gray-200">Start Date</td>
          <td className="px-4 py-2 border border-gray-200">{formattedDate}</td>
        </tr>

        <tr>
          <td className="px-4 py-2 font-semibold border border-gray-200">End Date</td>
          <td className="px-4 py-2 border border-gray-200">{formattedDate1}</td>
        </tr>
        
        <tr>
          <td className="px-4 py-2 font-semibold border border-gray-200">Email</td>
          <td className="px-4 py-2 border border-gray-200">{member?.email}</td>
        </tr>

     
      
      </tbody>
    </table>
  </div>

    

</div>





          </div>
            
        </div>

        </>
    );
};

export default ManagerDetails;