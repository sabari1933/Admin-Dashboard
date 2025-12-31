import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import {
  DollarSign,
  CreditCard,
  Banknote,
  TrendingUp,
  TrendingDown,
  Download,
  Filter,
  Search,
  Calendar,
  MoreVertical,
  CheckCircle,
  Clock,
  AlertCircle,
  Receipt,
  Calculator
} from 'lucide-react';

function Payroll() {
  const [payrollData, setPayrollData] = useState([]);
  const [filter, setFilter] = useState('all');
  const [period, setPeriod] = useState('december-2024');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const mockData = Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      employeeId: `EMP${String(i + 101).padStart(3, '0')}`,
      name: ['John Smith', 'Sarah Johnson', 'Mike Wilson', 'Lisa Brown'][i % 4],
      department: ['Engineering', 'Sales', 'Marketing', 'HR'][i % 4],
      baseSalary: 5000 + Math.random() * 5000,
      bonus: Math.random() > 0.5 ? Math.random() * 2000 : 0,
      deductions: Math.random() * 1000,
      netSalary: 0,
      status: ['paid', 'pending', 'processing'][Math.floor(Math.random() * 3)],
      paymentMethod: ['Bank Transfer', 'Check', 'Cash'][Math.floor(Math.random() * 3)],
      paymentDate: new Date(2024, 11, 15 + i).toISOString().split('T')[0]
    })).map(item => ({
      ...item,
      netSalary: item.baseSalary + item.bonus - item.deductions
    }));
    setPayrollData(mockData);
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      paid: 'bg-green-100 text-green-800',
      pending: 'bg-amber-100 text-amber-800',
      processing: 'bg-blue-100 text-blue-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const stats = {
    totalPayroll: 1254000,
    processed: 1020000,
    pending: 234000,
    employeesPaid: 142,
    averageSalary: 5200,
    taxDeductions: 156000
  };

  const filteredData = payrollData.filter(item => {
    if (filter !== 'all' && item.status !== filter) return false;
    if (searchTerm && !item.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const totalPayroll = filteredData.reduce((sum, item) => sum + item.netSalary, 0);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* <Sidebar /> */}
      
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Payroll Management</h1>
          <p className="text-gray-600 mt-2">Process and manage employee salaries</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Total Payroll</p>
                <p className="text-3xl font-bold mt-2">{formatCurrency(stats.totalPayroll)}</p>
                <div className="flex items-center mt-2 text-blue-200">
                  <TrendingUp size={16} className="mr-1" />
                  <span className="text-sm">+5.2% from last month</span>
                </div>
              </div>
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <DollarSign size={24} />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Employees Paid</p>
                <p className="text-3xl font-bold mt-2">{stats.employeesPaid}</p>
                <div className="flex items-center mt-2 text-green-200">
                  <CheckCircle size={16} className="mr-1" />
                  <span className="text-sm">142 out of 156 employees</span>
                </div>
              </div>
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <CreditCard size={24} />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Pending Payments</p>
                <p className="text-3xl font-bold mt-2">{formatCurrency(stats.pending)}</p>
                <div className="flex items-center mt-2 text-purple-200">
                  <Clock size={16} className="mr-1" />
                  <span className="text-sm">14 employees pending</span>
                </div>
              </div>
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <AlertCircle size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <button className="flex items-center justify-center gap-2 p-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-300">
            <Calculator size={20} className="text-blue-600" />
            <span className="font-medium text-gray-900">Process Payroll</span>
          </button>
          <button className="flex items-center justify-center gap-2 p-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-300">
            <Receipt size={20} className="text-green-600" />
            <span className="font-medium text-gray-900">Generate Payslips</span>
          </button>
          <button className="flex items-center justify-center gap-2 p-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-300">
            <Banknote size={20} className="text-purple-600" />
            <span className="font-medium text-gray-900">Run Payments</span>
          </button>
          <button className="flex items-center justify-center gap-2 p-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-300">
            <Download size={20} className="text-amber-600" />
            <span className="font-medium text-gray-900">Export Reports</span>
          </button>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search employees..."
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
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                </select>
              </div>
              
              <div className="relative">
                <select
                  className="appearance-none pl-4 pr-10 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                >
                  <option value="december-2024">December 2024</option>
                  <option value="november-2024">November 2024</option>
                  <option value="october-2024">October 2024</option>
                  <option value="september-2024">September 2024</option>
                </select>
              </div>
              
              <button className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-300">
                <Filter size={20} />
                Filter
              </button>
            </div>
          </div>
        </div>

        {/* Payroll Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <tr>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700">Employee</th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700">Base Salary</th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700">Bonus</th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700">Deductions</th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700">Net Salary</th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700">Status</th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700">Payment Date</th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-300">
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-600">{item.employeeId} • {item.department}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-medium text-gray-900">{formatCurrency(item.baseSalary)}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-medium text-green-600">{formatCurrency(item.bonus)}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-medium text-red-600">{formatCurrency(item.deductions)}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-bold text-gray-900">{formatCurrency(item.netSalary)}</div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
                        {item.status === 'paid' && <CheckCircle size={14} className="mr-1" />}
                        {item.status === 'pending' && <Clock size={14} className="mr-1" />}
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <Calendar size={16} className="mr-2 text-gray-400" />
                        <span className="text-gray-700">
                          {new Date(item.paymentDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-300 text-sm">
                          Process
                        </button>
                        <button className="p-1.5 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors duration-300">
                          <MoreVertical size={16} />
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
                <span className="font-semibold">{filteredData.length}</span> employees • 
                Total Payroll: <span className="font-bold text-gray-900">{formatCurrency(totalPayroll)}</span>
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

        {/* Summary Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4">Payroll Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Base Salary</span>
                <span className="font-medium text-gray-900">{formatCurrency(980000)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Bonuses</span>
                <span className="font-medium text-green-600">{formatCurrency(124000)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Deductions</span>
                <span className="font-medium text-red-600">{formatCurrency(156000)}</span>
              </div>
              <div className="pt-3 border-t border-gray-200">
                <div className="flex justify-between">
                  <span className="font-bold text-gray-900">Net Payroll</span>
                  <span className="font-bold text-gray-900">{formatCurrency(stats.totalPayroll)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4">Payment Status</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Paid</span>
                  <span className="text-sm font-medium text-gray-900">91%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '91%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Pending</span>
                  <span className="text-sm font-medium text-gray-900">6%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '6%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Processing</span>
                  <span className="text-sm font-medium text-gray-900">3%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '3%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4">Payment Methods</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <CreditCard size={16} className="text-blue-600" />
                  </div>
                  <span className="text-gray-700">Bank Transfer</span>
                </div>
                <span className="font-medium text-gray-900">78%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <Receipt size={16} className="text-green-600" />
                  </div>
                  <span className="text-gray-700">Check</span>
                </div>
                <span className="font-medium text-gray-900">15%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                    <Banknote size={16} className="text-purple-600" />
                  </div>
                  <span className="text-gray-700">Cash</span>
                </div>
                <span className="font-medium text-gray-900">7%</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Payroll;