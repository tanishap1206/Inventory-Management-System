// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Landing from "./pages/Landing";
import LoginUser from "./pages/LoginUser";
import LoginAdmin from "./pages/LoginAdmin";
import GuestView from "./pages/GuestView";
import Inventory from "./pages/Inventory";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import DashboardLayout from "./layouts/DashboardLayout";

export default function App() {
  const { userRole, isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/login-admin" element={<LoginAdmin />} />
        <Route path="/guest" element={<GuestView />} />

        {/* Protected Admin Routes */}
        <Route 
          path="/admin/*" 
          element={
            userRole === 'admin' ? (
              <DashboardLayout>
                <Routes>
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="inventory" element={<Inventory />} />
                  <Route path="reports" element={
                    <div className="p-6 dark:bg-slate-900 dark:text-white min-h-screen">
                      Reports Page
                    </div>
                  } />
                  <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
                </Routes>
              </DashboardLayout>
            ) : isAuthenticated ? (
              <div className="flex items-center justify-center min-h-screen text-xl dark:bg-slate-900 dark:text-white">
                Unauthorized Access - Admin Only
              </div>
            ) : (
              <Navigate to="/login-admin" replace />
            )
          } 
        />

        {/* Protected User Routes */}
        <Route 
          path="/user/*" 
          element={
            userRole === 'user' || userRole === 'staff' ? (
              <DashboardLayout>
                <Routes>
                  <Route path="dashboard" element={<UserDashboard />} />
                  <Route path="inventory" element={<Inventory />} />
                  <Route path="*" element={<Navigate to="/user/dashboard" replace />} />
                </Routes>
              </DashboardLayout>
            ) : isAuthenticated ? (
              <div className="flex items-center justify-center min-h-screen text-xl dark:bg-slate-900 dark:text-white">
                Unauthorized Access - Staff Only
              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />

        {/* Redirect old dashboard path to appropriate one */}
        <Route 
          path="/dashboard" 
          element={
            !isAuthenticated ? (
              <Navigate to="/login" replace />
            ) : userRole === 'admin' ? (
              <Navigate to="/admin/dashboard" replace />
            ) : (
              <Navigate to="/user/dashboard" replace />
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