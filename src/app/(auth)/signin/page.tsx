import { getProviders, signIn } from 'next-auth/react';
import StiSiginButton from '../../components/ui/StiSigninButton';
import { User, AlertTriangle } from 'lucide-react';

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
  const { callbackUrl = '/', error } = searchParams;
  const authError = getAuthErrorMessage(error);
  const providers = await getProviders();

  return (
    <main className='flex h-screen w-full flex-col items-center bg-gray-100 p-10 dark:bg-gray-800'>
      <div className='w-full max-w-md rounded-2xl bg-white p-10 shadow-xl dark:bg-gray-700'>
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
    </main>
  );
}
