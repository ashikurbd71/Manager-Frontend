import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import { FaEdit, FaTrashAlt, FaEye, FaBan } from 'react-icons/fa';
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import axoissecure from "../../../Hooks/Axoisscure";
import Tablenav from "../../../Share/Tablenav";
import Pagination from "../../../Share/PaginationTable/Pagination";
import Swal from "sweetalert2";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";


import * as XLSX from "xlsx";
import { TbPlaceholder } from "react-icons/tb";
import { MdPayment } from "react-icons/md";
import UpdateRoom from "../../Update/Room/UpdateRoom";
import UpdateRoomtwotwo from "../../Update/Room/UpdateRoomtwo";
import UpdateRoomtwo from "../../Update/Room/UpdateRoomtwo";



const RoomList = () => {

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
      "rooms",
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
            `/rooms/search?query=${search}&limit=${limit}&page=${page}`
          );
          setStat(res.data?.meta);

          return res?.data?.items;
        } else {
          const res = await axoissecure.get(
            `/rooms/search?limit=${limit}&page=${page}`
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
        Header: "Room No.",
        accessor: 'roomNumber'
      },
      {
        Header: "Floor",
        accessor: 'floor'
      },
    {
      Header: "Seat",
      accessor: 'seat'
    },

    {
        Header: "Booked",
        accessor: 'count'
      },
   
    {
        Header: "Price",
        accessor: "price",
      },
   
   

    {
      Header: "Action",
      accessor: 'action',
      Cell: ({ row }) => (
        <>
         <div className="flex w-full mx-auto  items-center gap-2 ">
       
   


            <FaTrashAlt
            title="Delete"
            onClick={() => handleDelete(row.original.id)}
            className="text-red-500 cursor-pointer"
          />
        
   
       {
        row?.original?.count == 0 ? '' :   <Link to={`/dashboard/roomdetails/${row.original.id}`}>
        <FaEye title="View Deatails"  className=" text-yellow-600 cursor-pointer"  />
        </Link>
       }
        

          {
            row?.original?.count == 1 ||  row?.original?.count == 2 ?   <div title="Seat-1"   className=" px-2 py-1 rounded-2xl bg-green-200"><h1 className="font font-semibold text-sm text-green-600">Booked-1</h1></div> : 
            <MdPayment 
            title="Seat-1"
            onClick={() => openModal(row.original)}
            className="text-green-500 cursor-pointer"
          />
        }

{
            row?.original?.count == 2 ?   <div title="Seat-2"  className=" px-2 py-1 rounded-2xl bg-green-200"><h1 className="font font-semibold text-sm text-green-600">Booked-2</h1></div> : 
            <MdPayment 
            title="Seat-2"
            onClick={() => openModals(row.original)}
            className="text-blue-500 cursor-pointer"
          />
        }
       
          
          {/* Disable Icon */}
         
        
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



  const [isOpens, setIsOpens] = useState(null)
  const[updates,setUpdates] = useState()


  const openModals = (id) => {
    setIsOpens(true)
    setUpdates(id)
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
        axoissecure.delete(`/rooms/${_id}`).then((res) => {
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
      sl: index + 1,
      roomNumber : item?.roomNumber,
      floor : item?.floor,
      seat : item?.seat,
    //   count: item?.date?.split('T')[0],
      count : item?.count,
      price : item?.price,

    })), [items]
  );

  const handleAllExport = async () => {
    try {
      const response = await axoissecure.get(
        `/cashin/search?limit=100000000&page=1`
      );
      const allData = response.data.items;

      const filteredData = allData?.map((item, index) => ({
      sl: index + 1 + (page - 1) * rowPerPage,
      sl: index + 1,
      name : item?.name,
      amount : item?.amount,
      code : item?.code,
      date: item?.date?.split('T')[0],

      }));

      const worksheet = XLSX.utils.json_to_sheet(filteredData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "All RoomList");

      XLSX.writeFile(workbook, "RoomList.xlsx");
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

    <Helmet><title>Manager || Room list</title></Helmet>

    
   <UpdateRoom isOpen={isOpen} setIsOpen={setIsOpen} update={update} refetch={refetch} />
   <UpdateRoomtwo isOpen={isOpens} setIsOpen={setIsOpens} update={updates} refetch={refetch} />
    <h1 className="text-xl font-semibold text-[#0284C7] p-5"> Room List</h1>

    <Tablenav handleExcell={handleAllExport} setActive={setActive} setSearch={setSearch} route={'/dashboard/addroom'}/>

 
    <div className="px-6 bg-gray-100 rounded-lg">
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

export default RoomList;
