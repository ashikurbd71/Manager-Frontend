import React, { useState, useRef, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from 'react-select';
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import DashCustomNav from "../../../../Share/Formnav";
import axoissecure from "../../../../Hooks/Axoisscure";
import { useQuery } from "@tanstack/react-query";

// Validation Schema
const Schema = Yup.object().shape({
  name: Yup.string()
    .label('Name')
    .required(),
 
  startDate: Yup.string()
    .label(' Date')
    .required(),
  noticetitle: Yup.string()
    .label('Notice Title')
    .required(),
  
  deatils: Yup.string()
    .label('Details')
    .required(),
  
});

const UpdateNotice = () => {

const {id} =useParams()

console.log(id)

const { data: items = [], refetch } = useQuery({
    queryKey: ["productadded"],
    queryFn: async () => {
      try {
        const res = await axoissecure.get(`/notice/${id}`);
        return res.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    },
  });

  console.log(items)

  
  const [type,setType] = useState()

  const formik = useFormik({
    initialValues: {
      name: "",
      startDate: '',
      noticetitle : "",
      deatils : ""
    
    },
    validationSchema: Schema,
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      try {
        await axoissecure.patch(`/notice/${id}`, {
          assigner: values.name,
          position: type,
          date : values.startDate,
          noticetitle : values.noticetitle,
          discription : values.deatils,

        });
        console.log("Product added successfully:", values);
        toast.success("Notice Update successfully!");
        refetch();
      } catch (error) {
        toast.error("Error Update Notice");
        console.error("Error adding Manager:", error);
      }
    },
  });

  useEffect(() => {
    if (items) {
        formik.setValues({
            name: items.assigner || "",
            startDate: items.date?.split('T')[0] || "",
            noticetitle: items.noticetitle || "",
            deatils: items.discription || "",

        });

        if(items.position === "Meal Manager"){

      setType('Meal Manager')
        }else if(items.position === "Mass Owner"){

            setType('Mass Owner')
        }
    }
}, [items]);

 

  return (
    <>
      <DashCustomNav name={"Update Notice"} listroute={'/dashboard/noticelist'} />
      <div className="p-8">
        <Helmet><title>Manager || Update Notice</title></Helmet>
        <div>
          <form
            onSubmit={formik.handleSubmit}
            className="w-[700px] bg-white p-8 rounded-md"
          >
            <div className="grid grid-cols-1 gap-4">
              <div className="flex flex-col">
                <label htmlFor="name" className="pb-1 text-[#726f6f]">
                  1. Assigner{" "}
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

              <label htmlFor="name" className="-mb-4 text-[#726f6f]">
                  2. Positon{" "}
                  <span className="text-xl font-semibold text-red-500">*</span>
                </label>
              <div className="flex gap-16 justify-start">
                  <div className="flex items-center ">
                    <div className="form-control">
                      <label className="label cursor-pointer">
                        <input
                         
                          type="radio"
                          name="radio-10"
                          value="Meal Manager"
                          className="radio checked:bg-[#499ce0] checked:min-w-[24.93px] rounded-lg min-w-6 bg-slate-200 min-h-[24.96px]"
                          checked={type === "Meal Manager"}
                          onChange={() => setType("Meal Manager")}
                        />

                        <span className="text-[#777777] text-[16px] ml-2">
                          Meal Manager
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
                          value="Mass Owner"
                          className="radio checked:bg-[#499ce0] checked:min-w-[24.93px] min-w-6 rounded-lg bg-slate-200 min-h-[24.96px]"
                          checked={type === "Mass Owner"}
                          onChange={() => setType("Mass Owner")}
                        />

                        <span className="text-[#777777] text-[16px] ml-2">
                          Mass Owner
                        </span>
                      </label>
                    </div>
                  </div>
                </div>


              <div className="flex pt-2 flex-col">
                <label htmlFor="startDate" className="pb-1 text-[#726f6f]">
                  3. Date <span className="text-xl font-semibold text-red-500">*</span>
                </label>
                <input
                  id="startDate"
                  name="startDate"
                          className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
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
                <label htmlFor="noticetitle" className="pb-1 text-[#726f6f]">
                  4. Notice Title{" "}
                  <span className="text-xl font-semibold  text-red-500">*</span>
                </label>
                <input
                  placeholder="Notice Title"
                  id="noticetitle"
                  name="noticetitle"
                          className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.noticetitle}
                />
                {formik.touched.noticetitle && formik.errors.noticetitle ? (
                  <div className="text-red-600">{formik.errors.noticetitle}</div>
                ) : null}
              </div>

              <div className="flex flex-col">
                <label htmlFor="deatils" className="pb-1 text-[#726f6f]">
                  5. Details{" "}
                  <span className="text-xl font-semibold text-red-500">*</span>
                </label>
                <textarea
                rows={5}
                  placeholder="Notice Details"
                  id="deatils"
                  name="deatils"
                          className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
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
                Update
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

export default UpdateNotice;
