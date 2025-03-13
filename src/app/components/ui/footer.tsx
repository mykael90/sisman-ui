import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className='bg-gray-200 p-4 text-center inset-shadow-sm dark:bg-gray-700 dark:text-gray-300'>
      &copy; {new Date().getFullYear()} Your Company
    </footer>
  );
};

export default Footer;
