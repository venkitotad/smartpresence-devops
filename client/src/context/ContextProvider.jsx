import React, { createContext, useContext, useState, useEffect } from "react";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [currentColor, setCurrentColor] = useState("#1A97F5");
  const [currentMode, setCurrentMode] = useState("Light");
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [themeSettings, setThemeSettings] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);


  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const setMode = (e) => {
    setCurrentMode(e.target.value);
    setThemeSettings(false);
  };

  const setColor = (color) => {
    setCurrentColor(color);
    setThemeSettings(false);
  };

 return (
  <StateContext.Provider
    value={{
      activeMenu, setActiveMenu,
      screenSize, setScreenSize,
      isSidebarCollapsed, setIsSidebarCollapsed,
      currentColor, setCurrentColor
    }}
  >
    {children}
  </StateContext.Provider>
);

};

export const useStateContext = () => useContext(StateContext);
