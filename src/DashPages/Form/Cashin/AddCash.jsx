import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import {
  FaMoneyBillWave,
  FaUser,
  FaCalendarAlt,
  FaArrowLeft,
  FaSave,
  FaTimes,
  FaReceipt,
  FaPlus
} from 'react-icons/fa';
import { ModernForm, FormField, ModernCard } from "../../../Share/ModernComponents";
import axoissecure from "./../../../Hooks/Axoisscure";

const AddCash = () => {
  const [transactionNumber, setTransactionNumber] = useState("TXN-XXXX-YYYYMMDD");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be less than 50 characters"),
    amount: Yup.number()
      .required("Amount is required")
      .positive("Amount must be positive")
      .min(1, "Amount must be at least 1")
      .max(1000000, "Amount cannot exceed 1,000,000"),
    date: Yup.string()
      .required("Date is required")
      .matches(/^\d{4}-\d{2}-\d{2}$/, "Please enter a valid date"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      amount: "",
      date: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      setIsSubmitting(true);
      try {
        await axoissecure.post("/cashin", {
          name: values.name,
          amount: values.amount,
          date: values.date,
          code: transactionNumber,
        });
        toast.success("Cash In added successfully!");
        resetForm();
        setTransactionNumber("TXN-XXXX-YYYYMMDD");
      } catch (error) {
        toast.error("Error adding cash in");
        console.error("Error adding cash in:", error);
      } finally {
        setIsSubmitting(false);
        setSubmitting(false);
      }
    },
  });

  // Update transaction number based on name and date
  useEffect(() => {
    if (formik.values.name && formik.values.date) {
      const datePart = new Date(formik.values.date)
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, "");
      setTransactionNumber(
        `TXN-${formik.values.name.toUpperCase().slice(0, 3)}-${datePart}`
      );
    } else {
      setTransactionNumber("TXN-XXXX-YYYYMMDD");
    }
  }, [formik.values.name, formik.values.date]);

  return (
    <>
      <Helmet>
        <title>Manager || Add Cash</title>
      </Helmet>

      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
              <FaMoneyBillWave className="text-white text-lg" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-secondary-900">Add Cash In</h1>
              <p className="text-secondary-600">Record new cash inflow transactions</p>
            </div>
          </div>
          <Link to="/dashboard/cashinlist">
            <button className="btn btn-outline">
              <FaArrowLeft className="mr-2" />
              Back to List
            </button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <ModernForm
            onSubmit={formik.handleSubmit}
            title="Cash In Details"
            subtitle="Fill in the details below to record a new cash inflow"
            submitText="Add Cash In"
            cancelText="Reset"
            onCancel={() => formik.resetForm()}
            loading={isSubmitting}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Member Name"
                name="name"
                type="text"
                placeholder="Enter member name"
                icon={FaUser}
                formik={formik}
                required
              />

              <FormField
                label="Amount"
                name="amount"
                type="number"
                placeholder="Enter amount"
                icon={FaMoneyBillWave}
                formik={formik}
                required
                min="1"
                step="0.01"
              />

              <FormField
                label="Date"
                name="date"
                type="date"
                placeholder="Select date"
                icon={FaCalendarAlt}
                formik={formik}
                required
              />
            </div>
          </ModernForm>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Transaction Info */}
          <ModernCard title="Transaction Info" className="h-fit">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-primary-50 rounded-lg">
                <FaReceipt className="text-primary-600 text-xl" />
                <div>
                  <p className="text-sm text-primary-600 font-medium">Transaction Code</p>
                  <p className="text-lg font-mono text-primary-900">{transactionNumber}</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-secondary-600">Form Status:</p>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${formik.values.name ? 'bg-success-500' : 'bg-secondary-300'}`}></div>
                    <span className="text-sm text-secondary-700">Name</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${formik.values.amount ? 'bg-success-500' : 'bg-secondary-300'}`}></div>
                    <span className="text-sm text-secondary-700">Amount</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${formik.values.date ? 'bg-success-500' : 'bg-secondary-300'}`}></div>
                    <span className="text-sm text-secondary-700">Date</span>
                  </div>
                </div>
              </div>
            </div>
          </ModernCard>

          {/* Guidelines */}
          <ModernCard title="Guidelines" className="h-fit">
            <div className="space-y-3 text-sm text-secondary-600">
              <div className="flex items-start space-x-2">
                <FaPlus className="text-primary-500 mt-1 flex-shrink-0" />
                <p>Ensure the member name is accurate and complete</p>
              </div>
              <div className="flex items-start space-x-2">
                <FaPlus className="text-primary-500 mt-1 flex-shrink-0" />
                <p>Enter the exact amount received</p>
              </div>
              <div className="flex items-start space-x-2">
                <FaPlus className="text-primary-500 mt-1 flex-shrink-0" />
                <p>Select the correct transaction date</p>
              </div>
              <div className="flex items-start space-x-2">
                <FaPlus className="text-primary-500 mt-1 flex-shrink-0" />
                <p>Transaction code is auto-generated</p>
              </div>
            </div>
          </ModernCard>
        </div>
      </div>
    </>
  );
};

export default AddCash;
