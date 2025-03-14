'use client';

import React from 'react';
import { useSidebarContext } from '../sidebarContext';

export default function Main({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebarContext();
  return (
    <div
      className={`transition-opacity duration-300 ${!isCollapsed ? 'hidden sm:flex' : ''}`}
    >
      {children}
    </div>
  );
}
