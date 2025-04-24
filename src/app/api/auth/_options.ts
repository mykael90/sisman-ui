// _options.ts
import GoogleProvider from 'next-auth/providers/google';
import EmailProvider from 'next-auth/providers/email';
import STIOAuthProvider from './_stiProvider';

// import { MongoDBAdapter } from '@auth/mongodb-adapter';
// import clientPromise from '@/lib/mongo/client';
import { AuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { AdapterUser } from 'next-auth/adapters';
import { JWT } from 'next-auth/jwt'; // Import JWT type for better typing

// Interface para a resposta esperada da sua API de autorização
interface AuthorizationApiResponse {
  accessToken: string;
  // Adicione outros campos que sua API de autorização possa retornar (roles, permissions, etc.)
  roles?: string[];
}

// Função auxiliar para buscar o token de autorização
async function fetchAuthorizationToken(
  email: string
): Promise<AuthorizationApiResponse | null> {
  const apiUrl = process.env.AUTHORIZATION_API_URL;
  const apiKey = process.env.AUTHORIZATION_API_KEY; // Use se necessário

  if (!apiUrl) {
    console.error('AUTHORIZATION_API_URL environment variable is missing.');
    return null;
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'POST', // Ou GET, dependendo da sua API
      headers: {
        'Content-Type': 'application/json',
        // Inclua a chave de API se a sua API de autorização exigir
        ...(apiKey && { 'X-API-Key': apiKey })
        // Ou outro cabeçalho de autenticação, como 'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({ email: email }) // Envia o email para a API
    });

    if (!response.ok) {
      console.error(
        `Authorization API request failed with status ${response.status}: ${await response.text()}`
      );
      return null;
    }

    const data: AuthorizationApiResponse = await response.json();
    console.log('$$ Successfully fetched authorization token from custom API');
    return data;
  } catch (error) {
    console.error('Error fetching authorization token:', error);
    return null;
  }
}

export const authOptions: AuthOptions = {
  providers: [
    // ... outros providers ...
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
    async signIn({ user, account, profile, email, credentials }) {
      // Seu log de signIn existente...
      console.log(`$1 user: ${JSON.stringify(user)}`);
      console.log(`$2 account: ${JSON.stringify(account)}`);
      console.log(`$3 profile: ${JSON.stringify(profile)}`); // Profile do STI/UFRN
      return true; // Permitir o login
    },
    async redirect({ url, baseUrl }) {
      // Seu log de redirect existente...
      console.log(`$6 url: ${url}, baseUrl: ${baseUrl}`);
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
      user?: AdapterUser | any;
      account?: any;
      profile?: any;
    }): Promise<JWT> {
      // Logs existentes
      console.log(`$7 token (before processing): ${JSON.stringify(token)}`);
      console.log(`$8 user: ${JSON.stringify(user)}`); // Objeto User populado pelo profile callback
      console.log(`$9 account: ${JSON.stringify(account)}`); // Contém tokens do provedor (STI)
      console.log(`$10 profile: ${JSON.stringify(profile)}`); // Profile bruto do provedor (STI)

      // ----- INÍCIO DA LÓGICA DE AUTORIZAÇÃO -----

      // A condição 'account && user' garante que este bloco execute apenas
      // durante o login inicial, quando temos as informações do provedor.
      // Em chamadas subsequentes para atualizar a sessão, 'account' e 'user'
      // geralmente são undefined.
      if (account && user) {
        token.id = user.id; // ID do usuário vindo do provedor (STI)
        token.accessToken = account.access_token; // Token do *provedor* (STI)
        token.refreshToken = account.refresh_token; // Refresh token do *provedor* (STI)
        token.provider = account.provider; // Identifica o provedor (ex: 'sti')
        token.login = user.login; // Adiciona o login ao token, se existir

        // Verifica se temos o email do usuário para buscar o token de autorização
        if (user.email) {
          console.log(
            `$$ Fetching authorization token for email: ${user.email}`
          );
          const authorizationData = await fetchAuthorizationToken(user.email);

          if (authorizationData) {
            // Armazena o token da API de autorização e outros dados (roles) no JWT do next-auth
            token.apiAccessToken = authorizationData.accessToken;
            token.roles = authorizationData.roles; // Adiciona papéis, se retornados
            console.log('$$ Authorization data added to JWT:', {
              apiAccessToken: !!authorizationData.accessToken,
              roles: authorizationData.roles
            });
          } else {
            // Falha ao buscar o token de autorização.
            // Decida como lidar com isso:
            // 1. Impedir o login? (Pode ser complexo lançar erro aqui)
            // 2. Permitir login mas marcar um erro ou deixar apiAccessToken nulo? (Preferível)
            token.apiAccessToken = null;
            token.roles = [];
            token.authorizationError = 'Failed to fetch authorization token'; // Adiciona um erro ao token
            console.warn(
              '$$ Failed to fetch authorization token for user:',
              user.email
            );
          }
        } else {
          console.warn(
            '$$ User email not available, cannot fetch authorization token.'
          );
          token.apiAccessToken = null;
          token.roles = [];
          token.authorizationError = 'User email missing';
        }
      }

      // ----- FIM DA LÓGICA DE AUTORIZAÇÃO -----

      console.log(`$7 token (after processing): ${JSON.stringify(token)}`);
      return token; // Retorna o JWT atualizado (ou original se não for login)
    },
    async session({ session, token, user }) {
      // user aqui geralmente é o mesmo que `token` quando strategy é 'jwt'
      // Logs existentes
      console.log(
        `$11 session (before processing): ${JSON.stringify(session)}`
      );
      console.log(
        `$12 token (received in session cb): ${JSON.stringify(token)}`
      );
      // console.log(`$13 user (received in session cb): ${JSON.stringify(user)}`); // Geralmente redundante com token

      // Mapeia os dados do JWT (token) para o objeto `session` que será exposto ao cliente
      session.user.id = token.sub || token.id; // Garante que o ID esteja na sessão
      session.user.login = token.login; // Expõe o login ao cliente
      session.provider = token.provider; // Expõe o provider ao cliente

      // Expõe o token de ACESSO DA API DE AUTORIZAÇÃO ao cliente
      session.apiAccessToken = token.apiAccessToken as string | null;

      // Expõe os papéis (roles) ao cliente, se existirem
      session.roles = token.roles as string[] | undefined;

      // Expõe o token de ACESSO DO PROVEDOR (STI) - CUIDADO: Faça isso apenas se for estritamente necessário no frontend.
      // Geralmente, o token do provedor não é necessário no cliente.
      // session.providerAccessToken = token.accessToken as string;

      // Expõe um possível erro de autorização ao cliente
      session.authorizationError = token.authorizationError as
        | string
        | undefined;

      // Expõe o erro genérico do next-auth, se houver
      session.error = token.error as string | undefined;

      console.log(`$15 session (after processing): ${JSON.stringify(session)}`);
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET
  // adapter: MongoDBAdapter(clientPromise) // Mantenha comentado se não estiver usando Adapter
};
