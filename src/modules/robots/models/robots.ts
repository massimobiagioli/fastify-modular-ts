import { Static, Type } from '@sinclair/typebox'

export const RobotDto = Type.Object({
  id: Type.Integer(),
  name: Type.String()
})

export type RobotDtoType = Static<typeof RobotDto>

export const RobotDtoCollection = Type.Array(RobotDto)

export type RobotDtoCollectionType = Static<typeof RobotDtoCollection>
