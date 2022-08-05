import { ApolloServer } from 'apollo-server-micro'
import { typeDefs } from '../../graphQL/back/db/schem'
import { resolvers } from '../../graphQL/back/db/resolver'
const cors = require('micro-cors')()
import conectarDB from '../../graphQL/back/config/db'
require('dotenv').config({ path: '.env' })
const jwt = require('jsonwebtoken')


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
        return {
          usuario: jwt.verify(token.replace('Bearer ', ''), process.env.SECRETA)
        }
      } catch (error) {
        console.log('Hubo un error al verificar el token')
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

