'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface SidebarContextType {
  isCollapsed: boolean;
  toggleCollapse: () => void;
}

export const SidebarContext = createContext<SidebarContextType | null>(null);

export const SidebarProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const isSmallScreen = window.innerWidth < 40 * 16; // 40rem = 40 * 16px (assuming 1rem = 16px)
      setIsCollapsed(isSmallScreen); // Update state based on screen size, collapse if smallscreen
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call once on mount to set initial state
    return () => window.removeEventListener('resize', handleResize); // Cleanup on unmount
  }, []);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <SidebarContext.Provider value={{ isCollapsed, toggleCollapse }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (context === null) {
    throw new Error('useSidebarContext must be used within a SidebarProvider');
  }
  return context;
};
