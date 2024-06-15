import React, { useState, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineFileUpload, MdVisibility, MdVisibilityOff } from "react-icons/md"; // Import visibility icons
import Select from 'react-select';
import { Helmet } from "react-helmet";
import axoissecure from "../../../Hooks/Axoisscure";
import DashCustomNav from "../../../Share/Formnav";

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
  department: Yup.string()
    .label('Department')
    .required(),
  blood: Yup.string()
    .label('Blood')
    .required(),
  startDate: Yup.string()
    .label('Start Date')
    .required(),
  endDate: Yup.string()
    .label('End Date')
    .required(),
  title: Yup.string()
    .label('Title')
    .required(),
  title: Yup.string()
    .label('Title')
    .required(),
  semister: Yup.string()
    .label('Semister')
    .required(),
  email: Yup.string()
    .label('Email')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide Valid Email')
    .required(),
  password: Yup.string()
    .required()
    .label('Password')
});

const AddManager = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const fileInputRef = useRef();
  
  const options = [
    { value: 'CST', label: 'CST' },
  ];

  const optionsSemi = [
    { value: '1st', label: '1st' },
    { value: '2nd', label: '2nd' },
  ];

  const formik = useFormik({
    initialValues: {
      name: "",
      number: "",
      institute: "",
      department: "",
      title: "",
      title: "",
      startDate: '',
      endDate: '',
      image: '',
      semister: '',
      email: "",
      password: ""
    },
    validationSchema: Schema,
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      try {
        await axoissecure.post("/members", {
          name: values.name,
          number: values.number,
          instituteName: values.institute,
          department: values.department,
          nid: values.nid,
          bloodGroup: values.blood,
          title: values.title,
          joiningDate: values.date,
          profile: values.image,
          semister: values.semister,
          email: values.email,
          // date: new Date()?.split("T")[0],
        });
        console.log("Product added successfully:", values);
        toast.success("Manager Added successfully!");
        resetForm();
      } catch (error) {
        toast.error("Error adding Manager");
        console.error("Error adding Manager:", error);
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
      <DashCustomNav name={"Add Manager"} listroute={'/dashboard/managerlist'} />
      <div className="p-8">
        <Helmet><title>Manager || Add Manager</title></Helmet>
        <div>
          <form
            onSubmit={formik.handleSubmit}
            className="w-[700px] bg-white p-8 rounded-md"
          >
            <div className="grid grid-cols-1 gap-4">
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
                {formik.touched.institute && formik.errors.institute ? (
                  <div className="text-red-600">{formik.errors.institute}</div>
                ) : null}
              </div>

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
                  value={optionsSemi.find(option => option.value === formik.values.semister)}
                />
                {formik.touched.semister && formik.errors.semister ? (
                  <div className="text-red-600">{formik.errors.semister}</div>
                ) : null}
              </div>

              <div className="flex pt-2 flex-col">
                <label htmlFor="title">
                  6. Title <span className="text-xl font-semibold text-red-500">*</span>
                </label>
                <input
                  placeholder="Manager Title"
                  id="title"
                  name="title"
                  className="py-2 border-2 rounded-md border-[#0284C7] px-3 w-full"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.title}
                />
                {formik.touched.title && formik.errors.title ? (
                  <div className="text-red-600">{formik.errors.title}</div>
                ) : null}
              </div>

              <div className="flex pt-2 flex-col">
                <label htmlFor="startDate">
                  7. Start Date <span className="text-xl font-semibold text-red-500">*</span>
                </label>
                <input
                  id="startDate"
                  name="startDate"
                  className="py-2 border-2 rounded-md border-[#0284C7] px-3 w-full"
                  type="date"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.startDate}
                />
                {formik.touched.startDate && formik.errors.startDate ? (
                  <div className="text-red-600">{formik.errors.startDate}</div>
                ) : null}
              </div>

              <div className="flex pt-2 flex-col">
                <label htmlFor="endDate">
                  8. End Date <span className="text-xl font-semibold text-red-500">*</span>
                </label>
                <input
                  id="endDate"
                  name="endDate"
                  className="py-2 border-2 rounded-md border-[#0284C7] px-3 w-full"
                  type="date"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.endDate}
                />
                {formik.touched.endDate && formik.errors.endDate ? (
                  <div className="text-red-600">{formik.errors.endDate}</div>
                ) : null}
              </div>

              <div className="flex mt-4 flex-col">
                <label htmlFor="email">
                  9. Email{" "}
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

              <div className="flex pt-2 flex-col relative">
                <label htmlFor="password">
                  10. Password <span className="text-xl font-semibold text-red-500">*</span>
                </label>
                <input
                  id="password"
                  name="password"
                  className="py-2 border-2 rounded-md border-[#0284C7] px-3 w-full"
                  type={showPassword ? "text" : "password"} // Toggle between text and password
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-600">{formik.errors.password}</div>
                ) : null}
                <button
                  type="button"
                  className="absolute top-10 right-3"
                  onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                >
                  {showPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
                </button>
              </div>

              <div className="flex p-2 flex-col">
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
                    className="mt-2 max-w-[200px] border-2 border-black border-dashed h-[150px]"
                  />
                )}
                <button
                  type="button"
                  className="border-blue-500 border-2 border-dashed text-black px-3 py-2 rounded mt-2"
                  onClick={() => fileInputRef.current.click()}
                >
                  <MdOutlineFileUpload className="flex justify-items-center text-[30px] w-[300px] mx-auto" />
                </button>
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

export default AddManager;
