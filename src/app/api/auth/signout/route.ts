import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { success: true, message: 'Não havia sessão ativa' },
        { status: 200 }
      );
    }
    
    // Este endpoint é um complemento ao signOut do NextAuth
    // O processo principal de logout é tratado pelo próprio NextAuth
    // Este endpoint pode ser usado para fazer limpezas adicionais se necessário

    return NextResponse.json(
      { success: true, message: 'Logout processado com sucesso' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro no processo de signout:', error);
    return NextResponse.json(
      { success: false, message: 'Erro ao processar logout' },
      { status: 500 }
    );
  }
} 