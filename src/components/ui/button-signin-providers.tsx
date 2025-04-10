'use client';

import { signIn } from 'next-auth/react';
import { Button } from './button';
import Link from 'next/link';
import { ExternalLink, Info, ArrowRight } from 'lucide-react';
import LogoUFRNDark from '@/assets/img/logo-ufrn-dark.png';
import Image from 'next/image';
import LogoGovBr from '@/assets/img/logo-govbr.webp';
import LogoGoogle from '@/assets/img/logo-g-google.png';

// Mantive a constante para o botão GOV.BR, mas ela será aplicada dentro do details agora
const classNameButtonOthers =
  'cursor-pointer flex h-12 w-full items-center justify-center gap-8 text-gray-800 md:text-inherit dark:text-gray-200';

const StiSiginButton = ({ callback: callbackUrl }: { callback: string }) => {
  return (
    <div className='gap- flex flex-col items-center justify-around'>
      {/* Botão principal UFRN.BR */}
      <Button
        className='flex h-12 w-full cursor-pointer items-center justify-center gap-8 text-white'
        size='default'
        onClick={() => signIn('sti', { callbackUrl })}
      >
        <Image
          src={LogoUFRNDark}
          alt='Logo UFRN'
          height={20}
          className='brightness-100'
        />
        Entrar com UFRN.BR
      </Button>

      {/* Usando details e summary para o botão GOV.BR */}
      <details className='mt-4 w-full'>
        <summary className='cursor-pointer list-none text-center text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'>
          Não tem conta na UFRN.BR?{' '}
          <span className='text-sisman-teal hover:underline'>
            Outras opções de login
          </span>
        </summary>
        {/* O botão GOV.BR agora fica dentro do details */}
        <div className='mt-3 flex flex-col gap-3'>
          {' '}
          {/* Adiciona um espaço acima do botão quando expandido */}
          <Button
            className={classNameButtonOthers} // Reutiliza a classe definida
            variant='outline'
            size='default'
            onClick={() => signIn('sti', { callbackUrl })} // Atenção: O provider 'sti' está sendo usado para GOV.BR também. Verifique se isso está correto.
          >
            <Image
              src={LogoGovBr}
              alt='Logo GOV.BR'
              height={20}
              className='brightness-100'
            />
            Entrar com GOV.BR
          </Button>
          <Button
            className={classNameButtonOthers} // Reutiliza a classe definida
            variant='outline'
            size='default'
            onClick={() => signIn('sti', { callbackUrl })} // Atenção: O provider 'sti' está sendo usado para GOV.BR também. Verifique se isso está correto.
          >
            <Image
              src={LogoGoogle}
              alt='Logo Google'
              height={20}
              className='brightness-100'
            />
            Entrar com Google
          </Button>
          <Link
            href='#'
            className='text-center text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'
          >
            Problemas para entrar?{' '}
            <span className='text-sisman-teal hover:underline'>
              Contate o suporte
            </span>
          </Link>
        </div>
      </details>

      <details className='mt-2 w-full'>
        <summary className='cursor-pointer list-none text-center text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'>
          <Info className='inline-block h-4 w-4'></Info> Por que utilizar um
          serviço de autenticação externo{' '}
          <ArrowRight className='inline-block h-4 w-4'></ArrowRight>
        </summary>
        {/* O botão GOV.BR agora fica dentro do details */}
        <div className='mx-auto mt-2 flex flex-col gap-3 border p-2 text-center'>
          <p className='text-justify text-sm text-gray-500 dark:text-gray-400'>
            Como medida de proteção, adotamos um modelo de autenticação externa,
            em que as credenciais dos usuários são validadas exclusivamente por
            provedores de serviços terceiros confiáveis (como UFRN, GOV.BR,
            etc.).
            <a
              href='https://www.gov.br/governodigital/pt-br/estrategias-e-governanca-digital/transformacao-digital/ferramentas/autenticacao-gov.br'
              target='_blank'
              rel='noopener noreferrer'
            >
              <ExternalLink className='ml-1 inline-block h-4 w-4' />
              <span className='sr-only'>
                Mais informações sobre autenticação GOV.BR (abre em uma nova
                aba)
              </span>
            </a>
          </p>
          <p className='text-justify text-sm text-gray-500 dark:text-gray-400'>
            Dessa forma, as senhas nunca são armazenadas em nossos servidores,
            mitigando riscos associados a vazamentos ou acessos não autorizados.
            A gestão de credenciais fica integralmente sob responsabilidade do
            provedor escolhido pelo usuário, assegurando maior robustez no
            processo de autenticação.
          </p>
        </div>
      </details>
    </div>
  );
};

export default StiSiginButton;
