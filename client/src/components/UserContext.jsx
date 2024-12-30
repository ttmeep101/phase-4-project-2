import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [signedIn, setSignedIn] = useState(false)

  return (
    <UserContext.Provider value={{ signedIn, setSignedIn }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};