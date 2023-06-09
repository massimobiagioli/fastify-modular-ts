import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { HealthResponse, HealthResponseType } from '../../../core/models/health'
import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox'

const route: FastifyPluginAsyncTypebox = async function (
  fastify: FastifyInstance,
  _opts: FastifyPluginOptions
): Promise<void> {
  fastify.get<{ Reply: HealthResponseType }>(
    '/health',
    {
      schema: {
        tags: ['Status'],
        response: {
          200: HealthResponse
        }
      }
    },
    async (_request, _reply) => {
      return { status: 'ok' }
    }
  )
}

export default route
