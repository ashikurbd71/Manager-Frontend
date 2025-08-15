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
  FaPlus,
  FaComment,
  FaWallet,
  FaExclamationTriangle
} from 'react-icons/fa';
import { ModernForm, FormField, FormTextarea, ModernCard } from "../../../Share/ModernComponents";
import axoissecure from "./../../../Hooks/Axoisscure";
import { useQuery } from "@tanstack/react-query";

const AddCashout = () => {
  const [transactionNumber, setTransactionNumber] = useState("TXN-XXXX-YYYYMMDD");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: cashInData, isLoading: cashInLoading } = useQuery({
    queryKey: ["cashin"],
    queryFn: async () => {
      try {
        const res = await axoissecure.get(`/cashin/total`);
        return res.data;
      } catch (error) {
        console.error("Error fetching cash in data:", error);
        throw error;
      }
    },
  });

  const { data: cashOutData, isLoading: cashOutLoading } = useQuery({
    queryKey: ["cashout"],
    queryFn: async () => {
      try {
        const res = await axoissecure.get(`/cashout/total`);
        return res.data;
      } catch (error) {
        console.error("Error fetching cash out data:", error);
        throw error;
      }
    },
  });

  const totalCashIn = cashInData?.totalAmount || 0;
  const totalCashOut = cashOutData?.totalAmount || 0;
  const availableBalance = totalCashIn - totalCashOut;

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be less than 50 characters"),
    amount: Yup.number()
      .required("Amount is required")
      .positive("Amount must be positive")
      .min(1, "Amount must be at least 1")
      .max(availableBalance, `Amount cannot exceed available balance (৳${availableBalance.toLocaleString()})`),
    date: Yup.string()
      .required("Date is required")
      .matches(/^\d{4}-\d{2}-\d{2}$/, "Please enter a valid date"),
    item: Yup.string()
      .required("Reason is required")
      .min(5, "Reason must be at least 5 characters")
      .max(200, "Reason must be less than 200 characters"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      amount: "",
      date: "",
      item: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      setIsSubmitting(true);
      try {
        await axoissecure.post("/cashout", {
          name: values.name,
          amount: values.amount,
          comment: values.item,
          date: values.date,
          code: transactionNumber,
        });
        toast.success("Cash Out added successfully!");
        resetForm();
        setTransactionNumber("TXN-XXXX-YYYYMMDD");
      } catch (error) {
        toast.error("Error adding cash out");
        console.error("Error adding cash out:", error);
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
        <title>Manager || Add Cash Out</title>
      </Helmet>

      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
              <FaMoneyBillWave className="text-white text-lg" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-secondary-900">Add Cash Out</h1>
              <p className="text-secondary-600">Record new cash outflow transactions</p>
            </div>
          </div>
          <Link to="/dashboard/cashoutlist">
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
            title="Cash Out Details"
            subtitle="Fill in the details below to record a new cash outflow"
            submitText="Add Cash Out"
            cancelText="Reset"
            onCancel={() => formik.resetForm()}
            loading={isSubmitting}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Recipient Name"
                name="name"
                type="text"
                placeholder="Enter recipient name"
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
                max={availableBalance}
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

            <div className="mt-6">
              <FormTextarea
                label="Reason/Purpose"
                name="item"
                placeholder="Enter the reason for this cash outflow"
                icon={FaComment}
                formik={formik}
                required
                rows={4}
              />
            </div>
          </ModernForm>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Balance Info */}
          <ModernCard title="Financial Summary" className="h-fit">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-success-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FaWallet className="text-success-600 text-xl" />
                  <div>
                    <p className="text-sm text-success-600 font-medium">Total Cash In</p>
                    <p className="text-lg font-bold text-success-900">৳{totalCashIn.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-warning-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FaMoneyBillWave className="text-warning-600 text-xl" />
                  <div>
                    <p className="text-sm text-warning-600 font-medium">Total Cash Out</p>
                    <p className="text-lg font-bold text-warning-900">৳{totalCashOut.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-primary-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FaReceipt className="text-primary-600 text-xl" />
                  <div>
                    <p className="text-sm text-primary-600 font-medium">Available Balance</p>
                    <p className="text-lg font-bold text-primary-900">৳{availableBalance.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {availableBalance < 1000 && (
                <div className="flex items-center space-x-2 p-3 bg-error-50 rounded-lg">
                  <FaExclamationTriangle className="text-error-600" />
                  <p className="text-sm text-error-700">Low balance warning</p>
                </div>
              )}
            </div>
          </ModernCard>

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
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${formik.values.item ? 'bg-success-500' : 'bg-secondary-300'}`}></div>
                    <span className="text-sm text-secondary-700">Reason</span>
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
                <p>Ensure the recipient name is accurate</p>
              </div>
              <div className="flex items-start space-x-2">
                <FaPlus className="text-primary-500 mt-1 flex-shrink-0" />
                <p>Amount cannot exceed available balance</p>
              </div>
              <div className="flex items-start space-x-2">
                <FaPlus className="text-primary-500 mt-1 flex-shrink-0" />
                <p>Provide a clear reason for the expense</p>
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

export default AddCashout;
