import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import { FaEdit, FaTrashAlt, FaEye, FaBan } from 'react-icons/fa';
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";



import { toast } from "react-toastify";

import Swal from "sweetalert2";

import { IoCaretBackSharp, IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import axoissecure from "../../../../Hooks/Axoisscure";
import UpdateInstitute from "../../../Update/SettingModal/UpdateInstitute";
import Tablenav from "../../../../Share/Tablenav";
import Pagination from "../../../../Share/PaginationTable/Pagination";
import ExtraMoneyUpdate from "../../../Update/MealManager/ExtraUpdate/ExtraMoneyUpdate";
import ExtraDetails from "../../../Details/Manager/ExtramoneyDetails/ExtraDetails";
import ExtraMealNav from "../../../../Share/ExtraMealNav/ExtraMealNav";




const ExtraMealList = () => {
  const [search, setSearch] = useState("");
  const [rowPerPage, setRowPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [stat, setStat] = useState();
  const [active, setActive] = useState(0);
  const[extra,setExtra] = useState()

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
            `/mealextra/search?query=${search}&limit=${limit}&page=${page}`
          );
          setStat(res.data?.meta);
          setExtra(res?.data?.meta?.totalExtraMoney)
          return res?.data?.items;
        } else {
          const res = await axoissecure.get(
            `/mealextra/search?limit=${limit}&page=${page}`
          );
          setStat(res.data?.meta);
          setExtra(res?.data?.meta?.totalExtraMoney)
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

      Header: "Extra(Tk)",
      accessor: 'extra'
    },

  
    {
      Header: "Action",
      accessor: 'action',
      Cell: ({ row }) => (
    console.log(row?.original),
        <>
         <div className="flex w-full mx-auto  items-center gap-2 ">
           {/* Edit Icon */}
           <FaEdit title="Edit" onClick={() => openModal(row.original)} className=" cursor-pointer hover:text-green-500 " />
          

           <FaEye title="View Deatails" onClick={() => openModald(row.original)}  className=" hover:text-yellow-500 cursor-pointer"  />


          {/* Delete Icon */}
          <FaTrashAlt title="Delete" onClick={() => handleDelete(row.original.id)} className="  hover:text-red-500 cursor-pointer"  />
          
         
       
        

          
         </div>
        </>
      )
    },
  ], []);

  const [isOpen, setIsOpen] = useState(null)

  const [isOpend, setIsOpend] = useState(null)

  const[update,setUpdate] = useState()


  const openModal = (id) => {
    setIsOpen(true)
    setUpdate(id)
  }

  const openModald = (id) => {
    setIsOpend(true)
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
        axoissecure.delete(`/mealextra/${_id}`).then((res) => {
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
      date: item?.date?.split("T")[0],
      extra: item?.extraMoney,

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
 <ExtraMoneyUpdate isOpen={isOpen} setIsOpen={setIsOpen} update={update} refetch={refetch} />
    {/* <useHelmet name={'Manager || De list'} /> */}
    
    <ExtraDetails isOpen={isOpend} setIsOpen={setIsOpend} update={update} refetch={refetch} />
    <Helmet><title>Manager || Extra Money </title></Helmet>




    <div className="flex justify-between items-center p-5">

<div>
<h1 className="text-xl font-medium text-gray-600 ">Extra Money </h1>
</div>

    <Link to={'/dashboard/mealmanagelist'}>
                   <div className='flex text-gray-500 text-lg justify-items-center items-center'>
                    <IoCaretBackSharp className='text-[#0284C7]'/>
                   Back Meal Manage
                   </div>

                   </Link>
    </div>
    


    <ExtraMealNav totalextrameal={extra}   setActive={setActive} setSearch={setSearch} route={'/dashboard/addextra'}/>

 
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

export default ExtraMealList;
