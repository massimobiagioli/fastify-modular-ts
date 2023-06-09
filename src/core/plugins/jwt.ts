import fp from 'fastify-plugin'
import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from 'fastify'
import fastifyJwt from '@fastify/jwt'

async function jwtPlugin(
  fastify: FastifyInstance,
  _opts: FastifyPluginOptions,
): Promise<void> {
  fastify.register(fastifyJwt, {
    secret: fastify.config.JWT_SECRET,
  })

  fastify.decorate(
    'authenticate',
    async function (request: FastifyRequest, reply: FastifyReply) {
      try {
        await request.jwtVerify()
      } catch (err) {
        reply.send(err)
      }
    },
  )
}

export default fp(jwtPlugin)
