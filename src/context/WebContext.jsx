import React, { createContext, useContext, useState } from "react";

const ContextProvider = createContext();

const WebContext = ({ children }) => {
  const API_LINK = import.meta.env.VITE_API_LINK;
  const [userLoggedIn, setUserLoggedIn] = useState(null);

  const [isLogin, setIsLogin] = useState(false);
  return (
    <ContextProvider.Provider value={{ userLoggedIn, setUserLoggedIn, API_LINK, isLogin, setIsLogin }}>
      {children}
    </ContextProvider.Provider>
  );
};

const useWebContext = () => useContext(ContextProvider);

export { WebContext, useWebContext };