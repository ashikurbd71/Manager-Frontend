import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import {
  FaBullhorn,
  FaUser,
  FaCalendarAlt,
  FaFileAlt,
  FaEdit,
  FaArrowLeft,
  FaSave,
  FaTimes,
  FaUserTie,
  FaBuilding,
  FaInfoCircle
} from 'react-icons/fa';
import { ModernForm, FormField, FormTextarea, ModernCard } from "../../../Share/ModernComponents";
import axoissecure from "../../../Hooks/Axoisscure";

// Validation Schema
const Schema = Yup.object().shape({
  name: Yup.string()
    .label('Name')
    .required('Assigner name is required'),

  startDate: Yup.string()
    .label('Date')
    .required('Date is required'),
  noticetitle: Yup.string()
    .label('Notice Title')
    .required('Notice title is required'),

  deatils: Yup.string()
    .label('Details')
    .required('Notice details are required'),

});

const AddNotice = () => {
  const [type, setType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      startDate: '',
      noticetitle: "",
      deatils: ""
    },
    validationSchema: Schema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      if (!type) {
        toast.error("Please select a position");
        return;
      }

      setIsSubmitting(true);
      try {
        await axoissecure.post("/notice", {
          assigner: values.name,
          position: type,
          date: values.startDate,
          noticetitle: values.noticetitle,
          discription: values.deatils,
        });
        toast.success("Notice sent successfully!");
        resetForm();
        setType('');
      } catch (error) {
        toast.error("Error adding notice");
        console.error("Error adding notice:", error);
      } finally {
        setIsSubmitting(false);
        setSubmitting(false);
      }
    },
  });

  const positionOptions = [
    { value: "Meal Manager", label: "Meal Manager", icon: FaUserTie },
    { value: "Mass Owner", label: "Mass Owner", icon: FaBuilding }
  ];

  return (
    <>
      <Helmet>
        <title>Manager || Add Notice</title>
      </Helmet>

      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
              <FaBullhorn className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Create Notice
              </h1>
              <p className="text-secondary-600">Send important announcements and updates</p>
            </div>
          </div>
          <Link to="/dashboard/noticelist">
            <button className="btn btn-outline">
              <FaArrowLeft className="mr-2" />
              Back to List
            </button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          <ModernForm
            onSubmit={formik.handleSubmit}
            title="Notice Information"
            subtitle="Fill in the details for your notice"
            submitText="Send Notice"
            cancelText="Reset"
            onCancel={() => {
              formik.resetForm();
              setType('');
            }}
            loading={isSubmitting}
          >
            <div className="space-y-6">
              {/* Assigner */}
              <FormField
                label="Assigner"
                name="name"
                type="text"
                placeholder="Enter assigner name"
                icon={FaUser}
                formik={formik}
                required
              />

              {/* Position Selection */}
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-3">
                  Position <span className="text-error-500">*</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {positionOptions.map((option) => {
                    const IconComponent = option.icon;
                    return (
                      <div
                        key={option.value}
                        onClick={() => setType(option.value)}
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${type === option.value
                          ? 'border-purple-500 bg-purple-50 shadow-md'
                          : 'border-secondary-200 hover:border-purple-300 hover:bg-purple-25'
                          }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${type === option.value
                            ? 'bg-purple-500 text-white'
                            : 'bg-secondary-100 text-secondary-600'
                            }`}>
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <div>
                            <p className={`font-medium ${type === option.value
                              ? 'text-purple-900'
                              : 'text-secondary-900'
                              }`}>
                              {option.label}
                            </p>
                            <p className={`text-sm ${type === option.value
                              ? 'text-purple-600'
                              : 'text-secondary-500'
                              }`}>
                              {option.value === "Meal Manager"
                                ? "Manage meal-related notices"
                                : "Manage general announcements"
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {!type && formik.touched.name && (
                  <p className="text-error-500 text-sm mt-1">Please select a position</p>
                )}
              </div>

              {/* Date */}
              <FormField
                label="Date"
                name="startDate"
                type="date"
                placeholder="Select date"
                icon={FaCalendarAlt}
                formik={formik}
                required
              />

              {/* Notice Title */}
              <FormField
                label="Notice Title"
                name="noticetitle"
                type="text"
                placeholder="Enter notice title"
                icon={FaFileAlt}
                formik={formik}
                required
              />

              {/* Details */}
              <FormTextarea
                label="Notice Details"
                name="deatils"
                placeholder="Enter detailed notice information..."
                icon={FaEdit}
                formik={formik}
                required
                rows={6}
              />
            </div>
          </ModernForm>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Notice Preview */}
          <ModernCard title="Notice Preview" className="h-fit">
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
                <div className="flex items-center space-x-2 mb-3">
                  <FaBullhorn className="text-purple-600" />
                  <h4 className="font-semibold text-purple-900">Preview</h4>
                </div>

                {formik.values.noticetitle ? (
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-purple-600 font-medium">Title</p>
                      <p className="text-sm text-purple-900 font-medium">{formik.values.noticetitle}</p>
                    </div>
                    {formik.values.deatils && (
                      <div>
                        <p className="text-xs text-purple-600 font-medium">Details</p>
                        <p className="text-sm text-purple-900 line-clamp-3">{formik.values.deatils}</p>
                      </div>
                    )}
                    <div className="flex items-center justify-between text-xs text-purple-600">
                      <span>By: {formik.values.name || 'Not specified'}</span>
                      <span>{formik.values.startDate || 'No date'}</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-purple-600 italic">Start filling the form to see preview</p>
                )}
              </div>
            </div>
          </ModernCard>

          {/* Guidelines */}
          <ModernCard title="Guidelines" className="h-fit">
            <div className="space-y-3 text-sm text-secondary-600">
              <div className="flex items-start space-x-2">
                <FaInfoCircle className="text-purple-500 mt-1 flex-shrink-0" />
                <p>Keep titles clear and concise</p>
              </div>
              <div className="flex items-start space-x-2">
                <FaInfoCircle className="text-purple-500 mt-1 flex-shrink-0" />
                <p>Provide detailed information in the description</p>
              </div>
              <div className="flex items-start space-x-2">
                <FaInfoCircle className="text-purple-500 mt-1 flex-shrink-0" />
                <p>Select the appropriate position for the notice</p>
              </div>
              <div className="flex items-start space-x-2">
                <FaInfoCircle className="text-purple-500 mt-1 flex-shrink-0" />
                <p>Review before sending</p>
              </div>
            </div>
          </ModernCard>

          {/* Quick Stats */}
          <ModernCard title="Form Status" className="h-fit">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-secondary-600">Assigner</span>
                <div className={`w-3 h-3 rounded-full ${formik.values.name ? 'bg-green-500' : 'bg-secondary-300'}`} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-secondary-600">Position</span>
                <div className={`w-3 h-3 rounded-full ${type ? 'bg-green-500' : 'bg-secondary-300'}`} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-secondary-600">Date</span>
                <div className={`w-3 h-3 rounded-full ${formik.values.startDate ? 'bg-green-500' : 'bg-secondary-300'}`} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-secondary-600">Title</span>
                <div className={`w-3 h-3 rounded-full ${formik.values.noticetitle ? 'bg-green-500' : 'bg-secondary-300'}`} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-secondary-600">Details</span>
                <div className={`w-3 h-3 rounded-full ${formik.values.deatils ? 'bg-green-500' : 'bg-secondary-300'}`} />
              </div>
            </div>
          </ModernCard>
        </div>
      </div>
    </>
  );
};

export default AddNotice;
