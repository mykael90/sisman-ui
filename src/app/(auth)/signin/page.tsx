import { getProviders, signIn } from 'next-auth/react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardSeparator
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import ProvidersSigninButton from '../../../components/ui/button-signin-providers';
import { User, AlertTriangle, ShieldCheck, ExternalLink } from 'lucide-react';

const authErrorMessages = {
  Signin: 'Try signing in with a different account.',
  OAuthSignin: 'Try signing in with a different account.',
  OAuthCallback: 'Try signing in with a different account.',
  OAuthCreateAccount: 'Try signing in with a different account.',
  EmailCreateAccount: 'Try signing in with a different account.',
  Callback: 'Try signing in with a different account.',
  OAuthAccountNotLinked:
    'To confirm your identity, sign in with the same account you used originally.',
  EmailSignin: 'Check your email inbox.',
  CredentialsSignin:
    'Sign in failed. Check the details you provided are correct.',
  SessionRequired: 'Please sign in to access this page.',
  default: 'Unable to sign in.'
};

const getAuthErrorMessage = (error: string | undefined) => {
  if (!error) return;
  return authErrorMessages[error as keyof typeof authErrorMessages]
    ? authErrorMessages[error as keyof typeof authErrorMessages]
    : authErrorMessages.default;
};

export default async function SignIn({
  searchParams
}: {
  searchParams: { callbackUrl?: string; error?: string };
}) {
  const { callbackUrl = '/', error } = await Promise.resolve(searchParams);
  const authError = getAuthErrorMessage(error);
  const providers = await getProviders();

  return (
    <main className='flex w-full flex-col items-center p-10'>
      <Card className='w-full max-w-md'>
        <CardHeader className='flex items-center space-x-4'>
          <ShieldCheck className='h-10 w-10 text-blue-500' />
          <CardTitle>Segurança e Autenticação</CardTitle>
        </CardHeader>
        <CardSeparator />
        <CardHeader className='flex flex-col items-center justify-center space-y-2 py-0'>
          <User className='h-10 w-10 text-blue-500 dark:text-gray-200' />
          <CardTitle>Entrar com</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <ProvidersSigninButton callback={callbackUrl} />
          {authError && (
            <Alert variant='destructive'>
              <AlertTriangle className='h-4 w-4' />
              <AlertTitle>Erro</AlertTitle>
              <AlertDescription>{authError}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardSeparator />
        <CardContent className='space-y-4'>
          <CardDescription className='text-justify'>
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
          </CardDescription>
          <CardDescription className='text-justify'>
            Dessa forma, as senhas nunca são armazenadas em nossos servidores,
            mitigando riscos associados a vazamentos ou acessos não autorizados.
            A gestão de credenciais fica integralmente sob responsabilidade do
            provedor escolhido pelo usuário, assegurando maior robustez no
            processo de autenticação.
            {/* <ExternalLink className='ml-1 inline-block h-4 w-4' /> */}
          </CardDescription>
        </CardContent>
      </Card>
    </main>
  );
}
