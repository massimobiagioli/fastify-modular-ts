import Fastify, { FastifyInstance, FastifyServerOptions } from 'fastify'
import AutoLoad from '@fastify/autoload'
import Swagger from '@fastify/swagger'
import SwaggerUI from '@fastify/swagger-ui'
import FastifyPrismaClient from 'fastify-prisma-client'
import { join } from 'path'
import { ConfigType } from './core/models/config'
import { UserDtoType } from './modules/users/models/user'
import { LoginRequestType } from './modules/users/models/login'
import { SignupRequestType } from './modules/users/models/signup'
import { RobotDtoCollectionType } from './modules/robots/models/robots'
import {JWT} from "@fastify/jwt";
import "@fastify/jwt"
import {AuthenticateFunction} from "./core/models/auth";

declare module 'fastify' {
  interface FastifyInstance {
    jwt: JWT

    config: ConfigType
    authenticate: AuthenticateFunction
    hashPassword: (username: string, password: string) => string

    findUserByUsername: (username: string) => Promise<UserDtoType | null>
    login: (request: LoginRequestType) => Promise<string>
    signup: (request: SignupRequestType) => Promise<void>

    listAllRobots: () => Promise<RobotDtoCollectionType>
  }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: {
      username: string
    }
    user: {
      username: string
    }
  }
}

export function build (opts?: FastifyServerOptions): FastifyInstance {
  const defaultOptions = {
    logger: true
  }

  const app = Fastify({ ...defaultOptions, ...opts })

  app.register(Swagger, {
    swagger: {
      info: {
        title: 'Fastify Modular Monolith',
        description: 'Fastify Modular Monolith Demo Api',
        version: '0.1.0'
      },
      securityDefinitions: {
        apiKey: {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header'
        }
      }
    }
  })

  app.register(SwaggerUI)

  app.register(FastifyPrismaClient, {})

  app.register(AutoLoad, {
    dir: join(__dirname, 'core', 'plugins')
  })

  app.register(AutoLoad, {
    dir: join(__dirname, 'modules'),
    encapsulate: false,
    maxDepth: 1
  })

  return app
}
