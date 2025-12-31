import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { 
  Search, 
  Eye, 
  Edit, 
  Trash2, 
  UserPlus,
  Filter,
  Download,
  ChevronDown,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  XCircle,
  Loader2,
  DollarSign,
  MoreVertical,
  ArrowUpDown,
  Users,
  Building
} from "lucide-react";

function Home() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        department: "",
        status: ""
    });
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token'); 
            const res = await axios.get("http://localhost:33/employees", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setData(res.data.employees);
            setFilteredData(res.data.employees);
        } catch (err) {
            if (err.response?.status === 401) {
                alert("Session expired. Please login again.");
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = "/login";
            } else {
                console.error(err);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let results = data.filter(employee => {
            const matchesSearch = Object.values(employee).some(value =>
                String(value).toLowerCase().includes(searchTerm.toLowerCase())
            );
            
            const matchesDepartment = !filters.department || 
                employee.department === filters.department;
            
            const matchesStatus = !filters.status || 
                employee.status === filters.status;

            return matchesSearch && matchesDepartment && matchesStatus;
        });
        
        // Apply sorting
        if (sortConfig.key) {
            results.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        
        setFilteredData(results);
    }, [searchTerm, filters, data, sortConfig]);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this employee?")) return;

        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:33/employees/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setData(prev => prev.filter(item => item.id !== id));
        } catch (err) {
            if (err.response?.status === 403) {
                alert("You are not authorized to delete employees");
            } else if (err.response?.status === 401) {
                alert("Session expired. Please login again.");
                localStorage.clear();
                window.location.href = "/login";
            } else {
                console.error(err);
                alert("Error deleting employee");
            }
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0
        }).format(amount);
    };

    const getStatusBadge = (status) => {
        const statusMap = {
            active: { color: "bg-green-100 text-green-800", label: "Active" },
            inactive: { color: "bg-red-100 text-red-800", label: "Inactive" },
            on_leave: { color: "bg-amber-100 text-amber-800", label: "On Leave" }
        };
        
        const config = statusMap[status] || { color: "bg-gray-100 text-gray-800", label: "Unknown" };
        
        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
                {config.label}
            </span>
        );
    };

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return <ArrowUpDown size={14} />;
        return sortConfig.direction === 'ascending' ? '↑' : '↓';
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
       
            
            <main className="flex-1 p-6 overflow-y-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Employee Management</h1>
                            <p className="text-gray-600 mt-2">Manage your employee records and information</p>
                        </div>
                        <Link to="/create">
                            <button className="mt-4 md:mt-0 flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                                <UserPlus size={20} />
                                Add New Employee
                            </button>
                        </Link>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm font-medium">Total Employees</p>
                                    <p className="text-3xl font-bold mt-2 text-gray-900">{data.length}</p>
                                </div>
                                <div className="p-3 bg-blue-50 rounded-xl">
                                    <Users className="text-blue-600" size={24} />
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm font-medium">Active Employees</p>
                                    <p className="text-3xl font-bold mt-2 text-gray-900">
                                        {data.filter(e => e.status === 'active').length}
                                    </p>
                                </div>
                                <div className="p-3 bg-green-50 rounded-xl">
                                    <CheckCircle className="text-green-600" size={24} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm font-medium">Avg. Salary</p>
                                    <p className="text-3xl font-bold mt-2 text-gray-900">
                                        {formatCurrency(
                                            data.reduce((acc, emp) => acc + (parseFloat(emp.salary) || 0), 0) / (data.length || 1)
                                        )}
                                    </p>
                                </div>
                                <div className="p-3 bg-purple-50 rounded-xl">
                                    <DollarSign className="text-purple-600" size={24} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm font-medium">Departments</p>
                                    <p className="text-3xl font-bold mt-2 text-gray-900">
                                        {[...new Set(data.map(emp => emp.department))].length}
                                    </p>
                                </div>
                                <div className="p-3 bg-amber-50 rounded-xl">
                                    <Building className="text-amber-600" size={24} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Filter Bar */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-200">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search employees by name, email, department, position..."
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        
                        <div className="flex gap-3">
                            <div className="relative">
                                <select
                                    className="appearance-none pl-4 pr-10 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-48"
                                    value={filters.department}
                                    onChange={(e) => setFilters({...filters, department: e.target.value})}
                                >
                                    <option value="">All Departments</option>
                                    <option value="Engineering">Engineering</option>
                                    <option value="Sales">Sales</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="HR">HR</option>
                                    <option value="Finance">Finance</option>
                                    <option value="Operations">Operations</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            </div>
                            
                            <div className="relative">
                                <select
                                    className="appearance-none pl-4 pr-10 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-40"
                                    value={filters.status}
                                    onChange={(e) => setFilters({...filters, status: e.target.value})}
                                >
                                    <option value="">All Status</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                    <option value="on_leave">On Leave</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            </div>
                            
                            <button 
                                onClick={() => {
                                    setSearchTerm('');
                                    setFilters({ department: "", status: "" });
                                    setSortConfig({ key: null, direction: 'ascending' });
                                }}
                                className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-300"
                            >
                                <Filter size={20} />
                                Clear Filters
                            </button>
                        </div>
                    </div>
                </div>

                {/* Employee Table */}
                {loading ? (
                    <div className="flex justify-center items-center h-64 bg-white rounded-2xl shadow-lg">
                        <Loader2 className="animate-spin text-blue-600" size={48} />
                    </div>
                ) : filteredData.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                        <div className="max-w-md mx-auto">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search size={32} className="text-gray-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No employees found</h3>
                            <p className="text-gray-600 mb-6">
                                {searchTerm || filters.department || filters.status 
                                    ? 'No employees match your search criteria.' 
                                    : 'No employee records available. Add your first employee!'}
                            </p>
                            {(searchTerm || filters.department || filters.status) && (
                                <button
                                    onClick={() => {
                                        setSearchTerm('');
                                        setFilters({ department: "", status: "" });
                                    }}
                                    className="text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    Clear all filters
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th 
                                            scope="col" 
                                            className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                            onClick={() => handleSort('employee_name')}
                                        >
                                            <div className="flex items-center gap-1">
                                                Employee
                                                <span className="text-gray-400">{getSortIcon('employee_name')}</span>
                                            </div>
                                        </th>
                                        <th 
                                            scope="col" 
                                            className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                            onClick={() => handleSort('department')}
                                        >
                                            <div className="flex items-center gap-1">
                                                Department
                                                <span className="text-gray-400">{getSortIcon('department')}</span>
                                            </div>
                                        </th>
                                        <th 
                                            scope="col" 
                                            className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                            onClick={() => handleSort('position')}
                                        >
                                            <div className="flex items-center gap-1">
                                                Position
                                                <span className="text-gray-400">{getSortIcon('position')}</span>
                                            </div>
                                        </th>
                                        <th 
                                            scope="col" 
                                            className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                            onClick={() => handleSort('status')}
                                        >
                                            <div className="flex items-center gap-1">
                                                Status
                                                <span className="text-gray-400">{getSortIcon('status')}</span>
                                            </div>
                                        </th>
                                        <th 
                                            scope="col" 
                                            className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                            onClick={() => handleSort('salary')}
                                        >
                                            <div className="flex items-center gap-1">
                                                Salary
                                                <span className="text-gray-400">{getSortIcon('salary')}</span>
                                            </div>
                                        </th>
                                        <th 
                                            scope="col" 
                                            className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                            onClick={() => handleSort('join_date')}
                                        >
                                            <div className="flex items-center gap-1">
                                                Join Date
                                                <span className="text-gray-400">{getSortIcon('join_date')}</span>
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredData.map((employee) => (
                                        <tr key={employee.id} className="hover:bg-gray-50 transition-colors duration-150">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
                                                        <span className="text-white font-semibold">
                                                            {employee.employee_name?.charAt(0) || '?'}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {employee.employee_name}
                                                        </div>
                                                        <div className="text-sm text-gray-500 flex items-center mt-1">
                                                            <Mail size={12} className="mr-1" />
                                                            {employee.email || 'No email'}
                                                        </div>
                                                        <div className="text-sm text-gray-500 flex items-center">
                                                            <Phone size={12} className="mr-1" />
                                                            {employee.phone || 'No phone'}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                                                        <Building size={16} className="text-blue-600" />
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-900">
                                                        {employee.department || 'N/A'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-900 font-medium">
                                                    {employee.position || 'N/A'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {getStatusBadge(employee.status)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-semibold text-gray-900">
                                                    {formatCurrency(parseFloat(employee.salary) || 0)}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    Monthly: {formatCurrency(parseFloat(employee.salary) / 12 || 0)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-900">
                                                    {formatDate(employee.join_date)}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    DOB: {formatDate(employee.dob)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-2">
                                                    <Link to={`/read/${employee.id}`}>
                                                        <button 
                                                            className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors duration-300" 
                                                            title="View Details"
                                                        >
                                                            <Eye size={16} />
                                                        </button>
                                                    </Link>
                                                    <Link to={`/edit/${employee.id}`}>
                                                        <button 
                                                            className="p-2 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 transition-colors duration-300" 
                                                            title="Edit"
                                                        >
                                                            <Edit size={16} />
                                                        </button>
                                                    </Link>
                                                    <button 
                                                        onClick={() => handleDelete(employee.id)}
                                                        className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors duration-300" 
                                                        title="Delete"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        
                        {/* Table Footer with Pagination */}
                        <div className="px-6 py-4 border-t border-gray-200">
                            <div className="flex flex-col md:flex-row justify-between items-center">
                                <div className="text-sm text-gray-600 mb-4 md:mb-0">
                                    Showing <span className="font-semibold">{filteredData.length}</span> of{" "}
                                    <span className="font-semibold">{filteredData.length}</span> employees
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300">
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
                )}

                {/* Footer Note */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500">
                        © {new Date().getFullYear()} Employee Management System. All rights reserved.
                    </p>
                </div>
            </main>
        </div>
    );
}

export default Home;