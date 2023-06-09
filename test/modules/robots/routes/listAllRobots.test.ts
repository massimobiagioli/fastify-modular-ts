import { test } from 'tap'
import loginFactory from '../../../helper/loginFactory'
import {build} from "../../../../src/app";
import {RobotDtoCollectionType} from "../../../../src/modules/robots/models/robots";

test('get all devices', async t => {
  const app = build({
    logger: false
  })

  t.teardown(() => {
    app.close()
  })

  const login = loginFactory(app)
  const token = await login('tester', 'Tester123')

  const response = await app.inject({
    method: 'GET',
    url: '/api/robots',
    headers: {
      authorization: `Bearer ${token}`
    }
  })

  const robotsCollection = response.json<RobotDtoCollectionType>()

  t.equal(response.statusCode, 200)
  t.equal(robotsCollection.length, 3)
})
