import { getProviders, signIn } from 'next-auth/react';
import StiSiginButton from '../../components/ui/StiSigninButton';

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

const getAuthErrorMessage = error => {
  if (!error) return;
  return authErrorMessages[error]
    ? authErrorMessages[error]
    : authErrorMessages.default;
};

export default async function SignIn({ searchParams }) {
  const { callbackUrl = '/', error } = searchParams;
  const authError = getAuthErrorMessage(error);
  const providers = await getProviders();

  return (
    <main className='flex h-screen w-full flex-col items-center justify-center bg-gray-100 dark:bg-gray-800'>
      <div className='w-full max-w-md rounded-lg bg-white p-8 shadow-md dark:bg-gray-700'>
        <h1 className='mb-6 text-center text-3xl font-bold text-gray-800 dark:text-gray-200'>
          Sign In
        </h1>
        {authError && (
          <div className='mb-10 rounded-md bg-rose-500 px-3 py-2 text-white'>
            <p>{authError}</p>
          </div>
        )}
        {/* {JSON.stringify(providers)} */}
        <StiSiginButton callback={callbackUrl}></StiSiginButton>
      </div>
    </main>
  );
}
