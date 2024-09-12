import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";
import DashCustomNav from "../../../Share/Formnav";
import axoissecure from './../../../Hooks/Axoisscure';
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

// Validation Schema
const Schema = Yup.object().shape({
  name: Yup.string()
    .label('Name')
    .required('Name is required'),
  
  location: Yup.string()
    .label('Location')
    .required('Location is required'),

  phone: Yup.string()
    .label('Phone')
    .required('Phone is required'),

  meal: Yup.number()
    .label('Meal Charge')
    .required('Meal charge is required'),
});

const UpdateInfromation = () => {

     const { id }= useParams()

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
  
  console.log(item)
  const formik = useFormik({
    initialValues: {
      department: "",
      location: "",
      phone: "",
      meal: "",
    },
    validationSchema: Schema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await axoissecure.patch(`/information/${id}`, {
          name: values.name,
          location: values.location,
          phone: values.phone,
          mealCharge: values.meal,
        });
        console.log("Information Update successfully:", values);
        toast.success("Information Update successfully!");
        refetch();
      } catch (error) {
        toast.error("Error Update Information");
        console.error("Error Update Information:", error);
      }
    },
  });

  useEffect(() => {
    if (item) {
        formik.setValues({
          name: item.name || "",
          location: item.location || "",
          phone: item.phone || "",
          meal: item.mealCharge || "",

        });
    }
}, [item]);

  return (
    <>
      <DashCustomNav name={"Update Information"} listroute={'/dashboard/setting/information'} />
      <div className="p-8">
        <Helmet><title>Manager || Update Information</title></Helmet>
        <div>
          <form
            onSubmit={formik.handleSubmit}
            className="w-[500px] bg-white p-8 rounded-md"
          >
            <div className="grid grid-cols-1 gap-4">

              {/* Department Name */}
              <div className="flex flex-col">
                <label htmlFor="name" className="pb-1 text-[#726f6f]">
                  1. Name (Mass/Hostel){" "}
                  <span className="text-xl font-semibold text-red-500">*</span>
                </label>
                <input
                  placeholder="name"
                  id="name"
                  name="name"
                  className="py-2 text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="text-red-600">{formik.errors.name}</div>
                ) : null}
              </div>
              
              {/* Location */}
              <div className="flex flex-col">
                <label htmlFor="location" className="pb-1 text-[#726f6f]">
                  2. Location{" "}
                  <span className="text-xl font-semibold text-red-500">*</span>
                </label>
                <input
                  placeholder="Rangpur, Bangladesh"
                  id="location"
                  name="location"
                  className="py-2 text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.location}
                />
                {formik.touched.location && formik.errors.location ? (
                  <div className="text-red-600">{formik.errors.location}</div>
                ) : null}
              </div>

              {/* Phone */}
              <div className="flex flex-col">
                <label htmlFor="phone" className="pb-1 text-[#726f6f]">
                  3. Phone{" "}
                  <span className="text-xl font-semibold text-red-500">*</span>
                </label>
                <input
                  placeholder="0173******"
                  id="phone"
                  name="phone"
                  className="py-2 text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                />
                {formik.touched.phone && formik.errors.phone ? (
                  <div className="text-red-600">{formik.errors.phone}</div>
                ) : null}
              </div>

              {/* Meal Charge */}
              <div className="flex flex-col">
                <label htmlFor="meal" className="pb-1 text-[#726f6f]">
                  4. Meal Charge{" "}
                  <span className="text-xl font-semibold text-red-500">*</span>
                </label>
                <input
                  placeholder="Meal charge"
                  id="meal"
                  name="meal"
                  className="py-2 text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.meal}
                />
                {formik.touched.meal && formik.errors.meal ? (
                  <div className="text-red-600">{formik.errors.meal}</div>
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

export default UpdateInfromation;
