import React, { useState,useRef, useEffect } from "react";
import {useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";
import DashCustomNav from "../../../Share/Formnav";
import axoissecure from './../../../Hooks/Axoisscure';
import CustomModal from './../../../Share/CustomModal/CustomModal';
import  Select  from 'react-select';
import { getMember } from "../../../Share/Api/SelectorApi/settingselector";
import useAuth from "../../../Provider/UseAuth/useAuth";



const AddBazarlist = () => {
  const { user, isLoading: userLoading } = useAuth();
  const formik = useFormik({
    initialValues: {
      date1: '',
      bazarkari11: '',
      bazarkari12: '',
      date2: '',
      bazarkari21: '',
      bazarkari22: '',
      date3: '',
      bazarkari13: '',
      bazarkari23: '',
      date4: '',
      bazarkari14: '',
      bazarkari24: '',
      date5: '',
      bazarkari15: '',
      bazarkari25: '',
      date6: '',
      bazarkari16: '',
      bazarkari26: '',
      date7: '',
      bazarkari17: '',
      bazarkari27: '',
      date8: '',
      bazarkari18: '',
      bazarkari28: '',
      date9: '',
      bazarkari19: '',
      bazarkari29: '',
      date10: '',
      bazarkari110: '',
      bazarkari210: '',
      date11: '',
      bazarkari111: '',
      bazarkari211: '',
      date12: '',
      bazarkari112: '',
      bazarkari212: '',
      date13: '',
      bazarkari113: '',
      bazarkari213: '',
      date14: '',
      bazarkari114: '',
      bazarkari214: '',
      date15: '',
      bazarkari115: '',
      bazarkari215: '',
      date16: '',
      bazarkari116: '',
      bazarkari216: '',
      date17: '',
      bazarkari117: '',
      bazarkari217: '',
      date18: '',
      bazarkari118: '',
      bazarkari218: '',
      date19: '',
      bazarkari119: '',
      bazarkari219: '',
      date20: '',
      bazarkari120: '',
      bazarkari220: '',
      date21: '',
      bazarkari121: '',
      bazarkari221: '',
      date22: '',
      bazarkari122: '',
      bazarkari222: '',
      date23: '',
      bazarkari123: '',
      bazarkari223: '',
      date24: '',
      bazarkari124: '',
      bazarkari224: '',
      date25: '',
      bazarkari125: '',
      bazarkari225: '',
      date26: '',
      bazarkari126: '',
      bazarkari226: '',
      date27: '',
      bazarkari127: '',
      bazarkari227: '',
      date28: '',
      bazarkari128: '',
      bazarkari228: '',
      date29: '',
      bazarkari129: '',
      bazarkari229: '',
      date30: '',
      bazarkari130: '',
      bazarkari230: '',
    },
  
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      try {
        await axoissecure.post("/bazalist", {
          manager : user?.userName?.name,
          listMonth : new Date(),
          date1: values.date1 || null,
          day1: values.day1 || null,
          bazarkari11: values.bazarkari11 || null,
          bazarkari12: values.bazarkari12 || null,
          date2: values.date2 || null,
          day2: values.day2 || null,
          bazarkari21: values.bazarkari21|| null,
          bazarkari22: values.bazarkari22 || null,
          date3: values.date3|| null,
          day3: values.day3 || null,
          bazarkari13: values.bazarkari13|| null,
          bazarkari23: values.bazarkari23|| null,
          date4: values.date4|| null,
          day4: values.day4|| null,
          bazarkari14: values.bazarkari14|| null,
          bazarkari24: values.bazarkari24|| null,
          date5: values.date5|| null,
          day5: values.day5 || null,
          bazarkari15: values.bazarkari15|| null,
          bazarkari25: values.bazarkari25|| null,
          date6: values.date6|| null,
          day6: values.day6 || null,
          bazarkari16: values.bazarkari16|| null,
          bazarkari26: values.bazarkari26|| null,
          date7: values.date7|| null,
          day7: values.day7 || null,
          bazarkari17: values.bazarkari17|| null,
          bazarkari27: values.bazarkari27|| null,
          date8: values.date8|| null,
          day8: values.day8 || null,
          bazarkari18: values.bazarkari18|| null,
          bazarkari28: values.bazarkari28|| null,
          date9: values.date9|| null,
          day9: values.day9 || null,
          bazarkari19: values.bazarkari19|| null,
          bazarkari29: values.bazarkari29|| null,
          date10: values.date10|| null,
          day10: values.day10 || null,
          bazarkari110: values.bazarkari110|| null,
          bazarkari210: values.bazarkari210|| null,
          date11: values.date11|| null,
          day11: values.day11 || null,
          bazarkari111: values.bazarkari111|| null,
          bazarkari211: values.bazarkari211|| null,
          date12: values.date12|| null,
          day12: values.day12|| null,
          bazarkari112: values.bazarkari112|| null,
          bazarkari212: values.bazarkari212|| null,
          date13: values.date13|| null,
          day13: values.day13 || null,
          bazarkari113: values.bazarkari113|| null,
          bazarkari213: values.bazarkari213|| null,
          date14: values.date14|| null,
          day14: values.day14 || null,
          bazarkari114: values.bazarkari114|| null,
          bazarkari214: values.bazarkari214|| null,
          date15: values.date15|| null,
          day15: values.day15 || null,
          bazarkari115: values.bazarkari115|| null,
          bazarkari215: values.bazarkari215|| null,
          date16: values.date16|| null,
          day16: values.day16 || null,
          bazarkari116: values.bazarkari116|| null,
          bazarkari216: values.bazarkari216|| null,
          date17: values.date17|| null,
          day17: values.day17 || null,
          bazarkari117: values.bazarkari117|| null,
          bazarkari217: values.bazarkari217|| null,
          date18: values.date18|| null,
          day18: values.day18 || null,
          bazarkari118: values.bazarkari118|| null,
          bazarkari218: values.bazarkari218|| null,
          date19: values.date19|| null,
          day19: values.day19 || null,
          bazarkari119: values.bazarkari119|| null,
          bazarkari219: values.bazarkari219|| null,
          date20: values.date20|| null,
          day20: values.day20 || null,
          bazarkari120: values.bazarkari120|| null,
          bazarkari220: values.bazarkari220|| null,
          date21: values.date21|| null,
          day21: values.day21 || null,
          bazarkari121: values.bazarkari121|| null,
          bazarkari221: values.bazarkari221|| null,
          date22: values.date22|| null,
          day22: values.day22 || null,
          bazarkari122: values.bazarkari122|| null,
          bazarkari222: values.bazarkari222|| null,
          date23: values.date23|| null,
          day23: values.day23 || null,
          bazarkari123: values.bazarkari123|| null,
          bazarkari223: values.bazarkari223|| null,
          date24: values.date24|| null,
          day24: values.day24 || null,
          bazarkari124: values.bazarkari124|| null,
          bazarkari224: values.bazarkari224|| null,
          date25: values.date25|| null,
          day25: values.day25|| null,
          bazarkari125: values.bazarkari125|| null,
          bazarkari225: values.bazarkari225|| null,
          date26: values.date26|| null,
          day26: values.day26 || null,
          bazarkari126: values.bazarkari126|| null,
          bazarkari226: values.bazarkari226|| null,
          date27: values.date27|| null,
          day27: values.day27 || null,
          bazarkari127: values.bazarkari127|| null,
          bazarkari227: values.bazarkari227|| null,
          date28: values.date28|| null,
          day28: values.day28 || null,
          bazarkari128: values.bazarkari128|| null,
          bazarkari228: values.bazarkari228|| null,
          date29: values.date29|| null,
          day29: values.day29 || null,
          bazarkari129: values.bazarkari129|| null,
          bazarkari229: values.bazarkari229|| null,
          date30: values.date30|| null,
          day30: values.day30|| null,
          bazarkari130: values.bazarkari130|| null,
          bazarkari230: values.bazarkari230|| null,
          status: "1", // Additional static field
        });
        console.log("Institute added successfully:", values);
        toast.success("Institute Added successfully!");
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

  const[institute,setInstitute] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMember();
        console.log(data, "all items here");
        setInstitute(data?.member);
      } catch (error) {
        console.error("Error fetching member types:", error);
      }
    };

    fetchData();
  }, []);

  const InstituteOptions =
    (institute &&
      institute?.map((singleData) => ({
        value: singleData?.name,
        label: singleData?.name,
      }))) ||
    [];

console.log(InstituteOptions)

const daysOfWeek = [
  { value: "sunday", label: "Sunday" },
  { value: "monday", label: "Monday" },
  { value: "tuesday", label: "Tuesday" },
  { value: "wednesday", label: "Wednesday" },
  { value: "thursday", label: "Thursday" },
  { value: "friday", label: "Friday" },
  { value: "saturday", label: "Saturday" }
];



  
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
      <div className="grid  grid-cols-4 gap-4">

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
<div className="flex flex-col">
  <label htmlFor="day1" className="pb-1 text-[#726f6f]">
    2. Day
  </label>
  <Select
    placeholder="Select Name"
    id="day1"
    name="day1"
    styles={customStyles}
    className="text-[#726f6f]"
    options={daysOfWeek}
    onChange={(option) => formik.setFieldValue("day1", option.label)}
    onBlur={formik.handleBlur}
    value={daysOfWeek.find(option => option.label === formik.values.day1)}
  />
</div>
<div className="flex flex-col">
  <label htmlFor="bazarkari11" className="pb-1 text-[#726f6f]">
    3. Bazarkari-1
  </label>
  <Select
    placeholder="Select Name"
    id="bazarkari11"
    name="bazarkari11"
    styles={customStyles}
    className="text-[#726f6f]"
    options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari11", option.label)}
    onBlur={formik.handleBlur}
    value={InstituteOptions.find(option => option.label === formik.values.bazarkari11)}
  />
</div>

 {/* short name */}
 <div className="flex flex-col">
  <label htmlFor="bazarkari21" className="pb-1 text-[#726f6f]">
    4. Bazarkari-2{" "}

  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari21"
    name="bazarkari21"
    styles={customStyles}
    className="text-[#726f6f]"
    options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari21", option.label)}
    onBlur={formik.handleBlur}
    value={InstituteOptions.find(option => option.label === formik.values.institute)}
  />

</div>

</div>
      </div>



      <div>
        <h1 className="font-bold text-red-600 pb-3">Day-02</h1>
      <div className="grid  grid-cols-4 gap-4">

{/* institute */}
<div className="flex flex-col">
  <label htmlFor="date2" className="pb-1 text-[#726f6f]">
    1. Date {" "}

  </label>
  <input
  placeholder="Institute Name"
    id="date2"
    name="date2"
       className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
    type="date"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.date2}
  />
 
