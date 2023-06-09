import fp from 'fastify-plugin'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { LoginRequestType } from '../models/login'

async function loginFeaturePlugin (
  app: FastifyInstance,
  _opts: FastifyPluginOptions
): Promise<void> {
  const login = async (
    request: LoginRequestType
  ): Promise<string | null> => {
    const user = await app.findUserByUsername(request.username)
    if (user == null) {
      app.log.info(`User ${request.username} not found`)
      return null
    }

    if (
      user.password !== app.hashPassword(request.username, request.password)
    ) {
      app.log.info(`Wrong password for user ${request.username}`)
      return null
    }

    return app.jwt.sign({ username: request.username }, { expiresIn: '1h' })
  }

  app.decorate('login', login)
}

export default fp(loginFeaturePlugin)
