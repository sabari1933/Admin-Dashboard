import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Clock4,
  Filter,
  Download,
  Search,
  User,
  TrendingUp,
  TrendingDown,
  MoreVertical,
  AlertCircle
} from 'lucide-react';

function Attendance() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [filter, setFilter] = useState('all');
  const [dateRange, setDateRange] = useState('today');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Mock data - replace with API call
    const mockData = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      employeeId: `EMP${String(i + 101).padStart(3, '0')}`,
      name: ['John Smith', 'Sarah Johnson', 'Mike Wilson', 'Lisa Brown', 'David Lee'][i % 5],
      department: ['Engineering', 'Sales', 'Marketing', 'HR', 'Finance'][i % 5],
      date: new Date(2024, 11, 15 + Math.floor(i / 4)).toISOString().split('T')[0],
      checkIn: '08:' + String(Math.floor(Math.random() * 30)).padStart(2, '0') + ':00',
      checkOut: '17:' + String(Math.floor(Math.random() * 30)).padStart(2, '0') + ':00',
      status: ['present', 'absent', 'late', 'half-day'][Math.floor(Math.random() * 4)],
      hours: 8 + Math.random() * 2,
      overtime: Math.random() > 0.7 ? Math.floor(Math.random() * 3) : 0
    }));
    setAttendanceData(mockData);
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      present: 'bg-green-100 text-green-800',
      absent: 'bg-red-100 text-red-800',
      late: 'bg-amber-100 text-amber-800',
      'half-day': 'bg-blue-100 text-blue-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const filteredData = attendanceData.filter(item => {
    if (filter !== 'all' && item.status !== filter) return false;
    if (searchTerm && !item.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !item.employeeId.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const stats = {
    totalEmployees: 156,
    presentToday: 142,
    absentToday: 14,
    lateToday: 8,
    avgAttendance: 94.2,
    avgWorkingHours: 8.5
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
     
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Attendance Management</h1>
          <p className="text-gray-600 mt-2">Track and manage employee attendance records</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Present Today</p>
                <p className="text-3xl font-bold mt-2">{stats.presentToday}</p>
                <div className="flex items-center mt-2 text-green-200">
                  <TrendingUp size={16} className="mr-1" />
                  <span className="text-sm">+2.1% from yesterday</span>
                </div>
              </div>
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <CheckCircle size={24} />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100">Absent Today</p>
                <p className="text-3xl font-bold mt-2">{stats.absentToday}</p>
                <div className="flex items-center mt-2 text-red-200">
                  <TrendingDown size={16} className="mr-1" />
                  <span className="text-sm">-1.3% from yesterday</span>
                </div>
              </div>
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <XCircle size={24} />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-100">Late Arrivals</p>
                <p className="text-3xl font-bold mt-2">{stats.lateToday}</p>
                <div className="flex items-center mt-2 text-amber-200">
                  <AlertCircle size={16} className="mr-1" />
                  <span className="text-sm">Need attention</span>
                </div>
              </div>
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Clock4 size={24} />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Avg. Attendance</p>
                <p className="text-3xl font-bold mt-2">{stats.avgAttendance}%</p>
                <div className="flex items-center mt-2 text-blue-200">
                  <TrendingUp size={16} className="mr-1" />
                  <span className="text-sm">+0.8% from last month</span>
                </div>
              </div>
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <TrendingUp size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by employee name or ID..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-3">
              <div className="relative">
                <select
                  className="appearance-none pl-4 pr-10 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="present">Present</option>
                  <option value="absent">Absent</option>
                  <option value="late">Late</option>
                  <option value="half-day">Half Day</option>
                </select>
              </div>
              
              <div className="relative">
                <select
                  className="appearance-none pl-4 pr-10 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                >
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                </select>
              </div>
              
              <button className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-300">
                <Filter size={20} />
                Filter
              </button>
              
              <button className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-300">
                <Download size={20} />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Attendance Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <tr>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700">Employee</th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700">Date</th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700">Check In</th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700">Check Out</th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700">Hours</th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700">Status</th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredData.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50 transition-colors duration-300">
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center mr-3">
                          <User size={18} className="text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{record.name}</p>
                          <p className="text-sm text-gray-600">{record.employeeId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <Calendar size={16} className="mr-2 text-gray-400" />
                        <span className="text-gray-700">
                          {new Date(record.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <Clock size={16} className="mr-2 text-gray-400" />
                        <span className={`font-medium ${
                          record.checkIn > '08:30:00' ? 'text-amber-600' : 'text-green-600'
                        }`}>
                          {record.checkIn}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <Clock size={16} className="mr-2 text-gray-400" />
                        <span className="text-gray-700">{record.checkOut}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <span className="font-medium text-gray-900">{record.hours.toFixed(1)}h</span>
                        {record.overtime > 0 && (
                          <span className="ml-2 px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">
                            +{record.overtime}h OT
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(record.status)}`}>
                        {record.status === 'present' && <CheckCircle size={14} className="mr-1" />}
                        {record.status === 'absent' && <XCircle size={14} className="mr-1" />}
                        {record.status === 'late' && <Clock4 size={14} className="mr-1" />}
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors duration-300">
                          <MoreVertical size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-sm text-gray-600 mb-4 md:mb-0">
                Showing <span className="font-semibold">{filteredData.length}</span> attendance records
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors duration-300">
                  Previous
                </button>
                <span className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium">1</span>
                <button className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors duration-300">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar View Section */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Monthly Attendance Overview</h2>
          <div className="grid grid-cols-7 gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center font-medium text-gray-700 py-2">
                {day}
              </div>
            ))}
            {Array.from({ length: 31 }, (_, i) => {
              const isPresent = Math.random() > 0.2;
              const isToday = i === 14; // Mock today
              return (
                <div
                  key={i}
                  className={`h-12 rounded-lg flex items-center justify-center ${
                    isToday
                      ? 'ring-2 ring-blue-500 ring-inset'
                      : ''
                  } ${
                    isPresent
                      ? 'bg-green-100 text-green-800 hover:bg-green-200'
                      : 'bg-red-100 text-red-800 hover:bg-red-200'
                  } cursor-pointer transition-colors duration-200`}
                >
                  {i + 1}
                </div>
              );
            })}
          </div>
          <div className="mt-6 flex items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-100 rounded"></div>
              <span className="text-gray-600">Present</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-100 rounded"></div>
              <span className="text-gray-600">Absent</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 ring-2 ring-blue-500 ring-inset rounded"></div>
              <span className="text-gray-600">Today</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Attendance;