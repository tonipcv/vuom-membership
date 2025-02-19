import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/email';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const { email, password, name, phone } = await req.json();

    // Validar campos obrigatórios
    if (!email || !password || !name) {
      return NextResponse.json(
        { message: 'Campos obrigatórios faltando' },
        { status: 400 }
      );
    }

    // Verificar se o usuário já existe
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'Este e-mail já está registrado' },
        { status: 400 }
      );
    }

    // Gerar token de verificação
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Hash da senha
    const hashedPassword = await hash(password, 10);

    try {
      // Criar usuário
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          phone: phone || '',
          verificationToken,
          emailVerified: null
        },
      });

      // Enviar email de confirmação
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 
                     process.env.NEXTAUTH_URL || 
                     'https://wallet.k17.com.br';
      const confirmationUrl = `${baseUrl}/verify-email?token=${verificationToken}`;

      try {
        await sendEmail({
          to: email,
          subject: 'Confirme seu email',
          html: `
            <h1>Bem-vindo ao Katsu!</h1>
            <p>Olá ${name},</p>
            <p>Obrigado por se cadastrar. Por favor, confirme seu email clicando no botão abaixo:</p>
            <a href="${confirmationUrl}" style="display: inline-block; padding: 12px 24px; background-color: #3b82f6; color: white; text-decoration: none; border-radius: 6px;">
              Confirmar Email
            </a>
            <p>Se você não criou esta conta, por favor ignore este email.</p>
          `
        });
      } catch (emailError) {
        console.error('Erro ao enviar email:', emailError);
        // Continua com o registro mesmo se o email falhar
      }

      return NextResponse.json(
        { 
          message: 'Usuário criado com sucesso. Por favor, verifique seu email.',
          userId: user.id 
        },
        { status: 201 }
      );
    } catch (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { message: 'Erro ao criar usuário no banco de dados' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Erro ao processar a requisição' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 