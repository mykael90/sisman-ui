'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Import for getting current route
import { useState } from 'react';
import { useSidebarContext } from './sidebarContext';

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
    <nav className='fixed top-0 left-0 z-30 w-full bg-gray-50 py-1 shadow-md dark:bg-gray-800 dark:text-gray-300'>
      <div className='flex content-center justify-between ps-4'>
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
          <Link
            href='/'
            className='py-1 ps-4 text-xl font-bold text-gray-800 dark:text-gray-100'
          >
            SisMan
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
