import { supabase } from "@/src/lib/supabase";
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        // Parse the request body
        const body = await req.json();
        const {
            last_status,       // Status da assinatura (ex.: approved, canceled)
            created_at,        // Data de criação
            expires_at,        // Data de expiração
            subscriber         // Dados do assinante, incluindo telefone, email, etc.
        } = body;

        // Extraindo dados do assinante
        const {
            phone_number,
            phone_local_code,
            name,
            doc,               // Documento do usuário
            email,             // Email do usuário
            id                 // ID do usuário
        } = subscriber;

        const expirationDate = expires_at ? new Date(expires_at) : null;

        // Atualizando o perfil no Supabase
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