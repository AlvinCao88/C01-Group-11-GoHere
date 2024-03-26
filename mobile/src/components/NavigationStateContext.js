import React, { createContext, useContext, useState } from 'react';

const NavigationStateContext = createContext();

export const useNavigationState = () => useContext(NavigationStateContext);

export const NavigationStateProvider = ({ children }) => {
  const [isWashroomInfoFocused, setIsWashroomInfoFocused] = useState(false);

  return (
    <NavigationStateContext.Provider value={{ isWashroomInfoFocused, setIsWashroomInfoFocused }}>
      {children}
    </NavigationStateContext.Provider>
  );
};
