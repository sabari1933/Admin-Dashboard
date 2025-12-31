import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Clock4,
  Download,
  Search,
  User,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  RefreshCw,
  Plus,
} from 'lucide-react';

function Attendance() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [stats, setStats] = useState({
    total_employees: 0,
    present_today: 0,
    absent_today: 0,
    late_today: 0,
    avg_attendance: 0,
    avg_working_hours: 0
  });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('today');
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 20
  });
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');


 const fetchAttendanceData = useCallback(async () => {
  setLoading(true);
  try {
    const token = localStorage.getItem('token');

    let startDate = '';
    let endDate = new Date().toISOString().split('T')[0];

    if (dateRange === 'week') {
      const today = new Date();
      const firstDay = new Date(today.setDate(today.getDate() - today.getDay()));
      startDate = firstDay.toISOString().split('T')[0];
    } else if (dateRange === 'month') {
      const today = new Date();
      startDate = new Date(today.getFullYear(), today.getMonth(), 1)
        .toISOString()
        .split('T')[0];
    } else if (dateRange === 'quarter') {
      const today = new Date();
      const quarter = Math.floor(today.getMonth() / 3);
      startDate = new Date(today.getFullYear(), quarter * 3, 1)
        .toISOString()
        .split('T')[0];
    }

    const params = {
      page: pagination.currentPage,
      limit: pagination.itemsPerPage,
      search: searchTerm,
      department: selectedDepartment,
      status: filter !== 'all' ? filter : '',
      start_date: startDate,
      end_date: endDate
    };

    const response = await axios.get(
      'http://localhost:33/attendance',
      {
        headers: { Authorization: `Bearer ${token}` },
        params
      }
    );

    setAttendanceData(response.data.attendance);
    setPagination(response.data.pagination);
  } catch (error) {
    console.error('Error fetching attendance:', error);
    setAttendanceData([]);
  } finally {
    setLoading(false);
  }
}, [
  pagination.currentPage,
  pagination.itemsPerPage,
  searchTerm,
  selectedDepartment,
  filter,
  dateRange
]);

