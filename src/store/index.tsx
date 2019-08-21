import React, { useContext, useReducer } from 'react';

export const AppContext = React.createContext({});

export const useAppState = () => useContext(AppContext);

export const AppContextProvider = ({ children, reducer, initValue }: any) => {
  return (
    <AppContext.Provider value={useReducer(reducer, initValue)}>{children}</AppContext.Provider>
  );
};
