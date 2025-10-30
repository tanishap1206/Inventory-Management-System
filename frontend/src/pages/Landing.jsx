import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Landing() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Liquid Glass Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/30 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-indigo-500/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 animate-fade-in">
            Inventory Management System
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-12 animate-fade-in animation-delay-300">
            Efficiently manage and track your assets across multiple locations with our state-of-the-art inventory system
          </p>

          {/* Glass Card */}
          <div className="backdrop-blur-lg bg-white/10 p-8 rounded-2xl shadow-2xl mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 rounded-lg hover:bg-white/10 transition-all">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-xl font-semibold text-white mb-2">Real-time Tracking</h3>
                <p className="text-blue-100">Monitor your inventory status across all locations in real-time</p>
              </div>
              <div className="text-center p-6 rounded-lg hover:bg-white/10 transition-all">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-white mb-2">Smart Search</h3>
                <p className="text-blue-100">Find any asset instantly with our powerful search system</p>
              </div>
              <div className="text-center p-6 rounded-lg hover:bg-white/10 transition-all">
                <div className="text-4xl mb-4">📱</div>
                <h3 className="text-xl font-semibold text-white mb-2">Mobile Ready</h3>
                <p className="text-blue-100">Access your inventory on any device, anywhere, anytime</p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
                >
                  Sign In
                </Link>
                <Link
                  to="/guest"
                  className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white/10 transition-all"
                >
                  Continue as Guest
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}