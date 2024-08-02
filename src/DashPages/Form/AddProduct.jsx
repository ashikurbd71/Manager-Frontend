import React, { useState,useRef, useEffect } from "react";
import DashCustomNav from "../../Share/Formnav";
import {useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineFileUpload } from "react-icons/md";
import Select from 'react-select'

import { Helmet } from "react-helmet";
import axoissecure from './../../Hooks/Axoisscure';
import { getBlood, getDepartment, getInstitute, getSemister } from "../../Share/Api/SelectorApi/settingselector";

// Validation Schema
const Schema = Yup.object().shape({
  name: Yup.string()
  .label('Name')
  .required(),

  fatherName: Yup.string()
  .label('Father Name')
  .required(),

  motherName: Yup.string()
  .label('Mother Name')
  .required(),

  session: Yup.string()
  .label('Session')
  .required(),

  number: Yup.string()
  .matches(/^(01[3-9]\d{8})$/, 'Please provide a valid number')
     .typeError('Please Provide Valid Number')
     .label("Number")
    .required(),
    motherNumber: Yup.string()
  .matches(/^(01[3-9]\d{8})$/, 'Please provide a valid number')
     .typeError('Please Provide Valid Number')
     .label("Mother Number")
    .required(),
    fatherNumber: Yup.string()
  .matches(/^(01[3-9]\d{8})$/, 'Please provide a valid number')
     .typeError('Please Provide Valid Number')
     .label("Father Number")
    .required(),
    institute: Yup.string()
    .label('Institute Name')
    .required(),
    department: Yup.string().required().label('Department'),
    
    nid: Yup.string()
    .matches( /^\d{17}$/i,"Please Provide Valid Nid Number"),

    BrithCertifecate: Yup.string()
    .matches( /^\d{17}$/i,"Please Provide Valid Brith Certifecate Number"),

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
  const [type,setType] = useState()
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef();

  
  const formik = useFormik({
    initialValues: {
      name: "",
      fatherName : "",
      motherName : "",
      fatherNumber : "",
      motherNumber : "",
      BrithCertifecate : "",
      session : "",
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
          fatherName: values.fatherName,
          motherName: values.motherName,
          fatherNumber: values.fatherNumber,
          motherNumber: values.motherNumber,
          brithCertifecate: values.BrithCertifecate,
          number: values.number,
          session : values.session,
          instituteName: {
            id: values?.institute && parseInt(values?.institute),
          },

          department: {
            id: values?.department && parseInt(values?.department),
          },
          semister: {
            id: values?.semister && parseInt(values?.semister),
          },

          bloodGroup: {
            id: values?.blood && parseInt(values?.blood),
          },
          nid : values.nid,
          address : values.address,
          joiningDate : values.date,
          profile : values.image,
          email : values.email,
      
          
          // date: new Date()?.split("T")[0],
        },{    headers: {
          "Content-Type": "multipart/form-data",
        }});
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
        const data = await getInstitute();
        console.log(data, "all items here");
        setInstitute(data);
      } catch (error) {
        console.error("Error fetching member types:", error);
      }
    };

    fetchData();
  }, []);

  const InstituteOptions =
    (institute &&
      institute?.map((singleData) => ({
        value: singleData?.id,
        label: singleData?.name,
      }))) ||
    [];


    const[department,setDepartment] = useState(null)
    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await getDepartment();
          console.log(data, "all items here");
          setDepartment(data);
        } catch (error) {
          console.error("Error fetching member types:", error);
        }
      };
  
      fetchData();
    }, []);
  
    const DepartmentOptions =
      (department &&
        department?.map((singleData) => ({
          value: singleData?.id,
          label: singleData?.name,
        }))) ||
      [];


      
    const[semister,setSemister] = useState(null)
    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await getSemister();
          console.log(data, "all items here");
          setSemister(data);
        } catch (error) {
          console.error("Error fetching member types:", error);
        }
      };
  
      fetchData();
    }, []);
  
    const SemisterOptions =
      (semister &&
        semister?.map((singleData) => ({
          value: singleData?.id,
          label: singleData?.name,
        }))) ||
      [];

      const[blood,setBlood] = useState(null)
      useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await getBlood();
            console.log(data, "all items here");
            setBlood(data);
          } catch (error) {
            console.error("Error fetching member types:", error);
          }
        };
    
        fetchData();
      }, []);
    
      const BloodOptions =
        (blood &&
          blood?.map((singleData) => ({
            value: singleData?.id,
            label: singleData?.name,
          }))) ||
        [];
  



  return (
    <>
     <DashCustomNav name={"Add Member"} listroute={'/dashboard/memberlist'} />
    
  
    <div className="p-8">
       <Helmet><title>Manager || Add Member</title></Helmet>
  
     
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="w-[700px] bg-white p-8  rounded-md"
        >
          <div className="grid  grid-cols-1 gap-4">

            {/* Product SL */}
            <div className="flex flex-col">
              <label htmlFor="name" className="pb-1 text-[#726f6f]">
                1. Name{" "}
                <span className="text-xl font-semibold text-red-500">*</span>
              </label>
              <input
              placeholder="Full Name"
                id="name"
                name="name"
                     className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
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
              <label htmlFor="number" className="pb-1 text-[#726f6f]">
                2. Phone {" "}
                <span className="text-xl font-semibold text-red-500">*</span>
              </label>
              <input
                id="number"
                placeholder="+088-"
                name="number"
                     className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.number}
              />
              {formik.touched.number && formik.errors.number ? (
                <div className="text-red-600">{formik.errors.number}</div>
              ) : null}
            </div>



            <div className="flex flex-col">
              <label htmlFor="fatherName" className="pb-1 text-[#726f6f]">
                3. Father Name{" "}
                <span className="text-xl font-semibold text-red-500">*</span>
              </label>
              <input
              placeholder="Father Name"
                id="fatherName"
                name="fatherName"
                     className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fatherName}
              />
              {formik.touched.fatherName && formik.errors.fatherName ? (
                <div className="text-red-600">{formik.errors.fatherName}</div>
              ) : null}
            </div>





            {/* Product Name */}
            <div className="flex flex-col">
              <label htmlFor="fatherNumber" className="pb-1 text-[#726f6f]">
                4. Father Phone{" "}
                <span className="text-xl font-semibold text-red-500">*</span>
              </label>
              <input
                id="fatherNumber"
                placeholder="+088-"
                name="fatherNumber"
                className="py-2 border-2 text-[#726f6f] rounded-md border-[#0284C7] px-3 w-full"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fatherNumber}
              />
              {formik.touched.fatherNumber && formik.errors.fatherNumber ? (
                <div className="text-red-600">{formik.errors.fatherNumber}</div>
              ) : null}
            </div>

            <div className="flex flex-col">
              <label htmlFor="motherName" className="pb-1 text-[#726f6f]">
                5. Mother Name{" "}
                <span className="text-xl font-semibold text-red-500">*</span>
              </label>
              <input
              placeholder="Mother Name"
                id="motherName"
                name="motherName"
                     className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.motherName}
              />
              {formik.touched.motherName && formik.errors.motherName ? (
                <div className="text-red-600">{formik.errors.motherName}</div>
              ) : null}
            </div>


              {/* Product Name */}
              <div className="flex flex-col">
              <label htmlFor="motherNumber" className="pb-1 text-[#726f6f]">
                6. Mother Phone{" "}
                <span className="text-xl font-semibold text-red-500">*</span>
              </label>
              <input
                id="motherNumber"
                placeholder="+088-"
                name="motherNumber"
                     className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.motherNumber}
              />
              {formik.touched.motherNumber && formik.errors.motherNumber ? (
                <div className="text-red-600">{formik.errors.motherNumber}</div>
              ) : null}
            </div>


             {/* Cost */}
             <div className="flex flex-col">
              <label htmlFor="institute" className="pb-1 text-[#726f6f]">
                7. Institute Name{" "}
                <span className="text-xl font-semibold text-red-500">*</span>
              </label>
              <Select
              placeholder="Select Instutite"
                id="institute"
                name="institute"
                styles={customStyles}
                className="text-[#726f6f]"
                options={InstituteOptions}
                onChange={(option) => formik.setFieldValue("institute", option.value)}
                onBlur={formik.handleBlur}
                value={InstituteOptions.find(option => option.value === formik.values.institute)}
              />
              {formik.touched.institute && formik.errors.institute ? (
                <div className="text-red-600">{formik.errors.institute}</div>
              ) : null}
            </div>

            <div className="flex flex-col">
              <label htmlFor="session" className="pb-1 text-[#726f6f]">
                8. Session (Year){" "}
                <span className="text-xl font-semibold text-red-500">*</span>
              </label>
              <input
              placeholder="Session 22-23"
                id="session"
                name="session"
                     className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.session}
              />
              {formik.touched.session && formik.errors.session ? (
                <div className="text-red-600">{formik.errors.session}</div>
              ) : null}
            </div>

                       {/* Cost */}
                       <div className="flex flex-col">
              <label htmlFor="department" className="pb-1 text-[#726f6f]">
                9. Department{" "}
                <span className="text-xl font-semibold text-red-500">*</span>
              </label>
              <Select
              placeholder="Select Department"
                id="department"
                name="department"
                styles={customStyles}
                className="text-[#726f6f]"
                options={DepartmentOptions}
                onChange={(option) => formik.setFieldValue("department", option.value)}
                onBlur={formik.handleBlur}
                value={DepartmentOptions.find(option => option.value === formik.values.department)}
              />
              {formik.touched.department && formik.errors.department ? (
                <div className="text-red-600">{formik.errors.department}</div>
              ) : null}
            </div>