</div>
<div className="flex flex-col">
  <label htmlFor="day2" className="pb-1 text-[#726f6f]">
    2. Day
  </label>
  <Select
    placeholder="Select Day"
    id="day2"
    name="day2"
    styles={customStyles}
    className="text-[#726f6f]"
    options={daysOfWeek}
    onChange={(option) => formik.setFieldValue("day2", option.label)}
    onBlur={formik.handleBlur}
    value={daysOfWeek.find(option => option.label === formik.values.day2)}
  />
</div>

{/* short name */}
<div className="flex flex-col">
  <label htmlFor="bazarkari11" className="pb-1 text-[#726f6f]">
    3. Bazarkari-1{" "}
 
  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari11"
    name="bazarkari11"
    styles={customStyles}
    className="text-[#726f6f]"
    options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari12", option.label)}
    onBlur={formik.handleBlur}
    value={InstituteOptions.find(option => option.label === formik.values.institute)}
  />

</div>

 {/* short name */}
 <div className="flex flex-col">
  <label htmlFor="bazarkari21" className="pb-1 text-[#726f6f]">
    4. Bazarkari-2{" "}

  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari21"
    name="bazarkari21"
    styles={customStyles}
    className="text-[#726f6f]"
    options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari22", option.label)}
    onBlur={formik.handleBlur}
    value={InstituteOptions.find(option => option.label === formik.values.institute)}
  />

</div>

</div>
      </div>





      <div>
        <h1 className="font-bold text-red-600 pb-3">Day-03</h1>
      <div className="grid  grid-cols-4 gap-4">

{/* institute */}
<div className="flex flex-col">
  <label htmlFor="date3" className="pb-1 text-[#726f6f]">
    1. Date {" "}

  </label>
  <input
  placeholder="Institute Name"
    id="date3"
    name="date3"
       className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
    type="date"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.date3}
  />
 
</div>
<div className="flex flex-col">
  <label htmlFor="day3" className="pb-1 text-[#726f6f]">
    2. Day
  </label>
  <Select
    placeholder="Select Day"
    id="day3"
    name="day3"
    styles={customStyles}
    className="text-[#726f6f]"
    options={daysOfWeek}
    onChange={(option) => formik.setFieldValue("day3", option.label)}
    onBlur={formik.handleBlur}
    value={daysOfWeek.find(option => option.label === formik.values.day3)}
  />
</div>
{/* short name */}
<div className="flex flex-col">
  <label htmlFor="bazarkari11" className="pb-1 text-[#726f6f]">
    3. Bazarkari-1{" "}
 
  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari11"
    name="bazarkari11"
    styles={customStyles}
    className="text-[#726f6f]"
    options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari13", option.label)}
    onBlur={formik.handleBlur}
    value={InstituteOptions.find(option => option.label === formik.values.institute)}
  />

</div>

 {/* short name */}
 <div className="flex flex-col">
  <label htmlFor="bazarkari21" className="pb-1 text-[#726f6f]">
    4. Bazarkari-2{" "}

  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari21"
    name="bazarkari21"
    styles={customStyles}
    className="text-[#726f6f]"
    options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari23", option.label)}
    onBlur={formik.handleBlur}
    value={InstituteOptions.find(option => option.label === formik.values.institute)}
  />

</div>

</div>
      </div>







      <div>
        <h1 className="font-bold text-red-600 pb-3">Day-04</h1>
      <div className="grid  grid-cols-4 gap-4">

{/* institute */}
<div className="flex flex-col">
  <label htmlFor="date4" className="pb-1 text-[#726f6f]">
    1. Date {" "}

  </label>
  <input
  placeholder="Institute Name"
    id="date4"
    name="date4"
       className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
    type="date"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.date4}
  />
 
</div>

<div className="flex flex-col">
  <label htmlFor="day4" className="pb-1 text-[#726f6f]">
    2. Day
  </label>
  <Select
    placeholder="Select Day"
    id="day4"
    name="day4"
    styles={customStyles}
    className="text-[#726f6f]"
    options={daysOfWeek}
    onChange={(option) => formik.setFieldValue("day4", option.label)}
    onBlur={formik.handleBlur}
    value={daysOfWeek.find(option => option.label === formik.values.day4)}
  />
</div>

{/* short name */}
<div className="flex flex-col">
  <label htmlFor="bazarkari11" className="pb-1 text-[#726f6f]">
    3. Bazarkari-1{" "}
 
  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari11"
    name="bazarkari11"
    styles={customStyles}
    className="text-[#726f6f]"
    options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari14", option.label)}
    onBlur={formik.handleBlur}
    value={InstituteOptions.find(option => option.label === formik.values.institute)}
  />

</div>

 {/* short name */}
 <div className="flex flex-col">
  <label htmlFor="bazarkari21" className="pb-1 text-[#726f6f]">
    4. Bazarkari-2{" "}

  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari21"
    name="bazarkari21"
    styles={customStyles}
    className="text-[#726f6f]"
    options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari24", option.label)}
    onBlur={formik.handleBlur}
    value={InstituteOptions.find(option => option.label === formik.values.institute)}
  />

</div>

</div>
      </div>

      <div>
        <h1 className="font-bold text-red-600 pb-3">Day-05</h1>
      <div className="grid  grid-cols-4 gap-4">

