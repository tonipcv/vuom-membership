// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  // Rotas que não precisam de autenticação
  const publicRoutes = [
    '/',
    '/login',
    '/register',
    '/forgot-password', 
    '/reset-password', 
    '/auth/callback'
  ];

  // Se for uma rota pública, permite o acesso
  if (publicRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const { data: { session }, error } = await supabase.auth.getSession();
  
  // Se houver erro ao obter a sessão, loga o erro mas permite continuar
  if (error) {
    console.error("Erro ao obter sessão no middleware:", error);
    return res;
  }

  // Se não houver sessão, redireciona para login
  if (!session) {
    console.log("Redirecionando para login, sessão não encontrada.");
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Rotas premium e suas versões restritas
  const premiumRoutes = {
    '/chat': '/chat-restrito',
    '/series': '/series-restrito',
    '/grafico': '/grafico-restrito'
  };

  // Se houver sessão, verifica se é premium para rotas premium
  if (session && premiumRoutes[req.nextUrl.pathname as keyof typeof premiumRoutes]) {
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('is_premium')
        .eq('id', session.user.id)
        .single();

      // Se não for premium, redireciona para versão restrita
      if (!profile?.is_premium) {
        const restrictedRoute = premiumRoutes[req.nextUrl.pathname as keyof typeof premiumRoutes];
        return NextResponse.redirect(new URL(restrictedRoute, req.url));
      }
    } catch (error) {
      console.error('Erro ao buscar perfil:', error);
    }
  }

  return res;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)',
    '/chat',
    '/chat-restrito',
    '/series',
    '/series-restrito',
    '/grafico',
    '/grafico-restrito',
    '/assinatura',
    '/relatorio'
  ]
};
