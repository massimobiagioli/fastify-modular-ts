import fp from 'fastify-plugin'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { SignupRequestType } from '../models/signup'

async function signupPlugin (
  app: FastifyInstance,
  _opts: FastifyPluginOptions
): Promise<void> {
  const signup = async (request: SignupRequestType) => {
    request.password = app.hashPassword(request.username, request.password)
    await app.prisma.user.create({ data: request })
  }

  app.decorate('signup', signup)
}

export default fp(signupPlugin)
