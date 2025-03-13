'use client';

import React, { useState, useRef } from 'react';

interface SidebarItem {
  label: string;
  icon?: React.ReactNode;
  children?: SidebarItem[];
}

const sidebarItems: SidebarItem[] = [
  {
    label: 'Dashboard',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='h-6 w-6'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
        />
      </svg>
    )
  },
  {
    label: 'Products',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='h-6 w-6'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M16 11V7a4 4 0 00-8 0v4m8 0v4a4 4 0 11-8 0v-4m8 0H8m-8 0v4a4 4 0 004 4h8a4 4 0 004-4v-4m-8 0z'
        />
      </svg>
    ),
    children: [
      { label: 'All Products' },
      { label: 'Add Product' },
      { label: 'Categories' }
    ]
  },
  {
    label: 'Customers',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='h-6 w-6'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
        />
      </svg>
    ),
    children: [{ label: 'All Customers' }, { label: 'New Customer' }]
  },
  {
    label: 'Settings',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='h-6 w-6'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
        />
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
        />
      </svg>
    )
  }
];

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const sidebarRef = useRef<HTMLElement>(null);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside
      ref={sidebarRef}
      className={`top-10 left-0 z-20 flex min-h-screen flex-col bg-gray-50 p-4 text-gray-700 transition-all duration-300 dark:bg-gray-800 dark:text-gray-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className='mt-8 mb-4 flex items-center justify-between'>
        <h2
          className={`text-2xl font-bold transition-opacity duration-300 ${
            isCollapsed ? 'hidden' : 'opacity-100'
          }`}
        >
          Menu
        </h2>
        <button
          onClick={toggleCollapse}
          className='z-30 flex items-center justify-self-center rounded-full p-1 hover:bg-gray-200 focus:outline-none dark:hover:bg-gray-700'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className={`h-6 w-6 transition-transform duration-300 ${
              isCollapsed ? '' : 'rotate-180'
            }`}
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M9 5l7 7-7 7'
            />
          </svg>
        </button>
      </div>
      <nav className='flex-1'>
        <ul className='space-y-2'>
          {sidebarItems.map(item => (
            <li key={item.label}>
              {item.children ? (
                <details className='group'>
                  <summary
                    className={`flex w-full cursor-pointer list-none items-center rounded-md px-4 py-2 hover:bg-gray-200 focus:outline-none dark:hover:bg-gray-700 ${
                      isCollapsed ? 'justify-center' : 'justify-start'
                    }`}
                    onClick={isCollapsed ? toggleCollapse : undefined}
                  >
                    {item.icon && <span>{item.icon}</span>}
                    <span
                      className={`transition-opacity duration-300 ${
                        isCollapsed ? 'hidden' : 'opacity-100'
                      }`}
                    >
                      {item.label}
                    </span>
                    {!isCollapsed && (
                      <svg
                        className={`ml-auto h-4 w-4 transition-transform group-open:rotate-90`}
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M9 5l7 7-7 7'
                        />
                      </svg>
                    )}
                  </summary>
                  <ul
                    className={`mt-2 ml-6 space-y-1 ${
                      isCollapsed ? 'hidden' : ''
                    }`}
                  >
                    {item.children.map(child => (
                      <li key={child.label}>
                        <a
                          href='#'
                          className='block rounded-md px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700'
                        >
                          {child.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </details>
              ) : (
                <a
                  href='#'
                  className={`flex items-center rounded-md px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 ${
                    isCollapsed ? 'justify-center' : 'justify-start'
                  }`}
                >
                  {item.icon && <span>{item.icon}</span>}
                  <span
                    className={`transition-opacity duration-300 ${
                      isCollapsed ? 'hidden' : 'opacity-100'
                    }`}
                  >
                    {item.label}
                  </span>
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
