// src/components/Layout.jsx
import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MobileSidebar from "./MobileSidebar";
import { useAuth } from "../context/AuthContext";

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");
  const { currentUser } = useAuth();

  const handleNavigate = (page) => {
    setActivePage(page);
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-slate-900">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar 
          active={activePage} 
          onNavigate={handleNavigate} 
          role={currentUser?.role} 
        />
      </div>
      
      {/* Mobile Sidebar */}
      <MobileSidebar 
        open={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        active={activePage} 
        onNavigate={handleNavigate} 
        role={currentUser?.role} 
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