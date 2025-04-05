import { getProviders, signIn } from 'next-auth/react';
import StiSiginButton from '../../components/ui/StiSigninButton';
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

const SecurityInfo: React.FC = () => {
  return (
    <div className='rounded-lg bg-gray-50 p-8 shadow-md dark:bg-gray-800'>
      <div className='mb-6 flex items-center'>
        <ShieldCheck className='mr-4 h-10 w-10 text-blue-500' />
        <h2 className='text-2xl font-bold text-gray-800 dark:text-gray-200'>
          Segurança e Autenticação
        </h2>
      </div>
      <div className='mb-6'>
        <p className='text-justify text-gray-700 dark:text-gray-300'>
          O SISMAN leva a segurança a sério. Para garantir a proteção dos seus
          dados, nós <span className='font-bold'>não armazenamos</span> suas
          senhas em nossos servidores.
        </p>
      </div>
      <div>
        <p className='text-justify text-gray-700 dark:text-gray-300'>
          A autenticação é realizada por meio de serviços externos confiáveis,
          garantindo que suas credenciais permaneçam seguras com o provedor de
          serviço escolhido.
          <ExternalLink className='ml-1 inline-block h-4 w-4' />
        </p>
      </div>
    </div>
  );
};

export default async function SignIn({
  searchParams
}: {
  searchParams: { callbackUrl?: string; error?: string };
}) {
  const { callbackUrl = '/', error } = searchParams;
  const authError = getAuthErrorMessage(error);
  const providers = await getProviders();

  return (
    <main className='flex h-screen w-full flex-col items-center p-10 dark:bg-gray-800'>
      <div className='w-full max-w-md rounded-2xl bg-gray-50 p-10 shadow-xl dark:bg-gray-700'>
        <div className='mb-8 flex items-center justify-center'>
          <User className='mr-2 h-10 w-10 text-gray-800 dark:text-gray-200' />
          <h1 className='text-2xl font-bold text-gray-800 dark:text-gray-200'>
            Realizar login
          </h1>
        </div>
        {authError && (
          <div className='mb-10 flex items-center rounded-md bg-rose-500 px-4 py-3 text-white'>
            <AlertTriangle className='mr-2 h-5 w-5' />
            <p className='text-sm'>{authError}</p>
          </div>
        )}
        <StiSiginButton callback={callbackUrl} />
      </div>
      <div className='mt-8 w-full max-w-md'>
        <SecurityInfo />
      </div>
    </main>
  );
}
