import { PrismaClient as SQLitePrisma } from '@prisma/client'
import { PrismaClient as PostgresPrisma } from '@prisma/client'

async function migrateData() {
  const sqlitePrisma = new SQLitePrisma({
    datasource: {
      url: 'file:./dev.db'
    }
  })

  const postgresPrisma = new PostgresPrisma({
    datasource: {
      url: process.env.DATABASE_URL
    }
  })

  try {
    // Migrar usuários
    const users = await sqlitePrisma.user.findMany()
    for (const user of users) {
      await postgresPrisma.user.create({
        data: {
          ...user,
          accounts: {
            create: user.accounts
          },
          sessions: {
            create: user.sessions
          }
        }
      })
    }

    console.log('Migração concluída com sucesso!')
  } catch (error) {
    console.error('Erro durante a migração:', error)
  } finally {
    await sqlitePrisma.$disconnect()
    await postgresPrisma.$disconnect()
  }
}

migrateData() 