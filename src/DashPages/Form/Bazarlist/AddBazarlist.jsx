import React, { useState,useRef } from "react";
import {useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";
import DashCustomNav from "../../../Share/Formnav";
import axoissecure from './../../../Hooks/Axoisscure';
import CustomModal from './../../../Share/CustomModal/CustomModal';
import  Select  from 'react-select';



const AddBazarlist = () => {
  
  const formik = useFormik({
    initialValues: {
      institute: "",
      shortname : ""
      
    },

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

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: "1px solid #979292",
      borderRadius: "0.30rem",
      padding: "0.2rem",
      width: "100%",
      boxShadow: state.isFocused ? "0 0 0 1px #0284C7" : "none",
      "&:hover": {
        borderColor: "#0284C7",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#0284C7" : "#fff",
      color: state.isSelected ? "#fff" : "#726f6f",
      "&:hover": {
        backgroundColor: "#0284C7",
        color: "#fff",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#726f6f",
    }),
    menu: (provided) => ({
      ...provided,
      border: "1px solid #0284C7",
      borderRadius: "0.30rem",
    }),
  };


  
  return (
    <>
     <DashCustomNav name={"Add Bazar List "} listroute={'/dashboard/bazalist'} />
    
  
    <div className="p-8">
       <Helmet><title>Manager || Add Bazar List </title></Helmet>
      
    
     
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="w-full bg-white p-8  rounded-md"
        >
       <div className="grid grid-cols-1 gap-3">


      <div>
        <h1 className="font-bold text-red-600 pb-3">Day-01</h1>
      <div className="grid  grid-cols-3 gap-4">

{/* institute */}
<div className="flex flex-col">
  <label htmlFor="date1" className="pb-1 text-[#726f6f]">
    1. Date {" "}

  </label>
  <input
  placeholder="Institute Name"
    id="date1"
    name="date1"
       className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
    type="date"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.date1}
  />
 
</div>

{/* short name */}
<div className="flex flex-col">
  <label htmlFor="bazarkari11" className="pb-1 text-[#726f6f]">
    2. BazarKari-1{" "}
 
  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari11"
    name="bazarkari11"
    styles={customStyles}
    className="text-[#726f6f]"
    // options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari11", option.value)}
    onBlur={formik.handleBlur}
    // value={InstituteOptions.find(option => option.value === formik.values.institute)}
  />

</div>

 {/* short name */}
 <div className="flex flex-col">
  <label htmlFor="bazarkari21" className="pb-1 text-[#726f6f]">
    3. BazarKari-2{" "}

  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari21"
    name="bazarkari21"
    styles={customStyles}
    className="text-[#726f6f]"
    // options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari21", option.value)}
    onBlur={formik.handleBlur}
    // value={InstituteOptions.find(option => option.value === formik.values.institute)}
  />

</div>

</div>
      </div>



      <div>
        <h1 className="font-bold text-red-600 pb-3">Day-02</h1>
      <div className="grid  grid-cols-3 gap-4">

{/* institute */}
<div className="flex flex-col">
  <label htmlFor="date1" className="pb-1 text-[#726f6f]">
    1. Date {" "}

  </label>
  <input
  placeholder="Institute Name"
    id="date1"
    name="date1"
       className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
    type="date"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.date1}
  />
 
</div>

{/* short name */}
<div className="flex flex-col">
  <label htmlFor="bazarkari11" className="pb-1 text-[#726f6f]">
    2. BazarKari-1{" "}
 
  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari11"
    name="bazarkari11"
    styles={customStyles}
    className="text-[#726f6f]"
    // options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari11", option.value)}
    onBlur={formik.handleBlur}
    // value={InstituteOptions.find(option => option.value === formik.values.institute)}
  />

</div>

 {/* short name */}
 <div className="flex flex-col">
  <label htmlFor="bazarkari21" className="pb-1 text-[#726f6f]">
    3. BazarKari-2{" "}

  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari21"
    name="bazarkari21"
    styles={customStyles}
    className="text-[#726f6f]"
    // options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari21", option.value)}
    onBlur={formik.handleBlur}
    // value={InstituteOptions.find(option => option.value === formik.values.institute)}
  />

</div>

</div>
      </div>





      <div>
        <h1 className="font-bold text-red-600 pb-3">Day-01</h1>
      <div className="grid  grid-cols-3 gap-4">

{/* institute */}
<div className="flex flex-col">
  <label htmlFor="date1" className="pb-1 text-[#726f6f]">
    1. Date {" "}

  </label>
  <input
  placeholder="Institute Name"
    id="date1"
    name="date1"
       className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
    type="date"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.date1}
  />
 
</div>

{/* short name */}
<div className="flex flex-col">
  <label htmlFor="bazarkari11" className="pb-1 text-[#726f6f]">
    2. BazarKari-1{" "}
 
  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari11"
    name="bazarkari11"
    styles={customStyles}
    className="text-[#726f6f]"
    // options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari11", option.value)}
    onBlur={formik.handleBlur}
    // value={InstituteOptions.find(option => option.value === formik.values.institute)}
  />

</div>

 {/* short name */}
 <div className="flex flex-col">
  <label htmlFor="bazarkari21" className="pb-1 text-[#726f6f]">
    3. BazarKari-2{" "}

  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari21"
    name="bazarkari21"
    styles={customStyles}
    className="text-[#726f6f]"
    // options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari21", option.value)}
    onBlur={formik.handleBlur}
    // value={InstituteOptions.find(option => option.value === formik.values.institute)}
  />

</div>

</div>
      </div>







      <div>
        <h1 className="font-bold text-red-600 pb-3">Day-01</h1>
      <div className="grid  grid-cols-3 gap-4">

{/* institute */}
<div className="flex flex-col">
  <label htmlFor="date1" className="pb-1 text-[#726f6f]">
    1. Date {" "}

  </label>
  <input
  placeholder="Institute Name"
    id="date1"
    name="date1"
       className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
    type="date"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.date1}
  />
 
