import { FastifyInstance } from 'fastify'
import {LoginResponseType} from "../../src/modules/users/models/login";

const loginFactory = (app: FastifyInstance) => async (username: string, password: string) => {
  const response = await app.inject({
    method: 'POST',
    url: '/api/users/login',
    payload: {
      username,
      password
    }
  })

  const loginInfo = response.json<LoginResponseType>()
  return loginInfo.token
}

export default loginFactory
