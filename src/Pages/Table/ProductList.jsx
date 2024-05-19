import React from "react";
import { useTable } from "react-table";

const ProductList = () => {

  const columns = React.useMemo(() => [
    {
      Header: "Sl.",
      accessor: 'sl'
    },
    {
      Header: "Product",
      accessor: 'product'
    },
    {
      Header: "Date",
      accessor: 'date'
    },
    {
      Header: "Cost",
      accessor: 'cost'
    },
  ], []);

  const data = React.useMemo(() => [
    { sl: 1, product: "Apple", date: "2024-05-19", cost: 1.2 },
    { sl: 2, product: "Banana", date: "2024-05-20", cost: 0.5 },
    { sl: 3, product: "Orange", date: "2024-05-21", cost: 0.8 }
  ], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data });

  return (
    <>
      {/* table rendering */}
      <div>
        <table {...getTableProps()}>
          {/* head */}
          <thead>
            {
              headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {
                    headerGroup.headers.map(column => (
                      <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                    ))
                  }
                </tr>
              ))
            }
          </thead>
          {/* body */}
          <tbody {...getTableBodyProps()}>
            {
              rows.map(row => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {
                      row.cells.map(cell => (
                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                      ))
                    }
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductList;