{/* semister */}
            <div className="flex mt-2 flex-col">
              <label htmlFor="semister"  className="pb-1 text-[#726f6f]">
                10. Semister{" "}
                <span className="text-xl font-semibold text-red-500">*</span>
              </label>
              <Select
              placeholder="Select Semister"
                id="semister"
                name="semister"
                className="text-[#726f6f]"
                styles={customStyles}
                options={SemisterOptions}
                onChange={(option) => formik.setFieldValue("semister", option.value)}
                onBlur={formik.handleBlur}
                value={SemisterOptions.find(option => option.value === formik.values.semister)}
              />
              {formik.touched.semister && formik.errors.semister ? (
                <div className="text-red-600">{formik.errors.semister}</div>
              ) : null}
            </div>

            <label htmlFor="name" className="-mb-4 text-[#726f6f]">
                  11. Identy{" "}
                  <span className="text-xl font-semibold text-red-500">*</span>
                </label>
              <div className="flex gap-16 justify-start">
                  <div className="flex items-center ">
                    <div className="form-control">
                      <label className="label cursor-pointer">
                        <input
                         
                          type="radio"
                          name="radio-10"
                          value="NID"
                          className="radio checked:bg-[#499ce0] checked:min-w-[24.93px] rounded-lg min-w-6 bg-slate-200 min-h-[24.96px]"
                          checked={type === "NID"}
                          onChange={() => setType("NID")}
                        />

                        <span className="text-[#777777] text-[16px] ml-2">
                          NID
                        </span>
                      </label>
                      {/* <p className="text-red-500 text-sm font-medium">
                            {errors.gender?.message}
                          </p> */}
                    </div>
                  </div>
                  <div className="flex items-center h-[41px]">
                    <div className="form-control">
                      <label className="label cursor-pointer">
                        <input
                       
                          type="radio"
                          name="radio-10"
                          value="Brith Certifecate"
                          className="radio checked:bg-[#499ce0] checked:min-w-[24.93px] min-w-6 rounded-lg bg-slate-200 min-h-[24.96px]"
                          checked={type === "Brith Certifecate"}
                          onChange={() => setType("Brith Certifecate")}
                        />

                        <span className="text-[#777777] text-[16px] ml-2">
                          Brith Certifecate
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
             
                {
                  type === 'NID' && <>
                  
                     {/* Sell Amount */}
            <div className="flex flex-col">
             
              <input
                placeholder="Nid Number"
                id="nid"
                name="nid"
                     className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.nid}
              />
             
            </div>
                  
                  </>
                }

                {
                  type === "Brith Certifecate" && <>
                   <div className="flex flex-col">
             
             <input
               placeholder="Brith Certifecate Number"
               id="BrithCertifecate"
               name="BrithCertifecate"
                    className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
               type="text"
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
               value={formik.values.BrithCertifecate}
             />
      
           </div>
                  
                  </>
                }

         

     