</div>

{/* short name */}
<div className="flex flex-col">
  <label htmlFor="bazarkari11" className="pb-1 text-[#726f6f]">
    2. BazarKari-1{" "}
 
  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari11"
    name="bazarkari11"
    styles={customStyles}
    className="text-[#726f6f]"
    // options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari11", option.value)}
    onBlur={formik.handleBlur}
    // value={InstituteOptions.find(option => option.value === formik.values.institute)}
  />

</div>

 {/* short name */}
 <div className="flex flex-col">
  <label htmlFor="bazarkari21" className="pb-1 text-[#726f6f]">
    3. BazarKari-2{" "}

  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari21"
    name="bazarkari21"
    styles={customStyles}
    className="text-[#726f6f]"
    // options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari21", option.value)}
    onBlur={formik.handleBlur}
    // value={InstituteOptions.find(option => option.value === formik.values.institute)}
  />

</div>

</div>
      </div>

      <div>
        <h1 className="font-bold text-red-600 pb-3">Day-01</h1>
      <div className="grid  grid-cols-3 gap-4">

{/* institute */}
<div className="flex flex-col">
  <label htmlFor="date1" className="pb-1 text-[#726f6f]">
    1. Date {" "}

  </label>
  <input
  placeholder="Institute Name"
    id="date1"
    name="date1"
       className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
    type="date"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.date1}
  />
 
</div>

{/* short name */}
<div className="flex flex-col">
  <label htmlFor="bazarkari11" className="pb-1 text-[#726f6f]">
    2. BazarKari-1{" "}
 
  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari11"
    name="bazarkari11"
    styles={customStyles}
    className="text-[#726f6f]"
    // options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari11", option.value)}
    onBlur={formik.handleBlur}
    // value={InstituteOptions.find(option => option.value === formik.values.institute)}
  />

</div>

 {/* short name */}
 <div className="flex flex-col">
  <label htmlFor="bazarkari21" className="pb-1 text-[#726f6f]">
    3. BazarKari-2{" "}

  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari21"
    name="bazarkari21"
    styles={customStyles}
    className="text-[#726f6f]"
    // options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari21", option.value)}
    onBlur={formik.handleBlur}
    // value={InstituteOptions.find(option => option.value === formik.values.institute)}
  />

</div>

</div>
      </div>

      <div>
        <h1 className="font-bold text-red-600 pb-3">Day-01</h1>
      <div className="grid  grid-cols-3 gap-4">

{/* institute */}
<div className="flex flex-col">
  <label htmlFor="date1" className="pb-1 text-[#726f6f]">
    1. Date {" "}

  </label>
  <input
  placeholder="Institute Name"
    id="date1"
    name="date1"
       className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
    type="date"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.date1}
  />
 
</div>

{/* short name */}
<div className="flex flex-col">
  <label htmlFor="bazarkari11" className="pb-1 text-[#726f6f]">
    2. BazarKari-1{" "}
 
  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari11"
    name="bazarkari11"
    styles={customStyles}
    className="text-[#726f6f]"
    // options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari11", option.value)}
    onBlur={formik.handleBlur}
    // value={InstituteOptions.find(option => option.value === formik.values.institute)}
  />

</div>

 {/* short name */}
 <div className="flex flex-col">
  <label htmlFor="bazarkari21" className="pb-1 text-[#726f6f]">
    3. BazarKari-2{" "}

  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari21"
    name="bazarkari21"
    styles={customStyles}
    className="text-[#726f6f]"
    // options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari21", option.value)}
    onBlur={formik.handleBlur}
    // value={InstituteOptions.find(option => option.value === formik.values.institute)}
  />

</div>

</div>
      </div>


      <div>
        <h1 className="font-bold text-red-600 pb-3">Day-01</h1>
      <div className="grid  grid-cols-3 gap-4">

{/* institute */}
<div className="flex flex-col">
  <label htmlFor="date1" className="pb-1 text-[#726f6f]">
    1. Date {" "}

  </label>
  <input
  placeholder="Institute Name"
    id="date1"
    name="date1"
       className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
    type="date"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.date1}
  />
 
</div>

{/* short name */}
<div className="flex flex-col">
  <label htmlFor="bazarkari11" className="pb-1 text-[#726f6f]">
    2. BazarKari-1{" "}
 
  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari11"
    name="bazarkari11"
    styles={customStyles}
    className="text-[#726f6f]"
    // options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari11", option.value)}
    onBlur={formik.handleBlur}
    // value={InstituteOptions.find(option => option.value === formik.values.institute)}
  />

</div>

 {/* short name */}
 <div className="flex flex-col">
  <label htmlFor="bazarkari21" className="pb-1 text-[#726f6f]">
    3. BazarKari-2{" "}

  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari21"
    name="bazarkari21"
    styles={customStyles}
    className="text-[#726f6f]"
    // options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari21", option.value)}
    onBlur={formik.handleBlur}
    // value={InstituteOptions.find(option => option.value === formik.values.institute)}
  />

</div>

</div>
      </div>

      <div>
        <h1 className="font-bold text-red-600 pb-3">Day-01</h1>
      <div className="grid  grid-cols-3 gap-4">

