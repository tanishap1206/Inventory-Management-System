// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

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

  const login = (userData) => {
    setCurrentUser(userData);
    setUserRole(userData.role);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const logout = () => {
    setCurrentUser(null);
    setUserRole('guest');
    localStorage.removeItem('currentUser');
  };

  const switchUser = (newUserData) => {
    setCurrentUser(newUserData);
    setUserRole(newUserData.role);
    localStorage.setItem('currentUser', JSON.stringify(newUserData));
  };

  // Check if user is logged in on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setCurrentUser(userData);
      setUserRole(userData.role);
    }
  }, []);

  const value = {
    currentUser,
    userRole,
    login,
    logout,
    switchUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};