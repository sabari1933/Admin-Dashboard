import React, { useState } from 'react';

import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Download,
  Filter,
  Calendar,
  Users,
  DollarSign,
  Clock,
  Building,
  Eye,
  RefreshCw,
  Printer
} from 'lucide-react';

function Reports() {
  const [activeReport, setActiveReport] = useState('overview');
  const [dateRange, setDateRange] = useState('last-month');

  const reports = [
    { id: 'overview', name: 'Overview', icon: <BarChart3 size={20} /> },
    { id: 'attendance', name: 'Attendance', icon: <Clock size={20} /> },
    { id: 'payroll', name: 'Payroll', icon: <DollarSign size={20} /> },
    { id: 'employees', name: 'Employees', icon: <Users size={20} /> },
    { id: 'department', name: 'Department', icon: <Building size={20} /> },
  ];

  const metrics = [
    { name: 'Total Employees', value: '156', change: '+5.2%', trend: 'up', color: 'blue' },
    { name: 'Avg. Attendance', value: '94.2%', change: '+0.8%', trend: 'up', color: 'green' },
    { name: 'Monthly Payroll', value: '$1.25M', change: '-2.1%', trend: 'down', color: 'purple' },
    { name: 'Active Projects', value: '8', change: '+2', trend: 'up', color: 'amber' },
  ];

  const departmentData = [
    { name: 'Engineering', employees: 42, revenue: 1200000, color: 'from-blue-500 to-cyan-500' },
    { name: 'Sales', employees: 28, revenue: 1800000, color: 'from-purple-500 to-pink-500' },
    { name: 'Marketing', employees: 24, revenue: 800000, color: 'from-green-500 to-emerald-500' },
    { name: 'HR', employees: 18, revenue: 400000, color: 'from-amber-500 to-orange-500' },
    { name: 'Finance', employees: 16, revenue: 600000, color: 'from-red-500 to-rose-500' },
  ];

  const attendanceTrend = [92, 93, 94, 93, 95, 94, 94, 93, 94, 95, 94, 94];
  const payrollTrend = [1100000, 1150000, 1200000, 1180000, 1250000, 1220000, 1200000, 1240000, 1254000, 1270000, 1260000, 1254000];

  return (
    <div className="flex min-h-screen bg-gray-50">

      
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytics & Reports</h1>
              <p className="text-gray-600 mt-2">Comprehensive insights and analytics</p>
            </div>
            <div className="flex items-center gap-3 mt-4 md:mt-0">
              <button className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-300">
                <Printer size={20} />
                Print
              </button>
              <button className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-300">
                <Download size={20} />
                Export PDF
              </button>
            </div>
          </div>
        </div>

        {/* Report Type Navigation */}
        <div className="bg-white rounded-2xl shadow-lg p-2 mb-8 border border-gray-200">
          <div className="flex overflow-x-auto">
            {reports.map((report) => (
              <button
                key={report.id}
                onClick={() => setActiveReport(report.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg whitespace-nowrap transition-all duration-300 ${
                  activeReport === report.id
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {report.icon}
                <span className="font-medium">{report.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Date Range Selector */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="relative">
              <select
                className="appearance-none pl-4 pr-10 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option value="last-week">Last Week</option>
                <option value="last-month">Last Month</option>
                <option value="last-quarter">Last Quarter</option>
                <option value="last-year">Last Year</option>
                <option value="custom">Custom Range</option>
              </select>
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
            <button className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-300">
              <RefreshCw size={20} />
              Refresh Data
            </button>
          </div>
          <button className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-300">
            <Filter size={20} />
            More Filters
          </button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-gray-100 to-gray-50">
                  <div className={`w-6 h-6 bg-${metric.color}-500 rounded-full`}></div>
                </div>
                <span className={`flex items-center text-sm ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  {metric.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{metric.value}</h3>
              <p className="text-gray-600">{metric.name}</p>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Attendance Trend Chart */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Attendance Trend</h2>
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                <Eye size={20} className="text-gray-400" />
              </button>
            </div>
            <div className="h-64 flex items-end gap-1">
              {attendanceTrend.map((value, index) => (
                <div key={index} className="flex-1">
                  <div className="relative group">
                    <div
                      className="w-full bg-gradient-to-t from-green-400 to-emerald-500 rounded-t-lg transition-all duration-300 hover:opacity-90"
                      style={{ height: `${value * 2}px` }}
                    ></div>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {value}%
                    </div>
                  </div>
                  <div className="text-center text-xs text-gray-500 mt-2">
                    {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][index]}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Average: 94.2%
                </div>
                <div className="text-sm text-green-600 flex items-center">
                  <TrendingUp size={16} className="mr-1" />
                  +0.8% from last year
                </div>
              </div>
            </div>
          </div>

          {/* Payroll Trend Chart */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Payroll Trend</h2>
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                <Eye size={20} className="text-gray-400" />
              </button>
            </div>
            <div className="h-64 flex items-end gap-1">
              {payrollTrend.map((value, index) => (
                <div key={index} className="flex-1">
                  <div className="relative group">
                    <div
                      className="w-full bg-gradient-to-t from-blue-400 to-cyan-500 rounded-t-lg transition-all duration-300 hover:opacity-90"
                      style={{ height: `${(value / 1300000) * 200}px` }}
                    ></div>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      ${(value / 1000000).toFixed(1)}M
                    </div>
                  </div>
                  <div className="text-center text-xs text-gray-500 mt-2">
                    {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][index]}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Total: $14.3M
                </div>
                <div className="text-sm text-green-600 flex items-center">
                  <TrendingUp size={16} className="mr-1" />
                  +12.5% from last year
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Department Performance */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Department Performance</h2>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-300">
              <Download size={20} />
              Export Data
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <tr>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700">Department</th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700">Employees</th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700">% of Total</th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700">Revenue</th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700">Avg. Salary</th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700">Performance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {departmentData.map((dept, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors duration-300">
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${dept.color} mr-3`}></div>
                        <span className="font-medium text-gray-900">{dept.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-medium text-gray-900">{dept.employees}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full bg-gradient-to-r ${dept.color}`}
                          style={{ width: `${(dept.employees / 128) * 100}%` }}
                        ></div>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">{((dept.employees / 128) * 100).toFixed(1)}%</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-bold text-gray-900">
                        ${(dept.revenue / 1000000).toFixed(1)}M
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-gray-700">$5,200</div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        index < 2 ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {index < 2 ? 'High' : 'Good'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Employee Distribution */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Employee Distribution</h3>
            <div className="h-64 flex items-center justify-center">
              <div className="relative w-48 h-48">
                {departmentData.map((dept, index, arr) => {
                  const total = arr.reduce((sum, d) => sum + d.employees, 0);
                  const percentage = (dept.employees / total) * 100;
                  const startAngle = arr.slice(0, index).reduce((sum, d) => sum + (d.employees / total) * 360, 0);
                  
                  return (
                    <div
                      key={index}
                      className="absolute inset-0 rounded-full border-8 border-transparent"
                      style={{
                        clipPath: `conic-gradient(${dept.color.split(' ')[1]} 0deg ${percentage}deg, transparent ${percentage}deg)`,
                        transform: `rotate(${startAngle}deg)`,
                      }}
                    ></div>
                  );
                })}
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              {departmentData.map((dept, index) => (
                <div key={index} className="flex items-center">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${dept.color} mr-2`}></div>
                  <span className="text-sm text-gray-700">{dept.name}</span>
                  <span className="ml-auto text-sm font-medium text-gray-900">{dept.employees}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Quick Statistics</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Male Employees</span>
                  <span className="font-medium text-gray-900">58%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '58%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Female Employees</span>
                  <span className="font-medium text-gray-900">42%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-pink-500 rounded-full" style={{ width: '42%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Full-time</span>
                  <span className="font-medium text-gray-900">85%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Part-time</span>
                  <span className="font-medium text-gray-900">15%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '15%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Reports;