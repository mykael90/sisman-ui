'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useSidebarContext } from '@/components/sidebarContext';
import NavLink from '@/components/ui/NavLink';
import Summary from '@/components/ui/Summary';
import {
  Home,
  Package,
  Users,
  Drill,
  Building2,
  Truck,
  Store,
  Settings,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

interface SidebarItem {
  label: string;
  href?: string; // Make href optional for non-link items
  icon?: React.ReactNode;
  children?: SidebarItem[];
}

const sidebarItems: SidebarItem[] = [
  {
    label: 'Início',
    href: '/inicio',
    icon: <Home className='h-6 w-6' />
  },
  {
    label: 'Materiais',
    href: '/material', //Optional, could be omitted if you don't want a direct link to Materiais
    icon: <Package className='h-6 w-6' />,
    children: [
      { label: 'Todos os Materiais', href: '/material/all' },
      { label: 'Adicionar Material', href: '/material/add' },
      { label: 'Categorias', href: '/material/category' }
    ]
  },
  {
    label: 'Colaboradores',
    icon: <Users className='h-6 w-6' />,
    children: [
      { label: 'Todos os Colaboradores' },
      { label: 'Adicionar Colaborador' },
      { label: 'Cargos' }
    ]
  },
  {
    label: 'Equipamentos',
    icon: <Drill className='h-6 w-6' />,
    children: [
      { label: 'Todos os Equipamentos' },
      { label: 'Adicionar Equipamento' },
      { label: 'Tipos' }
    ]
  },
  {
    label: 'Infraestrutura',
    icon: <Building2 className='h-6 w-6' />,
    children: [
      { label: 'Todas as Infraestruturas' },
      { label: 'Adicionar Infraestrutura' },
      { label: 'Tipos' }
    ]
  },
  {
    label: 'Fornecedores',
    icon: <Store className='h-6 w-6' />,
    children: [
      { label: 'Todos os Fornecedores' },
      { label: 'Adicionar Fornecedor' },
      { label: 'Categorias' }
    ]
  },
  {
    label: 'Frota',
    icon: <Truck className='h-6 w-6' />,
    children: [
      { label: 'Todos os Veículos' },
      { label: 'Adicionar Veículo' },
      { label: 'Tipos' }
    ]
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: <Settings className='h-6 w-6' />
  }
];

const Sidebar: React.FC = () => {
  const { isCollapsed, toggleCollapse, isMobile } = useSidebarContext(); // Use the context
  const sidebarRef = useRef<HTMLElement>(null);
  // const isMobile = useMediaQuery('(max-width: 640px)'); // Define a media query for mobile (sm breakpoint)

  // Function to collapse the sidebar
  const collapseSidebar = () => {
    if (!isCollapsed) {
      toggleCollapse();
    }
  };

  return (
    <aside
      ref={sidebarRef}
      className={`top-10 left-0 z-20 flex h-[calc(100vh-3.5rem)] flex-col overflow-y-auto bg-gray-50 py-4 text-gray-700 transition-all duration-300 dark:bg-gray-800 dark:text-gray-300 ${
        isCollapsed ? 'w-0 sm:w-16' : 'w-full sm:w-64'
      }`}
    >
      {/* <div className='mt-8 mb-4 flex items-center justify-between px-4'>
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
          {isCollapsed ? (
            <ChevronRight className='h-6 w-6' />
          ) : (
            <ChevronLeft className='h-6 w-6' />
          )}
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
                    className={`hover:bg-sisman-green/10 dark:hover:bg-sisman-green/20 flex w-full cursor-pointer list-none items-center rounded-md px-4 py-2 focus:outline-none ${
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
                      <ChevronRight
                        className={`ml-auto h-4 w-4 transition-transform group-open:rotate-90`}
                      />
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
                          <NavLink
                            href={child.href}
                            onClick={() => {
                              if (isMobile) {
                                collapseSidebar();
                              }
                            }}
                          >
                            {child.label}
                          </NavLink>
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
                  className={`flex items-center rounded-md px-4 py-2 ${
                    isCollapsed
                      ? 'hidden justify-center sm:block'
                      : 'justify-start'
                  }`}
                  onClick={() => {
                    if (isMobile) {
                      collapseSidebar();
                    }
                  }}
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
