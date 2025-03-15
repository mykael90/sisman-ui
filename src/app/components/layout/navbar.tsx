'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Import for getting current route
import { useState } from 'react';
import { useSidebarContext } from '@/components/sidebarContext';
import Image from 'next/image';
import logo from '@/assets/img/logo.svg';

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
      <div className='flex content-center justify-between ps-3'>
        <div className='flex content-center'>
          <button
            onClick={toggleCollapse}
            className='rounded-full hover:bg-gray-200 focus:outline-none dark:hover:bg-gray-700'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className={`h-9 w-9 rounded-xs p-1 transition-transform duration-300`}
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              {/* Hamburger Icon */}
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 6h16M4 12h16m-7 6h7'
              />
            </svg>
          </button>
          {/* Logo */}
          <Link href='/' className='py-1 ps-4'>
            <Image
              src={logo}
              alt='SisMan Logo'
              // width={80} // Adjust width as needed
              height={26} // Adjust height as needed
              className='filter dark:brightness-50 dark:grayscale-100 dark:invert-80'
            />
          </Link>
        </div>

        {/* Current Route */}
        <div className='hidden items-center sm:flex'>
          <span className='text-gray-600 dark:text-gray-400'>
            Current Route: {pathname}
          </span>
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
