import React from 'react';

export default function Home() {
  return (
    <div className='flex'>
      <main className='flex-1 p-8'>
        <div className='mx-auto flex max-w-sm items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10'>
          <div>
            <div className='text-xl font-medium text-black dark:text-white'>
              ChitChat
            </div>
            <p className='text-gray-500 dark:text-gray-400'>
              You have a new message!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
