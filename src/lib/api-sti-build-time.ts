interface TokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
}

async function authenticate(): Promise<TokenResponse> {
  const formData = new URLSearchParams();
  formData.append('client_id', process.env.UFRN_CLIENT_ID || '');
  formData.append('client_secret', process.env.UFRN_CLIENT_SECRET || '');
  formData.append('grant_type', 'client_credentials'); // ou outro grant_type conforme sua API

  const response = await fetch(process.env.UFRN_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formData.toString()
  });

  if (!response.ok) {
    throw new Error('Falha na autenticação');
  }

  const data = await response.json();
  console.log(data);
  return data;
}

export default async function fetchStiBuildTime(
  url: string,
  options: RequestInit = {}
) {
  // como o next guarda a resposta, ele só vai chamar essa função uma vez, utilizar apenas para o build time e não para conteúdo dinâmico. No conteúdo dinâmico é preferível utilizar o acess_token do usuário.
  const credentials = await authenticate();

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${credentials.access_token}`,
    'X-API-Key': process.env.UFRN_XAPI_KEY || '', // Chave de API em todas as requisições
    'Content-Type': 'application/json' // Header padrão
  };

  return fetch(url, { ...options, headers });
}
