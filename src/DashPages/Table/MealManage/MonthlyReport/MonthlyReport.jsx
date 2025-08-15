import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import {
  FaEdit,
  FaTrashAlt,
  FaEye,
  FaBan,
  FaPaperPlane,
  FaDownload,
  FaPlus,
  FaSearch,
  FaChartBar,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaUtensils,
  FaPlusCircle,
  FaCheckCircle,
  FaTimesCircle
} from 'react-icons/fa';
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import axoissecure from "../../../../Hooks/Axoisscure";
import { ModernTable, ModernCard, ModernAlert } from "../../../../Share/ModernComponents";
import Approve from "../../../Update/ReportApprove/Approve";

const MonthlyReport = () => {
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
      "report",
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
            `/report/search?query=${search}&limit=${limit}&page=${page}`
          );
          setStat(res.data?.meta);
          return res?.data?.items;
        } else {
          const res = await axoissecure.get(
            `/report/search?limit=${limit}&page=${page}`
          );
          setStat(res.data?.meta);
          return res?.data?.items;
        }
      } catch (error) {
        console.error("Error fetching report data:", error);
        throw error;
      }
    },
  });

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this report!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axoissecure.delete(`/report/${_id}`);
          if (res.status === 200) {
            Swal.fire({
              title: "Deleted!",
              text: "Report has been deleted successfully.",
              icon: "success",
            });
            refetch();
          }
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "Failed to delete report.",
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
        `/report/search?limit=100000000&page=1`
      );
      const allData = response.data.items;

      const filteredData = allData?.map((item, index) => ({
        sl: index + 1,
        date: item?.date?.split('T')[0],
        totaltk: item?.totaltk,
        meal: item?.meal,
        extratk: item?.extratk,
        status: item?.status === 1 ? "Approved" : "Pending",
      }));

      const worksheet = XLSX.utils.json_to_sheet(filteredData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "All MonthlyReport");

      XLSX.writeFile(workbook, "MonthlyReport.xlsx");
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
          <FaCalendarAlt className="w-4 h-4 text-primary-500" />
          <span className="font-medium text-secondary-900">{value?.split('T')[0]}</span>
        </div>
      )
    },
    {
      key: "totaltk",
      label: "Cost Tk",
      sortable: true,
      render: (value) => (
        <div className="flex items-center space-x-2">
          <FaMoneyBillWave className="w-4 h-4 text-success-500" />
          <span className="font-medium text-success-700">৳{value || 0}</span>
        </div>
      )
    },
    {
      key: "meal",
      label: "Meal",
      sortable: true,
      render: (value) => (
        <div className="flex items-center space-x-2">
          <FaUtensils className="w-4 h-4 text-warning-500" />
          <span className="font-medium text-warning-700">{value || 0}</span>
        </div>
      )
    },
    {
      key: "extratk",
      label: "Extra",
      sortable: true,
      render: (value) => (
        <div className="flex items-center space-x-2">
          <FaPlusCircle className="w-4 h-4 text-info-500" />
          <span className="font-medium text-info-700">৳{value || 0}</span>
        </div>
      )
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (value) => (
        <div className="flex items-center space-x-2">
          {value === 1 ? (
            <>
              <FaCheckCircle className="w-4 h-4 text-success-500" />
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800">
                Approved
              </span>
            </>
          ) : (
            <>
              <FaTimesCircle className="w-4 h-4 text-warning-500" />
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-warning-100 text-warning-800">
                Pending
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
            to={`/dashboard/updatereport/${row.id}`}
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
            to={`/dashboard/detailsreport/${row.id}`}
            className="p-2 text-warning-600 hover:text-warning-700 hover:bg-warning-50 rounded-lg transition-all duration-200"
            title="View Details"
          >
            <FaEye className="w-4 h-4" />
          </Link>

          {row.status !== 1 && (
            <Approve id={row.id} refetch={refetch} />
          )}
        </div>
      )
    }
  ];

  const tableData = items?.map((item, index) => ({
    ...item,
    sl: index + 1,
    date: item?.date,
    totaltk: item?.totaltk,
    meal: item?.meal,
    extratk: item?.extratk,
    status: item?.status,
  }));

  // Calculate statistics
  const totalReports = items?.length || 0;
  const approvedReports = items?.filter(item => item.status === 1).length || 0;
  const pendingReports = items?.filter(item => item.status !== 1).length || 0;
  const totalCost = items?.reduce((sum, item) => sum + (parseFloat(item.totaltk) || 0), 0);
  const totalMeals = items?.reduce((sum, item) => sum + (parseFloat(item.meal) || 0), 0);
  const totalExtra = items?.reduce((sum, item) => sum + (parseFloat(item.extratk) || 0), 0);

  return (
    <>
      <Helmet><title>Manager || Monthly Report</title></Helmet>

      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
              <FaChartBar className="text-white text-lg" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-secondary-900">Monthly Report</h1>
              <p className="text-secondary-600">Manage all monthly meal reports and approvals</p>
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
            <Link to="/dashboard/addreport">
              <button className="btn btn-primary">
                <FaPlus className="mr-2" />
                Add Report
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <ModernCard className="text-center">
          <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <FaChartBar className="text-2xl text-primary-600" />
          </div>
          <h3 className="text-2xl font-bold text-primary-900 mb-1">{totalReports}</h3>
          <p className="text-sm text-primary-600">Total Reports</p>
        </ModernCard>

        <ModernCard className="text-center">
          <div className="w-12 h-12 bg-success-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <FaCheckCircle className="text-2xl text-success-600" />
          </div>
          <h3 className="text-2xl font-bold text-success-900 mb-1">{approvedReports}</h3>
          <p className="text-sm text-success-600">Approved</p>
        </ModernCard>

        <ModernCard className="text-center">
          <div className="w-12 h-12 bg-warning-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <FaTimesCircle className="text-2xl text-warning-600" />
          </div>
          <h3 className="text-2xl font-bold text-warning-900 mb-1">{pendingReports}</h3>
          <p className="text-sm text-warning-600">Pending</p>
        </ModernCard>

        <ModernCard className="text-center">
          <div className="w-12 h-12 bg-info-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <FaMoneyBillWave className="text-2xl text-info-600" />
          </div>
          <h3 className="text-2xl font-bold text-info-900 mb-1">৳{totalCost.toLocaleString()}</h3>
          <p className="text-sm text-info-600">Total Cost</p>
        </ModernCard>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <ModernCard className="text-center">
          <div className="w-12 h-12 bg-warning-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <FaUtensils className="text-2xl text-warning-600" />
          </div>
          <h3 className="text-2xl font-bold text-warning-900 mb-1">{totalMeals}</h3>
          <p className="text-sm text-warning-600">Total Meals</p>
        </ModernCard>

        <ModernCard className="text-center">
          <div className="w-12 h-12 bg-info-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <FaPlusCircle className="text-2xl text-info-600" />
          </div>
          <h3 className="text-2xl font-bold text-info-900 mb-1">৳{totalExtra.toLocaleString()}</h3>
          <p className="text-sm text-info-600">Total Extra</p>
        </ModernCard>
      </div>

      {/* Search and Filter Section */}
      <ModernCard className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="search-input flex-1 max-w-md">
            <FaSearch className="search-input-icon" />
            <input
              type="text"
              placeholder="Search reports..."
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
              All Reports
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
        searchPlaceholder="Search reports..."
        loading={isLoading}
        emptyMessage="No reports found"
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

export default MonthlyReport;
