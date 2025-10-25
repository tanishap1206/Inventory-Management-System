// src/components/SettingsModal.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

export default function SettingsModal({ isOpen, onClose }) {
  const { currentUser, logout, switchUser } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [showUserSwitch, setShowUserSwitch] = useState(false);

  const handleLogout = () => {
    logout();
    onClose();
    navigate('/');
  };

  const handleUserSwitch = (userType) => {
    switchUser({ 
      name: userType === 'admin' ? 'Admin User' : 'Regular User', 
      role: userType,
      building: userType === 'admin' ? 'All' : 'AI Building'
    });
    onClose();
    navigate(userType === 'admin' ? '/dashboard' : '/inventory');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">Settings</h2>
        
        <div className="space-y-4">
          {/* Theme Toggle */}
          <div className="flex items-center justify-between">
            <span className="dark:text-white">Dark Mode</span>
            <button
              onClick={toggleTheme}
              className={`relative inline-flex h-6 w-11 items-center rounded-full ${isDarkMode ? 'bg-blue-600' : 'bg-gray-200'}`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isDarkMode ? 'translate-x-6' : 'translate-x-1'}`}
              />
            </button>
          </div>

          {/* User Info */}
          <div className="border-t pt-4 dark:border-slate-700">
            <h3 className="font-medium dark:text-white">User Information</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Logged in as: {currentUser?.name || 'Guest'}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Role: {currentUser?.role || 'guest'}
            </p>
            {currentUser?.building && (
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Building: {currentUser.building}
              </p>
            )}
          </div>

          {/* Switch User */}
          <div className="border-t pt-4 dark:border-slate-700">
            <button
              onClick={() => setShowUserSwitch(!showUserSwitch)}
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Switch User Type
            </button>
            
            {showUserSwitch && (
              <div className="mt-2 space-y-2">
                <button
                  onClick={() => handleUserSwitch('user')}
                  className="block w-full text-left px-3 py-2 bg-gray-100 dark:bg-slate-700 rounded hover:bg-gray-200 dark:hover:bg-slate-600 dark:text-white"
                >
                  Switch to Regular User
                </button>
                <button
                  onClick={() => handleUserSwitch('admin')}
                  className="block w-full text-left px-3 py-2 bg-gray-100 dark:bg-slate-700 rounded hover:bg-gray-200 dark:hover:bg-slate-600 dark:text-white"
                >
                  Switch to Admin
                </button>
              </div>
            )}
          </div>

          {/* Logout Button */}
          <div className="border-t pt-4 dark:border-slate-700">
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>

          {/* Close Button */}
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 dark:bg-slate-700 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-slate-600"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}