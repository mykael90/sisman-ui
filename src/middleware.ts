// src/middleware.ts
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  // `withAuth` aprimora sua Request com o token do usuário.
  // Você pode fazer verificações de papéis (roles) aqui se necessário.
  function middleware(req) {
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
    console.log('Token no middleware:', req.nextauth.token); // Útil para depurar papéis/claims
    return NextResponse.next(); // Continua o fluxo normal se autenticado
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
