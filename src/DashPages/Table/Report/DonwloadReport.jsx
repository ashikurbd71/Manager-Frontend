import React, { useState } from 'react';
import axoissecure from '../../../Hooks/Axoisscure';
import { useQuery } from '@tanstack/react-query';
import { FaPrint } from 'react-icons/fa6';
import { usePDF } from "react-to-pdf";
import { MdDownloading } from 'react-icons/md';
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
      filename: `monthlyreportdetails.pdf`,
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
     <div className='flex  justify-end  mt-16 pr-8 py-4'>

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

</div>
 
 <div ref={targetRef} className='bg-white p-5  mx-8'>

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