import React, { useState,useRef } from "react";
import DashCustomNav from "../../Share/Formnav";
import {useFormik } from "formik";
import * as Yup from "yup";
import axoissecure from "../../Share/Hooks/Axoisscure";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineFileUpload } from "react-icons/md";
import Select from 'react-select'
import useHelmet from './../../Share/Hooks/useHelmet';
import { Helmet } from "react-helmet";

// Validation Schema
const Schema = Yup.object().shape({
  name: Yup.string()
  .label('Name')
  .required(),

  number: Yup.string()
  .matches(/^(01[3-9]\d{8})$/, 'Please provide a valid number')
     .typeError('Please Provide Valid Number')
     .label("Number")
    .required(),
    institute: Yup.string()
    .label('Institute Name')
    .required(),
    department: Yup.string().required().label('Department'),
    nid: Yup.string()
    .matches( /^\d{17}$/i,"Please Provide Valid Nid Number"),

    department: Yup.string()
    .label('Departmnet')
    .required(),
    blood: Yup.string()
    .label('Blood')
    .required(),
    date: Yup.string()
    .label('Joining Date')
    .required(),

    address: Yup.string()
    .label('Address')
    .required(),

    semister: Yup.string()
    .label('Semister')
    .required(),

    email: Yup.string()
    .label('Email')
    .matches( /^[^\s@]+@[^\s@]+\.[^\s@]+$/,'Please provide Valid Email')
    .required(),
    
});

