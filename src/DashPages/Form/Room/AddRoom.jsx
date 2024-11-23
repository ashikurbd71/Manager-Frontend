import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";
import DashCustomNav from "../../../Share/Formnav";
import axoissecure from "../../../Hooks/Axoisscure";

// Validation Schema
const Schema = Yup.object().shape({
  room: Yup.string()
    .required("Room number is required"),
  floor: Yup.string()
    .required("Floor number is required"),
  seat: Yup.number()
    .typeError("Seat must be a number")
    .required("Seat count is required"),
  price: Yup.number()
    .typeError("Price must be a number")
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
    onSubmit: async (values, { resetForm }) => {
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
      }
    },
  });

  return (
    <>
      <DashCustomNav name={"Add Room"} listroute={"/dashboard/roomlist"} />
      <div className="p-8">
        <Helmet>
          <title>Manager || Add Room</title>
        </Helmet>
        <div>
          <form
            onSubmit={formik.handleSubmit}
            className="w-[500px] bg-white p-8 rounded-md"
          >
            <div className="grid grid-cols-1 gap-4">
              {/* Room Number */}
              <div className="flex flex-col">
                <label htmlFor="room" className="pb-1 text-[#726f6f]">
                  1. Room No.
                  <span className="text-xl font-semibold text-red-500">*</span>
                </label>
                <input
                  placeholder="Enter Room Number"
                  id="room"
                  name="room"
                  className="py-2 text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.room}
                />
                {formik.touched.room && formik.errors.room && (
                  <div className="text-red-600">{formik.errors.room}</div>
                )}
              </div>

              {/* Floor */}
              <div className="flex flex-col">
                <label htmlFor="floor" className="pb-1 text-[#726f6f]">
                  2. Floor
                  <span className="text-xl font-semibold text-red-500">*</span>
                </label>
                <input
                  placeholder="Enter Floor No."
                  id="floor"
                  name="floor"
                  className="py-2 text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.floor}
                />
                {formik.touched.floor && formik.errors.floor && (
                  <div className="text-red-600">{formik.errors.floor}</div>
                )}
              </div>

              {/* Seat */}
              <div className="flex flex-col">
                <label htmlFor="seat" className="pb-1 text-[#726f6f]">
                  3. Seat
                  <span className="text-xl font-semibold text-red-500">*</span>
                </label>
                <input
                  placeholder="Enter Total Seat"
                  id="seat"
                  name="seat"
                  className="py-2 text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.seat}
                />
                {formik.touched.seat && formik.errors.seat && (
                  <div className="text-red-600">{formik.errors.seat}</div>
                )}
              </div>

              {/* Price */}
              <div className="flex flex-col">
                <label htmlFor="price" className="pb-1 text-[#726f6f]">
                  4. Price
                  <span className="text-xl font-semibold text-red-500">*</span>
                </label>
                <input
                  placeholder="Enter Price"
                  id="price"
                  name="price"
                  className="py-2 text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.price}
                />
                {formik.touched.price && formik.errors.price && (
                  <div className="text-red-600">{formik.errors.price}</div>
                )}
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

export default AddRoom;
