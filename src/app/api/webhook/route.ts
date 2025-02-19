import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        console.log("Iniciando envio de notificação...");

        // Parse o corpo da requisição
        const body = await req.json();
        console.log("Body recebido:", body);

        const {
            last_status,
            created_at,
            expires_at,
            subscriber
        } = body;

        console.log("Extraindo dados do assinante...");
        const {
            phone_number,
            phone_local_code,
            name,
            doc,
            email,
            id
        } = subscriber;

        const expirationDate = expires_at ? new Date(expires_at) : null;

        // Atualizar lógica para usar Prisma em vez de Supabase
        await prisma.user.update({
            where: { email: email },
            data: { isPremium: true }
        });

        console.log("Acesso premium atualizado com sucesso!");
        return NextResponse.json(
            { message: 'Acesso premium atualizado com sucesso!' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Webhook error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
