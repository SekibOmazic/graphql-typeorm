import { GQL } from '../../types/schema'
import { ResolverMap } from '../../types/graphql-utils'
export const resolvers: ResolverMap = {
  Query: {
    hello: (_, { name }: GQL.IHelloOnQueryArguments) =>
      `Hello ${name || 'World'}`,
  },
}
