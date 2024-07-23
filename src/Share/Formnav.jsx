import React from 'react';
import { IoCaretBackSharp } from "react-icons/io5";
import { FaAnglesRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';
const DashCustomNav = ({name,listroute}) => {
    return (
        <div className='flex justify-between p-5 lg:p-10 items-center'>
            
            <div className='flex justify-center items-center gap-2'>
            <h1 className='lg:text-[20px]  font-medium text-gray-500'>

            <div className='flex  gap-2 text-gray-500 justify-items-center items-center'>
                    <FaAnglesRight className='text-[#0284C7]'/>
                   {name}
                   </div>

            </h1>
            </div>
            <div className=''>
                <button className=' lg:text-lg  '>

                   <Link to={listroute}>
                   <div className='flex text-gray-500 justify-items-center items-center'>
                    <IoCaretBackSharp className='text-[#0284C7]'/>
                   Back list
                   </div>

                   </Link>
                </button>
                </div>            
        </div>
    );
};

export default DashCustomNav;