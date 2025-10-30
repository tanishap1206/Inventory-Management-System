// src/pages/UserDashboard.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const API_URL = 'http://localhost:5000/api';

export default function UserDashboard() {
  const { currentUser } = useAuth();
  const [myRequests, setMyRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/user/requests`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch requests');
        }

        const data = await response.json();
        setMyRequests(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="p-6 space-y-6 dark:bg-slate-900 min-h-screen">
      <h1 className="text-2xl font-bold dark:text-white">User Dashboard</h1>
      
      {/* Welcome Section */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2 dark:text-white">
          Welcome, {currentUser?.name || 'User'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Here's an overview of your inventory requests and available actions.
        </p>
      </div>

      {/* My Requests */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">My Requests</h2>
        {myRequests.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
              <thead className="bg-gray-50 dark:bg-slate-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Item</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Request Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Priority</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
                {myRequests.map(request => (
                  <tr key={request.id}>
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center py-8 text-gray-500 dark:text-gray-400">You haven't made any requests yet.</p>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg">
            Request New Item
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg">
            View Available Inventory
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full mr-3">
              <span className="text-blue-600 dark:text-blue-400">📦</span>
            </div>
            <div>
              <p className="dark:text-white">You requested "Dell XPS 15 Laptop"</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">2 days ago</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full mr-3">
              <span className="text-green-600 dark:text-green-400">✅</span>
            </div>
            <div>
              <p className="dark:text-white">Your request for "Epson Projector" was approved</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">5 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}