{/* institute */}
<div className="flex flex-col">
  <label htmlFor="date5" className="pb-1 text-[#726f6f]">
    1. Date {" "}

  </label>
  <input
  placeholder="Institute Name"
    id="date5"
    name="date5"
       className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
    type="date"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.date5}
  />
 
</div>

<div className="flex flex-col">
  <label htmlFor="day5" className="pb-1 text-[#726f6f]">
    2. Day
  </label>
  <Select
    placeholder="Select Day"
    id="day5"
    name="day5"
    styles={customStyles}
    className="text-[#726f6f]"
    options={daysOfWeek}
    onChange={(option) => formik.setFieldValue("day5", option.label)}
    onBlur={formik.handleBlur}
    value={daysOfWeek.find(option => option.label === formik.values.day5)}
  />
</div>
{/* short name */}
<div className="flex flex-col">
  <label htmlFor="bazarkari11" className="pb-1 text-[#726f6f]">
    3. Bazarkari-1{" "}
 
  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari11"
    name="bazarkari11"
    styles={customStyles}
    className="text-[#726f6f]"
    options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari15", option.label)}
    onBlur={formik.handleBlur}
    value={InstituteOptions.find(option => option.label === formik.values.institute)}
  />

</div>

 {/* short name */}
 <div className="flex flex-col">
  <label htmlFor="bazarkari21" className="pb-1 text-[#726f6f]">
    4. Bazarkari-2{" "}

  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari21"
    name="bazarkari21"
    styles={customStyles}
    className="text-[#726f6f]"
    options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari25", option.label)}
    onBlur={formik.handleBlur}
    value={InstituteOptions.find(option => option.label === formik.values.institute)}
  />

</div>

</div>
      </div>

      <div>
        <h1 className="font-bold text-red-600 pb-3">Day-06</h1>
      <div className="grid  grid-cols-4 gap-4">

{/* institute */}
<div className="flex flex-col">
  <label htmlFor="date1" className="pb-1 text-[#726f6f]">
    1. Date {" "}

  </label>
  <input
  placeholder="Institute Name"
    id="date6"
    name="date6"
       className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
    type="date"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.date6}
  />
 
</div>
<div className="flex flex-col">
  <label htmlFor="day6" className="pb-1 text-[#726f6f]">
    2. Day
  </label>
  <Select
    placeholder="Select Day"
    id="day6"
    name="day6"
    styles={customStyles}
    className="text-[#726f6f]"
    options={daysOfWeek}
    onChange={(option) => formik.setFieldValue("day6", option.label)}
    onBlur={formik.handleBlur}
    value={daysOfWeek.find(option => option.label === formik.values.day7)}
  />
</div>
{/* short name */}
<div className="flex flex-col">
  <label htmlFor="bazarkari11" className="pb-1 text-[#726f6f]">
    3. Bazarkari-1{" "}
 
  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari11"
    name="bazarkari11"
    styles={customStyles}
    className="text-[#726f6f]"
    options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari16", option.label)}
    onBlur={formik.handleBlur}
    value={InstituteOptions.find(option => option.label === formik.values.institute)}
  />

</div>

 {/* short name */}
 <div className="flex flex-col">
  <label htmlFor="bazarkari21" className="pb-1 text-[#726f6f]">
    4. Bazarkari-2{" "}

  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari21"
    name="bazarkari21"
    styles={customStyles}
    className="text-[#726f6f]"
    options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari26", option.label)}
    onBlur={formik.handleBlur}
    value={InstituteOptions.find(option => option.label === formik.values.institute)}
  />

</div>

</div>
      </div>


      <div>
        <h1 className="font-bold text-red-600 pb-3">Day-07</h1>
      <div className="grid  grid-cols-4 gap-4">

{/* institute */}
<div className="flex flex-col">
  <label htmlFor="date7" className="pb-1 text-[#726f6f]">
    1. Date {" "}

  </label>
  <input
  placeholder="Institute Name"
    id="date7"
    name="date7"
       className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
    type="date"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.date7}
  />
 
</div>

<div className="flex flex-col">
  <label htmlFor="day7" className="pb-1 text-[#726f6f]">
    2. Day
  </label>
  <Select
    placeholder="Select Day"
    id="day7"
    name="day7"
    styles={customStyles}
    className="text-[#726f6f]"
    options={daysOfWeek}
    onChange={(option) => formik.setFieldValue("day7", option.label)}
    onBlur={formik.handleBlur}
    value={daysOfWeek.find(option => option.label === formik.values.day7)}
  />
</div>
{/* short name */}
<div className="flex flex-col">
  <label htmlFor="bazarkari11" className="pb-1 text-[#726f6f]">
    3. Bazarkari-1{" "}
 
  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari11"
    name="bazarkari11"
    styles={customStyles}
    className="text-[#726f6f]"
    options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari17", option.label)}
    onBlur={formik.handleBlur}
    value={InstituteOptions.find(option => option.label === formik.values.institute)}
  />

</div>

 {/* short name */}
 <div className="flex flex-col">
  <label htmlFor="bazarkari21" className="pb-1 text-[#726f6f]">
    4. Bazarkari-2{" "}

  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari21"
    name="bazarkari21"
    styles={customStyles}
    className="text-[#726f6f]"
    options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari27", option.label)}
    onBlur={formik.handleBlur}
    value={InstituteOptions.find(option => option.label === formik.values.institute)}
  />

</div>

</div>
      </div>

      <div>
        <h1 className="font-bold text-red-600 pb-3">Day-08</h1>
      <div className="grid  grid-cols-4 gap-4">

{/* institute */}
<div className="flex flex-col">
  <label htmlFor="date8" className="pb-1 text-[#726f6f]">
    1. Date {" "}

  </label>
  <input
  placeholder="Institute Name"
    id="date8"
    name="date8"
       className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
    type="date"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.date8}
  />
 
</div>

<div className="flex flex-col">
  <label htmlFor="day8" className="pb-1 text-[#726f6f]">
    2. Day
  </label>
  <Select
    placeholder="Select Day"
    id="day8"
    name="day8"
    styles={customStyles}
    className="text-[#726f6f]"
    options={daysOfWeek}
    onChange={(option) => formik.setFieldValue("day8", option.label)}
    onBlur={formik.handleBlur}
    value={daysOfWeek.find(option => option.label === formik.values.day8)}
  />
</div>
{/* short name */}
<div className="flex flex-col">
  <label htmlFor="bazarkari11" className="pb-1 text-[#726f6f]">
    3. Bazarkari-1{" "}
 
  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari11"
    name="bazarkari11"
    styles={customStyles}
    className="text-[#726f6f]"
    options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari18", option.label)}
    onBlur={formik.handleBlur}
    value={InstituteOptions.find(option => option.label === formik.values.institute)}
  />

</div>

 {/* short name */}
 <div className="flex flex-col">
  <label htmlFor="bazarkari21" className="pb-1 text-[#726f6f]">
    4. Bazarkari-2{" "}

  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari21"
    name="bazarkari21"
    styles={customStyles}
    className="text-[#726f6f]"
    options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari28", option.label)}
    onBlur={formik.handleBlur}
    value={InstituteOptions.find(option => option.label === formik.values.institute)}
  />

</div>

</div>
      </div>


      <div>
        <h1 className="font-bold text-red-600 pb-3">Day-09</h1>
      <div className="grid  grid-cols-4 gap-4">

{/* institute */}
<div className="flex flex-col">
  <label htmlFor="date9" className="pb-1 text-[#726f6f]">
    1. Date {" "}

  </label>
  <input
  placeholder="Institute Name"
    id="date9"
    name="date9"
       className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
    type="date"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.date9}
  />
 
</div>

<div className="flex flex-col">
  <label htmlFor="day9" className="pb-1 text-[#726f6f]">
    2. Day
  </label>
  <Select
    placeholder="Select Day"
    id="day9"
    name="day9"
    styles={customStyles}
    className="text-[#726f6f]"
    options={daysOfWeek}
    onChange={(option) => formik.setFieldValue("day9", option.label)}
    onBlur={formik.handleBlur}
    value={daysOfWeek.find(option => option.label === formik.values.day9)}
  />
