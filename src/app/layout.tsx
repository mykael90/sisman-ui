import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/navbar';
import Sidebar from '@/components/layout/sidebar';
import Footer from '@/components/layout/footer';
import { SidebarProvider } from '@/components/sidebarContext';
import Main from '@/components/layout/main';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SidebarProvider>
          <div className='bg-sisman-blue dark:bg-sisman-green t-0 fixed z-50 h-2 w-full'></div>
          <Navbar />
          <div className='h-min-[calc(100vh-3.5rem)] flex flex-col'>
            <div className='flex'>
              <Sidebar />
              <Main>{children}</Main>
            </div>
            <Footer /> {/* Footer will stick to the bottom */}
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
