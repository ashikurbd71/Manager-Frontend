import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaPlus,
  FaArrowLeft,
  FaSave,
  FaTimes,
  FaBuilding,
  FaUsers,
  FaMoneyBillWave
} from 'react-icons/fa';
import { ModernForm, FormField, ModernCard } from "../../../Share/ModernComponents";
import axoissecure from "../../../Hooks/Axoisscure";

// Validation Schema
const Schema = Yup.object().shape({
  room: Yup.string()
    .required("Room number is required"),
  floor: Yup.string()
    .required("Floor number is required"),
  seat: Yup.number()
    .typeError("Seat must be a number")
    .min(1, "Seat count must be at least 1")
    .max(10, "Seat count cannot exceed 10")
    .required("Seat count is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .min(0, "Price cannot be negative")
    .required("Price is required"),
});

const AddRoom = () => {
  const formik = useFormik({
    initialValues: {
      room: "",
      floor: "",
      seat: "",
      price: "",
    },
    validationSchema: Schema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        await axoissecure.post("/rooms", {
          roomNumber: values.room,
          floor: values.floor,
          seat: values.seat,
          price: values.price,
        });
        toast.success("Room added successfully!");
        resetForm();
      } catch (error) {
        toast.error("Error adding room");
        console.error("Error adding room:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      <Helmet>
        <title>Manager || Add Room</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                  <FaHome className="text-white text-lg" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-secondary-900">Add New Room</h1>
                  <p className="text-secondary-600">Create a new room for the hostel</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Link to="/dashboard/roomlist">
                  <button className="btn btn-outline">
                    <FaArrowLeft className="mr-2" />
                    Back to Rooms
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <ModernCard>
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                      <FaPlus className="text-2xl text-primary-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-secondary-900">Room Information</h2>
                      <p className="text-secondary-600">Fill in the room details below</p>
                    </div>
                  </div>

                  <form onSubmit={formik.handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Room Number */}
                      <FormField
                        label="Room Number"
                        name="room"
                        type="text"
                        placeholder="Enter room number (e.g., 101)"
                        icon={FaBuilding}
                        formik={formik}
                        required
                      />

                      {/* Floor */}
                      <FormField
                        label="Floor"
                        name="floor"
                        type="text"
                        placeholder="Enter floor number (e.g., 1st Floor)"
                        icon={FaBuilding}
                        formik={formik}
                        required
                      />

                      {/* Seat Count */}
                      <FormField
                        label="Total Seats"
                        name="seat"
                        type="number"
                        placeholder="Enter number of seats (1-10)"
                        icon={FaUsers}
                        formik={formik}
                        required
                        min="1"
                        max="10"
                      />

                      {/* Price */}
                      <FormField
                        label="Price per Seat"
                        name="price"
                        type="number"
                        placeholder="Enter price per seat"
                        icon={FaMoneyBillWave}
                        formik={formik}
                        required
                        min="0"
                        step="0.01"
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-secondary-100">
                      <button
                        type="submit"
                        disabled={formik.isSubmitting}
                        className="btn btn-primary flex-1 sm:flex-none"
                      >
                        {formik.isSubmitting ? (
                          <>
                            <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                            Saving...
                          </>
                        ) : (
                          <>
                            <FaSave className="mr-2" />
                            Save Room
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={formik.handleReset}
                        className="btn btn-outline flex-1 sm:flex-none"
                      >
                        <FaTimes className="mr-2" />
                        Reset Form
                      </button>
                    </div>
                  </form>
                </div>
              </ModernCard>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <ModernCard>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-secondary-900 mb-4">Room Guidelines</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-secondary-600">
                        Room numbers should be unique and follow a consistent pattern
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-success-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-secondary-600">
                        Each room can have 1-10 seats maximum
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-warning-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-secondary-600">
                        Price should be set per seat, not per room
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-info-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-secondary-600">
                        Floor information helps with room organization
                      </p>
                    </div>
                  </div>
                </div>
              </ModernCard>

              {/* Form Status */}
              <ModernCard>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-secondary-900 mb-4">Form Status</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-secondary-600">Room Number</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${formik.touched.room && !formik.errors.room
                        ? 'bg-success-100 text-success-700'
                        : formik.touched.room && formik.errors.room
                          ? 'bg-error-100 text-error-700'
                          : 'bg-secondary-100 text-secondary-600'
                        }`}>
                        {formik.touched.room && !formik.errors.room ? 'Valid' :
                          formik.touched.room && formik.errors.room ? 'Invalid' : 'Pending'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-secondary-600">Floor</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${formik.touched.floor && !formik.errors.floor
                        ? 'bg-success-100 text-success-700'
                        : formik.touched.floor && formik.errors.floor
                          ? 'bg-error-100 text-error-700'
                          : 'bg-secondary-100 text-secondary-600'
                        }`}>
                        {formik.touched.floor && !formik.errors.floor ? 'Valid' :
                          formik.touched.floor && formik.errors.floor ? 'Invalid' : 'Pending'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-secondary-600">Seats</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${formik.touched.seat && !formik.errors.seat
                        ? 'bg-success-100 text-success-700'
                        : formik.touched.seat && formik.errors.seat
                          ? 'bg-error-100 text-error-700'
                          : 'bg-secondary-100 text-secondary-600'
                        }`}>
                        {formik.touched.seat && !formik.errors.seat ? 'Valid' :
                          formik.touched.seat && formik.errors.seat ? 'Invalid' : 'Pending'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-secondary-600">Price</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${formik.touched.price && !formik.errors.price
                        ? 'bg-success-100 text-success-700'
                        : formik.touched.price && formik.errors.price
                          ? 'bg-error-100 text-error-700'
                          : 'bg-secondary-100 text-secondary-600'
                        }`}>
                        {formik.touched.price && !formik.errors.price ? 'Valid' :
                          formik.touched.price && formik.errors.price ? 'Invalid' : 'Pending'}
                      </span>
                    </div>
                  </div>
                </div>
              </ModernCard>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddRoom;
