"use client";
import {
  createContext,
  useContext,
  useState,
  PropsWithChildren,
  Dispatch,
  SetStateAction,
} from "react";

type Sidebar = {
  isOpen: boolean | null;
};

type ContextType = [
  sidebarContext: Sidebar,
  setSidebarContainer: Dispatch<SetStateAction<Sidebar>>
];

export const SidebarContext = createContext<ContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: PropsWithChildren<{}>) => {
  const value = useState<Sidebar>({
    isOpen: null,
  });
  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error(
      "useSidebarContext must be used inside the SidebarProvider"
    );
  }
  return context;
};