{/* institute */}
<div className="flex flex-col">
  <label htmlFor="date1" className="pb-1 text-[#726f6f]">
    1. Date {" "}

  </label>
  <input
  placeholder="Institute Name"
    id="date1"
    name="date1"
       className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
    type="date"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.date1}
  />
 
</div>

{/* short name */}
<div className="flex flex-col">
  <label htmlFor="bazarkari11" className="pb-1 text-[#726f6f]">
    2. BazarKari-1{" "}
 
  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari11"
    name="bazarkari11"
    styles={customStyles}
    className="text-[#726f6f]"
    // options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari11", option.value)}
    onBlur={formik.handleBlur}
    // value={InstituteOptions.find(option => option.value === formik.values.institute)}
  />

</div>

 {/* short name */}
 <div className="flex flex-col">
  <label htmlFor="bazarkari21" className="pb-1 text-[#726f6f]">
    3. BazarKari-2{" "}

  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari21"
    name="bazarkari21"
    styles={customStyles}
    className="text-[#726f6f]"
    // options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari21", option.value)}
    onBlur={formik.handleBlur}
    // value={InstituteOptions.find(option => option.value === formik.values.institute)}
  />

</div>

</div>
      </div>


      <div>
        <h1 className="font-bold text-red-600 pb-3">Day-01</h1>
      <div className="grid  grid-cols-3 gap-4">

{/* institute */}
<div className="flex flex-col">
  <label htmlFor="date1" className="pb-1 text-[#726f6f]">
    1. Date {" "}

  </label>
  <input
  placeholder="Institute Name"
    id="date1"
    name="date1"
       className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
    type="date"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.date1}
  />
 
</div>

{/* short name */}
<div className="flex flex-col">
  <label htmlFor="bazarkari11" className="pb-1 text-[#726f6f]">
    2. BazarKari-1{" "}
 
  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari11"
    name="bazarkari11"
    styles={customStyles}
    className="text-[#726f6f]"
    // options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari11", option.value)}
    onBlur={formik.handleBlur}
    // value={InstituteOptions.find(option => option.value === formik.values.institute)}
  />

</div>

 {/* short name */}
 <div className="flex flex-col">
  <label htmlFor="bazarkari21" className="pb-1 text-[#726f6f]">
    3. BazarKari-2{" "}

  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari21"
    name="bazarkari21"
    styles={customStyles}
    className="text-[#726f6f]"
    // options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari21", option.value)}
    onBlur={formik.handleBlur}
    // value={InstituteOptions.find(option => option.value === formik.values.institute)}
  />

</div>

</div>
      </div>


      <div>
        <h1 className="font-bold text-red-600 pb-3">Day-01</h1>
      <div className="grid  grid-cols-3 gap-4">

{/* institute */}
<div className="flex flex-col">
  <label htmlFor="date1" className="pb-1 text-[#726f6f]">
    1. Date {" "}

  </label>
  <input
  placeholder="Institute Name"
    id="date1"
    name="date1"
       className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
    type="date"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.date1}
  />
 
</div>

{/* short name */}
<div className="flex flex-col">
  <label htmlFor="bazarkari11" className="pb-1 text-[#726f6f]">
    2. BazarKari-1{" "}
 
  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari11"
    name="bazarkari11"
    styles={customStyles}
    className="text-[#726f6f]"
    // options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari11", option.value)}
    onBlur={formik.handleBlur}
    // value={InstituteOptions.find(option => option.value === formik.values.institute)}
  />

</div>

 {/* short name */}
 <div className="flex flex-col">
  <label htmlFor="bazarkari21" className="pb-1 text-[#726f6f]">
    3. BazarKari-2{" "}

  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari21"
    name="bazarkari21"
    styles={customStyles}
    className="text-[#726f6f]"
    // options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari21", option.value)}
    onBlur={formik.handleBlur}
    // value={InstituteOptions.find(option => option.value === formik.values.institute)}
  />

</div>

</div>
      </div>

      <div>
        <h1 className="font-bold text-red-600 pb-3">Day-01</h1>
      <div className="grid  grid-cols-3 gap-4">

{/* institute */}
<div className="flex flex-col">
  <label htmlFor="date1" className="pb-1 text-[#726f6f]">
    1. Date {" "}

  </label>
  <input
  placeholder="Institute Name"
    id="date1"
    name="date1"
       className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
    type="date"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.date1}
  />
 
</div>

{/* short name */}
<div className="flex flex-col">
  <label htmlFor="bazarkari11" className="pb-1 text-[#726f6f]">
    2. BazarKari-1{" "}
 
  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari11"
    name="bazarkari11"
    styles={customStyles}
    className="text-[#726f6f]"
    // options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari11", option.value)}
    onBlur={formik.handleBlur}
    // value={InstituteOptions.find(option => option.value === formik.values.institute)}
  />

</div>

 {/* short name */}
 <div className="flex flex-col">
  <label htmlFor="bazarkari21" className="pb-1 text-[#726f6f]">
    3. BazarKari-2{" "}

  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari21"
    name="bazarkari21"
    styles={customStyles}
    className="text-[#726f6f]"
    // options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari21", option.value)}
    onBlur={formik.handleBlur}
    // value={InstituteOptions.find(option => option.value === formik.values.institute)}
  />

</div>

</div>
      </div>

      <div>
        <h1 className="font-bold text-red-600 pb-3">Day-01</h1>
      <div className="grid  grid-cols-3 gap-4">

{/* institute */}
<div className="flex flex-col">
  <label htmlFor="date1" className="pb-1 text-[#726f6f]">
    1. Date {" "}

  </label>
  <input
  placeholder="Institute Name"
    id="date1"
    name="date1"
       className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
    type="date"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.date1}
  />
 
</div>

