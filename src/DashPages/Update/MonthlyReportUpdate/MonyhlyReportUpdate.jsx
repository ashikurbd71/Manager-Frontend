import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import  Select from 'react-select';

import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import DashCustomNav from '../../../Share/Formnav';

const MonyhlyReportUpdate = () => {


    const {id} =useParams()


    const { data: items = [], refetch } = useQuery({
        queryKey: ["monthly"],
        queryFn: async () => {
          try {
            const res = await axoissecure.get(`/notice/${id}`);
            return res.data;
          } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
          }
        },
      });
    
      console.log(items)

    const formik = useFormik({
        initialValues: {
          totaltk: "",
          totalmeal : "",
          totalextra : "",
          bazarkari : ""
          
        },
    
        onSubmit: async (values, { resetForm }) => {
          console.log(values)
          try {
            await axoissecure.patch(`/institute/${id}`, {
              name: values.institute,
              totalmeal : values.totalmeal,
               status:"1",
            });
            console.log("Product added successfully:", values);
            toast.success("Report Update  successfully!");
            resetForm();
          } catch (error) {
            toast.error("Report updating error");
            console.error("Error adding Institute:", error);
          }
        },
      });

      
      useEffect(() => {
        if (items) {
            formik.setValues({
                totaltk: items.totaltk || "",
                date: items.date?.split('T')[0] || "",
                totalmeal: items.totalmeal || "",
                totalextra: items.totalextra || "",
                bazarkari: items.bazarkari?.id || "",
    
            });
    
          
        }
    }, [items]);
    
    
      const customStylesS = {
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
    
      const[institute,setInstitute] = useState(null)
      useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await getMember();
            console.log(data, "all items here");
            setInstitute(data?.member);
          } catch (error) {
            console.error("Error fetching member types:", error);
          }
        };
    
        fetchData();
      }, []);
    
      const InstituteOptions =
        (institute &&
          institute?.map((singleData) => ({
            value: singleData?.id,
            label: singleData?.name,
          }))) ||
        [];
    
    console.log(InstituteOptions)
    
    return (
       <>
       
       <DashCustomNav name={"Update  Report"} listroute={'/dashboard/myreport'} />
       
       <div className="flex justify-items-center pt-5 px-5 pb-10">
    
        <form
          onSubmit={formik.handleSubmit}
          className="lg:w-[600px] w-full bg-white p-8  rounded-md"
        >
          <div className="grid  grid-cols-1 gap-4">

            {/* institute */}

            <div className="flex flex-col">
              <label htmlFor="bazarkari" className="pb-1 text-[#726f6f]">
                1. Bazarkari {" "}
                <span className="text-xl font-semibold text-red-500">*</span>
              </label>
              <Select
              placeholder="Select Name"
                id="bazarkari"
                name="bazarkari"
                isMulti
                styles={customStylesS}
                options={InstituteOptions}
                onChange={(option) => formik.setFieldValue("bazarkari", option.value)}
                onBlur={formik.handleBlur}
                value={InstituteOptions.find(option => option.value === formik.values.bazarkari)}
              />
              {formik.touched.bazarkari && formik.errors.bazarkari ? (
                <div className="text-red-600">{formik.errors.bazarkari}</div>
              ) : null}
            </div>



            <div className="flex flex-col">
              <label htmlFor="name" className="pb-1 text-[#726f6f]">
                2. Total Tk {" "}
                <span className="text-xl font-semibold text-red-500">*</span>
              </label>
              <input
              placeholder="00"
                id="totaltk"
                name="totaltk"
                readOnly
                   className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.totaltk}
              />
              {formik.touched.totaltk && formik.errors.totaltk ? (
                <div className="text-red-600">{formik.errors.totaltk}</div>
              ) : null}
            </div>

            {/* short name */}
            <div className="flex flex-col">
              <label htmlFor="name" className="pb-1 text-[#726f6f]">
                3. Total Meal {" "}
                <span className="text-xl font-semibold text-red-500">*</span>
              </label>
              <input
              placeholder="00"
                id="totalmeal"
                name="totalmeal"
                readOnly
                   className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.totalmeal}
              />
              {formik.touched.totalmeal && formik.errors.totalmeal ? (
                <div className="text-red-600">{formik.errors.totalmeal}</div>
              ) : null}
            </div>


            <div className="flex flex-col">
              <label htmlFor="name" className="pb-1 text-[#726f6f]">
                4. Extra Tk {" "}
              
              </label>
              <input
              placeholder="00"
                id="extratk"
                name="extratk"
                
                className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.extratk}
              />
             
            </div>

            <div className="flex flex-col">
              <label htmlFor="addExtra" className="pb-1 text-[#726f6f]">
                5. Comments  {" "}
             
              </label>
              <textarea
              placeholder="Why Extra ?"
                id="addExtra"
                rows={5}
                name="addExtra"
                          className="py-2  text-[#726f6f] border-2 rounded-md border-gray-400 px-3 w-full"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.addExtra}
              />
             
            </div>

             {/* Cost */}
          

          </div>


          <div className="flex justify-end items-center gap-4">
            <button
              className="w-full bg-[#0284C7] text-white mt-10 rounded-lg h-[40px] border-2 font-bold"
              type="submit"
            >
               Send Report
            </button>
           

          </div>


        </form>
      </div>
       
       </>
    );
};

export default MonyhlyReportUpdate;