import React, { createContext, useContext } from "react";
import useRouteState from "../hooks/route";

interface RouteContextType {
  currentRoute: string;
  updateRoute: (newRoute: string) => void;
}

const RouteContext = createContext<RouteContextType | undefined>(undefined);

export const RouteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const routeState = useRouteState();

  return (
    <RouteContext.Provider value={routeState}>
      {children}
    </RouteContext.Provider>
  );
};

export const useRouteContext = () => {
  const context = useContext(RouteContext);
  if (!context) {
    throw new Error("useRouteContext must be used within a RouteProvider");
  }
  return context;
};