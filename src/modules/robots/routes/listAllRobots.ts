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
            description: 'Internal server error',
          },
        },
      },
    },
    async (request, reply) => {
      return await app.listAllRobots()
    },
  )
}

export default route
