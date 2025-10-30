// src/pages/Inventory.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { InventorySkeleton, TableRowSkeleton } from '../components/Skeletons';

const API_URL = 'http://localhost:5000/api';

export default function Inventory() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [selectedWing, setSelectedWing] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [buildings, setBuildings] = useState([]);
  const [inventory, setInventory] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated && !authLoading) {
      navigate('/login');
    }
  }, [isAuthenticated, authLoading, navigate]);

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/buildings`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch buildings');
        }

        const data = await response.json();
        setBuildings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchBuildings();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const fetchInventory = async (roomId) => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/inventory/${roomId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch inventory');
        }

        const data = await response.json();
        setInventory(prev => ({ ...prev, [roomId]: data }));
      } catch (err) {
        setError(err.message);
      }
    };

    if (selectedRoom && !inventory[selectedRoom]) {
      fetchInventory(selectedRoom);
    }
  }, [selectedRoom]);

  if (authLoading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  if (loading) {
    return <InventorySkeleton />;
  }

  return (
    <div className="p-4 space-y-6 dark:bg-slate-900 dark:text-white min-h-screen">
      <h2 className="text-2xl font-semibold">Inventory Management</h2>
      
      {/* Building Selection */}
      <div>
        <h3 className="text-lg font-medium mb-2">Select Building</h3>
        <div className="flex flex-wrap gap-2">
          {buildings.map(building => (
            <button
              key={building._id}
              onClick={() => {
                setSelectedBuilding(building);
                setSelectedWing(null);
                setSelectedRoom(null);
              }}
              className={`px-4 py-2 rounded ${
                selectedBuilding?._id === building._id 
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
                key={wing._id}
                onClick={() => {
                  setSelectedWing(wing);
                  setSelectedRoom(null);
                }}
                className={`px-4 py-2 rounded ${
                  selectedWing?._id === wing._id 
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
      {selectedWing && !loading && (
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
          {loading ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left dark:text-white">Name</th>
                    <th className="px-4 py-2 text-left dark:text-white">Category</th>
                    <th className="px-4 py-2 text-left dark:text-white">Brand</th>
                    <th className="px-4 py-2 text-left dark:text-white">Model</th>
                    <th className="px-4 py-2 text-left dark:text-white">Status</th>
                    <th className="px-4 py-2 text-left dark:text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5].map(i => (
                    <TableRowSkeleton key={i} />
                  ))}
                </tbody>
              </table>
            </div>
          ) : inventory[selectedRoom] && inventory[selectedRoom].length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left dark:text-white">Name</th>
                    <th className="px-4 py-2 text-left dark:text-white">Category</th>
                    <th className="px-4 py-2 text-left dark:text-white">Brand</th>
                    <th className="px-4 py-2 text-left dark:text-white">Model</th>
                    <th className="px-4 py-2 text-left dark:text-white">Status</th>
                    <th className="px-4 py-2 text-left dark:text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {inventory[selectedRoom].map(item => (
                    <tr key={item._id} className="dark:border-slate-700">
                      <td className="px-4 py-2 dark:text-slate-300">{item.name}</td>
                      <td className="px-4 py-2 dark:text-slate-300">{item.category}</td>
                      <td className="px-4 py-2 dark:text-slate-300">{item.brand}</td>
                      <td className="px-4 py-2 dark:text-slate-300">{item.model}</td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          item.status === 'Available' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                            : item.status === 'In Use'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        <button className="text-blue-600 dark:text-blue-400 hover:underline mr-2">
                          View Details
                        </button>
                        <button className="text-green-600 dark:text-green-400 hover:underline">
                          Request
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