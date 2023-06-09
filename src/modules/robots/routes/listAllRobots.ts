import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { RobotDtoCollection, RobotDtoCollectionType } from '../models/robots'
import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox'

const route: FastifyPluginAsyncTypebox = async function (
  app: FastifyInstance,
  _opts: FastifyPluginOptions,
): Promise<void> {
  app.get<{ Reply: RobotDtoCollectionType }>(
    '/',
    {
      onRequest: [app.authenticate],
      schema: {
        tags: ['Robots'],
        security: [
          {
            apiKey: [],
          },
        ],
        response: {
          200: RobotDtoCollection,
          404: {
            type: 'null',
            description: 'User not found',
          },
          500: {
            type: 'null',
            description: 'Error retrieving user',
          },
        },
      },
    },
    async (request, reply) => {
      try {
        return await app.listAllRobots()
      } catch (error) {
        request.log.error(error)
        return await reply.code(500).send()
      }
    },
  )
}

export default route
