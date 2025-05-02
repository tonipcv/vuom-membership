import { NextResponse } from 'next/server';
import { getCsrfToken } from 'next-auth/react';

export async function GET(request: Request) {
  try {
    // O NextAuth normalmente gerencia tokens CSRF automaticamente
    // Este endpoint é fornecido como uma API para obter o token CSRF manualmente
    const csrfToken = await getCsrfToken();
    
    return NextResponse.json(
      { csrfToken },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro ao obter token CSRF:', error);
    return NextResponse.json(
      { error: 'Erro ao obter token CSRF' },
      { status: 500 }
    );
  }
} 