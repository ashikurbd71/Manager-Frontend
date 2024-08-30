import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";
import DashCustomNav from "../../../Share/Formnav";
import axoissecure from './../../../Hooks/Axoisscure';

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

const AddInformation = () => {
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
        await axoissecure.post("/information", {
          name: values.name,
          location: values.location,
          phone: values.phone,
          mealCharge: values.meal,
        });
        console.log("Information added successfully:", values);
        toast.success("Information added successfully!");
        resetForm();
      } catch (error) {
        toast.error("Error adding Information");
        console.error("Error adding Information:", error);
      }
    },
  });

  return (
    <>
      <DashCustomNav name={"Add Department"} listroute={'/dashboard/setting/departmentlist'} />
      <div className="p-8">
        <Helmet><title>Manager || Add Department</title></Helmet>
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

export default AddInformation;