</div>
{/* short name */}
<div className="flex flex-col">
  <label htmlFor="bazarkari11" className="pb-1 text-[#726f6f]">
    3. Bazarkari-1{" "}
 
  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari11"
    name="bazarkari11"
    styles={customStyles}
    className="text-[#726f6f]"
    options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari19", option.label)}
    onBlur={formik.handleBlur}
    value={InstituteOptions.find(option => option.label === formik.values.institute)}
  />

</div>

 {/* short name */}
 <div className="flex flex-col">
  <label htmlFor="bazarkari21" className="pb-1 text-[#726f6f]">
    4. Bazarkari-2{" "}

  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari21"
    name="bazarkari21"
    styles={customStyles}
    className="text-[#726f6f]"
    options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari29", option.label)}
    onBlur={formik.handleBlur}
    value={InstituteOptions.find(option => option.label === formik.values.institute)}
  />

</div>

</div>
      </div>


      <div>
        <h1 className="font-bold text-red-600 pb-3">Day-10</h1>
      <div className="grid  grid-cols-4 gap-4">

{/* institute */}
<div className="flex flex-col">
  <label htmlFor="date10" className="pb-1 text-[#726f6f]">
    1. Date {" "}

  </label>
  <input
  placeholder="Institute Name"
    id="date10"
    name="date10"
       className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
    type="date"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.date10}
  />
 
</div>

<div className="flex flex-col">
  <label htmlFor="day10" className="pb-1 text-[#726f6f]">
    2. Day
  </label>
  <Select
    placeholder="Select Day"
    id="day10"
    name="day10"
    styles={customStyles}
    className="text-[#726f6f]"
    options={daysOfWeek}
    onChange={(option) => formik.setFieldValue("day10", option.label)}
    onBlur={formik.handleBlur}
    value={daysOfWeek.find(option => option.label === formik.values.day10)}
  />
</div>
{/* short name */}
<div className="flex flex-col">
  <label htmlFor="bazarkari11" className="pb-1 text-[#726f6f]">
    3. Bazarkari-1{" "}
 
  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari11"
    name="bazarkari11"
    styles={customStyles}
    className="text-[#726f6f]"
    options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari110", option.label)}
    onBlur={formik.handleBlur}
    value={InstituteOptions.find(option => option.label === formik.values.institute)}
  />

</div>

 {/* short name */}
 <div className="flex flex-col">
  <label htmlFor="bazarkari21" className="pb-1 text-[#726f6f]">
    4. Bazarkari-2{" "}

  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari21"
    name="bazarkari21"
    styles={customStyles}
    className="text-[#726f6f]"
    options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari210", option.label)}
    onBlur={formik.handleBlur}
    value={InstituteOptions.find(option => option.label === formik.values.institute)}
  />

</div>

</div>
      </div>

      <div>
        <h1 className="font-bold text-red-600 pb-3">Day-11</h1>
      <div className="grid  grid-cols-4 gap-4">

{/* institute */}
<div className="flex flex-col">
  <label htmlFor="date11" className="pb-1 text-[#726f6f]">
    1. Date {" "}

  </label>
  <input
  placeholder="Institute Name"
    id="date11"
    name="date11"
       className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
    type="date"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.date11}
  />
 
</div>
<div className="flex flex-col">
  <label htmlFor="day11" className="pb-1 text-[#726f6f]">
    2. Day
  </label>
  <Select
    placeholder="Select Day"
    id="day11"
    name="day11"
    styles={customStyles}
    className="text-[#726f6f]"
    options={daysOfWeek}
    onChange={(option) => formik.setFieldValue("day11", option.label)}
    onBlur={formik.handleBlur}
    value={daysOfWeek.find(option => option.label === formik.values.day11)}
  />
</div>
{/* short name */}
<div className="flex flex-col">
  <label htmlFor="bazarkari11" className="pb-1 text-[#726f6f]">
    3. Bazarkari-1{" "}
 
  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari11"
    name="bazarkari11"
    styles={customStyles}
    className="text-[#726f6f]"
    options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari111", option.label)}
    onBlur={formik.handleBlur}
    value={InstituteOptions.find(option => option.label === formik.values.institute)}
  />

</div>

 {/* short name */}
 <div className="flex flex-col">
  <label htmlFor="bazarkari21" className="pb-1 text-[#726f6f]">
    4. Bazarkari-2{" "}

  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari21"
    name="bazarkari21"
    styles={customStyles}
    className="text-[#726f6f]"
    options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari211", option.label)}
    onBlur={formik.handleBlur}
    value={InstituteOptions.find(option => option.label === formik.values.institute)}
  />

</div>

</div>
      </div>

      <div>
        <h1 className="font-bold text-red-600 pb-3">Day-12</h1>
      <div className="grid  grid-cols-4 gap-4">

{/* institute */}
<div className="flex flex-col">
  <label htmlFor="date12" className="pb-1 text-[#726f6f]">
    1. Date {" "}

  </label>
  <input
  placeholder="Institute Name"
    id="date12"
    name="date12"
       className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
    type="date"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.date12}
  />
 
</div>
<div className="flex flex-col">
  <label htmlFor="day12" className="pb-1 text-[#726f6f]">
    2. Day
  </label>
  <Select
    placeholder="Select Day"
    id="day12"
    name="day12"
    styles={customStyles}
    className="text-[#726f6f]"
    options={daysOfWeek}
    onChange={(option) => formik.setFieldValue("day12", option.label)}
    onBlur={formik.handleBlur}
    value={daysOfWeek.find(option => option.label === formik.values.day12)}
  />
</div>
{/* short name */}
<div className="flex flex-col">
  <label htmlFor="bazarkari11" className="pb-1 text-[#726f6f]">
    3. Bazarkari-1{" "}
 
  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari11"
    name="bazarkari11"
    styles={customStyles}
    className="text-[#726f6f]"
    options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari112", option.label)}
    onBlur={formik.handleBlur}
    value={InstituteOptions.find(option => option.label === formik.values.institute)}
  />

</div>

 {/* short name */}
 <div className="flex flex-col">
  <label htmlFor="bazarkari21" className="pb-1 text-[#726f6f]">
    4. Bazarkari-2{" "}

  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari21"
    name="bazarkari21"
    styles={customStyles}
    className="text-[#726f6f]"
    options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari212", option.label)}
    onBlur={formik.handleBlur}
    value={InstituteOptions.find(option => option.label === formik.values.institute)}
  />

</div>

</div>
      </div>


      <div>
        <h1 className="font-bold text-red-600 pb-3">Day-13</h1>
      <div className="grid  grid-cols-4 gap-4">

{/* institute */}
<div className="flex flex-col">
  <label htmlFor="date13" className="pb-1 text-[#726f6f]">
    1. Date {" "}

  </label>
  <input
  placeholder="Institute Name"
    id="date13"
    name="date13"
       className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
    type="date"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.date13}
  />
 
</div>
<div className="flex flex-col">
  <label htmlFor="day13" className="pb-1 text-[#726f6f]">
    2. Day
  </label>
  <Select
    placeholder="Select Day"
    id="day13"
    name="day13"
    styles={customStyles}
    className="text-[#726f6f]"
    options={daysOfWeek}
    onChange={(option) => formik.setFieldValue("day13", option.label)}
    onBlur={formik.handleBlur}
    value={daysOfWeek.find(option => option.label === formik.values.day13)}
  />
</div>
{/* short name */}
<div className="flex flex-col">
  <label htmlFor="bazarkari11" className="pb-1 text-[#726f6f]">
    3. Bazarkari-1{" "}
 
  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari11"
    name="bazarkari11"
    styles={customStyles}
    className="text-[#726f6f]"
    options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari113", option.label)}
    onBlur={formik.handleBlur}
    value={InstituteOptions.find(option => option.label === formik.values.institute)}
  />

