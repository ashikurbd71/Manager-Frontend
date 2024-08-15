import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import { FaEdit, FaTrashAlt, FaEye, FaBan, FaPaperPlane } from 'react-icons/fa';
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";


import { toast } from "react-toastify";

import Swal from "sweetalert2";

import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import axoissecure from "../../../../Hooks/Axoisscure";
import UpdateInstitute from "../../../Update/SettingModal/UpdateInstitute";
import Tablenav from "../../../../Share/Tablenav";
import Pagination from "../../../../Share/PaginationTable/Pagination";
import MonthlyReportnav from "../../../../Share/MonthlyReportnav/MonthlyReportnav";
import Approve from "../../../Update/ReportApprove/Approve";




const MonthlyReport = () => {
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
      "report",
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
            `/report/search?query=${search}&limit=${limit}&page=${page}`
          );
          setStat(res.data?.meta);

          return res?.data?.items;
        } else {
          const res = await axoissecure.get(
            `/report/search?limit=${limit}&page=${page}`
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
        Header: "Date",
        accessor: 'date'
      },
    {
      Header: "Cost Tk",
      accessor: 'totaltk'
    },
    {
      Header: "Meal",
      accessor: 'meal'
    },
    {
        Header: "Extra",
        accessor: 'extratk'
      },

      {
        Header: "Status",
        accessor: 'reportStatus'
      },
   
 

    {
      Header: "Action",
      accessor: 'action',
      Cell: ({ row }) => (
    console.log(row?.original),
        <>
         <div className="flex w-full mx-auto  items-center gap-2 ">
           {/* Edit Icon */}
         
        
        {/* <Link to={`/dashboard/monthlyreportupdate/${row.original.id}`}>
        <FaEdit title="Edit"  className=" cursor-pointer text-green-500 " />  
        
        </Link> */}

             {/* View Icon */}
          <Link to={`/public/reportdtails/${row.original.id}`}>
          <FaEye title="View Deatails"  className=" text-yellow-600 cursor-pointer"  />
          </Link>
          
          {/* Delete Icon */}
          {/* <FaTrashAlt title="Delete" onClick={() => handleDelete(row.original.id)} className="  text-red-500 cursor-pointer"  /> */}
          
          {
            row.original.reportStatus === "Approve" ? "" : <FaPaperPlane onClick={() => HandleApprove(row.original)} title="Approve"  className=" text-blue-600 cursor-pointer"  />
          }
       
        
          
         </div>
        </>
      )
    },
  ], []);

  const [isOpen, setIsOpen] = useState(null)
  const[update,setUpdate] = useState()


  const HandleApprove = (id) => {
    setIsOpen(true)
    setUpdate(id)
  }



  
 



  const data = React.useMemo(() => 
    items?.map((item, index) => ({
      ...item,
      sl: rowPerPage === "All" ? index + 1 : index + 1 + (page - 1) * rowPerPage,
      totaltk: item?.totalTk,
      meal: item?.totalMeal,
      extratk: item?.extraTk,
      reportStatus: item?.reportStatus,
      date : item?.date.split('T')[0]


    })), [items]
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    usePagination,
    rows,
    prepareRow
  } = useTable({ columns, data });

  return (

    <>
 <Approve isOpen={isOpen} setIsOpen={setIsOpen} update={update} refetch={refetch} />
    {/* <useHelmet name={'Manager || De list'} /> */}

    <Helmet><title>Manager || Monthly Report</title></Helmet>

    
    <h1 className="text-lg font-semibold text-[#0284C7] p-5">Monthly Report</h1>

    <MonthlyReportnav    setActive={setActive} setSearch={setSearch} />

 
    <div className="px-6 mb-10 bg-gray-100 rounded-lg">
      <table {...getTableProps()} className="min-w-full overflow-x-auto bg-white border mb-5 border-gray-200">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} className="bg-[#0284C7]">
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} className="p-2 border-2 border-gray-300 text-center text-white">{column.render('Header')}</th>
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
                  <td {...cell.getCellProps()} className="p-2 text-gray-500 font font-normal border-2 text-center border-gray-300">{cell.render('Cell')}</td>
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

export default MonthlyReport;
