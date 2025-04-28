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
  'https://autenticacao.info.ufrn.br/authz-server/j_spring_cas_security_logout';

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
  // ---> Ponto de atenção: Parâmetro de redirecionamento <---
  // O código Java *não* mostra adição de um parâmetro 'service' ou
  // 'post_logout_redirect_uri' a esta URL específica de logout do Spring/CAS.
  // Isso pode significar que:
  //    a) Este endpoint NÃO suporta redirecionamento de volta automático.
  //       O usuário simplesmente verá uma página de logout da UFRN.
  //    b) O parâmetro é diferente (talvez 'targetUrl'?).
  // É MELHOR TESTAR SEM O PARÂMETRO PRIMEIRO.

  // URL de logout a ser usada (sem redirect por enquanto)
  // const ufrnLogoutUrlToUse = UFRN_LOGOUT_URL;

  // --- Se quiser *tentar* adicionar um parâmetro (verificar documentação UFRN!) ---
  const postUfrnLogoutRedirect = `${window.location.origin}/`;
  const ufrnLogoutUrlWithRedirect = `${UFRN_LOGOUT_URL}?service=${encodeURIComponent(postUfrnLogoutRedirect)}`; // Usando 'service' como palpite
  const ufrnLogoutUrlToUse = ufrnLogoutUrlWithRedirect; // Descomente para testar com redirect
  // ------------------------------------------------------------------------------

  try {
    // 1. Faça o logout da sessão NextAuth localmente
    await signOut({ redirect: false });

    // 2. Redirecione o navegador para a URL de logout CORRETA da UFRN
    window.location.href = ufrnLogoutUrlToUse;
  } catch (error) {
    console.error('Erro ao tentar deslogar localmente:', error);
    // Mesmo com erro local, tenta redirecionar para o logout UFRN
    window.location.href = ufrnLogoutUrlToUse;
  }
};
