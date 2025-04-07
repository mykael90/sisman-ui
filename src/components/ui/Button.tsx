'use client';

import { forwardRef } from 'react';
import Link, { LinkProps } from 'next/link';
import clsx from 'clsx';

// Define the possible variants for the button
type ButtonVariant = 'solid' | 'outline';

// Define the possible colors for each variant
type ButtonColor = {
  solid: 'cyan' | 'white' | 'gray';
  outline: 'gray';
};

// Define the base styles for each variant
const baseStyles = {
  solid:
    'inline-flex justify-center rounded-lg py-2 px-3 text-sm font-semibold outline-2 outline-offset-2 transition-colors',
  outline:
    'inline-flex justify-center rounded-lg border py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-sm outline-2 outline-offset-2 transition-colors'
};

// Define the variant styles for each color
const variantStyles: {
  [K in ButtonVariant]: {
    [C in ButtonColor[K]]: string;
  };
} = {
  solid: {
    cyan: 'relative overflow-hidden bg-cyan-500 text-white before:absolute before:inset-0 active:before:bg-transparent hover:before:bg-white/10 active:bg-cyan-600 active:text-white/80 before:transition-colors',
    white:
      'bg-white text-cyan-900 hover:bg-white/90 active:bg-white/90 active:text-cyan-900/70',
    gray: 'bg-gray-800 text-white hover:bg-gray-900 active:bg-gray-800 active:text-white/80'
  },
  outline: {
    gray: 'border-gray-300 text-gray-700 hover:border-gray-400 active:bg-gray-100 active:text-gray-700/80'
  }
};

// Define the props for the Button component
type ButtonProps = {
  variant?: ButtonVariant;
  color?: ButtonColor[ButtonVariant];
  className?: string;
  href?: string;
} & (
  | Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>
  | Omit<LinkProps, 'color'>
);

// Create the Button component using forwardRef
const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(
    { variant = 'solid', color = 'gray', className, href, ...props },
    ref
  ) {
    // Combine the styles based on the variant and color
    className = clsx(
      baseStyles[variant],
      variantStyles[variant][color as ButtonColor[ButtonVariant]],
      className
    );

    // Render a Link if href is provided, otherwise render a button
    return href ? (
      <Link
        ref={ref as React.ForwardedRef<HTMLAnchorElement>}
        href={href}
        className={className}
        {...props}
      />
    ) : (
      <button
        ref={ref as React.ForwardedRef<HTMLButtonElement>}
        className={className}
        {...props}
      />
    );
  }
);

export default Button;
