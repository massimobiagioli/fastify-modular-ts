import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { join } from 'path'
import autoload from '@fastify/autoload'

export default async function (
  app: FastifyInstance,
  _opts: FastifyPluginOptions
): Promise<void> {
  app.register(autoload, {
    dir: join(__dirname, 'features')
  })

  app.register(autoload, {
    dir: join(__dirname, 'routes'),
    options: { prefix: '/api/users' }
  })
}
