import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// Este endpoint é gerenciado internamente pelo NextAuth
// mas será exposto para compatibilidade com o cliente

export async function POST(request: Request) {
  try {
    // Este endpoint é chamado pelo NextAuth durante o processo de autenticação
    // Aqui podemos adicionar lógica personalizada se necessário
    
    // A maior parte do trabalho é feita pelo próprio NextAuth
    // Este endpoint serve apenas como um complemento se precisarmos
    // de lógica adicional durante o callback de credentials
    
    return NextResponse.json(
      { success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro no callback de credentials:', error);
    return NextResponse.json(
      { error: 'Erro no processo de autenticação' },
      { status: 500 }
    );
  }
} 