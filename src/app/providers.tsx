'use client';

import { SidebarProvider } from '@/components/context/SidebarProvider';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '@/components/context/ThemeProvider';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <SessionProvider>
        <SidebarProvider>{children}</SidebarProvider>
      </SessionProvider>
    </ThemeProvider>
  );
};

export default Providers;
