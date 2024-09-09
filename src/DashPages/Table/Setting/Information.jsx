import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import { FaEdit, FaTrashAlt, FaEye, FaBan } from 'react-icons/fa';
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import axoissecure from "../../../Hooks/Axoisscure";
import Tablenav from './../../../Share/Tablenav';
import Updateepartment from "../../Update/SettingModal/Updateepartment";
import Swal from "sweetalert2";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import Pagination from "../../../Share/PaginationTable/Pagination";
import { FaPlus } from "react-icons/fa6";





const Information = () => {


  const { data: item, refetch } = useQuery({
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

console.log(item)


  


 



  return (

    <>

    {/* <useHelmet name={'Manager || De list'} /> */}

    <Helmet><title>Manager || Information </title></Helmet>
    
    <h1 className="text-xl font-semibold text-[#0284C7] p-5"> Information </h1>

   

    <div className="my-3 flex mx-8 justify-between items-center">


      {
        item?.id ? <div>
        <Link to={`/dashboard/updateinfo/${item?.id}`}>
        <div className='flex text-white bg-[#0284C7] w-[120px] border-2 px-5 py-2 rounded-md gap-1 justify-items-center items-center'>
   
  Update
  <FaEdit className=''/>
  </div>
        </Link>
        </div> :   <div>
      <Link to={'/dashboard/setting/addinformation'}>
      <div className='flex text-white bg-[#0284C7] w-[120px] border-2 px-3 py-2 rounded-md gap-1 justify-items-center items-center'>
 
Add New
<FaPlus className=''/>
</div>
      </Link>
      </div>
      }

    

      

    </div>
    <div className='bg-white p-5  mx-8'>
 
 <div className="text-gray-700 ">
  <div className="overflow-x-auto">
    
    <table className="w-full border border-gray-200 text-sm">
        
      <tbody>

      <tr>
          <td className="px-4 py-2 font-bold border border-gray-200">Mass/Hostel</td>
          <td className="px-4 py-2 border font-semibold text-gray-600 border-gray-200">{item?.name}</td>
        </tr>
      <tr>
          <td className="px-4 py-2 font-bold border border-gray-200">Location</td>
          <td className="px-4 py-2 border font-semibold text-gray-600 border-gray-200">{item?.location}</td>
        </tr>

        <tr>
          <td className="px-4 py-2 font-bold border border-gray-200">Phone</td>
          <td className="px-4 py-2 border fon font-semibold text-gray-600 border-gray-200">{item?.phone}</td>
        </tr>


        <tr>
          <td className="px-4 py-2 font-bold border border-gray-200">Meal Charge</td>
          <td className="px-4 py-2 border font-semibold text-gray-600 border-gray-200">{item?.mealCharge}$</td>
        </tr>

        
      

        
      
     
      
      </tbody>
    </table>
  </div>

    

</div>
 </div>
    </>
  );
};

export default Information;
