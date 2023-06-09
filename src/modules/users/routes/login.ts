import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { LoginRequest, LoginRequestType, LoginResponse } from '../models/login'
import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox'

const route: FastifyPluginAsyncTypebox = async function (
  app: FastifyInstance,
  _opts: FastifyPluginOptions
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
            description: 'Invalid username or password'
          },
          500: {
            type: 'null',
            description: 'Error logging in user'
          }
        }
      }
    },
    async (request, reply) => {
      try {
        const token = await app.login(request.body)
        if (!token) {
          return await reply.code(401).send()
        }
        return { token }
      } catch (error) {
        reply.code(500).send()
      }
    }
  )
}

export default route
