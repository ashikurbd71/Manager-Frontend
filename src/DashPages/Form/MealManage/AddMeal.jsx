import React, { useState,useRef, useEffect } from "react";
import {useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from 'react-select'
import { Helmet } from "react-helmet";
import DashCustomNav from "../../../Share/Formnav";
import axoissecure from "../../../Hooks/Axoisscure";
import { getMember } from "../../../Share/Api/SelectorApi/settingselector";
import { useQuery } from "@tanstack/react-query";



// Validation Schema
const Schema = Yup.object().shape({
  name: Yup.string()
  .label('Name')
  .required(),

  taka: Yup.string()
  .label('Add Money')
  .required(),

  


    
});

const today = new Date()

const AddMeal = () => {



  
  const formik = useFormik({
    initialValues: {
      name: "",
      memberemail : "",
      membernumber: "",
      taka: "",
      totalmeal: "",
     

    },
    validationSchema: Schema,
    onSubmit: async (values, { resetForm }) => {
      console.log(values)
      try {
        await axoissecure.post("/mealmanage", {


         
          addMoney: values.taka,
          totalMeal: values.totalmeal,
          blance : values.taka,
          date : today,
          member: {
            id: values?.name && parseInt(values?.name),
          },

     
       
      
          
          // date: new Date()?.split("T")[0],
        });
        console.log("Product added successfully:", values);
        toast.success("Meal Added  successfully!");
        resetForm();
        
      } catch (error) {
        toast.error("Error adding Meal");
        console.error("Error adding Member:", error);
      }
    },
  });

  const { data: item, refetch } = useQuery({
    queryKey: ["information"],
    queryFn: async () => {
      try {
        const res = await axoissecure.get(`/information`);
        console.log(res.data);
        return res.data[0];
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
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

 const[name,setName] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMember();
        console.log(data?.member, "all items here");
        setName(data?.member);
      } catch (error) {
        console.error("Error fetching member types:", error);
      }
    };

    fetchData();
  }, []);

  const nameOptions =
    (name &&
      name?.map((singleData) => ({
        value: singleData?.id,
        label: singleData?.name,
      }))) ||
    [];



  

      
  


   


   
    useEffect(() => {
      if (formik.values.taka && item?.mealCharge) {
        const calculatedTotalMeal = (parseFloat(formik.values.taka) / item?.mealCharge).toFixed();
        formik.setFieldValue('totalmeal', calculatedTotalMeal);
      }
    }, [formik.values.taka, item?.mealCharge]);
    
  



  return (
    <>
     <DashCustomNav name={"Add Meal"} listroute={'/dashboard/mealmanagelist'} />
    
  
    <div className="p-8">
       <Helmet><title>Manager || Add Meal</title></Helmet>
  
     
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="w-[600px] bg-white p-8  rounded-md"
        >
          <div className="grid grid-cols-1 gap-4">
          {/* Name */}
          <div className="flex flex-col">
            <label htmlFor="name" className="pb-1 text-[#726f6f]">
              1. Name <span className="text-xl font-semibold text-red-500">*</span>
            </label>
            <Select
              placeholder="Select Member Name"
              id="name"
              name="name"
              styles={customStyles}
              className="text-[#726f6f]"
              options={nameOptions}
              onChange={(option) => formik.setFieldValue('name', option.value)}
              onBlur={formik.handleBlur}
              value={nameOptions.find(option => option.value === formik.values.name)}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-600">{formik.errors.name}</div>
            ) : null}
          </div>

          {/* Add Money */}
          <div className="flex pt-2 flex-col">
            <label htmlFor="taka" className="pb-1 text-[#726f6f]">
              2. Add Money <span className="text-xl font-semibold text-red-500">*</span>
            </label>
            <input
              placeholder="00$"
              id="taka"
              name="taka"
              className="py-2 text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.taka}
            />
            {formik.touched.taka && formik.errors.taka ? (
              <div className="text-red-600">{formik.errors.taka}</div>
            ) : null}
          </div>

          {/* Total Meal */}
          <div className="flex flex-col">
            <label htmlFor="totalmeal" className="pb-1 text-[#726f6f]">
              3. Total Meal <span className="text-xl font-semibold text-red-500">*</span>
            </label>
            <input
              id="totalmeal"
              placeholder="00"
              name="totalmeal"
              readOnly
              className="py-2 text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
              type="text"
      
              value={formik.values.totalmeal}
            />
          </div>
        </div>

           {/* Cost */}
      


           



          <div className="flex justify-end items-center gap-4">
            <button
              className="w-[100px] bg-[#0284C7] text-white mt-10 rounded-lg h-[40px] border-2 font-bold"
              type="submit"
            >
              Add Meal
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

export default AddMeal;