{/* short name */}
<div className="flex flex-col">
  <label htmlFor="bazarkari11" className="pb-1 text-[#726f6f]">
    2. BazarKari-1{" "}
 
  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari11"
    name="bazarkari11"
    styles={customStyles}
    className="text-[#726f6f]"
    // options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari11", option.value)}
    onBlur={formik.handleBlur}
    // value={InstituteOptions.find(option => option.value === formik.values.institute)}
  />

</div>

 {/* short name */}
 <div className="flex flex-col">
  <label htmlFor="bazarkari21" className="pb-1 text-[#726f6f]">
    3. BazarKari-2{" "}

  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari21"
    name="bazarkari21"
    styles={customStyles}
    className="text-[#726f6f]"
    // options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari21", option.value)}
    onBlur={formik.handleBlur}
    // value={InstituteOptions.find(option => option.value === formik.values.institute)}
  />

</div>

</div>
      </div>


      <div>
        <h1 className="font-bold text-red-600 pb-3">Day-01</h1>
      <div className="grid  grid-cols-3 gap-4">

{/* institute */}
<div className="flex flex-col">
  <label htmlFor="date1" className="pb-1 text-[#726f6f]">
    1. Date {" "}

  </label>
  <input
  placeholder="Institute Name"
    id="date1"
    name="date1"
       className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
    type="date"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.date1}
  />
 
</div>

{/* short name */}
<div className="flex flex-col">
  <label htmlFor="bazarkari11" className="pb-1 text-[#726f6f]">
    2. BazarKari-1{" "}
 
  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari11"
    name="bazarkari11"
    styles={customStyles}
    className="text-[#726f6f]"
    // options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari11", option.value)}
    onBlur={formik.handleBlur}
    // value={InstituteOptions.find(option => option.value === formik.values.institute)}
  />

</div>

 {/* short name */}
 <div className="flex flex-col">
  <label htmlFor="bazarkari21" className="pb-1 text-[#726f6f]">
    3. BazarKari-2{" "}

  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari21"
    name="bazarkari21"
    styles={customStyles}
    className="text-[#726f6f]"
    // options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari21", option.value)}
    onBlur={formik.handleBlur}
    // value={InstituteOptions.find(option => option.value === formik.values.institute)}
  />

</div>

</div>
      </div>

      <div>
        <h1 className="font-bold text-red-600 pb-3">Day-01</h1>
      <div className="grid  grid-cols-3 gap-4">

{/* institute */}
<div className="flex flex-col">
  <label htmlFor="date1" className="pb-1 text-[#726f6f]">
    1. Date {" "}

  </label>
  <input
  placeholder="Institute Name"
    id="date1"
    name="date1"
       className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
    type="date"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.date1}
  />
 
</div>

{/* short name */}
<div className="flex flex-col">
  <label htmlFor="bazarkari11" className="pb-1 text-[#726f6f]">
    2. BazarKari-1{" "}
 
  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari11"
    name="bazarkari11"
    styles={customStyles}
    className="text-[#726f6f]"
    // options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari11", option.value)}
    onBlur={formik.handleBlur}
    // value={InstituteOptions.find(option => option.value === formik.values.institute)}
  />

</div>

 {/* short name */}
 <div className="flex flex-col">
  <label htmlFor="bazarkari21" className="pb-1 text-[#726f6f]">
    3. BazarKari-2{" "}

  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari21"
    name="bazarkari21"
    styles={customStyles}
    className="text-[#726f6f]"
    // options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari21", option.value)}
    onBlur={formik.handleBlur}
    // value={InstituteOptions.find(option => option.value === formik.values.institute)}
  />

</div>

</div>
      </div>
      

      <div>
        <h1 className="font-bold text-red-600 pb-3">Day-01</h1>
      <div className="grid  grid-cols-3 gap-4">

{/* institute */}
<div className="flex flex-col">
  <label htmlFor="date1" className="pb-1 text-[#726f6f]">
    1. Date {" "}

  </label>
  <input
  placeholder="Institute Name"
    id="date1"
    name="date1"
       className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
    type="date"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.date1}
  />
 
</div>

{/* short name */}
<div className="flex flex-col">
  <label htmlFor="bazarkari11" className="pb-1 text-[#726f6f]">
    2. BazarKari-1{" "}
 
  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari11"
    name="bazarkari11"
    styles={customStyles}
    className="text-[#726f6f]"
    // options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari11", option.value)}
    onBlur={formik.handleBlur}
    // value={InstituteOptions.find(option => option.value === formik.values.institute)}
  />

</div>

 {/* short name */}
 <div className="flex flex-col">
  <label htmlFor="bazarkari21" className="pb-1 text-[#726f6f]">
    3. BazarKari-2{" "}

  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari21"
    name="bazarkari21"
    styles={customStyles}
    className="text-[#726f6f]"
    // options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari21", option.value)}
    onBlur={formik.handleBlur}
    // value={InstituteOptions.find(option => option.value === formik.values.institute)}
  />

</div>

</div>
      </div>


      <div>
        <h1 className="font-bold text-red-600 pb-3">Day-01</h1>
      <div className="grid  grid-cols-3 gap-4">

{/* institute */}
<div className="flex flex-col">
  <label htmlFor="date1" className="pb-1 text-[#726f6f]">
    1. Date {" "}

  </label>
  <input
  placeholder="Institute Name"
    id="date1"
    name="date1"
       className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
    type="date"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.date1}
  />
 
</div>

