import { FaRegCommentDots, FaProjectDiagram, FaDownload, FaAngleRight } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import axoissecure from '../../../Hooks/Axoisscure';
import { useQuery } from '@tanstack/react-query';
import { GiMoneyStack, GiTakeMyMoney } from 'react-icons/gi';
import { IoFastFoodOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { TbMoneybag } from 'react-icons/tb';
import { FaUsers } from 'react-icons/fa6';
import { Helmet } from 'react-helmet';
import { MdOutlineAccountBalanceWallet } from 'react-icons/md';

const Dashboard = () => {
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

  const { data, refetch } = useQuery({
    queryKey: ["re"],
    queryFn: async () => {
      try {
        const res = await axoissecure.get(`/report/approved-totals`);
        return res.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    },
  });

  const { data: addmoney } = useQuery({
    queryKey: ["readd"],
    queryFn: async () => {
      try {
        const res = await axoissecure.get(`/mealmanage/total-add-money`);
        return res.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    },
  });

  const { data: items = [] } = useQuery({
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
            `/mealmanage/search?query=${search}&limit=${limit}&page=${page}`
          );
          setStat(res.data?.meta);
          return res?.data?.items;
        } else {
          const res = await axoissecure.get(
            `/mealmanage/search?limit=${limit}&page=${page}`
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

  // Calculate balance
  const balance = parseInt(data?.totalTk || 0) - parseInt(addmoney?.totalAddMoney || 0);

  return (
    <>
      <Helmet><title>Manager || Dashboard</title></Helmet>

      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
              <FaAngleRight className="text-white text-lg" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-secondary-900">
                Dashboard
              </h1>
              <p className="text-secondary-600">
                Overview of your hostel management system
              </p>
            </div>
          </div>

          <Link to={'/dashboard/downloadreports'}>
            <button className="btn btn-outline">
              <FaDownload className="mr-2" />
              Download Report
            </button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Total Members Card */}
        <div className="stat-card stat-card-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-primary-600 mb-1">
                Total Members
              </p>
              <p className="text-3xl font-bold text-primary-900">
                {stat?.totalItems || "0"}
              </p>
              <p className="text-xs text-primary-600 mt-1">
                Active members in the system
              </p>
            </div>
            <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center">
              <FaUsers className="text-3xl text-primary-600" />
            </div>
          </div>
        </div>

        {/* Total Money Card */}
        <div className="stat-card stat-card-success">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-success-600 mb-1">
                Total Money
              </p>
              <p className="text-3xl font-bold text-success-900">
                ৳{addmoney?.totalAddMoney || "0"}
              </p>
              <p className="text-xs text-success-600 mt-1">
                Total collected amount
              </p>
            </div>
            <div className="w-16 h-16 bg-success-100 rounded-2xl flex items-center justify-center">
              <TbMoneybag className="text-3xl text-success-600" />
            </div>
          </div>
        </div>

        {/* Balance Card */}
        <div className="stat-card stat-card-warning">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-warning-600 mb-1">
                Current Balance
              </p>
              <p className="text-3xl font-bold text-warning-900">
                ৳{balance || "0"}
              </p>
              <p className="text-xs text-warning-600 mt-1">
                Available balance
              </p>
            </div>
            <div className="w-16 h-16 bg-warning-100 rounded-2xl flex items-center justify-center">
              <MdOutlineAccountBalanceWallet className="text-3xl text-warning-600" />
            </div>
          </div>
        </div>

        {/* Total Cost Card */}
        <div className="stat-card stat-card-error">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-error-600 mb-1">
                Total Cost
              </p>
              <p className="text-3xl font-bold text-error-900">
                ৳{data?.totalTk || "0"}
              </p>
              <p className="text-xs text-error-600 mt-1">
                Total expenses incurred
              </p>
            </div>
            <div className="w-16 h-16 bg-error-100 rounded-2xl flex items-center justify-center">
              <GiMoneyStack className="text-3xl text-error-600" />
            </div>
          </div>
        </div>

        {/* Total Meals Card */}
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600 mb-1">
                Total Meals
              </p>
              <p className="text-3xl font-bold text-secondary-900">
                {data?.totalMeal || "0"}
              </p>
              <p className="text-xs text-secondary-600 mt-1">
                Meals served this month
              </p>
            </div>
            <div className="w-16 h-16 bg-secondary-100 rounded-2xl flex items-center justify-center">
              <IoFastFoodOutline className="text-3xl text-secondary-600" />
            </div>
          </div>
        </div>

        {/* Total Extra Card */}
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600 mb-1">
                Total Extra
              </p>
              <p className="text-3xl font-bold text-secondary-900">
                ৳{data?.extraTk || "0"}
              </p>
              <p className="text-xs text-secondary-600 mt-1">
                Extra charges collected
              </p>
            </div>
            <div className="w-16 h-16 bg-secondary-100 rounded-2xl flex items-center justify-center">
              <GiTakeMyMoney className="text-3xl text-secondary-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link to="/dashboard/addmeal" className="card p-6 text-center hover:scale-105 transition-transform duration-200">
          <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <IoFastFoodOutline className="text-2xl text-primary-600" />
          </div>
          <h3 className="font-semibold text-secondary-900 mb-2">Add Meal</h3>
          <p className="text-sm text-secondary-600">Record new meal entries</p>
        </Link>

        <Link to="/dashboard/addcash" className="card p-6 text-center hover:scale-105 transition-transform duration-200">
          <div className="w-12 h-12 bg-success-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <TbMoneybag className="text-2xl text-success-600" />
          </div>
          <h3 className="font-semibold text-secondary-900 mb-2">Add Cash</h3>
          <p className="text-sm text-secondary-600">Record cash transactions</p>
        </Link>

        <Link to="/dashboard/addnotice" className="card p-6 text-center hover:scale-105 transition-transform duration-200">
          <div className="w-12 h-12 bg-warning-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <FaRegCommentDots className="text-2xl text-warning-600" />
          </div>
          <h3 className="font-semibold text-secondary-900 mb-2">Add Notice</h3>
          <p className="text-sm text-secondary-600">Post new announcements</p>
        </Link>

        <Link to="/dashboard/reports" className="card p-6 text-center hover:scale-105 transition-transform duration-200">
          <div className="w-12 h-12 bg-error-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <FaProjectDiagram className="text-2xl text-error-600" />
          </div>
          <h3 className="font-semibold text-secondary-900 mb-2">View Reports</h3>
          <p className="text-sm text-secondary-600">Generate detailed reports</p>
        </Link>
      </div>
    </>
  );
};

export default Dashboard;