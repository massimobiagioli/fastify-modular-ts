import fp from 'fastify-plugin'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import fastifyEnv from '@fastify/env'
import { Config } from '../models/config'
import { join } from 'path'

async function configPlugin(
  fastify: FastifyInstance,
  _opts: FastifyPluginOptions,
): Promise<void> {
  let dotEnvPath = join(__dirname, '../../../.env')
  if (process.env.ENV === 'test') {
    dotEnvPath = join(__dirname, '../../../.env.test')
  }

  fastify.register(fastifyEnv, {
    dotenv: {
      path: dotEnvPath,
    },
    schema: Config,
  })
}

export default fp(configPlugin)
