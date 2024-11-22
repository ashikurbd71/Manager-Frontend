import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";
import DashCustomNav from "../../../Share/Formnav";
import axoissecure from "./../../../Hooks/Axoisscure";

const AddCash = () => {
  const [transactionNumber, setTransactionNumber] = useState("TXN-XXXX-YYYYMMDD");

  const formik = useFormik({
    initialValues: {
      name: "",
      amount: "",
      date: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      amount: Yup.string().required("Amount is required"),
      date: Yup.string().required("Date is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await axoissecure.post("/cashin", {
          name: values.name,
          amount: values.amount,
          date: values.date,
          code : transactionNumber,
        });
        toast.success("Cash In  successfully!");
        resetForm();
      } catch (error) {
        toast.error("Error adding Department");
        console.error("Error adding Department:", error);
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
      <DashCustomNav name={"Add Cash"} listroute={"/dashboard/cashinlist"} />
      <div className="p-8">
        <Helmet>
          <title>Manager || Add Cash</title>
        </Helmet>
        <div>
          <form
            onSubmit={formik.handleSubmit}
            className="w-[500px] bg-white p-8 rounded-md"
          >
            <div className="grid grid-cols-1 gap-4">
              {/* Name Field */}
              <div className="flex flex-col">
                <label htmlFor="name" className="pb-1 text-[#726f6f]">
                  1. Name <span className="text-xl font-semibold text-red-500">*</span>
                </label>
                <input
                  placeholder="Enter Name"
                  id="name"
                  name="name"
                  className="py-2 text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="text-red-600">{formik.errors.name}</div>
                )}
              </div>

              {/* Amount Field */}
              <div className="flex flex-col">
                <label htmlFor="amount" className="pb-1 text-[#726f6f]">
                  2. Amount <span className="text-xl font-semibold text-red-500">*</span>
                </label>
                <input
                  placeholder="Enter Amount"
                  id="amount"
                  name="amount"
                  className="py-2 text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.amount}
                />
                {formik.touched.amount && formik.errors.amount && (
                  <div className="text-red-600">{formik.errors.amount}</div>
                )}
              </div>

              {/* Date Field */}
              <div className="flex flex-col">
                <label htmlFor="date" className="pb-1 text-[#726f6f]">
                  3. Date <span className="text-xl font-semibold text-red-500">*</span>
                </label>
                <input
                  id="date"
                  name="date"
                  className="py-2 text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
                  type="date"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.date}
                />
                {formik.touched.date && formik.errors.date && (
                  <div className="text-red-600">{formik.errors.date}</div>
                )}
              </div>

              {/* Transaction Number */}
              <div className="flex flex-col">
                <label className="pb-1 text-[#726f6f]">4. Transaction Number</label>
                <input
                  value={transactionNumber}
                  readOnly
                  
                  className="py-2 text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full bg-gray-100"
                />
              </div>
            </div>

            <div className="flex justify-end items-center gap-4">
              <button
                className="w-[100px] bg-[#0284C7] text-white mt-10 rounded-lg h-[40px] border-2 font-bold"
                type="submit"
              >
                Cash In
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

export default AddCash;
