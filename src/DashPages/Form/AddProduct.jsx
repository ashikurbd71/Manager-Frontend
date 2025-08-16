import React, { useState, useRef, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineFileUpload } from "react-icons/md";
import Select from 'react-select';
import { Helmet } from "react-helmet";
import { FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCalendar, FaGraduationCap, FaIdCard, FaSave, FaTimes } from 'react-icons/fa';
import { Link } from "react-router-dom";
import axoissecure from './../../Hooks/Axoisscure';
import { getBlood, getDepartment, getInstitute, getSemister } from "../../Share/Api/SelectorApi/settingselector";
import { useQuery } from "@tanstack/react-query";
import { ModernForm, FormField, FormSelect, FormTextarea, ModernCard, ModernAlert } from "../../Share/ModernComponents";

// Validation Schema
const Schema = Yup.object().shape({
  name: Yup.string()
    .label('Name')
    .required('Name is required'),
  fatherName: Yup.string()
    .label('Father Name')
    .required('Father name is required'),
  motherName: Yup.string()
    .label('Mother Name')
    .required('Mother name is required'),
  session: Yup.string()
    .label('Session')
    .required('Session is required'),
  number: Yup.string()
  ,
  motherNumber: Yup.string(),

  fatherNumber: Yup.string()
  ,
  institute: Yup.string()
  ,
  department: Yup.string()
  ,
  nid: Yup.string()
  ,
  BrithCertifecate: Yup.string()
  ,
  blood: Yup.string()
  ,
  date: Yup.string()
  ,
  address: Yup.string()
  ,
  semister: Yup.string()
    .label('Semester'),

  email: Yup.string()
    .label('Email')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide Valid Email')
    .required('Email is required'),
  transaction: Yup.string()

});

