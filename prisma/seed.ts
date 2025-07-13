import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Clear existing users
  await prisma.user.deleteMany()
  console.log('🗑️  Cleared existing users')

  // Create sample users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'john.doe@example.com',
        name: 'John Doe',
      },
    }),
    prisma.user.create({
      data: {
        email: 'jane.smith@example.com',
        name: 'Jane Smith',
      },
    }),
    prisma.user.create({
      data: {
        email: 'bob.wilson@example.com',
        name: 'Bob Wilson',
      },
    }),
    prisma.user.create({
      data: {
        email: 'alice.johnson@example.com',
        name: 'Alice Johnson',
      },
    }),
    prisma.user.create({
      data: {
        email: 'charlie.brown@example.com',
        name: 'Charlie Brown',
      },
    }),
    prisma.user.create({
      data: {
        email: 'diana.prince@example.com',
        name: 'Diana Prince',
      },
    }),
    prisma.user.create({
      data: {
        email: 'bruce.wayne@example.com',
        name: 'Bruce Wayne',
      },
    }),
    prisma.user.create({
      data: {
        email: 'clark.kent@example.com',
        name: 'Clark Kent',
      },
    }),
  ])

  console.log('✅ Created users:', users.map(user => ({ id: user.id, email: user.email, name: user.name })))
  console.log('🎉 Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 