</div>

 {/* short name */}
 <div className="flex flex-col">
  <label htmlFor="bazarkari21" className="pb-1 text-[#726f6f]">
    4. Bazarkari-2{" "}

  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari21"
    name="bazarkari21"
    styles={customStyles}
    className="text-[#726f6f]"
    options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari213", option.label)}
    onBlur={formik.handleBlur}
    value={InstituteOptions.find(option => option.label === formik.values.institute)}
  />

</div>

</div>
      </div>

      <div>
        <h1 className="font-bold text-red-600 pb-3">Day-14</h1>
      <div className="grid  grid-cols-4 gap-4">

{/* institute */}
<div className="flex flex-col">
  <label htmlFor="date14" className="pb-1 text-[#726f6f]">
    1. Date {" "}

  </label>
  <input
  placeholder="Institute Name"
    id="date14"
    name="date14"
       className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
    type="date"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.date14}
  />
 
</div>
<div className="flex flex-col">
  <label htmlFor="day14" className="pb-1 text-[#726f6f]">
    2. Day
  </label>
  <Select
    placeholder="Select Day"
    id="day14"
    name="day14"
    styles={customStyles}
    className="text-[#726f6f]"
    options={daysOfWeek}
    onChange={(option) => formik.setFieldValue("day14", option.label)}
    onBlur={formik.handleBlur}
    value={daysOfWeek.find(option => option.label === formik.values.day14)}
  />
</div>
{/* short name */}
<div className="flex flex-col">
  <label htmlFor="bazarkari11" className="pb-1 text-[#726f6f]">
    3. Bazarkari-1{" "}
 
  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari11"
    name="bazarkari11"
    styles={customStyles}
    className="text-[#726f6f]"
    options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari114", option.label)}
    onBlur={formik.handleBlur}
    value={InstituteOptions.find(option => option.label === formik.values.institute)}
  />

</div>

 {/* short name */}
 <div className="flex flex-col">
  <label htmlFor="bazarkari21" className="pb-1 text-[#726f6f]">
    4. Bazarkari-2{" "}

  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari21"
    name="bazarkari21"
    styles={customStyles}
    className="text-[#726f6f]"
    options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari214", option.label)}
    onBlur={formik.handleBlur}
    value={InstituteOptions.find(option => option.label === formik.values.institute)}
  />

</div>

</div>
      </div>
      

      <div>
        <h1 className="font-bold text-red-600 pb-3">Day-15</h1>
      <div className="grid  grid-cols-4 gap-4">

{/* institute */}
<div className="flex flex-col">
  <label htmlFor="date15" className="pb-1 text-[#726f6f]">
    1. Date {" "}

  </label>
  <input
  placeholder="Institute Name"
    id="date15"
    name="date15"
       className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
    type="date"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.date15}
  />
 
</div>
<div className="flex flex-col">
  <label htmlFor="day15" className="pb-1 text-[#726f6f]">
    2. Day
  </label>
  <Select
    placeholder="Select Day"
    id="day15"
    name="day15"
    styles={customStyles}
    className="text-[#726f6f]"
    options={daysOfWeek}
    onChange={(option) => formik.setFieldValue("day15", option.label)}
    onBlur={formik.handleBlur}
    value={daysOfWeek.find(option => option.label === formik.values.day15)}
  />
</div>
{/* short name */}
<div className="flex flex-col">
  <label htmlFor="bazarkari11" className="pb-1 text-[#726f6f]">
    3. Bazarkari-1{" "}
 
  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari11"
    name="bazarkari11"
    styles={customStyles}
    className="text-[#726f6f]"
    options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari115", option.label)}
    onBlur={formik.handleBlur}
    value={InstituteOptions.find(option => option.label === formik.values.institute)}
  />

</div>

 {/* short name */}
 <div className="flex flex-col">
  <label htmlFor="bazarkari21" className="pb-1 text-[#726f6f]">
    4. Bazarkari-2{" "}

  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari21"
    name="bazarkari21"
    styles={customStyles}
    className="text-[#726f6f]"
    options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari215", option.label)}
    onBlur={formik.handleBlur}
    value={InstituteOptions.find(option => option.label === formik.values.institute)}
  />

</div>

</div>
      </div>


      <div>
        <h1 className="font-bold text-red-600 pb-3">Day-16</h1>
      <div className="grid  grid-cols-4 gap-4">

{/* institute */}
<div className="flex flex-col">
  <label htmlFor="date16" className="pb-1 text-[#726f6f]">
    1. Date {" "}

  </label>
  <input
  placeholder="Institute Name"
    id="date16"
    name="date16"
       className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
    type="date"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.date16}
  />
 
</div>
<div className="flex flex-col">
  <label htmlFor="day16" className="pb-1 text-[#726f6f]">
    2. Day
  </label>
  <Select
    placeholder="Select Day"
    id="day16"
    name="day16"
    styles={customStyles}
    className="text-[#726f6f]"
    options={daysOfWeek}
    onChange={(option) => formik.setFieldValue("day16", option.label)}
    onBlur={formik.handleBlur}
    value={daysOfWeek.find(option => option.label === formik.values.day16)}
  />
</div>
{/* short name */}
<div className="flex flex-col">
  <label htmlFor="bazarkari11" className="pb-1 text-[#726f6f]">
    3. Bazarkari-1{" "}
 
  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari11"
    name="bazarkari11"
    styles={customStyles}
    className="text-[#726f6f]"
    options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari116", option.label)}
    onBlur={formik.handleBlur}
    value={InstituteOptions.find(option => option.label === formik.values.institute)}
  />

</div>

 {/* short name */}
 <div className="flex flex-col">
  <label htmlFor="bazarkari21" className="pb-1 text-[#726f6f]">
    4. Bazarkari-2{" "}

  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari21"
    name="bazarkari21"
    styles={customStyles}
    className="text-[#726f6f]"
    options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari216", option.label)}
    onBlur={formik.handleBlur}
    value={InstituteOptions.find(option => option.label === formik.values.institute)}
  />

</div>

</div>
      </div>


      <div>
        <h1 className="font-bold text-red-600 pb-3">Day-17</h1>
      <div className="grid  grid-cols-4 gap-4">

{/* institute */}
<div className="flex flex-col">
  <label htmlFor="date17" className="pb-1 text-[#726f6f]">
    1. Date {" "}

  </label>
  <input
  placeholder="Institute Name"
    id="date17"
    name="date17"
       className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
    type="date"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.date17}
  />
 
</div>
<div className="flex flex-col">
  <label htmlFor="day17" className="pb-1 text-[#726f6f]">
    2. Day
  </label>
  <Select
    placeholder="Select Day"
    id="day17"
    name="day17"
    styles={customStyles}
    className="text-[#726f6f]"
    options={daysOfWeek}
    onChange={(option) => formik.setFieldValue("day17", option.label)}
    onBlur={formik.handleBlur}
    value={daysOfWeek.find(option => option.label === formik.values.day17)}
  />
</div>
{/* short name */}
<div className="flex flex-col">
  <label htmlFor="bazarkari11" className="pb-1 text-[#726f6f]">
    3. Bazarkari-1{" "}
 
  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari11"
    name="bazarkari11"
    styles={customStyles}
    className="text-[#726f6f]"
    options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari117", option.label)}
    onBlur={formik.handleBlur}
    value={InstituteOptions.find(option => option.label === formik.values.institute)}
  />

</div>

 {/* short name */}
 <div className="flex flex-col">
  <label htmlFor="bazarkari21" className="pb-1 text-[#726f6f]">
    4. Bazarkari-2{" "}

  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari21"
    name="bazarkari21"
    styles={customStyles}
    className="text-[#726f6f]"
    options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari217", option.label)}
    onBlur={formik.handleBlur}
    value={InstituteOptions.find(option => option.label === formik.values.institute)}
  />

</div>

</div>
      </div>


      <div>
        <h1 className="font-bold text-red-600 pb-3">Day-18</h1>
      <div className="grid  grid-cols-4 gap-4">

