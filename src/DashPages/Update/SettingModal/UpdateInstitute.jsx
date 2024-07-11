import React from 'react';
import Modal from '../../../Share/CustomModal/CustomModal';
import { useFormik } from 'formik';
import * as Yup from "yup";

// Validation Schema
const Schema = Yup.object().shape({
    institute:Yup.string()
    .label('Institute')
    .required(),
  
    shortname:Yup.string()
    .label('Short Name')
    .required(),
  });
  
const UpdateInstitute = ({isOpen,setIsOpen,id}) => {

    console.log(id)

    


    const formik = useFormik({
        initialValues: {
          institute: "",
          shortname : ""
          
        },
        validationSchema: Schema,
        onSubmit: async (values, { resetForm }) => {
          console.log(values)
          try {
            await axoissecure.post("/institute", {
              name: values.institute,
              shortName : values.shortname,
               status:"1",
            });
            console.log("Product added successfully:", values);
            toast.success("Institute Added  successfully!");
            resetForm();
          } catch (error) {
            toast.error("Error adding Institute");
            console.error("Error adding Institute:", error);
          }
        },
      });

    const handleCancel = () => {
        formik.handleReset()
        setIsOpen(false)
      };

    return (
     <>
     <Modal isOpen={isOpen} setIsOpen={setIsOpen}>

    
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="w-[400px] bg-white p-2  rounded-md"
        >
          <div className="grid  grid-cols-1 gap-3">

            {/* institute */}
            <div className="flex flex-col">
              <label htmlFor="name">
                1. Institute Name {" "}
                <span className="text-xl font-semibold text-red-500">*</span>
              </label>
              <input
              placeholder="Institute Name"
                id="institute"
                name="institute"
                className="py-2 border-2 rounded-md border-[#0284C7] px-3 w-full"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.institute}
              />
              {formik.touched.institute && formik.errors.institute ? (
                <div className="text-red-600">{formik.errors.institute}</div>
              ) : null}
            </div>

            {/* short name */}
            <div className="flex flex-col">
              <label htmlFor="name">
                2. Short Name {" "}
                <span className="text-xl font-semibold text-red-500">*</span>
              </label>
              <input
              placeholder="Short Name"
                id="shortname"
                name="shortname"
                className="py-2 border-2 rounded-md border-[#0284C7] px-3 w-full"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.shortname}
              />
              {formik.touched.shortname && formik.errors.shortname ? (
                <div className="text-red-600">{formik.errors.shortname}</div>
              ) : null}
            </div>
                  

          </div>


          <div className="flex justify-end items-center gap-4">
            <button
              className="w-[100px] bg-[#0284C7] text-white mt-10 rounded-lg h-[40px] border-2 font-bold"
              type="submit"
            >
              Update
            </button>
            <button
              className="w-[100px] bg-gray-200 font-bold mt-10 rounded-lg h-[40px] border-2 text-red-400"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
     </Modal>
     
     </>
    );
};

export default UpdateInstitute;