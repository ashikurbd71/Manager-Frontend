import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useTable } from "react-table";
import axoissecure from "../../Share/Hooks/Axoisscure";
import { FaEdit, FaTrashAlt, FaEye, FaBan } from 'react-icons/fa';
const ProductList = () => {

  const { data: items = [], refetch } = useQuery({
    queryKey: ["productadded"],
    queryFn: async () => {
      try {
        const res = await axoissecure.get(`/product`);
        return res.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    },
  });


  const columns = React.useMemo(() => [
    {
      Header: "Sl.",
      accessor: 'productSl'
    },
    {
      Header: "Product",
      accessor: 'productName'
    },
    {
      Header: "Date",
      accessor: 'date'
    },
    {
      Header: "Cost",
      accessor: 'cost'
    },
    {
      Header: "Action",
      accessor: 'action',
      Cell: ({ row }) => (
        <>
         <div className="flex w-full mx-auto  items-center gap-2 ">
           {/* Edit Icon */}
           <FaEdit onClick={() => handleEdit(row.original.id)} className=" hover:text-green-500 cursor-pointer" />
          
          {/* Delete Icon */}
          <FaTrashAlt onClick={() => handleDelete(row.original.id)} className="  hover:text-red-500 cursor-pointer"  />
          
          {/* View Icon */}
          <FaEye onClick={() => handleView(row.original.id)} className=" hover:text-yellow-500 cursor-pointer"  />
          
          {/* Disable Icon */}
          <FaBan onClick={() => handleDisable(row.original.id)} className=" hover:text-red-600 cursor-pointer" />
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


  const data = React.useMemo(() => items, [items]);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data });

  return (
    <div className="p-6 bg-gray-100 rounded-lg">
      <table {...getTableProps()} className="min-w-full  bg-white border border-gray-200">
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
  );
};

export default ProductList;
