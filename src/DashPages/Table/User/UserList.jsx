import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import { FaEdit, FaTrashAlt, FaEye, FaBan } from 'react-icons/fa';
import { Helmet } from "react-helmet";



import Swal from "sweetalert2";
import axoissecure from "../../../Hooks/Axoisscure";
import Tablenav from "../../../Share/Tablenav";
import Pagination from "../../../Share/PaginationTable/Pagination";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";





const UserList = () => {
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
      "user",
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
            `/users/search?query=${search}&limit=${limit}&page=${page}`
          );
          setStat(res.data?.meta);

          return res?.data?.items;
        } else {
          const res = await axoissecure.get(
            `/users/search?limit=${limit}&page=${page}`
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
        Header: "Email",
        accessor: 'email'
      },
    {
      Header: "Role",
      accessor: 'role'
    },
 

    {
      Header: "Action",
      accessor: 'action',
      Cell: ({ row }) => (
    console.log(row?.original),
        <>
         <div className="flex w-full mx-auto  items-center gap-2 ">
         
          
          {/* Delete Icon */}
          <FaTrashAlt title="Delete" onClick={() => handleDelete(row.original.id)} className="  text-red-500 cursor-pointer"  />
          
         
       
          {
            row?.original?.status === 1 ?  
            <FaBan title="Disable" onClick={() => handleDisable(row.original.id)} className="text-red-800 cursor-pointer" />    :  
            <IoCheckmarkDoneCircleOutline title="Enable" onClick={() => handleEnable(row.original.id)} className=" text-green-600 text-lg cursor-pointer" />
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
        axoissecure.patch(`/users/disable/${_id}`).then((res) => {
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
        axoissecure.patch(`/users/enable/${_id}`).then((res) => {
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
        axoissecure.delete(`/users/${_id}`).then((res) => {
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

 



  const data = React.useMemo(() => 
    items?.map((item, index) => ({
      ...item,
      sl: rowPerPage === "All" ? index + 1 : index + 1 + (page - 1) * rowPerPage,
      name: item?.userName?.name,
      role: item?.role,
      email: item?.email,

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
 {/* <Updateuser isOpen={isOpen} setIsOpen={setIsOpen} update={update} refetch={refetch} /> */}
    {/* <useHelmet name={'Manager || De list'} /> */}

    <Helmet><title>Manager || User List</title></Helmet>

    
    <h1 className="text-xl font-semibold text-[#0284C7] p-5">User List</h1>

    <Tablenav    setActive={setActive} setSearch={setSearch} route={'/dashboard/adduser'}/>

 
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

export default UserList;
