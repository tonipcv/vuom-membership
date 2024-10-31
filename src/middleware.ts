import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  try {
    // Ignora rotas públicas
    const publicRoutes = ['/', '/forgot-password', '/reset-password', '/auth/callback']
    if (publicRoutes.includes(req.nextUrl.pathname)) {
      return NextResponse.next()
    }

    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req, res })

    const {
      data: { session },
    } = await supabase.auth.getSession()

    // Rotas que requerem autenticação
    const protectedRoutes = ['/chat', '/series', '/grafico']
    
    // Se não estiver autenticado e tentar acessar rotas protegidas
    if (!session && protectedRoutes.includes(req.nextUrl.pathname)) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    // Se estiver autenticado
    if (session) {
      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('is_premium')
          .eq('id', session.user.id)
          .single()

        // Redireciona de login/register
        if (req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/register') {
          const redirectUrl = profile?.is_premium ? '/chat' : '/chat-restrito'
          return NextResponse.redirect(new URL(redirectUrl, req.url))
        }

        // Verifica acesso premium
        if (!profile?.is_premium) {
          // Se tentar acessar /chat, redireciona para /chat-restrito
          if (req.nextUrl.pathname === '/chat') {
            return NextResponse.redirect(new URL('/chat-restrito', req.url))
          }
          // Para outras rotas protegidas, redireciona para /chat-restrito
          if (protectedRoutes.includes(req.nextUrl.pathname)) {
            return NextResponse.redirect(new URL('/chat-restrito', req.url))
          }
        }
      } catch (error) {
        console.error('Erro ao buscar perfil:', error)
        return res
      }
    }

    return res
  } catch (error) {
    console.error('Erro no middleware:', error)
    return NextResponse.next()
  }
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
}
