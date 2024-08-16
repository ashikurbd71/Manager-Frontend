import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { FaPrint, FaUser } from "react-icons/fa6";

import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axoissecure from "../../../Hooks/Axoisscure";
import DashCustomNav from "../../../Share/Formnav";


const MyreportDetails = () => {

  const { id } = useParams();

  const { data, refetch } = useQuery({
    queryKey: ["volunteer"],
    queryFn: async () => {
      try {
        const res = await axoissecure.get(`/report/${id}`);


        return res.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    },
  });

  console.log(data);

  const join = data?.date;
  const parsedDate = new Date(join);

  // Format the date as "14 May 2024"
  const formattedDate = parsedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  
  return (
    <>
      <Helmet>
        <title>Manager || Report Details</title>
      </Helmet>
   
      <DashCustomNav name={"Report Details"} listroute={"/public/myreport"} />

      <div className="px-10 ">
      <div className='flex  justify-end  pb-5'>

<div className='flex border-2 cursor-pointer item items-center px-3 py-1 gap-1'>
<FaPrint className='text-bl text-blue-400'/>
<h1 className='text-lg font-medium text-gray-500'> Print</h1>
</div>

</div>

        <div className=" bg-white ">
       

          
          <div className="text-gray-700 p-5">
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 text-sm">
                <tbody>
                
                <tr>
                    <td className="px-4 py-2 font-semibold border border-gray-200">Report Date</td>
                    <td className="px-4 py-2 border border-gray-200">{formattedDate}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-semibold border border-gray-200">Bazarkari</td>
                    <td className="px-4 py-2 border border-gray-200">Ashikur Rahman Ovi , Nasir</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-semibold border border-gray-200">Total Tk</td>
                    <td className="px-4 py-2 border border-gray-200">{data?.totalTk}Tk</td>
                  </tr>

                  <tr>
                    <td className="px-4 py-2 font-semibold border border-gray-200">Total Meal</td>
                    <td className="px-4 py-2 border border-gray-200">{data?.totalMeal || 0}</td>
                  </tr>

                  <tr>
                    <td className="px-4 py-2 font-semibold border border-gray-200">Extra</td>
                    <td className="px-4 py-2 border border-gray-200">{data?.extraTk || 0}Tk</td>
                  </tr>

                  <tr>
                    <td className="px-4 py-2 font-semibold border border-gray-200">Comments</td>
                    <td className="px-4 py-2 border border-gray-200">{data?.comments || 0}</td>
                  </tr>

                  <tr>
                    <td className="px-4 py-2 font-semibold border border-gray-200">Report Status</td>
                    <td className="px-4 py-2 border border-gray-200">{data?.reportStatus}</td>
                  </tr>

                  <tr>
                    <td className="px-4 py-2 font-semibold border border-gray-200">Feedback</td>
                    <td className="px-4 py-2 border border-gray-200">{data?.feedBack}</td>
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

export default MyreportDetails;
