// const { ApolloServer } = require('apollo-server')

import { ApolloServer } from 'apollo-server-micro'
import { typeDefs } from './graphql/db/schem'
import { resolvers } from './graphql/db/resolver'
const cors = require('micro-cors')()
import conectarDB from './graphql/config/db'
const jwt = require('jsonwebtoken')





require('dotenv').config({ path: '.env' })

// Conectar a la base de datos
conectarDB()


// servidor
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers['authorization'] || ''
    if (token) {
      try {
        const usuario = jwt.verify(token.replace('Bearer ', ''), process.env.SECRETA)
        // console.log(usuario)
        return {
          usuario,
        }
      } catch (error) {
        console.log('Hubo un error')
        console.log(error)
      }
    }
  },
})


const startServer = apolloServer.start()


export default cors(async function handler(req: any, res: any) {

  if (req.method === 'OPTIONS') {
    res.end()
    return false
  }
  await startServer;
  await apolloServer.createHandler({ path: '/api/graphql', })(req, res);
});


export const config = {
  api: {
    bodyParser: false,
  },
}

