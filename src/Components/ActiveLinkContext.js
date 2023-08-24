import React, { createContext, useContext, useState } from 'react';

const ActiveLinkContext = createContext();

export const useActiveLink = () => {
  return useContext(ActiveLinkContext);
};

export const ActiveLinkProvider = ({ children }) => {
  const [activeLink, setActiveLink] = useState('');

  return (
    <ActiveLinkContext.Provider value={{ activeLink, setActiveLink }}>
      {children}
    </ActiveLinkContext.Provider>
  );
};
