import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import { FaEdit, FaTrashAlt, FaEye, FaBan, FaPaperPlane } from 'react-icons/fa';
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";


import { toast } from "react-toastify";

import Swal from "sweetalert2";

import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import axoissecure from "../../Hooks/Axoisscure";
import Tablenav from "../../Share/Tablenav";
import UpdateInstitute from "../../DashPages/Update/SettingModal/UpdateInstitute";
import Pagination from "../../Share/PaginationTable/Pagination";






const MyReport = () => {
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
      "institute",
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
            `/institute/search?query=${search}&limit=${limit}&page=${page}`
          );
          setStat(res.data?.meta);

          return res?.data?.items;
        } else {
          const res = await axoissecure.get(
            `/institute/search?limit=${limit}&page=${page}`
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
    // {
    //   Header: "Meal",
    //   accessor: 'meal'
    // },
    // {
    //     Header: "Extra",
    //     accessor: 'extratk'
    //   },

      {
        Header: "Status",
        accessor: 's'
      },
   
 

    {
      Header: "Action",
      accessor: 'action',
      Cell: ({ row }) => (
    console.log(row?.original),
        <>
         <div className="flex w-full mx-auto  items-center gap-2 ">
         

             {/* View Icon */}
          <Link to={`/dashboard/memberdeatils/${row.original.id}`}>
          <FaEye title="View Deatails"  className=" hover:text-yellow-500 cursor-pointer"  />
          </Link>
          
       
       
        
          
         </div>
        </>
      )
    },
  ], []);

  



  const data = React.useMemo(() => 
    items?.map((item, index) => ({
      ...item,
      sl: rowPerPage === "All" ? index + 1 : index + 1 + (page - 1) * rowPerPage,
      institues: item?.name,
      shortname: item?.shortName,

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

    {/* <useHelmet name={'Manager || De list'} /> */}

    <Helmet><title>Manager || My Report</title></Helmet>

    <h1 className="text-2xl  font-semibold text-center text-gray-600 pt-10 pb-5">My Report</h1>

    <Tablenav    setActive={setActive} setSearch={setSearch} route={'/public/addmyreport'} />

 
    <div className="px-6 mb-10 bg-gray-100 rounded-lg">
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

export default MyReport;
