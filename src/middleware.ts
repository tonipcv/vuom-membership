// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const publicRoutes = ['/', '/forgot-password', '/reset-password', '/auth/callback'];
  if (publicRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) console.error("Erro ao obter sessão no middleware:", error);

  console.log("Sessão do usuário no middleware:", session);

  const protectedRoutes = ['/chat', '/series', '/grafico'];
  
  if (!session && protectedRoutes.includes(req.nextUrl.pathname)) {
    console.log("Redirecionando para login, sessão não encontrada.");
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (session) {
    try {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('is_premium')
        .eq('id', session.user.id)
        .single();

      if (profileError) {
        console.error("Erro ao buscar perfil no middleware:", profileError);
      }

      console.log("Perfil do usuário no middleware:", profile);

      if (!profile?.is_premium && protectedRoutes.includes(req.nextUrl.pathname)) {
        console.log("Redirecionando para /chat-restrito, usuário não premium.");
        return NextResponse.redirect(new URL('/chat-restrito', req.url));
      }
    } catch (error) {
      console.error('Erro ao buscar perfil:', error);
      return res;
    }
  }

  return res;
}

export const config = {
  matcher: [
    '/login',
    '/register',
    '/chat',
    '/chat-restrito',
    '/series',
    '/grafico',
    '/assinatura',
    '/forgot-password',
    '/reset-password',
    '/auth/callback',
    '/cursos-restrito'
  ]
};
