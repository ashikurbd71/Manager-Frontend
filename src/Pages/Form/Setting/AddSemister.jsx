import React, { useState,useRef } from "react";
import {useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";
import DashCustomNav from "../../../Share/Formnav";
import axoissecure from "../../../Share/Hooks/Axoisscure";

// Validation Schema
const Schema = Yup.object().shape({
  semister: Yup.string()
  .label('Semister')
  .required(),

 
});

const AddSemister = () => {
  
  const formik = useFormik({
    initialValues: {
        semister: "",
      
    },
    validationSchema: Schema,
    onSubmit: async (values, { resetForm }) => {
      console.log(values)
      try {
        await axoissecure.post("/members", {
          name: values.semister,
          
        });
        console.log("Product added successfully:", values);
        toast.success("Semister Added  successfully!");
        resetForm();
      } catch (error) {
        toast.error("Error adding Semister");
        console.error("Error adding Semister:", error);
      }
    },
  });


  
  return (
    <>
     <DashCustomNav name={"Add Semister "} listroute={'/dashboard/setting/semisterlist'} />
    
  
    <div className="p-8">
       <Helmet><title>Manager || Add Semister </title></Helmet>
      
      
     
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="w-[500px] bg-white p-8  rounded-md"
        >
          <div className="grid  grid-cols-1 gap-4">

            {/* Product SL */}
            <div className="flex flex-col">
              <label htmlFor="name">
                1. Semister Name {" "}
                <span className="text-xl font-semibold text-red-500">*</span>
              </label>
              <input
              placeholder="Semister"
                id="semister"
                name="semister"
                className="py-2 border-2 rounded-md border-[#0284C7] px-3 w-full"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.semister}
              />
              {formik.touched.semister && formik.errors.semister ? (
                <div className="text-red-600">{formik.errors.semister}</div>
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
              onClick={formik.handleReset}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>

    </>
  );
};

export default AddSemister;
