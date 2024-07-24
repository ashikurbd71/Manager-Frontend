import React, { useEffect } from 'react';

import { useFormik } from 'formik';
import * as Yup from "yup";
import { toast } from 'react-toastify';
import Modal from '../../../../Share/CustomModal/CustomModal';

  
const ExtraDetails = ({isOpen,setIsOpen,update,refetch}) => {

    console.log(update?.name)

    
   


   
    const handleCancel = () => {

        setIsOpen(false)
      };

    

    return (
     <>
     <Modal isOpen={isOpen} setIsOpen={setIsOpen}>

    
      <div   className="w-[400px] bg-white p-2  rounded-md">
       
       <h1 className='fon font-semibold text-gray-600'>{update?.date}</h1>

       <div className='flex items-center gap-1'>

        <h1 className='fon font-semibold text-gray-600'>Extra : </h1>
        <h1 className='fon font-medium text-gray-500'>{update?.extraMoney}tk</h1>
       </div>

       <div className='flex pt-3 items-center gap-1'>

{/* <h1 className='fon font-semibold  text-gray-600'>Comment : </h1> */}
<p className='fon font-medium text-gray-500'>{update?.comments}</p>
</div>

       <div className='flex justify-between items-center'>
        <div>

        </div>

        <button
              className="w-[100px] bg-gray-200 font-bold mt-10 rounded-lg h-[40px] border-2 text-red-400"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
       </div>
      </div>
     </Modal>
     
     </>
    );
};

export default ExtraDetails;