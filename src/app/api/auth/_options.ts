import GoogleProvider from 'next-auth/providers/google';
import EmailProvider from 'next-auth/providers/email';
import STIOAuthProvider from './_stiProvider';

// import { MongoDBAdapter } from '@auth/mongodb-adapter';

// import clientPromise from '@/lib/mongo/client';
import { AuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

export const authOptions: AuthOptions = {
  providers: [
    // EmailProvider({
    //   server: {
    //     host: process.env.MAIL_SERVER_HOST,
    //     port: process.env.MAIL_SERVER_PORT,
    //     auth: {
    //       user: process.env.MAIL_SERVER_USER,
    //       pass: process.env.MAIL_SERVER_PASSWORD
    //     }
    //   },
    //   from: process.env.EMAIL_FROM
    // }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET
    // })
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string
    }),
    STIOAuthProvider({
      clientId: process.env.STI_CLIENT_ID as string,
      clientSecret: process.env.STI_CLIENT_SECRET as string,
      authorizationUrl: process.env.STI_AUTHORIZATION_URL,
      tokenUrl: process.env.STI_TOKEN_URL,
      redirectUri: process.env.STI_REDIRECT_URI
    })
  ],
  pages: {
    // signIn: '/signin'
    // signOut: '/signout'
    // error: '/error' // Error code passed in query string as ?error=
    // verifyRequest: '/verify-request' // (used for check email message)
    // newUser: '/new-user'
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log(`$1 user: ${JSON.stringify(user)}`);
      console.log(`$2 account: ${JSON.stringify(account)}`);
      console.log(`$3 profile: ${JSON.stringify(profile)}`);
      console.log(`$4 email: ${JSON.stringify(email)}`);
      console.log(`$5 credentials: ${JSON.stringify(credentials)}`);
      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        return true;
      } else {
        // Return false to display a default error message
        return false;
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
    async redirect({ url, baseUrl }) {
      console.log(`$6 url: ${url}, baseUrl: ${baseUrl}`);
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async jwt({ token, user, account, profile }) {
      console.log(`$7 token: ${JSON.stringify(token)}`);
      console.log(`$8 user: ${JSON.stringify(user)}`);
      console.log(`$9 account: ${JSON.stringify(account)}`);
      console.log(`$10 profile: ${JSON.stringify(profile)}`);
      // Persist the OAth access_token or the user id on the token
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
      }
      return token;
    },
    async session({ session, token, user, profile }) {
      console.log(`$11 session: ${JSON.stringify(session)}`);
      console.log(`$12 token: ${JSON.stringify(token)}`);
      console.log(`$13 user: ${JSON.stringify(user)} `);
      console.log(`$14 profile: ${JSON.stringify(profile)}`);
      // Send properties to the browser
      session.accessToken = token.accessToken;
      session.user.id = token.id;
      session.error = token.error;
      return session;
    }
  }
  // adapter: MongoDBAdapter(clientPromise)
};
