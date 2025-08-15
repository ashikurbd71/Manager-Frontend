import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import {
  FaEye,
  FaSearch,
  FaBell,
  FaCalendarAlt,
  FaUser,
  FaFilter,
  FaDownload
} from 'react-icons/fa';
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { ModernTable, ModernCard, ModernAlert } from "../../Share/ModernComponents";
import axoissecure from "../../Hooks/Axoisscure";

const PublicNoitice = () => {
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
      "publicNotice",
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
        console.error("Error fetching notice data:", error);
        throw error;
      }
    },
  });

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

  const columns = [
    {
      key: "sl",
      label: "Sl.",
      sortable: true,
      className: "w-16 text-center"
    },
    {
      key: "position",
      label: "Assigner",
      sortable: true,
      render: (value) => (
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
            <FaUser className="w-4 h-4 text-primary-600" />
          </div>
          <span className="font-medium text-secondary-900">{value}</span>
        </div>
      )
    },
    {
      key: "date",
      label: "Date",
      sortable: true,
      render: (value) => (
        <div className="flex items-center space-x-2">
          <FaCalendarAlt className="w-4 h-4 text-secondary-400" />
          <span className="text-secondary-700">{value}</span>
        </div>
      )
    },
    {
      key: "title",
      label: "Title",
      sortable: true,
      render: (value) => (
        <div className="max-w-xs">
          <h3 className="font-medium text-secondary-900 truncate">{value}</h3>
        </div>
      )
    },
    {
      key: "actions",
      label: "Actions",
      sortable: false,
      className: "w-24 text-center",
      render: (value, row) => (
        <div className="flex items-center justify-center space-x-2">
          <Link
            to={`/public/deatailsnotice/${row.id}`}
            className="p-2 text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
            title="View Details"
          >
            <FaEye className="w-4 h-4" />
          </Link>
        </div>
      )
    }
  ];

  const tableData = items?.map((item, index) => ({
    ...item,
    sl: index + 1,
    assigner: item?.assigner,
    title: item?.noticetitle,
    position: item?.position,
    date: item?.date?.split('T')[0],
  }));

  const handleExport = () => {
    // Export functionality can be implemented here
    console.log('Exporting notices...');
  };

  return (
    <>
      <Helmet><title>Manager || Public || Notice Board</title></Helmet>

      <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                  <FaBell className="text-white text-lg" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-secondary-900">Notice Board</h1>
                  <p className="text-secondary-600">Stay updated with the latest announcements</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleExport}
                  className="btn btn-outline"
                  title="Export Notices"
                >
                  <FaDownload className="mr-2" />
                  Export
                </button>
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
                  placeholder="Search notices..."
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
                  All Notices
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

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <ModernCard className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <FaBell className="text-2xl text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold text-primary-900 mb-1">
                {stat?.total || 0}
              </h3>
              <p className="text-sm text-primary-600">Total Notices</p>
            </ModernCard>

            <ModernCard className="text-center">
              <div className="w-12 h-12 bg-success-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <FaCalendarAlt className="text-2xl text-success-600" />
              </div>
              <h3 className="text-2xl font-bold text-success-900 mb-1">
                {stat?.page || 1}
              </h3>
              <p className="text-sm text-success-600">Current Page</p>
            </ModernCard>

            <ModernCard className="text-center">
              <div className="w-12 h-12 bg-warning-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <FaFilter className="text-2xl text-warning-600" />
              </div>
              <h3 className="text-2xl font-bold text-warning-900 mb-1">
                {items?.length || 0}
              </h3>
              <p className="text-sm text-warning-600">Showing</p>
            </ModernCard>
          </div>

          {/* Table Section */}
          <ModernTable
            columns={columns}
            data={tableData}
            onSort={handleSort}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            onSearch={handleSearch}
            searchQuery={search}
            searchPlaceholder="Search notices..."
            loading={isLoading}
            emptyMessage="No notices found"
            className="mb-6"
          />

          {/* Pagination */}
          {stat && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white rounded-xl shadow-soft border border-secondary-100">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-secondary-600">
                  Showing {((stat.page - 1) * stat.limit) + 1} to {Math.min(stat.page * stat.limit, stat.total)} of {stat.total} results
                </span>
                <select
                  value={rowPerPage}
                  onChange={(e) => setRowPerPage(e.target.value)}
                  className="px-3 py-1 border border-secondary-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value={5}>5 per page</option>
                  <option value={10}>10 per page</option>
                  <option value={20}>20 per page</option>
                  <option value="All">All</option>
                </select>
              </div>

              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setPage(1)}
                  disabled={stat.page === 1}
                  className="p-2 text-secondary-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  First
                </button>
                <button
                  onClick={() => setPage(stat.page - 1)}
                  disabled={stat.page === 1}
                  className="p-2 text-secondary-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="px-3 py-2 text-sm font-medium text-secondary-700">
                  Page {stat.page} of {Math.ceil(stat.total / stat.limit)}
                </span>
                <button
                  onClick={() => setPage(stat.page + 1)}
                  disabled={stat.page >= Math.ceil(stat.total / stat.limit)}
                  className="p-2 text-secondary-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
                <button
                  onClick={() => setPage(Math.ceil(stat.total / stat.limit))}
                  disabled={stat.page >= Math.ceil(stat.total / stat.limit)}
                  className="p-2 text-secondary-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Last
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PublicNoitice;
