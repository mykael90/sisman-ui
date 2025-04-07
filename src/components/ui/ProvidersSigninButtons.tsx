'use client';

import { signIn } from 'next-auth/react';
import { Button } from './button';

const StiSiginButton = ({ callback: callbackUrl }: { callback: string }) => {
  return (
    <div className='flex justify-around'>
      <Button
        className='w-30 rounded-full'
        variant='default'
        size='default'
        onClick={() => signIn('sti', { callbackUrl })}
      >
        UFRN.BR
      </Button>
      <Button
        className='w-30 rounded-full'
        variant='default'
        size='default'
        onClick={() => signIn('sti', { callbackUrl })}
      >
        SOUGOV.BR
      </Button>
    </div>
  );
};

export default StiSiginButton;
