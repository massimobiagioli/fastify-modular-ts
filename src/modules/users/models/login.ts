import { Static, Type } from '@sinclair/typebox'

export const LoginRequest = Type.Object({
  username: Type.String(),
  password: Type.String(),
})

export type LoginRequestType = Static<typeof LoginRequest>

export const LoginResponse = Type.Object({
  token: Type.String(),
})

export type LoginResponseType = Static<typeof LoginResponse>
