'use client';

import { signIn } from 'next-auth/react';
import { Button } from './button';

const classNameButton = 'w-30 cursor-pointer rounded-full';

const StiSiginButton = ({ callback: callbackUrl }: { callback: string }) => {
  return (
    <div className='flex justify-around'>
      <Button
        className={classNameButton}
        variant='default'
        size='default'
        onClick={() => signIn('sti', { callbackUrl })}
      >
        UFRN.BR
      </Button>
      <Button
        className={classNameButton}
        variant='default'
        size='default'
        onClick={() => signIn('github', { callbackUrl })}
      >
        SOUGOV.BR
      </Button>
    </div>
  );
};

export default StiSiginButton;
