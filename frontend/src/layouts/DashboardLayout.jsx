// src/layouts/DashboardLayout.jsx
import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import MobileSidebar from "../components/MobileSidebar";
import { useAuth } from "../context/AuthContext";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");
  const { userRole } = useAuth();

  const handleNavigate = (page) => {
    setActivePage(page);
    setSidebarOpen(false);
    
    // Navigate to the selected page
    const basePath = userRole === 'admin' ? '/admin' : '/user';
    window.location.href = `${basePath}/${page}`;
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-slate-900">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar 
          active={activePage} 
          onNavigate={handleNavigate} 
          role={userRole} 
        />
      </div>
      
      {/* Mobile Sidebar */}
      <MobileSidebar 
        open={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        active={activePage} 
        onNavigate={handleNavigate} 
        role={userRole} 
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          onOpenSidebar={() => setSidebarOpen(true)} 
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}