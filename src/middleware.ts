// src/middleware.ts
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import Logger from '@/lib/logger';

const logger = new Logger('Middleware');

export default withAuth(
  // `withAuth` aprimora sua Request com o token do usuário.
  // Você pode fazer verificações de papéis (roles) aqui se necessário.
  function middleware(req) {
    const { method, url } = req;
    const start = Date.now();

    // Loga o início da requisição
    logger.info(
      // Usando info em vez de warn para um log normal
      `Request START: ${method} ${req.nextUrl.pathname}`,
      { req: { method, url } } // Passando objeto como segundo argumento
    );

    // Exemplo: Redirecionar se não for admin e tentar acessar /admin
    // if (
    //   req.nextUrl.pathname.startsWith('/admin') &&
    //   req.nextauth.token?.role !== 'admin'
    // ) {
    //   return NextResponse.rewrite(new URL('/denied', req.url));
    // }
    // Se nenhuma lógica extra for necessária aqui (além da autenticação padrão),
    // você pode simplesmente retornar null ou não ter esta função.
    // O `withAuth` já protege as rotas no `matcher` por padrão.

    logger.warn('Token no middleware:', req.nextauth.token); // Útil para depurar papéis/claims
    const response = NextResponse.next(); // Continua o fluxo normal se autenticado

    // Exemplo de como usar 'start' para logar a duração
    const duration = Date.now() - start;
    logger.info(
      `Middleware END: ${method} ${req.nextUrl.pathname} in ${duration}ms`,
      { req: { method, url }, duration } // Passando objeto como segundo argumento
    );

    return response;
  },
  {
    callbacks: {
      // Callback para decidir se o middleware deve ser aplicado.
      // Retorna `true` se o token existir (usuário logado), `false` caso contrário.
      authorized: ({ token }) => !!token
    },
    pages: {
      // Redireciona usuários não autenticados para esta página
      signIn: '/signin'
      // Você pode adicionar outras páginas como error: '/auth/error'
    }
  }
);

// Configuração do Matcher: Aplica o middleware a TODAS as rotas, EXCETO as especificadas.
export const config = {
  matcher: [
    /*
     * Corresponde a todas as rotas exceto pelas que começam com:
     * - api (Rotas de API)
     * - _next/static (Arquivos estáticos)
     * - _next/image (Arquivos de otimização de imagem)
     * - favicon.ico (Arquivo de favicon)
     * - signin (Sua página de login)
     * E que terminam com extensões comuns de assets (adicione mais se necessário)
     * OU caminhos específicos como /images, /fonts etc.
     */
    '/((?!api|_next/static|_next/image|favicon\\.ico|signin|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'
    // Alternativa se seus assets estiverem em pastas específicas:
    // '/((?!api|_next/static|_next/image|favicon.ico|signin|images/|icons/).*)',
  ]
};
