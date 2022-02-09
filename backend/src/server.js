import { ApolloServer, PubSub } from 'apollo-server'
import typeDefs from './graphql/typeDefs'
import resolvers from './graphql/resolvers'

const pubsub = new PubSub()
const server = new ApolloServer({
  typeDefs,
  resolvers,
  subscriptions: {
    path: '/subscriptions',
    onConnect: (connectionParams, webSocket, context) => {
      console.log('Client connected');
    },
    onDisconnect: (webSocket, context) => {
      console.log('Client disconnected')
    },
  },
  context: () => {
    return { pubsub }
  }
})

server.listen().then(({ url }) => console.log(`🚀 Server started at ${url}`))