{/* blood */}


                       {/* Cost */}
                       <div className="flex mt-2 flex-col">
              <label htmlFor="department"    className="pb-1 text-[#726f6f]">
                12. Blood Group{" "}
                <span className="text-xl font-semibold text-red-500">*</span>
              </label>
              <Select
              placeholder="Select Blood Group"
                id="blood"
                name="blood"
                   className="text-[#726f6f]"
                styles={customStyles}
                options={BloodOptions}
                onChange={(option) => formik.setFieldValue("blood", option.value)}
                onBlur={formik.handleBlur}
                value={BloodOptions.find(option => option.value === formik.values.blood)}
              />
              {formik.touched.blood && formik.errors.blood ? (
                <div className="text-red-600">{formik.errors.blood}</div>
              ) : null}
            </div>

{/* Adress */}
            <div className="flex pt-2 flex-col">
              <label htmlFor="nid"    className="pb-1 text-[#726f6f]">
                13. Address <span className="text-xl font-semibold text-red-500">*</span>
               
              </label>
              <input
                placeholder="Full Address"
                id="address"
                name="address"
     
                     className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
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
              <label htmlFor="nid" className="pb-1 text-[#726f6f]">
                14. Joining Date <span className="text-xl font-semibold text-red-500">*</span>
               
              </label>
              <input
                
                id="date"
                name="date"
                     className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
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
              <label htmlFor="number" className="pb-1 text-[#726f6f]">
                15. Email{" "}
                <span className="text-xl font-semibold text-red-500">*</span>
              </label>
              <input
                id="email"
                placeholder="ovi@gmail.com"
                name="email"
                     className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
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
                 <div className="flex pt-4  flex-col">
              <label htmlFor="image" className="pb-1 text-[#726f6f]">
                16. Photo{" "}
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
                  className="mt-2 max-w-[200px] border-2 border-black  border-dashed h-[150px]"
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

export default AddProduct;
