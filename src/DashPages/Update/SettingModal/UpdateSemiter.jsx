import React, { useEffect } from 'react';
import Modal from '../../../Share/CustomModal/CustomModal';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useQuery } from '@tanstack/react-query';
import axoissecure from '../../../Hooks/Axoisscure';
import { toast } from 'react-toastify';


// Validation Schema
const Schema = Yup.object().shape({
    semister: Yup.string()
    .label('Semister')
    .required(),
    shortname: Yup.string()
    .label('Short Name')
    .required(),
   
  });
  
const UpdateSemiter = ({isOpen,setIsOpen,update,refetch}) => {

    console.log(update?.name)

    
   


    const formik = useFormik({
        initialValues: {
            semister: "",
            shortname: ""
          
        },
        validationSchema: Schema,
        onSubmit: async (values, { resetForm }) => {
          console.log(values)
          try {
            await axoissecure.patch(`/semister/${update?.id}`, {
              name: values.semister,
              shortName : values.shortname,
            });
            console.log("Product added successfully:", values);
            toast.success("Semister Update  successfully!");
            refetch();
            setIsOpen(false)
          } catch (error) {
            toast.error("Error Update Semister");
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
              semister: update.name || "",
              shortname: update.shortName || ""
          });
      }
  }, [update]);

    return (
     <>
     <Modal isOpen={isOpen} setIsOpen={setIsOpen}>

    
     <div>
        <form
          onSubmit={formik.handleSubmit}
          className="w-[400px] bg-white p-2 rounded-md"
        >
          <div className="grid  grid-cols-1 gap-4">

            {/* Product SL */}
            <div className="flex flex-col">
              <label htmlFor="name" className="pb-1 text-[#726f6f]">
                1. Semister Name {" "}
                <span className="text-xl font-semibold text-red-500">*</span>
              </label>
              <input
              placeholder="Semister"
                id="semister"
                name="semister"
                            className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.semister}
              />
              {formik.touched.semister && formik.errors.semister ? (
                <div className="text-red-600">{formik.errors.semister}</div>
              ) : null}
            </div>
                  
                                     {/* short name */}
            <div className="flex flex-col">
              <label htmlFor="name" className="pb-1 text-[#726f6f]">
                2. Short Name {" "}
                <span className="text-xl font-semibold text-red-500">*</span>
              </label>
              <input
              placeholder="Short Name"
                id="shortname"
                name="shortname"
                            className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.shortname}
              />
              {formik.touched.shortname && formik.errors.shortname ? (
                <div className="text-red-600">{formik.errors.shortname}</div>
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
              className="w-[100px] bg-red-600 font-semibold mt-10 rounded-lg h-[40px] border-2 text-white"
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

export default UpdateSemiter;