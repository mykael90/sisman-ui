import STIOAuthProvider from './_stiProvider';
import { AuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { AdapterUser } from 'next-auth/adapters';
import { JWT, encode, decode } from 'next-auth/jwt';
import logger from '@/lib/logger';

// Importe a lógica de autorização do novo arquivo
import { handleAuthorizationLogic } from '@/lib/auth/authorization';

export const authOptions: AuthOptions = {
  providers: [
    // ... seus providers ...
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
    signIn: '/signin'
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      logger.debug(`
--------------------------------------------------
signIn Callback - Dados Recebidos
--------------------------------------------------

User: ${JSON.stringify(user, null, 2)}

Account: ${JSON.stringify(account, null, 2)}

Profile: ${JSON.stringify(profile, null, 2)}

--------------------------------------------------
`);
      return true;
    },
    async redirect({ url, baseUrl }) {
      logger.debug(`
--------------------------------------------------
signIn Callback - Dados Recebidos
--------------------------------------------------

URL: ${JSON.stringify(url, null, 2)}

Base URL: ${JSON.stringify(baseUrl, null, 2)}
`);
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async jwt({
      token,
      user,
      account,
      profile
    }: {
      token: JWT;
      user?: AdapterUser | any; // Mantenha 'any' se a estrutura do user variar
      account?: any;
      profile?: any;
    }): Promise<JWT> {
      logger.debug(`
--------------------------------------------------
JWT Callback - Dados Recebidos (Antes do Processamento)
--------------------------------------------------

Token: ${JSON.stringify(token, null, 2)}
User: ${JSON.stringify(user, null, 2)}
Account: ${JSON.stringify(account, null, 2)}
Profile: ${JSON.stringify(profile, null, 2)}
`);

      // Durante o login inicial (quando account e user estão presentes)
      if (account && user) {
        // Preenche informações básicas do provedor
        token.id = user.id;
        token.accessToken = account.access_token; // Token do provedor (STI)
        token.refreshToken = account.refresh_token; // Refresh token do provedor (STI)
        token.provider = account.provider;
        token.login = user.login; // Adiciona o login, se existir

        // ----- INÍCIO DA LÓGICA DE AUTORIZAÇÃO DELEGADA -----
        const authorizationFields = await handleAuthorizationLogic(user);
        // Mescla os campos retornados pela lógica de autorização no token principal
        token = { ...token, ...authorizationFields };
        // ----- FIM DA LÓGICA DE AUTORIZAÇÃO DELEGADA -----
      }

      logger.debug(`
--------------------------------------------------
JWT Callback - Token Após Processamento
--------------------------------------------------

Token: ${JSON.stringify(token, null, 2)}

--------------------------------------------------
`);
      return token;
    },
    async session({ session, token, user }) {
      logger.debug(`
--------------------------------------------------
Session Callback - Dados Recebidos (Antes do Processamento)
--------------------------------------------------
Session: ${JSON.stringify(session, null, 2)}\nToken: ${JSON.stringify(token, null, 2)}`);
      // Mapeia os dados do JWT (token) para o objeto `session`
      session.user.id = token.sub || token.id;
      session.user.login = token.login as string | undefined; // Tipagem explícita
      session.provider = token.provider as string | undefined; // Tipagem explícita

      // Expõe dados da API de autorização
      session.apiAccessToken = token.apiAccessToken as string | null;
      session.roles = token.roles as string[] | undefined;
      session.authorizationError = token.authorizationError as
        | string
        | undefined;

      // Expõe erro genérico do next-auth
      session.error = token.error as string | undefined;

      // Removido: Geralmente não se expõe o token do provedor ao cliente
      // session.providerAccessToken = token.accessToken as string;

      logger.debug(`
--------------------------------------------------
Session Callback - Session Após Processamento
--------------------------------------------------

Session: ${JSON.stringify(session, null, 2)}

--------------------------------------------------
`);
      return session;
    }
  },
  jwt: {
    // Suas funções encode/decode personalizadas (ou as padrão se remover)
    encode: async ({ secret, token, maxAge }) => {
      logger.debug(`
JWT Encode - Payload a ser codificado/criptografado: ${JSON.stringify(token, null, 2)}
`);
      const encodedToken = await encode({ secret, token, maxAge });
      logger.debug(`JWT Encode - Token JWE/JWS gerado: ${encodedToken}`);
      return encodedToken;
    },
    decode: async ({ secret, token }) => {
      logger.debug(
        `JWT Decode - Token JWE/JWS recebido para decodificar: ${token}`
      );
      const decodedPayload = await decode({ secret, token });
      logger.debug(
        `JWT Decode - Payload decodificado/descriptografado: ${JSON.stringify(decodedPayload, null, 2)}`
      );
      return decodedPayload;
    }
  },
  secret: process.env.NEXTAUTH_SECRET
  // adapter: MongoDBAdapter(clientPromise)
};

// Remova as funções createAuthorizationToken e verifyAuthorizationToken daqui
