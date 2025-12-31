import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Clock, 
  Activity,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical
} from 'lucide-react';

function Dashboard() {
  const [dashboardStats] = useState({
    totalEmployees: 156,
    presentToday: 142,
    onLeave: 14,
    totalPayroll: 1254000,
    activeProjects: 8,
    avgAttendance: 94.2
  });

  const [recentActivities] = useState([
    { id: 1, employee: "John Smith", action: "Clock in", time: "08:00 AM", status: "on-time" },
    { id: 2, employee: "Sarah Johnson", action: "Leave request", time: "10:30 AM", status: "pending" },
    { id: 3, employee: "Mike Wilson", action: "Project completed", time: "Yesterday", status: "completed" },
    { id: 4, employee: "Lisa Brown", action: "Salary credited", time: "2 days ago", status: "processed" },
  ]);

  const [departmentStats] = useState([
    { name: "Engineering", employees: 42, growth: 12, color: "from-blue-500 to-cyan-500" },
    { name: "Sales", employees: 28, growth: 8, color: "from-purple-500 to-pink-500" },
    { name: "Marketing", employees: 24, growth: 15, color: "from-green-500 to-emerald-500" },
    { name: "HR", employees: 18, growth: 5, color: "from-amber-500 to-orange-500" },
    { name: "Finance", employees: 16, growth: 3, color: "from-red-500 to-rose-500" },
  ]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* <Sidebar /> */}
      
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's what's happening today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Total Employees Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50">
                <Users className="text-blue-600" size={24} />
              </div>
              <MoreVertical className="text-gray-400" size={20} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{dashboardStats.totalEmployees}</h3>
            <p className="text-gray-600 mb-2">Total Employees</p>
            <div className="flex items-center text-green-600 text-sm">
              <ArrowUpRight size={16} className="mr-1" />
              <span>+5.2% from last month</span>
            </div>
          </div>

          {/* Attendance Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-green-100 to-green-50">
                <Clock className="text-green-600" size={24} />
              </div>
              <MoreVertical className="text-gray-400" size={20} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{dashboardStats.presentToday}</h3>
            <p className="text-gray-600 mb-2">Present Today</p>
            <div className="flex items-center text-green-600 text-sm">
              <ArrowUpRight size={16} className="mr-1" />
              <span>{dashboardStats.avgAttendance}% attendance rate</span>
            </div>
          </div>

          {/* Payroll Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-100 to-purple-50">
                <DollarSign className="text-purple-600" size={24} />
              </div>
              <MoreVertical className="text-gray-400" size={20} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              ${(dashboardStats.totalPayroll / 1000).toFixed(1)}K
            </h3>
            <p className="text-gray-600 mb-2">Monthly Payroll</p>
            <div className="flex items-center text-red-600 text-sm">
              <ArrowDownRight size={16} className="mr-1" />
              <span>-2.1% from last month</span>
            </div>
          </div>
        </div>

        {/* Charts and Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Department Distribution */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Department Distribution</h2>
              <MoreVertical className="text-gray-400" size={20} />
            </div>
            <div className="space-y-4">
              {departmentStats.map((dept, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700">{dept.name}</span>
                    <span className="text-gray-600">{dept.employees} employees</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${dept.color} rounded-full`}
                      style={{ width: `${(dept.employees / 128) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{((dept.employees / 128) * 100).toFixed(1)}% of total</span>
                    <span className="text-green-600">+{dept.growth}% growth</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
              <MoreVertical className="text-gray-400" size={20} />
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-lg mr-3 ${
                      activity.status === 'completed' ? 'bg-green-100' :
                      activity.status === 'pending' ? 'bg-amber-100' :
                      'bg-blue-100'
                    }`}>
                      <Activity size={16} className={
                        activity.status === 'completed' ? 'text-green-600' :
                        activity.status === 'pending' ? 'text-amber-600' :
                        'text-blue-600'
                      } />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{activity.employee}</p>
                      <p className="text-sm text-gray-600">{activity.action}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{activity.time}</p>
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                      activity.status === 'completed' ? 'bg-green-100 text-green-800' :
                      activity.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Upcoming Events</h2>
            <MoreVertical className="text-gray-400" size={20} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((event) => (
              <div key={event} className="p-4 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors duration-200">
                <div className="flex items-center mb-3">
                  <Calendar className="text-blue-600 mr-2" size={18} />
                  <span className="text-sm text-gray-600">Dec {15 + event}, 2024</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Team Meeting</h4>
                <p className="text-sm text-gray-600 mb-3">Quarterly review meeting</p>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock size={14} className="mr-1" />
                  <span>2:00 PM - 4:00 PM</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;