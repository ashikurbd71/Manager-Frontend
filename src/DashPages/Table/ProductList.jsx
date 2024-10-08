import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import { FaEdit, FaTrashAlt, FaEye, FaBan } from 'react-icons/fa';
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import Tablenav from './../../Share/Tablenav';
import axoissecure from './../../Hooks/Axoisscure';
import Swal from "sweetalert2";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import Pagination from "../../Share/PaginationTable/Pagination";





const ProductList = () => {

  const [search, setSearch] = useState("");
  const [rowPerPage, setRowPerPage] = useState(15);
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
            `/members/search?query=${search}&limit=${limit}&page=${page}`
          );
          setStat(res.data?.meta);

          return res?.data?.items;
        } else {
          const res = await axoissecure.get(
            `/members/search?limit=${limit}&page=${page}`
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
    {
      Header: "Number",
      accessor: 'number'
    },
    {
      Header: "Institute",
      accessor: 'institute'
    },
    {
      Header: "Department",
      accessor: 'department'
    },
   
    {
      Header: "Semister",
      accessor: 'semister'
    },

    {
      Header: "Action",
      accessor: 'action',
      Cell: ({ row }) => (
        <>
         <div className="flex w-full mx-auto  items-center gap-2 ">
          {/**/}
           {/* Edit Icon */}
         
           <Link to={`/dashboard/updatemember/${row.original.id}`}>
         <FaEdit title="Edit" className="  text-green-500 cursor-pointer" />
         </Link>
          
          {/* Delete Icon */}
          <FaTrashAlt title="Delete" onClick={() => handleDelete(row.original.id)} className=" text-red-500 cursor-pointer"  />
          
          {/* View Icon */}
          <Link to={`/dashboard/memberdeatils/${row.original.id}`}>
          <FaEye title="View Deatails"  className=" text-yellow-600 cursor-pointer"  />
          </Link>
       
          
          {/* Disable Icon */}
                   {/* Disable Icon */}     
                   {
            row?.original?.status === 1 ?  
            <FaBan title="Disable" onClick={() => handleDisable(row.original.id)} className="text-red-600 cursor-pointer" />    :  
            <IoCheckmarkDoneCircleOutline title="Enable" onClick={() => handleEnable(row.original.id)} className=" text-green-600 text-lg cursor-pointer" />
          }
         </div>
        </>
      )
    },
  ], []);

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
        axoissecure.delete(`/members/${_id}`).then((res) => {
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
        axoissecure.patch(`/members/disable/${_id}`).then((res) => {
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
        axoissecure.patch(`/members/enable/${_id}`).then((res) => {
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
    items?.map((item, index) => ({
      ...item,
      sl: index + 1,
      name : item?.name,
      number : item?.number,
      institute : item?.instituteName?.shortName,
      department : item?.department?.shortName,
      semister: item?.semister?.shortName,
      email: item?.email,
      date: item?.joiningDate?.split('T')[0],

    })), [items]
  );

  const handleAllExport = async () => {
    try {
      const response = await axoissecure.get(
        `/members/search?limit=100000000&page=1`
      );
      const allData = response.data.items;

      const filteredData = allData?.map((item, index) => ({
      sl: index + 1 + (page - 1) * rowPerPage,
      name : item?.name,
      number : item?.number,
      institute : item?.instituteName?.shortName,
      department : item?.department?.shortName,
      semister: item?.semister?.shortName,
      email: item?.email,
      date: item?.joiningDate?.split('T')[0],

      }));

      const worksheet = XLSX.utils.json_to_sheet(filteredData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "All Memberlist");

      XLSX.writeFile(workbook, "Allmemberlist.xlsx");
    } catch (error) {
      console.error("Error exporting data:", error);
      Swal.fire({
        title: "Error!",
        text: "An error occurred while exporting data.",
        icon: "error",
      });
    }
  };
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data });

  return (

    <>

    <useHelmet name={'Manager || Member list'} />

    <Helmet><title>Manager || Member list</title></Helmet>

    
    <h1 className="text-xl font-semibold text-[#0284C7] p-5">Member List</h1>

    <Tablenav setSearch={setSearch}   handleExcell={handleAllExport} setActive={setActive} route={'/dashboard/addmember'}/>

 
    <div className="px-6 bg-gray-100 rounded-lg">
      <table {...getTableProps()} className="min-w-full overflow-x-auto bg-white mb-5 border border-gray-200">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} className="bg-[#0284C7] text-white">
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
              <tr  {...row.getRowProps()} className="hover:bg-gray-100">
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

export default ProductList;
