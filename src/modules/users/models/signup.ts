import { Static, Type } from '@sinclair/typebox'

export const SignupRequest = Type.Object(
  {
    email: Type.String({ format: 'email' }),
    username: Type.String(),
    firstname: Type.String(),
    lastname: Type.String(),
    password: Type.String({ minLength: 8 })
  },
  {
    additionalProperties: false
  }
)

export type SignupRequestType = Static<typeof SignupRequest>
