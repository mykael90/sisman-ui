'use client';

import React, { useRef } from 'react';
import { useSidebarContext } from '../sidebarContext';
import NavLink from '../ui/NavLink';
import Summary from '../ui/Summary';

interface SidebarItem {
  label: string;
  href?: string; // Make href optional for non-link items
  icon?: React.ReactNode;
  children?: SidebarItem[];
}

const sidebarItems: SidebarItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
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
    label: 'Materiais',
    href: '/material', //Optional, could be omitted if you don't want a direct link to Materiais
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className='h-6 w-6'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0v1.5m-2.25-1.5v1.5m16.5 10.5v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 0010.5 1.5H8.25m2.25 16.5V18.75m-2.25 1.5v-1.5m16.5-10.5v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125V7.5'
        />
      </svg>
    ),
    children: [
      { label: 'Todos os Materiais', href: '/material/all' },
      { label: 'Adicionar Material', href: '/material/add' },
      { label: 'Categorias', href: '/material/category' }
    ]
  },
  {
    label: 'Colaboradores',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className='h-6 w-6'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-3.055m0-3.285a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zM3 16.628a18.138 18.138 0 013.375-9.734 4.5 4.5 0 012.25-.911m-2.25 9.734h13.5m-13.5 0h3m3 0h3m3 0h3'
        />
      </svg>
    ),
    children: [
      { label: 'Todos os Colaboradores' },
      { label: 'Adicionar Colaborador' },
      { label: 'Cargos' }
    ]
  },
  {
    label: 'Equipamentos',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className='h-6 w-6'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0v.75A2.25 2.25 0 0118.75 8h-1.5m-4.5 0h-6m4.5 0H5.25A2.25 2.25 0 003 8m18 0v-.75A2.25 2.25 0 0018.75 5h-1.5m-4.5 0h-6m4.5 0H3v.75A2.25 2.25 0 005.25 8h1.5m16.5 10.5h-1.5'
        />
      </svg>
    ),
    children: [
      { label: 'Todos os Equipamentos' },
      { label: 'Adicionar Equipamento' },
      { label: 'Tipos' }
    ]
  },
  {
    label: 'Infraestrutura',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className='h-6 w-6'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
        />
      </svg>
    ),
    children: [
      { label: 'Todas as Infraestruturas' },
      { label: 'Adicionar Infraestrutura' },
      { label: 'Tipos' }
    ]
  },
  {
    label: 'Fornecedores',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className='h-6 w-6'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.013.16-.02.32-.02.482m19.5 0c0 1.232.046 2.453.138 3.662a4.007 4.007 0 01-3.7 3.7 48.678 48.678 0 01-7.324 0 4.007 4.007 0 01-3.7-3.7c-.013-.16-.02-.32-.02-.482m19.5 0a48.427 48.427 0 00-1.814-6.326 4.006 4.006 0 00-3.7-3.7c-.543 0-1.16.042-1.8.124m-11.42 0c-.639-.082-1.256-.124-1.8-.124a4.006 4.006 0 00-3.7 3.7c-1.14 4.02-1.14 8.571 0 12.591m16.826 0a48.678 48.678 0 01-7.324 0 4.007 4.007 0 01-3.7-3.7c-.013-.16-.02-.32-.02-.482'
        />
      </svg>
    ),
    children: [
      { label: 'Todos os Fornecedores' },
      { label: 'Adicionar Fornecedor' },
      { label: 'Categorias' }
    ]
  },
  {
    label: 'Frota',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className='h-6 w-6'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M18 12.75h-1.5m-6 0H4.5m6 0v-6m2.25 6v.9m-4.5-.9h4.5m-4.5 0a4.5 4.5 0 01-9 0v-3m16.5 3a4.5 4.5 0 01-9 0v-6m9 0H4.5'
        />
      </svg>
    ),
    children: [
      { label: 'Todos os Veículos' },
      { label: 'Adicionar Veículo' },
      { label: 'Tipos' }
    ]
  },
  {
    label: 'Settings',
    href: '/settings',
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
  const { isCollapsed, toggleCollapse } = useSidebarContext(); // Use the context
  const sidebarRef = useRef<HTMLElement>(null);

  return (
    <aside
      ref={sidebarRef}
      className={`top-10 left-0 z-20 flex min-h-screen flex-col bg-gray-50 py-4 text-gray-700 transition-all duration-300 dark:bg-gray-800 dark:text-gray-300 ${
        isCollapsed ? 'w-0 sm:w-16' : 'w-full sm:w-64'
      }`}
    >
      {/* <div className='mt-8 mb-4 flex items-center justify-between'>
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
      </div> */}
      <nav className='mt-9 flex-1'>
        <ul className='space-y-2'>
          {sidebarItems.map(item => (
            <li key={item.label}>
              {item.children ? (
                <details className='group'>
                  <Summary
                    href={item.href}
                    className={`flex w-full cursor-pointer list-none items-center rounded-md px-4 py-2 hover:bg-gray-200 focus:outline-none dark:hover:bg-gray-700 ${
                      isCollapsed
                        ? 'hidden justify-center sm:block'
                        : 'justify-start'
                    }`}
                    onClick={isCollapsed ? toggleCollapse : undefined}
                  >
                    {item.icon && <span>{item.icon}</span>}
                    <span
                      className={`ps-1 transition-opacity duration-300 ${
                        isCollapsed ? 'hidden' : 'sm:opacity-100'
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
                  </Summary>
                  <ul
                    className={`mt-2 ml-6 space-y-1 ${
                      isCollapsed ? 'hidden' : ''
                    }`}
                  >
                    {item.children.map(child => (
                      <li key={child.label}>
                        {child.href ? (
                          <NavLink href={child.href}>{child.label}</NavLink>
                        ) : (
                          <span className='block px-4 py-2 ps-1'>
                            {child.label}
                          </span> //Handle non-link children
                        )}
                      </li>
                    ))}
                  </ul>
                </details>
              ) : item.href ? (
                <NavLink
                  href={item.href}
                  className={`flex items-center rounded-md px-4 py-2 ${isCollapsed ? 'hidden justify-center sm:block' : 'justify-start'}`}
                >
                  {item.icon && <span>{item.icon}</span>}
                  <span
                    className={`ps-1 transition-opacity duration-300 ${isCollapsed ? 'hidden' : 'opacity-100'}`}
                  >
                    {item.label}
                  </span>
                </NavLink>
              ) : (
                <span className='flex items-center rounded-md px-4 py-2'>
                  {item.label}
                </span> //Handle top-level non-link items
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
