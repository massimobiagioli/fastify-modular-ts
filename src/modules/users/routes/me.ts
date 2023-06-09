import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { LoggedUser, LoggedUserFactory, LoggedUserType } from '../models/user'
import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox'

const route: FastifyPluginAsyncTypebox = async function (
  app: FastifyInstance,
  _opts: FastifyPluginOptions
): Promise<void> {
  app.get<{ Reply: LoggedUserType }>(
    '/me',
    {
      onRequest: [app.authenticate],
      schema: {
        tags: ['Users'],
        security: [
          {
            apiKey: []
          }
        ],
        response: {
          200: LoggedUser,
          404: {
            type: 'null',
            description: 'User not found'
          },
          500: {
            type: 'null',
            description: 'Error retrieving user'
          }
        }
      }
    },
    async (request, reply) => {
      try {
        const { username } = request.user
        const user = await app.findUserByUsername(username)
        if (user == null) {
          return await reply.code(404).send()
        }
        return LoggedUserFactory.fromDto(user)
      } catch (error) {
        request.log.error(error)
        return await reply.code(500).send()
      }
    }
  )
}

export default route
