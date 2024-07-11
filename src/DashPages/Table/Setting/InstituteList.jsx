import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useTable } from "react-table";
import { FaEdit, FaTrashAlt, FaEye, FaBan } from 'react-icons/fa';
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import axoissecure from './../../../Hooks/Axoisscure';
import Tablenav from './../../../Share/Tablenav';

import Modal from "./../../../Share/CustomModal/CustomModal";
import { toast } from "react-toastify";
import UpdateInstitute from "../../Update/SettingModal/UpdateInstitute";
import Swal from "sweetalert2";





const InstituteList = () => {

  const { data: items = [], refetch } = useQuery({
    queryKey: ["productadded"],
    queryFn: async () => {
      try {
        const res = await axoissecure.get(`/institute`);
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
      Header: "Institue Name",
      accessor: 'institues'
    },
    {
      Header: "Short Name",
      accessor: 'shortname'
    },
 

    {
      Header: "Action",
      accessor: 'action',
      Cell: ({ row }) => (
        <>
         <div className="flex w-full mx-auto  items-center gap-2 ">
           {/* Edit Icon */}
           <FaEdit title="Edit" onClick={() => openModal(row.original.id)} className=" cursor-pointer hover:text-green-500 " />
          
          {/* Delete Icon */}
          <FaTrashAlt title="Delete" onClick={() => handleDelete(row.original.id)} className="  hover:text-red-500 cursor-pointer"  />
          
         
       
          
          {/* Disable Icon */}
          <FaBan title="Disable" onClick={() => handleDisable(row.original.id)} className=" hover:text-red-600 cursor-pointer" />
         </div>
        </>
      )
    },
  ], []);

  const [isOpen, setIsOpen] = useState(null)
  const[id,setId] = useState()


  const openModal = (id) => {
    setIsOpen(true)
    setId(id)
  }


  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to delete this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        axoissecure.delete(`/institute/${_id}`).then((res) => {
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
  const handleView = () => {
    
  }
  const handleDisable = () => {
    
  }


  const data = React.useMemo(() => 
    items.map((item, index) => ({
      ...item,
      sl: index + 1,
      institues: item?.name,
      shortname: item?.shortName,

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
 <UpdateInstitute isOpen={isOpen} setIsOpen={setIsOpen} id={id} />
    {/* <useHelmet name={'Manager || De list'} /> */}

    <Helmet><title>Manager || Institute List</title></Helmet>

    
    <h1 className="text-2xl font-medium text-gray-600 p-5">Institute List</h1>

    <Tablenav route={'/dashboard/setting/addinstitute'}/>

 
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

export default InstituteList;
