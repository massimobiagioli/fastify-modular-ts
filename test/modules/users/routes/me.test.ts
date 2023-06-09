import { test } from 'tap'
import loginFactory from '../../../helper/loginFactory'
import { build } from '../../../../src/app'
import { LoggedUserType } from '../../../../src/modules/users/models/user'

test('get logged user info', async (t) => {
  const app = build({
    logger: false,
  })

  t.teardown(() => {
    app.close()
  })

  const login = loginFactory(app)
  const token = await login('tester', 'Tester123')

  const response = await app.inject({
    method: 'GET',
    url: '/api/users/me',
    headers: {
      authorization: `Bearer ${token}`,
    },
  })

  const loggedUserResponse = response.json<LoggedUserType>()

  t.equal(response.statusCode, 200)
  t.equal(loggedUserResponse.username, 'tester')
  t.equal(loggedUserResponse.email, 'tester@email.com')
  t.equal(loggedUserResponse.firstname, 'FirstName')
  t.equal(loggedUserResponse.lastname, 'LastName')
})

test('cannot retrieve logged user info if not authenticated', async (t) => {
  const app = build({
    logger: false,
  })

  t.teardown(() => {
    app.close()
  })

  const response = await app.inject({
    method: 'GET',
    url: '/api/users/me',
  })

  t.equal(response.statusCode, 401)
})

test('cannot retrieve logged user info if bad token provided', async (t) => {
  const app = build({
    logger: false,
  })

  t.teardown(() => {
    app.close()
  })

  const response = await app.inject({
    method: 'GET',
    url: '/api/users/me',
    headers: {
      authorization: 'Bearer bad-token',
    },
  })

  t.equal(response.statusCode, 401)
})

test('get logged user info', async (t) => {
  const app = build({
    logger: false,
  })

  t.teardown(() => {
    app.close()
  })

  await app.ready()
  const token = app.jwt.sign({ username: 'fedez' })

  const response = await app.inject({
    method: 'GET',
    url: '/api/users/me',
    headers: {
      authorization: `Bearer ${token}`,
    },
  })

  t.equal(response.statusCode, 404)
})
