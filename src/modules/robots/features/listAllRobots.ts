import fp from 'fastify-plugin'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { RobotDtoCollectionType } from '../models/robots'
import { Robot } from '@prisma/client'

function createDtoCollection(robots: Robot[]): RobotDtoCollectionType {
  return robots.map((robot) => ({
    id: robot.id,
    name: robot.name,
  }))
}

async function listAllRobotsPlugin(
  app: FastifyInstance,
  _opts: FastifyPluginOptions,
): Promise<void> {
  const listAllRobots = async (): Promise<RobotDtoCollectionType> => {
    const robots = await app.prisma.robot.findMany()
    return createDtoCollection(robots)
  }

  app.decorate('listAllRobots', listAllRobots)
}

export default fp(listAllRobotsPlugin)
