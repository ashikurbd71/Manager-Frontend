import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import {
  FaEdit,
  FaTrashAlt,
  FaEye,
  FaBan,
  FaDownload,
  FaPlus,
  FaSearch,
  FaImages,
  FaUser,
  FaCalendarAlt,
  FaImage,
  FaCheckCircle,
  FaTimesCircle
} from 'react-icons/fa';
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import axoissecure from "../../../Hooks/Axoisscure";
import Swal from "sweetalert2";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { ModernTable, ModernCard, ModernAlert } from "../../../Share/ModernComponents";
import * as XLSX from "xlsx";

const AlbumList = () => {
  const [search, setSearch] = useState("");
  const [rowPerPage, setRowPerPage] = useState(10);
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
      "image",
      search,
      rowPerPage,
      page,
      active
    ],
    queryFn: async () => {
      try {
        let limit = rowPerPage === "All" ? 100000000 : rowPerPage;

        if (active) {
          const res = await axoissecure.get(
            `/image/search?query=${search}&limit=${limit}&page=${page}`
          );
          setStat(res.data?.meta);
          return res?.data?.items;
        } else {
          const res = await axoissecure.get(
            `/image/search?limit=${limit}&page=${page}`
          );
          setStat(res.data?.meta);
          return res?.data?.items;
        }
      } catch (error) {
        console.error("Error fetching album data:", error);
        throw error;
      }
    },
  });

  const handleDelete = async (_id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You want to delete this album!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const res = await axoissecure.delete(`/image/${_id}`);
        if (res.status === 200) {
          Swal.fire({
            title: "Deleted!",
            text: "Album has been deleted successfully.",
            icon: "success",
          });
          refetch();
        }
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to delete album.",
        icon: "error",
      });
    }
  };

  const handleDisable = async (_id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You want to disable this album!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, disable it!",
      });

      if (result.isConfirmed) {
        const res = await axoissecure.patch(`/image/disable/${_id}`);
        if (res.status === 200) {
          Swal.fire({
            title: "Disabled!",
            text: "Album has been disabled successfully.",
            icon: "success",
          });
          refetch();
        }
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to disable album.",
        icon: "error",
      });
    }
  };

  const handleEnable = async (_id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You want to enable this album!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, enable it!",
      });

      if (result.isConfirmed) {
        const res = await axoissecure.patch(`/image/enable/${_id}`);
        if (res.status === 200) {
          Swal.fire({
            title: "Enabled!",
            text: "Album has been enabled successfully.",
            icon: "success",
          });
          refetch();
        }
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to enable album.",
        icon: "error",
      });
    }
  };

  const handleSearch = (searchValue) => {
    setSearch(searchValue);
    setPage(1);
  };

  const handleSort = (columnKey) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(columnKey);
      setSortDirection("asc");
    }
  };

  const handleAllExport = async () => {
    try {
      const response = await axoissecure.get(
        `/image/search?limit=100000000&page=1`
      );
      const allData = response.data.items;

      const filteredData = allData?.map((item, index) => ({
        sl: index + 1,
        user: item?.user,
        date: item?.date?.split('T')[0],
        status: item?.status === 1 ? 'Active' : 'Inactive',
      }));

      const worksheet = XLSX.utils.json_to_sheet(filteredData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "All AlbumList");

      XLSX.writeFile(workbook, "AlbumList.xlsx");
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
      key: "date",
      label: "Date",
      sortable: true,
      render: (value) => (
        <div className="flex items-center space-x-2">
          <FaCalendarAlt className="w-4 h-4 text-secondary-400" />
          <span className="font-medium text-secondary-900">{value?.split('T')[0]}</span>
        </div>
      )
    },
    {
      key: "email",
      label: "User",
      sortable: true,
      render: (value) => (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
            <FaUser className="w-4 h-4 text-primary-600" />
          </div>
          <span className="font-medium text-secondary-900">{value}</span>
        </div>
      )
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center space-x-2">
          {row?.status === 1 ? (
            <>
              <FaCheckCircle className="w-4 h-4 text-success-500" />
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800">
                Active
              </span>
            </>
          ) : (
            <>
              <FaTimesCircle className="w-4 h-4 text-error-500" />
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-error-100 text-error-800">
                Inactive
              </span>
            </>
          )}
        </div>
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
            to={`/dashboard/albumdetails/${row.id}`}
            className="p-2 text-warning-600 hover:text-warning-700 hover:bg-warning-50 rounded-lg transition-all duration-200"
            title="View Details"
          >
            <FaEye className="w-4 h-4" />
          </Link>

          <button
            onClick={() => handleDelete(row.id)}
            className="p-2 text-error-600 hover:text-error-700 hover:bg-error-50 rounded-lg transition-all duration-200"
            title="Delete"
          >
            <FaTrashAlt className="w-4 h-4" />
          </button>

          {row?.status === 1 ? (
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
              <IoCheckmarkDoneCircleOutline className="w-4 h-4" />
            </button>
          )}
        </div>
      )
    }
  ];

  const tableData = items?.map((item, index) => ({
    ...item,
    sl: index + 1,
    email: item?.user,
    date: item?.date,
  }));

  // Calculate statistics
  const totalAlbums = items?.length || 0;
  const activeAlbums = items?.filter(item => item.status === 1).length || 0;
  const inactiveAlbums = items?.filter(item => item.status !== 1).length || 0;
  const todayAlbums = items?.filter(item => {
    const today = new Date().toISOString().split('T')[0];
    return item.date?.split('T')[0] === today;
  }).length || 0;

  return (
    <>
      <Helmet><title>Manager || Album List</title></Helmet>

      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
              <FaImages className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Album Gallery
              </h1>
              <p className="text-secondary-600">Manage photo albums and galleries</p>
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
            <Link to="/dashboard/addalbum">
              <button className="btn btn-primary">
                <FaPlus className="mr-2" />
                Add Album
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <ModernCard className="text-center">
          <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <FaImages className="text-2xl text-primary-600" />
          </div>
          <h3 className="text-2xl font-bold text-primary-900 mb-1">{totalAlbums}</h3>
          <p className="text-sm text-primary-600">Total Albums</p>
        </ModernCard>

        <ModernCard className="text-center">
          <div className="w-12 h-12 bg-success-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <FaCheckCircle className="text-2xl text-success-600" />
          </div>
          <h3 className="text-2xl font-bold text-success-900 mb-1">{activeAlbums}</h3>
          <p className="text-sm text-success-600">Active Albums</p>
        </ModernCard>

        <ModernCard className="text-center">
          <div className="w-12 h-12 bg-error-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <FaTimesCircle className="text-2xl text-error-600" />
          </div>
          <h3 className="text-2xl font-bold text-error-900 mb-1">{inactiveAlbums}</h3>
          <p className="text-sm text-error-600">Inactive Albums</p>
        </ModernCard>

        <ModernCard className="text-center">
          <div className="w-12 h-12 bg-warning-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <FaCalendarAlt className="text-2xl text-warning-600" />
          </div>
          <h3 className="text-2xl font-bold text-warning-900 mb-1">{todayAlbums}</h3>
          <p className="text-sm text-warning-600">Today's Albums</p>
        </ModernCard>
      </div>

      {/* Search and Filter Section */}
      <ModernCard className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="search-input flex-1 max-w-md">
            <FaSearch className="search-input-icon" />
            <input
              type="text"
              placeholder="Search albums..."
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
              All Albums
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
        searchPlaceholder="Search albums..."
        loading={isLoading}
        emptyMessage="No albums found"
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

export default AlbumList;
