import React, { useContext } from "react";
import { ThemeContext } from "../contexts";

export const ContentLayout = ({ children }) => {
  const [themeState] = useContext(ThemeContext);
  return (
    <div
      className={`ContentLayoutContainer ${
        themeState.isDarkMode ? "dark" : "light"
      }`}
    >
      {children}
    </div>
  );
};
