import { OAuthUserConfig, OAuthConfig } from 'next-auth/providers/oauth';
import { env } from 'process';

export interface STIProfile {
  sub: string;
  name?: string;
  email?: string;
}

export default function STIOAuthProvider<P extends STIProfile>(
  options: OAuthUserConfig<P>
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
        console.log(`context: ${JSON.stringify(context)}`);
        const { provider, params } = context;
        const response = await fetch(provider.token.url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            client_id: provider.clientId as string,
            client_secret: provider.clientSecret as string,
            redirect_uri: provider.redirectUri as string,
            grant_type: 'authorization_code',
            code: params.code
          })
        });

        const tokens = await response.json();
        return { tokens };
      }
    },
    userinfo: {
      async request({ tokens }) {
        console.log(`tokens STI: ${JSON.stringify(tokens)}`);

        const userInfoResponse = await fetch(process.env.STI_USERINFO_URL, {
          headers: {
            Authorization: `Bearer ${tokens.access_token}`,
            'X-API-Key': process.env.STI_XAPI_KEY
          }
        });

        const userInfo = await userInfoResponse.json();

        console.log(`userInfo STI: ${JSON.stringify(userInfo)}`);

        return {
          sub: userInfo['id-usuario'],
          name: userInfo['nome-pessoa'] || '',
          email: userInfo.email || ''
        };
      }
    },
    profile(profile, tokens) {
      console.log(`profile STI: ${JSON.stringify(profile)}`);
      console.log(`tokens STI: ${JSON.stringify(tokens)}`);
      let decoded = {};

      if (tokens.id_token) {
        decoded = JSON.parse(
          Buffer.from(tokens.id_token.split('.')[1], 'base64').toString()
        );
      } else {
        console.log(`ID Token não encontrado: ${tokens.id_token}`);
        // Use the sub from the userinfo response (profile)
        decoded = {
          sub: profile.sub,
          name: profile.name || '',
          email: profile.email || ''
        };
      }

      return {
        id: decoded.sub,
        name: decoded.name || '',
        email: decoded.email || ''
      };
    },
    checks: ['pkce', 'state'], // Se necessário
    options
  };
}
