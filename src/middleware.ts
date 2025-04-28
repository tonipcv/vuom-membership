// middleware.ts
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  console.log('Middleware - Path:', pathname);
  console.log('Middleware - Token:', token ? 'Existe' : 'Não existe');

  // Rotas públicas que não precisam de autenticação
  const publicRoutes = ['/login', '/register', '/forgot-password'];
  if (publicRoutes.includes(pathname)) {
    // Se estiver logado, redireciona baseado no status premium
    if (token) {
      console.log('Middleware - Usuário logado tentando acessar rota pública');
      return NextResponse.redirect(new URL(token.isPremium ? '/series-restrito' : '/planos', request.url));
    }
    return NextResponse.next();
  }

  // Se não estiver logado, redireciona para login
  if (!token && pathname !== '/login') {
    console.log('Middleware - Usuário não logado, redirecionando para login');
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Verifica acesso à área restrita
  if (pathname.startsWith('/series-restrito')) {
    if (!token?.isPremium) {
      console.log('Middleware - Usuário não premium tentando acessar área restrita');
      return NextResponse.redirect(new URL('/planos', request.url));
    }
  }

  // Verifica acesso à página de planos
  if (pathname === '/trial') {
    if (token?.isPremium) {
      console.log('Middleware - Usuário premium tentando acessar planos');
      return NextResponse.redirect(new URL('/series-restrito', request.url));
    }
  }

  // Redireciona a rota raiz (/) baseado no status premium
  if (pathname === '/') {
    return NextResponse.redirect(new URL(token?.isPremium ? '/series-restrito' : '/trial', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/login',
    '/register',
    '/planos',
    '/series-restrito/:path*',
    '/',
  ],
};
