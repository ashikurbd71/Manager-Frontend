import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import  Select from 'react-select';

import { Helmet } from 'react-helmet';
import { MdOutlineFileUpload } from 'react-icons/md';

import * as Yup from "yup";
import { toast } from 'react-toastify';
import axoissecure from '../../../Hooks/Axoisscure';
import DashCustomNav from '../../../Share/Formnav';
import { getMember } from '../../../Share/Api/SelectorApi/settingselector';

// / Validation Schema
const Schema = Yup.object().shape({
  // email: Yup.string()
  // .label('Total Tk')
  // .required(),

  // password: Yup.string()
  // .label('Total Meal')
  // .required(),

  // name: Yup.string()
  // .label('name')
  // .required(),

  

});

const Adduser = () => {

    const formik = useFormik({
        initialValues: {
          userName: "",
          password : "",
          role : "",
          email : "",
   

          
          
        },
        validationSchema: Schema,
        onSubmit: async (values, { resetForm }) => {
          console.log(values)
          try {
            await axoissecure.post("/users", {
             userName: {
                    id: values?.name && parseInt(values?.name),
              },
               
              role : values.roleType,
              email : values.email,
              password : values.password,
            
            })
            console.log("User Added successfully:", values);
            toast.success("User Added   successfully!");
            resetForm(); 
          } catch (error) {
            toast.error("error report sending ");
            console.error("Error adding Institute:", error);
          }
        },
      });
    

      const option = [
  {value : 'Member', label : "Member"}
      ]
    
    
      const customStylesS = {
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
            value: singleData?.id,
            label: singleData?.name,
          }))) ||
        [];
    
    console.log(InstituteOptions)
    
    return (
       <>
          <Helmet><title>Manager || Add User</title></Helmet>
       <DashCustomNav name={"Add  User"} listroute={'/dashboard/userlist'} />
       
       <div className="flex justify-items-center pt-5 px-5 pb-10">
    
        <form
          onSubmit={formik.handleSubmit}
          className="lg:w-[600px] w-full bg-white p-8  rounded-md"
        >
          <div className="grid  grid-cols-1 gap-4">

            {/* institute */}

            <div className="flex flex-col">
              <label htmlFor="name" className="pb-1 text-[#726f6f]">
                1. Name {" "}
                <span className="text-xl font-semibold text-red-500">*</span>
              </label>
              <Select
              placeholder="Select Name"
                id="name"
                name="name"
                styles={customStylesS}
                options={InstituteOptions}
                onChange={(option) => formik.setFieldValue("name", option.value)}
                onBlur={formik.handleBlur}
                value={InstituteOptions.find(option => option.value === formik.values.name)}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-600">{formik.errors.name}</div>
              ) : null}
            </div>



            <div className="flex flex-col">
              <label htmlFor="email" className="pb-1 text-[#726f6f]">
                2. Email {" "}
                <span className="text-xl font-semibold text-red-500">*</span>
              </label>
              <input
              placeholder="ashikur@gmail.com"
                id="email"
                name="email"
          
                   className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-600">{formik.errors.email}</div>
              ) : null}
            </div>

            {/* short name */}
            <div className="flex flex-col">
              <label htmlFor="password" className="pb-1 text-[#726f6f]">
                3. Password {" "}
                <span className="text-xl font-semibold text-red-500">*</span>
              </label>
              <input
              placeholder="*****"
                id="password"
                name="password"
     
                   className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-600">{formik.errors.password}</div>
              ) : null}
            </div>


            <div className="flex flex-col">
              <label htmlFor="roleType" className="pb-1 text-[#726f6f]">
                4. Role Type {" "}
                <span className="text-xl font-semibold text-red-500">*</span>
              </label>
              <Select
              placeholder="Select Type"
                id="roleType"
                name="roleType"
                styles={customStylesS}
                options={option}
                onChange={(option) => formik.setFieldValue("roleType", option.value)}
                onBlur={formik.handleBlur}
                value={InstituteOptions.find(option => option.value === formik.values.roleType)}
              />
              {formik.touched.roleType && formik.errors.roleType ? (
                <div className="text-red-600">{formik.errors.roleType}</div>
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
       
       </>
    );
};

export default Adduser;