{/* short name */}
<div className="flex flex-col">
  <label htmlFor="bazarkari11" className="pb-1 text-[#726f6f]">
    2. BazarKari-1{" "}
 
  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari11"
    name="bazarkari11"
    styles={customStyles}
    className="text-[#726f6f]"
    // options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari11", option.value)}
    onBlur={formik.handleBlur}
    // value={InstituteOptions.find(option => option.value === formik.values.institute)}
  />

</div>

 {/* short name */}
 <div className="flex flex-col">
  <label htmlFor="bazarkari21" className="pb-1 text-[#726f6f]">
    3. BazarKari-2{" "}

  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari21"
    name="bazarkari21"
    styles={customStyles}
    className="text-[#726f6f]"
    // options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari21", option.value)}
    onBlur={formik.handleBlur}
    // value={InstituteOptions.find(option => option.value === formik.values.institute)}
  />

</div>

</div>
      </div>


      <div>
        <h1 className="font-bold text-red-600 pb-3">Day-01</h1>
      <div className="grid  grid-cols-3 gap-4">

{/* institute */}
<div className="flex flex-col">
  <label htmlFor="date1" className="pb-1 text-[#726f6f]">
    1. Date {" "}

  </label>
  <input
  placeholder="Institute Name"
    id="date1"
    name="date1"
       className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
    type="date"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.date1}
  />
 
</div>

{/* short name */}
<div className="flex flex-col">
  <label htmlFor="bazarkari11" className="pb-1 text-[#726f6f]">
    2. BazarKari-1{" "}
 
  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari11"
    name="bazarkari11"
    styles={customStyles}
    className="text-[#726f6f]"
    // options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari11", option.value)}
    onBlur={formik.handleBlur}
    // value={InstituteOptions.find(option => option.value === formik.values.institute)}
  />

</div>

 {/* short name */}
 <div className="flex flex-col">
  <label htmlFor="bazarkari21" className="pb-1 text-[#726f6f]">
    3. BazarKari-2{" "}

  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari21"
    name="bazarkari21"
    styles={customStyles}
    className="text-[#726f6f]"
    // options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari21", option.value)}
    onBlur={formik.handleBlur}
    // value={InstituteOptions.find(option => option.value === formik.values.institute)}
  />

</div>

</div>
      </div>


      <div>
        <h1 className="font-bold text-red-600 pb-3">Day-01</h1>
      <div className="grid  grid-cols-3 gap-4">

{/* institute */}
<div className="flex flex-col">
  <label htmlFor="date1" className="pb-1 text-[#726f6f]">
    1. Date {" "}

  </label>
  <input
  placeholder="Institute Name"
    id="date1"
    name="date1"
       className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
    type="date"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.date1}
  />
 
</div>

{/* short name */}
<div className="flex flex-col">
  <label htmlFor="bazarkari11" className="pb-1 text-[#726f6f]">
    2. BazarKari-1{" "}
 
  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari11"
    name="bazarkari11"
    styles={customStyles}
    className="text-[#726f6f]"
    // options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari11", option.value)}
    onBlur={formik.handleBlur}
    // value={InstituteOptions.find(option => option.value === formik.values.institute)}
  />

</div>

 {/* short name */}
 <div className="flex flex-col">
  <label htmlFor="bazarkari21" className="pb-1 text-[#726f6f]">
    3. BazarKari-2{" "}

  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari21"
    name="bazarkari21"
    styles={customStyles}
    className="text-[#726f6f]"
    // options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari21", option.value)}
    onBlur={formik.handleBlur}
    // value={InstituteOptions.find(option => option.value === formik.values.institute)}
  />

</div>

</div>
      </div>


      <div>
        <h1 className="font-bold text-red-600 pb-3">Day-01</h1>
      <div className="grid  grid-cols-3 gap-4">

{/* institute */}
<div className="flex flex-col">
  <label htmlFor="date1" className="pb-1 text-[#726f6f]">
    1. Date {" "}

  </label>
  <input
  placeholder="Institute Name"
    id="date1"
    name="date1"
       className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
    type="date"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.date1}
  />
 
</div>

{/* short name */}
<div className="flex flex-col">
  <label htmlFor="bazarkari11" className="pb-1 text-[#726f6f]">
    2. BazarKari-1{" "}
 
  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari11"
    name="bazarkari11"
    styles={customStyles}
    className="text-[#726f6f]"
    // options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari11", option.value)}
    onBlur={formik.handleBlur}
    // value={InstituteOptions.find(option => option.value === formik.values.institute)}
  />

</div>

 {/* short name */}
 <div className="flex flex-col">
  <label htmlFor="bazarkari21" className="pb-1 text-[#726f6f]">
    3. BazarKari-2{" "}

  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari21"
    name="bazarkari21"
    styles={customStyles}
    className="text-[#726f6f]"
    // options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari21", option.value)}
    onBlur={formik.handleBlur}
    // value={InstituteOptions.find(option => option.value === formik.values.institute)}
  />

</div>

</div>
      </div>


      <div>
        <h1 className="font-bold text-red-600 pb-3">Day-01</h1>
      <div className="grid  grid-cols-3 gap-4">

{/* institute */}
<div className="flex flex-col">
  <label htmlFor="date1" className="pb-1 text-[#726f6f]">
    1. Date {" "}

  </label>
  <input
  placeholder="Institute Name"
    id="date1"
    name="date1"
       className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
    type="date"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.date1}
  />
 
</div>

{/* short name */}
<div className="flex flex-col">
  <label htmlFor="bazarkari11" className="pb-1 text-[#726f6f]">
    2. BazarKari-1{" "}
 
  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari11"
    name="bazarkari11"
    styles={customStyles}
    className="text-[#726f6f]"
    // options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari11", option.value)}
    onBlur={formik.handleBlur}
    // value={InstituteOptions.find(option => option.value === formik.values.institute)}
  />