{/* institute */}
<div className="flex flex-col">
  <label htmlFor="date18" className="pb-1 text-[#726f6f]">
    1. Date {" "}

  </label>
  <input
  placeholder="Institute Name"
    id="date18"
    name="date18"
       className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
    type="date"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.date18}
  />
 
</div>
<div className="flex flex-col">
  <label htmlFor="day18" className="pb-1 text-[#726f6f]">
    2. Day
  </label>
  <Select
    placeholder="Select Day"
    id="day18"
    name="day18"
    styles={customStyles}
    className="text-[#726f6f]"
    options={daysOfWeek}
    onChange={(option) => formik.setFieldValue("day18", option.label)}
    onBlur={formik.handleBlur}
    value={daysOfWeek.find(option => option.label === formik.values.day18)}
  />
</div>
{/* short name */}
<div className="flex flex-col">
  <label htmlFor="bazarkari11" className="pb-1 text-[#726f6f]">
    3. Bazarkari-1{" "}
 
  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari11"
    name="bazarkari11"
    styles={customStyles}
    className="text-[#726f6f]"
    options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari118", option.label)}
    onBlur={formik.handleBlur}
    value={InstituteOptions.find(option => option.label === formik.values.institute)}
  />

</div>

 {/* short name */}
 <div className="flex flex-col">
  <label htmlFor="bazarkari21" className="pb-1 text-[#726f6f]">
    4. Bazarkari-2{" "}

  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari21"
    name="bazarkari21"
    styles={customStyles}
    className="text-[#726f6f]"
    options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari218", option.label)}
    onBlur={formik.handleBlur}
    value={InstituteOptions.find(option => option.label === formik.values.institute)}
  />

</div>

</div>
      </div>


      <div>
        <h1 className="font-bold text-red-600 pb-3">Day-19</h1>
      <div className="grid  grid-cols-4 gap-4">

{/* institute */}
<div className="flex flex-col">
  <label htmlFor="date19" className="pb-1 text-[#726f6f]">
    1. Date {" "}

  </label>
  <input
  placeholder="Institute Name"
    id="date19"
    name="date19"
       className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
    type="date"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.date19}
  />
 
</div>
<div className="flex flex-col">
  <label htmlFor="day19" className="pb-1 text-[#726f6f]">
    2. Day
  </label>
  <Select
    placeholder="Select Day"
    id="day19"
    name="day19"
    styles={customStyles}
    className="text-[#726f6f]"
    options={daysOfWeek}
    onChange={(option) => formik.setFieldValue("day19", option.label)}
    onBlur={formik.handleBlur}
    value={daysOfWeek.find(option => option.label === formik.values.day19)}
  />
</div>
{/* short name */}
<div className="flex flex-col">
  <label htmlFor="bazarkari11" className="pb-1 text-[#726f6f]">
    3. Bazarkari-1{" "}
 
  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari11"
    name="bazarkari11"
    styles={customStyles}
    className="text-[#726f6f]"
    options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari119", option.label)}
    onBlur={formik.handleBlur}
    value={InstituteOptions.find(option => option.label === formik.values.institute)}
  />

</div>

 {/* short name */}
 <div className="flex flex-col">
  <label htmlFor="bazarkari21" className="pb-1 text-[#726f6f]">
    4. Bazarkari-2{" "}

  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari21"
    name="bazarkari21"
    styles={customStyles}
    className="text-[#726f6f]"
    options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari219", option.label)}
    onBlur={formik.handleBlur}
    value={InstituteOptions.find(option => option.label === formik.values.institute)}
  />

</div>

</div>
      </div>


      <div>
        <h1 className="font-bold text-red-600 pb-3">Day-20</h1>
      <div className="grid  grid-cols-4 gap-4">

{/* institute */}
<div className="flex flex-col">
  <label htmlFor="date1" className="pb-1 text-[#726f6f]">
    1. Date {" "}

  </label>
  <input
  placeholder="Institute Name"
    id="date20"
    name="date20"
       className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
    type="date"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.date20}
  />
 
</div>
<div className="flex flex-col">
  <label htmlFor="day20" className="pb-1 text-[#726f6f]">
    2. Day
  </label>
  <Select
    placeholder="Select Day"
    id="day20"
    name="day20"
    styles={customStyles}
    className="text-[#726f6f]"
    options={daysOfWeek}
    onChange={(option) => formik.setFieldValue("day20", option.label)}
    onBlur={formik.handleBlur}
    value={daysOfWeek.find(option => option.label === formik.values.day20)}
  />
</div>
{/* short name */}
<div className="flex flex-col">
  <label htmlFor="bazarkari11" className="pb-1 text-[#726f6f]">
    3. Bazarkari-1{" "}
 
  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari11"
    name="bazarkari11"
    styles={customStyles}
    className="text-[#726f6f]"
    options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari120", option.label)}
    onBlur={formik.handleBlur}
    value={InstituteOptions.find(option => option.label === formik.values.institute)}
  />

</div>

 {/* short name */}
 <div className="flex flex-col">
  <label htmlFor="bazarkari21" className="pb-1 text-[#726f6f]">
    4. Bazarkari-2{" "}

  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari21"
    name="bazarkari21"
    styles={customStyles}
    className="text-[#726f6f]"
    options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari220", option.label)}
    onBlur={formik.handleBlur}
    value={InstituteOptions.find(option => option.label === formik.values.institute)}
  />

</div>

</div>
      </div>


      <div>
        <h1 className="font-bold text-red-600 pb-3">Day-21</h1>
      <div className="grid  grid-cols-4 gap-4">

{/* institute */}
<div className="flex flex-col">
  <label htmlFor="date21" className="pb-1 text-[#726f6f]">
    1. Date {" "}

  </label>
  <input
  placeholder="Institute Name"
    id="date21"
    name="date21"
       className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
    type="date"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.date21}
  />
 
</div>
<div className="flex flex-col">
  <label htmlFor="day21" className="pb-1 text-[#726f6f]">
    2. Day
  </label>
  <Select
    placeholder="Select Day"
    id="day21"
    name="day21"
    styles={customStyles}
    className="text-[#726f6f]"
    options={daysOfWeek}
    onChange={(option) => formik.setFieldValue("day21", option.label)}
    onBlur={formik.handleBlur}
    value={daysOfWeek.find(option => option.label === formik.values.day21)}
  />
</div>
{/* short name */}
<div className="flex flex-col">
  <label htmlFor="bazarkari11" className="pb-1 text-[#726f6f]">
    3. Bazarkari-1{" "}
 
  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari11"
    name="bazarkari11"
    styles={customStyles}
    className="text-[#726f6f]"
    options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari121", option.label)}
    onBlur={formik.handleBlur}
    value={InstituteOptions.find(option => option.label === formik.values.institute)}
  />

</div>

 {/* short name */}
 <div className="flex flex-col">
  <label htmlFor="bazarkari21" className="pb-1 text-[#726f6f]">
    4. Bazarkari-2{" "}

  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari21"
    name="bazarkari21"
    styles={customStyles}
    className="text-[#726f6f]"
    options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari221", option.label)}
    onBlur={formik.handleBlur}
    value={InstituteOptions.find(option => option.label === formik.values.institute)}
  />

</div>

</div>
      </div>



      <div>
        <h1 className="font-bold text-red-600 pb-3">Day-22</h1>
      <div className="grid  grid-cols-4 gap-4">

{/* institute */}
<div className="flex flex-col">
  <label htmlFor="date22" className="pb-1 text-[#726f6f]">
    1. Date {" "}

  </label>
  <input
  placeholder="Institute Name"
    id="date22"
    name="date22"
       className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
    type="date"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.date22}
  />
 
</div>
<div className="flex flex-col">
  <label htmlFor="day22" className="pb-1 text-[#726f6f]">
    2. Day
  </label>
  <Select
    placeholder="Select Day"
    id="day22"
    name="day22"
    styles={customStyles}
    className="text-[#726f6f]"
    options={daysOfWeek}
    onChange={(option) => formik.setFieldValue("day22", option.label)}
    onBlur={formik.handleBlur}
    value={daysOfWeek.find(option => option.label === formik.values.day22)}
  />