const AddProduct = () => {

  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef();
  const options = [
    { value: 'Computer Since And Teachnology', label: 'Computer Since And Teachnology' },
  
  ]
  const optionsBlood = [
    { value: 'B+', label: 'B+' },
  
  ]

  const optionsSemi = [
    { value: '1st', label: '1st' },
    { value: '2nd', label: '2nd' },
  
  ]
  
  const formik = useFormik({
    initialValues: {
      name: "",
      number: "",
      institute: "",
      department: "",
      nid: "",
      department : "",
      blood : "",
      address : "",
      date : '',
      image : '',
      semister : '',
      email: ""
    },
    validationSchema: Schema,
    onSubmit: async (values, { resetForm }) => {
      console.log(values)
      try {
        await axoissecure.post("/members", {
          name: values.name,
          number: values.number,
          instituteName: values.institute,
          department: values.department,
          nid : values.nid,
          bloodGroup : values.blood,
          address : values.address,
          joiningDate : values.date,
          profile : values.image,
          semister : values.semister,
          email : values.email,
        
        
          
          // date: new Date()?.split("T")[0],
        });
        console.log("Product added successfully:", values);
        toast.success("Member Added  successfully!");
        resetForm();
      } catch (error) {
        toast.error("Error adding Member");
        console.error("Error adding Member:", error);
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
     <DashCustomNav name={"Add Member"} listroute={'/dashboard/memberlist'} />
    
  
    <div className="p-8">
       <Helmet><title>Manager || Add Member</title></Helmet>
      <useHelmet name={'Manager || Add Member'}/>
     
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="w-[700px] bg-white p-8  rounded-md"
        >
          <div className="grid  grid-cols-1 gap-4">

            {/* Product SL */}
            <div className="flex flex-col">
              <label htmlFor="name">
                1. Name{" "}
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

            {/* Product Name */}
            <div className="flex flex-col">
              <label htmlFor="number">
                2. Number{" "}
                <span className="text-xl font-semibold text-red-500">*</span>
              </label>
              <input
                id="number"
                placeholder="+088-"
                name="number"
                className="py-2 border-2 rounded-md border-[#0284C7] px-3 w-full"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.number}
              />
              {formik.touched.number && formik.errors.number ? (
                <div className="text-red-600">{formik.errors.number}</div>
              ) : null}
            </div>

            {/* Product Details */}
            <div className="flex flex-col">
              <label htmlFor="institute">
                3. Institute Name{" "}
                <span className="text-xl font-semibold text-red-500">*</span>
              </label>
              <input
                id="institute"
                placeholder="Institute Name"
                name="institute"
                className="py-2 border-2 rounded-md border-[#0284C7] px-3 w-full"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.institute}
              />
              {formik.touched.institute &&
              formik.errors.institute ? (
                <div className="text-red-600">
                  {formik.errors.institute}
                </div>
              ) : null}
            </div>

           
                       {/* Cost */}
                       <div className="flex flex-col">
              <label htmlFor="department">
                4. Department{" "}
                <span className="text-xl font-semibold text-red-500">*</span>
              </label>
              <Select
              placeholder="Select Department"
                id="department"
                name="department"
                styles={customStyles}
                options={options}
                onChange={(option) => formik.setFieldValue("department", option.value)}
                onBlur={formik.handleBlur}
                value={options.find(option => option.value === formik.values.department)}
              />
              {formik.touched.department && formik.errors.department ? (
                <div className="text-red-600">{formik.errors.department}</div>
              ) : null}
            </div>


{/* semister */}
            <div className="flex mt-2 flex-col">
              <label htmlFor="semister">
                5. Semister{" "}
                <span className="text-xl font-semibold text-red-500">*</span>
              </label>
              <Select
              placeholder="Select Semister"
                id="semister"
                name="semister"
                styles={customStyles}
                options={optionsSemi}
                onChange={(option) => formik.setFieldValue("semister", option.value)}
                onBlur={formik.handleBlur}
                value={options.find(option => option.value === formik.values.semister)}
              />
              {formik.touched.semister && formik.errors.semister ? (
                <div className="text-red-600">{formik.errors.semister}</div>
              ) : null}
            </div>

            {/* Sell Amount */}
            <div className="flex flex-col">
              <label htmlFor="nid">
                6. National Id 
               
              </label>
              <input
                placeholder="Nid Number"
                id="nid"
                name="nid"
                className="py-2 border-2 rounded-md border-[#0284C7] px-3 w-full"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.nid}
              />
              {formik.touched.nid && formik.errors.nid ? (
                <div className="text-red-600">{formik.errors.nid}</div>
              ) : null}
            </div>

     

{/* blood */}


                       {/* Cost */}
                       <div className="flex mt-2 flex-col">
              <label htmlFor="department">
                7. Blood Group{" "}
                <span className="text-xl font-semibold text-red-500">*</span>
              </label>
              <Select
              placeholder="Select Blood Group"
                id="blood"
                name="blood"
                styles={customStyles}
                options={optionsBlood}
                onChange={(option) => formik.setFieldValue("blood", option.value)}
                onBlur={formik.handleBlur}
                value={options.find(option => option.value === formik.values.blood)}
              />
              {formik.touched.blood && formik.errors.blood ? (
                <div className="text-red-600">{formik.errors.blood}</div>
              ) : null}
            </div>

{/* Adress */}
            <div className="flex pt-2 flex-col">
              <label htmlFor="nid">
                8. Address <span className="text-xl font-semibold text-red-500">*</span>
               
              </label>
              <input
                placeholder="Full Address"
                id="address"
                name="address"
                className="py-2 border-2 rounded-md border-[#0284C7] px-3 w-full"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
              />
              {formik.touched.address && formik.errors.address ? (
                <div className="text-red-600">{formik.errors.address}</div>
              ) : null}
            </div>


            {/* date */}
            <div className="flex pt-2 flex-col">
              <label htmlFor="nid">
                9. Joining Date <span className="text-xl font-semibold text-red-500">*</span>
               
              </label>
              <input
                
                id="date"
                name="date"
                className="py-2 border-2 rounded-md border-[#0284C7] px-3 w-full"
                type="date"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.date}
              />
              {formik.touched.date && formik.errors.date ? (
                <div className="text-red-600">{formik.errors.date}</div>
              ) : null}
            </div>

          </div>

           {/* Cost */}
      


            <div className="flex mt-4 flex-col">
              <label htmlFor="number">
                10. Email{" "}
                <span className="text-xl font-semibold text-red-500">*</span>
              </label>
              <input
                id="email"
                placeholder="ovi@gmail.com"
                name="email"
                className="py-2 border-2 rounded-md border-[#0284C7] px-3 w-full"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-600">{formik.errors.email}</div>
              ) : null}
            </div>

                 {/* photo */}
                 <div className="flex p-2  flex-col">
              <label htmlFor="image">
                11. Photo{" "}
                <span className="text-xl font-semibold text-red-500">*</span>
              </label>
              <input
                ref={fileInputRef}
                id="image"
                name="image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  formik.setFieldValue("image", file);
                  setImagePreview(URL.createObjectURL(file));
                }}
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-2 max-w-[200px] h-[150px]"
                />
              )}
              <button
                type="button"
                className="border-blue-500 border-2 border-dashed text-black px-3 py-2 rounded mt-2"
                onClick={() => fileInputRef.current.click()}
              >
                <MdOutlineFileUpload className="flex justify-items-center text-[30px] w-[300px] mx-auto"/>
              </button>
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

export default AddProduct;
