'use client';

import { Sun, Moon } from 'lucide-react';
import ButtonNavBar from './ui/ButtonNavBar';
import { useThemeContext } from '@/components/context/ThemeProvider';

export default function ColorModeToggle() {
  const { darkMode, toggleTheme } = useThemeContext();

  return (
    <ButtonNavBar
      onClick={toggleTheme}
      title={`Alterar para mode ${darkMode ? 'claro' : 'escuro'}`}
    >
      {darkMode ? (
        <Sun className='h-6 w-6 text-yellow-100' />
      ) : (
        <Moon className='text-sisman-blue h-6 w-6' />
      )}
    </ButtonNavBar>
  );
}
