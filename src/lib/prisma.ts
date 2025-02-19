import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Teste a conexão
prisma.$connect()
  .then(() => console.log('Conectado ao PostgreSQL'))
  .catch((error) => console.error('Erro ao conectar ao PostgreSQL:', error)) 