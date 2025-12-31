import React, { useState } from 'react';
import {
  Building,
  MapPin,
  Phone,
  Mail,
  Globe,
  Users,
  Calendar,
  DollarSign,
  Edit2,
  Save,
  X,
  Upload,
  Briefcase,
  Target,
  Award,
  Heart
} from 'lucide-react';

function Company() {
  const [isEditing, setIsEditing] = useState(false);
  const [companyInfo, setCompanyInfo] = useState({
    name: "Employee Pro Technologies",
    founded: "2015",
    industry: "Technology & Software",
    size: "150-200 Employees",
    revenue: "$25M Annual",
    headquarters: "San Francisco, CA",
    phone: "+1 (555) 123-4567",
    email: "info@employee-pro.com",
    website: "www.employee-pro.com",
    description: "Leading provider of employee management solutions for modern businesses.",
    mission: "To revolutionize workforce management through innovative technology solutions.",
    vision: "Empowering organizations to build better workplaces for their employees.",
    values: ["Innovation", "Integrity", "Collaboration", "Excellence"]
  });

  const departments = [
    { name: "Engineering", head: "John Smith", employees: 42, budget: "$4.2M" },
    { name: "Sales", head: "Sarah Johnson", employees: 28, budget: "$3.8M" },
    { name: "Marketing", head: "Mike Wilson", employees: 24, budget: "$2.5M" },
    { name: "HR", head: "Lisa Brown", employees: 18, budget: "$1.8M" },
    { name: "Finance", head: "David Lee", employees: 16, budget: "$2.2M" },
    { name: "Operations", head: "Emma Davis", employees: 22, budget: "$2.8M" },
  ];

  const milestones = [
    { year: "2015", event: "Company Founded", description: "Started operations in San Francisco" },
    { year: "2017", event: "Series A Funding", description: "Raised $5M in venture capital" },
    { year: "2019", event: "Product Launch", description: "Launched Employee Pro v1.0" },
    { year: "2021", event: "International Expansion", description: "Opened offices in Europe" },
    { year: "2023", event: "Major Update", description: "Released Employee Pro v2.0" },
  ];

  const handleSave = () => {
    // Here you would typically save to an API
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setCompanyInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Company Profile</h1>
              <p className="text-gray-600 mt-2">Manage your organization's information and settings</p>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`mt-4 md:mt-0 flex items-center gap-2 px-6 py-3 rounded-xl transition-colors duration-300 ${
                isEditing
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700'
              }`}
            >
              {isEditing ? <X size={20} /> : <Edit2 size={20} />}
              {isEditing ? 'Cancel Editing' : 'Edit Profile'}
            </button>
          </div>
        </div>

        {/* Company Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Company Card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Company Overview</h2>
                {isEditing && (
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300"
                  >
                    <Save size={18} />
                    Save Changes
                  </button>
                )}
              </div>

              {/* Company Logo and Basic Info */}
              <div className="flex items-start gap-6 mb-8">
                <div className="relative">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <Building size={40} className="text-white" />
                  </div>
                  {isEditing && (
                    <button className="absolute -bottom-2 -right-2 p-2 bg-white rounded-full shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-300">
                      <Upload size={16} />
                    </button>
                  )}
                </div>
                <div className="flex-1">
                  {isEditing ? (
                    <input
                      type="text"
                      value={companyInfo.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className="text-2xl font-bold text-gray-900 mb-2 bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{companyInfo.name}</h3>
                  )}
                  <p className="text-gray-600">{companyInfo.industry}</p>
                </div>
              </div>

              {/* Company Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Calendar size={20} className="text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Founded</p>
                      {isEditing ? (
                        <input
                          type="text"
                          value={companyInfo.founded}
                          onChange={(e) => handleChange('founded', e.target.value)}
                          className="font-medium text-gray-900 bg-gray-50 border border-gray-300 rounded-lg px-3 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <p className="font-medium text-gray-900">{companyInfo.founded}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Users size={20} className="text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Company Size</p>
                      {isEditing ? (
                        <input
                          type="text"
                          value={companyInfo.size}
                          onChange={(e) => handleChange('size', e.target.value)}
                          className="font-medium text-gray-900 bg-gray-50 border border-gray-300 rounded-lg px-3 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <p className="font-medium text-gray-900">{companyInfo.size}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MapPin size={20} className="text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Headquarters</p>
                      {isEditing ? (
                        <input
                          type="text"
                          value={companyInfo.headquarters}
                          onChange={(e) => handleChange('headquarters', e.target.value)}
                          className="font-medium text-gray-900 bg-gray-50 border border-gray-300 rounded-lg px-3 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <p className="font-medium text-gray-900">{companyInfo.headquarters}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <DollarSign size={20} className="text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Annual Revenue</p>
                      {isEditing ? (
                        <input
                          type="text"
                          value={companyInfo.revenue}
                          onChange={(e) => handleChange('revenue', e.target.value)}
                          className="font-medium text-gray-900 bg-gray-50 border border-gray-300 rounded-lg px-3 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <p className="font-medium text-gray-900">{companyInfo.revenue}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone size={20} className="text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      {isEditing ? (
                        <input
                          type="text"
                          value={companyInfo.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          className="font-medium text-gray-900 bg-gray-50 border border-gray-300 rounded-lg px-3 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <p className="font-medium text-gray-900">{companyInfo.phone}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Mail size={20} className="text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      {isEditing ? (
                        <input
                          type="email"
                          value={companyInfo.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          className="font-medium text-gray-900 bg-gray-50 border border-gray-300 rounded-lg px-3 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <p className="font-medium text-gray-900">{companyInfo.email}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Company Description</h4>
                {isEditing ? (
                  <textarea
                    value={companyInfo.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    rows="3"
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                ) : (
                  <p className="text-gray-700">{companyInfo.description}</p>
                )}
              </div>

              {/* Mission & Vision */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-xl p-5">
                  <div className="flex items-center mb-3">
                    <Target size={20} className="text-blue-600 mr-2" />
                    <h4 className="font-semibold text-blue-900">Mission</h4>
                  </div>
                  {isEditing ? (
                    <textarea
                      value={companyInfo.mission}
                      onChange={(e) => handleChange('mission', e.target.value)}
                      rows="3"
                      className="w-full bg-white border border-blue-200 rounded-lg px-4 py-2 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  ) : (
                    <p className="text-blue-800">{companyInfo.mission}</p>
                  )}
                </div>
                <div className="bg-purple-50 rounded-xl p-5">
                  <div className="flex items-center mb-3">
                    <Award size={20} className="text-purple-600 mr-2" />
                    <h4 className="font-semibold text-purple-900">Vision</h4>
                  </div>
                  {isEditing ? (
                    <textarea
                      value={companyInfo.vision}
                      onChange={(e) => handleChange('vision', e.target.value)}
                      rows="3"
                      className="w-full bg-white border border-purple-200 rounded-lg px-4 py-2 text-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                    />
                  ) : (
                    <p className="text-purple-800">{companyInfo.vision}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Company Values */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Core Values</h2>
              <div className="space-y-4">
                {companyInfo.values.map((value, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center mr-3">
                      <Heart size={16} className="text-blue-600" />
                    </div>
                    {isEditing ? (
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => {
                          const newValues = [...companyInfo.values];
                          newValues[index] = e.target.value;
                          setCompanyInfo(prev => ({ ...prev, values: newValues }));
                        }}
                        className="flex-1 font-medium text-gray-900 bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <span className="font-medium text-gray-900">{value}</span>
                    )}
                  </div>
                ))}
                {isEditing && (
                  <button
                    onClick={() => {
                      const newValues = [...companyInfo.values, ''];
                      setCompanyInfo(prev => ({ ...prev, values: newValues }));
                    }}
                    className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-colors duration-300"
                  >
                    + Add Value
                  </button>
                )}
              </div>
            </div>

            {/* Website Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 mt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">Company Website</h3>
                <Globe size={20} className="text-gray-400" />
              </div>
              {isEditing ? (
                <input
                  type="text"
                  value={companyInfo.website}
                  onChange={(e) => handleChange('website', e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <a
                  href={`https://${companyInfo.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  {companyInfo.website}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Departments */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Departments</h2>
            <button className="text-blue-600 hover:text-blue-800 font-medium">
              View All Departments →
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-5 hover:border-blue-300 transition-colors duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center mr-4">
                    <Briefcase size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{dept.name}</h3>
                    <p className="text-sm text-gray-600">{dept.head}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Employees</span>
                    <span className="font-medium text-gray-900">{dept.employees}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Annual Budget</span>
                    <span className="font-medium text-gray-900">{dept.budget}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Company Milestones */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Company Milestones</h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-600"></div>
            
            <div className="space-y-8 relative">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start">
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold mr-8">
                      {milestone.year}
                    </div>
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{milestone.event}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Company;