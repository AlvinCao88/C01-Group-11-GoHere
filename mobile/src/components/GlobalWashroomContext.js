import React, { createContext, useContext, useState } from 'react';
const WashroomContext = createContext();

export function getGlobalWashroom() {
  return useContext(WashroomContext);
}
export const GlobalWashroom = ({ children }) => {
  const [currentWashroom, setCurrentWashroom] = useState(null);
  const setWashroom = (washroom) => {
    setCurrentWashroom(washroom);
  };

  return (
    <WashroomContext.Provider value={{ currentWashroom, setWashroom }}>
      {children}
    </WashroomContext.Provider>
  );
};
