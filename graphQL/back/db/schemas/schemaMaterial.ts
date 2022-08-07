import { gql } from 'apollo-server-micro'

// Schema
export const schemaMaterial = gql`
type Material {
  id: ID
  titulo: String
  descripcion: String
  creado: String
  usuario: ID
  categoria: ID
}

input MaterialInput {
  titulo: String!
  descripcion: String
  url: String
  creado: String
  usuario: String
  categoria: String
}

type Query {
  #Materiales
  obtenerMaterial(id: ID!): Material
  obtenerTodosMateriales: [Material]
}

type Mutation {
  # Materiales
  nuevoMaterial(input: MaterialInput): Material
}
`


