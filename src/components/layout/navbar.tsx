'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Import for getting current route
import { useSidebarContext } from '@/src/components/context/sidebar-provider';
import Image from 'next/image';
import logo from '@/assets/img/logo.svg';
import logo_dark from '@/assets/img/dark-logo.svg';
import { Menu, Search } from 'lucide-react';
import ThemeToggle from '../../theme/theme-toogle';
import ButtonNavBar from '../ui/button-navbar';
import SiginButton from '../ui/button-signin';
import { Input } from '../ui/input';

const Navbar: React.FC = () => {
  const pathname = usePathname(); // Use usePathname instead of useRouter
  const { toggleCollapse } = useSidebarContext(); // Use the context

  return (
    <nav className='z-30 w-full bg-gray-50 py-1 shadow-md dark:bg-gray-800 dark:text-gray-300'>
      <div className='flex content-center justify-between ps-2'>
        <div className='flex content-center'>
          <ButtonNavBar onClick={toggleCollapse} title='Menu'>
            <Menu className='h-7 w-6' />
          </ButtonNavBar>
          {/* Logo */}
          <Link href='/' className='flex items-center ps-2'>
            <Image
              src={logo}
              alt='SisMan Logo'
              // width={80} // Adjust width as needed
              height={25} // Adjust height as needed
              className='dark:hidden'
            />
            <Image
              src={logo_dark}
              alt='SisMan Logo'
              // width={80} // Adjust width as needed
              height={25} // Adjust height as needed
              className='hidden dark:block'
            />
          </Link>
        </div>

        {/* Current Route */}
        {/* <div className='hidden items-center sm:flex'>
          <span className='text-gray-600 dark:text-gray-400'>
            Current Route: {pathname}
          </span>
        </div> */}

        <div className='relative w-96'>
          <Search className='absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2 text-gray-400' />
          <Input
            placeholder='Search maintenance requests...'
            className='border-gray-200 bg-gray-50 pl-8'
          />
        </div>

        {/* Botões de redes sociais */}
        <div className='items-center sm:flex'>
          <div></div>
        </div>

        {/* User Status (Simulated) */}
        <div className='flex items-center gap-3 pe-4'>
          <div className='ps-2'>
            <ThemeToggle></ThemeToggle>
          </div>
          <SiginButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
