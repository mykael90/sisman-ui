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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from './button';
import ButtonNavBar from './ButtonNavBar';

const SignInButton = () => {
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            {session?.user?.image ? (
              <Avatar className='h-10 w-10'>
                <AvatarImage
                  src={session.user.image}
                  alt={session.user.name || 'User'}
                  className='rounded-full'
                />
                <AvatarFallback>
                  {session.user.name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
            ) : (
              <Avatar className='h-10 w-10'>
                <AvatarFallback>
                  {session.user?.name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56'>
            <DropdownMenuLabel>
              <div className='flex flex-col gap-1'>
                <p className='font-medium text-stone-600'>
                  {session.user?.name || 'User name'}
                </p>
                <p className='text-stone-400'>{session.user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href='/profile' className='flex items-center gap-2'>
                <Settings className='h-4 w-4' />
                Manage Account
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className='flex cursor-pointer items-center gap-2'
              onSelect={() => signOut()}
            >
              <LogOut className='h-4 w-4' />
              Sign Out
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
