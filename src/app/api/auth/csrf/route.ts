import { NextResponse } from 'next/server';
import { getCsrfToken } from 'next-auth/react';

export async function GET(request: Request) {
  try {
    // O NextAuth normalmente gerencia tokens CSRF automaticamente
    // Este endpoint é fornecido como uma API para obter o token CSRF manualmente
    const csrfToken = await getCsrfToken();
    
    return NextResponse.json(
      { csrfToken },
      { 
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
      }
    );
  } catch (error) {
    console.error('Erro ao obter token CSRF:', error);
    return NextResponse.json(
      { error: 'Erro ao obter token CSRF' },
      { status: 500 }
    );
  }
}

export async function OPTIONS(request: Request) {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    }
  );
} 