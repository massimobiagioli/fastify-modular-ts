import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { LoginRequest, LoginRequestType, LoginResponse } from '../models/login'
import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox'

const route: FastifyPluginAsyncTypebox = async function (
  app: FastifyInstance,
  _opts: FastifyPluginOptions,
): Promise<void> {
  app.post<{ Body: LoginRequestType }>(
    '/login',
    {
      schema: {
        tags: ['Users'],
        body: LoginRequest,
        response: {
          200: LoginResponse,
          401: {
            type: 'null',
            description: 'Invalid username or password',
          },
          500: {
            type: 'null',
            description: 'Error logging in user',
          },
        },
      },
    },
    async (request, reply) => {
      const token = await app.login(request.body)
      if (!token) {
        return reply.code(401).send()
      }
      return { token }
    },
  )
}

export default route
