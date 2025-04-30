'use client';

import { UserManagementHeader } from './user-management-header';
import { UserFilters } from './user-filters';
import { UserTable } from './user-table';
import { UserPagination } from './user-pagination';
import { useState } from 'react';
import type { User } from '@/types/user';

// Dados de exemplo
const initialUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Connor',
    username: 'sconnor',
    email: 'sarah.connor@example.com',
    role: 'Admin',
    status: 'Active',
    avatar: '/placeholder.svg?height=40&width=40'
  },
  {
    id: '2',
    name: 'John Smith',
    username: 'jsmith',
    email: 'john.smith@example.com',
    role: 'Editor',
    status: 'Active',
    avatar: '/placeholder.svg?height=40&width=40'
  },
  {
    id: '3',
    name: 'Emma Wilson',
    username: 'ewilson',
    email: 'emma.wilson@example.com',
    role: 'Viewer',
    status: 'Inactive',
    avatar: '/placeholder.svg?height=40&width=40'
  }
];

export function UserManagementPage() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All Roles');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [currentPage, setCurrentPage] = useState(1);
  const totalEntries = 100;
  const entriesPerPage = 3;

  // Função para adicionar novo usuário
  const handleAddUser = () => {
    // Implementação futura
    console.log('Add new user');
  };

  // Função para editar usuário
  const handleEditUser = (userId: string) => {
    // Implementação futura
    console.log('Edit user', userId);
  };

  // Função para excluir usuário
  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  // Função para limpar filtros
  const handleClearFilters = () => {
    setSearchQuery('');
    setRoleFilter('All Roles');
    setStatusFilter('All Status');
  };

  return (
    <div className='container mx-auto p-4'>
      <UserManagementHeader onAddUser={handleAddUser} />

      <div className='mt-4 mb-4 h-16 rounded-t-md border-0 bg-white px-4 py-3.5'>
        <UserFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          roleFilter={roleFilter}
          onRoleFilterChange={setRoleFilter}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          onClearFilters={handleClearFilters}
        />
      </div>

      <UserTable
        users={users}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
      />

      <div className='mt-1 h-14 rounded-b-md border-0 bg-white px-4 py-3.5'>
        <UserPagination
          currentPage={currentPage}
          totalEntries={totalEntries}
          entriesPerPage={entriesPerPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
