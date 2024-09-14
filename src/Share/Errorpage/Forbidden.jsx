

import React from 'react';
import Lottie from "lottie-react";
import error from '../../assets/error.json'
import { Link } from 'react-router-dom';



const Forbidden = () => {
    return (
        <>
         <div className=' min-h-screen my-10  max-w-screen-lg mx-auto'>

              <div className='ml-[280px]'>
              <Lottie animationData={error}   style={{  width: 500}} />
              </div>

              <h1 className='text-2xl pt-10 font-semibold text-red-600 text-center'>Sorry, You are not authorized to view this page</h1>
              <p className='text-lg text-center font-medium text-gray-600'>If this is an error, Please contact with the administrator</p>


             <div className='w-1/6 mx-auto pt-10'>
            <Link to={'/'}>
            <button className=" bg-red-600 w-[132px] h-[36px] px-0 text-[15px] font-bold text-white rounded-[3px]">
            
            Back Home
          </button>
            </Link>
             </div>

         </div>
        
        </>
    );
};

export default Forbidden;