import React, { useState, useRef, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import {
  FaUtensils,
  FaUser,
  FaMoneyBillWave,
  FaArrowLeft,
  FaCalculator,
  FaCalendarAlt,
  FaPlus,
  FaReceipt
} from 'react-icons/fa';
import { ModernForm, FormField, ModernCard } from "../../../Share/ModernComponents";
import axoissecure from "../../../Hooks/Axoisscure";
import { getMember } from "../../../Share/Api/SelectorApi/settingselector";
import { useQuery } from "@tanstack/react-query";
import Select from 'react-select';

const AddMeal = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [mealRate, setMealRate] = useState(35);

  const today = new Date().toISOString().split('T')[0];

  const { data: members = [] } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      try {
        const res = await getMember();
        return res || [];
      } catch (error) {
        console.error("Error fetching members:", error);
        return [];
      }
    },
  });

  const { data: information } = useQuery({
    queryKey: ["information"],
    queryFn: async () => {
      try {
        const res = await axoissecure.get(`/information`);
        return res.data[0];
      } catch (error) {
        console.error("Error fetching information:", error);
        return null;
      }
    },
  });

  useEffect(() => {
    if (information?.mealRate) {
      setMealRate(information.mealRate);
    }
  }, [information]);

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Member is required"),
    taka: Yup.number()
      .required("Amount is required")
      .positive("Amount must be positive")
      .min(1, "Amount must be at least 1"),
    loan: Yup.number()
      .min(0, "Loan cannot be negative")
      .max(Yup.ref('taka'), "Loan cannot exceed total amount"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      taka: "",
      loan: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      setIsSubmitting(true);
      try {
        const totalAmount = parseInt(values.taka) || 0;
        const loanAmount = parseInt(values.loan) || 0;
        const addMoney = totalAmount - loanAmount;
        const totalMeal = Math.floor(addMoney / mealRate);

        await axoissecure.post("/mealmanage", {
          addMoney: addMoney,
          totalMeal: totalMeal,
          balance: addMoney,
          loan: loanAmount,
          date: today,
          member: {
            id: parseInt(values.name),
          },
        });

        toast.success("Meal added successfully!");
        resetForm();
        setSelectedMember(null);
      } catch (error) {
        toast.error("Error adding meal");
        console.error("Error adding meal:", error);
      } finally {
        setIsSubmitting(false);
        setSubmitting(false);
      }
    },
  });

  const memberOptions = members.map(member => ({
    value: member.id.toString(),
    label: `${member.name} (${member.email})`
  }));

  const totalAmount = parseInt(formik.values.taka) || 0;
  const loanAmount = parseInt(formik.values.loan) || 0;
  const addMoney = totalAmount - loanAmount;
  const totalMeal = Math.floor(addMoney / mealRate);

  return (
    <>
      <Helmet>
        <title>Manager || Add Meal</title>
      </Helmet>

      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
              <FaUtensils className="text-white text-lg" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-secondary-900">Add Meal</h1>
              <p className="text-secondary-600">Record meal payments and calculations</p>
            </div>
          </div>
          <Link to="/dashboard/mealmanagelist">
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
            title="Meal Details"
            subtitle="Enter the meal payment details below"
            submitText="Add Meal"
            cancelText="Reset"
            onCancel={() => {
              formik.resetForm();
              setSelectedMember(null);
            }}
            loading={isSubmitting}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Member <span className="text-error-500">*</span>
                </label>
                <Select
                  value={selectedMember}
                  onChange={(option) => {
                    setSelectedMember(option);
                    formik.setFieldValue('name', option?.value || '');
                  }}
                  options={memberOptions}
                  placeholder="Select a member"
                  className="react-select-container"
                  classNamePrefix="react-select"
                  isClearable
                  isSearchable
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="text-error-600 text-sm mt-1">{formik.errors.name}</div>
                )}
              </div>

              <FormField
                label="Total Amount"
                name="taka"
                type="number"
                placeholder="Enter total amount"
                icon={FaMoneyBillWave}
                formik={formik}
                required
                min="1"
                step="0.01"
              />

              <FormField
                label="Loan Amount"
                name="loan"
                type="number"
                placeholder="Enter loan amount (optional)"
                icon={FaMoneyBillWave}
                formik={formik}
                min="0"
                step="0.01"
              />

              <FormField
                label="Date"
                name="date"
                type="text"
                value={today}
                icon={FaCalendarAlt}
                formik={formik}
                disabled
              />
            </div>
          </ModernForm>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Calculation Summary */}
          <ModernCard title="Calculation Summary" className="h-fit">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-primary-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FaMoneyBillWave className="text-primary-600 text-xl" />
                  <div>
                    <p className="text-sm text-primary-600 font-medium">Total Amount</p>
                    <p className="text-lg font-bold text-primary-900">৳{totalAmount.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-warning-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FaMoneyBillWave className="text-warning-600 text-xl" />
                  <div>
                    <p className="text-sm text-warning-600 font-medium">Loan Amount</p>
                    <p className="text-lg font-bold text-warning-900">৳{loanAmount.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-success-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FaCalculator className="text-success-600 text-xl" />
                  <div>
                    <p className="text-sm text-success-600 font-medium">Net Amount</p>
                    <p className="text-lg font-bold text-success-900">৳{addMoney.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-info-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FaUtensils className="text-info-600 text-xl" />
                  <div>
                    <p className="text-sm text-info-600 font-medium">Total Meals</p>
                    <p className="text-lg font-bold text-info-900">{totalMeal}</p>
                  </div>
                </div>
              </div>
            </div>
          </ModernCard>

          {/* Meal Rate Info */}
          <ModernCard title="Meal Rate Information" className="h-fit">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-secondary-50 rounded-lg">
                <FaReceipt className="text-secondary-600 text-xl" />
                <div>
                  <p className="text-sm text-secondary-600 font-medium">Current Meal Rate</p>
                  <p className="text-lg font-bold text-secondary-900">৳{mealRate} per meal</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-secondary-600">Calculation:</p>
                <p className="text-sm text-secondary-700">
                  Net Amount ÷ Meal Rate = Total Meals
                </p>
                <p className="text-sm text-secondary-700 font-mono">
                  ৳{addMoney} ÷ ৳{mealRate} = {totalMeal} meals
                </p>
              </div>
            </div>
          </ModernCard>

          {/* Guidelines */}
          <ModernCard title="Guidelines" className="h-fit">
            <div className="space-y-3 text-sm text-secondary-600">
              <div className="flex items-start space-x-2">
                <FaPlus className="text-primary-500 mt-1 flex-shrink-0" />
                <p>Select the correct member from the list</p>
              </div>
              <div className="flex items-start space-x-2">
                <FaPlus className="text-primary-500 mt-1 flex-shrink-0" />
                <p>Enter the total amount paid by the member</p>
              </div>
              <div className="flex items-start space-x-2">
                <FaPlus className="text-primary-500 mt-1 flex-shrink-0" />
                <p>Loan amount is optional and will be deducted</p>
              </div>
              <div className="flex items-start space-x-2">
                <FaPlus className="text-primary-500 mt-1 flex-shrink-0" />
                <p>Meals are calculated automatically</p>
              </div>
            </div>
          </ModernCard>
        </div>
      </div>
    </>
  );
};

export default AddMeal;
