import { ApolloServer } from 'apollo-server-micro'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
require('dotenv').config({ path: '.env' })
const cors = require('micro-cors')()
const jwt = require('jsonwebtoken')
import { schemaUsuarios } from '../../graphQL/back/db/schemas/schemaUsuarios'
import { schemaMaterial } from '../../graphQL/back/db/schemas/schemaMaterial';
import { resolverUsuarios } from '../../graphQL/back/db/resolvers/resolverUsuarios'
import { resolverMaterial } from '../../graphQL/back/db/resolvers/resolverMaterial';
import { schemasCategoriaMaterial } from '../../graphQL/back/db/schemas/schemaCategoriaMaterial';
import { resolverCategoriaMaterial } from '../../graphQL/back/db/resolvers/resolverCategoriaMaterial';
import conectarDB from '../../graphQL/back/config/db'
// import { usuario } from '../../graphQL/back/types/usuarios';

// Conectar a la base de datos
conectarDB()

// servidor
const apolloServer = new ApolloServer({
  typeDefs: [schemaUsuarios, schemaMaterial, schemasCategoriaMaterial],
  resolvers: [resolverUsuarios, resolverMaterial, resolverCategoriaMaterial],
  introspection: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
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
export default cors(async (req: any, res: any) => {
  if (req.method === 'OPTIONS') {
    res.end()
    return false
  }
  await startServer;
  await apolloServer.createHandler({ path: '/api/graphql' })(req, res);
});


export const config = {
  api: {
    bodyParser: false,
  },
}

