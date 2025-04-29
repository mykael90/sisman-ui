// Em src/types/next-auth.d.ts (ou onde preferir)
import { DefaultSession, DefaultUser } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  /**
   * Retornado pela hook `useSession`, `getSession` e recebido como prop para o `SessionProvider`
   */
  interface Session {
    user: {
      id: string; // Ou o tipo correto do seu ID (number, etc.)
      login?: string | null;
    } & DefaultSession['user']; // Mantém os campos padrão como name, email, image
    provider?: string;
    accessTokenSisman?: string | null;
    roles?: string[];
    authorizationError?: string;
    error?: string; // Para erros gerais (ex: refresh token falhou)
  }

  /**
   * Adiciona campos personalizados ao objeto User padrão
   */
  interface User extends DefaultUser {
    // Se você adicionar campos ao User no callback signIn ou no profile, declare-os aqui
    login?: string | null;
    // outros campos que vêm do profile ou que você adiciona
  }
}

declare module 'next-auth/jwt' {
  /** Retornado pelas funções `getToken` ou no callback `jwt` */
  interface JWT extends DefaultJWT {
    // Campos que você adiciona no callback jwt
    id?: string; // Ou o tipo correto
    login?: string | null;
    provider?: string;
    accessToken?: string; // Token do provedor (ex: UFRN)
    refreshToken?: string; // Refresh token do provedor
    expiresAt?: number; // Timestamp de expiração do token do provedor
    accessTokenSisman?: string | null; // Token da sua API
    roles?: string[];
    authorizationError?: string;
    error?: string; // Campo para sinalizar erros (ex: RefreshAccessTokenError)
  }
}
