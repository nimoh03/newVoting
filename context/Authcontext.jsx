import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. Create context
const AuthContext = createContext();

// 2. Create a provider
export const AuthProvider = ({ children }) => {
//   const [authToken, setAuthToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 3. Load from sessionStorage on app start
  useEffect(() => {
    // const token = sessionStorage.getItem("authToken");
    const userId = sessionStorage.getItem("userId");

    if (userId) {
    //   setAuthToken(token);
      setUserId(userId);
      setIsLoggedIn(true);
    }
  }, []);

  // 4. Login function
  const login = ( userId) => {
    // sessionStorage.setItem("authToken", token);
    sessionStorage.setItem("userId", userId);
    // setAuthToken(token);
    setUserId(userId);
    setIsLoggedIn(true);
  };

  // 5. Logout function


  return (
    <AuthContext.Provider value={{  userId, isLoggedIn, login }}>
      {children}
    </AuthContext.Provider>
  );
};

// 6. Easy hook to use it anywhere
export const useAuth = () => useContext(AuthContext);
