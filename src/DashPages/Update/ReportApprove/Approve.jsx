import React, { useEffect } from 'react';
import Modal from '../../../Share/CustomModal/CustomModal';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useQuery } from '@tanstack/react-query';
import axoissecure from '../../../Hooks/Axoisscure';
import { toast } from 'react-toastify';
import Select  from 'react-select';

  
const Approve = ({isOpen,setIsOpen,update,refetch}) => {

    console.log(update?.name)

    
   


    const formik = useFormik({
        initialValues: {
          reportStatus: "",
          feedback : ""
          
        },
   
        onSubmit: async (values, { resetForm }) => {
          console.log(values)
          try {
            await axoissecure.patch(`/report/${update?.id}`, {
                reportStatus: values.reportStatus,
              feedBack : values.feedback,
             
            });
            console.log("Report Approve successfully:", values);
            toast.success("Report Approve  successfully!");
            refetch();
            setIsOpen(false)

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

       // Update form values when `update` prop changes
    useEffect(() => {
      if (update) {
          formik.setValues({
            reportStatus: update.reportStatus || "",
              feedback: update.feedBack || ""
          });
      }
  }, [update]);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: "1px solid #979292",
      borderRadius: "0.30rem",
      padding: "0.2rem",
      width: "100%",
      boxShadow: state.isFocused ? "0 0 0 1px #0284C7" : "none",
      "&:hover": {
        borderColor: "#0284C7",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#0284C7" : "#fff",
      color: state.isSelected ? "#fff" : "#726f6f",
      "&:hover": {
        backgroundColor: "#0284C7",
        color: "#fff",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#726f6f",
    }),
    menu: (provided) => ({
      ...provided,
      border: "1px solid #0284C7",
      borderRadius: "0.30rem",
    }),
  };

  const Options =[
    {value : "Pending" , label : "Pending"},
    {value : "Approved" , label : "Approved"}
  ]

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
          
            <div className="flex mt-2 flex-col">
              <label htmlFor="reportStatus"  className="pb-1 text-[#726f6f]">
                5. Status{" "}
               
              </label>
              <Select
              placeholder="Select Status"
                id="reportStatus"
                name="reportStatus"
                className="text-[#726f6f]"
                styles={customStyles}
                options={Options}
                onChange={(option) => formik.setFieldValue("reportStatus", option.value)}
                onBlur={formik.handleBlur}
                value={Options.find(option => option.value === formik.values.reportStatus)}
              />
            
            </div>

            {/* short name */}
            <div className="flex flex-col">
              <label htmlFor="feedback" className="pb-1 text-[#726f6f]">
                2. Feedback {" "}
               
              </label>
              <textarea
              rows={5}
              placeholder="feedback"
                id="feedback"
                name="feedback"
                           className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.feedback}
              />
            
            </div>
                  

          </div>


          <div className="flex justify-end items-center gap-4">
            <button
              className="w-[200px] bg-[#0284C7] text-white mt-10 rounded-lg h-[40px] border-2 font-bold"
              type="submit"
            >
              Approve & Feedback
            </button>
            <button
              className="w-[100px] bg-red-600 font-semibold mt-10 rounded-lg h-[40px] border-2 text-white"
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

export default Approve;