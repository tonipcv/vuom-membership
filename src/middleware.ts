// middleware.ts
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  // Rotas públicas que não precisam de autenticação
  const publicRoutes = ['/login', '/register', '/forgot-password'];
  if (publicRoutes.includes(pathname)) {
    // Se estiver logado, redireciona para área restrita
    if (token) {
      return NextResponse.redirect(new URL('/series-restrito', request.url));
    }
    return NextResponse.next();
  }

  // Se não estiver logado, redireciona para login
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Verifica acesso à área restrita
  if (pathname.startsWith('/series-restrito')) {
    // Se não for premium, redireciona para página de planos
    if (!token.isPremium) {
      return NextResponse.redirect(new URL('/planos', request.url));
    }
  }

  // Verifica acesso à página de planos
  if (pathname === '/planos') {
    // Se já for premium, redireciona para área restrita
    if (token.isPremium) {
      return NextResponse.redirect(new URL('/series-restrito', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/login',
    '/register',
    '/planos',
    '/series-restrito/:path*',
  ],
};