</div>
{/* short name */}
<div className="flex flex-col">
  <label htmlFor="bazarkari11" className="pb-1 text-[#726f6f]">
    3. Bazarkari-1{" "}
 
  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari11"
    name="bazarkari11"
    styles={customStyles}
    className="text-[#726f6f]"
    options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari122", option.label)}
    onBlur={formik.handleBlur}
    value={InstituteOptions.find(option => option.label === formik.values.institute)}
  />

</div>

 {/* short name */}
 <div className="flex flex-col">
  <label htmlFor="bazarkari21" className="pb-1 text-[#726f6f]">
    4. Bazarkari-2{" "}

  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari21"
    name="bazarkari21"
    styles={customStyles}
    className="text-[#726f6f]"
    options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari222", option.label)}
    onBlur={formik.handleBlur}
    value={InstituteOptions.find(option => option.label === formik.values.institute)}
  />

</div>

</div>
      </div>


      <div>
        <h1 className="font-bold text-red-600 pb-3">Day-23</h1>
      <div className="grid  grid-cols-4 gap-4">

{/* institute */}
<div className="flex flex-col">
  <label htmlFor="date23" className="pb-1 text-[#726f6f]">
    1. Date {" "}

  </label>
  <input
  placeholder="Institute Name"
    id="date23"
    name="date23"
       className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
    type="date"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.date23}
  />
 
</div>
<div className="flex flex-col">
  <label htmlFor="day23" className="pb-1 text-[#726f6f]">
    2. Day
  </label>
  <Select
    placeholder="Select Day"
    id="day23"
    name="day23"
    styles={customStyles}
    className="text-[#726f6f]"
    options={daysOfWeek}
    onChange={(option) => formik.setFieldValue("day23", option.label)}
    onBlur={formik.handleBlur}
    value={daysOfWeek.find(option => option.label === formik.values.day23)}
  />
</div>
{/* short name */}
<div className="flex flex-col">
  <label htmlFor="bazarkari11" className="pb-1 text-[#726f6f]">
    3. Bazarkari-1{" "}
 
  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari11"
    name="bazarkari11"
    styles={customStyles}
    className="text-[#726f6f]"
    options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari123", option.label)}
    onBlur={formik.handleBlur}
    value={InstituteOptions.find(option => option.label === formik.values.institute)}
  />

</div>

 {/* short name */}
 <div className="flex flex-col">
  <label htmlFor="bazarkari21" className="pb-1 text-[#726f6f]">
    4. Bazarkari-2{" "}

  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari21"
    name="bazarkari21"
    styles={customStyles}
    className="text-[#726f6f]"
    options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari223", option.label)}
    onBlur={formik.handleBlur}
    value={InstituteOptions.find(option => option.label === formik.values.institute)}
  />

</div>

</div>
      </div>



      <div>
        <h1 className="font-bold text-red-600 pb-3">Day-24</h1>
      <div className="grid  grid-cols-4 gap-4">

{/* institute */}
<div className="flex flex-col">
  <label htmlFor="date24" className="pb-1 text-[#726f6f]">
    1. Date {" "}

  </label>
  <input
  placeholder="Institute Name"
    id="date24"
    name="date24"
       className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
    type="date"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.date1}
  />
 
</div>
<div className="flex flex-col">
  <label htmlFor="day10" className="pb-1 text-[#726f6f]">
    2. Day
  </label>
  <Select
    placeholder="Select Day"
    id="day24"
    name="day24"
    styles={customStyles}
    className="text-[#726f6f]"
    options={daysOfWeek}
    onChange={(option) => formik.setFieldValue("day24", option.label)}
    onBlur={formik.handleBlur}
    value={daysOfWeek.find(option => option.label === formik.values.day24)}
  />
</div>
{/* short name */}
<div className="flex flex-col">
  <label htmlFor="bazarkari11" className="pb-1 text-[#726f6f]">
    3. Bazarkari-1{" "}
 
  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari11"
    name="bazarkari11"
    styles={customStyles}
    className="text-[#726f6f]"
    options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari124", option.label)}
    onBlur={formik.handleBlur}
    value={InstituteOptions.find(option => option.label === formik.values.institute)}
  />

</div>

 {/* short name */}
 <div className="flex flex-col">
  <label htmlFor="bazarkari21" className="pb-1 text-[#726f6f]">
    4. Bazarkari-2{" "}

  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari21"
    name="bazarkari21"
    styles={customStyles}
    className="text-[#726f6f]"
    options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari224", option.label)}
    onBlur={formik.handleBlur}
    value={InstituteOptions.find(option => option.label === formik.values.institute)}
  />

</div>

</div>
      </div>



      <div>
        <h1 className="font-bold text-red-600 pb-3">Day-25</h1>
      <div className="grid  grid-cols-4 gap-4">

{/* institute */}
<div className="flex flex-col">
  <label htmlFor="date25" className="pb-1 text-[#726f6f]">
    1. Date {" "}

  </label>
  <input
  placeholder="Institute Name"
    id="date25"
    name="date25"
       className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
    type="date"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.date25}
  />
 
</div>
<div className="flex flex-col">
  <label htmlFor="day25" className="pb-1 text-[#726f6f]">
    2. Day
  </label>
  <Select
    placeholder="Select Day"
    id="day25"
    name="day25"
    styles={customStyles}
    className="text-[#726f6f]"
    options={daysOfWeek}
    onChange={(option) => formik.setFieldValue("day25", option.label)}
    onBlur={formik.handleBlur}
    value={daysOfWeek.find(option => option.label === formik.values25)}
  />
</div>
{/* short name */}
<div className="flex flex-col">
  <label htmlFor="bazarkari11" className="pb-1 text-[#726f6f]">
    3. Bazarkari-1{" "}
 
  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari11"
    name="bazarkari11"
    styles={customStyles}
    className="text-[#726f6f]"
    options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari125", option.label)}
    onBlur={formik.handleBlur}
    value={InstituteOptions.find(option => option.label === formik.values.institute)}
  />

</div>

 {/* short name */}
 <div className="flex flex-col">
  <label htmlFor="bazarkari21" className="pb-1 text-[#726f6f]">
    4. Bazarkari-2{" "}

  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari21"
    name="bazarkari21"
    styles={customStyles}
    className="text-[#726f6f]"
    options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari225", option.label)}
    onBlur={formik.handleBlur}
    value={InstituteOptions.find(option => option.label === formik.values.institute)}
  />

</div>

</div>
      </div>


      <div>
        <h1 className="font-bold text-red-600 pb-3">Day-26</h1>
      <div className="grid  grid-cols-4 gap-4">

{/* institute */}
<div className="flex flex-col">
  <label htmlFor="date26" className="pb-1 text-[#726f6f]">
    1. Date {" "}

  </label>
  <input
  placeholder="Institute Name"
    id="date26"
    name="date26"
       className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
    type="date"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.date26}
  />
 
</div>
<div className="flex flex-col">
  <label htmlFor="day26" className="pb-1 text-[#726f6f]">
    2. Day
  </label>
  <Select
    placeholder="Select Day"
    id="day26"
    name="day26"
    styles={customStyles}
    className="text-[#726f6f]"
    options={daysOfWeek}
    onChange={(option) => formik.setFieldValue("day26", option.label)}
    onBlur={formik.handleBlur}
    value={daysOfWeek.find(option => option.label === formik.values.day26)}
  />
</div>
{/* short name */}
<div className="flex flex-col">
  <label htmlFor="bazarkari11" className="pb-1 text-[#726f6f]">
    3. Bazarkari-1{" "}
 
  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari11"
    name="bazarkari11"
    styles={customStyles}
    className="text-[#726f6f]"
    options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari26", option.label)}
    onBlur={formik.handleBlur}
    value={InstituteOptions.find(option => option.label === formik.values.institute)}
  />

