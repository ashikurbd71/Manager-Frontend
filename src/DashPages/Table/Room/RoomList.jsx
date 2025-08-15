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
  FaHome,
  FaUsers,
  FaMoneyBillWave
} from 'react-icons/fa';
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import axoissecure from "../../../Hooks/Axoisscure";
import Swal from "sweetalert2";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { MdPayment } from "react-icons/md";
import { ModernTable, ModernCard, ModernAlert } from "../../../Share/ModernComponents";
import UpdateRoom from "../../Update/Room/UpdateRoom";
import UpdateRoomtwo from "../../Update/Room/UpdateRoomtwo";
import * as XLSX from "xlsx";

const RoomList = () => {
  const [search, setSearch] = useState("");
  const [rowPerPage, setRowPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [stat, setStat] = useState();
  const [active, setActive] = useState(0);
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [isOpen, setIsOpen] = useState(null);
  const [update, setUpdate] = useState();
  const [isOpens, setIsOpens] = useState(null);
  const [updates, setUpdates] = useState();

  useEffect(() => {
    if (active === 1) {
      setPage(1);
    } else {
      setPage(1);
    }
  }, [active, search]);

  const { data: items = [], refetch, isLoading } = useQuery({
    queryKey: [
      "rooms",
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
        console.error("Error fetching room data:", error);
        throw error;
      }
    },
  });

  const openModal = (id) => {
    setIsOpen(true);
    setUpdate(id);
  };

  const openModals = (id) => {
    setIsOpens(true);
    setUpdates(id);
  };

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this room!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axoissecure.delete(`/rooms/${_id}`);
          if (res.status === 200) {
            Swal.fire({
              title: "Deleted!",
              text: "Room has been deleted successfully.",
              icon: "success",
            });
            refetch();
          }
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "Failed to delete room.",
            icon: "error",
          });
        }
      }
    });
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
        `/rooms/search?limit=100000000&page=1`
      );
      const allData = response.data.items;

      const filteredData = allData?.map((item, index) => ({
        sl: index + 1,
        roomNumber: item?.roomNumber,
        floor: item?.floor,
        seat: item?.seat,
        count: item?.count,
        price: item?.price,
        available: item?.seat - item?.count,
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

  const columns = [
    {
      key: "sl",
      label: "Sl.",
      sortable: true,
      className: "w-16 text-center"
    },
    {
      key: "roomNumber",
      label: "Room No.",
      sortable: true,
      render: (value) => (
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
            <FaHome className="w-4 h-4 text-primary-600" />
          </div>
          <span className="font-medium text-secondary-900">{value}</span>
        </div>
      )
    },
    {
      key: "floor",
      label: "Floor",
      sortable: true,
      render: (value) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary-100 text-secondary-800">
          Floor {value}
        </span>
      )
    },
    {
      key: "seat",
      label: "Total Seats",
      sortable: true,
      render: (value) => (
        <div className="flex items-center space-x-2">
          <FaUsers className="w-4 h-4 text-secondary-400" />
          <span className="font-medium text-secondary-900">{value}</span>
        </div>
      )
    },
    {
      key: "count",
      label: "Booked",
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center space-x-2">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${value === 0 ? 'bg-success-100 text-success-800' :
            value === row.seat ? 'bg-error-100 text-error-800' :
              'bg-warning-100 text-warning-800'
            }`}>
            {value} / {row.seat}
          </span>
        </div>
      )
    },
    {
      key: "price",
      label: "Price",
      sortable: true,
      render: (value) => (
        <div className="flex items-center space-x-2">
          <FaMoneyBillWave className="w-4 h-4 text-success-500" />
          <span className="font-medium text-success-700">৳{value}</span>
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
          <button
            onClick={() => handleDelete(row.id)}
            className="p-2 text-error-600 hover:text-error-700 hover:bg-error-50 rounded-lg transition-all duration-200"
            title="Delete"
          >
            <FaTrashAlt className="w-4 h-4" />
          </button>

          {row.count > 0 && (
            <Link
              to={`/dashboard/roomdetails/${row.id}`}
              className="p-2 text-warning-600 hover:text-warning-700 hover:bg-warning-50 rounded-lg transition-all duration-200"
              title="View Details"
            >
              <FaEye className="w-4 h-4" />
            </Link>
          )}

          {row.count === 0 ? (
            <div className="px-2 py-1 rounded-lg bg-success-100">
              <span className="text-xs font-medium text-success-700">Available</span>
            </div>
          ) : row.count === 1 ? (
            <div className="px-2 py-1 rounded-lg bg-warning-100">
              <span className="text-xs font-medium text-warning-700">1 Booked</span>
            </div>
          ) : row.count === 2 ? (
            <div className="px-2 py-1 rounded-lg bg-error-100">
              <span className="text-xs font-medium text-error-700">2 Booked</span>
            </div>
          ) : null}

          {row.count < row.seat && (
            <button
              onClick={() => openModal(row)}
              className="p-2 text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-all duration-200"
              title="Book Seat"
            >
              <MdPayment className="w-4 h-4" />
            </button>
          )}
        </div>
      )
    }
  ];

  const tableData = items?.map((item, index) => ({
    ...item,
    sl: index + 1,
    roomNumber: item?.roomNumber,
    floor: item?.floor,
    seat: item?.seat,
    count: item?.count,
    price: item?.price,
  }));

  // Calculate statistics
  const totalRooms = items?.length || 0;
  const totalSeats = items?.reduce((sum, room) => sum + (room.seat || 0), 0);
  const totalBooked = items?.reduce((sum, room) => sum + (room.count || 0), 0);
  const totalAvailable = totalSeats - totalBooked;
  const occupancyRate = totalSeats > 0 ? ((totalBooked / totalSeats) * 100).toFixed(1) : 0;

  return (
    <>
      <Helmet><title>Manager || Room List</title></Helmet>

      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
              <FaHome className="text-white text-lg" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-secondary-900">Room List</h1>
              <p className="text-secondary-600">Manage all hostel rooms and bookings</p>
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
            <Link to="/dashboard/addroom">
              <button className="btn btn-primary">
                <FaPlus className="mr-2" />
                Add Room
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <ModernCard className="text-center">
          <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <FaHome className="text-2xl text-primary-600" />
          </div>
          <h3 className="text-2xl font-bold text-primary-900 mb-1">{totalRooms}</h3>
          <p className="text-sm text-primary-600">Total Rooms</p>
        </ModernCard>

        <ModernCard className="text-center">
          <div className="w-12 h-12 bg-success-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <FaUsers className="text-2xl text-success-600" />
          </div>
          <h3 className="text-2xl font-bold text-success-900 mb-1">{totalSeats}</h3>
          <p className="text-sm text-success-600">Total Seats</p>
        </ModernCard>

        <ModernCard className="text-center">
          <div className="w-12 h-12 bg-warning-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <FaUsers className="text-2xl text-warning-600" />
          </div>
          <h3 className="text-2xl font-bold text-warning-900 mb-1">{totalBooked}</h3>
          <p className="text-sm text-warning-600">Booked Seats</p>
        </ModernCard>

        <ModernCard className="text-center">
          <div className="w-12 h-12 bg-info-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <FaUsers className="text-2xl text-info-600" />
          </div>
          <h3 className="text-2xl font-bold text-info-900 mb-1">{totalAvailable}</h3>
          <p className="text-sm text-info-600">Available Seats</p>
        </ModernCard>
      </div>

      {/* Search and Filter Section */}
      <ModernCard className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="search-input flex-1 max-w-md">
            <FaSearch className="search-input-icon" />
            <input
              type="text"
              placeholder="Search rooms..."
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
              All Rooms
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
        searchPlaceholder="Search rooms..."
        loading={isLoading}
        emptyMessage="No rooms found"
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

      {/* Modals */}
      <UpdateRoom isOpen={isOpen} setIsOpen={setIsOpen} update={update} refetch={refetch} />
      <UpdateRoomtwo isOpen={isOpens} setIsOpen={setIsOpens} update={updates} refetch={refetch} />
    </>
  );
};

export default RoomList;
