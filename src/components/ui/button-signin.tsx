'use client';

import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { LogOut, Settings } from 'lucide-react';
import ButtonNavBar from './button-navbar';
import { Badge } from './badge';
import UserAvatar from './user-avatar';
import { usePathname } from 'next/navigation'; // Import for getting current route
import getFirstAndLastName from '../../lib/getFirstAndLastName';
import getNameFromLogin from '../../lib/getNameFromLogin';

// ---> Defina a URL de logout do provedor (UFRN) <---
// É uma boa prática usar uma variável de ambiente pública para isso
const UFRN_LOGOUT_URL =
  process.env.NEXT_PUBLIC_UFRN_LOGOUT_URL ||
  'https://autenticacao.info.ufrn.br/sso-server/logout';

const SignInButton = () => {
  const { data: session } = useSession();

  const userIsInSigninPage: boolean = usePathname().startsWith('/signin');

  return (
    <>
      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger className='cursor-pointer'>
            <div className='flex items-center gap-2'>
              <UserAvatar
                imageUrl={session?.user?.image}
                name={session?.user?.name}
              />
              <span className='hidden text-sm text-gray-600 sm:block dark:text-gray-300'>
                {session?.user?.login
                  ? getNameFromLogin(session.user.login)
                  : getFirstAndLastName(session?.user?.name)}
              </span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='mt-1 mr-5 w-80 rounded-md bg-gray-50 shadow-lg'>
            <DropdownMenuLabel>
              <div className='flex items-center gap-2'>
                <UserAvatar
                  imageUrl={session?.user?.image}
                  name={session?.user?.name}
                  size='xl'
                />
                <div className='flex flex-col gap-1'>
                  <p className='font-medium'>
                    {session.user?.name || 'User name'}
                  </p>
                  <p className=''>
                    {session?.user?.login ? (
                      <Badge variant='outline'>{session.user.login}</Badge>
                    ) : null}
                  </p>
                  <p className=''>{session.user?.email}</p>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                href='/profile'
                className='flex cursor-pointer items-center gap-2 dark:text-gray-300'
              >
                <Settings className='h-4 w-4' />
                Meu Perfil
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className='flex cursor-pointer items-center gap-2 dark:text-gray-300'
              onSelect={() => handleManualSignOut()}
            >
              <LogOut className='h-4 w-4' />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <ButtonNavBar
          className='rounded-full border px-2 py-1 font-normal dark:border-gray-600'
          onClick={() => !userIsInSigninPage && signIn()}
        >
          Entrar
        </ButtonNavBar>
      )}
    </>
  );
};

export default SignInButton;

// ---> Função para lidar com o logout manual <---
const handleManualSignOut = async () => {
  //TODO: Endpoint de logout da UFRN não funciona para a aplicação. Ele não limpa o registro de acesso do usuário, ou seja, não é possível alterar o usuário sem limpar o cache do navegador ou esperar o tempo de expiração do token.

  // 1. Defina para onde o *provedor UFRN* deve redirecionar o usuário
  //    APÓS o logout no SSO ser concluído.
  //    Consulte a documentação da UFRN para saber qual parâmetro usar
  //    (ex: 'service', 'post_logout_redirect_uri', 'redirect_uri').
  //    Assumindo que seja 'service' (comum em sistemas CAS):
  const postUfrnLogoutRedirect = `${window.location.origin}/`; // Volta para a home da sua app
  const ufrnLogoutUrlWithRedirect = `${UFRN_LOGOUT_URL}?service=${encodeURIComponent(postUfrnLogoutRedirect)}`;

  //    *** IMPORTANTE: Verifique com a UFRN se eles suportam esse redirecionamento
  //    *** e qual o nome correto do parâmetro ('service' é um palpite).
  //    *** Se não suportarem, use apenas UFRN_LOGOUT_URL e o usuário
  //    *** não voltará automaticamente para sua aplicação.
  // const ufrnLogoutUrlToUse = UFRN_LOGOUT_URL; // Caso não haja redirect

  try {
    // 2. Faça o logout da sessão NextAuth localmente *sem* redirecionar ainda.
    //    Isso limpa o cookie de sessão da sua aplicação.
    await signOut({ redirect: false });

    // 3. Redirecione o navegador do usuário para a URL de logout do provedor UFRN.
    //    Use a URL com o parâmetro de redirect se ele for suportado.

    window.location.href = ufrnLogoutUrlWithRedirect;

    // Se não houver redirect suportado:
    // window.location.href = ufrnLogoutUrlToUse;
  } catch (error) {
    console.error('Erro ao tentar deslogar:', error);
    // Mesmo se o signOut local falhar, ainda pode ser útil tentar
    // redirecionar para o logout do provedor como fallback.
    window.location.href = ufrnLogoutUrlWithRedirect; // ou ufrnLogoutUrlToUse
  }
};
