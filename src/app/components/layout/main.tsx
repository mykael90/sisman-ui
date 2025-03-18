'use client';

import React from 'react';
import { useSidebarContext } from '../sidebarProvider';

export default function Main({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebarContext();
  return (
    <div
      className={`mt-13 flex-1 overflow-y-auto ${!isCollapsed ? 'hidden sm:flex' : ''}`}
    >
      {children}
    </div>
  );
}
