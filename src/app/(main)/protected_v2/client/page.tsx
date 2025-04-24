'use client';

import { useSession } from 'next-auth/react';

function MyComponent() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'authenticated' && session) {
    console.log('Session Data:', session);
    console.log('Authorization API Access Token:', session.apiAccessToken);
    console.log('User Roles:', session.roles);
    console.log('User Login:', session.user.login);
    console.log('Auth Provider:', session.provider);
    if (session.authorizationError) {
      console.error('Authorization error:', session.authorizationError);
      // Handle the error appropriately - maybe show a message to the user
    }

    // Agora você pode usar session.apiAccessToken para fazer chamadas
    // para a sua API https://sistema.api/...
    // Exemplo:
    // fetch('https://sistema.api/some-resource', {
    //   headers: {
    //     'Authorization': `Bearer ${session.apiAccessToken}`
    //   }
    // })
    // .then(...)

    return (
      <div>
        <p>
          Welcome, {session.user.name} ({session.user.login})!
        </p>
        {session.apiAccessToken ? (
          <p>Autorizado!</p>
        ) : (
          <p>Não autorizado para acessar a API do sistema.</p>
        )}
      </div>
    );
  }

  return <p>Not authenticated</p>;
}

export default MyComponent;
