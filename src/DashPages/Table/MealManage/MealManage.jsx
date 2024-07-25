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
import { getInstitute, getMember } from "../../../Share/Api/SelectorApi/settingselector";
import Select from 'react-select'
import MealUpdate from "../../Update/MealManager/MealUpdate";
import moment from "moment-timezone";
import { FaMoneyBillTransfer } from "react-icons/fa6";






const MealManage = () => {

  const [search, setSearch] = useState("");
  const [rowPerPage, setRowPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [stat, setStat] = useState();
  const [active, setActive] = useState(0);
  const[meal,setMeal] = useState(6)

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
          setStat(res?.data?.meta);
          setMeal(res?.data?.meta?.totalItems )
          return res?.data?.items
        } else {
          const res = await axoissecure.get(
            `/mealmanage/search?limit=${limit}&page=${page}`
          );
          setStat(res.data?.meta);
           setMeal(res?.data?.meta?.totalItems )
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
      Header: "Member(blance)",
      accessor: 'memberblance'
    },

    {
      Header: "Eeat Meal",
      accessor: 'meal'
    },

      {
        Header: "Extra",
        accessor: 'extra'
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
          <Link  to={`/dashboard/detailsmeal/${row.original.id}`}>
          <FaEye title="View Deatails"  className=" hover:text-yellow-500 cursor-pointer"  />
          </Link>
       
          
          {/* Disable Icon */}
          {
            row?.original?.status === 1 ?  
            <FaBan title="Meal Of" onClick={() => handleDisable(row.original.id)} className=" hover:text-red-600 cursor-pointer" />    :  
            <IoCheckmarkDoneCircleOutline title="Meal On" onClick={() => handleEnable(row.original.id)} className=" hover:text-green-600 text-lg cursor-pointer" />
          }

      <FaMoneyBillTransfer title="Delete" onClick={() => takeIt(row.original.id)} className="  hover:text-green-500 cursor-pointer"  />
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


   const[cost,setCost] = useState()
  const takeIt = async (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to Take Money!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, take it 35$!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Fetch the current item data
          const { data: item } = await axoissecure.get(`/mealmanage/${_id}`);
          const newCostTk = item.addMoney - 35;
          setCost(cost)
     
  
          // Update the item with the new costTk value
          await axoissecure.patch(`/mealmanage/disable/${_id}`, { costtk: newCostTk });
  
          Swal.fire({
            title: "Take Money Done!",
            text: ` Money Cate Form ${item?.name?.name} Awalte`,
            icon: "success",
          });
  
          refetch();
        } catch (error) {
          console.error("Error disabling item:", error);
          Swal.fire({
            title: "Error!",
            text: "There was an error disabling the item.",
            icon: "error",
          });
        }
      }
    });
  };
  

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

  const { data: extra = [],  } = useQuery({
    queryKey: ["extra"],
    queryFn: async () => {
      try {
        const res = await axoissecure.get(`/mealextra/search`);
        return res.data.meta?.totalExtraMoney;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    },
  });

  console.log(extra)

 

  console.log(meal)


  console.log(cost)

  const data = React.useMemo(() => 
    items.map((item, index) => ({
      ...item,
      sl: index + 1,
      name : item?.member?.name,
      totaltk : item?.addMoney,
      totalmeal: item?.totalMeal,
      // costtk : costTk,
      memberblance :cost,
      memberbloan : item?.b,
      extra :  (extra / meal).toFixed(2) || 'loading...',
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

    
  

  return (

    <>

<MealUpdate isOpen={isOpen} setIsOpen={setIsOpen} update={update} refetch={refetch} />

    <useHelmet name={'mealmanage || Member list'} />

    <Helmet><title>mealmanage || Meal Manage</title></Helmet>

    
    <h1 className="text-2xl font-medium text-gray-600 p-5">Meal Manage</h1>

    <MealManagenav setActive={setActive} setSearch={setSearch} secondroute={'/dashboard/extralist'} route={'/dashboard/addmeal'}/>

 
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
