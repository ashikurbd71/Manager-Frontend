import React, { useEffect } from 'react';

import { useFormik } from 'formik';
import * as Yup from "yup";
import { useQuery } from '@tanstack/react-query';

import { toast } from 'react-toastify';
import Modal from '../../../../Share/CustomModal/CustomModal';
import axoissecure from '../../../../Hooks/Axoisscure';


  
const MealEmergency = ({isOpen,setIsOpen,update,refetch}) => {

    console.log(update?.name)

    
   

    const formik = useFormik({
        initialValues: {
          loan: "",
          guest : ""
          
        },
   
        onSubmit: async (values, { resetForm }) => {
          console.log(values)
          try {
            await axoissecure.patch(`/mealmanage/${update?.id}`, {

              
              loan:  parseInt(update?.loan) + parseInt(values.loan) ,
              blance: parseInt(update?.blance) + parseInt(values?.loan) || parseInt(update?.blance ),
              
            
             
            });
            console.log("Product added successfully:", values);
            toast.success("Emergency Help  successful!");
            refetch();
            setIsOpen(false)

          } catch (error) {
            toast.error("Error adding Institute");
            console.error("Error adding Institute:", error);
          }
        },
      });

    const handleCancel = () => {
        formik.handleReset()
        setIsOpen(false)
      };

       

    return (
     <>
     <Modal isOpen={isOpen} setIsOpen={setIsOpen}>

    
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="w-[400px] bg-white p-2  rounded-md"
        >
          <div className="grid  grid-cols-1 gap-3">

            {/* institute */}
            <div className="flex flex-col">
              <label htmlFor="loan" className="pb-1 text-[#726f6f]">
                1. Loan {" "}
          
              </label>
              <input
              placeholder="00"
                id="loan"
                name="loan"
                           className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
                type="text"
                onChange={formik.handleChange}
              
                onBlur={formik.handleBlur}
                value={formik.values.loan}
              />
           
            </div>

          
                  

          </div>


          <div className="flex justify-end items-center gap-4">
            <button
              className="w-[100px] bg-[#0284C7] text-white mt-10 rounded-lg h-[40px] border-2 font-bold"
              type="submit"
            >
              Send
            </button>
            <button
              className="w-[100px] bg-gray-200 font-bold mt-10 rounded-lg h-[40px] border-2 text-red-400"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
     </Modal>
     
     </>
    );
};

export default MealEmergency;