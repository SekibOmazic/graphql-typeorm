import 'reflect-metadata'

import { GraphQLServer } from 'graphql-yoga'

import { createTypeormConn } from './utils/createTypeormConn'
import { genSchema } from './utils/genSchema'
import { createTestConn } from './testUtils/createTestConn'

export const startServer = async () => {
  const server = new GraphQLServer({ schema: genSchema() as any })

  // check if we are testing
  if (process.env.NODE_ENV === 'test') {
    // use flag to drop test database
    await createTestConn(true)
  } else {
    await createTypeormConn()
  }

  const app = await server.start({
    port: process.env.NODE_ENV === 'test' ? 0 : 4000,
  })

  // console.log('Server is running on localhost:4000')

  return app
}