</div>

 {/* short name */}
 <div className="flex flex-col">
  <label htmlFor="bazarkari21" className="pb-1 text-[#726f6f]">
    3. BazarKari-2{" "}

  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari21"
    name="bazarkari21"
    styles={customStyles}
    className="text-[#726f6f]"
    // options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari21", option.value)}
    onBlur={formik.handleBlur}
    // value={InstituteOptions.find(option => option.value === formik.values.institute)}
  />

</div>

</div>
      </div>


      <div>
        <h1 className="font-bold text-red-600 pb-3">Day-01</h1>
      <div className="grid  grid-cols-3 gap-4">

{/* institute */}
<div className="flex flex-col">
  <label htmlFor="date1" className="pb-1 text-[#726f6f]">
    1. Date {" "}

  </label>
  <input
  placeholder="Institute Name"
    id="date1"
    name="date1"
       className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
    type="date"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.date1}
  />
 
</div>

{/* short name */}
<div className="flex flex-col">
  <label htmlFor="bazarkari11" className="pb-1 text-[#726f6f]">
    2. BazarKari-1{" "}
 
  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari11"
    name="bazarkari11"
    styles={customStyles}
    className="text-[#726f6f]"
    // options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari11", option.value)}
    onBlur={formik.handleBlur}
    // value={InstituteOptions.find(option => option.value === formik.values.institute)}
  />

</div>

 {/* short name */}
 <div className="flex flex-col">
  <label htmlFor="bazarkari21" className="pb-1 text-[#726f6f]">
    3. BazarKari-2{" "}

  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari21"
    name="bazarkari21"
    styles={customStyles}
    className="text-[#726f6f]"
    // options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari21", option.value)}
    onBlur={formik.handleBlur}
    // value={InstituteOptions.find(option => option.value === formik.values.institute)}
  />

</div>

</div>
      </div>



      <div>
        <h1 className="font-bold text-red-600 pb-3">Day-01</h1>
      <div className="grid  grid-cols-3 gap-4">

{/* institute */}
<div className="flex flex-col">
  <label htmlFor="date1" className="pb-1 text-[#726f6f]">
    1. Date {" "}

  </label>
  <input
  placeholder="Institute Name"
    id="date1"
    name="date1"
       className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
    type="date"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.date1}
  />
 
</div>

{/* short name */}
<div className="flex flex-col">
  <label htmlFor="bazarkari11" className="pb-1 text-[#726f6f]">
    2. BazarKari-1{" "}
 
  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari11"
    name="bazarkari11"
    styles={customStyles}
    className="text-[#726f6f]"
    // options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari11", option.value)}
    onBlur={formik.handleBlur}
    // value={InstituteOptions.find(option => option.value === formik.values.institute)}
  />

</div>

 {/* short name */}
 <div className="flex flex-col">
  <label htmlFor="bazarkari21" className="pb-1 text-[#726f6f]">
    3. BazarKari-2{" "}

  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari21"
    name="bazarkari21"
    styles={customStyles}
    className="text-[#726f6f]"
    // options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari21", option.value)}
    onBlur={formik.handleBlur}
    // value={InstituteOptions.find(option => option.value === formik.values.institute)}
  />

</div>

</div>
      </div>


      <div>
        <h1 className="font-bold text-red-600 pb-3">Day-01</h1>
      <div className="grid  grid-cols-3 gap-4">

{/* institute */}
<div className="flex flex-col">
  <label htmlFor="date1" className="pb-1 text-[#726f6f]">
    1. Date {" "}

  </label>
  <input
  placeholder="Institute Name"
    id="date1"
    name="date1"
       className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
    type="date"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.date1}
  />
 
</div>

{/* short name */}
<div className="flex flex-col">
  <label htmlFor="bazarkari11" className="pb-1 text-[#726f6f]">
    2. BazarKari-1{" "}
 
  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari11"
    name="bazarkari11"
    styles={customStyles}
    className="text-[#726f6f]"
    // options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari11", option.value)}
    onBlur={formik.handleBlur}
    // value={InstituteOptions.find(option => option.value === formik.values.institute)}
  />

</div>

 {/* short name */}
 <div className="flex flex-col">
  <label htmlFor="bazarkari21" className="pb-1 text-[#726f6f]">
    3. BazarKari-2{" "}

  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari21"
    name="bazarkari21"
    styles={customStyles}
    className="text-[#726f6f]"
    // options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari21", option.value)}
    onBlur={formik.handleBlur}
    // value={InstituteOptions.find(option => option.value === formik.values.institute)}
  />

</div>

</div>
      </div>



      <div>
        <h1 className="font-bold text-red-600 pb-3">Day-01</h1>
      <div className="grid  grid-cols-3 gap-4">

{/* institute */}
<div className="flex flex-col">
  <label htmlFor="date1" className="pb-1 text-[#726f6f]">
    1. Date {" "}

  </label>
  <input
  placeholder="Institute Name"
    id="date1"
    name="date1"
       className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
    type="date"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.date1}
  />
 
</div>

{/* short name */}
<div className="flex flex-col">
  <label htmlFor="bazarkari11" className="pb-1 text-[#726f6f]">
    2. BazarKari-1{" "}
 
  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari11"
    name="bazarkari11"
    styles={customStyles}
    className="text-[#726f6f]"
    // options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari11", option.value)}
    onBlur={formik.handleBlur}
    // value={InstituteOptions.find(option => option.value === formik.values.institute)}
  />

