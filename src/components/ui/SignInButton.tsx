'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import ButtonNavBar from './ButtonNavBar';

const buttonClasses =
  'rounded border px-2 py-1 text-sm text-gray-500 border-gray-500';

const SiginButton = () => {
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <ButtonNavBar onClick={() => signOut()}>Logout</ButtonNavBar>
      ) : (
        <ButtonNavBar onClick={() => signIn()}>Login</ButtonNavBar>
      )}
    </>
  );
};

export default SiginButton;
