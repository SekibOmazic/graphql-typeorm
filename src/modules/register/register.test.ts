import { request } from 'graphql-request'
import { User } from '../../entity/User'
import { createTestConn } from '../../testUtils/createTestConn'
import { Connection } from 'typeorm'

const email = 'joe@google.com'
const password = 'jalksdf'

const mutation = (e: string, p: string) => `
mutation {
  register(email: "${e}", password: "${p}") {
    path
    message
  }
}
`

let conn: Connection
beforeAll(async () => {
  conn = await createTestConn()
})
afterAll(async () => {
  await conn.close()
})

describe('Register user', async () => {
  it('check for duplicate emails', async () => {
    // make sure we can register a user
    const response = await request(
      process.env.TEST_HOST as string,
      mutation(email, password),
    )
    expect(response).toEqual({ register: null })

    const users = await User.find({ where: { email } })
    expect(users).toHaveLength(1)

    const user = users[0]
    expect(user.email).toEqual(email)
    expect(user.password).not.toEqual(password)

    const response2: any = await request(
      process.env.TEST_HOST as string,
      mutation(email, password),
    )
    expect(response2.register).toHaveLength(1)
    expect(response2.register[0].path).toEqual('email')
    // expect(response2.register[0]).toEqual({
    //   path: 'email',
    //   message: duplicateEmail,
    // })
  })
})
