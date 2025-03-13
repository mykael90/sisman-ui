'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Import for getting current route
import { useState } from 'react';

const Navbar: React.FC = () => {
  const pathname = usePathname(); // Use usePathname instead of useRouter
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulate login state

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <nav className='fixed top-0 left-0 z-30 w-full bg-gray-50 p-1 shadow-md dark:bg-gray-800'>
      <div className='container mx-auto flex items-center justify-between'>
        {/* Logo */}
        <Link
          href='/'
          className='text-xl font-bold text-gray-800 dark:text-gray-100'
        >
          SisMan
        </Link>

        {/* Current Route */}
        <span className='text-gray-600 dark:text-gray-400'>
          Current Route: {pathname}
        </span>

        {/* User Status (Simulated) */}
        <div className='flex items-center'>
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
