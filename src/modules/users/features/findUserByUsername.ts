import fp from 'fastify-plugin'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { UserDtoType } from '../models/user'

async function findByUsernameFeaturePlugin(
  app: FastifyInstance,
  _opts: FastifyPluginOptions,
): Promise<void> {
  const findUserByUsername = async (
    username: string,
  ): Promise<UserDtoType | null> => {
    return await app.prisma.user.findUnique({
      where: {
        username,
      },
    })
  }

  app.decorate('findUserByUsername', findUserByUsername)
}

export default fp(findByUsernameFeaturePlugin)
