import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import { FaEdit, FaTrashAlt, FaEye, FaBan } from 'react-icons/fa';
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Tablenav from "../../Share/Tablenav";
import Pagination from "../../Share/PaginationTable/Pagination";
import axoissecure from "../../Hooks/Axoisscure";
import PubNoticenav from "../../Share/NoticeNavpub/PubNoticenav";






const PublicNoitice = () => {

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
      "notice",
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
            `/notice/search?query=${search}&limit=${limit}&page=${page}`
          );
          setStat(res.data?.meta);

          return res?.data?.items;
        } else {
          const res = await axoissecure.get(
            `/notice/search?limit=${limit}&page=${page}`
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
        Header: "Assigner",
        accessor: 'position'
      },
    {
      Header: "Date",
      accessor: 'date'
    },
   
    {
        Header: "Title",
        accessor: 'title'
    },
     
   
   

    {
      Header: "View",
      accessor: 'action',
      Cell: ({ row }) => (
        <>
         <div className="flex w-full mx-auto  items-center gap-2 ">
        
       
        
          
          {/* View Icon */}
          <Link to={`/public/deatailsnotice/${row.original.id}`}>
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
      sl: index + 1,
      assigner : item?.assigner,
      title : item?.noticetitle,
      position : item?.position,
      date: item?.date?.split('T')[0],

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

    <useHelmet name={'Manager || Notice Board '} />

    <Helmet><title>Manager || Public || Notice Board</title></Helmet>

    
    <h1 className="text-2xl  font-semibold text-center text-gray-600 pt-10 pb-5">Notice Board</h1>

    <PubNoticenav setActive={setActive} setSearch={setSearch} route={'/dashboard/addnotice'}/>

 
    <div className="px-6 bg-gray-100 rounded-lg">
      <table {...getTableProps()} className="lg:min-w-full w-full overflow-x-auto bg-white border mb-5 border-gray-200">
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

export default PublicNoitice;
