// src/pages/Home.jsx
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center text-white"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1581092795360-fd1ca04f0952')",
      }}
    >
      <div className="bg-black bg-opacity-50 p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-6">Smart Inventory Management System</h1>
        <div className="space-y-4">
          <Link
            to="/guest-view"
            className="block px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg font-semibold"
          >
            View as Guest
          </Link>
          <Link
            to="/login-user"
            className="block px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold"
          >
            Login as User
          </Link>
          <Link
            to="/login-admin"
            className="block px-6 py-3 bg-red-500 hover:bg-red-600 rounded-lg font-semibold"
          >
            Login as Admin
          </Link>
        </div>
      </div>
    </div>
  );
}