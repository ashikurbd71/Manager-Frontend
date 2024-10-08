import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axoissecure from '../../../Hooks/Axoisscure';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import DashCustomNav from '../../../Share/Formnav';
import { FaPrint } from 'react-icons/fa6';
import { usePDF } from "react-to-pdf";
import { MdDownloading } from 'react-icons/md';
const Bazarlistdetails = () => {
  const { id } = useParams();

  const { data, refetch } = useQuery({
    queryKey: ["volunteer"],
    queryFn: async () => {
      try {
        const res = await axoissecure.get(`/bazalist/${id}`);
        console.log(res.data);
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
      filename: `bazarlistdetails.pdf`,
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



  // Generate table rows based on the data
  const tableRows = [];
  for (let i = 1; i <= 30; i++) {
    const dateKey = `date${i}`;
    const dayKey = `day${i}`;
    const bazarkari1Key = `bazarkari1${i}`;
    const bazarkari2Key = `bazarkari2${i}`;

    if (data?.[dateKey]) {
      tableRows.push(
        <tr key={i} className="border-b">
          <td className="px-2 border text-center py-2">{i}</td>
          <td className="px-2 border text-center py-2">{data[dateKey]}</td>
          <td className="px-2 border text-center py-2">{data[dayKey]}</td>
          <td className="px-2 border text-center py-2">{data[bazarkari1Key]} , {data[bazarkari2Key]}</td>
       
        </tr>
      );
    }
  }

  const dateStr = data?.listMonth;
  const date = new Date(dateStr);
  const monthName = date.toLocaleString('default', { month: 'long' }); // "August"
  console.log(monthName);

  
  const { data: item,  } = useQuery({
    queryKey: ["information"],
    queryFn: async () => {
      try {
        const res = await axoissecure.get(`/information`);
        console.log(res.data);
        return res.data[0];
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    },
  });


  return (
    <>
      <Helmet><title>Manager || Bazarlist Details</title></Helmet>
      <DashCustomNav name={'Bazar List Details '} listroute={'/dashboard/bazalist'} />
    
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
      <div ref={targetRef} className="container mx-auto bg-white p-4">

       

            <h1 className='text-center text-2xl font-bold text-[#0284C7]  '>{monthName } BazarList </h1>
            <h1 className='text-center text-lg font-semibold text-gray-500  '> {item?.name}</h1>
            <h1 className='text-center font-normal -mt-1 pb-4 text-gray-600'>{item?.location}</h1>
          

      
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border text-center font-semibold text-gray-700">SL.</th>
                <th className="px-4 py-2 border text-center font-semibold text-gray-700">DATE</th>
                <th className="px-4 py-2 border text-center font-semibold text-gray-700">DAY</th>
                <th className="px-4 py-2 border text-center font-semibold text-gray-700">NAME</th>
             
              </tr>
            </thead>
            <tbody>
              {tableRows}
            </tbody>
          </table>

           <div className='flex jus justify-between items-center p-2 pt-4'>
            <div>

            </div>
           <div className='flex flex-col'>

       
<h1 className=' font-semibold -mt-1 border-b text-md text-center text-gray-600 '>{data?.manager} </h1>

<h1 className='text-center font-medium text-gray-600 text-md'>Manager</h1>

</div>
           </div>
        </div>
      </div>
    </>
  );
};

export default Bazarlistdetails;
