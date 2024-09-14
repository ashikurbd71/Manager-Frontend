import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";
import axoissecure from "../../Hooks/Axoisscure";
import DashCustomNav from "../Formnav";
import useAuth from "../../Provider/UseAuth/useAuth";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";



const UpdatePubliPass = () => {
  const { user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
        password: "",
    },

    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      try {
        await axoissecure.patch(`/users/${user?.id}`, {
          password: values.password,
        });
        console.log("Password Update successfully:", values);
        toast.success("Password updated successfully!");
        resetForm();
      } catch (error) {
        toast.error("Error updating Blood Group");
        console.error("Error updating Blood Group:", error);
      }
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <DashCustomNav name={"Change Password"} listroute={"/public"} />

      <div className="p-8">
        <Helmet>
          <title>Manager || Change Password </title>
        </Helmet>

        <div>
          <form
            onSubmit={formik.handleSubmit}
            className="w-[500px] bg-white p-8 rounded-md"
          >
            <div className="grid grid-cols-1 gap-4">
              {/* Password Field */}
              <div className="flex flex-col">
                <label htmlFor="password" className="pb-1 text-[#726f6f]">
                  1. Password{" "}
                </label>
                <div className="relative">
                  <input
                    placeholder="Enter new password"
                    id="password"
                    name="password"
                    className="py-2 text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
                    type={showPassword ? "text" : "password"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  <div
                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end items-center gap-4">
              <button
                className="w-[200px] bg-[#0284C7] text-white mt-10 rounded-lg h-[40px] border-2 font-bold"
                type="submit"
              >
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdatePubliPass;
