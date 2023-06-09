import { Static, Type } from '@sinclair/typebox'

export const Config = Type.Object({
  ENV: Type.String(),
  JWT_SECRET: Type.String(),
  HASHED_PASSWORD_SALT: Type.String(),
})

export type ConfigType = Static<typeof Config>
