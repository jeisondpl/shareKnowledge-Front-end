import { ApolloServer } from 'apollo-server-micro'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
require('dotenv').config({ path: '.env' })
const cors = require('micro-cors')()
const jwt = require('jsonwebtoken')
import { schemaUsuarios } from '../../graphQL/back/db/schemas/schemaUsuarios'
import { schemaMaterial } from '../../graphQL/back/db/schemas/schemaMaterial';
import { resolverUsuarios } from '../../graphQL/back/db/resolvers/resolverUsuarios'
import { resolverMaterial } from '../../graphQL/back/db/resolvers/resolverMaterial';
import { schemasCategoria } from '../../graphQL/back/db/schemas/schemaCategoria';
import { resolverCategoria } from '../../graphQL/back/db/resolvers/resolverCategoria';
import { schemaCursos } from '../../graphQL/back/db/schemas/schemaCursos';
import { resolverCursos } from '../../graphQL/back/db/resolvers/resolverCursos';
import conectarDB from '../../graphQL/back/config/db';

// Conectar a la base de datos
conectarDB()

// servidor
const apolloServer = new ApolloServer({
  typeDefs: [schemaUsuarios, schemaMaterial, schemasCategoria, schemaCursos],
  resolvers: [resolverUsuarios, resolverMaterial, resolverCategoria, resolverCursos],
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
        console.log(error)
        throw new Error('usuario no autenticado o token no es valido1s')
      }
    }
    // else {
    //   throw new Error('usuario no autenticado o token no es valido2s')
    // }
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

