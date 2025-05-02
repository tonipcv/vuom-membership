import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth"
import { NextResponse } from "next/server"

// Configurações adicionais para permitir acesso de aplicações externas
const handler = NextAuth({
  ...authOptions,
  callbacks: {
    ...authOptions.callbacks,
    async redirect({ url, baseUrl }) {
      // Permite redirecionamentos para aplicativos móveis
      if (url.startsWith('/')) return `${baseUrl}${url}`
      // Permite redirecionamentos para URL externas específicas
      else if (new URL(url).origin === baseUrl) return url
      // Se a URL contém um esquema de aplicativo personalizado, permitir
      else if (url.startsWith('vuom://')) return url
      return baseUrl
    }
  }
})

// Suporte para preflight CORS
export async function OPTIONS(request: Request) {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    }
  );
}

export { handler as GET, handler as POST } 