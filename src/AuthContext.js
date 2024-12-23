// AuthContext.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const updateLoginStatus = (status, isAdmin = false) => {
    setIsLoggedIn(status);
    setIsAdmin(isAdmin);
  };

  const login = (userData) => {
    setUserInfo(userData);
    setIsLoggedIn(true);
    setIsAdmin(userData.isAdmin);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUserInfo({});
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isAdmin, userInfo, updateLoginStatus, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
