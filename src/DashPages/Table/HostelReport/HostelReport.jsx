import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';
import {
  FaDownload,
  FaChartLine,
  FaMoneyBillWave,
  FaHome,
  FaSignOutAlt,
  FaWallet,
  FaUsers,
  FaBed,
  FaBuilding
} from 'react-icons/fa';
import { MdOutlineHomeWork } from 'react-icons/md';
import { CiCoinInsert } from 'react-icons/ci';
import { BiLogOut } from 'react-icons/bi';
import { GiTakeMyMoney } from 'react-icons/gi';
import { ModernCard, StatCard } from '../../../Share/ModernComponents';
import axoissecure from '../../../Hooks/Axoisscure';

const HostelReport = () => {
  const { data: roomData, isLoading: roomLoading } = useQuery({
    queryKey: ["roomTotals"],
    queryFn: async () => {
      try {
        const res = await axoissecure.get(`/rooms/totals`);
        return res.data;
      } catch (error) {
        console.error("Error fetching room data:", error);
        throw error;
      }
    },
  });

  const { data: cashInData, isLoading: cashInLoading } = useQuery({
    queryKey: ["cashInTotal"],
    queryFn: async () => {
      try {
        const res = await axoissecure.get(`/cashin/total`);
        return res.data;
      } catch (error) {
        console.error("Error fetching cash in data:", error);
        throw error;
      }
    },
  });

  const { data: cashOutData, isLoading: cashOutLoading } = useQuery({
    queryKey: ["cashOutTotal"],
    queryFn: async () => {
      try {
        const res = await axoissecure.get(`/cashout/total`);
        return res.data;
      } catch (error) {
        console.error("Error fetching cash out data:", error);
        throw error;
      }
    },
  });

  // Calculate derived values
  const availableSeats = roomData?.totalSeats - roomData?.totalCount || 0;
  const totalCashIn = cashInData?.totalAmount || 0;
  const totalCashOut = cashOutData?.totalAmount || 0;
  const availableBalance = totalCashIn - totalCashOut;
  const occupancyRate = roomData?.totalSeats ? ((roomData.totalCount / roomData.totalSeats) * 100).toFixed(1) : 0;

  const handleExportReport = () => {
    // Export functionality can be implemented here
    console.log('Exporting hostel report...');
  };

  return (
    <>
      <Helmet><title>Manager || Hostel Report</title></Helmet>

      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
              <FaChartLine className="text-white text-lg" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-secondary-900">Hostel Report</h1>
              <p className="text-secondary-600">Comprehensive overview of hostel operations</p>
            </div>
          </div>
          <button
            onClick={handleExportReport}
            className="btn btn-outline"
            title="Export Report"
          >
            <FaDownload className="mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Available Rooms Card */}
        <StatCard
          title="Available Seats"
          value={availableSeats}
          subtitle={`${roomData?.totalCount || 0} occupied`}
          icon={FaBed}
          variant="primary"
          loading={roomLoading}
          trend={{
            value: occupancyRate,
            label: "Occupancy Rate",
            suffix: "%"
          }}
        />

        {/* Total Cash In Card */}
        <StatCard
          title="Total Cash In"
          value={`৳${totalCashIn.toLocaleString()}`}
          subtitle="Total money received"
          icon={CiCoinInsert}
          variant="success"
          loading={cashInLoading}
          trend={{
            value: "+12.5",
            label: "This Month",
            suffix: "%"
          }}
        />

        {/* Total Cash Out Card */}
        <StatCard
          title="Total Cash Out"
          value={`৳${totalCashOut.toLocaleString()}`}
          subtitle="Total money spent"
          icon={BiLogOut}
          variant="warning"
          loading={cashOutLoading}
          trend={{
            value: "+8.3",
            label: "This Month",
            suffix: "%"
          }}
        />

        {/* Available Balance Card */}
        <StatCard
          title="Available Balance"
          value={`৳${availableBalance.toLocaleString()}`}
          subtitle="Current balance"
          icon={FaWallet}
          variant={availableBalance >= 0 ? "success" : "error"}
          loading={cashInLoading || cashOutLoading}
          trend={{
            value: availableBalance >= 0 ? "+5.2" : "-2.1",
            label: "Net Change",
            suffix: "%"
          }}
        />
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Room Statistics */}
        <ModernCard title="Room Statistics" className="h-full">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-primary-50 rounded-xl">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <FaBuilding className="text-2xl text-primary-600" />
                </div>
                <h3 className="text-2xl font-bold text-primary-900">
                  {roomData?.totalSeats || 0}
                </h3>
                <p className="text-sm text-primary-600">Total Seats</p>
              </div>

              <div className="text-center p-4 bg-success-50 rounded-xl">
                <div className="w-12 h-12 bg-success-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <FaUsers className="text-2xl text-success-600" />
                </div>
                <h3 className="text-2xl font-bold text-success-900">
                  {roomData?.totalCount || 0}
                </h3>
                <p className="text-sm text-success-600">Occupied Seats</p>
              </div>
            </div>

            <div className="bg-secondary-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-secondary-700">Occupancy Rate</span>
                <span className="text-sm font-bold text-secondary-900">{occupancyRate}%</span>
              </div>
              <div className="w-full bg-secondary-200 rounded-full h-2">
                <div
                  className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(occupancyRate, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </ModernCard>

        {/* Financial Summary */}
        <ModernCard title="Financial Summary" className="h-full">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-success-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-success-100 rounded-lg flex items-center justify-center">
                    <CiCoinInsert className="text-success-600" />
                  </div>
                  <span className="font-medium text-success-900">Cash In</span>
                </div>
                <span className="font-bold text-success-900">৳{totalCashIn.toLocaleString()}</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-warning-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-warning-100 rounded-lg flex items-center justify-center">
                    <BiLogOut className="text-warning-600" />
                  </div>
                  <span className="font-medium text-warning-900">Cash Out</span>
                </div>
                <span className="font-bold text-warning-900">৳{totalCashOut.toLocaleString()}</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-primary-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                    <FaWallet className="text-primary-600" />
                  </div>
                  <span className="font-medium text-primary-900">Net Balance</span>
                </div>
                <span className={`font-bold ${availableBalance >= 0 ? 'text-success-900' : 'text-error-900'}`}>
                  ৳{availableBalance.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-4">
              <h4 className="font-semibold text-secondary-900 mb-2">Quick Insights</h4>
              <ul className="space-y-2 text-sm text-secondary-600">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success-500 rounded-full"></div>
                  <span>Cash flow is positive this month</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-warning-500 rounded-full"></div>
                  <span>Room occupancy at {occupancyRate}%</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  <span>{availableSeats} seats available for new members</span>
                </li>
              </ul>
            </div>
          </div>
        </ModernCard>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ModernCard className="text-center hover:scale-105 transition-transform duration-200 cursor-pointer">
          <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FaUsers className="text-3xl text-primary-600" />
          </div>
          <h3 className="text-lg font-semibold text-secondary-900 mb-2">Manage Members</h3>
          <p className="text-sm text-secondary-600">Add, edit, or remove hostel members</p>
        </ModernCard>

        <ModernCard className="text-center hover:scale-105 transition-transform duration-200 cursor-pointer">
          <div className="w-16 h-16 bg-success-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FaMoneyBillWave className="text-3xl text-success-600" />
          </div>
          <h3 className="text-lg font-semibold text-secondary-900 mb-2">Financial Reports</h3>
          <p className="text-sm text-secondary-600">View detailed financial statements</p>
        </ModernCard>

        <ModernCard className="text-center hover:scale-105 transition-transform duration-200 cursor-pointer">
          <div className="w-16 h-16 bg-warning-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FaHome className="text-3xl text-warning-600" />
          </div>
          <h3 className="text-lg font-semibold text-secondary-900 mb-2">Room Management</h3>
          <p className="text-sm text-secondary-600">Manage room assignments and availability</p>
        </ModernCard>
      </div>
    </>
  );
};

export default HostelReport;