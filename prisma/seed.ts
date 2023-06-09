import { PrismaClient } from '@prisma/client'
import * as crypto from "crypto";

const prisma = new PrismaClient()

const hashPasswordFactory =
    (salt: string) =>
        (username: string, password: string): string => {
          const passwordSalt = crypto
              .createHash('sha256')
              .update(username + salt)
              .digest('base64')
          const input = password + passwordSalt
          return crypto.createHash('sha256').update(input).digest('base64')
        }

const hashPassword = hashPasswordFactory(process.env.HASHED_PASSWORD_SALT || 'secret')

async function seedUsers () {
  await prisma.user.deleteMany({})

  const u1 = await prisma.user.create({
    data: {
      username: 'tester',
      password: hashPassword('tester', 'Tester123'),
      firstname: 'FirstName',
      lastname: 'LastName',
      email: 'tester@email.com'
    }
  })
  console.log({ u1 })
}

async function seedRobots () {
  await prisma.robot.deleteMany({})

  const r1 = await prisma.robot.create({
    data: {
      name: 'Atlas Ufo Robot'
    }
  })
  const r2 = await prisma.robot.create({
    data: {
      name: 'Mazinga Z'
    }
  })
  const r3 = await prisma.robot.create({
    data: {
      name: 'Daitarn III'
    }
  })
  console.log({ r1, r2, r3 })
}

async function main () {
  await seedUsers()
  await seedRobots()
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