useEffect(() => {
  fetchAttendanceData();
  fetchStats();
  fetchDepartments();
}, [fetchAttendanceData]);


  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:33/attendance/stats', {
        headers: { Authorization: `Bearer ${token}` }
      });

      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:33/attendance/departments', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const handleMarkAttendance = async (employeeId, status) => {
    try {
      const token = localStorage.getItem('token');
      const today = new Date().toISOString().split('T')[0];
      
      await axios.post('http://localhost:33/attendance/mark', {
        employee_id: employeeId,
        date: today,
        status: status,
        check_in: '09:00',
        check_out: '18:00'
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Refresh data
      fetchAttendanceData();
      fetchStats();
      
      alert(`Attendance marked as ${status} for employee ${employeeId}`);
    } catch (error) {
      console.error('Error marking attendance:', error);
      alert('Failed to mark attendance');
    }
  };

  const handleExport = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:33/attendance', {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          limit: 1000, // Export more records
          status: filter !== 'all' ? filter : '',
          department: selectedDepartment
        }
      });
      
      const data = response.data.attendance;
      const csvContent = [
        ['Employee ID', 'Name', 'Department', 'Date', 'Check In', 'Check Out', 'Status', 'Hours', 'Overtime', 'Notes'],
        ...data.map(row => [
          row.employee_id,
          row.employee_name,
          row.department,
          row.date,
          row.check_in,
          row.check_out,
          row.status,
          row.working_hours,
          row.overtime_hours,
          row.notes || ''
        ])
      ].map(row => row.join(',')).join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `attendance_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting:', error);
      alert('Failed to export data');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      present: 'bg-green-100 text-green-800',
      absent: 'bg-red-100 text-red-800',
      late: 'bg-amber-100 text-amber-800',
      'half-day': 'bg-blue-100 text-blue-800',
      leave: 'bg-purple-100 text-purple-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination.totalPages) {
      setPagination(prev => ({ ...prev, currentPage: page }));
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
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
              <p className="text-3xl font-bold mt-2">{stats.present_today}</p>
              <div className="flex items-center mt-2 text-green-200">
                <TrendingUp size={16} className="mr-1" />
                <span className="text-sm">of {stats.total_employees} employees</span>
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
              <p className="text-3xl font-bold mt-2">{stats.absent_today}</p>
              <div className="flex items-center mt-2 text-red-200">
                <TrendingDown size={16} className="mr-1" />
                <span className="text-sm">Need follow-up</span>
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
              <p className="text-3xl font-bold mt-2">{stats.late_today}</p>
              <div className="flex items-center mt-2 text-amber-200">
                <AlertCircle size={16} className="mr-1" />
                <span className="text-sm">Requires attention</span>
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
              <p className="text-3xl font-bold mt-2">{stats.avg_attendance}%</p>
              <div className="flex items-center mt-2 text-blue-200">
                <TrendingUp size={16} className="mr-1" />
                <span className="text-sm">{stats.avg_working_hours}h avg. work</span>
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
              onKeyPress={(e) => e.key === 'Enter' && fetchAttendanceData()}
            />
          </div>
          
          <div className="flex gap-3">
            <select
              className="appearance-none pl-4 pr-10 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              <option value="">All Departments</option>
              {departments.map((dept, index) => (
                <option key={index} value={dept}>{dept}</option>
              ))}
            </select>
            
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
            
            <button 
              onClick={fetchAttendanceData}
              className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-300"
            >
              <RefreshCw size={20} />
              Refresh
            </button>
            
            <button 
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-300"
            >
              <Download size={20} />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
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
                  {attendanceData.map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50 transition-colors duration-300">
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center mr-3">
                            <User size={18} className="text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{record.employee_name}</p>
                            <p className="text-sm text-gray-600">{record.employee_id}</p>
                            <p className="text-xs text-gray-500">{record.department}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          <Calendar size={16} className="mr-2 text-gray-400" />
                          <span className="text-gray-700">
                            {formatDate(record.date)}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          <Clock size={16} className="mr-2 text-gray-400" />
                          <span className={`font-medium ${
                            record.check_in > '08:30' ? 'text-amber-600' : 'text-green-600'
                          }`}>
                            {record.check_in}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          <Clock size={16} className="mr-2 text-gray-400" />
                          <span className="text-gray-700">{record.check_out}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          <span className="font-medium text-gray-900">{record.working_hours}h</span>
                          {record.overtime_hours > 0 && (
                            <span className="ml-2 px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">
                              +{record.overtime_hours}h OT
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
                          <button 
                            onClick={() => handleMarkAttendance(record.employee_id, 'present')}
                            className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition-colors"
                          >
                            Present
                          </button>
                          <button 
                            onClick={() => handleMarkAttendance(record.employee_id, 'absent')}
                            className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm hover:bg-red-200 transition-colors"
                          >
                            Absent
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
                  Showing {attendanceData.length} of {pagination.totalItems} attendance records
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    disabled={pagination.currentPage === 1}
                    className={`px-4 py-2 rounded-lg border border-gray-300 ${
                      pagination.currentPage === 1 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    } transition-colors duration-300`}
                  >
                    Previous
                  </button>
                  <span className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium">
                    Page {pagination.currentPage} of {pagination.totalPages}
                  </span>
                  <button 
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                    disabled={pagination.currentPage === pagination.totalPages}
                    className={`px-4 py-2 rounded-lg border border-gray-300 ${
                      pagination.currentPage === pagination.totalPages 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    } transition-colors duration-300`}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex justify-end">
        <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg">
          <Plus size={20} />
          Add Attendance
        </button>
      </div>
    </div>
  );
}

export default Attendance;