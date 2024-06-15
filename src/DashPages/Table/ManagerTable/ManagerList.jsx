import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useTable } from "react-table";
import { FaEdit, FaTrashAlt, FaEye, FaBan } from 'react-icons/fa';
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import axoissecure from "../../../Hooks/Axoisscure";
import Tablenav from "../../../Share/Tablenav";






const ManagerList = () => {

  const { data: items = [], refetch } = useQuery({
    queryKey: ["productadded"],
    queryFn: async () => {
      try {
        const res = await axoissecure.get(`/members`);
        return res.data;
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
        Header: "Title",
        accessor: 'title'
      },
    {
      Header: "Start",
      accessor: 'start'
    },
    {
      Header: "End",
      accessor: 'end'
    },
   
   

    {
      Header: "Action",
      accessor: 'action',
      Cell: ({ row }) => (
        <>
         <div className="flex w-full mx-auto  items-center gap-2 ">
           {/* Edit Icon */}
           <FaEdit title="Edit" onClick={() => handleEdit(row.original.id)} className=" hover:text-green-500 cursor-pointer" />
          
          {/* Delete Icon */}
          <FaTrashAlt title="Delete" onClick={() => handleDelete(row.original.id)} className="  hover:text-red-500 cursor-pointer"  />
          
          {/* View Icon */}
          <Link to={`/dashboard/memberdetails/${row.original.id}`}>
          <FaEye title="View Deatails"  className=" hover:text-yellow-500 cursor-pointer"  />
          </Link>
       
          
          {/* Disable Icon */}
          <FaBan title="Disable" onClick={() => handleDisable(row.original.id)} className=" hover:text-red-600 cursor-pointer" />
         </div>
        </>
      )
    },
  ], []);

  const handleEdit = () => {

  }
  const handleDelete = () => {
    
  }
  const handleView = () => {
    
  }
  const handleDisable = () => {
    
  }


  const data = React.useMemo(() => 
    items.map((item, index) => ({
      ...item,
      sl: index + 1,
      name : item?.name,
      number : item?.number,
      institute : item?.instituteName,
      department : item?.department,
      semister: item?.semister,
      email: item?.email,
      date: item?.joiningDate?.split('T')[0],

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

    <useHelmet name={'Manager || Member list'} />

    <Helmet><title>Manager || Manager list</title></Helmet>

    
    <h1 className="text-2xl font-medium text-gray-600 p-5">Manager List</h1>

    <Tablenav route={'/dashboard/addmanager'}/>

 
    <div className="px-6 bg-gray-100 rounded-lg">
      <table {...getTableProps()} className="min-w-full overflow-x-auto bg-white border border-gray-200">
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
                  <td {...cell.getCellProps()} className="p-2 border-2 text-center border-gray-300">{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>

    </>
  );
};

export default ManagerList;
