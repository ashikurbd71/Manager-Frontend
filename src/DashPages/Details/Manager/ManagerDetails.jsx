import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { FaPrint, FaUser } from 'react-icons/fa6';
import DashCustomNav from '../../../Share/Formnav';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axoissecure from './../../../Hooks/Axoisscure';
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
        <title>Manager || Member details</title>
      </Helmet>
      <DashCustomNav c name={'Member details'} listroute={'/dashboard/managerlist'}/>
     
        <div className='px-10 pb-10'>
     

          <div className='flex  justify-end  pb-5'>

            <div className='flex border-2 cursor-pointer item items-center px-3 py-1 gap-1'>
            <FaPrint className='text-bl text-blue-400'/>
            <h1 className='text-lg font-medium text-gray-500'> Print</h1>
            </div>

          </div>

          <div className=' bg-white min min-h-screen'>

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