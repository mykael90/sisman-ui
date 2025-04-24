// src/lib/auth/authorization.ts
import { SignJWT, jwtVerify } from 'jose';
import type { JWT } from 'next-auth/jwt';
import type { AdapterUser } from 'next-auth/adapters';

// Interface para os dados do usuário que serão incluídos no token de requisição
interface AuthorizationRequestUserData {
  email: string;
  login?: string; // Assumindo que 'login' é o username
  name?: string;
}

// Interface para a resposta esperada da sua API de autorização
interface AuthorizationApiResponse {
  accessToken: string;
  roles?: number[];
}

// Função auxiliar para criar o token JWT temporário para a API de autorização
async function createAuthorizationRequestToken(
  userData: AuthorizationRequestUserData
): Promise<string> {
  if (!process.env.AUTHORIZATION_JWT_SECRET) {
    console.error('AUTHORIZATION_JWT_SECRET environment variable is missing.');
    throw new Error('AUTHORIZATION_JWT_SECRET is not defined');
  }
  const secret = new TextEncoder().encode(process.env.AUTHORIZATION_JWT_SECRET);
  const alg = 'HS256';

  // Inclui email, login e name no payload
  const payload = {
    email: userData.email,
    login: userData.login,
    name: userData.name
  };

  console.log('$$ Creating authorization request token with payload:', payload); // Log para depuração

  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    // Use uma expiração curta, pois este token é apenas para a chamada da API
    .setExpirationTime('5m')
    .sign(secret);

  console.log(`$$ Authorization request token created: ${token}`);

  return token;
}

// Função auxiliar para buscar o token de autorização na API externa
// (fetchAuthorizationApiToken permanece igual)
async function fetchAuthorizationApiToken(
  requestToken: string
): Promise<AuthorizationApiResponse | null> {
  const apiUrl = process.env.AUTHORIZATION_API_URL;
  const apiKey = process.env.AUTHORIZATION_API_KEY;

  if (!apiUrl) {
    console.error('AUTHORIZATION_API_URL environment variable is missing.');
    return null;
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(apiKey && { 'X-API-Key': apiKey })
      },
      // Envia o token JWT temporário criado anteriormente
      body: JSON.stringify({ token: requestToken })
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

// Função principal que encapsula a lógica de autorização para ser usada no callback jwt
export async function handleAuthorizationLogic(
  user: AdapterUser | any // Use 'any' for flexibility if user structure varies
): Promise<Partial<JWT>> {
  const fieldsToAdd: Partial<JWT> = {
    apiAccessToken: null,
    roles: [],
    authorizationError: undefined
  };

  // Verifica se temos os dados necessários do usuário e a secret
  if (user?.email && process.env.AUTHORIZATION_JWT_SECRET) {
    console.log(
      `$$ Fetching authorization token for user: email=${user.email}, login=${user.login}, name=${user.name}`
    );
    try {
      // Prepara os dados do usuário para o token de requisição
      const userDataForToken: AuthorizationRequestUserData = {
        email: user.email,
        login: user.login, // Inclui o login (username)
        name: user.name // Inclui o name
      };

      // Cria o token de requisição com os dados do usuário
      const requestToken =
        await createAuthorizationRequestToken(userDataForToken);
      const authorizationData = await fetchAuthorizationApiToken(requestToken);

      if (authorizationData) {
        fieldsToAdd.apiAccessToken = authorizationData.accessToken;
        fieldsToAdd.roles = authorizationData.roles;
        console.log('$$ Authorization data obtained:', {
          apiAccessToken: !!authorizationData.accessToken,
          roles: authorizationData.roles
        });
      } else {
        fieldsToAdd.authorizationError = 'Failed to fetch authorization token';
        console.warn(
          '$$ Failed to fetch authorization token for user:',
          user.email
        );
      }
    } catch (error) {
      fieldsToAdd.authorizationError =
        'Error during authorization token creation/fetch';
      console.error('$$ Error in authorization logic:', error);
    }
  } else if (!user?.email) {
    fieldsToAdd.authorizationError = 'User email missing';
    console.warn(
      '$$ User email not available, cannot fetch authorization token.'
    );
  } else {
    // A verificação do AUTHORIZATION_JWT_SECRET já acontece dentro de createAuthorizationRequestToken
    // mas podemos manter um log aqui se quisermos
    console.warn(
      '$$ AUTHORIZATION_JWT_SECRET missing, cannot create request token.'
    );
    fieldsToAdd.authorizationError = 'Authorization JWT Secret missing';
  }

  return fieldsToAdd;
}

// (verifyAuthorizationToken permanece igual)
export async function verifyAuthorizationToken(token: string): Promise<any> {
  if (!process.env.AUTHORIZATION_JWT_SECRET) {
    throw new Error('AUTHORIZATION_JWT_SECRET is not defined');
  }
  const secret = new TextEncoder().encode(process.env.AUTHORIZATION_JWT_SECRET);
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    console.error('Failed to verify authorization token:', error);
    return null; // Ou lançar o erro, dependendo de como você quer lidar com a falha
  }
}
