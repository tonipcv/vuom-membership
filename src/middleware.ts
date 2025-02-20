// middleware.ts
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import { NextRequest } from "next/server"

export default withAuth(
  async function middleware(req: NextRequest) {
    const token = req.nextauth.token as { isPremium?: boolean } | null
    
    // Rotas premium e suas versões restritas
    const premiumRoutes = {
      '/chat': '/chat-restrito',
      '/series': '/series-restrito',
      '/grafico': '/grafico-restrito'
    }

    // Verifica acesso premium
    if (premiumRoutes[req.nextUrl.pathname as keyof typeof premiumRoutes]) {
      if (!token?.isPremium) {
        const restrictedRoute = premiumRoutes[req.nextUrl.pathname as keyof typeof premiumRoutes]
        return NextResponse.redirect(new URL(restrictedRoute, req.url))
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }: { token: any | null }) => !!token
    },
  }
)

export const config = {
  matcher: [
    '/chat',
    '/chat-restrito',
    '/series',
    '/series-restrito',
    '/grafico',
    '/grafico-restrito',
    '/assinatura',
    '/relatorio'
  ]
}
