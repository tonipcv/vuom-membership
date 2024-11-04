
import supabaseClient from '@/src/lib/superbaseClient';
import { NextResponse } from 'next/server';

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

        // Obtém o Supabase Client
        const supabase = supabaseClient;

        // Atualizando o perfil no Supabase
        console.log("Atualizando perfil no Supabase...");
        const { error } = await supabase
            .from('profiles')
            .update({
                is_premium: last_status === 'approved',
                expiration_date: expirationDate,
                created_at: new Date(created_at),
                phone_number,
                phone_local_code,
                name,
                doc,
                email
            })
            .eq('id', id);

        if (error) {
            console.error('Erro ao atualizar perfil no Supabase:', error);
            return NextResponse.json(
                { error: 'Erro ao atualizar o status premium' },
                { status: 500 }
            );
        }

        console.log("Acesso premium atualizado com sucesso!");
        return NextResponse.json(
            { message: 'Acesso premium atualizado com sucesso!' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Erro ao processar webhook:', error);
        return NextResponse.json(
            { error: 'Erro interno do servidor' },
            { status: 500 }
        );
    }
}
