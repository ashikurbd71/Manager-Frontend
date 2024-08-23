import React from 'react';

const PostDetails = () => {
    return (
      <>
      
      <div className='grid grid-cols-3 border-b pb-2 mt-3 gap-4'>

         <div className='flex flex-col gap-1'>

            <h1 className='text-sm font-semibold text-center text-gray-600'>Total Money</h1>

            <h1 className='text-sm font-bold text-center text-[#0284C7]'>500$</h1>

         </div>

         
         <div className='flex flex-col gap-1'>

            <h1 className='text-sm font-semibold text-center text-gray-600'>Total Meal</h1>

            <h1 className='text-sm font-bold text-center text-[#0284C7]'>17</h1>

         </div>


         
         <div className='flex flex-col gap-1'>

            <h1 className='text-sm font-semibold text-center text-gray-600'>Total Loan</h1>

            <h1 className='text-sm font-bold text-center text-[#0284C7]'>400$</h1>

         </div>
        
        </div>

         <div className='grid grid-cols-2 border-b pb-2 mt-3 gap-4'>

         <div className='flex flex-col gap-1'>

            <h1 className='text-sm font-semibold text-center text-gray-600'>Blance</h1>

            <h1 className='text-sm font-bold text-center text-[#0284C7]'>10$</h1>

         </div>

         
         <div className='flex flex-col gap-1'>

            <h1 className='text-sm font-semibold text-center text-gray-600'>Meal</h1>

            <h1 className='text-sm font-bold text-center text-[#0284C7]'>00</h1>

         </div>


   
        
        </div>

        <div className='grid grid-cols-3  mt-3 gap-4'>

<div className='flex flex-col gap-1'>

   <h1 className='text-sm font-semibold text-center text-gray-600'>Extra Money</h1>

   <h1 className='text-sm font-bold text-center text-[#0284C7]'>10$</h1>

</div>

      
<div className='flex flex-col gap-1'>

<h1 className='text-sm font-semibold text-center text-gray-600'>Total Guest</h1>

<h1 className='text-sm font-bold text-center text-[#0284C7]'>00</h1>

</div>

<div className='flex flex-col gap-1'>

   <h1 className='text-sm font-semibold text-center text-gray-600'>Last Payment</h1>

   <h1 className='text-sm font-bold text-center text-[#0284C7]'>9/9/24</h1>

</div>




</div>
      
      </>
    );
};

export default PostDetails;