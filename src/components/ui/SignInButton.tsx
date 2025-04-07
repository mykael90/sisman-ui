'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSession, signIn, signOut } from 'next-auth/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { LogOut, Settings } from 'lucide-react';
import ButtonNavBar from './ButtonNavBar';
import { Badge } from './badge';
import UserAvatar from './user-avatar';

const SignInButton = () => {
  const { data: session } = useSession();

  const getInitials = (name: string | null | undefined): string => {
    if (!name) {
      return 'U'; // Default to 'U' if no name is provided
    }

    const names = name.split(' ');
    const firstNameInitial = names[0]?.charAt(0).toUpperCase() || '';
    const lastNameInitial =
      names.length > 1
        ? names[names.length - 1]?.charAt(0).toUpperCase() || ''
        : '';

    return `${firstNameInitial}${lastNameInitial}`;
  };

  return (
    <>
      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger className='cursor-pointer'>
            <div className='flex items-center gap-2'>
              <UserAvatar
                imageUrl={session?.user?.image}
                name={session?.user?.name}
              />
              {session?.user?.login ? (
                <Badge variant='outline' className='text-sisman-blue'>
                  {session.user.login}
                </Badge>
              ) : null}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='m-4 w-80 rounded-md bg-gray-50 shadow-lg'>
            <DropdownMenuLabel>
              <div className='flex items-center gap-2'>
                <UserAvatar
                  imageUrl={session?.user?.image}
                  name={session?.user?.name}
                  size='xl'
                />
                <div className='flex flex-col gap-1'>
                  <p className='font-medium text-stone-600'>
                    {session.user?.name || 'User name'}
                  </p>
                  <p className='text-stone-400'>{session.user?.email}</p>
                  <p className='text-stone-400'>{session.user?.login}</p>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href='/profile' className='cursor-pointer flex items-center gap-2'>
                <Settings className='h-4 w-4' />
                Meu Perfil
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className='flex cursor-pointer items-center gap-2'
              onSelect={() => signOut()}
            >
              <LogOut className='h-4 w-4' />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <ButtonNavBar
          className='rounded-full border px-2 py-1 font-normal dark:border-gray-600'
          onClick={() => signIn()}
        >
          Entrar
        </ButtonNavBar>
      )}
    </>
  );
};

export default SignInButton;
