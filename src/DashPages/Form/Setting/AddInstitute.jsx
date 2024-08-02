import React, { useState,useRef } from "react";
import {useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";
import DashCustomNav from "../../../Share/Formnav";
import axoissecure from './../../../Hooks/Axoisscure';
import CustomModal from './../../../Share/CustomModal/CustomModal';


// Validation Schema
const Schema = Yup.object().shape({
  institute:Yup.string()
  .label('Institute')
  .required(),

  shortname:Yup.string()
  .label('Short Name')
  .required(),
});

const AddInstitute = () => {
  
  const formik = useFormik({
    initialValues: {
      institute: "",
      shortname : ""
      
    },
    validationSchema: Schema,
    onSubmit: async (values, { resetForm }) => {
      console.log(values)
      try {
        await axoissecure.post("/institute", {
          name: values.institute,
          shortName : values.shortname,
           status:"1",
        });
        console.log("Product added successfully:", values);
        toast.success("Institute Added  successfully!");
        resetForm();
      } catch (error) {
        toast.error("Error adding Institute");
        console.error("Error adding Institute:", error);
      }
    },
  });


  
  return (
    <>
     <DashCustomNav name={"Add Institute "} listroute={'/dashboard/setting/institutelist'} />
    
  
    <div className="p-8">
       <Helmet><title>Manager || Add Institute </title></Helmet>
      
    
     
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="w-[500px] bg-white p-8  rounded-md"
        >
          <div className="grid  grid-cols-1 gap-4">

            {/* institute */}
            <div className="flex flex-col">
              <label htmlFor="name" className="pb-1 text-[#726f6f]">
                1. Institute Name {" "}
                <span className="text-xl font-semibold text-red-500">*</span>
              </label>
              <input
              placeholder="Institute Name"
                id="institute"
                name="institute"
                   className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.institute}
              />
              {formik.touched.institute && formik.errors.institute ? (
                <div className="text-red-600">{formik.errors.institute}</div>
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

export default AddInstitute;
