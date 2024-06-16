import React, { useState, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from 'react-select';
import { Helmet } from "react-helmet";
import DashCustomNav from "../../../Share/Formnav";
import axoissecure from "../../../Hooks/Axoisscure";

// Validation Schema
const Schema = Yup.object().shape({
  name: Yup.string()
    .label('Name')
    .required(),
  title: Yup.string()
  .required()
    .label("Title")
    .required(),
 
  startDate: Yup.string()
    .label(' Date')
    .required(),
  notice_title: Yup.string()
    .label('Notice Title')
    .required(),
  
  deatils: Yup.string()
    .label('Details')
    .required(),
  
});

const AddNotice = () => {
  
  const titleOption = [
    { value: 'Meal Manager', label: 'Meal Manager' },
    { value: 'Owner', label: 'Owner' },
  ];

  const formik = useFormik({
    initialValues: {
      name: "",
      title: "",
      startDate: '',
      notice_title : "",
      deatils : ""
    
    },
    validationSchema: Schema,
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      try {
        await axoissecure.post("/members", {
          name: values.name,
          title: values.title,
       
          
          // date: new Date()?.split("T")[0],
        });
        console.log("Product added successfully:", values);
        toast.success("Manager Added successfully!");
        resetForm();
      } catch (error) {
        toast.error("Error adding Manager");
        console.error("Error adding Manager:", error);
      }
    },
  });

  // style
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: "1px solid #0284C7",
      borderRadius: "0.30rem",
      padding: "0.2rem",
      width: "100%",
      boxShadow: state.isFocused ? "0 0 0 1px #000000" : "none",
      "&:hover": {
        borderColor: "#0284C7",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#0284C7" : "#fff",
      color: state.isSelected ? "#fff" : "#000",
      "&:hover": {
        backgroundColor: "#0284C7",
        color: "#fff",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#000",
    }),
    menu: (provided) => ({
      ...provided,
      border: "1px solid #0284C7",
      borderRadius: "0.30rem",
    }),
  };

  return (
    <>
      <DashCustomNav name={"Add Notice"} listroute={'/dashboard/noticelist'} />
      <div className="p-8">
        <Helmet><title>Manager || Add Manager</title></Helmet>
        <div>
          <form
            onSubmit={formik.handleSubmit}
            className="w-[700px] bg-white p-8 rounded-md"
          >
            <div className="grid grid-cols-1 gap-4">
              <div className="flex flex-col">
                <label htmlFor="name">
                  1. Assign Name{" "}
                  <span className="text-xl font-semibold text-red-500">*</span>
                </label>
                <input
                  placeholder="Full Name"
                  id="name"
                  name="name"
                  className="py-2 border-2 rounded-md border-[#0284C7] px-3 w-full"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="text-red-600">{formik.errors.name}</div>
                ) : null}
              </div>


              <div className="flex flex-col">
                <label htmlFor="title">
                  2. Title(Assigner) {" "}
                  <span className="text-xl font-semibold text-red-500">*</span>
                </label>
                <Select
  placeholder="Select Title"
  id="title"
  name="title"
  styles={customStyles}
  options={titleOption}
  onChange={(option) => formik.setFieldValue("title", option.value)}
  onBlur={formik.handleBlur}
  value={titleOption.find(option => option.value === formik.values.title)} // Corrected value binding
/>
                {formik.touched.title && formik.errors.title ? (
                  <div className="text-red-600">{formik.errors.title}</div>
                ) : null}
              </div>


              <div className="flex pt-2 flex-col">
                <label htmlFor="startDate">
                  3. Date <span className="text-xl font-semibold text-red-500">*</span>
                </label>
                <input
                  id="startDate"
                  name="startDate"
                  className="py-2 border-2 rounded-md border-[#0284C7] px-3 w-full"
                  type="date"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.startDate}
                />
                {formik.touched.startDate && formik.errors.startDate ? (
                  <div className="text-red-600">{formik.errors.startDate}</div>
                ) : null}
              </div>

           
              <div className="flex flex-col">
                <label htmlFor="notice_title">
                  4. Notice Title{" "}
                  <span className="text-xl font-semibold text-red-500">*</span>
                </label>
                <input
                  placeholder="Notice Title"
                  id="notice_title"
                  name="notice_title"
                  className="py-2 border-2 rounded-md border-[#0284C7] px-3 w-full"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.notice_title}
                />
                {formik.touched.notice_title && formik.errors.notice_title ? (
                  <div className="text-red-600">{formik.errors.notice_title}</div>
                ) : null}
              </div>

              <div className="flex flex-col">
                <label htmlFor="notice_title">
                  5. Details{" "}
                  <span className="text-xl font-semibold text-red-500">*</span>
                </label>
                <textarea
                rows={5}
                  placeholder="Notice Details"
                  id="deatils"
                  name="deatils"
                  className="py-2 border-2 rounded-md border-[#0284C7] px-3 w-full"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.deatils}
                />
                {formik.touched.deatils && formik.errors.deatils ? (
                  <div className="text-red-600">{formik.errors.deatils}</div>
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

export default AddNotice;
