import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { FaPrint, FaUser } from 'react-icons/fa6';
import DashCustomNav from '../../Share/Formnav';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axoissecure from '../../Share/Hooks/Axoisscure';
import img from '../../assets/manager.png'
const MemberDetails = () => {
 const[member,setMember] = useState()
  const { id } = useParams();

  const { data, refetch } = useQuery({
    queryKey: ["volunteer"],
    queryFn: async () => {
      try {
        const res = await axoissecure.get(`/members/${id}`);
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

  const join = member?.joiningDate;
  const parsedDate = new Date(join);
  
  // Format the date as "14 May 2024"
  const formattedDate = parsedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });


  const image = `${import.meta.env.VITE_API_URL}${"/"}${member?.profile}`;

    return (
      <>
      <Helmet>
        <title>Manager || Member details</title>
      </Helmet>
      <DashCustomNav c name={'Member details'} listroute={'/dashboard/memberlist'}/>
     
        <div className='px-10 pb-10'>
     

          <div className='flex  justify-end  pb-5'>

            <div className='flex border-2 cursor-pointer item items-center px-3 py-1 gap-1'>
            <FaPrint className='text-bl text-blue-400'/>
            <h1 className='text-lg font-medium text-gray-500'> Print</h1>
            </div>

          </div>

          <div className=' bg-white min min-h-screen'>

  <div className='  justify-items-center items-center p-10 flex'>
  <img src={img} alt=""  className=' w-[200px] h-[200px] border-2 rounded-lg '/>
  </div>
           
      <div className='flex mx-10 gap-1 items-center'>
  <FaUser/>
      <h1 className='text-left text-[20px]  font-semibold  text-[#0284C7]'>About</h1>
      </div>

        <div className='grid lg:grid-cols-2 grid-cols-1 space-y-4 gap-4 py-14 mx-10'>

            <div className='flex  items-center gap-10'><h1 className='text-lg font-medium'>Name</h1> <span className='text-lg pl-5'>:</span>
            <span className='text-lg text-gray-800'>{member?.name}</span></div>

            <div className='flex  items-center gap-10'><h1 className='text-lg font-medium'>Phone</h1> <span className=' text-lg  pl-[53px]'>:</span>
            <span className='text-lg text-gray-800'>{member?.number}</span></div>


            <div className='flex  items-center gap-10'><h1 className='text-lg font-medium'>Institute</h1> <span className='text-lg -pl-10'>:</span>
            <span className='text-lg text-gray-800'>{member?.instituteName}</span></div>

            <div className='flex  items-center gap-10'><h1 className='text-lg font-medium'>Department</h1> <span className='text-lg -pl-10'>:</span>
            <span className='text-lg text-gray-800'>{member?.department}</span></div>

            <div className='flex  items-center gap-10'><h1 className='text-lg font-medium'>NID</h1> <span className='text-lg pl-10'>:</span>
            <span className='text-lg text-gray-800'>{member?.nid}</span></div>


            <div className='flex  items-center gap-10'><h1 className='text-lg font-medium'>Blood</h1> <span className='text-lg  pl-[55px]'>:</span>
            <span className='text-lg text-gray-800'>{member?.bloodGroup}</span></div>


            <div className='flex  items-center gap-10'><h1 className='text-lg font-medium'>Address</h1> <span className='text-lg -pl-10'>:</span>
            <span className='text-lg text-gray-800'>{member?.address}</span></div>

            <div className='flex  items-center gap-10'><h1 className='text-lg font-medium'>Semister</h1> <span className='text-lg  pl-[28px]'>:</span>
            <span className='text-lg text-gray-800'>{member?.semister}</span></div>

            <div className='flex  items-center gap-10'><h1 className='text-lg font-medium'>Email</h1> <span className='text-lg pl-6'>:</span>
            <span className='text-lg text-gray-800'>{member?.email}</span></div>

            <div className='flex  items-center gap-10'><h1 className='text-lg font-medium'>Joining</h1> <span className='text-lg  pl-[43px]'>:</span>
            <span className='text-lg text-gray-800'>{formattedDate}</span></div>


        </div>
          </div>
            
        </div>

        </>
    );
};

export default MemberDetails;