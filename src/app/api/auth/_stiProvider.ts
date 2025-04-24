import { OAuthUserConfig, OAuthConfig } from 'next-auth/providers/oauth';

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
        console.log(`\ncontext: ${JSON.stringify(context)}\n`);
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
        return { tokens };
      }
    },
    userinfo: {
      async request({ tokens }) {
        console.log(`\n$$1 tokens STI: ${JSON.stringify(tokens)}\n`);
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

        console.log(`\n$$2 userInfo STI: ${JSON.stringify(userInfo)}\n`);

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
      console.log(`\n$$3 profile STI: ${JSON.stringify(profile)}\n`);
      console.log(`\n$$4 tokens STI: ${JSON.stringify(tokens)}\n`);

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
        console.log(`\n$$5 ID Token não encontrado: ${tokens.id_token}\n`);
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
    checks: ['pkce', 'state'], // Se necessário
    options
  };
}
