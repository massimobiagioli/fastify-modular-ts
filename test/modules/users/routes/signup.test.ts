import { test } from 'tap'
import {build} from "../../../../src/app";

test('signup', async t => {
  const app = build({
    logger: false
  })

  t.teardown(() => {
    app.close()
  })

  const response = await app.inject({
    method: 'POST',
    url: '/api/users/signup',
    payload: {
      username: 'jack',
      password: 'Password123',
      firstname: 'Jack',
      lastname: 'White',
      email: 'jack.white@email.com'
    }
  })

  t.equal(response.statusCode, 201)
})

test('signup with invalid payload', async t => {
  const app = build({
    logger: false
  })

  t.teardown(() => {
    app.close()
  })

  const response = await app.inject({
    method: 'POST',
    url: '/api/users/signup',
    payload: {
      username: 'user'
    }
  })

  t.equal(response.statusCode, 400)
})
