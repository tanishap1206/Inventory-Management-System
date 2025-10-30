// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from "react";

const API_URL = 'http://localhost:5000/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const [statsRes, requestsRes] = await Promise.all([
          fetch(`${API_URL}/admin/stats`, {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetch(`${API_URL}/admin/requests`, {
            headers: { 'Authorization': `Bearer ${token}` }
          })
        ]);

        const statsData = await statsRes.json();
        const requestsData = await requestsRes.json();

        setStats([
          { id: 1, name: 'Total Items', count: statsData.totalItems, description: 'All inventory items', icon: '📦' },
          { id: 2, name: 'Active Requests', count: statsData.activeRequests, description: 'Pending approvals', icon: '📋' },
          { id: 3, name: 'Low Stock', count: statsData.lowStock, description: 'Items below threshold', icon: '⚠️' }
        ]);
        setRequests(requestsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="p-6 space-y-6 dark:bg-slate-900 min-h-screen">
      <h1 className="text-2xl font-bold dark:text-white">Admin Dashboard</h1>
      
      {/* Admin Inventory Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map(item => (
          <div key={item.id} className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold dark:text-white">{item.name}</h3>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{item.count}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
              </div>
              <span className="text-3xl">{item.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* User Requests */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">User Requests</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
            <thead className="bg-gray-50 dark:bg-slate-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">User</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Item</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Request Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Priority</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
              {requests.map(request => (
                <tr key={request.id}>
                  <td className="px-4 py-4 whitespace-nowrap dark:text-white">{request.userName}</td>
                  <td className="px-4 py-4 whitespace-nowrap dark:text-white">{request.item}</td>
                  <td className="px-4 py-4 whitespace-nowrap dark:text-white">{new Date(request.requestDate).toLocaleDateString()}</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      request.status === "Pending" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300" :
                      request.status === "Approved" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" :
                      "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                    }`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      request.priority === "High" ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" :
                      request.priority === "Medium" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300" :
                      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                    }`}>
                      {request.priority}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <button className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 mr-2">
                      Approve
                    </button>
                    <button className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300">
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">
            Add New Item
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg">
            Generate Report
          </button>
          <button className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg">
            Manage Users
          </button>
          <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg">
            System Settings
          </button>
        </div>
      </div>
    </div>
  );
}