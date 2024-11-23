import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axoissecure from "../../../Hooks/Axoisscure";
import { Helmet } from "react-helmet";
import DashCustomNav from "../../../Share/Formnav";
import { MdDownloading } from "react-icons/md";
import { usePDF } from "react-to-pdf";
const RoomDetails = () => {
  const student = {
    id: 2,
    name: "Ovi",
    fatherName: "Declan Emerson",
    motherName: "Brian Holman",
    fatherNumber: "+8801581782193",
    motherNumber: "+8801581782193",
    birthCertificate: "",
    number: "01737531114",
    session: "22-23",
    nid: "1111111111111111",
    address: "Rangpur",
    email: "ahsan.zahid18@systechdigital.com",
    joiningDate: "2024-11-22",
    profile: "uploads/1732353756586-443656342.JPG",
    code: "TXN-OVI-20241122",
    status: 1,
  };


  const { id } = useParams();

  const { data: studentData, refetch } = useQuery({
    queryKey: ["studentData"],
    queryFn: async () => {
      try {
        const res = await axoissecure.get(`/rooms/${id}`);
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
      filename: `memberdetails.pdf`,
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


  const image = `${import.meta.env.VITE_API_URL}${"/"}${studentData?.studentOne?.profile}`;

  const image1 = `${import.meta.env.VITE_API_URL}${"/"}${studentData?.studentTwo?.profile}`;


  return (

    <>
    
    <Helmet>
        <title>Manager || Room details</title>
      </Helmet>
      <DashCustomNav  name={'Room Details'} listroute={'/dashboard/roomlist'}/>
      
      
      <div className='flex  justify-end pr-5  pb-5'>

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

      <div ref={targetRef} className="flex justify-center gap-24 items-center  my-3">

{
    studentData?.studentOne && 
    <div>
    
     <h1 className="pb-4 font-semibold">Student-1</h1>
    
    <div className="w-96 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
       {/* Card Header */}
       <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 px-6 flex items-center jus justify-center">
         <h1 className="text-lg text-center font-bold">STUDENT ID CARD</h1>
         
       </div>
    
       {/* Profile Section */}
       <div className="p-6 flex flex-col items-center">
         <img
           src={image}
           alt="Profile"
           className="w-28 h-28 rounded-full shadow-md object-cover border-4 border-blue-100"
         />
         <h2 className="mt-3 text-xl font-semibold">{studentData?.studentOne?.name}</h2>
         <p className="text-sm text-gray-500">Session: {studentData?.studentOne?.session}</p>
         <p className="text-sm text-gray-500 font-semibold">ID: {studentData?.studentOne?.code}</p>
       </div>
    
       {/* Details Section */}
       <div className="px-6 py-4 text-sm space-y-2">
         <div className="flex justify-between">
           <span className="font-medium text-gray-700">Father:</span>
           <span className="text-gray-600">{studentData?.studentOne?.fatherName}</span>
         </div>
         <div className="flex justify-between">
           <span className="font-medium text-gray-700">Mother:</span>
           <span className="text-gray-600">{studentData?.studentOne?.motherName}</span>
         </div>
         <div className="flex justify-between">
           <span className="font-medium text-gray-700">Father's Phone:</span>
           <span className="text-gray-600">{studentData?.studentOne?.fatherNumber}</span>
         </div>
         <div className="flex justify-between">
           <span className="font-medium text-gray-700">Mother's Phone:</span>
           <span className="text-gray-600">{studentData?.studentOne?.motherNumber}</span>
         </div>
         <div className="flex justify-between">
           <span className="font-medium text-gray-700">Phone:</span>
           <span className="text-gray-600">{studentData?.studentOne?.number}</span>
         </div>
         <div className="flex justify-between">
           <span className="font-medium text-gray-700">NID:</span>
           <span className="text-gray-600">{studentData?.studentOne?.nid}</span>
         </div>
         <div className="flex justify-between">
           <span className="font-medium text-gray-700">Address:</span>
           <span className="text-gray-600 truncate">{studentData?.studentOne?.address}</span>
         </div>
         <div className="flex justify-between">
           <span className="font-medium text-gray-700">Email:</span>
           <span className="text-gray-600 truncate">{studentData?.studentOne?.email}</span>
         </div>
         <div className="flex justify-between">
           <span className="font-medium text-gray-700">Joining Date:</span>
           <span className="text-gray-600">
             {new Date(studentData?.studentOne?.joiningDate).toLocaleDateString()}
           </span>
         </div>
       </div>
    
       {/* Footer Section */}
       <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
         <p
           className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
             studentData?.studentOne?.status === 1
               ? "bg-green-100 text-green-600"
               : "bg-red-100 text-red-600"
           }`}
         >
           {studentData?.studentOne?.status === 1 ? "Active" : "Inactive"}
         </p>
         <img
           src={`https://barcode.tec-it.com/barcode.ashx?data=${studentData?.studentOne?.code}`}
           alt="Barcode"
           className="w-32 h-10 object-contain"
         />
       </div>
     </div>
    </div>
}




{
    studentData?.studentTwo && <div>

    <h1 className="pb-4 font-semibold">Student-2</h1>
   
   <div className="w-96 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Card Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 px-6 flex items-center jus justify-center">
        <h1 className="text-lg text-center font-bold">STUDENT ID CARD</h1>
        
      </div>
   
      {/* Profile Section */}
      <div className="p-6 flex flex-col items-center">
        <img
          src={image1}
          alt="Profile"
          className="w-28 h-28 rounded-full shadow-md object-cover border-4 border-blue-100"
        />
        <h2 className="mt-3 text-xl font-semibold">{studentData?.studentTwo?.name}</h2>
        <p className="text-sm text-gray-500">Session: {studentData?.studentTwo?.session}</p>
        <p className="text-sm text-gray-500 font-semibold">ID: {studentData?.studentTwo?.code}</p>
      </div>
   
      {/* Details Section */}
      <div className="px-6 py-4 text-sm space-y-2">
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Father:</span>
          <span className="text-gray-600">{studentData?.studentTwo?.fatherName}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Mother:</span>
          <span className="text-gray-600">{studentData?.studentTwo?.motherName}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Father's Phone:</span>
          <span className="text-gray-600">{studentData?.studentTwo?.fatherNumber}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Mother's Phone:</span>
          <span className="text-gray-600">{studentData?.studentTwo?.motherNumber}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Phone:</span>
          <span className="text-gray-600">{studentData?.studentTwo?.number}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">NID:</span>
          <span className="text-gray-600">{studentData?.studentTwo?.nid}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Address:</span>
          <span className="text-gray-600 truncate">{studentData?.studentTwo?.address}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Email:</span>
          <span className="text-gray-600 truncate">{studentData?.studentTwo?.email}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Joining Date:</span>
          <span className="text-gray-600">
            {new Date(studentData?.studentTwo?.joiningDate).toLocaleDateString()}
          </span>
        </div>
      </div>
   
      {/* Footer Section */}
      <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
        <p
          className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
            studentData?.studentTwo?.status === 1
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {studentData?.studentTwo?.status === 1 ? "Active" : "Inactive"}
        </p>
        <img
          src={`https://barcode.tec-it.com/barcode.ashx?data=${studentData?.studentTwo?.code}`}
          alt="Barcode"
          className="w-32 h-10 object-contain"
        />
      </div>
    </div>
   </div>
}
</div>
      </>
   
  );
};

export default RoomDetails;
