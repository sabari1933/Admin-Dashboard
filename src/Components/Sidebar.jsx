import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard,
  Users,
  User,
  FileText,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  Building,
  Briefcase,
  DollarSign,
  Calendar,
  Shield,
  Menu,
  X
} from "lucide-react";

export default function Sidebar() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const menuItems = [
    {
      id: "dashboard",
      title: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: "employees",
      title: "Employees",
      icon: <Users size={20} />,
      path: "/home",
      color: "from-purple-500 to-pink-500",
      submenu: [
        { title: "All Employees", path: "/home" },
        { title: "Add New", path: "/create" },
        { title: "Departments", path: "/departments" },
        { title: "Positions", path: "/positions" }
      ]
    },
    {
      id: "attendance",
      title: "Attendance",
      icon: <Calendar size={20} />,
      path: "/attendance",
      color: "from-green-500 to-emerald-500"
    },
    {
      id: "payroll",
      title: "Payroll",
      icon: <DollarSign size={20} />,
      path: "/payroll",
      color: "from-amber-500 to-orange-500"
    },
    {
      id: "reports",
      title: "Reports",
      icon: <BarChart3 size={20} />,
      path: "/reports",
      color: "from-indigo-500 to-blue-500"
    },
    {
      id: "company",
      title: "Company",
      icon: <Building size={20} />,
      path: "/company",
      color: "from-gray-600 to-gray-800"
    }
  ];

  const secondaryItems = [
    {
      id: "settings",
      title: "Settings",
      icon: <Settings size={20} />,
      path: "/settings"
    },
    {
      id: "help",
      title: "Help & Support",
      icon: <HelpCircle size={20} />,
      path: "/help"
    },
    {
      id: "privacy",
      title: "Privacy & Security",
      icon: <Shield size={20} />,
      path: "/privacy"
    }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  const toggleSubmenu = (id) => {
    setActiveSubmenu(activeSubmenu === id ? null : id);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}

      {/* Fixed Sidebar */}
      <aside className={`
        ${isCollapsed ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}
        fixed lg:sticky lg:top-0
        flex flex-col
        w-72
        h-screen
        bg-gradient-to-b from-gray-900 to-black
        text-white
        transition-transform duration-300 ease-in-out
        shadow-2xl
        z-30
      `}>
        {/* Logo & Toggle */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Briefcase size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  EMPLOYEE PRO
                </h1>
                <p className="text-xs text-gray-400">Management System</p>
              </div>
            </div>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors duration-300"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* User Profile */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <User size={24} />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-white truncate">Administrator</h3>
              <p className="text-sm text-gray-400 truncate">admin@employee-pro.com</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <div className="px-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">
              Main Menu
            </p>
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <div>
                    <Link
                      to={item.path}
                      onClick={() => item.submenu && toggleSubmenu(item.id)}
                      className={`
                        group flex items-center justify-between
                        px-4 py-3
                        rounded-xl
                        transition-all duration-300
                        ${isActive(item.path) 
                          ? `bg-gradient-to-r ${item.color} text-white shadow-lg` 
                          : 'text-gray-300 hover:text-white hover:bg-gray-800'
                        }
                      `}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`
                          transition-all duration-300
                          ${isActive(item.path) 
                            ? 'text-white' 
                            : 'text-gray-400 group-hover:text-white'
                          }
                        `}>
                          {item.icon}
                        </div>
                        <span className="font-medium">{item.title}</span>
                      </div>
                      {item.submenu && (
                        <ChevronRight 
                          size={16} 
                          className={`
                            transition-transform duration-300
                            ${activeSubmenu === item.id ? 'rotate-90' : ''}
                            ${isActive(item.path) ? 'text-white' : 'text-gray-400'}
                          `}
                        />
                      )}
                    </Link>
                    
                    {/* Submenu */}
                    {item.submenu && activeSubmenu === item.id && (
                      <div className="mt-1 ml-4 pl-8 border-l border-gray-800 space-y-1">
                        {item.submenu.map((subItem, index) => (
                          <Link
                            key={index}
                            to={subItem.path}
                            className={`
                              block px-4 py-2.5
                              rounded-lg
                              text-sm
                              transition-all duration-300
                              ${isActive(subItem.path)
                                ? 'text-white bg-gray-800'
                                : 'text-gray-400 hover:text-white hover:bg-gray-800'
                              }
                            `}
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="px-4 mt-8">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">
              System
            </p>
            <ul className="space-y-1">
              {secondaryItems.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.path}
                    className={`
                      group flex items-center space-x-3
                      px-4 py-3
                      rounded-xl
                      transition-all duration-300
                      ${isActive(item.path)
                        ? 'bg-gray-800 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-gray-800'
                      }
                    `}
                  >
                    <div className={`
                      transition-all duration-300
                      ${isActive(item.path)
                        ? 'text-white'
                        : 'text-gray-400 group-hover:text-white'
                      }
                    `}>
                      {item.icon}
                    </div>
                    <span className="font-medium">{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800">
          <div className="px-4">
            <Link
              to="/logout"
              className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-300 group"
            >
              <LogOut size={20} className="text-gray-400 group-hover:text-white transition-colors duration-300" />
              <span className="font-medium">Logout</span>
            </Link>
          </div>
          <div className="px-6 pt-4 pb-2">
            <p className="text-xs text-gray-500 text-center">
              © 2024 Employee Pro v2.1
            </p>
          </div>
        </div>
      </aside>

      {/* Mobile Toggle Button */}
      {isCollapsed && (
        <button
          onClick={() => setIsCollapsed(false)}
          className="fixed bottom-4 left-4 z-40 lg:hidden p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-2xl"
        >
          <Menu size={24} />
        </button>
      )}
    </>
  );
}