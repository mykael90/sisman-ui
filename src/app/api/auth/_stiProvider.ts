import { OAuthUserConfig, OAuthConfig } from 'next-auth/providers/oauth';
import logger from '@/lib/logger';

export interface STIProfile {
  sub: string;
  name?: string;
  email?: string;
  image?: string;
  login?: string;
}

// Define the optionsComplement interface
interface optionsComplement {
  authorizationUrl?: string;
  tokenUrl?: string;
  redirectUri?: string;
}

export default function STIOAuthProvider<P extends STIProfile>(
  options: OAuthUserConfig<P> & optionsComplement
): OAuthConfig<P> {
  return {
    id: 'sti',
    name: 'STI/UFRN',
    type: 'oauth',
    version: '2.0',
    authorization: {
      url: options.authorizationUrl,
      params: {
        response_type: 'code',
        client_id: options.clientId,
        redirect_uri: options.redirectUri,
        scope: 'read' // Use openid para garantir um ID Token
      }
    },
    token: {
      url: options.tokenUrl,
      params: {
        client_id: options.clientId,
        client_secret: options.clientSecret,
        redirect_uri: options.redirectUri,
        grant_type: 'authorization_code'
      },
      async request(context) {
        logger.info(`
--------------------------------------------------
STIOAuthProvider - Token Request - Contexto
--------------------------------------------------

${JSON.stringify(context, null, 2)}
`);
        const { provider, params } = context;
        if (!provider.token) {
          throw new Error('Provider token URL is missing.');
        }
        const response = await fetch(provider.token?.url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            client_id: provider.clientId as string,
            client_secret: provider.clientSecret as string,
            redirect_uri: provider.redirectUri as string,
            grant_type: 'authorization_code',
            code: params.code as string
          })
        });

        const tokens = await response.json();
        logger.info(`
--------------------------------------------------
STIOAuthProvider - Token Request - Tokens Recebidos
--------------------------------------------------

${JSON.stringify(tokens, null, 2)}
`);
        return { tokens };
      }
    },
    userinfo: {
      async request({ tokens }) {
        logger.info(`
--------------------------------------------------
STIOAuthProvider - Userinfo Request - Tokens Recebidos
--------------------------------------------------

${JSON.stringify(tokens, null, 2)}
`);

        if (!process.env.STI_USERINFO_URL) {
          throw new Error('STI_USERINFO_URL environment variable is missing.');
        }
        if (!process.env.STI_XAPI_KEY) {
          throw new Error('STI_XAPI_KEY environment variable is missing.');
        }

        const userInfoResponse = await fetch(process.env.STI_USERINFO_URL, {
          headers: {
            Authorization: `Bearer ${tokens.access_token}`,
            'X-API-Key': process.env.STI_XAPI_KEY
          }
        });

        const userInfo = await userInfoResponse.json();

        logger.info(`
--------------------------------------------------
STIOAuthProvider - Userinfo Request - UserInfo Recebido
--------------------------------------------------

${JSON.stringify(userInfo, null, 2)}
`);

        return {
          sub: userInfo['id-usuario'],
          name: userInfo['nome-pessoa'] || '',
          email: userInfo.email || '',
          image: userInfo['url-foto'] || '',
          login: userInfo.login || ''
        };
      }
    },
    profile(profile, tokens) {
      logger.info(`
--------------------------------------------------
STIOAuthProvider - Profile - Profile Recebido
--------------------------------------------------

${JSON.stringify(profile, null, 2)}
`);
      logger.info(`
--------------------------------------------------
STIOAuthProvider - Profile - Tokens Recebidos
--------------------------------------------------
${JSON.stringify(tokens, null, 2)}`);

      type Decoded = {
        sub: string;
        name?: string;
        email?: string;
        image?: string;
        login?: string;
      };

      let decoded: Decoded = {
        sub: '',
        name: '',
        email: '',
        image: '',
        login: ''
      };

      if (tokens.id_token) {
        decoded = JSON.parse(
          Buffer.from(tokens.id_token.split('.')[1], 'base64').toString()
        );
      } else {
        logger.warn(`
--------------------------------------------------
STIOAuthProvider - Profile - ID Token Não Encontrado
--------------------------------------------------

ID Token: ${tokens.id_token}
`);
        // Use the sub from the userinfo response (profile)
        decoded = {
          sub: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.image,
          login: profile.login
        };
      }

      return {
        id: decoded.sub,
        name: decoded.name || '',
        email: decoded.email || '',
        image: decoded.image || '',
        login: decoded.login || ''
      };
    },

    options
  };
}
