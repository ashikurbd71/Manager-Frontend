import React, { useEffect, useState } from 'react';
import Modal from '../../../Share/CustomModal/CustomModal';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useQuery } from '@tanstack/react-query';
import axoissecure from '../../../Hooks/Axoisscure';
import { toast } from 'react-toastify';
import { getMember } from '../../../Share/Api/SelectorApi/settingselector';
import  Select  from 'react-select';



  
  
const MealUpdate = ({isOpen,setIsOpen,update,refetch}) => {

    console.log(update)

    
   
  
    const today = new Date()
  const formik = useFormik({
    initialValues: {
   
      addmoney : "",
       
      taka: "",
      totalmeal: "",
     

    },
    // validationSchema: Schema,
    onSubmit: async (values, { resetForm }) => {
      console.log(values)
      try {
        await axoissecure.patch(`/mealmanage/${update?.id}`, {


         
          addMoney: parseInt(values.taka) + parseInt(values.addmoney),
          totalMeal: values.totalmeal,
          date : today
        
        
       
      
          
          // date: new Date()?.split("T")[0],
        });
        console.log("Product added successfully:", values);
        toast.success("Meal Update  successfully!");
       refetch()
        
      } catch (error) {
        toast.error("Error Update Meal");
        console.error("Error adding Member:", error);
      }
    },
  });

    

      
    
   
    
    
    
    
    
      
    
    

    const handleCancel = () => {
        formik.handleReset()
        setIsOpen(false)
      };

       // Update form values when `update` prop changes
    useEffect(() => {
      if (update) {
          formik.setValues({
              taka: update.addMoney || "",
              totalmeal: update.totalMeal || ""
          });
      }
  }, [update]);

    return (
     <>
     <Modal isOpen={isOpen} setIsOpen={setIsOpen}>

    
     <div>
        <form
          onSubmit={formik.handleSubmit}
          className="w-[400px] bg-white p-3  rounded-md"
        >

<h1 className='text-center font-semibold text-xl'>{update?.name}</h1>
<h1 className='text-center -mt-1 text-gray-500'>{update?.member?.email}</h1>

          <div className="grid mt-3 grid-cols-1 gap-4">

 

          <div className="flex pt-2 flex-col">
              <label htmlFor="addmoney"    className="pb-1 text-[#726f6f]">
                1. Add Money <span className="text-xl font-semibold text-red-500">*</span>
               
              </label>
              <input
                placeholder="00$"
                id="addmoney"
                name="addmoney"
          
                     className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.addmoney}
              />
              {formik.touched.addmoney && formik.errors.addmoney ? (
                <div className="text-red-600">{formik.errors.addmoney}</div>
              ) : null}
            </div>
          


            <div className="flex pt-2 flex-col">
              <label htmlFor="taka"    className="pb-1 text-[#726f6f]">
                2. Blance <span className="text-xl font-semibold text-red-500">*</span>
               
              </label>
              <input
                placeholder="00$"
                id="taka"
                name="taka"
                readOnly
                     className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.taka}
              />
              {formik.touched.taka && formik.errors.taka ? (
                <div className="text-red-600">{formik.errors.taka}</div>
              ) : null}
            </div>


            <div className="flex  flex-col">
              <label htmlFor="totalmeal" className="pb-1 text-[#726f6f]">
                3. Total Meal{" "}
                <span className="text-xl font-semibold text-red-500">*</span>
              </label>
              <input
                id="totalmeal"
                readOnly
                placeholder="00"
                name="totalmeal"
                     className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.totalmeal}
              />
             
            </div>

         


          </div>

          <div className="flex justify-end items-center gap-4">
            <button
              className="w-[120px] bg-[#0284C7] text-white mt-10 rounded-lg h-[40px] border-2 font-bold"
              type="submit"
            >
              Update Meal
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

export default MealUpdate;