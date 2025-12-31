import React, { useState } from 'react';
import Sidebar from './Sidebar';
import {
  Settings as SettingsIcon,
  Save,
  Bell,
  Lock,
  Palette,
  Database,
  Globe,
  Users,
  Mail,
  Clock,
  Shield,
  BellRing,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle
} from 'lucide-react';

function Settings() {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    general: {
      companyName: "Employee Pro Technologies",
      timezone: "America/Los_Angeles",
      dateFormat: "MM/DD/YYYY",
      language: "English",
      currency: "USD"
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      newEmployeeAlerts: true,
      payrollAlerts: true,
      attendanceAlerts: true,
      reportAlerts: false,
      marketingEmails: false
    },
    security: {
      twoFactorAuth: true,
      sessionTimeout: 30,
      passwordExpiry: 90,
      ipWhitelist: ["192.168.1.1", "10.0.0.1"],
      loginAlerts: true
    },
    appearance: {
      theme: "light",
      sidebarColor: "blue",
      density: "comfortable",
      animations: true
    }
  });

  const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  const tabs = [
    { id: 'general', name: 'General', icon: <SettingsIcon size={20} /> },
    { id: 'notifications', name: 'Notifications', icon: <Bell size={20} /> },
    { id: 'security', name: 'Security', icon: <Lock size={20} /> },
    { id: 'appearance', name: 'Appearance', icon: <Palette size={20} /> },
    { id: 'integrations', name: 'Integrations', icon: <Database size={20} /> }
  ];

  const handleSave = () => {
    setSaveStatus('saving');
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(null), 3000);
    }, 1000);
  };

  const handleSettingChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const timezones = [
    "America/Los_Angeles",
    "America/New_York",
    "Europe/London",
    "Europe/Berlin",
    "Asia/Tokyo",
    "Australia/Sydney"
  ];

  const currencies = ["USD", "EUR", "GBP", "JPY", "CAD", "AUD"];

  return (
    <div className="flex min-h-screen bg-gray-50">
   
   
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-2">Manage your system preferences and configurations</p>
        </div>

        {/* Settings Tabs */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 w-full px-6 py-4 text-left transition-colors duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className={`${
                    activeTab === tab.id ? 'text-blue-600' : 'text-gray-400'
                  }`}>
                    {tab.icon}
                  </div>
                  <span className="font-medium">{tab.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Settings Content */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
              {/* Save Status */}
              {saveStatus && (
                <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
                  saveStatus === 'saving' 
                    ? 'bg-blue-50 border border-blue-200' 
                    : 'bg-green-50 border border-green-200'
                }`}>
                  {saveStatus === 'saving' ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                      <span className="text-blue-700 font-medium">Saving changes...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="text-green-600" size={24} />
                      <span className="text-green-700 font-medium">Settings saved successfully!</span>
                    </>
                  )}
                </div>
              )}

              {/* General Settings */}
              {activeTab === 'general' && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <SettingsIcon size={24} className="text-blue-600" />
                    General Settings
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={settings.general.companyName}
                        onChange={(e) => handleSettingChange('general', 'companyName', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Timezone
                        </label>
                        <select
                          value={settings.general.timezone}
                          onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        >
                          {timezones.map(tz => (
                            <option key={tz} value={tz}>{tz}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Date Format
                        </label>
                        <select
                          value={settings.general.dateFormat}
                          onChange={(e) => handleSettingChange('general', 'dateFormat', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        >
                          <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                          <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                          <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Language
                        </label>
                        <select
                          value={settings.general.language}
                          onChange={(e) => handleSettingChange('general', 'language', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        >
                          <option value="English">English</option>
                          <option value="Spanish">Spanish</option>
                          <option value="French">French</option>
                          <option value="German">German</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Currency
                        </label>
                        <select
                          value={settings.general.currency}
                          onChange={(e) => handleSettingChange('general', 'currency', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        >
                          {currencies.map(curr => (
                            <option key={curr} value={curr}>{curr}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Notification Settings */}
              {activeTab === 'notifications' && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <BellRing size={24} className="text-blue-600" />
                    Notification Settings
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-gray-900">Email Notifications</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Email Notifications</p>
                            <p className="text-sm text-gray-600">Receive notifications via email</p>
                          </div>
                          <button
                            onClick={() => handleSettingChange('notifications', 'emailNotifications', !settings.notifications.emailNotifications)}
                            className={`w-12 h-6 rounded-full transition-colors duration-300 ${
                              settings.notifications.emailNotifications ? 'bg-green-500' : 'bg-gray-300'
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-full bg-white transform transition-transform duration-300 ${
                              settings.notifications.emailNotifications ? 'translate-x-7' : 'translate-x-1'
                            }`}></div>
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">New Employee Alerts</p>
                            <p className="text-sm text-gray-600">Get notified when new employees join</p>
                          </div>
                          <button
                            onClick={() => handleSettingChange('notifications', 'newEmployeeAlerts', !settings.notifications.newEmployeeAlerts)}
                            className={`w-12 h-6 rounded-full transition-colors duration-300 ${
                              settings.notifications.newEmployeeAlerts ? 'bg-green-500' : 'bg-gray-300'
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-full bg-white transform transition-transform duration-300 ${
                              settings.notifications.newEmployeeAlerts ? 'translate-x-7' : 'translate-x-1'
                            }`}></div>
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Payroll Alerts</p>
                            <p className="text-sm text-gray-600">Notifications about payroll processing</p>
                          </div>
                          <button
                            onClick={() => handleSettingChange('notifications', 'payrollAlerts', !settings.notifications.payrollAlerts)}
                            className={`w-12 h-6 rounded-full transition-colors duration-300 ${
                              settings.notifications.payrollAlerts ? 'bg-green-500' : 'bg-gray-300'
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-full bg-white transform transition-transform duration-300 ${
                              settings.notifications.payrollAlerts ? 'translate-x-7' : 'translate-x-1'
                            }`}></div>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold text-gray-900">Push Notifications</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Push Notifications</p>
                            <p className="text-sm text-gray-600">Receive push notifications</p>
                          </div>
                          <button
                            onClick={() => handleSettingChange('notifications', 'pushNotifications', !settings.notifications.pushNotifications)}
                            className={`w-12 h-6 rounded-full transition-colors duration-300 ${
                              settings.notifications.pushNotifications ? 'bg-green-500' : 'bg-gray-300'
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-full bg-white transform transition-transform duration-300 ${
                              settings.notifications.pushNotifications ? 'translate-x-7' : 'translate-x-1'
                            }`}></div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Settings */}
              {activeTab === 'security' && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Shield size={24} className="text-blue-600" />
                    Security Settings
                  </h2>
                  
                  <div className="space-y-8">
                    <div className="space-y-6">
                      <h3 className="font-semibold text-gray-900">Two-Factor Authentication</h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Enable 2FA</p>
                          <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                        </div>
                        <button
                          onClick={() => handleSettingChange('security', 'twoFactorAuth', !settings.security.twoFactorAuth)}
                          className={`w-12 h-6 rounded-full transition-colors duration-300 ${
                            settings.security.twoFactorAuth ? 'bg-green-500' : 'bg-gray-300'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-full bg-white transform transition-transform duration-300 ${
                            settings.security.twoFactorAuth ? 'translate-x-7' : 'translate-x-1'
                          }`}></div>
                        </button>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <h3 className="font-semibold text-gray-900">Session Settings</h3>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Session Timeout (minutes)
                        </label>
                        <div className="flex items-center gap-4">
                          <input
                            type="range"
                            min="5"
                            max="120"
                            step="5"
                            value={settings.security.sessionTimeout}
                            onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
                            className="flex-1"
                          />
                          <span className="font-medium text-gray-900 w-12">{settings.security.sessionTimeout}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <h3 className="font-semibold text-gray-900">Change Password</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Current Password
                          </label>
                          <div className="relative">
                            <input
                              type={showPassword ? "text" : "password"}
                              value={password.current}
                              onChange={(e) => setPassword({...password, current: e.target.value})}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                            />
                            <button
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                            >
                              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              New Password
                            </label>
                            <input
                              type="password"
                              value={password.new}
                              onChange={(e) => setPassword({...password, new: e.target.value})}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Confirm Password
                            </label>
                            <input
                              type="password"
                              value={password.confirm}
                              onChange={(e) => setPassword({...password, confirm: e.target.value})}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Appearance Settings */}
              {activeTab === 'appearance' && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Palette size={24} className="text-blue-600" />
                    Appearance Settings
                  </h2>
                  
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-gray-900">Theme</h3>
                      <div className="grid grid-cols-3 gap-4">
                        {['light', 'dark', 'auto'].map((theme) => (
                          <button
                            key={theme}
                            onClick={() => handleSettingChange('appearance', 'theme', theme)}
                            className={`p-4 border rounded-xl transition-all duration-300 ${
                              settings.appearance.theme === theme
                                ? 'border-blue-500 ring-2 ring-blue-200'
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                          >
                            <div className="flex flex-col items-center">
                              <div className={`w-12 h-12 rounded-lg mb-2 ${
                                theme === 'light' ? 'bg-white border border-gray-300' :
                                theme === 'dark' ? 'bg-gray-900' :
                                'bg-gradient-to-r from-white to-gray-900 border border-gray-300'
                              }`}></div>
                              <span className="capitalize font-medium text-gray-900">{theme}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold text-gray-900">Sidebar Color</h3>
                      <div className="flex gap-3">
                        {['blue', 'purple', 'green', 'orange', 'gray'].map((color) => (
                          <button
                            key={color}
                            onClick={() => handleSettingChange('appearance', 'sidebarColor', color)}
                            className={`w-10 h-10 rounded-full border-2 ${
                              settings.appearance.sidebarColor === color
                                ? 'border-gray-900'
                                : 'border-transparent'
                            }`}
                            style={{
                              background: color === 'blue' ? '#3b82f6' :
                                         color === 'purple' ? '#8b5cf6' :
                                         color === 'green' ? '#10b981' :
                                         color === 'orange' ? '#f59e0b' :
                                         '#6b7280'
                            }}
                          ></button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold text-gray-900">Density</h3>
                      <div className="flex gap-4">
                        {['comfortable', 'compact', 'spacious'].map((density) => (
                          <button
                            key={density}
                            onClick={() => handleSettingChange('appearance', 'density', density)}
                            className={`px-6 py-3 border rounded-xl transition-all duration-300 ${
                              settings.appearance.density === density
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            <span className="capitalize font-medium">{density}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Animations</p>
                        <p className="text-sm text-gray-600">Enable smooth animations throughout the app</p>
                      </div>
                      <button
                        onClick={() => handleSettingChange('appearance', 'animations', !settings.appearance.animations)}
                        className={`w-12 h-6 rounded-full transition-colors duration-300 ${
                          settings.appearance.animations ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full bg-white transform transition-transform duration-300 ${
                          settings.appearance.animations ? 'translate-x-7' : 'translate-x-1'
                        }`}></div>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Save Button */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex justify-end">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <Save size={20} />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Settings;