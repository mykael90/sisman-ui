'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Import for getting current route
import { useState } from 'react';
import { useSidebarContext } from '@/src/app/components/context/SidebarProvider';
import Image from 'next/image';
import logo from '@/assets/img/logo.svg';
import logo_dark from '@/assets/img/dark-logo.svg';
import { Menu } from 'lucide-react';
import ThemeToggle from '../ThemeToogle';
import ButtonNavBar from '../ui/ButtonNavBar';

const Navbar: React.FC = () => {
  const pathname = usePathname(); // Use usePathname instead of useRouter
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulate login state
  const { isCollapsed, toggleCollapse } = useSidebarContext(); // Use the context

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <nav className='fixed top-2 left-0 z-30 w-full bg-gray-50 py-1 shadow-md dark:bg-gray-800 dark:text-gray-300'>
      <div className='flex content-center justify-between ps-2'>
        <div className='flex content-center'>
          <ButtonNavBar onClick={toggleCollapse} title='Menu'>
            <Menu className='h-6 w-6' />
          </ButtonNavBar>
          {/* Logo */}
          <Link href='/' className='py-1 ps-2'>
            <Image
              src={logo}
              alt='SisMan Logo'
              // width={80} // Adjust width as needed
              height={26} // Adjust height as needed
              className='dark:hidden'
            />
            <Image
              src={logo_dark}
              alt='SisMan Logo'
              // width={80} // Adjust width as needed
              height={26} // Adjust height as needed
              className='hidden dark:block'
            />
          </Link>
          <div className='ps-2'>
            <ThemeToggle></ThemeToggle>
          </div>
        </div>

        {/* Current Route */}
        <div className='hidden items-center sm:flex'>
          <span className='text-gray-600 dark:text-gray-400'>
            Current Route: {pathname}
          </span>
        </div>

        {/* Botões de redes sociais */}
        <div className='items-center sm:flex'>
          <div></div>
        </div>

        {/* User Status (Simulated) */}
        <div className='flex items-center pe-4'>
          {isLoggedIn ? (
            <>
              <span className='text-gray-600 dark:text-gray-400'>
                Logged in as: User (Simulated)
              </span>
              <button
                onClick={handleLogout}
                className='ml-2 text-blue-500 hover:underline'
              >
                Sign out
              </button>
            </>
          ) : (
            <button
              onClick={handleLogin}
              className='text-blue-500 hover:underline'
            >
              Sign in
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
