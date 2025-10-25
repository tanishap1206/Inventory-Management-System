// src/components/Header.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import SettingsModal from "./SettingsModal";

export default function Header({ onOpenSidebar }) {
  const { currentUser } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <>
      <header className="bg-white dark:bg-slate-800 shadow px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button
            className="lg:hidden inline-flex items-center justify-center rounded-lg border px-2.5 py-2 dark:border-slate-600 dark:text-white"
            onClick={onOpenSidebar}
            aria-label="Open menu"
          >
            ☰
          </button>
          <div>
            <h1 className="text-xl font-semibold dark:text-white">Dashboard</h1>
            <p className="text-sm text-neutral-500 dark:text-slate-400">
              Overview of your inventory system
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm dark:text-white">Role: {currentUser?.role || 'guest'}</span>
          
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 dark:text-white"
            aria-label="Toggle theme"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 dark:text-white"
            aria-label="Settings"
          >
            ⚙️
          </button>
        </div>
      </header>
      
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
    </>
  );
}