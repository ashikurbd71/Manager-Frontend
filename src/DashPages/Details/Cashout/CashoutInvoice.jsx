import React, { useState } from "react";
import DashCustomNav from "../../../Share/Formnav";
import { usePDF } from "react-to-pdf";
import { MdDownloading } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axoissecure from "../../../Hooks/Axoisscure";
const CashoutInvoice = () => {
  // Invoice data in JSON format
  const cash = {
    hostel: {
      name: "Ovi Hostel",
      location: "Rbagpur",
      phone: "099987",
    },
   
  };



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
      filename: `CashoutInvoice.pdf`,
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

  
  const { id } = useParams();

  const { data , refetch } = useQuery({
    queryKey: ["volunteer"],
    queryFn: async () => {
      try {
        const res = await axoissecure.get(`/cashout/${id}`);
        console.log(res.data);
    
        return res.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    },
  });


  console.log(cash)

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
          <DashCustomNav name={'Cash In Voice '} listroute={'/dashboard/cashinlist'} />

              
      <div className='flex  justify-end pr-7'>

<div className="w-100 flex flex-grow flex-col  items-end justify-start">
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

          <div ref={targetRef} className=" flex items-center justify-center">
      <div className="w-[400px] bg-white p-6 shadow-lg rounded-lg border border-gray-200">
        {/* Header */}
        <div className="text-center border-b pb-4 mb-4">
          <h1 className="text-2xl font-bold text-gray-800">INVOICE</h1>
          <p className="text-sm text-gray-600">Date: {data?.date?.split('T')[0]}</p>
        </div>

        {/* Hostel Info */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800">{item?.name}</h2>
          <p className="text-sm text-gray-600">Location: {item?.location}</p>
          <p className="text-sm text-gray-600">Phone: {item?.phone}</p>
        </div>

        {/* Invoice Details */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Invoice Details</h3>
          <div className="flex justify-between border-b py-2">
            <span className="text-gray-600">Name</span>
            <span className="text-gray-800 font-medium">{data?.name}</span>
          </div>
          <div className="flex justify-between border-b py-2">
            <span className="text-gray-600">Amount</span>
            <span className="text-gray-800 font-medium">${data?.amount}</span>
          </div>

          <div className="flex justify-between border-b py-2">
            <span className="text-gray-600">Reason</span>
            <span className="text-gray-800 font-medium">{data?.comment}</span>
          </div>
          <div className="flex justify-between border-b py-2">
            <span className="text-gray-600">Transaction Code</span>
            <span className="text-gray-800 font-medium">{data?.code}</span>
          </div>
          <div className="flex justify-between border-b py-2">
            <span className="text-gray-600">Invoice ID</span>
            <span className="text-gray-800 font-medium">#{data?.id}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">Thank you for staying with us!</p>
        </div>
      </div>
    </div>
    </>
  
  );
};

export default CashoutInvoice;
