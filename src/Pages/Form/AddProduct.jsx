import React from "react";
import DashCustomNav from "../../Share/DashCustomNav";
import { useFormik } from "formik";
import * as Yup from "yup";
import axoissecure from "../../Share/Hooks/Axoisscure";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Validation Schema
const Schema = Yup.object().shape({
  productsl: Yup.number()
    .typeError("Must be a number")
    .required("Product list is required"),
  productname: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Product name is required"),
  productnamedetails: Yup.string()
    .min(2, "Too Short!")
    .max(200, "Too Long!")
    .required("Product Details is required"),
  cost: Yup.number().typeError("Must be a number").required("Cost is required"),
  sellamount: Yup.number()
    .typeError("Must be a number")
    .required("Sell Amount is required"),
});

const AddProduct = () => {
  const formik = useFormik({
    initialValues: {
      productsl: "",
      productname: "",
      productnamedetails: "",
      cost: "",
      sellamount: "",
    },
    validationSchema: Schema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await axoissecure.post("/product", {
          productSl: values.productsl,
          productName: values.productname,
          productDetails: values.productnamedetails,
          cost: values.cost,
          sellAmount: values.sellamount,
          date: new Date(),
        });
        console.log("Product added successfully:", values);
        toast.success("Product added successfully!");
        resetForm();
      } catch (error) {
        toast.error("Error adding product");
        console.error("Error adding product:", error);
      }
    },
  });

  return (
    <div className="p-8">
      <DashCustomNav name={"Add Product"} />
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="w-[500px] bg-white p-8 rounded-md"
        >
          <div className="grid grid-cols-1 gap-4">
            {/* Product SL */}
            <div className="flex flex-col">
              <label htmlFor="productsl">
                1. Product SL{" "}
                <span className="text-xl font-semibold text-red-500">*</span>
              </label>
              <input
                id="productsl"
                name="productsl"
                className="py-2 border-2 border-neutral-800 px-3 w-full"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.productsl}
              />
              {formik.touched.productsl && formik.errors.productsl ? (
                <div className="text-red-600">{formik.errors.productsl}</div>
              ) : null}
            </div>

            {/* Product Name */}
            <div className="flex flex-col">
              <label htmlFor="productname">
                2. Product Name{" "}
                <span className="text-xl font-semibold text-red-500">*</span>
              </label>
              <input
                id="productname"
                name="productname"
                className="py-2 border-2 border-neutral-800 px-3 w-full"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.productname}
              />
              {formik.touched.productname && formik.errors.productname ? (
                <div className="text-red-600">{formik.errors.productname}</div>
              ) : null}
            </div>

            {/* Product Details */}
            <div className="flex flex-col">
              <label htmlFor="productnamedetails">
                3. Product Details{" "}
                <span className="text-xl font-semibold text-red-500">*</span>
              </label>
              <input
                id="productnamedetails"
                name="productnamedetails"
                className="py-2 border-2 border-neutral-800 px-3 w-full"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.productnamedetails}
              />
              {formik.touched.productnamedetails &&
              formik.errors.productnamedetails ? (
                <div className="text-red-600">
                  {formik.errors.productnamedetails}
                </div>
              ) : null}
            </div>

            {/* Cost */}
            <div className="flex flex-col">
              <label htmlFor="cost">
                4. Cost{" "}
                <span className="text-xl font-semibold text-red-500">*</span>
              </label>
              <input
                id="cost"
                name="cost"
                className="py-2 border-2 border-neutral-800 px-3 w-full"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.cost}
              />
              {formik.touched.cost && formik.errors.cost ? (
                <div className="text-red-600">{formik.errors.cost}</div>
              ) : null}
            </div>

            {/* Sell Amount */}
            <div className="flex flex-col">
              <label htmlFor="sellamount">
                5. Sell Amount{" "}
                <span className="text-xl font-semibold text-red-500">*</span>
              </label>
              <input
                id="sellamount"
                name="sellamount"
                className="py-2 border-2 border-neutral-800 px-3 w-full"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.sellamount}
              />
              {formik.touched.sellamount && formik.errors.sellamount ? (
                <div className="text-red-600">{formik.errors.sellamount}</div>
              ) : null}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              className="w-[100px] mt-10 rounded-lg h-[40px] border-2 border-[#0284C7]"
              type="submit"
            >
              Submit
            </button>
            <button
              className="w-[100px] mt-10 rounded-lg h-[40px] border-2 border-[#383a3b]"
              type="button"
              onClick={formik.handleReset}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
