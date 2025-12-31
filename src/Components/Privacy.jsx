import React, { useState } from 'react';

import {
  Shield,
  Lock,
  Eye,
  EyeOff,
  Download,
  FileText,
  CheckCircle,
  AlertTriangle,
  Globe,
  Clock,
  Key,
  Fingerprint,
  Save,
  ChevronRight
} from 'lucide-react';

function Privacy() {
  const [privacySettings, setPrivacySettings] = useState({
    dataRetention: 365,
    autoLogout: 30,
    twoFactorAuth: true,
    dataExport: true,
    analytics: false,
    marketingEmails: false,
    shareData: false,
    loginNotifications: true
  });

  const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const policies = [
    {
      title: 'Privacy Policy',
      lastUpdated: 'Dec 15, 2024',
      description: 'How we collect, use, and protect your data'
    },
    {
      title: 'Terms of Service',
      lastUpdated: 'Dec 15, 2024',
      description: 'Rules and guidelines for using our platform'
    },
    {
      title: 'Data Processing Agreement',
      lastUpdated: 'Dec 15, 2024',
      description: 'How we process and handle your data'
    },
    {
      title: 'Cookie Policy',
      lastUpdated: 'Dec 15, 2024',
      description: 'Information about cookies and tracking'
    }
  ];

  const securityFeatures = [
    {
      title: 'Encryption',
      description: 'All data is encrypted using AES-256',
      status: 'enabled',
      icon: <Lock size={20} />
    },
    {
      title: 'Two-Factor Authentication',
      description: 'Adds an extra layer of security',
      status: 'enabled',
      icon: <Key size={20} />
    },
    {
      title: 'Audit Logs',
      description: 'Track all system activities',
      status: 'enabled',
      icon: <FileText size={20} />
    },
    {
      title: 'IP Whitelisting',
      description: 'Restrict access to specific IP addresses',
      status: 'disabled',
      icon: <Globe size={20} />
    },
    {
      title: 'Biometric Login',
      description: 'Enable fingerprint or face recognition',
      status: 'disabled',
      icon: <Fingerprint size={20} />
    },
    {
      title: 'Session Management',
      description: 'Manage active sessions and devices',
      status: 'enabled',
      icon: <Clock size={20} />
    }
  ];

  const handleSettingChange = (key, value) => {
    setPrivacySettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    // Save settings logic here
    console.log('Settings saved:', privacySettings);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">

      
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Privacy & Security</h1>
          <p className="text-gray-600 mt-2">Manage your privacy settings and security preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Security Settings */}
          <div className="lg:col-span-2 space-y-8">
            {/* Security Features */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Shield size={24} className="text-blue-600" />
                  Security Features
                </h2>
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  View Security Logs →
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {securityFeatures.map((feature, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-5 hover:border-blue-300 transition-colors duration-300">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          feature.status === 'enabled' 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {feature.icon}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{feature.title}</h3>
                          <p className="text-sm text-gray-600">{feature.description}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        feature.status === 'enabled'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {feature.status === 'enabled' ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                    <button className={`w-full py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${
                      feature.status === 'enabled'
                        ? 'bg-red-50 text-red-600 hover:bg-red-100'
                        : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                    }`}>
                      {feature.status === 'enabled' ? 'Disable Feature' : 'Enable Feature'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Privacy Settings */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Privacy Settings</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Data Retention Period</p>
                    <p className="text-sm text-gray-600">How long we keep your inactive data</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="30"
                      max="730"
                      step="30"
                      value={privacySettings.dataRetention}
                      onChange={(e) => handleSettingChange('dataRetention', parseInt(e.target.value))}
                      className="w-32"
                    />
                    <span className="font-medium text-gray-900 w-20">
                      {privacySettings.dataRetention} days
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Auto Logout</p>
                    <p className="text-sm text-gray-600">Session timeout period in minutes</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="5"
                      max="120"
                      step="5"
                      value={privacySettings.autoLogout}
                      onChange={(e) => handleSettingChange('autoLogout', parseInt(e.target.value))}
                      className="w-32"
                    />
                    <span className="font-medium text-gray-900 w-20">
                      {privacySettings.autoLogout} min
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Data Collection</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Allow Data Export</p>
                        <p className="text-sm text-gray-600">Enable exporting your personal data</p>
                      </div>
                      <button
                        onClick={() => handleSettingChange('dataExport', !privacySettings.dataExport)}
                        className={`w-12 h-6 rounded-full transition-colors duration-300 ${
                          privacySettings.dataExport ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full bg-white transform transition-transform duration-300 ${
                          privacySettings.dataExport ? 'translate-x-7' : 'translate-x-1'
                        }`}></div>
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Usage Analytics</p>
                        <p className="text-sm text-gray-600">Help us improve by sharing usage data</p>
                      </div>
                      <button
                        onClick={() => handleSettingChange('analytics', !privacySettings.analytics)}
                        className={`w-12 h-6 rounded-full transition-colors duration-300 ${
                          privacySettings.analytics ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full bg-white transform transition-transform duration-300 ${
                          privacySettings.analytics ? 'translate-x-7' : 'translate-x-1'
                        }`}></div>
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Marketing Communications</p>
                        <p className="text-sm text-gray-600">Receive marketing emails and updates</p>
                      </div>
                      <button
                        onClick={() => handleSettingChange('marketingEmails', !privacySettings.marketingEmails)}
                        className={`w-12 h-6 rounded-full transition-colors duration-300 ${
                          privacySettings.marketingEmails ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full bg-white transform transition-transform duration-300 ${
                          privacySettings.marketingEmails ? 'translate-x-7' : 'translate-x-1'
                        }`}></div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Password Change */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Change Password</h2>
              
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
                      placeholder="Enter current password"
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
                      placeholder="Enter new password"
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
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-medium">
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Policies & Actions */}
          <div className="space-y-8">
            {/* Privacy Policies */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Privacy Policies</h2>
              
              <div className="space-y-4">
                {policies.map((policy, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-xl hover:border-blue-300 transition-colors duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{policy.title}</h3>
                      <span className="text-sm text-gray-600">Updated {policy.lastUpdated}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{policy.description}</p>
                    <div className="flex items-center gap-3">
                      <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                        View Policy
                      </button>
                      <button className="text-gray-600 hover:text-gray-800 font-medium text-sm flex items-center gap-1">
                        <Download size={16} />
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Data Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Data Actions</h2>
              
              <div className="space-y-4">
                <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-colors duration-300 group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                      <Download size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 group-hover:text-blue-700">Export My Data</p>
                      <p className="text-sm text-gray-600">Download all your personal data</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-gray-400 group-hover:text-blue-600" />
                </button>

                <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-amber-300 hover:bg-amber-50 transition-colors duration-300 group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-amber-100 text-amber-600">
                      <AlertTriangle size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 group-hover:text-amber-700">Request Data Deletion</p>
                      <p className="text-sm text-gray-600">Permanently delete all your data</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-gray-400 group-hover:text-amber-600" />
                </button>

                <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-red-300 hover:bg-red-50 transition-colors duration-300 group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-red-100 text-red-600">
                      <FileText size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 group-hover:text-red-700">View Data Report</p>
                      <p className="text-sm text-gray-600">See what data we have about you</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-gray-400 group-hover:text-red-600" />
                </button>
              </div>
            </div>

            {/* Security Status */}
            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Security Status</h2>
                <CheckCircle size={24} />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-blue-100">Overall Security Score</span>
                  <span className="text-2xl font-bold">94/100</span>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-blue-200">Password Strength</span>
                      <span className="text-sm font-medium">Strong</span>
                    </div>
                    <div className="h-2 bg-blue-400 rounded-full overflow-hidden">
                      <div className="h-full bg-green-400 rounded-full" style={{ width: '95%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-blue-200">2FA Status</span>
                      <span className="text-sm font-medium">Enabled</span>
                    </div>
                    <div className="h-2 bg-blue-400 rounded-full overflow-hidden">
                      <div className="h-full bg-green-400 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-blue-200">Session Security</span>
                      <span className="text-sm font-medium">Good</span>
                    </div>
                    <div className="h-2 bg-blue-400 rounded-full overflow-hidden">
                      <div className="h-full bg-green-400 rounded-full" style={{ width: '88%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
            >
              <Save size={20} />
              Save Privacy Settings
            </button>
          </div>
        </div>

        {/* Important Notice */}
        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <AlertTriangle size={24} className="text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-amber-900 mb-2">Important Privacy Notice</h3>
              <p className="text-amber-800">
                Your privacy is important to us. We use industry-standard encryption and security measures 
                to protect your data. Regular security audits are conducted to ensure the highest level of 
                protection. For any privacy concerns or questions, please contact our privacy team at 
                <a href="mailto:privacy@employee-pro.com" className="text-amber-900 font-medium hover:text-amber-700 ml-1">
                  privacy@employee-pro.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Privacy;