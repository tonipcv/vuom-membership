import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { createTransporter } from '@/lib/email'

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json()

    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          gt: new Date()
        }
      }
    })

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: 'Token inválido ou expirado' }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null
      }
    })

    // Enviar email de confirmação
    const transporter = createTransporter()
    
    await transporter.sendMail({
      from: {
        name: 'Wallet',
        address: 'oi@k17.com.br'
      },
      to: user.email,
      subject: 'Senha alterada com sucesso',
      html: `
        <h1>Sua senha foi alterada</h1>
        <p>A senha da sua conta foi alterada com sucesso.</p>
        <p>Se você não fez esta alteração, entre em contato conosco imediatamente.</p>
      `
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error resetting password:', error)
    return new NextResponse(
      JSON.stringify({ error: 'Erro ao processar a solicitação' }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
} 