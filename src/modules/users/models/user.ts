import { Static, Type } from '@sinclair/typebox'

export const UserDto = Type.Object({
  id: Type.Integer(),
  username: Type.String(),
  email: Type.String({ format: 'email' }),
  firstname: Type.String(),
  lastname: Type.String(),
  password: Type.String()
})

export type UserDtoType = Static<typeof UserDto>

export const LoggedUser = Type.Object({
  id: Type.Integer(),
  username: Type.String(),
  email: Type.String({ format: 'email' }),
  firstname: Type.String(),
  lastname: Type.String()
})

export type LoggedUserType = Static<typeof LoggedUser>

export const LoggedUserFactory = {
  fromDto: (user: UserDtoType): LoggedUserType => {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname
    }
  }
}
