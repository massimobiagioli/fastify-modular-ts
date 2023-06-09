import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { SignupRequest, SignupRequestType } from '../models/signup'
import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox'

const route: FastifyPluginAsyncTypebox = async function (
  fastify: FastifyInstance,
  _opts: FastifyPluginOptions,
): Promise<void> {
  fastify.post<{ Body: SignupRequestType }>(
    '/signup',
    {
      schema: {
        tags: ['Users'],
        body: SignupRequest,
        response: {
          201: {
            type: 'null',
            description: 'User registration successful',
          },
          500: {
            type: 'null',
            description: 'Error registering user',
          },
        },
      },
    },
    async (request, reply) => {
      await fastify.signup(request.body)
      reply.code(201).send()
    },
  )
}

export default route
