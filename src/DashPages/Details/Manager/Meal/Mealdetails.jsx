import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { FaPrint, FaUser } from 'react-icons/fa6';

import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axoissecure from '../../../../Hooks/Axoisscure';
import DashCustomNav from '../../../../Share/Formnav';

const Mealdetails = () => {


 const[member,setMember] = useState()
  const { id } = useParams();

  const { data, refetch } = useQuery({
    queryKey: ["volunteer"],
    queryFn: async () => {
      try {
        const res = await axoissecure.get(`/mealmanage/${id}`);
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

  const join = member?.date;
  const parsedDate = new Date(join);
  
  // Format the date as "14 May 2024"
  const formattedDate = parsedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });


  const { data: totalitem = [],  } = useQuery({
    queryKey: ["extrag"],
    queryFn: async () => {
      try {
        const res = await axoissecure.get(`/mealmanage/search`);
        return res?.data?.meta?.totalItems;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    },
  });


  const { data: extra = [],  } = useQuery({
    queryKey: ["extra"],
    queryFn: async () => {
      try {
        const res = await axoissecure.get(`/mealextra/search`);
        return res?.data.meta?.totalExtraMoney;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    },
  });

  console.log(extra)

 console.log(totalitem)




  const extramoney = extra / totalitem




    return (
      <>
      <Helmet>
        <title>Manager || Meal details</title>
      </Helmet>
      <DashCustomNav name={'Meal details'} listroute={'/dashboard/mealmanagelist'}/>
     
        <div className='px-10 pb-10'>
     

          <div className='flex  justify-end  pb-5'>

            <div className='flex border-2 cursor-pointer item items-center px-3 py-1 gap-1'>
            <FaPrint className='text-bl text-blue-400'/>
            <h1 className='text-lg font-medium text-gray-500'> Print</h1>
            </div>

          </div>

          <div className=' bg-white min min-h-screen'>

  <div className='  items-center p-10 flex'>

  </div>
           
      <div className='flex flex-col mx-10 gap-1 '>

 
    <h1 className='text-left text-[24px]  font-semibold  text-[#0284C7]'>{member?.member?.name}</h1>
    
      <h1 className='text-gray-500  -mt-2'>Ranpur Ideal Institute Technology</h1>
      <h1 className='text-gray-500  -mt-2'>Computer scince And Technology(4th)</h1>
      </div>

      
      <div className="text-gray-700 p-10">
  <div className="overflow-x-auto">
    
    <table className="w-full border border-gray-200 text-sm">
        
      <tbody>
    

  

        <tr>
          <td className="px-4 py-2 font-semibold border border-gray-200">Total Money</td>
          <td className="px-4 py-2 border border-gray-200">{member?.addMoney}</td>
        </tr>

        
        <tr>
          <td className="px-4 py-2 font-semibold border border-gray-200">Total Meal</td>
          <td className="px-4 py-2 border border-gray-200">{member?.totalMeal}</td>
        </tr>

        
        <tr>
          <td className="px-4 py-2 font-semibold border border-gray-200">Cost Money</td>
          <td className="px-4 py-2 border border-gray-200">{member?.ff}</td>
        </tr>

        
        <tr>
          <td className="px-4 py-2 font-semibold border border-gray-200">Cost Meal</td>
          <td className="px-4 py-2 border border-gray-200">{member?.gg}</td>
        </tr>


        <tr>
          <td className="px-4 py-2 font-semibold border border-gray-200">Total Extra</td>
          <td className="px-4 py-2 border border-gray-200">{extramoney || 'Loading...'}</td>
        </tr>

      
        
        <tr>
          <td className="px-4 py-2 font-semibold border border-gray-200">Member Blance</td>
          <td className="px-4 py-2 border border-gray-200">{member?.b}</td>
        </tr>

        
    


        <tr>
          <td className="px-4 py-2 font-semibold border border-gray-200">Member Loan</td>
          <td className="px-4 py-2 border border-gray-200">{member?.b}</td>
        </tr>


    
        <tr>
          <td className="px-4 py-2 font-semibold border border-gray-200">Last Payment</td>
          <td className="px-4 py-2 border border-gray-200">{formattedDate}</td>
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

export default Mealdetails;