</div>

 {/* short name */}
 <div className="flex flex-col">
  <label htmlFor="bazarkari21" className="pb-1 text-[#726f6f]">
    3. BazarKari-2{" "}

  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari21"
    name="bazarkari21"
    styles={customStyles}
    className="text-[#726f6f]"
    // options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari21", option.value)}
    onBlur={formik.handleBlur}
    // value={InstituteOptions.find(option => option.value === formik.values.institute)}
  />

</div>

</div>
      </div>



      <div>
        <h1 className="font-bold text-red-600 pb-3">Day-01</h1>
      <div className="grid  grid-cols-3 gap-4">

{/* institute */}
<div className="flex flex-col">
  <label htmlFor="date1" className="pb-1 text-[#726f6f]">
    1. Date {" "}

  </label>
  <input
  placeholder="Institute Name"
    id="date1"
    name="date1"
       className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
    type="date"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.date1}
  />
 
</div>

{/* short name */}
<div className="flex flex-col">
  <label htmlFor="bazarkari11" className="pb-1 text-[#726f6f]">
    2. BazarKari-1{" "}
 
  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari11"
    name="bazarkari11"
    styles={customStyles}
    className="text-[#726f6f]"
    // options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari11", option.value)}
    onBlur={formik.handleBlur}
    // value={InstituteOptions.find(option => option.value === formik.values.institute)}
  />

</div>

 {/* short name */}
 <div className="flex flex-col">
  <label htmlFor="bazarkari21" className="pb-1 text-[#726f6f]">
    3. BazarKari-2{" "}

  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari21"
    name="bazarkari21"
    styles={customStyles}
    className="text-[#726f6f]"
    // options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari21", option.value)}
    onBlur={formik.handleBlur}
    // value={InstituteOptions.find(option => option.value === formik.values.institute)}
  />

</div>

</div>
      </div>


      <div>
        <h1 className="font-bold text-red-600 pb-3">Day-01</h1>
      <div className="grid  grid-cols-3 gap-4">

{/* institute */}
<div className="flex flex-col">
  <label htmlFor="date1" className="pb-1 text-[#726f6f]">
    1. Date {" "}

  </label>
  <input
  placeholder="Institute Name"
    id="date1"
    name="date1"
       className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
    type="date"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.date1}
  />
 
</div>

{/* short name */}
<div className="flex flex-col">
  <label htmlFor="bazarkari11" className="pb-1 text-[#726f6f]">
    2. BazarKari-1{" "}
 
  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari11"
    name="bazarkari11"
    styles={customStyles}
    className="text-[#726f6f]"
    // options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari11", option.value)}
    onBlur={formik.handleBlur}
    // value={InstituteOptions.find(option => option.value === formik.values.institute)}
  />

</div>

 {/* short name */}
 <div className="flex flex-col">
  <label htmlFor="bazarkari21" className="pb-1 text-[#726f6f]">
    3. BazarKari-2{" "}

  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari21"
    name="bazarkari21"
    styles={customStyles}
    className="text-[#726f6f]"
    // options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari21", option.value)}
    onBlur={formik.handleBlur}
    // value={InstituteOptions.find(option => option.value === formik.values.institute)}
  />

</div>

</div>
      </div>



      <div>
        <h1 className="font-bold text-red-600 pb-3">Day-01</h1>
      <div className="grid  grid-cols-3 gap-4">

{/* institute */}
<div className="flex flex-col">
  <label htmlFor="date1" className="pb-1 text-[#726f6f]">
    1. Date {" "}

  </label>
  <input
  placeholder="Institute Name"
    id="date1"
    name="date1"
       className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
    type="date"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.date1}
  />
 
</div>

{/* short name */}
<div className="flex flex-col">
  <label htmlFor="bazarkari11" className="pb-1 text-[#726f6f]">
    2. BazarKari-1{" "}
 
  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari11"
    name="bazarkari11"
    styles={customStyles}
    className="text-[#726f6f]"
    // options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari11", option.value)}
    onBlur={formik.handleBlur}
    // value={InstituteOptions.find(option => option.value === formik.values.institute)}
  />

</div>

 {/* short name */}
 <div className="flex flex-col">
  <label htmlFor="bazarkari21" className="pb-1 text-[#726f6f]">
    3. BazarKari-2{" "}

  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari21"
    name="bazarkari21"
    styles={customStyles}
    className="text-[#726f6f]"
    // options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari21", option.value)}
    onBlur={formik.handleBlur}
    // value={InstituteOptions.find(option => option.value === formik.values.institute)}
  />

</div>

</div>
      </div>


      <div>
        <h1 className="font-bold text-red-600 pb-3">Day-01</h1>
      <div className="grid  grid-cols-3 gap-4">

{/* institute */}
<div className="flex flex-col">
  <label htmlFor="date1" className="pb-1 text-[#726f6f]">
    1. Date {" "}

  </label>
  <input
  placeholder="Institute Name"
    id="date1"
    name="date1"
       className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
    type="date"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.date1}
  />
 
</div>

{/* short name */}
<div className="flex flex-col">
  <label htmlFor="bazarkari11" className="pb-1 text-[#726f6f]">
    2. BazarKari-1{" "}
 
  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari11"
    name="bazarkari11"
    styles={customStyles}
    className="text-[#726f6f]"
    // options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari11", option.value)}
    onBlur={formik.handleBlur}
    // value={InstituteOptions.find(option => option.value === formik.values.institute)}
  />

</div>

 {/* short name */}
 <div className="flex flex-col">
  <label htmlFor="bazarkari21" className="pb-1 text-[#726f6f]">
    3. BazarKari-2{" "}

  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari21"
    name="bazarkari21"
    styles={customStyles}
    className="text-[#726f6f]"
    // options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari21", option.value)}
    onBlur={formik.handleBlur}
    // value={InstituteOptions.find(option => option.value === formik.values.institute)}
  />

