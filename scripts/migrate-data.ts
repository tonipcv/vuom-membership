import { PrismaClient as SQLitePrisma } from '@prisma/client'
import { PrismaClient as PostgresPrisma } from '@prisma/client'

async function migrateData() {
  const sqlitePrisma = new SQLitePrisma({
    datasources: {
      db: {
        url: 'file:./dev.db'
      }
    }
  })

  const postgresPrisma = new PostgresPrisma({
    datasources: {
      db: {
        url: process.env.DATABASE_URL
      }
    }
  })

  try {
    // Migrar usuários
    const users = await sqlitePrisma.user.findMany({
      include: {
        accounts: true,
        sessions: true
      }
    })

    for (const user of users) {
      const { accounts, sessions, ...userData } = user
      await postgresPrisma.user.create({
        data: {
          ...userData,
          accounts: {
            create: accounts
          },
          sessions: {
            create: sessions
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