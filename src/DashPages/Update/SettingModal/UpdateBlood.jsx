import React, { useEffect } from 'react';
import Modal from '../../../Share/CustomModal/CustomModal';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useQuery } from '@tanstack/react-query';
import axoissecure from '../../../Hooks/Axoisscure';
import { toast } from 'react-toastify';

// Validation Schema
const Schema = Yup.object().shape({
    bloodgroup: Yup.string()
    .label('Blood Group')
    .required(),
  
   
  });
  
const UpdateBlood = ({isOpen,setIsOpen,update,refetch}) => {

    console.log(update?.name)

    
   


    const formik = useFormik({
        initialValues: {
            bloodgroup: "",
          
        },
        validationSchema: Schema,
        onSubmit: async (values, { resetForm }) => {
          console.log(values)
          try {
            await axoissecure.patch(`/blood/${update?.id}`, {
                name: values.bloodgroup,
            });
            console.log("Product added successfully:", values);
            toast.success("BloodGroup Update  successfully!");
            refetch();
            setIsOpen(false)
          } catch (error) {
            toast.error("Error Update BloodGroup");
            console.error("Error adding Semister:", error);
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
            bloodgroup: update.name || "",

          });
      }
  }, [update]);

    return (
     <>
     <Modal isOpen={isOpen} setIsOpen={setIsOpen}>

    
     <div>
        <form
          onSubmit={formik.handleSubmit}
          className="w-[400px] bg-white p-2  rounded-md"
        >
          <div className="grid  grid-cols-1 gap-4">

            {/* Product SL */}
            <div className="flex flex-col">
              <label htmlFor="bloodgroup" className="pb-1 text-[#726f6f]">
                1. Blood Group  {" "}
                <span className="text-xl font-semibold text-red-500">*</span>
              </label>
              <input
              placeholder="Blood Group"
                id="bloodgroup"
                name="bloodgroup"
                            className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.bloodgroup}
              />
              {formik.touched.bloodgroup && formik.errors.bloodgroup ? (
                <div className="text-red-600">{formik.errors.bloodgroup}</div>
              ) : null}
            </div>
                  

          </div>


          <div className="flex justify-end items-center gap-4">
            <button
              className="w-[100px] bg-[#0284C7] text-white mt-10 rounded-lg h-[40px] border-2 font-bold"
              type="submit"
            >
              Save
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

export default UpdateBlood;