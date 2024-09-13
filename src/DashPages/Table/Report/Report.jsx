import { FaRegCommentDots, FaProjectDiagram, FaDownload } from 'react-icons/fa';
import React from 'react';
import axoissecure from '../../../Hooks/Axoisscure';
import { useQuery } from '@tanstack/react-query';
import { GiMoneyStack, GiTakeMyMoney } from 'react-icons/gi';
import { IoFastFoodOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { FaAnglesRight } from 'react-icons/fa6';

    

const Report = () => {

    const { data, refetch } = useQuery({
        queryKey: ["re"],
        queryFn: async () => {
          try {
            const res = await axoissecure.get(`/report/approved-totals`);
    
      
            return res.data;
          } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
          }
        },
      });
    return (
      <>

<div className='mt-16 pr-10 flex justify-between '>
      <div className='flex justify-center pl-10 items-center gap-2'>
            <h1 className='lg:text-[20px]  font-medium text-gray-500'>

            <div className='flex  gap-2 text-[#0284C7] font-semibold justify-items-center items-center'>
                    <FaAnglesRight className='text-[#787978]'/>
                <h1>Monthly Report</h1>
                   </div>

            </h1>
            </div>
       <div></div>
      </div>

       <div className=" m-24">


         <div className='grid grid-cols-3 gap-10 '>

           <div className='bg-white border-dotted border-2 p-5 shadow-lg'>
           <div className='flex flex-col gap-3 items-center'>

<div><GiMoneyStack className='text-7xl'/></div>

 <h1 className='text-3xl font-bold text-[#0284C7]'>{data?.extraTk|| "00"}$</h1>

 <h1 className='fon font-semibold  text-xl'>TOTAL MONEY</h1>

</div>
           </div>


           
           <div className='bg-white border-dotted border-2 p-5 shadow-lg'>
           <div className='flex flex-col gap-3 items-center'>

<div><IoFastFoodOutline className='text-7xl'/></div>

 <h1 className='text-3xl font-bold text-[#0284C7]'>{data?.totalMeal || "00"}</h1>

 <h1 className='fon font-semibold  text-xl'>TOTAL MEAL</h1>

</div>
           </div>



           
           <div className='bg-white border-dotted border-2 p-5 shadow-lg'>
           <div className='flex flex-col gap-3 items-center'>

<div><GiTakeMyMoney  className='text-7xl'/></div>

 <h1 className='text-3xl font-bold text-[#0284C7]'>{data?.totalTk || "00"}$</h1>

 <h1 className='fon font-semibold  text-xl'>TOTAL EXTRA</h1>

</div>
           </div>

         </div>
     
      
    </div>
      
      </>
    );
};

export default Report;