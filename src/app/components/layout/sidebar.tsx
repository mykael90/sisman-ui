'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useSidebarContext } from '@/components/sidebarContext';
import NavLink from '@/components/ui/NavLink';
import Summary from '@/components/ui/Summary';
import {
  Home,
  BookOpen,
  Package,
  Users,
  Drill,
  Building2,
  Truck,
  Store,
  Settings,
  ChevronRight,
  Construction,
  ChevronLeft
} from 'lucide-react';

interface SidebarItem {
  label: string;
  href?: string; // Make href optional for non-link items
  icon?: React.ReactNode;
  children?: SidebarItem[];
}

// Special character to indicate a divider
const DIVIDER_LABEL = '---';

const sidebarItems: SidebarItem[] = [
  {
    label: 'Início',
    href: '/',
    icon: <Home className='h-6 w-6' />
  },
  {
    label: 'Infraestrutura',
    icon: <Building2 className='h-6 w-6' />,
    children: [
      { label: 'Todas as Infraestruturas', href: '/infrastructure/all' },
      { label: 'Adicionar Infraestrutura', href: '/infrastructure/add' },
      { label: DIVIDER_LABEL }, // Divider here
      {
        label: 'Tipos',
        children: [
          { label: 'Todos os Tipos', href: '/infrastructure/types/all' },
          { label: 'Adicionar Tipo', href: '/infrastructure/types/add' }
        ]
      }
    ]
  },
  {
    label: 'Manutenção',
    href: '/maintenance', //Optional, could be omitted if you don't want a direct link to Materiais
    icon: <Construction className='h-6 w-6' />,
    children: [
      { label: 'Todos os Materiais', href: '/maintenance/all' },
      { label: 'Adicionar Material', href: '/maintenance/add' },
      { label: 'Categorias', href: '/maintenance/category' }
    ]
  },
  {
    label: 'Colaboradores',
    icon: <Users className='h-6 w-6' />,
    children: [
      { label: 'Todos os Colaboradores', href: '/collaborators/all' },
      { label: 'Adicionar Colaborador', href: '/collaborators/add' },
      { label: 'Cargos', href: '/collaborators/roles' }
    ]
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
    label: 'Equipamentos',
    icon: <Drill className='h-6 w-6' />,
    children: [
      { label: 'Todos os Equipamentos', href: '/equipment/all' },
      { label: 'Adicionar Equipamento', href: '/equipment/add' },
      { label: 'Tipos', href: '/equipment/types' }
    ]
  },
  {
    label: 'Fornecedores',
    icon: <Store className='h-6 w-6' />,
    children: [
      { label: 'Todos os Fornecedores', href: '/suppliers/all' },
      { label: 'Adicionar Fornecedor', href: '/suppliers/add' },
      { label: 'Categorias', href: '/suppliers/category' }
    ]
  },
  {
    label: 'Frota',
    icon: <Truck className='h-6 w-6' />,
    children: [
      { label: 'Todos os Veículos', href: '/fleet/all' },
      { label: 'Adicionar Veículo', href: '/fleet/add' },
      { label: 'Tipos', href: '/fleet/types' }
    ]
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: <Settings className='h-6 w-6' />
  },
  {
    label: 'Sobre',
    href: '/about',
    icon: <BookOpen className='h-6 w-6' />
  }
];

interface SidebarProps {
  item: SidebarItem;
  isCollapsed: boolean;
  isMobile: boolean;
  collapseSidebar: () => void;
  toggleCollapse: () => void;
}

const SidebarItemComponent: React.FC<SidebarProps> = ({
  item,
  isCollapsed,
  isMobile,
  collapseSidebar,
  toggleCollapse
}) => {
  if (item.children) {
    return (
      <details className='group'>
        <Summary
          href={item.href}
          className={`flex w-full cursor-pointer list-none items-center rounded-md px-4 py-2 focus:outline-none ${
            isCollapsed ? 'hidden justify-center sm:block' : 'justify-start'
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
          className={`mt-2 ml-6 space-y-1 ${isCollapsed ? 'hidden' : ''} rounded-tl-md rounded-bl-3xl bg-gray-100 dark:bg-gray-700`}
        >
          {item.children.map(child =>
            child.label === DIVIDER_LABEL ? (
              <li
                key={child.label}
                className='my-2 border-b border-gray-300 dark:border-gray-600'
              />
            ) : (
              <li key={child.label}>
                <SidebarItemComponent
                  item={child}
                  isCollapsed={isCollapsed}
                  isMobile={isMobile}
                  collapseSidebar={collapseSidebar}
                  toggleCollapse={toggleCollapse}
                />
              </li>
            )
          )}
        </ul>
      </details>
    );
  } else if (item.href) {
    return (
      <NavLink
        href={item.href}
        className={`flex items-center rounded-md px-4 py-2 ${
          isCollapsed ? 'hidden justify-center sm:block' : 'justify-start'
        }`}
        onClick={() => {
          if (isMobile) {
            collapseSidebar();
          }
        }}
      >
        {item.icon && <span>{item.icon}</span>}
        <span
          className={`ps-1 transition-opacity duration-300 ${
            isCollapsed ? 'hidden' : 'opacity-100'
          }`}
        >
          {item.label}
        </span>
      </NavLink>
    );
  } else {
    return <span className='block px-4 py-2 ps-1'>{item.label}</span>;
  }
};

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
      className={`h-min-[calc(100vh-3.5rem)] top-10 left-0 z-20 mt-2 flex flex-col overflow-y-auto bg-gray-50 py-4 text-gray-700 transition-all duration-300 dark:bg-gray-800 dark:text-gray-300 ${
        isCollapsed ? 'w-0 sm:w-16' : 'w-full sm:w-64'
      }`}
    >
      <nav className='mt-9 flex-1'>
        <ul className='space-y-2'>
          {sidebarItems.map(item => (
            <li key={item.label}>
              <SidebarItemComponent
                item={item}
                isCollapsed={isCollapsed}
                isMobile={isMobile}
                collapseSidebar={collapseSidebar}
                toggleCollapse={toggleCollapse}
              />
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