</div>

</div>
      </div>


      <div>
        <h1 className="font-bold text-red-600 pb-3">Day-01</h1>
      <div className="grid  grid-cols-3 gap-4">

{/* institute */}
<div className="flex flex-col">
  <label htmlFor="date1" className="pb-1 text-[#726f6f]">
    1. Date {" "}

  </label>
  <input
  placeholder="Institute Name"
    id="date1"
    name="date1"
       className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
    type="date"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.date1}
  />
 
</div>

{/* short name */}
<div className="flex flex-col">
  <label htmlFor="bazarkari11" className="pb-1 text-[#726f6f]">
    2. BazarKari-1{" "}
 
  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari11"
    name="bazarkari11"
    styles={customStyles}
    className="text-[#726f6f]"
    // options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari11", option.value)}
    onBlur={formik.handleBlur}
    // value={InstituteOptions.find(option => option.value === formik.values.institute)}
  />

</div>

 {/* short name */}
 <div className="flex flex-col">
  <label htmlFor="bazarkari21" className="pb-1 text-[#726f6f]">
    3. BazarKari-2{" "}

  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari21"
    name="bazarkari21"
    styles={customStyles}
    className="text-[#726f6f]"
    // options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari21", option.value)}
    onBlur={formik.handleBlur}
    // value={InstituteOptions.find(option => option.value === formik.values.institute)}
  />

</div>

</div>
      </div>



      <div>
        <h1 className="font-bold text-red-600 pb-3">Day-01</h1>
      <div className="grid  grid-cols-3 gap-4">

{/* institute */}
<div className="flex flex-col">
  <label htmlFor="date1" className="pb-1 text-[#726f6f]">
    1. Date {" "}

  </label>
  <input
  placeholder="Institute Name"
    id="date1"
    name="date1"
       className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
    type="date"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.date1}
  />
 
</div>

{/* short name */}
<div className="flex flex-col">
  <label htmlFor="bazarkari11" className="pb-1 text-[#726f6f]">
    2. BazarKari-1{" "}
 
  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari11"
    name="bazarkari11"
    styles={customStyles}
    className="text-[#726f6f]"
    // options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari11", option.value)}
    onBlur={formik.handleBlur}
    // value={InstituteOptions.find(option => option.value === formik.values.institute)}
  />

</div>

 {/* short name */}
 <div className="flex flex-col">
  <label htmlFor="bazarkari21" className="pb-1 text-[#726f6f]">
    3. BazarKari-2{" "}

  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari21"
    name="bazarkari21"
    styles={customStyles}
    className="text-[#726f6f]"
    // options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari21", option.value)}
    onBlur={formik.handleBlur}
    // value={InstituteOptions.find(option => option.value === formik.values.institute)}
  />

</div>

</div>
      </div>


      <div>
        <h1 className="font-bold text-red-600 pb-3">Day-01</h1>
      <div className="grid  grid-cols-3 gap-4">

{/* institute */}
<div className="flex flex-col">
  <label htmlFor="date1" className="pb-1 text-[#726f6f]">
    1. Date {" "}

  </label>
  <input
  placeholder="Institute Name"
    id="date1"
    name="date1"
       className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
    type="date"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.date1}
  />
 
</div>

{/* short name */}
<div className="flex flex-col">
  <label htmlFor="bazarkari11" className="pb-1 text-[#726f6f]">
    2. BazarKari-1{" "}
 
  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari11"
    name="bazarkari11"
    styles={customStyles}
    className="text-[#726f6f]"
    // options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari11", option.value)}
    onBlur={formik.handleBlur}
    // value={InstituteOptions.find(option => option.value === formik.values.institute)}
  />

</div>

 {/* short name */}
 <div className="flex flex-col">
  <label htmlFor="bazarkari21" className="pb-1 text-[#726f6f]">
    3. BazarKari-2{" "}

  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari21"
    name="bazarkari21"
    styles={customStyles}
    className="text-[#726f6f]"
    // options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari21", option.value)}
    onBlur={formik.handleBlur}
    // value={InstituteOptions.find(option => option.value === formik.values.institute)}
  />

</div>

</div>
      </div>

      <div>
        <h1 className="font-bold text-red-600 pb-3">Day-01</h1>
      <div className="grid  grid-cols-3 gap-4">

{/* institute */}
<div className="flex flex-col">
  <label htmlFor="date1" className="pb-1 text-[#726f6f]">
    1. Date {" "}

  </label>
  <input
  placeholder="Institute Name"
    id="date1"
    name="date1"
       className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
    type="date"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.date1}
  />
 
</div>

{/* short name */}
<div className="flex flex-col">
  <label htmlFor="bazarkari11" className="pb-1 text-[#726f6f]">
    2. BazarKari-1{" "}
 
  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari11"
    name="bazarkari11"
    styles={customStyles}
    className="text-[#726f6f]"
    // options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari11", option.value)}
    onBlur={formik.handleBlur}
    // value={InstituteOptions.find(option => option.value === formik.values.institute)}
  />

</div>

 {/* short name */}
 <div className="flex flex-col">
  <label htmlFor="bazarkari21" className="pb-1 text-[#726f6f]">
    3. BazarKari-2{" "}

  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari21"
    name="bazarkari21"
    styles={customStyles}
    className="text-[#726f6f]"
    // options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari21", option.value)}
    onBlur={formik.handleBlur}
    // value={InstituteOptions.find(option => option.value === formik.values.institute)}
  />

</div>

</div>
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

export default AddBazarlist;
