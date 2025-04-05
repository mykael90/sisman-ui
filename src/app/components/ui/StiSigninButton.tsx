'use client';

import { signIn } from 'next-auth/react';
import ButtonNavBar from './ButtonNavBar';

const StiSiginButton = ({ callback: callbackUrl }: { callback: string }) => {
  return (
    <>
      <ButtonNavBar onClick={() => signIn('sti', { callbackUrl })}>
        STI Login
      </ButtonNavBar>
    </>
  );
};

export default StiSiginButton;
