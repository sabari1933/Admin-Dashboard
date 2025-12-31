// Fixed EmployeeForm.jsx with Sidebar and join_date field
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import { 
  Save,
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  Briefcase,
  Building,
  CheckCircle,
  AlertTriangle,
  Clock
} from "lucide-react";

function EmployeeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  
  const mode = id ? "edit" : "create";
  
  const [formData, setFormData] = useState({
    employee_name: "",
    employee_address: "",
    dob: "",
    join_date: "", // Added join_date
    salary: "",
    email: "",
    phone: "",
    department: "",
    position: "",
    status: "active",
    gender: "", 
    emergency_contact: "",
    emergency_name: "" 
  });

  useEffect(() => {
    if (mode === "edit" && id) {
      setLoading(true);
      axios.get(`http://localhost:33/employees/singledata/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
        .then(res => {
          setFormData({
            ...res.data,
            dob: formatDateForInput(res.data.dob),
            join_date: formatDateForInput(res.data.join_date),
            gender: res.data.gender || "",
            emergency_contact: res.data.emergency_contact || "",
            emergency_name: res.data.emergency_name || "",
            phone: res.data.phone || "",
            employee_address: res.data.employee_address || "",
            salary: res.data.salary || "",
            email: res.data.email || "",
            department: res.data.department || "",
            position: res.data.position || ""
          });
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          if (err.response?.status === 401) {
            localStorage.clear();
            navigate("/login");
          }
          setLoading(false);
        });
    } else {
      // Set default join_date to today for new employees
      setFormData(prev => ({
        ...prev,
        join_date: new Date().toISOString().split('T')[0]
      }));
    }
  }, [id, mode, navigate]);

  const formatDateForInput = (date) => {
  if (!date) return "";
  return new Date(date).toISOString().split("T")[0];
};

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.employee_name.trim()) newErrors.employee_name = "Employee name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.dob) newErrors.dob = "Date of birth is required";
    if (!formData.join_date) newErrors.join_date = "Join date is required";
    if (!formData.department) newErrors.department = "Department is required";
    if (!formData.position) newErrors.position = "Position is required";
    if (!formData.salary) newErrors.salary = "Salary is required";
    else if (parseFloat(formData.salary) <= 0) newErrors.salary = "Salary must be greater than 0";
    
    // Date validation
    if (formData.dob && formData.join_date) {
      const dobDate = new Date(formData.dob);
      const joinDate = new Date(formData.join_date);
      if (joinDate < dobDate) {
        newErrors.join_date = "Join date cannot be before date of birth";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      const url = mode === "edit" 
        ? `http://localhost:33/employees/update/${id}`
        : "http://localhost:33/employees/create";

      const method = mode === "edit" ? "put" : "post";
      
      // Get token from localStorage
      const token = localStorage.getItem("token");
      
      if (!token) {
        throw new Error("No authentication token found");
      }

      // Prepare data
      const payload = { 
        ...formData,
        salary: parseFloat(formData.salary)
      };
      
      console.log("Submitting data:", payload);
      
      const response = await axios({
        method,
        url,
        data: payload,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      console.log("Response:", response.data);
      
      setSuccess(true);
      setTimeout(() => navigate("/home"), 1500);

    } catch (error) {
      console.error("Submission error:", error);
      
      if (error.response?.status === 401) {
        localStorage.clear();
        navigate("/login");
      } else if (error.response?.status === 404) {
        setErrors({
          submit: "API endpoint not found. Please check server configuration."
        });
      } else if (error.response?.data?.error) {
        setErrors({
          submit: error.response.data.error
        });
      } else {
        setErrors({
          submit: error.response?.data?.message || "Error saving employee data"
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (loading && mode === "edit") {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading employee data...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
  
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="mb-8 flex flex-col items-center text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            {mode === "create" ? "Add New Employee" : "Edit Employee"}
          </h1>
          <p className="text-gray-600 mt-2">
            {mode === "create"
              ? "Add a new employee to the system"
              : "Update employee information"}
          </p>
        </div>

        {errors.submit && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
            <AlertTriangle className="text-red-600 mt-0.5" size={24} />
            <div>
              <p className="font-medium text-red-800">Submission Error</p>
              <p className="text-red-700">{errors.submit}</p>
            </div>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3">
            <CheckCircle className="text-green-600 mt-0.5" size={24} />
            <div>
              <p className="font-medium text-green-800">
                Employee {mode === "create" ? "created" : "updated"} successfully!
              </p>
              <p className="text-green-700">Redirecting to employee list...</p>
            </div>
          </div>
        )}

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information Section */}
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <User size={24} className="text-blue-600" />
                  Personal Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="text"
                        name="employee_name"
                        value={formData.employee_name}
                        onChange={handleChange}
                        className={`w-full pl-12 pr-4 py-3 border ${errors.employee_name ? 'border-red-300' : 'border-gray-300'} rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
                        placeholder="John Doe"
                      />
                    </div>
                    {errors.employee_name && <p className="text-sm text-red-600 mt-1">{errors.employee_name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full pl-12 pr-4 py-3 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
                        placeholder="john@example.com"
                      />
                    </div>
                    {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date of Birth *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        className={`w-full pl-12 pr-4 py-3 border ${errors.dob ? 'border-red-300' : 'border-gray-300'} rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
                      />
                    </div>
                    {errors.dob && <p className="text-sm text-red-600 mt-1">{errors.dob}</p>}
                  </div>

                  {/* Join Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Join Date *
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="date"
                        name="join_date"
                        value={formData.join_date}
                        onChange={handleChange}
                        className={`w-full pl-12 pr-4 py-3 border ${errors.join_date ? 'border-red-300' : 'border-gray-300'} rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
                      />
                    </div>
                    {errors.join_date && <p className="text-sm text-red-600 mt-1">{errors.join_date}</p>}
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Emergency Contact */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Emergency Contact Name
                    </label>
                    <input
                      type="text"
                      name="emergency_name"
                      value={formData.emergency_name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Emergency contact name"
                    />
                  </div>

                  {/* Emergency Contact Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Emergency Contact Phone
                    </label>
                    <input
                      type="tel"
                      name="emergency_contact"
                      value={formData.emergency_contact}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="+1 (555) 987-6543"
                    />
                  </div>

                  {/* Address */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                      <textarea
                        name="employee_address"
                        value={formData.employee_address}
                        onChange={handleChange}
                        rows="3"
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                        placeholder="123 Main St, City, State, ZIP"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Employment Information Section */}
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Briefcase size={24} className="text-green-600" />
                  Employment Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Department */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Department *
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <select
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        className={`w-full pl-12 pr-4 py-3 border ${errors.department ? 'border-red-300' : 'border-gray-300'} rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
                      >
                        <option value="">Select Department</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Sales">Sales</option>
                        <option value="Marketing">Marketing</option>
                        <option value="HR">HR</option>
                        <option value="Finance">Finance</option>
                        <option value="Operations">Operations</option>
                      </select>
                    </div>
                    {errors.department && <p className="text-sm text-red-600 mt-1">{errors.department}</p>}
                  </div>

                  {/* Position */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Position *
                    </label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="text"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        className={`w-full pl-12 pr-4 py-3 border ${errors.position ? 'border-red-300' : 'border-gray-300'} rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
                        placeholder="Software Engineer"
                      />
                    </div>
                    {errors.position && <p className="text-sm text-red-600 mt-1">{errors.position}</p>}
                  </div>

                  {/* Salary */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Salary ($) *
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="number"
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                        className={`w-full pl-12 pr-4 py-3 border ${errors.salary ? 'border-red-300' : 'border-gray-300'} rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
                        placeholder="50000"
                        min="0"
                        step="1000"
                      />
                    </div>
                    {errors.salary && <p className="text-sm text-red-600 mt-1">{errors.salary}</p>}
                    {formData.salary && (
                      <p className="text-sm text-gray-600 mt-1">
                        Monthly: {formatCurrency(parseFloat(formData.salary) / 12)}
                      </p>
                    )}
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="on_leave">On Leave</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors duration-300"
                  >
                    <ArrowLeft size={20} />
                    Back
                  </button>
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        {mode === "create" ? "Creating..." : "Updating..."}
                      </>
                    ) : (
                      <>
                        <Save size={20} />
                        {mode === "create" ? "Create Employee" : "Update Employee"}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default EmployeeForm;