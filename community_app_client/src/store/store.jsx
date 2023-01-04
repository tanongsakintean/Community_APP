import React, { useContext, createContext, useReducer } from "react";
const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, Children }) => {
  return (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {Children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);
