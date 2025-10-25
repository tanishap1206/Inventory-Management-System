// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Home from "./pages/Home";
import LoginUser from "./pages/LoginUser";
import LoginAdmin from "./pages/LoginAdmin";
import GuestView from "./pages/GuestView";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import Layout from "./components/Layout";
import DashboardLayout from "./layouts/DashboardLayout";

export default function App() {
  const { userRole } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Homepage */}
        <Route path="/" element={<Home />} />

        {/* Login Pages */}
        <Route path="/login-user" element={<LoginUser />} />
        <Route path="/login-admin" element={<LoginAdmin />} />

        {/* Guest View */}
        <Route path="/guest-view" element={<GuestView />} />

        {/* Dashboard - handles both user and admin based on role */}
        <Route 
          path="/dashboard" 
          element={
            userRole === 'admin' ? (
              <DashboardLayout>
                <AdminDashboard />
              </DashboardLayout>
            ) : userRole === 'user' ? (
              <DashboardLayout>
                <UserDashboard />
              </DashboardLayout>
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />

        {/* Inventory - accessible to both users and admins */}
        <Route 
          path="/inventory" 
          element={
            userRole === 'guest' ? (
              <GuestView />
            ) : (
              <DashboardLayout>
                <Inventory />
              </DashboardLayout>
            )
          } 
        />

        {/* Admin-only routes */}
        <Route 
          path="/admin/*" 
          element={
            userRole === 'admin' ? (
              <DashboardLayout>
                <Routes>
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="reports" element={<div className="p-6 dark:bg-slate-900 dark:text-white min-h-screen">Reports Page</div>} />
                </Routes>
              </DashboardLayout>
            ) : (
              <div className="flex items-center justify-center min-h-screen text-xl dark:bg-slate-900 dark:text-white">
                Unauthorized Access
              </div>
            )
          } 
        />

        {/* Fallback Route */}
        <Route
          path="*"
          element={
            <div className="flex items-center justify-center min-h-screen text-xl dark:bg-slate-900 dark:text-white">
              404 - Page Not Found
            </div>
          }
        />
      </Routes>
    </Router>
  );
}