const AddProduct = () => {
  const [type, setType] = useState();
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef();

  // Fetch select options
  const { data: institutes = [] } = useQuery({
    queryKey: ["institutes"],
    queryFn: getInstitute,
  });

  const { data: departments = [] } = useQuery({
    queryKey: ["departments"],
    queryFn: getDepartment,
  });

  const { data: semisters = [] } = useQuery({
    queryKey: ["semisters"],
    queryFn: getSemister,
  });

  const { data: bloodGroups = [] } = useQuery({
    queryKey: ["bloodGroups"],
    queryFn: getBlood,
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      fatherName: "",
      motherName: "",
      session: "",
      number: "",
      motherNumber: "",
      fatherNumber: "",
      institute: "",
      department: "",
      nid: "",
      BrithCertifecate: "",
      blood: "",
      date: "",
      address: "",
      semister: "",
      email: "",
      transaction: "",
      image: null,
    },
    validationSchema: Schema,
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);
      try {
        const formData = new FormData();

        // Append all form values
        Object.keys(values).forEach(key => {
          if (key === 'image' && values[key]) {
            formData.append(key, values[key]);
          } else if (key !== 'image') {
            formData.append(key, values[key]);
          }
        });

        const response = await axoissecure.post("/members", formData);

        if (response.status === 201) {
          toast.success("Member added successfully!");
          resetForm();
          setImagePreview(null);
        }
      } catch (error) {
        console.error("Error adding member:", error);
        toast.error(error.response?.data?.message || "Failed to add member");
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      formik.setFieldValue("image", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    formik.setFieldValue("image", null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <Helmet><title>Manager || Add Member</title></Helmet>

      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
              <FaUser className="text-white text-lg" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-secondary-900">Add New Member</h1>
              <p className="text-secondary-600">Register a new hostel member</p>
            </div>
          </div>
          <Link to="/dashboard/memberlist">
            <button className="btn btn-outline">
              <FaTimes className="mr-2" />
              Cancel
            </button>
          </Link>
        </div>
      </div>

      <ModernForm
        onSubmit={formik.handleSubmit}
        title="Member Information"
        subtitle="Fill in the member details below"
        submitText="Add Member"
        cancelText="Cancel"
        onCancel={() => window.history.back()}
        loading={isSubmitting}
        className="max-w-4xl mx-auto"
      >
        {/* Personal Information Section */}
        <ModernCard title="Personal Information" className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="Full Name"
              name="name"
              type="text"
              placeholder="Enter full name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && formik.errors.name}
              icon={FaUser}
            />

            <FormField
              label="Father's Name"
              name="fatherName"
              type="text"
              placeholder="Enter father's name"
              value={formik.values.fatherName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.fatherName && formik.errors.fatherName}
              icon={FaUser}
            />

            <FormField
              label="Mother's Name"
              name="motherName"
              type="text"
              placeholder="Enter mother's name"
              value={formik.values.motherName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.motherName && formik.errors.motherName}
              icon={FaUser}
            />

            <FormField
              label="Session"
              name="session"
              type="text"
              placeholder="Enter session (e.g., 2023-24)"
              value={formik.values.session}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.session && formik.errors.session}
              icon={FaGraduationCap}
            />
          </div>
        </ModernCard>

        {/* Contact Information Section */}
        <ModernCard title="Contact Information" className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="Phone Number"
              name="number"
              type="tel"
              placeholder="01XXXXXXXXX"
              value={formik.values.number}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.number && formik.errors.number}
              icon={FaPhone}
            />

            <FormField
              label="Email Address"
              name="email"
              type="email"
              placeholder="Enter email address"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && formik.errors.email}
              icon={FaEnvelope}
            />

            <FormField
              label="Father's Phone"
              name="fatherNumber"
              type="tel"
              placeholder="01XXXXXXXXX"
              value={formik.values.fatherNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.fatherNumber && formik.errors.fatherNumber}
              icon={FaPhone}
            />

            <FormField
              label="Mother's Phone"
              name="motherNumber"
              type="tel"
              placeholder="01XXXXXXXXX"
              value={formik.values.motherNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.motherNumber && formik.errors.motherNumber}
              icon={FaPhone}
            />
          </div>
        </ModernCard>

        {/* Academic Information Section */}
        <ModernCard title="Academic Information" className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormSelect
              label="Institute"
              name="institute"
              value={formik.values.institute}
              onChange={(value) => formik.setFieldValue("institute", value)}
              onBlur={formik.handleBlur}
              error={formik.touched.institute && formik.errors.institute}
              options={institutes.map(inst => ({ value: inst._id, label: inst.name }))}
              placeholder="Select institute"
              icon={FaGraduationCap}
            />

            <FormSelect
              label="Department"
              name="department"
              value={formik.values.department}
              onChange={(value) => formik.setFieldValue("department", value)}
              onBlur={formik.handleBlur}
              error={formik.touched.department && formik.errors.department}
              options={departments.map(dept => ({ value: dept._id, label: dept.name }))}
              placeholder="Select department"
              icon={FaGraduationCap}
            />

            <FormSelect
              label="Semester"
              name="semister"
              value={formik.values.semister}
              onChange={(value) => formik.setFieldValue("semister", value)}
              onBlur={formik.handleBlur}
              error={formik.touched.semister && formik.errors.semister}
              options={semisters.map(sem => ({ value: sem._id, label: sem.name }))}
              placeholder="Select semester"
              icon={FaGraduationCap}
            />

            <FormField
              label="Joining Date"
              name="date"
              type="date"
              value={formik.values.date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.date && formik.errors.date}
              icon={FaCalendar}
            />
          </div>
        </ModernCard>

        {/* Identity Information Section */}
        <ModernCard title="Identity Information" className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="NID Number"
              name="nid"
              type="text"
              placeholder="Enter 17-digit NID number"
              value={formik.values.nid}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.nid && formik.errors.nid}
              icon={FaIdCard}
            />

            <FormField
              label="Birth Certificate Number"
              name="BrithCertifecate"
              type="text"
              placeholder="Enter 17-digit birth certificate number"
              value={formik.values.BrithCertifecate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.BrithCertifecate && formik.errors.BrithCertifecate}
              icon={FaIdCard}
            />

            <FormSelect
              label="Blood Group"
              name="blood"
              value={formik.values.blood}
              onChange={(value) => formik.setFieldValue("blood", value)}
              onBlur={formik.handleBlur}
              error={formik.touched.blood && formik.errors.blood}
              options={bloodGroups.map(bg => ({ value: bg._id, label: bg.name }))}
              placeholder="Select blood group"
              icon={FaIdCard}
            />

            <FormField
              label="Transaction Number"
              name="transaction"
              type="text"
              placeholder="Enter transaction number"
              value={formik.values.transaction}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.transaction && formik.errors.transaction}
              icon={FaIdCard}
            />
          </div>
        </ModernCard>

        {/* Address Section */}
        <ModernCard title="Address Information" className="mb-6">
          <FormTextarea
            label="Address"
            name="address"
            placeholder="Enter full address"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.address && formik.errors.address}
            icon={FaMapMarkerAlt}
            rows={3}
          />
        </ModernCard>

        {/* Profile Image Section */}
        <ModernCard title="Profile Image" className="mb-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="btn btn-outline"
                >
                  <MdOutlineFileUpload className="mr-2" />
                  Choose Image
                </button>
              </div>
              {imagePreview && (
                <button
                  type="button"
                  onClick={removeImage}
                  className="btn btn-error"
                >
                  <FaTimes className="mr-2" />
                  Remove
                </button>
              )}
            </div>

            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg border-2 border-secondary-200"
                />
              </div>
            )}
          </div>
        </ModernCard>
      </ModernForm>
    </>
  );
};

export default AddProduct;
