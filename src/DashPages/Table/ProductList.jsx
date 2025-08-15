import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt, FaEye, FaBan, FaDownload, FaPlus, FaUsers } from 'react-icons/fa';
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import axoissecure from './../../Hooks/Axoisscure';
import Swal from "sweetalert2";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { ModernTable, ModernCard, ModernAlert } from "../../Share/ModernComponents";
import { FaSearch } from "react-icons/fa";

const ProductList = () => {
  const [search, setSearch] = useState("");
  const [rowPerPage, setRowPerPage] = useState(15);
  const [page, setPage] = useState(1);
  const [stat, setStat] = useState();
  const [active, setActive] = useState(0);
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    if (active === 1) {
      setPage(1);
    } else {
      setPage(1);
    }
  }, [active, search]);

  const { data: items = [], refetch, isLoading } = useQuery({
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

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this member!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axoissecure.delete(`/members/${_id}`);
          if (res.status === 200) {
            Swal.fire({
              title: "Deleted!",
              text: "Member has been deleted successfully.",
              icon: "success",
            });
            refetch();
          }
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "Failed to delete member.",
            icon: "error",
          });
        }
      }
    });
  };

  const handleDisable = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to disable this member!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, disable it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axoissecure.patch(`/members/disable/${_id}`);
          if (res.status === 200) {
            Swal.fire({
              title: "Disabled!",
              text: "Member has been disabled successfully.",
              icon: "success",
            });
            refetch();
          }
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "Failed to disable member.",
            icon: "error",
          });
        }
      }
    });
  };

  const handleEnable = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to enable this member!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, enable it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axoissecure.patch(`/members/enable/${_id}`);
          if (res.status === 200) {
            Swal.fire({
              title: "Enabled!",
              text: "Member has been enabled successfully.",
              icon: "success",
            });
            refetch();
          }
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "Failed to enable member.",
            icon: "error",
          });
        }
      }
    });
  };

  const handleAllExport = async () => {
    try {
      const response = await axoissecure.get(
        `/members/search?limit=100000000&page=1`
      );
      const allData = response.data.items;

      const filteredData = allData?.map((item, index) => ({
        sl: index + 1 + (page - 1) * rowPerPage,
        name: item?.name,
        number: item?.number,
        institute: item?.instituteName?.shortName,
        department: item?.department?.shortName,
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

  const columns = [
    {
      key: "sl",
      label: "Sl.",
      sortable: true,
      className: "w-16 text-center"
    },
    {
      key: "name",
      label: "Name",
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {value?.charAt(0)?.toUpperCase() || 'M'}
            </span>
          </div>
          <div>
            <p className="font-medium text-secondary-900">{value}</p>
            <p className="text-sm text-secondary-500">{row.email}</p>
          </div>
        </div>
      )
    },
    {
      key: "number",
      label: "Number",
      sortable: true,
      render: (value) => (
        <span className="font-medium text-secondary-900">{value}</span>
      )
    },
    {
      key: "institute",
      label: "Institute",
      sortable: true,
      render: (value) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
          {value}
        </span>
      )
    },
    {
      key: "department",
      label: "Department",
      sortable: true,
      render: (value) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary-100 text-secondary-800">
          {value}
        </span>
      )
    },
    {
      key: "semister",
      label: "Semester",
      sortable: true,
      render: (value) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent-100 text-accent-800">
          {value}
        </span>
      )
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (value) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${value === 1
          ? 'bg-success-100 text-success-800'
          : 'bg-error-100 text-error-800'
          }`}>
          {value === 1 ? 'Active' : 'Inactive'}
        </span>
      )
    },
    {
      key: "actions",
      label: "Actions",
      sortable: false,
      className: "w-48",
      render: (value, row) => (
        <div className="flex items-center space-x-2">
          <Link
            to={`/dashboard/updatemember/${row.id}`}
            className="p-2 text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-all duration-200"
            title="Edit"
          >
            <FaEdit className="w-4 h-4" />
          </Link>

          <button
            onClick={() => handleDelete(row.id)}
            className="p-2 text-error-600 hover:text-error-700 hover:bg-error-50 rounded-lg transition-all duration-200"
            title="Delete"
          >
            <FaTrashAlt className="w-4 h-4" />
          </button>

          <Link
            to={`/dashboard/memberdeatils/${row.id}`}
            className="p-2 text-warning-600 hover:text-warning-700 hover:bg-warning-50 rounded-lg transition-all duration-200"
            title="View Details"
          >
            <FaEye className="w-4 h-4" />
          </Link>

          {row.status === 1 ? (
            <button
              onClick={() => handleDisable(row.id)}
              className="p-2 text-error-600 hover:text-error-700 hover:bg-error-50 rounded-lg transition-all duration-200"
              title="Disable"
            >
              <FaBan className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => handleEnable(row.id)}
              className="p-2 text-success-600 hover:text-success-700 hover:bg-success-50 rounded-lg transition-all duration-200"
              title="Enable"
            >
              <IoCheckmarkDoneCircleOutline className="w-5 h-5" />
            </button>
          )}
        </div>
      )
    }
  ];

  const tableData = items?.map((item, index) => ({
    ...item,
    sl: index + 1,
    name: item?.name,
    number: item?.number,
    institute: item?.instituteName?.shortName,
    department: item?.department?.shortName,
    semister: item?.semister?.shortName,
    email: item?.email,
    date: item?.joiningDate?.split('T')[0],
  }));

  const handleSort = (columnKey) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(columnKey);
      setSortDirection("asc");
    }
  };

  const handleSearch = (searchValue) => {
    setSearch(searchValue);
    setPage(1);
  };

  return (
    <>
      <Helmet><title>Manager || Member List</title></Helmet>

      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
              <FaUsers className="text-white text-lg" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-secondary-900">Member List</h1>
              <p className="text-secondary-600">Manage all hostel members</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleAllExport}
              className="btn btn-outline"
              title="Export to Excel"
            >
              <FaDownload className="mr-2" />
              Export
            </button>
            <Link to="/dashboard/addmember">
              <button className="btn btn-primary">
                <FaPlus className="mr-2" />
                Add Member
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <ModernCard className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="search-input flex-1 max-w-md">
            <FaSearch className="search-input-icon" />
            <input
              type="text"
              placeholder="Search members..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="input"
            />
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActive(0)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${active === 0
                ? 'bg-primary-600 text-white'
                : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'
                }`}
            >
              All Members
            </button>
            <button
              onClick={() => setActive(1)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${active === 1
                ? 'bg-primary-600 text-white'
                : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'
                }`}
            >
              Search Results
            </button>
          </div>
        </div>
      </ModernCard>

      {/* Table Section */}
      <ModernTable
        columns={columns}
        data={tableData}
        onSort={handleSort}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSearch={handleSearch}
        searchQuery={search}
        searchPlaceholder="Search members..."
        loading={isLoading}
        emptyMessage="No members found"
        className="mb-6"
      />

      {/* Pagination */}
      {stat && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white rounded-xl shadow-soft border border-secondary-100">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-secondary-600">Show</span>
            <select
              value={rowPerPage}
              onChange={(e) => setRowPerPage(Number(e.target.value))}
              className="px-3 py-1 text-sm border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span className="text-sm text-secondary-600">entries</span>
          </div>

          <div className="text-sm text-secondary-600">
            Showing {((page - 1) * rowPerPage) + 1} to {Math.min(page * rowPerPage, stat.totalItems)} of {stat.totalItems} entries
          </div>

          <div className="flex items-center space-x-1">
            <button
              onClick={() => setPage(1)}
              disabled={page === 1}
              className="p-2 text-secondary-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 9H17a1 1 0 110 2h-5.586l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
            </button>

            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="p-2 text-secondary-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>

            <span className="px-3 py-2 text-sm font-medium text-secondary-900">
              Page {page} of {Math.ceil(stat.totalItems / rowPerPage)}
            </span>

            <button
              onClick={() => setPage(page + 1)}
              disabled={page >= Math.ceil(stat.totalItems / rowPerPage)}
              className="p-2 text-secondary-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>

            <button
              onClick={() => setPage(Math.ceil(stat.totalItems / rowPerPage))}
              disabled={page >= Math.ceil(stat.totalItems / rowPerPage)}
              className="p-2 text-secondary-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductList;
