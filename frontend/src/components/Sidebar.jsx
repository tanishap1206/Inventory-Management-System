// src/components/Sidebar.jsx
import React from "react";
import { useAuth } from "../context/AuthContext";

export default function Sidebar({ active, onNavigate, role }) {
  const { logout } = useAuth();
  
  const navItems = [
    { key: "dashboard", label: "Dashboard", icon: "📊" },
    { key: "inventory", label: "Inventory", icon: "📦" },
  ];

  if (role === "admin") {
    navItems.push({ key: "reports", label: "Reports", icon: "📈" });
  }

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <div className="w-64 h-full bg-white dark:bg-slate-800 border-r dark:border-slate-700 flex flex-col">
      <div className="p-4 font-bold text-lg border-b dark:border-slate-700 dark:text-white">Inventory System</div>
      <nav className="flex-1 p-2 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.key}
            onClick={() => onNavigate(item.key)}
            className={`flex items-center w-full text-left px-4 py-3 rounded hover:bg-gray-100 dark:hover:bg-slate-700 ${
              active === item.key ? "bg-gray-200 dark:bg-slate-600 font-semibold dark:text-white" : "dark:text-slate-300"
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
      <div className="p-4 border-t dark:border-slate-700">
        <button
          onClick={handleLogout}
          className="flex items-center w-full text-left px-4 py-3 rounded hover:bg-gray-100 dark:hover:bg-slate-700 dark:text-slate-300"
        >
          <span className="mr-3">🚪</span>
          Logout
        </button>
      </div>
    </div>
  );
}