</div>

 {/* short name */}
 <div className="flex flex-col">
  <label htmlFor="bazarkari21" className="pb-1 text-[#726f6f]">
    4. Bazarkari-2{" "}

  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari21"
    name="bazarkari21"
    styles={customStyles}
    className="text-[#726f6f]"
    options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari26", option.label)}
    onBlur={formik.handleBlur}
    value={InstituteOptions.find(option => option.label === formik.values.institute)}
  />

</div>

</div>
      </div>



      <div>
        <h1 className="font-bold text-red-600 pb-3">Day-27</h1>
      <div className="grid  grid-cols-4 gap-4">

{/* institute */}
<div className="flex flex-col">
  <label htmlFor="date27" className="pb-1 text-[#726f6f]">
    1. Date {" "}

  </label>
  <input
  placeholder="Institute Name"
    id="date27"
    name="date27"
       className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
    type="date"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.date27}
  />
 
</div>
<div className="flex flex-col">
  <label htmlFor="day27" className="pb-1 text-[#726f6f]">
    2. Day
  </label>
  <Select
    placeholder="Select Day"
    id="day27"
    name="day27"
    styles={customStyles}
    className="text-[#726f6f]"
    options={daysOfWeek}
    onChange={(option) => formik.setFieldValue("day27", option.label)}
    onBlur={formik.handleBlur}
    value={daysOfWeek.find(option => option.label === formik.values.day27)}
  />
</div>
{/* short name */}
<div className="flex flex-col">
  <label htmlFor="bazarkari11" className="pb-1 text-[#726f6f]">
    3. Bazarkari-1{" "}
 
  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari11"
    name="bazarkari11"
    styles={customStyles}
    className="text-[#726f6f]"
    options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari127", option.label)}
    onBlur={formik.handleBlur}
    value={InstituteOptions.find(option => option.label === formik.values.institute)}
  />

</div>

 {/* short name */}
 <div className="flex flex-col">
  <label htmlFor="bazarkari21" className="pb-1 text-[#726f6f]">
    4. Bazarkari-2{" "}

  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari21"
    name="bazarkari21"
    styles={customStyles}
    className="text-[#726f6f]"
    options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari227", option.label)}
    onBlur={formik.handleBlur}
    value={InstituteOptions.find(option => option.label === formik.values.institute)}
  />

</div>

</div>
      </div>


      <div>
        <h1 className="font-bold text-red-600 pb-3">Day-28</h1>
      <div className="grid  grid-cols-4 gap-4">

{/* institute */}
<div className="flex flex-col">
  <label htmlFor="date28" className="pb-1 text-[#726f6f]">
    1. Date {" "}

  </label>
  <input
  placeholder="Institute Name"
    id="date28"
    name="date28"
       className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
    type="date"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.date28}
  />
 
</div>
<div className="flex flex-col">
  <label htmlFor="day28" className="pb-1 text-[#726f6f]">
    2. Day
  </label>
  <Select
    placeholder="Select Day"
    id="day28"
    name="day28"
    styles={customStyles}
    className="text-[#726f6f]"
    options={daysOfWeek}
    onChange={(option) => formik.setFieldValue("day28", option.label)}
    onBlur={formik.handleBlur}
    value={daysOfWeek.find(option => option.label === formik.values.day28)}
  />
</div>
{/* short name */}
<div className="flex flex-col">
  <label htmlFor="bazarkari11" className="pb-1 text-[#726f6f]">
    3. Bazarkari-1{" "}
 
  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari11"
    name="bazarkari11"
    styles={customStyles}
    className="text-[#726f6f]"
    options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari128", option.label)}
    onBlur={formik.handleBlur}
    value={InstituteOptions.find(option => option.label === formik.values.institute)}
  />

</div>

 {/* short name */}
 <div className="flex flex-col">
  <label htmlFor="bazarkari21" className="pb-1 text-[#726f6f]">
    4. Bazarkari-2{" "}

  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari21"
    name="bazarkari21"
    styles={customStyles}
    className="text-[#726f6f]"
    options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari228", option.label)}
    onBlur={formik.handleBlur}
    value={InstituteOptions.find(option => option.label === formik.values.institute)}
  />

</div>

</div>
      </div>


      <div>
        <h1 className="font-bold text-red-600 pb-3">Day-29</h1>
      <div className="grid  grid-cols-4 gap-4">

{/* institute */}
<div className="flex flex-col">
  <label htmlFor="date29" className="pb-1 text-[#726f6f]">
    1. Date {" "}

  </label>
  <input
  placeholder="Institute Name"
    id="date29"
    name="date29"
       className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
    type="date"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.date29}
  />
 
</div>
<div className="flex flex-col">
  <label htmlFor="day29" className="pb-1 text-[#726f6f]">
    2. Day
  </label>
  <Select
    placeholder="Select Day"
    id="day29"
    name="day29"
    styles={customStyles}
    className="text-[#726f6f]"
    options={daysOfWeek}
    onChange={(option) => formik.setFieldValue("day29", option.label)}
    onBlur={formik.handleBlur}
    value={daysOfWeek.find(option => option.label === formik.values.day29)}
  />
</div>
{/* short name */}
<div className="flex flex-col">
  <label htmlFor="bazarkari11" className="pb-1 text-[#726f6f]">
    3. Bazarkari-1{" "}
 
  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari11"
    name="bazarkari11"
    styles={customStyles}
    className="text-[#726f6f]"
    options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari129", option.label)}
    onBlur={formik.handleBlur}
    value={InstituteOptions.find(option => option.label === formik.values.institute)}
  />

</div>

 {/* short name */}
 <div className="flex flex-col">
  <label htmlFor="bazarkari21" className="pb-1 text-[#726f6f]">
    4. Bazarkari-2{" "}

  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari21"
    name="bazarkari21"
    styles={customStyles}
    className="text-[#726f6f]"
    options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari229", option.label)}
    onBlur={formik.handleBlur}
    value={InstituteOptions.find(option => option.label === formik.values.institute)}
  />

</div>

</div>
      </div>



      <div>
        <h1 className="font-bold text-red-600 pb-3">Day-30</h1>
      <div className="grid  grid-cols-4 gap-4">

{/* institute */}
<div className="flex flex-col">
  <label htmlFor="date30" className="pb-1 text-[#726f6f]">
    1. Date {" "}

  </label>
  <input
  placeholder="Institute Name"
    id="date30"
    name="date30"
       className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
    type="date"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.date30}
  />
 
</div>
<div className="flex flex-col">
  <label htmlFor="day30" className="pb-1 text-[#726f6f]">
    2. Day
  </label>
  <Select
    placeholder="Select Day"
    id="day30"
    name="day30"
    styles={customStyles}
    className="text-[#726f6f]"
    options={daysOfWeek}
    onChange={(option) => formik.setFieldValue("day30", option.label)}
    onBlur={formik.handleBlur}
    value={daysOfWeek.find(option => option.label === formik.values.day30)}
  />
</div>
{/* short name */}
<div className="flex flex-col">
  <label htmlFor="bazarkari11" className="pb-1 text-[#726f6f]">
    3. Bazarkari-1{" "}
 
  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari11"
    name="bazarkari11"
    styles={customStyles}
    className="text-[#726f6f]"
    options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari130", option.label)}
    onBlur={formik.handleBlur}
    value={InstituteOptions.find(option => option.label === formik.values.institute)}
  />

</div>

 {/* short name */}
 <div className="flex flex-col">
  <label htmlFor="bazarkari21" className="pb-1 text-[#726f6f]">
    4. Bazarkari-2{" "}

  </label>
  <Select
  placeholder="Select Name"
    id="bazarkari21"
    name="bazarkari21"
    styles={customStyles}
    className="text-[#726f6f]"
    options={InstituteOptions}
    onChange={(option) => formik.setFieldValue("bazarkari230", option.label)}
    onBlur={formik.handleBlur}
    value={InstituteOptions.find(option => option.label === formik.values.institute)}
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
