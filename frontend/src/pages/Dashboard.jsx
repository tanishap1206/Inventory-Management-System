// src/pages/Dashboard.jsx
import React, { useState } from "react";

// Mock data for demonstration
const mockData = {
  totalItems: 1245,
  totalUsers: 42,
  buildings: [
    { name: "AI Building", items: 650, users: 20 },
    { name: "EB AI Building", items: 320, users: 12 },
    { name: "CSMD", items: 275, users: 10 }
  ],
  recentItems: [
    { id: 1, name: "Laptop Dell XPS", category: "Electronics", location: "AI Building, E101" },
    { id: 2, name: "Projector Epson", category: "AV Equipment", location: "CSMD, Conference Room" },
    { id: 3, name: "Microphone Shure", category: "Audio", location: "EB AI Building, Studio" }
  ]
};

export default function Dashboard() {
  const [selectedBuilding, setSelectedBuilding] = useState(null);

  return (
    <div className="p-4 space-y-6 dark:bg-slate-900 dark:text-white min-h-screen">
      <h2 className="text-2xl font-semibold">Dashboard Overview</h2>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium">Total Items</h3>
          <p className="text-3xl font-bold">{mockData.totalItems}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium">Total Users</h3>
          <p className="text-3xl font-bold">{mockData.totalUsers}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium">Buildings</h3>
          <p className="text-3xl font-bold">{mockData.buildings.length}</p>
        </div>
      </div>

      {/* Buildings Overview */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-4">Buildings Inventory</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockData.buildings.map(building => (
            <div 
              key={building.name} 
              className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700 dark:border-slate-600"
              onClick={() => setSelectedBuilding(building.name)}
            >
              <h4 className="font-medium dark:text-white">{building.name}</h4>
              <p className="dark:text-slate-300">Items: {building.items}</p>
              <p className="dark:text-slate-300">Users: {building.users}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Items */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-4">Recently Added Items</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left dark:text-white">Name</th>
                <th className="px-4 py-2 text-left dark:text-white">Category</th>
                <th className="px-4 py-2 text-left dark:text-white">Location</th>
              </tr>
            </thead>
            <tbody>
              {mockData.recentItems.map(item => (
                <tr key={item.id} className="dark:border-slate-700">
                  <td className="px-4 py-2 dark:text-slate-300">{item.name}</td>
                  <td className="px-4 py-2 dark:text-slate-300">{item.category}</td>
                  <td className="px-4 py-2 dark:text-slate-300">{item.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}