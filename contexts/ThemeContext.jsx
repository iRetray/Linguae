import React, { createContext, useReducer } from "react";

export const ThemeContext = createContext({});

const initialState = {
  isDarkMode: false,
};
const themeReducer = (state, { type }) => {
  switch (type) {
    case "SET_DARK_THEME":
      return {
        ...state,
        isDarkMode: true,
      };
    case "SET_LIGHT_THEME":
      return {
        ...state,
        isDarkMode: false,
      };
  }
};

export const ThemeProvider = ({ children }) => {
  const [state, ThemeDispatch] = useReducer(themeReducer, initialState);

  return (
    <ThemeContext.Provider value={[state, ThemeDispatch]}>
      {children}
    </ThemeContext.Provider>
  );
};
