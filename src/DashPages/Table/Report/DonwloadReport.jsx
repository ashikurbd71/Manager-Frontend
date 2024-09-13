import React from 'react';
import axoissecure from '../../../Hooks/Axoisscure';
import { useQuery } from '@tanstack/react-query';
import { FaPrint } from 'react-icons/fa6';

const DonwloadReport = () => {

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

      const { data : addmoney,  } = useQuery({
        queryKey: ["readd"],
        queryFn: async () => {
          try {
            const res = await axoissecure.get(`/mealmanage/total-add-money`);
    
      
            return res.data;
          } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
          }
        },
      });

    return (
  <>
     <div className='flex  justify-end  mt-16 pr-8 py-4'>

<div className='flex border-2 cursor-pointer item items-center px-3 py-1 gap-1'>
<FaPrint className='text-bl text-blue-400'/>
<h1 className='text-lg font-medium text-gray-500'> Print</h1>
</div>

</div>
 
 <div className='bg-white p-5  mx-8'>

  <h1 className='text-center font-semibold pb-4 text-xl'>Monthly Report</h1>
 
 <div className="text-gray-700 ">
  <div className="overflow-x-auto">
    
    <table className="w-full border border-gray-200 text-sm">
        
      <tbody>

      <tr>
          <td className="px-4 py-2 font-bold border border-gray-200">TOTAL MONEY</td>
          <td className="px-4 py-2 border font-semibold text-gray-600 border-gray-200">{addmoney?.totalAddMoney}$</td>
        </tr>
      <tr>
          <td className="px-4 py-2 font-bold border border-gray-200">TOTAL COST</td>
          <td className="px-4 py-2 border font-semibold text-gray-600 border-gray-200">{data?.totalTk}$</td>
        </tr>

        <tr>
          <td className="px-4 py-2 font-bold border border-gray-200">TOTAL MEAL</td>
          <td className="px-4 py-2 border fon font-semibold text-gray-600 border-gray-200">{data?.totalMeal}</td>
        </tr>


        <tr>
          <td className="px-4 py-2 font-bold border border-gray-200">TOTAL EXTRA</td>
          <td className="px-4 py-2 border font-semibold text-gray-600 border-gray-200">{data?.extraTk}$</td>
        </tr>

        
      

        
      
     
      
      </tbody>
    </table>
  </div>

    

</div>
 </div>

  
  </>
    );
};

export default DonwloadReport;