import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';
import {
  FaDownload,
  FaChartBar,
  FaMoneyBillWave,
  FaUtensils,
  FaPlus,
  FaCalendarAlt,
  FaUsers,
  FaChartLine
} from 'react-icons/fa';
import { GiMoneyStack, GiTakeMyMoney } from 'react-icons/gi';
import { IoFastFoodOutline } from 'react-icons/io5';
import { ModernCard, StatCard } from '../../../Share/ModernComponents';
import axoissecure from '../../../Hooks/Axoisscure';

const Report = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["monthlyReport"],
    queryFn: async () => {
      try {
        const res = await axoissecure.get(`/report/approved-totals`);
        return res.data;
      } catch (error) {
        console.error("Error fetching report data:", error);
        throw error;
      }
    },
  });

  const handleExportReport = () => {
    // Export functionality can be implemented here
    console.log('Exporting monthly report...');
  };

  const handleRefreshData = () => {
    refetch();
  };

  // Calculate derived values
  const totalMoney = data?.totalTk || 0;
  const totalMeals = data?.totalMeal || 0;
  const totalExtra = data?.extraTk || 0;
  const averageMealCost = totalMeals > 0 ? (totalMoney / totalMeals).toFixed(2) : 0;
  const extraPercentage = totalMoney > 0 ? ((totalExtra / totalMoney) * 100).toFixed(1) : 0;

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
              <p className="text-secondary-600">Comprehensive monthly financial and meal statistics</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleRefreshData}
              className="btn btn-secondary"
              title="Refresh Data"
            >
              <FaChartLine className="mr-2" />
              Refresh
            </button>
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
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Total Money Card */}
        <StatCard
          title="Total Money"
          value={`৳${totalMoney.toLocaleString()}`}
          subtitle="Total expenses this month"
          icon={GiMoneyStack}
          variant="primary"
          loading={isLoading}
          trend={{
            value: "+15.2",
            label: "vs Last Month",
            suffix: "%"
          }}
        />

        {/* Total Meals Card */}
        <StatCard
          title="Total Meals"
          value={totalMeals.toLocaleString()}
          subtitle="Meals served this month"
          icon={IoFastFoodOutline}
          variant="success"
          loading={isLoading}
          trend={{
            value: "+8.7",
            label: "vs Last Month",
            suffix: "%"
          }}
        />

        {/* Total Extra Card */}
        <StatCard
          title="Total Extra"
          value={`৳${totalExtra.toLocaleString()}`}
          subtitle="Extra charges collected"
          icon={GiTakeMyMoney}
          variant="warning"
          loading={isLoading}
          trend={{
            value: "+12.3",
            label: "vs Last Month",
            suffix: "%"
          }}
        />
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Financial Summary */}
        <ModernCard title="Financial Summary" className="h-full">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-primary-50 rounded-xl">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <FaMoneyBillWave className="text-2xl text-primary-600" />
                </div>
                <h3 className="text-2xl font-bold text-primary-900">
                  ৳{totalMoney.toLocaleString()}
                </h3>
                <p className="text-sm text-primary-600">Total Expenses</p>
              </div>

              <div className="text-center p-4 bg-success-50 rounded-xl">
                <div className="w-12 h-12 bg-success-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <FaPlus className="text-2xl text-success-600" />
                </div>
                <h3 className="text-2xl font-bold text-success-900">
                  ৳{totalExtra.toLocaleString()}
                </h3>
                <p className="text-sm text-success-600">Extra Income</p>
              </div>
            </div>

            <div className="bg-secondary-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-secondary-700">Extra Income Ratio</span>
                <span className="text-sm font-bold text-secondary-900">{extraPercentage}%</span>
              </div>
              <div className="w-full bg-secondary-200 rounded-full h-2">
                <div
                  className="bg-gradient-success h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(extraPercentage, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </ModernCard>

        {/* Meal Statistics */}
        <ModernCard title="Meal Statistics" className="h-full">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-primary-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                    <IoFastFoodOutline className="text-primary-600" />
                  </div>
                  <span className="font-medium text-primary-900">Total Meals</span>
                </div>
                <span className="font-bold text-primary-900">{totalMeals.toLocaleString()}</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-success-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-success-100 rounded-lg flex items-center justify-center">
                    <FaMoneyBillWave className="text-success-600" />
                  </div>
                  <span className="font-medium text-success-900">Average Cost per Meal</span>
                </div>
                <span className="font-bold text-success-900">৳{averageMealCost}</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-warning-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-warning-100 rounded-lg flex items-center justify-center">
                    <FaCalendarAlt className="text-warning-600" />
                  </div>
                  <span className="font-medium text-warning-900">Daily Average</span>
                </div>
                <span className="font-bold text-warning-900">
                  {Math.round(totalMeals / 30).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-success-50 to-primary-50 rounded-xl p-4">
              <h4 className="font-semibold text-secondary-900 mb-2">Monthly Insights</h4>
              <ul className="space-y-2 text-sm text-secondary-600">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success-500 rounded-full"></div>
                  <span>Average daily meal count: {Math.round(totalMeals / 30)}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-warning-500 rounded-full"></div>
                  <span>Extra income represents {extraPercentage}% of total</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  <span>Cost per meal: ৳{averageMealCost}</span>
                </li>
              </ul>
            </div>
          </div>
        </ModernCard>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ModernCard className="text-center hover:scale-105 transition-transform duration-200 cursor-pointer">
          <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FaChartBar className="text-3xl text-primary-600" />
          </div>
          <h3 className="text-lg font-semibold text-secondary-900 mb-2">Detailed Analytics</h3>
          <p className="text-sm text-secondary-600">View comprehensive monthly breakdown</p>
        </ModernCard>

        <ModernCard className="text-center hover:scale-105 transition-transform duration-200 cursor-pointer">
          <div className="w-16 h-16 bg-success-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FaDownload className="text-3xl text-success-600" />
          </div>
          <h3 className="text-lg font-semibold text-secondary-900 mb-2">Export Data</h3>
          <p className="text-sm text-secondary-600">Download report in various formats</p>
        </ModernCard>

        <ModernCard className="text-center hover:scale-105 transition-transform duration-200 cursor-pointer">
          <div className="w-16 h-16 bg-warning-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FaUsers className="text-3xl text-warning-600" />
          </div>
          <h3 className="text-lg font-semibold text-secondary-900 mb-2">Member Reports</h3>
          <p className="text-sm text-secondary-600">Individual member meal statistics</p>
        </ModernCard>
      </div>
    </>
  );
};

export default Report;