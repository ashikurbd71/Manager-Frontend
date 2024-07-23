import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import { FaEdit, FaTrashAlt, FaEye, FaBan } from 'react-icons/fa';
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import axoissecure from "../../../Hooks/Axoisscure";
import Tablenav from "../../../Share/Tablenav";
import Swal from "sweetalert2";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import Pagination from "../../../Share/PaginationTable/Pagination";
import MealManagenav from "../../../Share/MealManagenav/MealManagenav";
import { useFormik } from "formik";
import { getInstitute } from "../../../Share/Api/SelectorApi/settingselector";
import Select from 'react-select'
import MealUpdate from "../../Update/MealManager/MealUpdate";






const MealManage = () => {

  const [search, setSearch] = useState("");
  const [rowPerPage, setRowPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [stat, setStat] = useState();
  const [active, setActive] = useState(0);


  useEffect(() => {
    if (active === 1) {
      setPage(1);
    } else {
      setPage(1);
    }
  }, [active, search]);
  
  const { data: items = [], refetch } = useQuery({
    queryKey: [
      "semister",
      search,
      rowPerPage,
      page,
      setPage,
      rowPerPage,
      setRowPerPage,
    ],
    queryFn: async () => {
      try {
        let limit = rowPerPage === "All" ? 100000000 : rowPerPage;

        if (active) {
          const res = await axoissecure.get(
            `/mealmanage/search?query=${search}&limit=${limit}&page=${page}`
          );
          setStat(res.data?.meta);

          return res?.data?.items;
        } else {
          const res = await axoissecure.get(
            `/mealmanage/search?limit=${limit}&page=${page}`
          );
          setStat(res.data?.meta);

          return res?.data?.items;
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    },
  });

   console.log(items)
  const columns = React.useMemo(() => [
    {
      Header: "Sl.",
      accessor: 'sl'
    },
    {
      Header: "Name",
      accessor: 'name'
    },
    // {
    //   Header: "Number",
    //   accessor: 'number'
    // },
    {
        Header: "Total Tk",
        accessor: 'totaltk'
      },
    {
      Header: "Total Meal",
      accessor: 'totalmeal'
    },
    {
      Header: "Cost Tk",
      accessor: 'costtk'
    },

    {
        Header: "Cost Meal",
        accessor: 'costmeal'
      },

      {
        Header: "Extra",
        accessor: 'extra'
      },

      {
        Header: "Member(blance)",
        accessor: 'memberblance'
      },

      {
        Header: "Member(loan)",
        accessor: 'memberlon'
      },
   
   
   

    {
      Header: "Action",
      accessor: 'action',
      Cell: ({ row }) => (
        <>
         <div className="flex w-full mx-auto  items-center gap-2 ">
           {/* Edit Icon */}
           {/*  */}
         
    
         <FaEdit title="Meal Edit"  onClick={() => openModal(row.original)} className=" hover:text-green-500 cursor-pointer" />
       
          
          {/* Delete Icon */}
          <FaTrashAlt title="Delete" onClick={() => handleDelete(row.original.id)} className="  hover:text-red-500 cursor-pointer"  />
          
          {/* View Icon */}
          <Link to={`/dashboard/detailsmeal/${row.original.id}`}>
          <FaEye title="View Deatails"  className=" hover:text-yellow-500 cursor-pointer"  />
          </Link>
       
          
          {/* Disable Icon */}
          {
            row?.original?.status === 1 ?  
            <FaBan title="Meal Of" onClick={() => handleDisable(row.original.id)} className=" hover:text-red-600 cursor-pointer" />    :  
            <IoCheckmarkDoneCircleOutline title="Meal On" onClick={() => handleEnable(row.original.id)} className=" hover:text-green-600 text-lg cursor-pointer" />
          }
         </div>
        </>
      )
    },
  ], []);

  const [isOpen, setIsOpen] = useState(null)
  const[update,setUpdate] = useState()


  const openModal = (id) => {
    setIsOpen(true)
    setUpdate(id)
  }


  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to be delete this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        axoissecure.delete(`/mealmanage/${_id}`).then((res) => {
          if (res.status === 200) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });

          refetch();
          }
        });
      }
    });
  };

  const handleDisable = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to be disable this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Disable it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        axoissecure.patch(`/mealmanage/disable/${_id}`).then((res) => {
          if (res.status === 200) {
            Swal.fire({
              title: "Disabled!",
              text: "Your file has been disabled.",
              icon: "success",
            });

          refetch();
          }
        });
      }
    });
  }

  const handleEnable = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to be enable this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Enable it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        axoissecure.patch(`/mealmanage/enable/${_id}`).then((res) => {
          if (res.status === 200) {
            Swal.fire({
              title: "Enabled!",
              text: "Your file has been Enabled.",
              icon: "success",
            });

          refetch();
          }
        });
      }
    });
  }


  const data = React.useMemo(() => 
    items.map((item, index) => ({
      ...item,
      sl: index + 1,
      name : item?.member?.name,
      totaltk : item?.addMoney,
      totalmeal: item?.totalMeal,
      memberblance : item?.b,
      memberbloan : item?.b,
    //   startDate: item?.startDate?.split('T')[0],
    //   endDate: item?.endDate?.split('T')[0],


    })), [items]
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data });

    
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
        await axoissecure.post("/institute", {
          name: values.institute,
          totalmeal : values.totalmeal,
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
        const data = await getInstitute();
        console.log(data, "all items here");
        setInstitute(data);
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

<MealUpdate isOpen={isOpen} setIsOpen={setIsOpen} update={update} refetch={refetch} />

    <useHelmet name={'mealmanage || Member list'} />

    <Helmet><title>mealmanage || Meal Manage</title></Helmet>

    
    <h1 className="text-2xl font-medium text-gray-600 p-5">Meal Manage</h1>

    <MealManagenav setActive={setActive} setSearch={setSearch} route={'/dashboard/addmeal'}/>

 
    <div className="px-6 pb-10 bg-gray-100 rounded-lg">
      <table {...getTableProps()} className="min-w-full overflow-x-auto bg-white border mb-5 border-gray-200">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} className="bg-gray-200">
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} className="p-2 border-2 border-gray-300 text-center text-gray-700">{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="hover:bg-gray-100">
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()} className="p-2 text-gray-600 font font-medium border-2 text-center border-gray-300">{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>


      <h1 className="text-xl  font-semibold text-[#0284C7] py-4">Today Report</h1>

<div className="flex justify-items-center pb-10">
    
        <form
          onSubmit={formik.handleSubmit}
          className="w-[500px] bg-white p-8  rounded-md"
        >
          <div className="grid  grid-cols-1 gap-4">

            {/* institute */}
            <div className="flex flex-col">
              <label htmlFor="name" className="pb-1 text-[#726f6f]">
                1. Total Tk {" "}
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
                2. Total Meal {" "}
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
                3. Extra Tk {" "}
                <span className="text-xl font-semibold text-red-500">*</span>
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
              {formik.touched.extratk && formik.errors.extratk ? (
                <div className="text-red-600">{formik.errors.extratk}</div>
              ) : null}
            </div>



             {/* Cost */}
             <div className="flex flex-col">
              <label htmlFor="bazarkari" className="pb-1 text-[#726f6f]">
                4. Bazarkari {" "}
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

          </div>


          <div className="flex justify-end items-center gap-4">
            <button
              className="w-full bg-[#0284C7] text-white mt-10 rounded-lg h-[40px] border-2 font-bold"
              type="submit"
            >
               Save Report
            </button>
           

          </div>


        </form>
      </div>

      
      
      <Pagination
            stat={stat}
            setRowPerPage={setRowPerPage}
            setPage={setPage}
            page={page}
          />
    </div>

    </>
  );
};

export default MealManage;
