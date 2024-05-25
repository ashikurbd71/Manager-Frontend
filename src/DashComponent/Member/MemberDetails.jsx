import React from 'react';

const MemberDetails = () => {
    return (
        <div className='p-10  '>

          <div className='border-2 bg-white min min-h-screen'>

  <div className='  justify-items-center items-center p-10 flex'>
  <img src="" alt=""  className=' w-[200px] h-[200px] '/>
  </div>
           
     <h1 className='text-center text-[23px] font-semibold underline text-[#0284C7]'>Member Details</h1>

        <div className='grid grid-cols-2 gap-4 mt-10 mx-10'>

            <div className='flex items-center gap-10'><h1>Name</h1> <span>:</span>
            <span>Ashikur Rahman Ovi</span></div>

        </div>
          </div>
            
        </div>
    );
};

export default MemberDetails;