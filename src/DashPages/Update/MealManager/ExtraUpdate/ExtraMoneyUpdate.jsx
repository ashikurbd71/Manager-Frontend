import React, { useEffect } from 'react';

import { useFormik } from 'formik';
import * as Yup from "yup";
import { useQuery } from '@tanstack/react-query';

import { toast } from 'react-toastify';
import axoissecure from '../../../../Hooks/Axoisscure';
import Modal from '../../../../Share/CustomModal/CustomModal';

// Validation Schema
const Schema = Yup.object().shape({
  addExtra: Yup.string()
  .label('Extra')
  .required(),

  comments: Yup.string()
  .label('Comments')
  .required(),
 
});

const ExtraMoneyUpdate = ({isOpen,setIsOpen,update,refetch}) => {

    console.log(update?.name)

    
   


    const formik = useFormik({
        initialValues: {
            addExtra: "",
        comments : ""
          
        },
        validationSchema: Schema,
        onSubmit: async (values, { resetForm }) => {
          console.log(values)
          try {
            await axoissecure.patch(`/mealextra/${update?.id}`, {
              extraMoney: values.addExtra,
              comments : values.comments,
            });
            console.log("Product added successfully:", values);
            toast.success("Extra Details Update  successfully!");
            refetch();
          } catch (error) {
            toast.error("Error Adding Extra b");
            console.error("Error adding Blood Group:", error);
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
            addExtra: update.extraMoney || "",
            comments : update.comments || ''
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
              <label htmlFor="addExtra" className="pb-1 text-[#726f6f]">
                1. Add Extra  {" "}
                <span className="text-xl font-semibold text-red-500">*</span>
              </label>
              <input
              placeholder="00"
                id="addExtra"
                name="addExtra"
                readOnly
                          className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.addExtra}
              />
              {formik.touched.addExtra && formik.errors.addExtra ? (
                <div className="text-red-600">{formik.errors.addExtra}</div>
              ) : null}
            </div>

                
                  

            <div className="flex flex-col">
              <label htmlFor="comments" className="pb-1 text-[#726f6f]">
                2. Comments  {" "}
                <span className="text-xl font-semibold text-red-500">*</span>
              </label>
              <textarea
              placeholder="Why Extra ?"
                id="comments"
                rows={5}
                name="comments"
                          className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.comments}
              />
              {formik.touched.comments && formik.errors.comments ? (
                <div className="text-red-600">{formik.errors.comments}</div>
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

export default ExtraMoneyUpdate;