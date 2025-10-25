// src/pages/GuestView.jsx
import React, { useState } from "react";
import { buildings, inventoryItems, brands, categories } from "../data/dummyData";

export default function GuestView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBuilding, setSelectedBuilding] = useState("All");
  const [selectedRoom, setSelectedRoom] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");

  // Calculate statistics
  const totalItems = inventoryItems.length;
  const totalBuildings = buildings.length;
  
  // Filter items based on search and filters
  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.brand.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesBuilding = selectedBuilding === "All" || item.building === selectedBuilding;
    const matchesRoom = selectedRoom === "All" || item.room === selectedRoom;
    const matchesBrand = selectedBrand === "All" || item.brand === selectedBrand;
    
    return matchesSearch && matchesBuilding && matchesRoom && matchesBrand;
  });

  // Get unique rooms for dropdown
  const allRooms = [...new Set(inventoryItems.map(item => item.room))];

  return (
    <div className="p-6 space-y-6 dark:bg-slate-900 min-h-screen">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4 dark:text-white">Inventory Overview</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200">Total Items</h3>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-300">{totalItems}</p>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">Buildings</h3>
            <p className="text-3xl font-bold text-green-600 dark:text-green-300">{totalBuildings}</p>
          </div>
          
          <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200">Brands</h3>
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-300">{brands.length}</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search items by name, category, or brand..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-slate-600 rounded-lg mb-4 dark:bg-slate-700 dark:text-white"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              value={selectedBuilding}
              onChange={(e) => setSelectedBuilding(e.target.value)}
              className="p-3 border border-gray-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white"
            >
              <option value="All">All Buildings</option>
              {buildings.map(building => (
                <option key={building.id} value={building.name}>{building.name}</option>
              ))}
            </select>
            
            <select
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
              className="p-3 border border-gray-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white"
            >
              <option value="All">All Rooms</option>
              {allRooms.map(room => (
                <option key={room} value={room}>{room}</option>
              ))}
            </select>
            
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="p-3 border border-gray-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white"
            >
              <option value="All">All Brands</option>
              {brands.map(brand => (
                <option key={brand.name} value={brand.name}>{brand.name} ({brand.count})</option>
              ))}
            </select>
          </div>
        </div>

        {/* Buildings Summary */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Buildings Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {buildings.map(building => (
              <div key={building.id} className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg">
                <h3 className="font-semibold text-lg dark:text-white">{building.name}</h3>
                <p className="text-gray-600 dark:text-gray-300">{building.totalItems} items</p>
                <div className="mt-2">
                  {building.wings.map(wing => (
                    <div key={wing.name} className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                      <span>{wing.name}</span>
                      <span>{wing.items} items</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inventory Items Table */}
        <div>
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Inventory Items ({filteredItems.length})</h2>
          
          {filteredItems.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white dark:bg-slate-800 rounded-lg overflow-hidden">
                <thead className="bg-gray-100 dark:bg-slate-700">
                  <tr>
                    <th className="py-3 px-4 text-left dark:text-white">Name</th>
                    <th className="py-3 px-4 text-left dark:text-white">Category</th>
                    <th className="py-3 px-4 text-left dark:text-white">Brand</th>
                    <th className="py-3 px-4 text-left dark:text-white">Model</th>
                    <th className="py-3 px-4 text-left dark:text-white">Location</th>
                    <th className="py-3 px-4 text-left dark:text-white">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map(item => (
                    <tr key={item.id} className="border-t border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600">
                      <td className="py-3 px-4 dark:text-white">{item.name}</td>
                      <td className="py-3 px-4 dark:text-white">{item.category}</td>
                      <td className="py-3 px-4 dark:text-white">{item.brand}</td>
                      <td className="py-3 px-4 dark:text-white">{item.model}</td>
                      <td className="py-3 px-4 dark:text-white">{item.building}, {item.wing}, {item.room}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          item.status === "Available" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" :
                          item.status === "In Use" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300" :
                          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                        }`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center py-8 text-gray-500 dark:text-gray-400">No items found matching your criteria.</p>
          )}
        </div>
      </div>
    </div>
  );
}