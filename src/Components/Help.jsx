import React, { useState } from 'react';

import {
  HelpCircle,
  Search,
  BookOpen,
  MessageSquare,
  Phone,
  Mail,
  Globe,
  ChevronRight,
  FileText,
  Video,
  Download,
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
 
} from 'lucide-react';

function Help() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Topics', icon: <BookOpen size={20} /> },
    { id: 'employees', name: 'Employees', icon: <Users size={20} /> },
    { id: 'attendance', name: 'Attendance', icon: <Clock size={20} /> },
    { id: 'payroll', name: 'Payroll', icon: <FileText size={20} /> },
    { id: 'reports', name: 'Reports', icon: <BookOpen size={20} /> },
    { id: 'settings', name: 'Settings', icon: <HelpCircle size={20} /> },
  ];

  const articles = [
    { id: 1, title: 'How to add a new employee', category: 'employees', views: 1243, likes: 89 },
    { id: 2, title: 'Managing employee attendance', category: 'attendance', views: 892, likes: 67 },
    { id: 3, title: 'Processing payroll step by step', category: 'payroll', views: 1567, likes: 124 },
    { id: 4, title: 'Generating custom reports', category: 'reports', views: 743, likes: 45 },
    { id: 5, title: 'Setting up company profile', category: 'settings', views: 532, likes: 32 },
    { id: 6, title: 'Managing user permissions', category: 'employees', views: 678, likes: 56 },
    { id: 7, title: 'Exporting data to Excel', category: 'reports', views: 432, likes: 29 },
    { id: 8, title: 'Troubleshooting common issues', category: 'settings', views: 1245, likes: 98 },
  ];

  const faqs = [
    { question: 'How do I reset my password?', answer: 'You can reset your password from the login page or through your account settings.' },
    { question: 'Can I export employee data?', answer: 'Yes, you can export employee data in CSV, Excel, or PDF format from the reports section.' },
    { question: 'How to set up automatic payroll?', answer: 'Navigate to Payroll settings and enable automatic processing with your preferred schedule.' },
    { question: 'Is there mobile app support?', answer: 'Yes, our system is fully responsive and works on all mobile devices.' },
    { question: 'How to add custom fields?', answer: 'Go to Settings > Custom Fields to add new fields to employee profiles.' },
  ];

  const tutorials = [
    { title: 'Getting Started Guide', duration: '15 min', type: 'video' },
    { title: 'Payroll Processing Tutorial', duration: '25 min', type: 'video' },
    { title: 'Advanced Reporting', duration: '20 min', type: 'article' },
    { title: 'Employee Management Basics', duration: '10 min', type: 'article' },
    { title: 'System Configuration', duration: '30 min', type: 'video' },
  ];

  const contactMethods = [
    { type: 'Email', value: 'support@employee-pro.com', icon: <Mail size={24} />, response: 'Within 24 hours' },
    { type: 'Phone', value: '+1 (555) 123-4567', icon: <Phone size={24} />, response: 'Mon-Fri, 9AM-6PM' },
    { type: 'Live Chat', value: 'Available on website', icon: <MessageSquare size={24} />, response: 'Instant response' },
    { type: 'Help Center', value: 'help.employee-pro.com', icon: <Globe size={24} />, response: '24/7 access' },
  ];

  const filteredArticles = articles.filter(article => {
    if (activeCategory !== 'all' && article.category !== activeCategory) return false;
    if (searchTerm && !article.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="flex min-h-screen bg-gray-50">
      
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Help & Support</h1>
          <p className="text-gray-600 mt-2">Get help, tutorials, and contact our support team</p>
        </div>

        {/* Search */}
        <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl shadow-lg p-8 mb-8 text-white">
          <h2 className="text-2xl font-bold mb-4">How can we help you today?</h2>
          <p className="text-blue-100 mb-6">Search our knowledge base or contact our support team</p>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400" size={24} />
            <input
              type="text"
              placeholder="Search for answers, articles, or tutorials..."
              className="w-full pl-14 pr-4 py-4 bg-white rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Browse by Category</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex flex-col items-center p-4 rounded-xl border transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 text-blue-700'
                    : 'bg-white border-gray-200 text-gray-700 hover:border-blue-300'
                }`}
              >
                <div className={`p-3 rounded-lg mb-3 ${
                  activeCategory === category.id
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {category.icon}
                </div>
                <span className="font-medium text-center">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Articles */}
          <div className="lg:col-span-2 space-y-8">
            {/* Popular Articles */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Popular Articles</h2>
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  View all articles →
                </button>
              </div>
              
              <div className="space-y-4">
                {filteredArticles.map((article) => (
                  <div key={article.id} className="p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 group">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 group-hover:text-blue-700 mb-1">
                          {article.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="capitalize">{article.category}</span>
                          <span>•</span>
                          <span>{article.views} views</span>
                          <span>•</span>
                          <span>{article.likes} likes</span>
                        </div>
                      </div>
                      <ChevronRight size={20} className="text-gray-400 group-hover:text-blue-600 ml-4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tutorials */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Video Tutorials & Guides</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tutorials.map((tutorial, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-colors duration-300">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          tutorial.type === 'video' 
                            ? 'bg-red-100 text-red-600' 
                            : 'bg-blue-100 text-blue-600'
                        }`}>
                          {tutorial.type === 'video' ? <Video size={20} /> : <FileText size={20} />}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{tutorial.title}</h3>
                          <p className="text-sm text-gray-600">{tutorial.duration} • {tutorial.type}</p>
                        </div>
                      </div>
                      <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                        <Download size={18} className="text-gray-400" />
                      </button>
                    </div>
                    <button className="w-full py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-300 text-sm font-medium">
                      Watch Tutorial
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Contact & FAQ */}
          <div className="space-y-8">
            {/* Contact Support */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Contact Support</h2>
              
              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-xl hover:border-blue-300 transition-colors duration-300">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                        {method.icon}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{method.type}</h3>
                        <p className="text-sm text-gray-600">{method.response}</p>
                      </div>
                    </div>
                    <p className="text-gray-900 font-medium">{method.value}</p>
                  </div>
                ))}
              </div>

              <button className="w-full mt-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 font-medium">
                Open Support Ticket
              </button>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                    <h3 className="font-medium text-gray-900 mb-2 flex items-start">
                      <AlertCircle size={18} className="text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 text-sm ml-6">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* System Status */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-6">System Status</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-3"></div>
                    <span className="font-medium text-gray-900">All Systems Operational</span>
                  </div>
                  <CheckCircle size={20} className="text-green-600" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">API Services</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Normal</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Database</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Normal</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Payment Processing</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Normal</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Email Services</span>
                    <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">Degraded</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Documentation */}
        <div className="mt-8 bg-gradient-to-r from-gray-900 to-black rounded-2xl shadow-lg p-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold mb-3">Need More Help?</h2>
              <p className="text-gray-300">Check out our comprehensive documentation</p>
            </div>
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-white text-gray-900 rounded-xl hover:bg-gray-100 transition-colors duration-300 font-medium">
                View Documentation
              </button>
              <button className="px-6 py-3 border border-white text-white rounded-xl hover:bg-white hover:text-gray-900 transition-colors duration-300 font-medium">
                Download User Guide
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Help;