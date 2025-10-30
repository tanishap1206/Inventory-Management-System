// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const API_URL = 'http://localhost:5000/api';
const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState('guest');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const login = async (loginData) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('AuthContext: Processing login data', {
        hasToken: !!loginData?.token,
        hasUser: !!loginData?.user,
        userRole: loginData?.user?.role
      });

      if (!loginData?.token || !loginData?.user) {
        throw new Error('Invalid login data received');
      }

      // Store user data
      setCurrentUser(loginData.user);
      setUserRole(loginData.user.role);
      localStorage.setItem('token', loginData.token);
      localStorage.setItem('currentUser', JSON.stringify(loginData.user));
      
      console.log('AuthContext: Login successful', {
        role: loginData.user.role,
        userSet: !!currentUser,
        roleSet: !!userRole
      });
      
      return loginData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setCurrentUser(null);
    setUserRole('guest');
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
  };

  const verifyToken = async (token) => {
    try {
      const response = await fetch(`${API_URL}/auth/verify`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      return response.ok;
    } catch (err) {
      return false;
    }
  };

  // Check if user is logged in on app start and verify token
  useEffect(() => {
    const initAuth = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const savedUser = localStorage.getItem('currentUser');
        
        if (token && savedUser) {
          const isValid = await verifyToken(token);
          if (isValid) {
            const userData = JSON.parse(savedUser);
            setCurrentUser(userData);
            setUserRole(userData.role);
          } else {
            // Token invalid - clear everything
            localStorage.removeItem('token');
            localStorage.removeItem('currentUser');
            setCurrentUser(null);
            setUserRole('guest');
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const value = {
    currentUser,
    userRole,
    loading,
    error,
    login,
    logout,
    isAuthenticated: !!currentUser
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};