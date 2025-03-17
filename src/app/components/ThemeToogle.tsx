'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import ButtonNavBar from './ui/ButtonNavBar';

export default function ColorModeToggle() {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const darkMode = localStorage.getItem('darkMode');
    const prefersDarkMode =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (darkMode === 'enabled' || (!darkMode && prefersDarkMode)) {
      document.documentElement.classList.add('dark');
      setChecked(true);
    } else {
      document.documentElement.classList.remove('dark');
      setChecked(false);
    }

    console.log(
      'Dark mode ativo?',
      document.documentElement.classList.contains('dark')
    );
  }, []);

  const toggleDarkMode = () => {
    if (checked) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'disabled');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'enabled');
    }
    setChecked(!checked);
  };

  return (
    <ButtonNavBar
      onClick={toggleDarkMode}
      title={`Alterar para mode ${checked ? 'claro' : 'escuro'}`}
    >
      {checked ? (
        <Sun className='h-6 w-6 text-yellow-100' />
      ) : (
        <Moon className='text-sisman-blue h-6 w-6' />
      )}
    </ButtonNavBar>
  );
}
