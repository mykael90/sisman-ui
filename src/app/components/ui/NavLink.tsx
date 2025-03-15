'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, className }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`hover:bg-sisman-green/10 dark:hover:bg-sisman-blue block rounded-md px-4 py-2 ${
        isActive ? 'bg-sisman-green/50 font-semibold dark:bg-sky-700' : ''
      } ${className}`}
    >
      {children}
    </Link>
  );
};

export default NavLink;
