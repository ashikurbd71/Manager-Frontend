import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import  Select from 'react-select';

import { Helmet } from 'react-helmet';
import { MdOutlineFileUpload } from 'react-icons/md';

import * as Yup from "yup";
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import axoissecure from '../../../Hooks/Axoisscure';
import DashCustomNav from '../../../Share/Formnav';
import { useQuery } from '@tanstack/react-query';
import { getMember } from '../../../Share/Api/SelectorApi/settingselector';

// / Validation Schema
const Schema = Yup.object().shape({
  // totaltk: Yup.string()
  // .label('Total Tk')
  // .required(),

  // totalmeal: Yup.string()
  // .label('Total Meal')
  // .required(),

  // bazarkari: Yup.string()
  // .label('BazarKari')
  // .required(),

  

});

const UpdateReport = () => {

 const {id} = useParams()

 
 const { data: items = [], refetch } = useQuery({
    queryKey: ["report"],
    queryFn: async () => {
      try {
        const res = await axoissecure.get(`/report/${id}`);
        return res.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    },
  });


  const fileInputRef = useRef();
    const formik = useFormik({
        initialValues: {
          totaltk: "",
          totalmeal : "",
          extratk : "",
          bazarkari : "",
          comments : "",
          image : "",

          
          
        },
        validationSchema: Schema,
        onSubmit: async (values, { resetForm }) => {
          console.log(values)
          try {
            await axoissecure.patch(`/report/${id}`, {
              bazarkari:Array.isArray(values.bazarkari)
              ? values.bazarkari.map((item) => ({ id: parseInt(item) }))
              : [],

              totalTk : values.totaltk,
              totalMeal : values.totalmeal,
              extraTk : values.extratk,
              comments : values.comments,
              profile : values.image,
              reportStatus : "Pending",
              date : new Date(),
              status:"1",
            },{    headers: {
              "Content-Type": "multipart/form-data",
            }})
            console.log("Update  successfully:", values);
            toast.success("Report Send  successfully!");
            refetch(); 
          } catch (error) {
            toast.error("error report sending ");
            console.error("Error adding Institute:", error);
          }
        },
      });
    

      
  useEffect(() => {
    if (items) {
        formik.setValues({
            bazarkari: items.bazarkari?.id || "",
            totalmeal: items.totalMeal,
            totaltk : items?.totalTk,
            extratk: items.extraTk,
            comments: items.comments || "",
            image : items.profile,
            
        });
    }
}, [items]);
    
const image = `${import.meta.env.VITE_API_URL}${"/"}${items?.profile}`;
    
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
          <Helmet><title>Manager || Public || Update My Report</title></Helmet>
       <DashCustomNav name={"Update My Report"} listroute={'/public/myreport'} />
       
       <div className="flex justify-items-center pt-5 px-5 pb-10">
    
        <form
          onSubmit={formik.handleSubmit}
          className="lg:w-[600px] w-full bg-white p-8  rounded-md"
        >
          <div className="grid  grid-cols-1 gap-4">

            {/* institute */}

            <div className="flex flex-col">
              <label htmlFor="bazarkari" className="pb-1 text-[#726f6f]">
                1. Bazarkari {" "}
                <span className="text-xl font-semibold text-red-500">*</span>
              </label>
              <Select
              placeholder="Select Name"
                id="bazarkari"
                name="bazarkari"
                isMulti
                styles={customStylesS}
                options={InstituteOptions}
                onChange={(option) => formik.setFieldValue("bazarkari", option.value)}
                onBlur={formik.handleBlur}
                value={InstituteOptions.find(option => option.value === formik.values.bazarkari)}
              />
              {formik.touched.bazarkari && formik.errors.bazarkari ? (
                <div className="text-red-600">{formik.errors.bazarkari}</div>
              ) : null}
            </div>



            <div className="flex flex-col">
              <label htmlFor="totaltk" className="pb-1 text-[#726f6f]">
                2. Total Tk {" "}
                <span className="text-xl font-semibold text-red-500">*</span>
              </label>
              <input
              placeholder="00"
                id="totaltk"
                name="totaltk"
          
                   className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.totaltk}
              />
              {formik.touched.totaltk && formik.errors.totaltk ? (
                <div className="text-red-600">{formik.errors.totaltk}</div>
              ) : null}
            </div>

            {/* short name */}
            <div className="flex flex-col">
              <label htmlFor="totalmeal" className="pb-1 text-[#726f6f]">
                3. Total Meal {" "}
                <span className="text-xl font-semibold text-red-500">*</span>
              </label>
              <input
              placeholder="00"
                id="totalmeal"
                name="totalmeal"
     
                   className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.totalmeal}
              />
              {formik.touched.totalmeal && formik.errors.totalmeal ? (
                <div className="text-red-600">{formik.errors.totalmeal}</div>
              ) : null}
            </div>


            <div className="flex flex-col">
              <label htmlFor="name" className="pb-1 text-[#726f6f]">
                4. Extra Tk {" "}
              
              </label>
              <input
              placeholder="00"
                id="extratk"
                name="extratk"
                
                className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.extratk}
              />
             
            </div>

            <div className="flex flex-col">
              <label htmlFor="comments" className="pb-1 text-[#726f6f]">
                5. Comments  {" "}
             
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
             
            </div>

            <div className="flex pt-2  flex-col">
              <label htmlFor="image" className="pb-1 text-[#726f6f]">
                6. List Upload{" "}
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
             
                }}
              />

              {
                items?.profile && <a href={image} target='blank' className='text-[#0284C7] font-semibold underline'>View</a>
              }
             
              <button
                type="button"
                className="border-blue-500 border-2 border-dashed text-black px-3 py-2 rounded mt-2"
                onClick={() => fileInputRef.current.click()}
              >
                <MdOutlineFileUpload className="flex justify-items-center text-[30px] w-[300px] mx-auto"/>
              </button>
            </div>
          

          </div>


          <div className="flex justify-end items-center gap-4">
            <button
              className="w-full bg-[#0284C7] text-white mt-10 rounded-lg h-[40px] border-2 font-bold"
              type="submit"
            >
               Update Report
            </button>
           

          </div>


        </form>
      </div>
       
       </>
    );
};

export default UpdateReport;