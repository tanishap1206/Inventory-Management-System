// src/pages/Inventory.jsx
import React, { useState } from "react";

// Mock data for demonstration
const buildings = [
  {
    name: "AI Building",
    wings: [
      { name: "North Wing", rooms: ["N101", "N102", "N103", "N104"] },
      { name: "South Wing", rooms: ["S101", "S102", "S103", "S104"] },
      { name: "East Wing", rooms: ["E101", "E102", "E103", "E104"] },
      { name: "West Wing", rooms: ["W101", "W102", "W103", "W104"] }
    ]
  },
  {
    name: "EB AI Building",
    wings: [
      { name: "Block A", rooms: ["A101", "A102", "A103"] },
      { name: "Block B", rooms: ["B101", "B102", "B103"] }
    ]
  },
  {
    name: "CSMD",
    wings: [
      { name: "Main Building", rooms: ["M101", "M102", "M201", "M202"] },
      { name: "Annex", rooms: ["ANX1", "ANX2", "ANX3"] }
    ]
  }
];

const mockInventory = {
  "E101": [
    { id: 1, name: "Projector", category: "AV Equipment", brand: "Epson", model: "EX9260" },
    { id: 2, name: "Laptop", category: "Electronics", brand: "Dell", model: "XPS 15" }
  ],
  "S102": [
    { id: 3, name: "Microphone", category: "Audio", brand: "Shure", model: "SM58" }
  ]
};

export default function Inventory() {
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [selectedWing, setSelectedWing] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);

  return (
    <div className="p-4 space-y-6 dark:bg-slate-900 dark:text-white min-h-screen">
      <h2 className="text-2xl font-semibold">Inventory Management</h2>
      
      {/* Building Selection */}
      <div>
        <h3 className="text-lg font-medium mb-2">Select Building</h3>
        <div className="flex flex-wrap gap-2">
          {buildings.map(building => (
            <button
              key={building.name}
              onClick={() => {
                setSelectedBuilding(building);
                setSelectedWing(null);
                setSelectedRoom(null);
              }}
              className={`px-4 py-2 rounded ${
                selectedBuilding?.name === building.name 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 dark:bg-slate-700 dark:text-white'
              }`}
            >
              {building.name}
            </button>
          ))}
        </div>
      </div>

      {/* Wing Selection */}
      {selectedBuilding && (
        <div>
          <h3 className="text-lg font-medium mb-2">Select Wing/Block</h3>
          <div className="flex flex-wrap gap-2">
            {selectedBuilding.wings.map(wing => (
              <button
                key={wing.name}
                onClick={() => {
                  setSelectedWing(wing);
                  setSelectedRoom(null);
                }}
                className={`px-4 py-2 rounded ${
                  selectedWing?.name === wing.name 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 dark:bg-slate-700 dark:text-white'
                }`}
              >
                {wing.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Room Selection */}
      {selectedWing && (
        <div>
          <h3 className="text-lg font-medium mb-2">Select Room</h3>
          <div className="flex flex-wrap gap-2">
            {selectedWing.rooms.map(room => (
              <button
                key={room}
                onClick={() => setSelectedRoom(room)}
                className={`px-4 py-2 rounded ${
                  selectedRoom === room 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 dark:bg-slate-700 dark:text-white'
                }`}
              >
                {room}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Room Inventory */}
      {selectedRoom && (
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4 dark:text-white">Inventory in {selectedRoom}</h3>
          {mockInventory[selectedRoom] ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left dark:text-white">Name</th>
                    <th className="px-4 py-2 text-left dark:text-white">Category</th>
                    <th className="px-4 py-2 text-left dark:text-white">Brand</th>
                    <th className="px-4 py-2 text-left dark:text-white">Model</th>
                    <th className="px-4 py-2 text-left dark:text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockInventory[selectedRoom].map(item => (
                    <tr key={item.id} className="dark:border-slate-700">
                      <td className="px-4 py-2 dark:text-slate-300">{item.name}</td>
                      <td className="px-4 py-2 dark:text-slate-300">{item.category}</td>
                      <td className="px-4 py-2 dark:text-slate-300">{item.brand}</td>
                      <td className="px-4 py-2 dark:text-slate-300">{item.model}</td>
                      <td className="px-4 py-2">
                        <button className="text-blue-600 dark:text-blue-400 hover:underline mr-2">
                          View
                        </button>
                        <button className="text-green-600 dark:text-green-400 hover:underline">
                          Report
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="dark:text-slate-300">No items found in this room.</p>
          )}
        </div>
      )}
    </div>
  );
}