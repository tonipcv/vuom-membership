import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { user: null },
        { status: 200 }
      );
    }
    
    return NextResponse.json(
      { 
        user: {
          id: session.user.id,
          name: session.user.name,
          email: session.user.email,
          isPremium: session.user.isPremium || false,
        } 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro ao obter dados da sessão:', error);
    return NextResponse.json(
      { error: 'Erro ao obter dados da sessão' },
      { status: 500 }
    );
  }
} 