import { test } from 'tap'
import {build} from "../../../../src/app";
import {LoginResponseType} from "../../../../src/modules/users/models/login";

test('login', async t => {
  const app = build({
    logger: false
  })

  t.teardown(() => {
    app.close()
  })

  const response = await app.inject({
    method: 'POST',
    url: '/api/users/login',
    payload: {
      username: 'tester',
      password: 'Tester123'
    }
  })

  const loginResponse = response.json<LoginResponseType>()

  t.equal(response.statusCode, 200)
  t.ok(loginResponse.token)
})

test('login fail with wrong password', async t => {
  const app = build({
    logger: false
  })

  t.teardown(() => {
    app.close()
  })

  const response = await app.inject({
    method: 'POST',
    url: '/api/users/login',
    payload: {
      username: 'tester',
      password: 'wrong password !!'
    }
  })

  t.equal(response.statusCode, 401)
})

test('login fail with not existing user', async t => {
  const app = build({
    logger: false
  })

  t.teardown(() => {
    app.close()
  })

  const response = await app.inject({
    method: 'POST',
    url: '/api/users/login',
    payload: {
      username: 'NotExistingUser',
      password: 'wrong password !!'
    }
  })

  t.equal(response.statusCode, 401)
})
